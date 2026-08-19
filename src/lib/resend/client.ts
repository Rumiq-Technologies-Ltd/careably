import { Resend } from "resend"

import { getEnv } from "@/lib/env"

let client: Resend | null = null

/**
 * The only place in the codebase that knows Resend exists. Swapping providers
 * should mean rewriting this file and nothing else.
 *
 * Constructed lazily so importing this module does not require the API key,
 * which keeps `next build` working without secrets present.
 */
export function getResendClient(): Resend {
  if (!client) {
    client = new Resend(getEnv().RESEND_API_KEY)
  }

  return client
}
