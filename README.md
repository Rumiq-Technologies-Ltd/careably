# Careably

Marketing site for **Careably**, which connects residential communities and their residents with trusted health, wellness and support services, delivered where people live.

Careably coordinates; it does not itself provide clinical care. **ElderSmiles**, the dental service in the network, has its own page at `/eldersmiles`.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16.3.1, App Router, React 19 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 (CSS-first, no config file) |
| Components | shadcn/ui on Base UI, restyled to brand |
| Validation | Zod |
| Email | Resend |
| Icons | lucide-react |
| Fonts | Source Serif 4 and Plus Jakarta Sans via `next/font` |

No database. No CMS. No state manager. No animation library.

## Getting started

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

The site runs at `http://localhost:3000`. It builds and renders without any environment variables; only sending an inquiry needs them.

## Scripts

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

```bash
npm run typecheck
```

All three checks must pass before merging.

## Environment

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonicals, sitemap, OG | No trailing slash |
| `RESEND_API_KEY` | Sending inquiries | Server only |
| `INQUIRY_TO_EMAIL` | Sending inquiries | Where inquiries land |
| `INQUIRY_FROM_EMAIL` | Sending inquiries | Domain must be verified in Resend |

`.env.example` is a template and must never contain a real key. Environment is validated by `src/lib/env.ts` and read lazily, so a missing variable fails at the first send with a message naming it rather than breaking the build.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home. Seven sections. |
| `/contact` | Partner inquiry form. |
| `/eldersmiles` | The dental service inside the network. |
| `/thank-you` | Post-submission confirmation. `noindex`. |

## Structure

```
src/
├── app/          routing only
├── components/   ui/ (shadcn), layout/, shared/
├── features/     home/, inquiry/
├── services/     business logic
├── lib/          integrations, env, logging, rate limiting
├── emails/       escaped HTML templates
├── constants/    every claim the site makes, as typed data
└── types/
```

Alias: `@/*` maps to `src/*`.

Rendering is server-first. `"use client"` appears in exactly three files: the inquiry form, the mobile nav, and `error.tsx`.

## How the inquiry works

```
InquiryForm  →  Server Action  →  zod  →  inquiry.service  →  notification.service  →  Resend
```

The form is a plain `<form action={serverAction}>`, so it works without JavaScript. Validation runs twice from one schema and the server pass is the only authority. Spam protection is a honeypot, a minimum time-to-submit, and an in-memory per-IP limiter.

Two emails go out per submission. The notification to Careably **is** the inquiry, so a failure there fails the request. The acknowledgement to the submitter is a courtesy and its failure is logged and swallowed.

## Documentation

| File | Contents |
| --- | --- |
| `CLAUDE.md` | Engineering rules. Supersedes the shared handbook one directory up. |
| `tasks.md` | What was built, what was decided and why, what was verified |
| `docs/brand.md` | Palette, measured contrast, type scale, shape, motion |
| `docs/content.md` | Approved copy for every string on every route |
| `docs/architecture.md` | Layers, dependency direction, error handling, security |
| `docs/assets.md` | What is still missing from the client |
| `docs/careably-landing-design.jpeg` | The approved visual design |

**Copy is edited in `docs/content.md` first, then in the component.** Lists live in `src/constants/` as typed data.

## Content rules

Four rules are not stylistic and must survive any future edit:

1. **Invent nothing.** No testimonials, statistics, ratings or social proof. There is no source data for any of it.
2. **Never publish a placeholder as fact.** The design's phone number is a placeholder and is not published. `SITE.phone` is `null` and the structured data omits `telephone`.
3. **No dead links.** Several nav and footer items in the design have no content yet. They are held back, not shipped pointing at `#`.
4. **No em-dashes.** The design copy contains three. All were rewritten to commas.

`CLAUDE.md` covers these in full.

## Outstanding

Tracked in `docs/assets.md`:

- A logo SVG, and a decision on which of the two supplied marks is correct
- A real phone number, or confirmation that email only is intended
- Copy for About, For Families and Resources
- Social profile URLs, if the footer icons are wanted
- Resend domain verification for `careably.care`
- Whether to rename the repository from `eldersmiles` to `careably`
