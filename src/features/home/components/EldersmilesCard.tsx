import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { ELDERSMILES_PROMO } from "@/constants/eldersmiles"
import { ROUTES } from "@/constants/routes"

/**
 * ElderSmiles is a dental provider inside the Careably network. The design
 * gives it a single navy card on the home page with its own route behind it.
 */
export function EldersmilesCard() {
  return (
    <section className="bg-white pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-navy-900 p-8 md:p-10 lg:grid-cols-[1fr_0.9fr_0.8fr] lg:gap-10">
          <div>
            <p className="text-[0.8125rem] font-bold tracking-[0.09em] text-teal-300 uppercase">
              {ELDERSMILES_PROMO.eyebrow}
            </p>

            <h2 className="mt-3 text-[clamp(1.625rem,2.8vw,2.125rem)] text-white">
              {ELDERSMILES_PROMO.heading}
            </h2>

            <p className="mt-3.5 leading-relaxed text-navy-100">
              {ELDERSMILES_PROMO.body}
            </p>

            <Link
              href={ROUTES.eldersmiles}
              className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-teal-300 transition-colors hover:text-white"
            >
              {ELDERSMILES_PROMO.link}
              <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
            </Link>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-xl">
            <Image
              src="/images/dr-sheryar.png"
              alt="An ElderSmiles dentist treating a resident"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover"
            />
          </div>

          <ul className="flex flex-col gap-4">
            {ELDERSMILES_PROMO.highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="size-[18px] text-teal-300" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-[0.9375rem] font-semibold text-white">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
