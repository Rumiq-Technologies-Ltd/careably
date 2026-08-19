"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CTA, SITE } from "@/constants/site"
import { submitInquiryAction } from "@/features/inquiry/actions/submitInquiry"
import { describedBy, FormField } from "@/features/inquiry/components/FormField"
import { INITIAL_INQUIRY_STATE } from "@/features/inquiry/types/inquiry"
import {
  INQUIRY_TYPES,
  INQUIRY_TYPE_LABELS,
  INTEREST_LABELS,
  INTEREST_OPTIONS,
  MESSAGE_MAX_LENGTH,
  ORGANISATION_TYPES,
} from "@/features/inquiry/validation/inquiry.schema"

const selectClass =
  "h-11 w-full rounded-input border border-input bg-white px-3.5 text-base text-ink outline-none transition-colors focus-visible:border-ring focus-visible:outline-3 focus-visible:outline-ring/40 aria-invalid:border-destructive"

const checkboxClass =
  "size-6 shrink-0 rounded-[4px] border-input accent-teal-600"

/**
 * The form is a plain <form action={serverAction}>, so it submits and validates
 * without JavaScript. The client layer adds three things on top: native
 * constraints for instant feedback, the conditional organisation fields, and a
 * pending state on the button.
 *
 * There is deliberately no client-side validation library. One zod schema runs
 * on the server and is the only authority; duplicating it in the browser would
 * add dependencies and a second source of truth for a form this size.
 */
