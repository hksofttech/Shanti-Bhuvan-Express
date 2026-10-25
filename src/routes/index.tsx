import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/home";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Shanti Bhavan Express | South Indian Cafe, Civil Lines, Nagpur" },
      {
        name: "description",
        content:
          "Menu, prices, phone and directions for Shanti Bhavan Express, a South Indian cafe at Shop No. 42, VCA Shopping Complex, Civil Lines, Nagpur 440001.",
      },
    ],
  }),
});
