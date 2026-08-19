export const ROUTES = {
  home: "/",
  contact: "/contact",
  eldersmiles: "/eldersmiles",
  thankYou: "/thank-you",
} as const

/**
 * In-page anchors on the home route.
 *
 * `services` deliberately targets the two network services rather than the
 * category overview above it: "Explore Services" should land on things a
 * visitor can actually book.
 */
export const ANCHORS = {
  categories: "/#categories",
  services: "/#services",
  forCommunities: "/#for-communities",
} as const
