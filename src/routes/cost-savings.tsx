import { createFileRoute } from "@tanstack/react-router";
import { CostSavings } from "@/components/energy/pages";
export const Route = createFileRoute("/cost-savings")({
  head: () => ({
    meta: [
      { title: "Energy Waste & Cost — Campus Energy Detector" },
      {
        name: "description",
        content: "Understand campus energy waste, costs, and potential savings.",
      },
      { property: "og:title", content: "Energy Waste & Cost — Campus Energy Detector" },
      {
        property: "og:description",
        content: "Understand campus energy waste, costs, and potential savings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CostSavings,
});
