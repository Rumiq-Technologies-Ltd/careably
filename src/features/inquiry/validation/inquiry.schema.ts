import { z } from "zod"

export const INQUIRY_TYPES = ["community", "family", "provider", "other"] as const

export const INQUIRY_TYPE_LABELS: Record<
  (typeof INQUIRY_TYPES)[number],
  string
> = {
  community: "A residential community",
  family: "A family member or resident",
  provider: "A service provider",
  other: "Other",
}

/** Mirrors the three service categories shown on the home page. */
export const INTEREST_OPTIONS = ["health", "wellness", "support"] as const

export const INTEREST_LABELS: Record<
  (typeof INTEREST_OPTIONS)[number],
  string
> = {
  health: "Health",
  wellness: "Wellness",
  support: "Support",
}

/** Types that represent an organisation rather than an individual. */
export const ORGANISATION_TYPES = ["community", "provider"] as const

const MESSAGE_MAX = 2000

/**
 * One schema, two passes. The client uses it for immediate feedback, the
 * server re-runs it on the submitted FormData and is the only authority.
 * Never relax this for the sake of the client.
 */
export const inquirySchema = z
  .object({
    inquiryType: z.enum(INQUIRY_TYPES, {
      error: "Please choose the option that describes you.",
    }),

    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(100, "Please keep your name under 100 characters."),

    role: z.string().trim().max(100).optional(),

    organisation: z.string().trim().max(150).optional(),

    email: z
      .email("Please enter a valid email address.")
      .max(254, "That email address is too long."),

    phone: z
      .string()
      .trim()
      .min(7, "Please enter a phone number we can reach you on.")
      .max(30, "Please keep your phone number under 30 characters.")
      .regex(
        /^[\d\s+().-]+$/,
        "Please enter a phone number using digits and the usual separators."
      ),

    residentCount: z
      .number()
      .int()
      .positive("Please enter a number of residents greater than zero.")
      .max(5000, "Please enter a number of residents under 5000.")
      .optional(),

    city: z.string().trim().max(100).optional(),

    interests: z.array(z.enum(INTEREST_OPTIONS)).max(3).optional(),

    message: z
      .string()
      .trim()
      .max(MESSAGE_MAX, `Please keep your message under ${MESSAGE_MAX} characters.`)
      .optional(),

    consent: z.literal(true, {
      error: "Please confirm we may contact you about this inquiry.",
    }),
  })
  .superRefine((value, ctx) => {
    // The organisation name is what makes a community or provider inquiry
    // actionable. Families are not asked for one.
    const needsOrganisation = (ORGANISATION_TYPES as readonly string[]).includes(
      value.inquiryType
    )

    if (needsOrganisation && !value.organisation) {
      ctx.addIssue({
        code: "custom",
        path: ["organisation"],
        message:
          value.inquiryType === "provider"
            ? "Please tell us which organisation you are with."
            : "Please tell us which community you are with.",
      })
    }
  })

export type Inquiry = z.infer<typeof inquirySchema>
export type InquiryField = keyof z.input<typeof inquirySchema>
export const MESSAGE_MAX_LENGTH = MESSAGE_MAX
