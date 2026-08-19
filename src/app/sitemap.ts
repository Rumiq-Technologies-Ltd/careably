import type { MetadataRoute } from "next"

import { ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/site"

/** Indexable routes only. /thank-you is excluded, matching robots.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE.url}${ROUTES.contact}`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}${ROUTES.eldersmiles}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
}
