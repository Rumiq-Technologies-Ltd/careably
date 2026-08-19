import type { InquiryField } from "@/features/inquiry/validation/inquiry.schema"

/**
 * State returned by the inquiry Server Action.
 *
 * There is no "success" variant: a successful submission redirects to
 * /thank-you, so the only states the form ever renders are its initial one and
 * a failure.
 */
export interface InquiryFormState {
  status: "idle" | "error"
  /** Form-level message. Field-level problems go in fieldErrors instead. */
  message?: string
  fieldErrors?: Partial<Record<InquiryField, string>>
  /** Echoed back so a submission is never lost when validation fails. */
  values?: Record<string, string>
}

export const INITIAL_INQUIRY_STATE: InquiryFormState = { status: "idle" }
