/**
 * HTML-escape a user-supplied value before it enters an email template.
 *
 * Email clients render HTML, so an unescaped submission is a live injection
 * vector into the practice's inbox. Every interpolation in every template goes
 * through this.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Strip anything that could break out of a header line.
 *
 * A newline in a subject lets a caller append their own headers (Bcc, Reply-To)
 * to the outgoing message. Collapse all whitespace and cap the length.
 */
export function sanitizeHeaderValue(value: string, maxLength = 120): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
}

/** Preserve submitted line breaks without allowing markup through. */
export function escapeHtmlWithBreaks(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />")
}
