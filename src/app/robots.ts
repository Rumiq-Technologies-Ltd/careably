import type { MetadataRoute } from "next"

import { ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Confirmation page only, no value in the index and it would look like
      // thin content.
      disallow: [ROUTES.thankYou],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
