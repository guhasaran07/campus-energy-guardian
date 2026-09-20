import { createFileRoute } from "@tanstack/react-router";
import { Analytics } from "@/components/energy/pages";
export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Energy Analytics — Campus Energy Detector" },
      {
        name: "description",
        content: "Campus energy patterns, waste trends, and prototype insights.",
      },
      { property: "og:title", content: "Energy Analytics — Campus Energy Detector" },
      {
        property: "og:description",
        content: "Campus energy patterns, waste trends, and prototype insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Analytics,
});
