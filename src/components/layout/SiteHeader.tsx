import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"
import { MobileNav } from "@/components/layout/MobileNav"
import { Wordmark } from "@/components/layout/Wordmark"
import { PRIMARY_NAV } from "@/constants/navigation"
import { ROUTES } from "@/constants/routes"
import { CTA } from "@/constants/site"

/**
 * 78px including the hairline, matching the design. The 77px content row plus
 * a 1px border lands exactly on it.
 *
 * The nav collapses at `lg` rather than `md`: five items plus a button do not
 * fit on one line at tablet widths, and a wrapped nav is broken.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eef2f4] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-[77px] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:text-teal-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.contact}
            className={buttonVariants({ className: "hidden lg:inline-flex" })}
          >
            {CTA.header}
          </Link>

          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
