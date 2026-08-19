# Careably Build Plan

Reference documents: `CLAUDE.md` (rules), `docs/brand.md` (tokens and measured contrast), `docs/content.md` (approved copy), `docs/architecture.md` (structure), `docs/assets.md` (what is still missing).

Every phase ends with `npm run lint`, `npm run typecheck` and `npm run build` passing.

---

## Rebrand: ElderSmiles to Careably

The site was previously ElderSmiles, a single dental practice. Careably is a coordination platform connecting communities to many providers. This was a rebuild, not a rename.

### Phase 0 — Security

- [x] A live Resend API key was sitting in `.env.example`, a file whose whole purpose is to be committed, in a repository that is public on GitHub. Verified it was never committed or pushed: `.gitignore` matches `.env*`, so the file was untracked and the key appears in no commit.
- [x] Key moved to `.env.local`, `.env.example` restored to a placeholder template.
- [x] Added `!.env.example` to `.gitignore` so the template can be committed now that it is clean, while real env files stay ignored.

**Still recommended:** rotate that key in the Resend dashboard. It was pasted into a chat and sat in a working tree; treating it as compromised costs nothing.

### Phase 1 — Foundation

- [x] `globals.css` rebuilt on the Careably palette, taken from the client's own CSS variables rather than sampled
- [x] Fonts switched to Source Serif 4 (display) and Plus Jakarta Sans (body)
- [x] `site.ts` rewritten: name, tagline, domain, email, no phone
- [x] `routes.ts` and `navigation.ts` rebuilt around the new IA
- [x] Button variants rebuilt: 7px radius from the client CSS, navy/outline/teal/white/ghost/link
- [x] `Section` tones: white, tint, navy, and the navy-to-teal CTA gradient
- [x] `Wordmark`, `SiteHeader` (78px, collapses at `lg`), `SiteFooter`
- [x] Assets renamed off filenames containing spaces; design reference moved out of `public/`

### Phase 2 — Landing page

Seven sections, following the approved design.

- [x] `Hero` — photo bleeding right under a directional white gradient
- [x] `ServicesOverview` — three categories, dot-separated rows
- [x] `Difference` plus `EcosystemDiagram`
- [x] `WhyCareably` — four cards, each on its own tint
- [x] `WhoWeServe` — from the HTML scaffold, gives "For Communities" a destination
- [x] `EldersmilesCard`
- [x] `PartnerCtaBand`

### Phase 3 — Inquiry pipeline

- [x] Schema reworked for four inquiry types (community, family, provider, other) with a conditional organisation field
- [x] Added an optional "services of interest" checkbox group mirroring the three categories
- [x] Action, email templates and form updated; all phone fallbacks replaced with email
- [x] `/contact` page with a "what happens next" column
- [x] `/thank-you` updated

### Phase 4 — ElderSmiles as a network service

- [x] Dental content consolidated into `constants/eldersmiles.ts`
- [x] `/eldersmiles` page: clinical scope, specialized care, coverage and billing
- [x] Medicaid disclosure and the "Care is never forced" statement carried over intact

### Phase 5 — Removal

- [x] Deleted `constants/{care,compliance,documentation,infectionControl,onboarding,operatory,pricing}.ts`
- [x] Deleted `features/{home,services,about}` from the old brand, `/services`, `/about`, `InquirySection`, `IconBadge`, `PlaceholderImage`, `InquiryCtaBand`
- [x] Rewrote `error.tsx`, `not-found.tsx`, `sitemap.ts`, `opengraph-image.tsx`, `structuredData.ts`

### Phase 6 — Docs

- [x] `CLAUDE.md`, `docs/brand.md`, `docs/content.md`, `docs/architecture.md`, `docs/assets.md`, `README.md`, this file

---

## Decisions taken, and why

**The design beats the HTML scaffold.** They disagree on several points. The design has three service categories, not four; "Wellness", not "Arts & Wellness"; a different hero headline; and an ElderSmiles card the HTML lacks. The design is the approved artwork, so it wins. The HTML remains authoritative for the exact hex values, which are its CSS variables, and its "Who We Serve" block was kept because the design's "For Communities" nav item otherwise points nowhere.

