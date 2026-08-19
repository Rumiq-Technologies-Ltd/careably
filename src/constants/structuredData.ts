import { ROUTES } from "@/constants/routes"
import { SERVICE_CATEGORIES } from "@/constants/services"
import { SITE } from "@/constants/site"

/**
 * Careably coordinates services rather than providing clinical care directly,
 * so `Organization` is the honest type. `MedicalOrganization` would claim a
 * clinical role the platform does not hold.
 *
 * Deliberately absent: aggregateRating, review, openingHours and priceRange.
 * There is no source for any of them, and structured data that does not match
 * visible page content is both a guidelines violation and a false claim.
 *
 * `telephone` is omitted because no real number has been supplied, and
 * `streetAddress` because none is known. See docs/assets.md.
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}#organization`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    slogan: SITE.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: {
      "@type": "State",
      name: SITE.address.regionName,
    },
    // Mirrors the categories shown on the page, so the markup and the visible
    // content agree.
    knowsAbout: SERVICE_CATEGORIES.flatMap((category) =>
      category.rows.flat()
    ),
  }
}

export function buildBreadcrumbSchema(
  trail: readonly { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: ROUTES.home }, ...trail].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE.url}${item.path === "/" ? "" : item.path}`,
      })
    ),
  }
}
