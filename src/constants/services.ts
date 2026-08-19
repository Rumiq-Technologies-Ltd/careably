import { HeartPulse, PersonStanding, Truck, type LucideIcon } from "lucide-react"

export interface ServiceCategory {
  readonly key: string
  readonly icon: LucideIcon
  readonly title: string
  /** Rendered as dot-separated rows, matching the client design. */
  readonly rows: readonly (readonly string[])[]
}

/**
 * Three categories, exactly as the approved design shows them.
 *
 * The earlier HTML scaffold had four columns and called the second one
 * "Arts & Wellness" with a separate "Community Partners" column. The design
 * supersedes it: three columns, and "Wellness".
 */
export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  {
    key: "health",
    icon: HeartPulse,
    title: "Health",
    rows: [
      ["Dental", "Podiatry", "Audiology"],
      ["Primary Care", "Specialty Care"],
      ["Preventive & Chronic Care"],
    ],
  },
  {
    key: "wellness",
    icon: PersonStanding,
    title: "Wellness",
    rows: [["Therapy", "Fitness", "Nutrition"],
      ["Mental Health", " Art & Activities"],
      ["Preventive & Lifestyle Services"],],
  },
  {
    key: "support",
    icon: Truck,
    title: "Support",
    rows: [
      ["Transportation", "Mobility"],
      ["Personal Support", "Coordination"],
      ["And More Community Services"],
    ],
  },
]

export const SERVICES_HEADING = "One Community. Many Needs. One Solution."
