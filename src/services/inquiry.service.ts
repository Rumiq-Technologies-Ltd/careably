import { logger } from "@/lib/logger"
import { checkRateLimit } from "@/lib/rate-limit"
import { sendInquiryEmails } from "@/services/notification.service"
import { inquirySchema } from "@/features/inquiry/validation/inquiry.schema"
import type {
  Inquiry,
  InquiryField,
} from "@/features/inquiry/validation/inquiry.schema"

/** Submissions faster than this are not human. */
const MIN_FILL_MS = 2000

export interface InquiryContext {
  /** Rate-limit key. Derived from request headers by the caller. */
  clientKey: string
  /** Honeypot field. Must be empty. */
  honeypot: string
  /** Client clock at form mount. Absent without JavaScript, which is fine. */
  renderedAt?: number
}

export type InquiryOutcome =
  | { ok: true }
  | { ok: false; kind: "validation"; fieldErrors: Partial<Record<InquiryField, string>> }
  | { ok: false; kind: "rate-limited" }
  | { ok: false; kind: "delivery" }

/**
 * Business rules for an inquiry. Owns what counts as spam, what makes a
 * submission valid beyond its shape, and what happens when delivery fails.
 * Knows nothing about FormData, React, or HTTP.
 */
export async function submitInquiry(
  input: unknown,
  context: InquiryContext
): Promise<InquiryOutcome> {
  const correlationId = crypto.randomUUID()

  // Bot checks run before validation. There is no reason to spend a schema
  // pass, let alone an API call, on a submission that already failed them.
  if (context.honeypot.trim() !== "") {
    logger.warn("inquiry.rejected.honeypot", { correlationId })
    // Reported to the caller as success on purpose. Telling a bot it was caught
    // is free feedback for whoever is operating it.
    return { ok: true }
  }

  if (
    context.renderedAt !== undefined &&
    Date.now() - context.renderedAt < MIN_FILL_MS
  ) {
    logger.warn("inquiry.rejected.timing", { correlationId })
    return { ok: true }
  }

  if (!checkRateLimit(context.clientKey).allowed) {
    logger.warn("inquiry.rejected.rate-limit", { correlationId })
    return { ok: false, kind: "rate-limited" }
  }

  const parsed = inquirySchema.safeParse(input)

  if (!parsed.success) {
    const fieldErrors: Partial<Record<InquiryField, string>> = {}

    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      if (typeof field === "string" && !(field in fieldErrors)) {
        fieldErrors[field as InquiryField] = issue.message
      }
    }

    logger.warn("inquiry.rejected.validation", {
      correlationId,
      fields: Object.keys(fieldErrors),
    })

    return { ok: false, kind: "validation", fieldErrors }
  }

  const inquiry: Inquiry = parsed.data

  try {
    await sendInquiryEmails(inquiry, correlationId)
  } catch (cause) {
    logger.error("inquiry.delivery.failed", {
      correlationId,
      inquiryType: inquiry.inquiryType,
      reason: cause instanceof Error ? cause.message : "unknown",
    })
    return { ok: false, kind: "delivery" }
  }

  // Type only. No name, address, message body or contact detail in the logs.
  logger.info("inquiry.submitted", {
    correlationId,
    inquiryType: inquiry.inquiryType,
  })

  return { ok: true }
}
