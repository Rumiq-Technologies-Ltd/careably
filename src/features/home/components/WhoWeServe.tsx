import { Section } from "@/components/layout/Section"
import {
  COMMUNITIES_HEADING,
  COMMUNITIES_SUBTITLE,
  COMMUNITY_TYPES,
} from "@/constants/communities"

/**
 * Text-only by intent: the client's scaffold marks this block "deliberately
 * text-only; no photographs".
 *
 * This is also the destination for the "For Communities" nav item, which would
 * otherwise have nowhere to point.
 */
export function WhoWeServe() {
  return (
    <Section id="for-communities" tone="tint">
      <h2 className="text-center text-[clamp(1.75rem,3.2vw,2.375rem)]">
        {COMMUNITIES_HEADING}
      </h2>

      <p className="mt-3 text-center text-[1.0625rem] text-ink-muted">
        {COMMUNITIES_SUBTITLE}
      </p>

      <ul className="reveal mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {COMMUNITY_TYPES.map((type) => (
          <li
            key={type}
            className="flex min-h-[105px] items-center justify-center rounded-xl border border-[#d9efed] bg-teal-50 p-5 text-center text-[1rem] font-bold text-navy-900 transition-colors hover:bg-teal-100"
          >
            {type}
          </li>
        ))}
      </ul>
    </Section>
  )
}
