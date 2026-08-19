@AGENTS.md

# CLAUDE.md — Careably

> Project: Careably Website
> Framework: Next.js 16 (App Router)
> Language: TypeScript (strict)
> UI: React 19 + Tailwind CSS v4 + shadcn/ui
> Email: Resend
> Deployment: Vercel
> Version: 2.0
> Last Updated: August 2026

---

## Precedence

A general engineering handbook lives at `../CLAUDE.md` (the `Projects/` directory), written for **PeptoLogics**, a research-peptide e-commerce site. Its universal principles still apply here: TypeScript strictness, naming, separation of concerns, security posture, accessibility, git workflow, and the Definition of Done.

**Where the two conflict, this file wins.** These sections of the parent handbook **do not apply**: product catalog, cart, checkout, `MAX_CART_ITEMS`, subtotal calculation; Supabase, PostgreSQL, migrations, RLS, repository layer, `orders` / `order_items` / `products` tables; WhatsApp Cloud API and Twilio; and the PeptoLogics colour system and Inter typography.

### This project was previously ElderSmiles

Careably is not a rename of ElderSmiles. It is a different business:

| | ElderSmiles | Careably |
| --- | --- | --- |
| What it is | One dental practice | A coordination platform |
| Delivers | Dental care | Access to many providers |
| Categories | Dentistry only | Health, Wellness, Support |
| Buyer | Facility administrator | Residential communities, families, providers |

**ElderSmiles now exists inside Careably** as the dental provider in the network. It has a promo card on the home page and its own page at `/eldersmiles`. Everything else from the old site (fee schedule, infection control, operatory coordination, documentation cadence, onboarding timeline, Dr. Khan, Contemporary Dental Care, the `$0` facility model) has been removed. Do not reintroduce it without a reason.

---

## 1. What Careably Is

Careably connects residential communities and their residents with trusted health, wellness and support services, delivered where people live. It coordinates; it does not itself provide clinical care. That distinction matters in copy and in structured data: the site uses `Organization`, never `MedicalOrganization`, because claiming a clinical role the platform does not hold would be false.

**Three audiences**: residential communities (the primary buyer), families and residents, and service providers who want to join the network. The inquiry form serves all three.

### The user journey

```
Land on home
    ↓
Understand the model (many services, one coordinator, delivered on site)
    ↓
See the categories and who Careably serves
    ↓
Partner With Careably
    ↓
Careably follows up by email
```

Every engineering decision should make one of those steps faster, clearer, or more trustworthy.

---

## 2. Source of Truth

Two client artefacts, and they disagree in places:

| Artefact | Status |
| --- | --- |
| `docs/careably-landing-design.jpeg` | **Authoritative.** The approved visual design. Layout, section order, nav, copy. |
| The client's HTML scaffold | Secondary. Authoritative for the exact hex values, which are its CSS variables. |

**Where they conflict, the design wins.** Known conflicts, already resolved: three service categories rather than four; "Wellness" rather than "Arts & Wellness"; the hero headline is "Healthcare and services, brought to you."; the design adds the ElderSmiles card, which the HTML lacks. The HTML's "Who We Serve" block was kept even though the design omits it, because the design's "For Communities" nav item otherwise has nowhere to point.

**Since removed at the client's request**, and not to be reinstated from the design: the "Careably Difference" section with its ecosystem diagram, and the "What We Do" nav item that pointed at it. The Wellness category is now a single line, "Art and Activities". The ElderSmiles promo card was replaced by the two-card `Our services` section.

Approved copy lives in **`docs/content.md`**. Edit copy there first, then the component. Lists render from typed data in `src/constants/`.

### Content rules (non-negotiable)

**2.1 — Invent nothing.**
No testimonials, review counts, logo walls, years in business, resident totals, or success percentages. There is no source data for any of it. If a section needs credibility, use what the client actually supplied.

**2.2 — Never publish a placeholder as fact.**
The design shows `(407) 123-4567` and `info@careably.care`. The first is a placeholder pattern and is **not published**; `SITE.phone` is `null` and the structured data omits `telephone`. The second was superseded by the client: the address is **hello@careably.care**.

