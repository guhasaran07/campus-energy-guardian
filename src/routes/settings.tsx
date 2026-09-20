import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/energy/pages";
export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Detection Settings — Campus Energy Detector" },
      {
        name: "description",
        content: "Configure local energy detection and notification preferences.",
      },
      { property: "og:title", content: "Detection Settings — Campus Energy Detector" },
      {
        property: "og:description",
        content: "Configure local energy detection and notification preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});
