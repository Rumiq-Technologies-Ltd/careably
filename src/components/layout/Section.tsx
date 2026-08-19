import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"

type Tone = "white" | "tint" | "navy" | "teal"

const toneClass: Record<Tone, string> = {
  white: "bg-white text-ink",
  tint: "bg-surface-tint text-ink",
  navy: "bg-navy-900 text-white",
  /*
   * The CTA band gradient, navy into teal, from the client design.
   *
   * The end stop is teal-800 rather than the design's brighter teal: body copy
   * in the band is white, and on narrow viewports it spans the full width and
   * lands on the gradient's far end. White on teal-600 measures 3.44:1, which
   * fails AA at body size. teal-800 measures 6.36:1.
   */
  teal: "bg-linear-to-r from-navy-900 to-teal-800 text-white",
}

/**
 * Vertical rhythm for the whole site. Nothing sets its own section padding.
 *
 * Kept tight on purpose: the original py-16/20/24 scale left 128-192px of dead
 * space between adjacent sections once their own paddings stacked.
 */
export function Section({
  id,
  tone = "white",
  bleed = false,
  compact = false,
  className,
  containerClassName,
  children,
}: {
  id?: string
  tone?: Tone
  /** Skip the Container, for sections that manage their own full-bleed layout. */
  bleed?: boolean
  /** Tighter rhythm, for statement bands rather than content sections. */
  compact?: boolean
  className?: string
  containerClassName?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        toneClass[tone],
        compact ? "py-8 md:py-10" : "py-10 md:py-14 lg:py-16",
        // Anchored sections need room under the sticky header when jumped to.
        id && "scroll-mt-24",
        className
      )}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  )
}
