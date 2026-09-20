import { createFileRoute } from "@tanstack/react-router";
import { RoomDetail } from "@/components/energy/pages";
export const Route = createFileRoute("/rooms/$roomId")({
  head: () => ({
    meta: [
      { title: "Room Details — Campus Energy Detector" },
      {
        name: "description",
        content: "Inspect current room energy usage, baseline, anomaly score, and cost.",
      },
      { property: "og:title", content: "Room Energy Details" },
      { property: "og:description", content: "Room-level energy consumption and anomaly details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { roomId } = Route.useParams();
  return <RoomDetail roomId={roomId} />;
}
