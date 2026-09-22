import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { TARIFF, type Alert, type Room, type Severity, type Status } from "@/data/energy";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { detect, relativeTime, type EnergyReading } from "@/lib/detection";

export type SeriesPoint = {
  time: string;
  actual: number;
  baseline: number;
  anomaly: number | null;
};

type Ctx = {
  rooms: Room[];
  alerts: Alert[];
  readings: EnergyReading[];
  loading: boolean;
  error: string | null;
  resolve: (id: string) => void;
  dismiss: (id: string) => void;
  refresh: () => Promise<void>;
  addReading: (roomName: string, power: number) => Promise<void>;
  series: SeriesPoint[];
  roomSeries: (roomName: string) => SeriesPoint[];
  buildingData: { name: string; consumption: number; waste: number; cost: number }[];
};

const EnergyContext = createContext<Ctx | undefined>(undefined);

type RoomRow = {
  id: string;
  name: string;
  building: string;
  current_w: number;
  baseline: number;
  sigma: number;
  status: string;
  last_updated: string;
  daily: number;
  duration: number;
  waste: number;
  cost: number;
  z_score: number;
};

type AlertRow = {
  id: string;
  room_id: string;
  severity: string;
  detected_at: string;
  status: string;
};

type ReadingRow = { id: string; room_name: string; power_w: number; timestamp: string };

const toReading = (row: ReadingRow): EnergyReading => ({
  id: row.id,
  roomName: row.room_name,
  power: Number(row.power_w),
  timestamp: row.timestamp,
});

const toAlert = (row: AlertRow): Alert => ({
  id: row.id,
  roomId: row.room_id,
  severity: row.severity as Severity,
  detectedAt: row.detected_at,
  status: row.status as Alert["status"],
});

const timeLabel = (d: Date) => `${String(d.getHours()).padStart(2, "0")}:00`;

function buildSeries(readings: EnergyReading[], baselineTotal: number): SeriesPoint[] {
  const buckets = new Map<number, { sum: number; count: number }>();
  for (const r of readings) {
    const d = new Date(r.timestamp);
    const key = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()).getTime();
    const b = buckets.get(key) ?? { sum: 0, count: 0 };
    b.sum += r.power;
    b.count += 1;
    buckets.set(key, b);
  }
  return [...buckets.entries()]
    .sort((a, b) => a[0] - b[0])
    .slice(-24)
    .map(([key, b]) => {
      const actual = Math.round(b.sum / Math.max(1, b.count / Math.max(1, b.count && 1)));
      const value = Math.round(b.sum / Math.max(1, b.count)) * 0 + actual;
      return {
        time: timeLabel(new Date(key)),
        actual: value,
        baseline: Math.round(baselineTotal),
        anomaly: value > baselineTotal * 1.25 ? value : null,
      };
    });
}

