import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTip, chartColors } from "./common";
const axis = { fontSize: 10, fill: "var(--muted-foreground)" };
export function ConsumptionChart({
  data,
  height = 300,
}: {
  data: Array<Record<string, string | number | null>>;
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColors.actual} stopOpacity={0.25} />
              <stop offset="100%" stopColor={chartColors.actual} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chartColors.grid} vertical={false} />
          <XAxis dataKey="time" tick={axis} axisLine={false} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTip />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area
            type="monotone"
            dataKey="actual"
            name="Actual Consumption"
            stroke={chartColors.actual}
            fill="url(#actualFill)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="baseline"
            name="Expected Baseline"
            stroke={chartColors.baseline}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="anomaly"
            name="Anomaly"
            stroke={chartColors.anomaly}
            strokeWidth={4}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export function SimpleBar({
  data,
  dataKey = "consumption",
  name = "Consumption",
  xKey = "name",
  height = 260,
}: {
  data: Array<Record<string, string | number>>;
  dataKey?: string;
  name?: string;
  xKey?: string;
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke={chartColors.grid} vertical={false} />
          <XAxis dataKey={xKey} tick={axis} axisLine={false} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTip />} />
          <Bar dataKey={dataKey} name={name} fill={chartColors.actual} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export function TrendChart({
  data,
  xKey = "day",
  keys = ["actual", "baseline"],
  height = 260,
}: {
  data: Array<Record<string, string | number>>;
  xKey?: string;
  keys?: string[];
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke={chartColors.grid} vertical={false} />
          <XAxis dataKey={xKey} tick={axis} axisLine={false} tickLine={false} />
          <YAxis tick={axis} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTip />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {keys.map((k, i) => (
            <Line
              key={k}
              type="monotone"
              dataKey={k}
              name={k[0].toUpperCase() + k.slice(1)}
              stroke={
                [chartColors.actual, chartColors.baseline, chartColors.amber][i] ??
                chartColors.actual
              }
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
