import Link from "next/link"

import { Section } from "@/components/layout/Section"
import { buttonVariants } from "@/components/ui/button"
import { ANCHORS, ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/site"

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-[clamp(1.75rem,3.4vw,2.75rem)]">
          We could not find that page.
        </h1>

        <p className="measure mx-auto mt-5 text-[1.0625rem] leading-relaxed text-ink-muted">
          The page may have moved. Try our services, or email us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-teal-800 underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={ROUTES.home} className={buttonVariants()}>
            Back to home
          </Link>
          <Link
            href={ANCHORS.services}
            className={buttonVariants({ variant: "outline" })}
          >
            View services
          </Link>
        </div>
      </div>
    </Section>
  )
}
