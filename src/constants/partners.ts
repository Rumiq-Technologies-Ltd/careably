import { Smile, Truck, type LucideIcon } from "lucide-react"

import { ROUTES } from "@/constants/routes"

interface BaseNetworkService {
  readonly key: string
  readonly name: string
  readonly icon: LucideIcon
  /** One line, used as the card's lead. */
  readonly summary: string
  /** Two or three short lines of detail beneath the summary. */
  readonly detail: readonly string[]
  /** Bullet highlights. */
  readonly highlights: readonly string[]
  readonly linkLabel: string
}

/**
 * Split on `external` so the internal href keeps a literal route type.
 * `typedRoutes` validates Link hrefs against the generated route union, and a
 * plain `string` would fail the build.
 */
export type NetworkService =
  | (BaseNetworkService & {
      readonly external: false
      readonly href: (typeof ROUTES)[keyof typeof ROUTES]
    })
  | (BaseNetworkService & { readonly external: true; readonly href: string })

/**
 * The services actually operating in the Careably network today.
 *
 * Two, and only two. Nothing aspirational is listed here: a visitor clicking
 * "Explore Services" should reach things they can actually book.
 *
 * Florida Cares Transport facts are taken from flcarestransport.com. Do not
 * embellish them; they are another company's claims, not ours.
 */
export const NETWORK_SERVICES: readonly NetworkService[] = [
  {
    key: "eldersmiles",
    name: "ElderSmiles",
    icon: Smile,
    summary: "Professional dental care delivered right where residents live.",
    detail: [
      "Clinical teams travel to the community with portable equipment and treat residents in a designated room or at bedside.",
      "Built for residents with dementia, limited mobility, behavioral challenges and complex medical histories.",
    ],
    highlights: [
      "Routine cleanings & exams",
      "Digital x-rays",
      "Denture care & more",
      "Within your community",
    ],
    href: ROUTES.eldersmiles,
    linkLabel: "Learn more about ElderSmiles",
    external: false,
  },
  {
    key: "florida-cares-transport",
    name: "Florida Cares Transport",
    icon: Truck,
    summary: "Compassionate medical transportation, every step of the way.",
    detail: [
      "Non-emergency medical transportation for passengers with mobility needs, wheelchair users and seniors.",
      "Serving Greater Orlando and surrounding areas, including all local airports.",
    ],
    highlights: [
      "Wheelchair transport with ramps and lifts",
      "Stretcher transport, bed to bed",
      "Ambulatory, door to door",
      "Stair chair service",
    ],
    href: "https://flcarestransport.com/",
    linkLabel: "Visit Florida Cares Transport",
    external: true,
  },
]

export const NETWORK_SERVICES_HEADING = "Our services"
export const NETWORK_SERVICES_INTRO =
  "Careably coordinates the providers who deliver care inside your community. These are the services running today."
