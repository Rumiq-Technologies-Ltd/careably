import {
  Bandage,
  BookOpen,
  Ellipsis,
  ScanLine,
  ShieldPlus,
  Smile,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react"

/**
 * ElderSmiles is a dental provider inside the Careably network, not a separate
 * brand with its own site. This file holds everything the promo card on the
 * home page and the /eldersmiles service page need.
 *
 * Source: the ElderSmiles presentation in docs/. Every hedge in that material
 * is preserved verbatim in meaning.
 */

/** The promo card on the Careably home page. */
export const ELDERSMILES_PROMO = {
  eyebrow: "A Careably Service",
  heading: "Meet ElderSmiles",
  body: "Professional dental care delivered right where residents live.",
  link: "Learn more about ElderSmiles",
  highlights: [
    { icon: Sparkles, label: "Routine cleanings & exams" },
    { icon: ScanLine, label: "Digital x-rays" },
    { icon: Smile, label: "Denture care & more" },
    { icon: Ellipsis, label: "Within your community" },
  ] as readonly { icon: LucideIcon; label: string }[],
} as const

export interface ClinicalService {
  readonly icon: LucideIcon
  readonly label: string
}

export interface ServiceCluster {
  readonly title: string
  readonly services: readonly ClinicalService[]
}

/** All seven services from the source, grouped for presentation only. */
export const ELDERSMILES_CLUSTERS: readonly ServiceCluster[] = [
  {
    title: "Exams and diagnostics",
    services: [
      { icon: Stethoscope, label: "Comprehensive and periodic exams" },
      { icon: ScanLine, label: "Digital radiographs and oral cancer screenings" },
    ],
  },
  {
    title: "Prevention and hygiene",
    services: [
      { icon: Sparkles, label: "Cleanings and periodontal maintenance" },
      { icon: ShieldPlus, label: "Fluoride and silver diamine fluoride treatments" },
      { icon: BookOpen, label: "Individual oral-care recommendations and education" },
    ],
  },
  {
    title: "Restorative care and dentures",
    services: [
      { icon: Bandage, label: "Fillings, restorative care, and appropriate extractions" },
      {
        icon: Smile,
        label: "Denture cleaning, adjustments, repairs, relines, impressions, and delivery",
      },
    ],
  },
]

/**
 * The third point is the most important trust statement on the page.
 * Do not shorten or soften it.
 */
export const ELDERSMILES_SPECIALIZED: readonly string[] = [
  "ElderSmiles is designed for residents with dementia, limited mobility, behavioral challenges, and complex medical histories.",
  "Care can include bedside treatment, shorter or multiple visits, consistent clinical teams, and minimally invasive options.",
  "Care is never forced. If a resident becomes distressed or declines treatment, we stop, document the event, notify the appropriate parties, and reassess at a later visit.",
]

/**
 * Coverage and billing. The Florida Medicaid sentence is a required
 * disclosure to a facility buyer and must not be trimmed for length.
 */
export const ELDERSMILES_BILLING: readonly string[] = [
  "ElderSmiles bills the resident's dental insurance or the resident directly.",
  "We credential with major Medicare Advantage and commercial dental plans, verify benefits during enrollment, and provide families with estimated coverage and out-of-pocket costs before treatment.",
  "Traditional Medicare Parts A and B do not cover routine dental care. Private-pay rates are available for residents without applicable coverage.",
]

export const ELDERSMILES_MEDICAID_DISCLOSURE =
  "ElderSmiles does not currently participate in Florida Medicaid."
