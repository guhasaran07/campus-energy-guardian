import { TARIFF, type Severity, type Status } from "@/data/energy";

export const Z_THRESHOLD = 2.5;
export const MIN_EXCESS_W = 50;
export const MIN_DURATION_MIN = 30;

export type EnergyReading = {
  id: string;
  roomName: string;
  power: number;
  timestamp: string;
};

export type DetectionResult = {
  current: number;
  excess: number;
  zScore: number;
  durationMinutes: number;
  isLeak: boolean;
  waste: number;
  cost: number;
  severity: Severity | null;
  status: Status;
};

/** z = (x - mu) / sigma */
export const zScore = (value: number, baseline: number, sigma: number) =>
  (value - baseline) / Math.max(sigma, 1);

export const severityFor = (z: number): Severity =>
  z >= 10 ? "Critical" : z >= 5 ? "High" : z >= 3.5 ? "Medium" : "Low";

/**
 * Shared detection engine. `readings` must be the room's readings sorted
 * newest first. Applies the three validation guards:
 * z >= 2.5, excess >= 50 W and abnormal for >= 30 minutes.
 */
export function detect(
  readings: EnergyReading[],
  baseline: number,
  sigma: number,
): DetectionResult {
  const latest = readings[0];
  if (!latest) {
    return {
      current: 0,
      excess: 0,
      zScore: 0,
      durationMinutes: 0,
      isLeak: false,
      waste: 0,
      cost: 0,
      severity: null,
      status: "Normal",
    };
  }

  const current = latest.power;
  const excess = current - baseline;
  const z = zScore(current, baseline, sigma);
  const abnormal = (value: number) =>
    zScore(value, baseline, sigma) >= Z_THRESHOLD && value - baseline >= MIN_EXCESS_W;

  let oldestAbnormal = latest;
  if (abnormal(current)) {
    for (const reading of readings) {
      if (!abnormal(reading.power)) break;
      oldestAbnormal = reading;
    }
  }

  const durationMinutes = abnormal(current)
    ? Math.max(
        0,
        (new Date(latest.timestamp).getTime() - new Date(oldestAbnormal.timestamp).getTime()) /
          60000,
      )
    : 0;

  const isLeak = abnormal(current) && durationMinutes >= MIN_DURATION_MIN;
  const waste = isLeak ? (Math.max(0, excess) * (durationMinutes / 60)) / 1000 : 0;

  return {
    current,
    excess,
    zScore: z,
    durationMinutes,
    isLeak,
    waste,
    cost: waste * TARIFF,
    severity: isLeak ? severityFor(z) : null,
    status: isLeak ? "Leak Detected" : abnormal(current) ? "Warning" : "Normal",
  };
}

export const relativeTime = (iso: string) => {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 min ago";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
};
