import { createFileRoute } from "@tanstack/react-router";
import { LeakDetection } from "@/components/energy/pages";
export const Route = createFileRoute("/leak-detection")({
  head: () => ({
    meta: [
      { title: "Intelligent Leak Detection — Campus Energy Detector" },
      {
        name: "description",
        content: "Explore and test the room-specific energy anomaly detection prototype.",
      },
      { property: "og:title", content: "Intelligent Leak Detection — Campus Energy Detector" },
      {
        property: "og:description",
        content: "Explore and test the room-specific energy anomaly detection prototype.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeakDetection,
});
