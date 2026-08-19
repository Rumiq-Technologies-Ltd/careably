import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { StructuredData } from "@/components/shared/StructuredData"
import { SITE } from "@/constants/site"
import { buildOrganizationSchema } from "@/constants/structuredData"
import "./globals.css"

/*
 * The design sets headings in a bookish transitional serif and everything else
 * in a geometric grotesque. Source Serif 4 and Plus Jakarta Sans are the
 * closest webfont pair, and both are variable, so the two files below cover
 * every weight the site uses.
 */
const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
})

const title = "Careably | Healthcare and Services, Brought to You"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

// Separate export. themeColor inside `metadata` has been deprecated since 14.
export const viewport: Viewport = {
  themeColor: "#082a66",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Next 16 no longer overrides scroll-behavior during navigation, so
      // in-page anchor CTAs need this opt-in to animate rather than jump.
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <StructuredData data={buildOrganizationSchema()} />

        <a
          href="#main"
          className="sr-only rounded-[7px] bg-navy-900 px-5 py-3 font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  )
}
