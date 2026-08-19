"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { SITE } from "@/constants/site"
import { submitInquiry as runSubmitInquiry } from "@/services/inquiry.service"
import type { InquiryFormState } from "@/features/inquiry/types/inquiry"
import { INTEREST_OPTIONS } from "@/features/inquiry/validation/inquiry.schema"

/** Fields echoed back so a rejected submission never loses what was typed. */
const ECHOED_FIELDS = [
  "inquiryType",
  "fullName",
  "role",
  "organisation",
  "email",
  "phone",
  "residentCount",
  "city",
  "message",
] as const

function text(formData: FormData, name: string): string {
  const value = formData.get(name)
  return typeof value === "string" ? value.trim() : ""
}

/** Empty strings must not reach the schema as empty strings. */
function optionalText(formData: FormData, name: string): string | undefined {
  const value = text(formData, name)
  return value === "" ? undefined : value
}

function optionalNumber(formData: FormData, name: string): number | undefined {
  const value = text(formData, name)
  if (value === "") return undefined

  // NaN is passed through rather than dropped, so the schema reports a real
  // validation error instead of silently treating "twelve" as "not provided".
  return Number(value)
}

/** Checkbox group. Unknown values are dropped rather than sent to the schema. */
function selectedInterests(formData: FormData): string[] | undefined {
  const allowed = new Set<string>(INTEREST_OPTIONS)
  const selected = formData
    .getAll("interests")
    .filter((value): value is string => typeof value === "string")
    .filter((value) => allowed.has(value))

  return selected.length > 0 ? selected : undefined
}

function echo(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {}

  for (const field of ECHOED_FIELDS) {
    values[field] = text(formData, field)
  }

  return values
}

async function clientKey(): Promise<string> {
  const headerList = await headers()
  const forwarded = headerList.get("x-forwarded-for")

  // First entry is the client; the rest are proxies.
  return (
    forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown"
  )
}

export async function submitInquiryAction(
  _previous: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const renderedAt = Number(text(formData, "renderedAt"))

  const outcome = await runSubmitInquiry(
    {
      inquiryType: text(formData, "inquiryType"),
      fullName: text(formData, "fullName"),
      role: optionalText(formData, "role"),
      organisation: optionalText(formData, "organisation"),
      email: text(formData, "email"),
      phone: text(formData, "phone"),
      residentCount: optionalNumber(formData, "residentCount"),
      city: optionalText(formData, "city"),
      interests: selectedInterests(formData),
      message: optionalText(formData, "message"),
      consent: formData.get("consent") !== null,
    },
    {
      clientKey: await clientKey(),
      honeypot: text(formData, "website"),
      renderedAt:
        Number.isFinite(renderedAt) && renderedAt > 0 ? renderedAt : undefined,
    }
  )

  if (outcome.ok) {
    // Outside any try block on purpose: redirect() signals by throwing, so
    // catching around it would swallow the navigation.
    redirect(ROUTES.thankYou)
  }

  // No phone is published, so the fallback route is email.
  const fallback = `Please try again, or email us at ${SITE.email}.`

  if (outcome.kind === "validation") {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: outcome.fieldErrors,
      values: echo(formData),
    }
  }

  if (outcome.kind === "rate-limited") {
    return {
      status: "error",
      message: `Too many requests from this connection. Please wait a few minutes. ${fallback}`,
      values: echo(formData),
    }
  }

  return {
    status: "error",
    message: `We could not send your request. ${fallback}`,
    values: echo(formData),
  }
}
