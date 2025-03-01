import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://snow-day-calculator-teal.vercel.app",
      changeFrequency: "weekly",
    },
    {
      url: "https://snow-day-calculator-teal.vercel.app/about",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://snow-day-calculator-teal.vercel.app/custom-snow-calculator",
      changeFrequency: "monthly",
    },
  ];
}