**2.3 — Zero em-dashes.**
No `—` and no `–` anywhere user-visible. The design copy contains three (in the hero subtext, the Difference body, and two Why cards). All were rewritten to commas. Keep it that way.

**2.4 — Two services, and only two.**
ElderSmiles and Florida Cares Transport are what the network actually runs today. The `Our services` section and the hero's "Explore Services" button both lead there. Do not list aspirational providers. Florida Cares Transport is a separate company: its facts come from flcarestransport.com, its card links out with `target="_blank" rel="noopener noreferrer"`, and its claims must not be embellished into ours.

**2.5 — No dead links.**
The design's nav shows "For Families" and "About", and its footer shows Company, Services and Resources columns. None of those have copy or a route. They are held back rather than shipped pointing at `#`. Restore them as content lands, and see `docs/assets.md`.

**2.6 — No PHI invitation.**
The inquiry form carries helper text telling people not to include medical or health details. A public form that collects health information creates a records-handling obligation nobody wants.

**2.7 — ElderSmiles content keeps its hedges.**
`/eldersmiles` inherits the old material's disclosures verbatim in meaning, including **"ElderSmiles does not currently participate in Florida Medicaid."** and the "Care is never forced" statement. Do not trim either for length.

---

## 3. Brand System

Colours are the client's own CSS variables, not sampled. Full detail and measured contrast in `docs/brand.md`.

| Token | Hex | Role |
| --- | --- | --- |
| `navy-900` | `#082a66` | Primary. Headlines, header CTA, footer, dark bands. |
| `navy-950` | `#051f4d` | Footer background. |
| `teal-500` | `#12aa9d` | Brand accent. **Decoration only, never text.** |
| `teal-700` | `#07877f` | Focus ring, icon glyphs. |
| `teal-800` | `#0a6b65` | Any teal that carries or sits behind text. |
| `surface-tint` | `#f4f9fc` | Alternating section background. |
| `ink` | `#172033` | Body text. |
| `ink-muted` | `#5e6878` | Secondary text. |

**Locks:**

- **Theme lock:** light only. No `dark:` variants, no `prefers-color-scheme`.
- **Teal contrast lock:** `teal-500` measures 2.89:1 on white and 3.44:1 behind white text. It never carries text and never sits behind text. Use `teal-800` for both. This is why the CTA band gradient and the "Communities" node are darker than the design shows.
- **Shape lock:** buttons and inputs `7px` (from the client CSS), cards `14px`, large panels `16px`.
- **Radius, spacing and type scale** all live in `globals.css`. Nothing sets its own section padding.

**Typography.** Display `Source Serif 4`, body `Plus Jakarta Sans`, both via `next/font/google`. The design sets headings in a bookish serif and everything else in a geometric grotesque; this is the closest webfont pair. Body base is 17px.

**CTA labels.** `CTA.header` is "Get Started", `CTA.partner` is "Partner With Careably", `CTA.services` is "Explore Services". The first two share the contact intent, which would normally not be allowed. The design uses both, and matching the approved design wins.

**Icons.** `lucide-react`, `strokeWidth={1.75}`. The reference HTML used emoji glyphs (`♡ ✦ ◎ ⌂`); those are not accessible or consistent across platforms and were replaced.

**Motion.** CSS only. Scroll reveal via `animation-timeline: view()` behind `@supports` and `prefers-reduced-motion`, static as the default. No animation library, no scroll listeners.

---

## 4. Architecture

```
UI (Server Components)
    ↓
Server Action
    ↓
Validation (zod)
    ↓
Service layer (business rules)
    ↓
Integration layer (Resend)
```

Server Components are the default. `"use client"` appears in exactly three files: the inquiry form, the mobile nav, and `error.tsx`. There is no database and no repository layer; adding one is an architectural change requiring approval.

```
src/
├── app/            routing only
├── components/     ui/ (shadcn), layout/, shared/
├── features/       home/, inquiry/
├── services/       inquiry.service.ts, notification.service.ts
├── lib/            resend/, logger/, rate-limit.ts, env.ts
├── emails/         escaped HTML template functions
├── constants/      every claim the site makes, as typed data
└── types/
```

