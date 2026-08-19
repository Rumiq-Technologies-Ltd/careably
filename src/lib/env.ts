import { z } from "zod"

/**
 * Server-only environment. Never prefix any of these NEXT_PUBLIC_.
 *
 * Validated lazily rather than at module scope. The inquiry action is reachable
 * from a prerendered page, so validating on import would make `next build` fail
 * on a machine without the secrets. Reading through getEnv() means the build
 * stays green and a missing variable fails loudly at the first send instead.
 */
/*
 * The `error` option is set at the type level, not just on `.min()`. An absent
 * variable is `undefined`, which fails the type check first, so a message
 * attached only to `.min()` would never be reached and the log would read
 * "expected string, received undefined" without naming the variable.
 */
const envSchema = z.object({
  RESEND_API_KEY: z
    .string({ error: "RESEND_API_KEY is not set" })
    .min(1, "RESEND_API_KEY is empty"),

  /** Where inquiries are delivered. */
  INQUIRY_TO_EMAIL: z.email({
    error: "INQUIRY_TO_EMAIL is not set or is not an email address",
  }),

  /**
   * Sender. Accepts either "inquiries@eldersmiles.com" or the
   * "ElderSmiles <inquiries@eldersmiles.com>" display form, so this is not
   * validated as a bare email address. The domain must be verified in Resend.
   */
  INQUIRY_FROM_EMAIL: z
    .string({ error: "INQUIRY_FROM_EMAIL is not set" })
    .min(1, "INQUIRY_FROM_EMAIL is empty"),
})

export type Env = z.infer<typeof envSchema>

let cached: Env | null = null

export function getEnv(): Env {
  if (cached) return cached

  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => issue.message).join("; ")
    // The variable names are safe to surface; the values are not, and none are
    // read here. This message goes to server logs, never to the browser.
    throw new Error(`Invalid server environment: ${missing}`)
  }

  cached = parsed.data
  return cached
}
