export type Status = "Normal" | "Warning" | "Leak Detected" | "Resolved";
export type Severity = "Critical" | "High" | "Medium" | "Low";
export type Room = {
  id: string;
  name: string;
  building: string;
  current: number;
  baseline: number;
  sigma: number;
  status: Status;
  lastUpdated: string;
  daily: number;
  duration: number;
  waste: number;
  cost: number;
  zScore: number;
};
export type Alert = {
  id: string;
  roomId: string;
  severity: Severity;
  detectedAt: string;
  status: "Active" | "Resolved" | "Dismissed";
};
export const TARIFF = 10.3;
export const rooms: Room[] = [
  {
    id: "cs-lab-1",
    name: "CS Lab 1",
    building: "Computer Science Block",
    current: 1622,
    baseline: 21,
    sigma: 6,
    status: "Leak Detected",
    lastUpdated: "1 min ago",
    daily: 8.9,
    duration: 3,
    waste: 4.8,
    cost: 49,
    zScore: 266.8,
  },
  {
    id: "cs-lab-2",
    name: "CS Lab 2",
    building: "Computer Science Block",
    current: 238,
    baseline: 221,
    sigma: 22,
    status: "Normal",
    lastUpdated: "2 min ago",
    daily: 5.7,
    duration: 0,
    waste: 0,
    cost: 0,
    zScore: 0.77,
  },
  {
    id: "mechanical-lab-1",
    name: "Mechanical Lab 1",
    building: "Mechanical Block",
    current: 1809,
    baseline: 16,
    sigma: 3,
    status: "Leak Detected",
    lastUpdated: "Just now",
    daily: 11.4,
    duration: 5,
    waste: 8.97,
    cost: 92,
    zScore: 597.7,
  },
  {
    id: "mechanical-lab-2",
    name: "Mechanical Lab 2",
    building: "Mechanical Block",
    current: 418,
    baseline: 380,
    sigma: 38,
    status: "Warning",
    lastUpdated: "4 min ago",
    daily: 8.2,
    duration: 0.5,
    waste: 0.02,
    cost: 0.2,
    zScore: 1,
  },
  {
    id: "library-hall",
    name: "Library Hall",
    building: "Library",
    current: 68,
    baseline: 61,
    sigma: 9,
    status: "Normal",
    lastUpdated: "3 min ago",
    daily: 3.4,
    duration: 0,
    waste: 0,
    cost: 0,
    zScore: 0.78,
  },
  {
    id: "classroom-101",
    name: "Classroom 101",
    building: "Classroom Block",
    current: 212,
    baseline: 204,
    sigma: 31,
    status: "Normal",
    lastUpdated: "5 min ago",
    daily: 4.1,
    duration: 0,
    waste: 0,
    cost: 0,
    zScore: 0.26,
  },
  {
    id: "classroom-102",
    name: "Classroom 102",
    building: "Classroom Block",
    current: 294,
    baseline: 210,
    sigma: 31,
    status: "Warning",
    lastUpdated: "6 min ago",
    daily: 5.3,
    duration: 1,
    waste: 0.08,
    cost: 0.87,
    zScore: 2.71,
  },
  {
    id: "hostel-block-a",
    name: "Hostel Block A",
    building: "Hostel Block A",
    current: 1500,
    baseline: 462,
    sigma: 69,
    status: "Leak Detected",
    lastUpdated: "2 min ago",
    daily: 31.2,
    duration: 4,
    waste: 4.16,
    cost: 43,
    zScore: 15.04,
  },
];
export const alerts: Alert[] = [
  {
    id: "ALT-1042",
    roomId: "cs-lab-1",
    severity: "Critical",
    detectedAt: "Today, 11:08",
    status: "Active",
  },
  {
    id: "ALT-1041",
    roomId: "hostel-block-a",
    severity: "High",
    detectedAt: "Today, 10:12",
    status: "Active",
  },
  {
    id: "ALT-1039",
    roomId: "mechanical-lab-1",
    severity: "Critical",
    detectedAt: "Today, 09:03",
    status: "Active",
  },
  {
    id: "ALT-1035",
    roomId: "classroom-102",
    severity: "Medium",
    detectedAt: "Yesterday, 16:45",
    status: "Resolved",
  },
  {
    id: "ALT-1028",
    roomId: "library-hall",
    severity: "Low",
    detectedAt: "18 Sep, 20:10",
    status: "Dismissed",
  },
];
export const hourly = Array.from({ length: 24 }, (_, i) => {
  const baseline = i < 7 || i > 20 ? 1800 : i < 10 ? 6200 : i < 17 ? 7900 : 5200;
  const anomaly = i >= 10 && i <= 14 ? ([0, 1600, 2200, 1800, 900][i - 10] ?? 0) : 0;
  return {
    time: `${String(i).padStart(2, "0")}:00`,
    actual: baseline + Math.round(Math.sin(i) * 380) + anomaly,
    baseline,
    anomaly: anomaly ? baseline + anomaly : null,
  };
});
export const daily = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({
  day,
  actual: [94, 101, 108, 116, 99, 61, 55][i] ?? 0,
  baseline: [91, 94, 96, 98, 92, 58, 52][i] ?? 0,
}));
export const buildingData = [
  { name: "Computer Science", consumption: 38, waste: 4.8, cost: 49 },
  { name: "Mechanical", consumption: 31, waste: 8.99, cost: 93 },
  { name: "Hostel A", consumption: 44, waste: 4.16, cost: 43 },
  { name: "Library", consumption: 14, waste: 0, cost: 0 },
  { name: "Classrooms", consumption: 23, waste: 0.08, cost: 1 },
];
export const monthly = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((month, i) => ({
  month,
  waste: [192, 177, 168, 151, 139, 122][i] ?? 0,
  savings: [1980, 2150, 2390, 2860, 3740, 5540][i] ?? 0,
}));
export const detectionFloor = [
  { name: "Classroom", baseline: 204, detectable: 5, excess: 48 },
  { name: "Mechanical Lab 1", baseline: 15, detectable: 64, excess: 49 },
  { name: "CS Lab 1", baseline: 20, detectable: 69, excess: 49 },
  { name: "Library Hall", baseline: 61, detectable: 102, excess: 41 },
  { name: "Hostel Block A", baseline: 478, detectable: 627, excess: 149 },
];
export const buildings = [
  "All buildings",
  "Computer Science Block",
  "Mechanical Block",
  "Library",
  "Hostel Block A",
  "Classroom Block",
];
export const roomById = (id: string) => rooms.find((r) => r.id === id);
