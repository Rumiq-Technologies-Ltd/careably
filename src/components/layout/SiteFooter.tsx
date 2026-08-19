import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { Wordmark } from "@/components/layout/Wordmark"
import { FOOTER_EXPLORE } from "@/constants/navigation"
import { ROUTES } from "@/constants/routes"
import { CTA, SITE } from "@/constants/site"

/**
 * The design's footer carries five columns and three social icons.
 *
 * Trimmed here to what actually exists. Company, Services and Resources in the
 * design point at About Us, Our Partners, Careers, News, Blog, FAQ and For
 * Providers, none of which have content or a route, and no social profile URLs
 * were supplied. Shipping a column of links that go nowhere is worse than
 * shipping a shorter footer. Restore the columns as the pages land, and see
 * docs/assets.md for the list.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.6fr_1fr_1.2fr] md:gap-10">
        <div className="flex flex-col gap-4">
          <Wordmark tone="light" />
          <p className="text-[0.9375rem] font-semibold text-navy-100">
            {SITE.tagline}
          </p>
          <p className="font-bold text-teal-300">{SITE.domain}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-[0.8125rem] font-bold tracking-[0.09em] text-white uppercase">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {FOOTER_EXPLORE.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] text-navy-100 transition-colors hover:text-teal-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-[0.8125rem] font-bold tracking-[0.09em] text-white uppercase">
            Let&rsquo;s Connect
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-[0.9375rem] text-navy-100">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-teal-300"
              >
                <Mail className="size-4 shrink-0 text-teal-400" aria-hidden />
                {SITE.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-teal-400" aria-hidden />
              {SITE.address.locality}, {SITE.address.regionName}
            </li>
            <li className="pt-2">
              <Link
                href={ROUTES.contact}
                className="font-bold text-teal-300 transition-colors hover:text-white"
              >
                {CTA.partner}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6">
          <p className="text-[0.875rem] text-navy-100">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  )
}
