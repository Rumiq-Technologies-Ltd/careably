import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Section } from "@/components/layout/Section"
import { ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/site"

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-[clamp(1.75rem,3.4vw,2.75rem)]">
          Thank you for reaching out.
        </h1>

        <p className="measure mx-auto mt-5 text-[1.125rem] leading-relaxed text-ink-muted">
          We have received your inquiry and will be in touch to talk through
          what your community needs and how {SITE.name} can help.
        </p>

        <p className="measure mx-auto mt-4 text-ink-muted">
          Anything urgent? Email us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-teal-800 underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>

        <Link
          href={ROUTES.home}
          className={buttonVariants({ variant: "outline", className: "mt-10" })}
        >
          Back to home
        </Link>
      </div>
    </Section>
  )
}
