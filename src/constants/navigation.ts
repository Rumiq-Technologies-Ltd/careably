import { ANCHORS, ROUTES } from "@/constants/routes"

/**
 * `as const` is load-bearing: `typedRoutes` validates Link hrefs against the
 * generated route union, so widening these to `string` breaks the build.
 *
 * "What We Do" was removed along with the section it pointed at.
 *
 * The client design also shows "For Families" and "About". Neither has any
 * source copy yet, and shipping a nav item that goes nowhere is worse than
 * shipping a shorter nav, so both are held back until content exists.
 * See docs/assets.md.
 */
export const PRIMARY_NAV = [
  { label: "Services", href: ANCHORS.services },
  { label: "For Communities", href: ANCHORS.forCommunities },
  { label: "ElderSmiles", href: ROUTES.eldersmiles },
  { label: "Contact", href: ROUTES.contact },
] as const

export const FOOTER_EXPLORE = [
  { label: "Services", href: ANCHORS.services },
  { label: "For Communities", href: ANCHORS.forCommunities },
  { label: "ElderSmiles", href: ROUTES.eldersmiles },
] as const

export type NavItem = (typeof PRIMARY_NAV)[number] | (typeof FOOTER_EXPLORE)[number]
