import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/layout/Container"
import { buttonVariants } from "@/components/ui/button"
import { ANCHORS, ROUTES } from "@/constants/routes"
import { CTA, SITE } from "@/constants/site"

/**
 * Nothing is laid over the photograph.
 *
 * From `lg` the image bleeds to the right edge of the viewport and the copy is
 * held to the left 46%, so the two never overlap and no scrim is needed to keep
 * the text readable. The only overlay is a narrow 80px fade on the image's own
 * left edge, purely to soften the seam against the page.
 *
 * Below `lg` there is not enough width to sit them side by side, so the image
 * drops into normal flow underneath the copy at its natural aspect ratio.
 * Still no overlay: a photograph behind text needs a scrim, a photograph beside
 * or below text does not.
 *
 * One `<Image>` serves both layouts. It is repositioned with `lg:absolute`
 * rather than duplicated, so the browser fetches a single file.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <Container>
        <div className="flex min-h-[520px] flex-col justify-center py-12 lg:py-20">
          <div className="lg:max-w-[46%]">
            <h1 className="text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05]">
              Healthcare and services, brought{" "}
              <span className="text-teal-600">to you.</span>
            </h1>

            <p className="mt-6 max-w-[530px] text-[1.125rem] leading-relaxed text-ink">
              {SITE.description}
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link href={ANCHORS.services} className={buttonVariants()}>
                {CTA.services}
              </Link>
              <Link
                href={ROUTES.contact}
                className={buttonVariants({ variant: "outline" })}
              >
                {CTA.partner}
              </Link>
            </div>
          </div>

          <div className="relative mt-10 aspect-1117/615 w-full overflow-hidden rounded-2xl lg:absolute lg:inset-y-0 lg:right-0 lg:left-1/2 lg:mt-0 lg:aspect-auto lg:h-full lg:w-auto lg:rounded-none">
            <Image
              src="/images/hero-care.jpg"
              alt="A care worker sitting with a resident in her own living room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover object-center"
            />

            {/* Narrow seam fade, desktop only. Nothing else touches the photo. */}
            <div
              className="absolute inset-y-0 left-0 hidden w-20 bg-linear-to-r from-white to-transparent lg:block"
              aria-hidden
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
