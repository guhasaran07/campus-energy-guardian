import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  ChartNoAxesCombined,
  ChevronRight,
  IndianRupee,
  LayoutDashboard,
  Menu,
  LogOut,
  Search,
  Settings,
  Siren,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEnergy } from "@/context/EnergyContext";
const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/monitoring", label: "Energy Monitoring", icon: Activity },
  { to: "/leak-detection", label: "Leak Detection", icon: Zap },
  { to: "/rooms", label: "Rooms", icon: Building2 },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/alerts", label: "Alerts", icon: Siren },
  { to: "/cost-savings", label: "Cost & Savings", icon: IndianRupee },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;
function Sidebar({ close }: { close?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      <Link
        to="/"
        onClick={close}
        className="flex h-20 items-center gap-3 border-b border-sidebar-border px-5"
      >
        <span className="grid size-10 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground shadow-glow">
          <Zap className="size-5" />
        </span>
        <span className="leading-tight">
          <b className="block font-display text-sm">CAMPUS ENERGY</b>
          <small className="text-[10px] tracking-widest text-sidebar-muted">LEAK DETECTOR</small>
        </span>
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main navigation">
        {nav.map((item) => {
          const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              className={`nav-link ${active ? "nav-link-active" : ""}`}
            >
              <item.icon />
              <span>{item.label}</span>
              {active && <ChevronRight className="ml-auto size-3" />}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-md border border-sidebar-border bg-sidebar-accent p-4">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="size-2 animate-pulse rounded-full bg-success" />
          Monitoring Active
        </div>
        <p className="mt-2 text-[10px] text-sidebar-muted">Last updated: Just now</p>
      </div>
    </aside>
  );
}
export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [clock, setClock] = useState<Date | null>(null);
  const { alerts, rooms } = useEnergy();
  const active = alerts.filter((a) => a.status === "Active");
  useEffect(() => {
    setClock(new Date());
    const id = setInterval(() => setClock(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar />
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-overlay"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-64 animate-in slide-in-from-left">
            <Sidebar close={() => setOpen(false)} />
          </div>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu />
          </Button>
          <button
            onClick={() => setSearch(true)}
            className="hidden h-9 max-w-sm flex-1 items-center gap-2 rounded-md border border-input bg-muted/50 px-3 text-sm text-muted-foreground sm:flex"
          >
            <Search className="size-4" />
            Search rooms and alerts{" "}
            <span className="ml-auto rounded border border-border px-1.5 py-0.5 text-[10px]">
              ⌘K
            </span>
          </button>
          <div className="ml-auto hidden text-right md:block">
            <div className="text-xs font-medium">
              {clock
                ? clock.toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })
                : ""}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {clock
                ? clock.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                : ""}
            </div>
          </div>
          <Link
            to="/alerts"
            className="relative grid size-9 place-items-center rounded-md hover:bg-muted"
            aria-label={`${active.length} active notifications`}
          >
            <Bell className="size-4" />
            {active.length > 0 && (
              <span className="absolute right-1 top-1 size-2 rounded-full bg-danger ring-2 ring-background" />
            )}
          </Link>
          <div className="h-7 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {initials}
            </div>
            <div className="hidden text-xs sm:block">
              <b>{displayName}</b>
              <span className="block text-[10px] text-muted-foreground">Campus Admin</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
              <LogOut />
            </Button>
          </div>
        </header>
        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6">{children}</main>
        <footer className="border-t border-border px-6 py-5 text-xs text-muted-foreground">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <b className="text-foreground">Campus Energy Leak Detector</b> · Smart Sustainability
              Monitoring · Prototype • Hackathon 2026
            </span>
            <div className="flex gap-4">
              <Link to="/">Dashboard</Link>
              <Link to="/analytics">Analytics</Link>
              <Link to="/alerts">Alerts</Link>
              <Link to="/settings">Settings</Link>
            </div>
          </div>
        </footer>
      </div>
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search campus</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            placeholder="Search rooms..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="max-h-72 space-y-1 overflow-auto">
            {rooms
              .filter((room) =>
                `${room.name} ${room.building}`.toLowerCase().includes(query.toLowerCase()),
              )
              .map((r) => (
              <Link
                key={r.id}
                to="/rooms/$roomId"
                params={{ roomId: r.id }}
                onClick={() => setSearch(false)}
                className="flex items-center justify-between rounded-md p-3 hover:bg-muted"
              >
                <span>
                  <b className="block text-sm">{r.name}</b>
                  <small className="text-muted-foreground">{r.building}</small>
                </span>
                <ChartNoAxesCombined className="size-4 text-muted-foreground" />
              </Link>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
