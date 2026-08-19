import type { Metadata } from "next"
import { Mail, MapPin } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { StructuredData } from "@/components/shared/StructuredData"
import { ROUTES } from "@/constants/routes"
import { CTA, SITE } from "@/constants/site"
import { buildBreadcrumbSchema } from "@/constants/structuredData"
import { InquiryForm } from "@/features/inquiry/components/InquiryForm"
import { WHY_CARDS } from "@/constants/why"

const description =
  "Tell us about your community and we will follow up to talk through services, coordination and next steps."

export const metadata: Metadata = {
  title: CTA.partner,
  description,
  alternates: { canonical: ROUTES.contact },
  openGraph: {
    title: `${CTA.partner} | ${SITE.name}`,
    description,
    url: `${SITE.url}${ROUTES.contact}`,
  },
}

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: CTA.partner, path: ROUTES.contact },
        ])}
      />

      <section className="bg-surface-tint pt-12 pb-14 md:pt-16 md:pb-16">
        <Container>
          <h1 className="max-w-3xl text-[clamp(1.875rem,3.6vw,2.75rem)]">
            {CTA.partner}
          </h1>
          <p className="measure mt-5 text-[1.125rem] leading-relaxed text-ink-muted">
            {description}
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-[clamp(1.375rem,2.2vw,1.75rem)]">
              What happens next
            </h2>

            <ol className="mt-6 flex flex-col gap-5">
              {[
                "We read your inquiry and get in touch by email.",
                "We talk through which services your residents need most.",
                "We agree a starting point and put the first visits on your calendar.",
              ].map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[0.875rem] font-bold text-white"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-ink">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 border-t border-hairline pt-8">
              <ul className="flex flex-col gap-3.5 text-[0.9375rem]">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="inline-flex items-center gap-3 font-semibold text-navy-900 transition-colors hover:text-teal-800"
                  >
                    <Mail className="size-5 text-teal-700" strokeWidth={1.75} aria-hidden />
                    {SITE.email}
                  </a>
                </li>
                <li className="inline-flex items-center gap-3 text-ink-muted">
                  <MapPin className="size-5 text-teal-700" strokeWidth={1.75} aria-hidden />
                  {SITE.address.locality}, {SITE.address.regionName}
                </li>
              </ul>

              <ul className="mt-8 flex flex-col gap-2.5">
                {WHY_CARDS.map((card) => (
                  <li
                    key={card.title}
                    className="text-[0.9375rem] text-ink-muted"
                  >
                    <span className="font-semibold text-navy-900">
                      {card.title}.
                    </span>{" "}
                    {card.body}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <InquiryForm />
        </div>
      </Section>
    </>
  )
}
