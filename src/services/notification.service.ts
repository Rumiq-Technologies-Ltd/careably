import { buildInquiryAcknowledgement } from "@/emails/inquiryAcknowledgement"
import { buildInquiryNotification } from "@/emails/inquiryNotification"
import { getEnv } from "@/lib/env"
import { logger } from "@/lib/logger"
import { getResendClient } from "@/lib/resend/client"
import type { Inquiry } from "@/features/inquiry/validation/inquiry.schema"

/**
 * Delivers an inquiry by email.
 *
 * The two messages are not equally important and are not treated as one unit.
 * The notification to the practice is the inquiry: if it fails, the submission
 * failed and the caller must say so. The acknowledgement to the submitter is a
 * courtesy, so a failure there is logged and swallowed. Losing a lead because
 * a confirmation bounced would be the wrong trade.
 */
export async function sendInquiryEmails(
  inquiry: Inquiry,
  correlationId: string
): Promise<void> {
  const env = getEnv()
  const resend = getResendClient()
  const notification = buildInquiryNotification(inquiry, correlationId)

  const { error } = await resend.emails.send({
    from: env.INQUIRY_FROM_EMAIL,
    to: env.INQUIRY_TO_EMAIL,
    // Lets staff reply straight to the submitter. The address is validated by
    // the schema and never interpolated into a header we construct by hand.
    replyTo: inquiry.email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
  })

  if (error) {
    logger.error("inquiry.notification.failed", {
      correlationId,
      reason: error.message,
    })
    throw new Error("Inquiry notification could not be delivered")
  }

  logger.info("inquiry.notification.sent", { correlationId })

  try {
    const acknowledgement = buildInquiryAcknowledgement(inquiry)

    const { error: ackError } = await resend.emails.send({
      from: env.INQUIRY_FROM_EMAIL,
      to: inquiry.email,
      subject: acknowledgement.subject,
      html: acknowledgement.html,
      text: acknowledgement.text,
    })

    if (ackError) {
      logger.warn("inquiry.acknowledgement.failed", {
        correlationId,
        reason: ackError.message,
      })
      return
    }

    logger.info("inquiry.acknowledgement.sent", { correlationId })
  } catch (cause) {
    logger.warn("inquiry.acknowledgement.threw", {
      correlationId,
      reason: cause instanceof Error ? cause.message : "unknown",
    })
  }
}