export function InquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitInquiryAction,
    INITIAL_INQUIRY_STATE
  )

  const [inquiryType, setInquiryType] = useState<string>(
    state.values?.inquiryType || "community"
  )
  const needsOrganisation = (ORGANISATION_TYPES as readonly string[]).includes(
    inquiryType
  )
  const isCommunity = inquiryType === "community"

  const renderedAtRef = useRef<HTMLInputElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  // Stamped after mount rather than during render. A prerendered page would
  // otherwise carry a build-time timestamp and the timing check would never
  // fire. Written straight to the input so this effect sets no state.
  useEffect(() => {
    if (renderedAtRef.current) {
      renderedAtRef.current.value = String(Date.now())
    }
  }, [])

  // Move focus to the summary when a submission comes back rejected, so the
  // reason is announced instead of sitting silently above the fold.
  useEffect(() => {
    if (state.status === "error") {
      summaryRef.current?.focus()
    }
  }, [state])

  const errors = state.fieldErrors ?? {}

  /*
   * Echoed values are read once and then frozen.
   *
   * They exist for the no-JavaScript path, where a rejected POST re-renders the
   * page from scratch and the inputs would otherwise come back empty. With
   * JavaScript the DOM already holds what the user typed, so feeding new
   * defaults on every render changes `defaultValue` on a mounted uncontrolled
   * input, which Base UI warns about and which achieves nothing.
   */
  const [values] = useState(() => state.values ?? {})

  // Native validation is left on. It gives immediate, localised, accessible
  // feedback without a round trip, and it means the schema's conditional rules
  // are reached instead of being skipped: zod does not run object-level
  // refinements when the base shape already failed. The server still
  // re-validates and remains the only authority.
  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 rounded-2xl border border-hairline bg-white p-6 shadow-card md:p-8"
    >
      {state.status === "error" && state.message ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-[0.9375rem] text-destructive outline-none"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0" strokeWidth={2} aria-hidden />
          <p>{state.message}</p>
        </div>
      ) : null}

      <FormField name="inquiryType" label="I am" error={errors.inquiryType}>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          value={inquiryType}
          onChange={(event) => setInquiryType(event.target.value)}
          aria-invalid={Boolean(errors.inquiryType)}
          aria-describedby={describedBy("inquiryType", { error: errors.inquiryType })}
          className={selectClass}
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {INQUIRY_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </FormField>

      <FormField name="fullName" label="Full name" error={errors.fullName}>
        <Input
          id="fullName"
          name="fullName"
          required
          autoComplete="name"
          maxLength={100}
          defaultValue={values.fullName}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={describedBy("fullName", { error: errors.fullName })}
        />
      </FormField>

      {needsOrganisation ? (
        <>
          <FormField
            name="organisation"
            label={isCommunity ? "Community name" : "Organisation name"}
            error={errors.organisation}
          >
            <Input
              id="organisation"
              name="organisation"
              required
              autoComplete="organization"
              maxLength={150}
              defaultValue={values.organisation}
              aria-invalid={Boolean(errors.organisation)}
              aria-describedby={describedBy("organisation", {
                error: errors.organisation,
              })}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField name="role" label="Role or title" optional error={errors.role}>
              <Input
                id="role"
                name="role"
                autoComplete="organization-title"
                maxLength={100}
                defaultValue={values.role}
                aria-invalid={Boolean(errors.role)}
                aria-describedby={describedBy("role", { error: errors.role })}
              />
            </FormField>

            {isCommunity ? (
              <FormField
                name="residentCount"
                label="Approximate residents"
                optional
                error={errors.residentCount}
              >
                <Input
                  id="residentCount"
                  name="residentCount"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={5000}
                  defaultValue={values.residentCount}
                  aria-invalid={Boolean(errors.residentCount)}
                  aria-describedby={describedBy("residentCount", {
                    error: errors.residentCount,
                  })}
                />
              </FormField>
            ) : null}
          </div>
        </>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField name="email" label="Email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email", { error: errors.email })}
          />
        </FormField>

        <FormField name="phone" label="Phone" error={errors.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            maxLength={30}
            defaultValue={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", { error: errors.phone })}
          />
        </FormField>
      </div>

      <FormField name="city" label="City or area" optional error={errors.city}>
        <Input
          id="city"
          name="city"
          autoComplete="address-level2"
          maxLength={100}
          defaultValue={values.city}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={describedBy("city", { error: errors.city })}
        />
      </FormField>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-[0.9375rem] font-semibold text-navy-900">
          Services of interest{" "}
          <span className="font-normal text-ink-muted">Optional</span>
        </legend>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {INTEREST_OPTIONS.map((option) => (
            <Label
              key={option}
              htmlFor={`interest-${option}`}
              className="min-h-11 cursor-pointer items-center gap-3 py-2 font-normal text-ink"
            >
              <input
                id={`interest-${option}`}
                name="interests"
                type="checkbox"
                value={option}
                className={checkboxClass}
              />
              <span className="text-[0.9375rem]">{INTEREST_LABELS[option]}</span>
            </Label>
          ))}
        </div>
      </fieldset>

      <FormField
        name="message"
        label="How can we help?"
        optional
        error={errors.message}
        hint="Please do not include medical or health details in this form."
      >
        <Textarea
          id="message"
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX_LENGTH}
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", {
            error: errors.message,
            hint: true,
          })}
        />
      </FormField>

      <div className="flex flex-col gap-2">
        {/*
          The label wraps the checkbox, so the whole row is the target. It is
          held at 44px so the effective hit area meets the same minimum as
          every other control, not just the 24px box itself.
        */}
        <Label
          htmlFor="consent"
          className="min-h-11 cursor-pointer items-center gap-3 py-2 font-normal text-ink"
        >
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent", { error: errors.consent })}
            className={checkboxClass}
          />
          <span className="text-[0.9375rem] leading-snug">
            I agree to be contacted about this inquiry.
          </span>
        </Label>

        {errors.consent ? (
          <p
            id="consent-error"
            role="alert"
            className="text-[0.875rem] font-medium text-destructive"
          >
            {errors.consent}
          </p>
        ) : null}
      </div>

      {/*
        Honeypot. Hidden from people and from assistive technology, left in the
        DOM for anything filling every field it finds. Not display:none, which
        some bots skip.
      */}
      <div className="absolute h-px w-px overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input ref={renderedAtRef} type="hidden" name="renderedAt" defaultValue="" />

      <Button type="submit" size="lg" disabled={pending} className="mt-2 w-full">
        {pending ? "Sending…" : CTA.partner}
      </Button>

      <p className="text-center text-[0.875rem] text-ink-muted">
        Prefer email? Write to{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="font-semibold text-teal-800 underline underline-offset-4"
        >
          {SITE.email}
        </a>
      </p>
    </form>
  )
}
