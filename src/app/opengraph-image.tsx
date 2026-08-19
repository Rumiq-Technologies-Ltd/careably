import { ImageResponse } from "next/og"

import { SITE } from "@/constants/site"

export const alt = `${SITE.name}. Healthcare and services, brought to you.`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Social card. Typographic on purpose: the two supplied logo files disagree
 * with each other and neither is a vector, so the wordmark is set in type the
 * same way it is in the header. See docs/assets.md.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#082a66",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
            <span style={{ color: "#ffffff" }}>{SITE.nameParts.lead}</span>
            <span style={{ color: "#35bcae" }}>{SITE.nameParts.trail}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 66,
              lineHeight: 1.15,
              color: "#ffffff",
              maxWidth: 920,
            }}
          >
            Healthcare and services, brought to you.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.25)",
            paddingTop: 32,
            fontSize: 26,
            color: "#dae3f2",
          }}
        >
          <span style={{ maxWidth: 760 }}>{SITE.tagline}</span>
          <span style={{ whiteSpace: "nowrap", flexShrink: 0, paddingLeft: 40, color: "#35bcae" }}>
            {SITE.domain}
          </span>
        </div>
      </div>
    ),
    size
  )
}
