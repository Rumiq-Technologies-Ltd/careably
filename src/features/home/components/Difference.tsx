import Link from "next/link"

import { Section } from "@/components/layout/Section"
import { buttonVariants } from "@/components/ui/button"
import { EcosystemDiagram } from "@/features/home/components/EcosystemDiagram"
import { DIFFERENCE } from "@/constants/difference"
import { ANCHORS } from "@/constants/routes"

export function Difference() {
  return (
    <Section
      id="what-we-do"
      className="bg-linear-to-r from-white to-[#f5fbfc]"
      tone="white"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div>
          <p className="eyebrow">{DIFFERENCE.eyebrow}</p>

          <h2 className="mt-3.5 text-[clamp(1.875rem,3.4vw,2.625rem)]">
            {DIFFERENCE.heading}
          </h2>

          <p className="mt-5 max-w-[490px] leading-relaxed text-ink-muted">
            {DIFFERENCE.body}
          </p>

          <Link href={ANCHORS.services} className={buttonVariants({ className: "mt-7" })}>
            {DIFFERENCE.cta}
          </Link>
        </div>

        <EcosystemDiagram />
      </div>
    </Section>
  )
}
