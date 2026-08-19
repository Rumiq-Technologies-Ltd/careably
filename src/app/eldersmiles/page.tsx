import type { Metadata } from "next"
import Image from "next/image"
import { Info } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { PartnerCtaBand } from "@/components/shared/PartnerCtaBand"
import { StructuredData } from "@/components/shared/StructuredData"
import {
  ELDERSMILES_BILLING,
  ELDERSMILES_CLUSTERS,
  ELDERSMILES_MEDICAID_DISCLOSURE,
  ELDERSMILES_PROMO,
  ELDERSMILES_SPECIALIZED,
} from "@/constants/eldersmiles"
import { ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/site"
import { buildBreadcrumbSchema } from "@/constants/structuredData"

const description =
  "ElderSmiles is the dental service in the Careably network, delivering professional dental care right where residents live."

export const metadata: Metadata = {
  title: "ElderSmiles",
  description,
  alternates: { canonical: ROUTES.eldersmiles },
  openGraph: {
    title: `ElderSmiles | ${SITE.name}`,
    description,
    url: `${SITE.url}${ROUTES.eldersmiles}`,
  },
}

export default function EldersmilesPage() {
  const [designedFor, canInclude, neverForced] = ELDERSMILES_SPECIALIZED

  return (
    <>
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "ElderSmiles", path: ROUTES.eldersmiles },
        ])}
      />

      <section className="bg-surface-tint pt-12 pb-14 md:pt-16 md:pb-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow">{ELDERSMILES_PROMO.eyebrow}</p>
              <h1 className="mt-3.5 text-[clamp(1.875rem,3.6vw,2.75rem)]">
                ElderSmiles
              </h1>
              <p className="measure mt-5 text-[1.125rem] leading-relaxed text-ink-muted">
                {ELDERSMILES_PROMO.body}
              </p>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src="/images/dr-sheryar.png"
                alt="An ElderSmiles dentist treating a resident"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.125rem)]">
          What is included
        </h2>

        <div className="reveal mt-10 grid gap-10 md:grid-cols-3">
          {ELDERSMILES_CLUSTERS.map((cluster) => (
            <div key={cluster.title}>
              <h3 className="font-sans text-[0.9375rem] font-bold tracking-wide text-teal-800 uppercase">
                {cluster.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3.5">
                {cluster.services.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex gap-3.5">
                    <Icon
                      className="mt-0.5 size-5 shrink-0 text-teal-700"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="text-[1rem] leading-relaxed text-ink">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <h2 className="text-[clamp(1.5rem,2.6vw,2.125rem)]">
            Built for specialized care needs
          </h2>

          <div>
            <p className="measure text-[1.0625rem] leading-relaxed text-ink">
              {designedFor}
            </p>
            <p className="measure mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">
              {canInclude}
            </p>
            <p className="mt-7 rounded-xl border-l-4 border-teal-600 bg-white px-6 py-5 text-[1.0625rem] leading-relaxed text-navy-900">
              {neverForced}
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.125rem)]">
          Coverage and billing
        </h2>

        <div className="measure mt-6 flex flex-col gap-4 text-[1.0625rem] leading-relaxed text-ink">
          {ELDERSMILES_BILLING.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {/*
          Required disclosure. Given its own callout rather than buried in the
          paragraph run, because a facility buyer needs to see it.
        */}
        <p className="measure mt-8 flex items-start gap-3 rounded-xl bg-surface-tint p-6 text-[1.0625rem] leading-relaxed text-navy-900">
          <Info className="mt-0.5 size-5 shrink-0 text-teal-700" strokeWidth={1.75} aria-hidden />
          {ELDERSMILES_MEDICAID_DISCLOSURE}
        </p>
      </Section>

      <PartnerCtaBand />
    </>
  )
}
