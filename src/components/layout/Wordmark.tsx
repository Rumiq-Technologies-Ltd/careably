import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import mark from "@/app/icon.png"
import { ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/site"

/** Mark + wordmark. `mark` is the heart icon already cropped for icon.png/favicon. */
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
      className={cn("flex items-center gap-2.5", className)}
      aria-label={`${SITE.name} home`}
    >
      <Image src={mark} alt="" className="h-18 w-18 rounded-lg" priority />
      <span
        className={cn(
          "font-serif text-[3.25rem] leading-none font-bold tracking-tight",
          tone === "dark" ? "text-navy-900" : "text-white"
        )}
      >
        {SITE.nameParts.lead}
        <span className={tone === "dark" ? "text-teal-600" : "text-teal-300"}>
          {SITE.nameParts.trail}
        </span>
      </span>
    </Link>
  )
}
