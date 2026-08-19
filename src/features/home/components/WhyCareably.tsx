import { cn } from "@/lib/utils"
import { Section } from "@/components/layout/Section"
import { WHY_CARDS, WHY_HEADING } from "@/constants/why"

/**
 * Four cards, each on its own tint rather than one shared colour, following
 * the design. The tints are close enough in value that the dark navy heading
 * and ink body clear AA on all four.
 */
export function WhyCareably() {
  return (
    <Section>
      <h2 className="text-center text-[clamp(1.75rem,3.2vw,2.375rem)]">
        {WHY_HEADING}
      </h2>
      <div className="mx-auto mt-5 h-px w-16 bg-teal-400" aria-hidden />

      <ul className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_CARDS.map(({ icon: Icon, title, body, tint, iconColor }) => (
          <li
            key={title}
            className={cn("rounded-2xl p-7 text-center", tint)}
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white shadow-card">
              <Icon className={cn("size-7", iconColor)} strokeWidth={1.75} aria-hidden />
            </span>

            <h3 className="mt-4 font-sans text-[1.1875rem] font-bold text-navy-900">
              {title}
            </h3>

            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
              {body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
