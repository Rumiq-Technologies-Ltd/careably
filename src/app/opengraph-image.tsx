import { ImageResponse } from "next/og"

import { MARK_DATA_URI } from "@/constants/ogMark"
import { SITE } from "@/constants/site"

export const alt = `${SITE.name}. Healthcare and services, brought to you.`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Social card, also reused as the Twitter card image.
 *
 * The mark is embedded as a base64 data URI rather than fetched: ImageResponse
 * renders during static generation, where a network request for a local asset
 * would be both slower and fragile. `src/constants/ogMark.ts` is generated from
 * the supplied logo; regenerate it if the logo changes.
 *
 * The wordmark stays as type because no vector logo exists yet. See
 * docs/assets.md.
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
          padding: 76,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* White plate so the mark, which is drawn for light grounds,
                reads against the navy field. */}
            <div
              style={{
                display: "flex",
                width: 96,
                height: 96,
                borderRadius: 22,
                background: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/*
                eslint-disable-next-line @next/next/no-img-element --
                ImageResponse renders through Satori, which only understands
                <img>. next/image cannot run inside it, and the source is an
                inlined data URI, so there is nothing to optimise anyway.
              */}
              <img src={MARK_DATA_URI} width={78} height={78} alt="" />
            </div>

            <div style={{ display: "flex", fontSize: 46, fontWeight: 700 }}>
              <span style={{ color: "#ffffff" }}>{SITE.nameParts.lead}</span>
              <span style={{ color: "#35bcae" }}>{SITE.nameParts.trail}</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 64,
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
            paddingTop: 30,
            fontSize: 26,
            color: "#dae3f2",
          }}
        >
          <span style={{ maxWidth: 740 }}>{SITE.tagline}</span>
          <span
            style={{
              whiteSpace: "nowrap",
              flexShrink: 0,
              paddingLeft: 40,
              color: "#35bcae",
            }}
          >
            {SITE.domain}
          </span>
        </div>
      </div>
    ),
    size
  )
}