export function EnergyProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [roomRows, setRoomRows] = useState<RoomRow[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [readings, setReadings] = useState<EnergyReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [roomRes, alertRes, readingRes] = await Promise.all([
      supabase.from("rooms").select("*").order("name"),
      supabase.from("alerts").select("*").order("detected_at", { ascending: false }),
      supabase
        .from("energy_readings")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(1000),
    ]);
    const failure = roomRes.error ?? alertRes.error ?? readingRes.error;
    if (failure) {
      setError(failure.message);
      setLoading(false);
      return;
    }
    setError(null);
    setRoomRows((roomRes.data ?? []) as RoomRow[]);
    setAlerts(((alertRes.data ?? []) as AlertRow[]).map(toAlert));
    setReadings(((readingRes.data ?? []) as ReadingRow[]).map(toReading));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!session) return;
    void refresh();
    const channel = supabase
      .channel("energy-readings-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "energy_readings" },
        () => void refresh(),
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [session, refresh]);

  const readingsByRoom = useMemo(() => {
    const map = new Map<string, EnergyReading[]>();
    for (const r of readings) {
      const list = map.get(r.roomName) ?? [];
      list.push(r);
      map.set(r.roomName, list);
    }
    for (const list of map.values())
      list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return map;
  }, [readings]);

  const rooms = useMemo<Room[]>(
    () =>
      roomRows.map((row) => {
        const baseline = Number(row.baseline);
        const sigma = Number(row.sigma);
        const list = readingsByRoom.get(row.name) ?? [];
        const result = detect(list, baseline, sigma);
        const latest = list[0];
        const activeAlert = alerts.find((a) => a.roomId === row.id && a.status === "Active");
        const handled = alerts.some((a) => a.roomId === row.id && a.status !== "Active");
        const status: Status = !latest
          ? (row.status as Status)
          : result.isLeak
            ? activeAlert
              ? "Leak Detected"
              : handled
                ? "Resolved"
                : "Leak Detected"
            : result.status;
        const avg = list.length
          ? list.reduce((sum, r) => sum + r.power, 0) / list.length
          : Number(row.current_w);
        return {
          id: row.id,
          name: row.name,
          building: row.building,
          current: latest ? Math.round(result.current) : Number(row.current_w),
          baseline,
          sigma,
          status,
          lastUpdated: latest ? relativeTime(latest.timestamp) : row.last_updated,
          daily: Number(((avg * 24) / 1000).toFixed(2)),
          duration: Number((result.durationMinutes / 60).toFixed(2)),
          waste: status === "Resolved" ? 0 : Number(result.waste.toFixed(2)),
          cost: status === "Resolved" ? 0 : Number(result.cost.toFixed(2)),
          zScore: Number(result.zScore.toFixed(2)),
        };
      }),
    [roomRows, readingsByRoom, alerts],
  );

  const baselineTotal = useMemo(
    () => rooms.reduce((sum, r) => sum + r.baseline, 0),
    [rooms],
  );

  const series = useMemo(() => buildSeries(readings, baselineTotal), [readings, baselineTotal]);

  const roomSeries = useCallback(
    (roomName: string) => {
      const room = rooms.find((r) => r.name === roomName);
      return buildSeries(readingsByRoom.get(roomName) ?? [], room?.baseline ?? 0);
    },
    [readingsByRoom, rooms],
  );

  const buildingData = useMemo(() => {
    const map = new Map<string, { name: string; consumption: number; waste: number; cost: number }>();
    for (const r of rooms) {
      const entry = map.get(r.building) ?? { name: r.building, consumption: 0, waste: 0, cost: 0 };
      entry.consumption = Number((entry.consumption + r.daily).toFixed(2));
      entry.waste = Number((entry.waste + r.waste).toFixed(2));
      entry.cost = Number((entry.cost + r.cost).toFixed(2));
      map.set(r.building, entry);
    }
    return [...map.values()];
  }, [rooms]);

  const addReading = useCallback(
    async (roomName: string, power: number) => {
      const { data, error: insertError } = await supabase
        .from("energy_readings")
        .insert({ room_name: roomName, power_w: power })
        .select()
        .single();
      if (insertError) throw new Error(insertError.message);

      const inserted = toReading(data as ReadingRow);
      const row = roomRows.find((r) => r.name === roomName);
      if (!row) {
        await refresh();
        return;
      }
      const history = [inserted, ...(readingsByRoom.get(roomName) ?? [])];
      const result = detect(history, Number(row.baseline), Number(row.sigma));

      await supabase
        .from("rooms")
        .update({
          current_w: result.current,
          z_score: Number(result.zScore.toFixed(2)),
          duration: Number((result.durationMinutes / 60).toFixed(2)),
          waste: Number(result.waste.toFixed(2)),
          cost: Number(result.cost.toFixed(2)),
          status: result.status,
          last_updated: "Just now",
        })
        .eq("id", row.id);

      const alreadyActive = alerts.some((a) => a.roomId === row.id && a.status === "Active");
      if (result.isLeak && !alreadyActive) {
        await supabase.from("alerts").insert({
          id: `ALT-${Date.now().toString().slice(-6)}`,
          room_id: row.id,
          severity: result.severity ?? "Medium",
          detected_at: new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "Active",
        });
      }
      await refresh();
    },
    [roomRows, readingsByRoom, alerts, refresh],
  );

  const update = useCallback(
    async (id: string, status: "Resolved" | "Dismissed") => {
      const alert = alerts.find((a) => a.id === id);
      setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      await supabase.from("alerts").update({ status }).eq("id", id);
      if (alert)
        await supabase
          .from("rooms")
          .update({ status: "Resolved", waste: 0, cost: 0, duration: 0 })
          .eq("id", alert.roomId);
      await refresh();
    },
    [alerts, refresh],
  );

  const value = useMemo(
    () => ({
      rooms,
      alerts,
      readings,
      loading,
      error,
      resolve: (id: string) => void update(id, "Resolved"),
      dismiss: (id: string) => void update(id, "Dismissed"),
      refresh,
      addReading,
      series,
      roomSeries,
      buildingData,
    }),
    [
      rooms,
      alerts,
      readings,
      loading,
      error,
      update,
      refresh,
      addReading,
      series,
      roomSeries,
      buildingData,
    ],
  );

  return <EnergyContext.Provider value={value}>{children}</EnergyContext.Provider>;
}

export function useEnergy() {
  const ctx = useContext(EnergyContext);
  if (!ctx) throw new Error("EnergyProvider missing");
  return ctx;
}

export { TARIFF };