**ElderSmiles survives, against the earlier instruction.** The answer given was "remove it all". The design, which arrived afterwards, contains a "Meet ElderSmiles" card and a "Learn more" link. The design is newer information from the client, so ElderSmiles was kept as a service inside the network with its own page. Everything else dental was deleted. Easy to drop if that reading is wrong.

**Nothing placeholder ships as fact.** The design's `(407) 123-4567` is a placeholder pattern, so no phone is published anywhere, including the structured data. The design's `info@careably.care` was superseded by `hello@careably.care`.

**No dead links.** The design's nav includes "For Families" and "About", and its footer has Company, Services and Resources columns plus three social icons. None have content, routes or URLs. All are held back rather than shipped pointing at `#`.

**The ElderSmiles carousel ships as one static card.** The design shows three dots implying a rotating set of services. Only one exists. A carousel with a single slide misrepresents the content.

**Craft fixes over literal fidelity.** The reference HTML hid the entire nav below 1000px with no replacement, stranding mobile visitors; that is a defect and was fixed. Emoji glyphs used as service icons were replaced with real icons. The 14px nav was raised to 15px.

---

## Verified

Measured in the browser, not assumed.

**Structure and brand**
- Header measures exactly 78px, matching the design. Nav collapses at `lg`, since five items plus a button do not fit on one line at tablet width.
- Body renders Plus Jakarta Sans at 17px; headings render Source Serif 4; H1 is 64px in navy `#082a66` with the teal phrase in `#0f9b8f`.
- Seven sections on the home page, headings matching the design.

**Accessibility**
- 92 text-on-background pairings checked against WCAG AA with a gradient-aware probe. **Zero failures.** Three were found and fixed first, all white-on-teal (see below).
- One `h1` per page, no skipped heading levels, every image carries alt text.
- Mobile nav: opens at 78px under the header, seven targets all 48px, scroll locked, focus moved into the panel, Escape closes it and returns focus to the trigger.
- All form controls 44px; checkbox rows held at 44px by their wrapping label.

**Responsive**
- No horizontal overflow at 375px, 768px or 1280px on any route.

**Inquiry pipeline**
- Empty submission blocked natively at the first invalid field.
- Honeypot submission redirects to `/thank-you` without sending anything, logged as a rejection.
- All four routes prerender as static; the Server Action does not force dynamic rendering.

**Content**
- Zero em-dashes and zero en-dashes in the rendered output.
- Medicaid disclosure and "Care is never forced" both present on `/eldersmiles`.
- No reference to Contemporary Dental Care or Dr. Khan survives.

### Issues found and fixed during verification

Three contrast failures, all the same root cause: the brand teal is too light to sit behind white text.

| Surface | Was | Now |
| --- | --- | --- |
| CTA band gradient end | `teal-600`, 3.44:1 behind white | `teal-800`, 6.36:1 |
| "Communities" ecosystem node | `teal-600`, 3.44:1 behind a 15px label | `teal-800` |
| CTA band paragraph | `white/90`, 3.3:1 on the gradient end | pure white |

`docs/brand.md` now carries the rule: `teal-500` never carries or sits behind text.

---

## Not verified

- [ ] **Real email delivery.** A working Resend key is now in `.env.local`, but sending would put a live test message into `hello@careably.care`, a real business inbox. Not done without a request. The success path is proven through the honeypot branch, which returns the same result and takes the same redirect.
- [ ] **Lighthouse.** Deferred until deploy; a dev server with unoptimised bundles is not a meaningful measurement.

---

## Blocked on the client

Full detail in `docs/assets.md`.

1. Logo as SVG, and a decision on which of the two supplied marks is correct
2. A real phone number, or confirmation that email only is intended
3. Copy for About, For Families and Resources, plus the footer's Company and Services columns
4. Social profile URLs, if the design's footer icons are wanted
5. Street address, for complete structured data
6. Resend domain verification for `careably.care`
7. Whether to rename the repository and directory from `eldersmiles` to `careably`
