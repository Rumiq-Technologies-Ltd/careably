"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/Section"
import { SITE } from "@/constants/site"

/**
 * `retry` rather than `reset`. The prop was renamed and went stable in
 * Next 16.3.0; `reset` still exists but only clears the boundary without
 * re-rendering the segment's contents.
 */
export default function ErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    // The digest is the only safe handle on a production error. The message
    // itself is not shown to the user.
    console.error(
      JSON.stringify({
        level: "error",
        event: "route.render.failed",
        digest: error.digest,
      })
    )
  }, [error])

  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-[clamp(1.75rem,3.4vw,2.75rem)]">
          Something went wrong.
        </h1>

        <p className="measure mx-auto mt-5 text-[1.0625rem] leading-relaxed text-ink-muted">
          The page could not be loaded. You can try again, or email us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-teal-800 underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>

        <Button size="lg" onClick={() => retry()} className="mt-8">
          Try again
        </Button>
      </div>
    </Section>
  )
}
