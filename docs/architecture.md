# Architecture

## Shape of the problem

A four-route marketing site whose only real logic is one form that sends two emails. The architecture should be boring in proportion to that.

No database, no auth, no CMS, no state manager, no API client. Adding any of them is an architectural change and needs approval.

---

## Rendering

Server Components by default. Every page is static at build time.

`"use client"` appears in exactly three places:

| File | Why |
| --- | --- |
| `features/inquiry/components/InquiryForm.tsx` | `useActionState`, conditional fields |
| `components/layout/MobileNav.tsx` | Disclosure state, focus management |
| `app/error.tsx` | Required to be a Client Component |

Nothing else. If a fourth appears, question it.

`cacheComponents` stays off. It is the umbrella flag that replaced `dynamicIO`, `useCache` and `ppr` in Next 16, and enabling it forces the Cache Components model on a site with no dynamic data.

---

## Request flow

```
InquiryForm (client)
    |  <form action={formAction}>
    v
submitInquiryAction (server action)
    |  parse FormData, zod safeParse
    v
inquiry.service.ts
    |  honeypot, timing, rate limit, business rules
    v
notification.service.ts
    |  build both messages
    v
lib/resend/client.ts
    v
Resend API
    |
    v
redirect("/thank-you")
```

A Server Action rather than a route handler: one caller, no public API surface, built-in CSRF origin checks, and it degrades to a normal form POST without JavaScript.

### Layer responsibilities

**Server Action** parses `FormData` and returns state. No business rules, no I/O beyond calling the service.

**Service layer** owns the rules: what counts as spam, what makes a submission valid beyond its shape, what happens when email fails. It never touches `FormData` and never imports React.

**Integration layer** (`lib/resend`) knows about Resend and nothing about inquiries. Swapping the provider should touch one file.

**Email templates** are pure functions returning a subject, an HTML body and a text body. No side effects.

---

## Directory layout

```
src/
├── app/                          routing only
│   ├── layout.tsx                fonts, metadataBase, JSON-LD, header, footer
│   ├── page.tsx                  home
│   ├── globals.css               Tailwind v4 @theme
│   ├── error.tsx                 client, retry prop
│   ├── not-found.tsx
│   ├── contact/page.tsx
│   ├── eldersmiles/page.tsx
│   ├── thank-you/page.tsx
│   ├── sitemap.ts  robots.ts
│   └── opengraph-image.tsx
│
├── components/
│   ├── ui/                       shadcn primitives, restyled to brand
│   ├── layout/                   SiteHeader, MobileNav, SiteFooter,
│   │                             Wordmark, Container, Section, SectionHeading
│   └── shared/                   PartnerCtaBand, StructuredData
│
├── features/
│   ├── home/components/          Hero, ServicesOverview, Difference,
│   │                             EcosystemDiagram, WhyCareably, WhoWeServe,
│   │                             EldersmilesCard
│   └── inquiry/
│       ├── components/           InquiryForm, FormField
│       ├── actions/              submitInquiry.ts
│       ├── validation/           inquiry.schema.ts
│       └── types/                inquiry.ts
│
├── services/
│   ├── inquiry.service.ts
│   └── notification.service.ts
│
├── lib/
│   ├── resend/client.ts
│   ├── logger/index.ts
│   ├── rate-limit.ts
│   └── env.ts                    zod-validated, read lazily
│
├── emails/
│   ├── inquiryNotification.ts
│   ├── inquiryAcknowledgement.ts
│   └── escape.ts
│
├── constants/
│   ├── site.ts        identity, contact, CTA labels
│   ├── routes.ts  navigation.ts
│   ├── services.ts    the three service categories
│   ├── difference.ts  ecosystem diagram nodes and copy
│   ├── why.ts  communities.ts
│   ├── eldersmiles.ts the dental service inside the network
│   └── structuredData.ts
│
└── types/
```

### Why content lives in `constants/`

Every list on the site is typed data rendered by a component. That keeps `docs/content.md` and the code one edit apart instead of scattering strings through JSX, and it makes the "invent nothing" rule auditable: every claim the site makes is readable in a handful of small files.

---

## Dependency direction

```
app  ->  features  ->  services  ->  lib  ->  external
              |            |
              +-> components, constants, types
```

Never backwards. `services/` does not import from `features/`. `lib/` does not import from `services/`. `constants/` and `types/` import nothing.

---

## Error handling

| Failure | User sees | System does |
| --- | --- | --- |
| Validation | Inline field errors | Nothing logged |
| Honeypot or timing trip | Success screen | Logged at `warn`, no email sent |
| Rate limited | "Please wait a few minutes" plus the email address | Logged at `warn` |
| Resend fails | "We could not send your request", plus the email address | Logged at `error` with correlation ID |
| Unhandled render error | `error.tsx` with `retry()` | Logged with digest |

The honeypot case returning success is deliberate. Telling a bot it was caught teaches the operator to work around it.

Provider errors, stack traces and internal identifiers never reach the browser.

---

## Security posture

- Both validation passes run from one zod schema. The server pass is authoritative.
- Every user value is HTML-escaped before entering an email template.
- Newlines are stripped from anything reaching a subject line, preventing header injection.
- `replyTo` is the submitter address so staff can reply directly.
- Secrets are read only in server modules, validated lazily by `lib/env.ts`, never prefixed `NEXT_PUBLIC_`.
- The message body is never logged.
- Rate limiting is in-memory and per-instance, which is documented in the file rather than implied to be stronger.

---

## Performance

Static pages, no client-side data fetching, no animation library. The JavaScript that ships is React, the form island and the mobile nav.

The hero image uses `loading="eager"` with `fetchPriority="high"` (`priority` is deprecated in Next 16). All images declare dimensions so nothing shifts. Fonts load through `next/font` and are self-hosted, so no request leaves the origin at runtime.

---

## Extension points

Deliberately left open, not built:

- **Persisting inquiries.** Add a repository under `lib/db/` and call it from `inquiry.service.ts` before the notification step. No other layer changes.
- **More service pages.** `/eldersmiles` is the template: a constants file plus a page. A second network service follows the same shape and turns the home-page card into the carousel the design implies.
- **The held-back routes.** About, For Families and Resources need copy, not architecture. Add the route, add the nav entry in `constants/navigation.ts`, done.
