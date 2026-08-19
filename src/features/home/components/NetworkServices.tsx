import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"

import { Section } from "@/components/layout/Section"
import {
  NETWORK_SERVICES,
  NETWORK_SERVICES_HEADING,
  NETWORK_SERVICES_INTRO,
} from "@/constants/partners"

/**
 * The two services operating in the network, and the destination for the
 * hero's "Explore Services" button.
 *
 * ElderSmiles links to its page on this site; Florida Cares Transport is a
 * separate company, so its card opens their site in a new tab and says so both
 * visually and to screen readers.
 */
export function NetworkServices() {
  return (
    <Section id="services">
      <h2 className="text-center text-[clamp(1.75rem,3.2vw,2.375rem)]">
        {NETWORK_SERVICES_HEADING}
      </h2>
      <div className="mx-auto mt-5 h-px w-16 bg-teal-400" aria-hidden />
      <p className="measure mx-auto mt-5 text-center text-ink-muted">
        {NETWORK_SERVICES_INTRO}
      </p>

      <ul className="reveal mt-12 grid gap-6 lg:grid-cols-2">
        {NETWORK_SERVICES.map((service) => {
          const { icon: Icon } = service

          return (
            <li
              key={service.key}
              className="flex flex-col rounded-2xl border border-hairline bg-white p-7 shadow-card md:p-9"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-teal-50">
                <Icon className="size-7 text-teal-700" strokeWidth={1.75} aria-hidden />
              </span>

              <h3 className="mt-5 font-serif text-[1.625rem] text-navy-900">
                {service.name}
              </h3>

              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink">
                {service.summary}
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {service.detail.map((line) => (
                  <p key={line} className="leading-relaxed text-ink-muted">
                    {line}
                  </p>
                ))}
              </div>

              <ul className="mt-6 flex flex-col gap-2.5">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <Check
                      className="mt-1 size-4 shrink-0 text-teal-700"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-ink">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pushed to the card foot so both cards align regardless of copy length. */}
              <div className="mt-auto pt-7">
                {service.external ? (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 font-bold text-teal-800 transition-colors hover:text-teal-900"
                  >
                    {service.linkLabel}
                    <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={service.href}
                    className="inline-flex min-h-11 items-center gap-2 font-bold text-teal-800 transition-colors hover:text-teal-900"
                  >
                    {service.linkLabel}
                    <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
                  </Link>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
