import Link from "next/link"

import { cn } from "@/lib/utils"
import { ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/site"

/**
 * Typographic wordmark: navy "Care", teal "ably".
 *
 * Type rather than an image, for the same reason the client's own HTML sets it
 * that way. Two logo files were supplied and they disagree: the standalone
 * JPEG is a stacked heart-and-figure lockup, while the approved page design
 * shows a circular "C" monogram beside the wordmark. Neither exists as an SVG,
 * and the stacked lockup is illegible at a 78px header height. Drop the mark in
 * beside this once a vector arrives. See docs/assets.md.
 */
export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string
  tone?: "dark" | "light"
}) {
  return (
    <Link
      href={ROUTES.home}
      className={cn(
        "font-serif text-[1.75rem] leading-none font-bold tracking-tight",
        tone === "dark" ? "text-navy-900" : "text-white",
        className
      )}
      aria-label={`${SITE.name} home`}
    >
      {SITE.nameParts.lead}
      <span className={tone === "dark" ? "text-teal-600" : "text-teal-300"}>
        {SITE.nameParts.trail}
      </span>
    </Link>
  )
}
