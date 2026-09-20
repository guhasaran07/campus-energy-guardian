import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Status, Severity } from "@/data/energy";
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
export function Panel({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel", className)}>
      {(title || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}
            {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
export function StatusBadge({ status }: { status: Status | Severity | "Active" | "Dismissed" }) {
  const tone =
    status === "Critical" || status === "Leak Detected" || status === "Active"
      ? "danger"
      : status === "High" || status === "Warning"
        ? "warning"
        : status === "Resolved" || status === "Normal"
          ? "success"
          : "neutral";
  return (
    <span className={`status status-${tone}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}
export function MetricCard({
  label,
  value,
  detail,
  trend,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  trend?: string;
  icon: ReactNode;
}) {
  const down = trend?.startsWith("-");
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div className="icon-tile">{icon}</div>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              down ? "text-success" : "text-danger",
            )}
          >
            {down ? <ArrowDownRight /> : <ArrowUpRight />}
            {trend}
          </span>
        )}
      </div>
      <div className="mt-5 text-2xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
        {detail}
      </div>
    </div>
  );
}
export function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
export function DetailLink({ id, label = "View details" }: { id: string; label?: string }) {
  return (
    <Link
      to="/rooms/$roomId"
      params={{ roomId: id }}
      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
    >
      {label}
      <ChevronRight className="size-3" />
    </Link>
  );
}
export const chartColors = {
  actual: "var(--chart-cyan)",
  baseline: "var(--chart-green)",
  anomaly: "var(--chart-red)",
  amber: "var(--chart-amber)",
  grid: "var(--chart-grid)",
};
export function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-popover p-3 text-xs shadow-lg">
      <p className="mb-2 font-semibold">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex min-w-36 justify-between gap-5">
          <span className="text-muted-foreground">{p.name}</span>
          <span className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
