/**
 * Single source of truth for identity and contact data.
 *
 * This object feeds the header, footer, inquiry emails and the structured
 * data, so those surfaces can never drift apart.
 */
export const SITE = {
  name: "Careably",
  /** Rendered as two tones in the wordmark: navy "Care", teal "ably". */
  nameParts: { lead: "Care", trail: "ably" },

  tagline: "Health. Wellness. Support. Living.",

  description:
    "Careably connects communities and their residents with trusted health, wellness and support services, conveniently delivered where they live.",

  domain: "careably.care",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://careably.care",

  email: "hello@careably.care",

  /**
   * No phone is published yet.
   *
   * The client design shows (407) 123-4567, which is a placeholder pattern,
   * and the real number was not supplied. Rather than ship a number that does
   * not ring, the site publishes email and the partner form, and the
   * structured data omits `telephone` entirely. Add it here when known and it
   * appears in the footer, the contact page and the schema at once.
   */
  phone: null,

  address: {
    locality: "Orlando",
    region: "FL",
    regionName: "Florida",
    country: "US",
  },
} as const

/**
 * CTA labels.
 *
 * Two labels share the contact intent, which normally would not be allowed.
 * The client's approved design uses "Get Started" in the header and
 * "Partner With Careably" in the body, and matching the design wins here.
 * See docs/brand.md.
 */
export const CTA = {
  header: "Get Started",
  partner: "Partner With Careably",
  services: "Explore Services",
} as const
