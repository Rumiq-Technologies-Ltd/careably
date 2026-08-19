import {
  Building2,
  Ear,
  Ellipsis,
  Footprints,
  Leaf,
  Smile,
  Stethoscope,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react"

export interface EcosystemNode {
  readonly label: string
  readonly icon: LucideIcon
}

/** Left-hand column of the ecosystem diagram. */
export const ECOSYSTEM_LEFT: readonly EcosystemNode[] = [
  { label: "Dental", icon: Smile },
  { label: "Podiatry", icon: Footprints },
  { label: "Audiology", icon: Ear },
  { label: "Primary Care", icon: Stethoscope },
]

/** Right-hand column of the ecosystem diagram. */
export const ECOSYSTEM_RIGHT: readonly EcosystemNode[] = [
  { label: "Therapy", icon: Users },
  { label: "Wellness", icon: Leaf },
  { label: "Transportation", icon: Truck },
  { label: "And More", icon: Ellipsis },
]

export const ECOSYSTEM_TOP: EcosystemNode = {
  label: "Residents & Families",
  icon: Users,
}

export const ECOSYSTEM_BOTTOM: EcosystemNode = {
  label: "Communities",
  icon: Building2,
}

export const DIFFERENCE = {
  eyebrow: "The Careably Difference",
  heading: "All the right services. One trusted partner.",
  // The design sets an em-dash before "making". Rewritten to a comma.
  body: "Careably is a comprehensive service platform that connects residents, families, communities and providers, making it easier to access the care and services that improve quality of life.",
  cta: "How It Works",
} as const
