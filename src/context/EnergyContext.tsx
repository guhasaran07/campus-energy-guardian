import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  alerts as initialAlerts,
  rooms as initialRooms,
  type Alert,
  type Room,
} from "@/data/energy";
type Ctx = {
  rooms: Room[];
  alerts: Alert[];
  resolve: (id: string) => void;
  dismiss: (id: string) => void;
};
const EnergyContext = createContext<Ctx | undefined>(undefined);
export function EnergyProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [rooms, setRooms] = useState(initialRooms);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("campus-alerts");
      if (raw) {
        const saved = JSON.parse(raw) as Alert[];
        setAlerts(saved);
        setRooms(
          initialRooms.map((r) =>
            saved.some((a) => a.roomId === r.id && a.status === "Active")
              ? r
              : r.status === "Leak Detected"
                ? { ...r, status: "Resolved" }
                : r,
          ),
        );
      }
    } catch {}
  }, []);
  const update = (id: string, status: "Resolved" | "Dismissed") => {
    setAlerts((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, status } : a));
      localStorage.setItem("campus-alerts", JSON.stringify(next));
      return next;
    });
    const alert = alerts.find((a) => a.id === id);
    if (alert)
      setRooms((prev) =>
        prev.map((r) => (r.id === alert.roomId ? { ...r, status: "Resolved" } : r)),
      );
  };
  const value = useMemo(
    () => ({
      rooms,
      alerts,
      resolve: (id: string) => update(id, "Resolved"),
      dismiss: (id: string) => update(id, "Dismissed"),
    }),
    [rooms, alerts],
  );
  return <EnergyContext.Provider value={value}>{children}</EnergyContext.Provider>;
}
export function useEnergy() {
  const ctx = useContext(EnergyContext);
  if (!ctx) throw new Error("EnergyProvider missing");
  return ctx;
}