Path alias: `@/*` → `src/*`.

### Routes

| Route | Purpose |
| --- | --- |
| `/` | Home. Six sections, ends in the partner CTA band. |
| `/contact` | Partner inquiry form. |
| `/eldersmiles` | The dental service inside the network. |
| `/thank-you` | Post-submission confirmation. `noindex`. |

---

## 5. Next.js 16 Specifics

`AGENTS.md` is imported at the top of this file and points at `node_modules/next/dist/docs/`. Read the relevant guide before writing against an API you have not verified in this version.

- **`<Image priority>` is deprecated.** Use `loading="eager"` with `fetchPriority="high"`.
- **`images.qualities` defaults to `[75]` only.**
- **`error.tsx` receives `retry`, not `reset`** (stable in 16.3.0).
- **Global `scroll-behavior: smooth` is no longer applied during navigation.** In-page anchors need `<html data-scroll-behavior="smooth">`.
- **`cacheComponents` stays off.** It replaced `dynamicIO`, `useCache` and `ppr`, and would force the Cache Components model onto a static marketing site for no benefit.
- **`typedRoutes: true`** is stable and top-level. Nav arrays need `as const` or their hrefs widen to `string` and the build fails.
- **Turbopack is the default.** Do not pass `--turbopack`.
- **`next/form` is not for this form.** A POST inquiry uses `<form action={serverAction}>`.
- **`useActionState`**, never `useFormState`.
- `params` / `searchParams` / `cookies()` / `headers()` are Promise-only.

---

## 6. The Inquiry Pipeline

The only real logic in the project.

**Validation happens twice** from one shared zod schema in `features/inquiry/validation/inquiry.schema.ts`. The server pass is the only authority. Native HTML constraints stay enabled: they give instant feedback, and they mean the schema's conditional rules are reached rather than skipped, since zod does not run object-level refinements when the base shape already failed.

**Spam protection** is a honeypot field, a minimum time-to-submit check, and an in-memory per-IP limiter. The limiter is per-instance and therefore best-effort on serverless; that is stated in a comment rather than implied to be stronger.

**Email safety** is mandatory:
- HTML-escape every user-supplied value in templates.
- Strip newlines from anything reaching a subject line.
- Set `replyTo` to the submitter.
- Never log the message body or full contact details.

**Failure behaviour.** The notification to Careably *is* the inquiry: if it fails, the request failed and the user is told, with the email address as fallback. The acknowledgement to the submitter is a courtesy and its failure is logged and swallowed.

---

## 7. Accessibility

- WCAG 2.1 AA minimum.
- Body text 17px. Nothing user-facing below 15px.
- Visible teal focus ring on every interactive element.
- 44px minimum target size. Checkbox rows are held at 44px by their wrapping label.
- Labels above inputs, errors below. Never placeholder-as-label.
- Skip link, semantic landmarks, keyboard-operable mobile nav.
- Colour is never the only carrier of meaning.

The reference HTML hid the entire nav below 1000px with no replacement. That is a real defect and was fixed, not reproduced.

---

## 8. Definition of Done

The parent handbook's Definition of Done applies in full. Careably-specific additions:

- `npm run lint`, `npm run typecheck` and `npm run build` all pass.
- Built output contains zero `—` and zero `–`.
- No invented testimonial, statistic, phone number or social profile.
- No link points at `#` or a route that does not exist.
- Copy matches `docs/content.md`; any change was made there first.
- Verified at 375px, 768px and 1280px with no horizontal scroll.
- Contrast measured, not eyeballed, on any new colour pairing.
- The Medicaid disclosure and "Care is never forced" are intact on `/eldersmiles`.

---

## 9. Open Dependencies

Tracked in `docs/assets.md`:

1. **Logo as SVG.** Two files were supplied and they disagree with each other; neither is a vector. The wordmark is set in type meanwhile.
2. **A real phone number**, or confirmation that email only is intended.
3. **Copy for About, For Families and Resources**, plus the footer's Company and Services columns.
4. **Social profile URLs**, if the footer icons in the design are wanted.
5. **Street address**, for complete structured data.
6. **Resend domain verification** for `careably.care`.
