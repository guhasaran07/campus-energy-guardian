import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  alerts as initialAlerts,
  rooms as initialRooms,
  type Alert,
  type Room,
  type Severity,
  type Status,
} from "@/data/energy";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

type Ctx = {
  rooms: Room[];
  alerts: Alert[];
  loading: boolean;
  resolve: (id: string) => void;
  dismiss: (id: string) => void;
  refresh: () => Promise<void>;
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

const toRoom = (row: RoomRow): Room => ({
  id: row.id,
  name: row.name,
  building: row.building,
  current: Number(row.current_w),
  baseline: Number(row.baseline),
  sigma: Number(row.sigma),
  status: row.status as Status,
  lastUpdated: row.last_updated,
  daily: Number(row.daily),
  duration: Number(row.duration),
  waste: Number(row.waste),
  cost: Number(row.cost),
  zScore: Number(row.z_score),
});

const toAlert = (row: AlertRow): Alert => ({
  id: row.id,
  roomId: row.room_id,
  severity: row.severity as Severity,
  detectedAt: row.detected_at,
  status: row.status as Alert["status"],
});

export function EnergyProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [roomRes, alertRes] = await Promise.all([
      supabase.from("rooms").select("*").order("name"),
      supabase.from("alerts").select("*").order("id", { ascending: false }),
    ]);
    if (roomRes.data?.length) setRooms(roomRes.data.map((r) => toRoom(r as RoomRow)));
    if (alertRes.data?.length) setAlerts(alertRes.data.map((a) => toAlert(a as AlertRow)));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!session) return;
    void refresh();
  }, [session, refresh]);

  const update = useCallback(
    async (id: string, status: "Resolved" | "Dismissed") => {
      const alert = alerts.find((a) => a.id === id);
      setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      if (alert)
        setRooms((prev) =>
          prev.map((r) => (r.id === alert.roomId ? { ...r, status: "Resolved" } : r)),
        );
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
      loading,
      resolve: (id: string) => void update(id, "Resolved"),
      dismiss: (id: string) => void update(id, "Dismissed"),
      refresh,
    }),
    [rooms, alerts, loading, update, refresh],
  );

  return <EnergyContext.Provider value={value}>{children}</EnergyContext.Provider>;
}

export function useEnergy() {
  const ctx = useContext(EnergyContext);
  if (!ctx) throw new Error("EnergyProvider missing");
  return ctx;
}
