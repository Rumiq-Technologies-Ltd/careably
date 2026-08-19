import { escapeHtml, sanitizeHeaderValue } from "@/emails/escape"
import { SITE } from "@/constants/site"
import type { EmailMessage } from "@/emails/inquiryNotification"
import type { Inquiry } from "@/features/inquiry/validation/inquiry.schema"

/**
 * Sent to the person who submitted the form.
 *
 * Deliberately promises no response time. Nothing in the source material
 * commits to one, so stating a turnaround here would be invented. It points
 * back at email instead, which is a real answer.
 */
export function buildInquiryAcknowledgement(inquiry: Inquiry): EmailMessage {
  const subject = sanitizeHeaderValue(`We received your ${SITE.name} inquiry`)
  const firstName = inquiry.fullName.split(" ")[0] ?? inquiry.fullName

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f9fc;font-family:Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:32px;background:#ffffff;border-radius:12px;">
      <h1 style="margin:0 0 20px;color:#082a66;font-size:22px;">Thank you, ${escapeHtml(firstName)}.</h1>
      <p style="margin:0 0 16px;color:#172033;font-size:15px;line-height:1.6;">
        We have received your inquiry and will be in touch to talk through what your community needs and how ${escapeHtml(SITE.name)} can help.
      </p>
      <p style="margin:0 0 24px;color:#172033;font-size:15px;line-height:1.6;">
        If anything is urgent, reply to this email and it will reach us directly.
      </p>
      <p style="margin:0;padding-top:16px;border-top:1px solid #dce8ed;color:#5e6878;font-size:13px;line-height:1.6;">
        ${escapeHtml(SITE.name)}<br />
        ${escapeHtml(SITE.tagline)}<br />
        ${escapeHtml(SITE.address.locality)}, ${escapeHtml(SITE.address.regionName)}
      </p>
    </div>
  </body>
</html>`

  const text = [
    `Thank you, ${firstName}.`,
    "",
    `We have received your inquiry and will be in touch to talk through what your community needs and how ${SITE.name} can help.`,
    "",
    "If anything is urgent, reply to this email and it will reach us directly.",
    "",
    SITE.name,
    SITE.tagline,
    `${SITE.address.locality}, ${SITE.address.regionName}`,
  ].join("\n")

  return { subject, html, text }
}
