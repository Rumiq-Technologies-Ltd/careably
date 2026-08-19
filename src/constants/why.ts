import {
  CalendarCheck,
  ShieldCheck,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react"

export interface WhyCard {
  readonly icon: LucideIcon
  readonly title: string
  readonly body: string
  /** Each card carries its own tint in the design, not one shared colour. */
  readonly tint: string
  readonly iconColor: string
}

/**
 * Em-dashes in the design copy for "Convenient" and "Comprehensive" have been
 * rewritten to commas. See CLAUDE.md, content rule on dashes.
 */
export const WHY_CARDS: readonly WhyCard[] = [
  {
    icon: CalendarCheck,
    title: "Convenient",
    body: "Services are brought directly to your community whenever possible, saving time and reducing disruption.",
    tint: "bg-tint-mint",
    iconColor: "text-teal-700",
  },
  {
    icon: Users,
    title: "Coordinated",
    body: "One platform, one point of coordination, and seamless communication for residents, families and communities.",
    tint: "bg-tint-sky",
    iconColor: "text-navy-600",
  },
  {
    icon: ShieldCheck,
    title: "Trusted",
    body: "We work with qualified, credentialed providers and carefully selected service partners you can trust.",
    tint: "bg-tint-lilac",
    iconColor: "text-[#6d5bb8]",
  },
  {
    icon: Star,
    title: "Comprehensive",
    body: "A wide range of health, wellness and support services, tailored to your community's needs.",
    tint: "bg-tint-sand",
    iconColor: "text-[#b0791f]",
  },
]

export const WHY_HEADING = "Why Careably?"
