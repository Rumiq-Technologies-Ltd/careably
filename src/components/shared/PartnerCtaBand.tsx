import Link from "next/link"

import { Section } from "@/components/layout/Section"
import { buttonVariants } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"
import { CTA } from "@/constants/site"

/** Closing band. Navy into teal, from the client design. */
export function PartnerCtaBand() {
  return (
    <Section tone="teal" compact>
      <div className="flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
        <div>
          <h2 className="text-[clamp(1.5rem,2.8vw,2.25rem)] text-white">
            Better care. Stronger communities. Together.
          </h2>
          {/* Pure white, not white/90: at 90% over the gradient end this measures
              3.3:1 and fails AA at body size. */}
          <p className="mt-2.5 max-w-[680px] text-white">
            Let&rsquo;s bring more convenience, coordination and care to your
            community.
          </p>
        </div>

        <Link
          href={ROUTES.contact}
          className={buttonVariants({
            variant: "white",
            size: "lg",
            className: "shrink-0",
          })}
        >
          {CTA.partner}
        </Link>
      </div>
    </Section>
  )
}
