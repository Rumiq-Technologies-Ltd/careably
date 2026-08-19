import {
  escapeHtml,
  escapeHtmlWithBreaks,
  sanitizeHeaderValue,
} from "@/emails/escape"
import { SITE } from "@/constants/site"
import {
  INQUIRY_TYPE_LABELS,
  INTEREST_LABELS,
  type Inquiry,
} from "@/features/inquiry/validation/inquiry.schema"

export interface EmailMessage {
  subject: string
  html: string
  text: string
}

interface Row {
  label: string
  value: string
}

function buildRows(inquiry: Inquiry): Row[] {
  const rows: Row[] = [
    { label: "Inquiry type", value: INQUIRY_TYPE_LABELS[inquiry.inquiryType] },
    { label: "Name", value: inquiry.fullName },
  ]

  if (inquiry.role) rows.push({ label: "Role", value: inquiry.role })
  if (inquiry.organisation) {
    rows.push({ label: "Organisation", value: inquiry.organisation })
  }

  rows.push({ label: "Email", value: inquiry.email })
  rows.push({ label: "Phone", value: inquiry.phone })

  if (inquiry.residentCount !== undefined) {
    rows.push({ label: "Residents", value: String(inquiry.residentCount) })
  }
  if (inquiry.city) rows.push({ label: "City or area", value: inquiry.city })

  if (inquiry.interests?.length) {
    rows.push({
      label: "Interested in",
      value: inquiry.interests.map((key) => INTEREST_LABELS[key]).join(", "),
    })
  }

  return rows
}

/** Sent to Careably. `replyTo` is set to the submitter by the caller. */
export function buildInquiryNotification(
  inquiry: Inquiry,
  correlationId: string
): EmailMessage {
  const who = inquiry.organisation ?? inquiry.fullName
  const subject = sanitizeHeaderValue(`New inquiry: ${who}`)

  const rows = buildRows(inquiry)

  const htmlRows = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#5e6878;font-size:14px;vertical-align:top;white-space:nowrap;">${escapeHtml(row.label)}</td>
          <td style="padding:6px 0;color:#172033;font-size:15px;font-weight:600;">${escapeHtml(row.value)}</td>
        </tr>`
    )
    .join("")

  const messageBlock = inquiry.message
    ? `
      <p style="margin:28px 0 8px;color:#5e6878;font-size:14px;">Message</p>
      <div style="padding:16px;background:#f4f9fc;border-radius:8px;color:#172033;font-size:15px;line-height:1.6;">${escapeHtmlWithBreaks(inquiry.message)}</div>`
    : ""

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f9fc;font-family:Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:32px;background:#ffffff;border-radius:12px;">
      <p style="margin:0 0 4px;color:#0a6b65;font-size:12px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;">${escapeHtml(SITE.name)}</p>
      <h1 style="margin:0 0 24px;color:#082a66;font-size:22px;">New inquiry from ${escapeHtml(who)}</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${htmlRows}</table>
      ${messageBlock}
      <p style="margin:32px 0 0;padding-top:16px;border-top:1px solid #dce8ed;color:#5e6878;font-size:12px;">
        Reply directly to this email to reach ${escapeHtml(inquiry.fullName)}.<br />
        Reference ${escapeHtml(correlationId)}
      </p>
    </div>
  </body>
</html>`

  const textRows = rows.map((row) => `${row.label}: ${row.value}`).join("\n")
  const text = [
    `New inquiry from ${who}`,
    "",
    textRows,
    inquiry.message ? `\nMessage:\n${inquiry.message}` : "",
    "",
    `Reply directly to this email to reach ${inquiry.fullName}.`,
    `Reference ${correlationId}`,
  ]
    .filter(Boolean)
    .join("\n")

  return { subject, html, text }
}
