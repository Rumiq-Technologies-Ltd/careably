# Asset Manifest and Open Questions

What the site still needs. Nothing here blocks the build; everything here is visible to a visitor.

---

## 1. Logo — the highest-priority gap

**Two files were supplied and they disagree with each other.**

| Source | Mark | Wordmark |
| --- | --- | --- |
| `public/images/careably-logo.jpg` | Heart enclosing a figure and a cupped hand | Stacked underneath, geometric sans |
| `docs/careably-landing-design.jpeg` | Circular "C" monogram | Beside the mark, horizontal |

Neither is a vector. The stacked lockup is illegible at the 78px header height the design specifies.

**Shipped meanwhile:** the wordmark set in type, navy "Care" plus teal "ably", which is exactly what the client's own HTML does. Nothing is faked and nothing is squashed.

**Needed:**

| File | Purpose |
| --- | --- |
| `careably-logo.svg` | Full horizontal lockup, header and footer |
| `careably-mark.svg` | Monogram alone, for the ecosystem diagram centre and small sizes |
| `favicon.ico`, `icon.png` (512), `apple-icon.png` (180) | Browser and device icons |

Which of the two marks is correct also needs settling.

---

## 2. Photography

| Slot | File | Status |
| --- | --- | --- |
| Hero | `public/images/hero-care.jpg` | **Supplied.** 1600x615. In use. |
| ElderSmiles card and page | `public/images/dr-sheryar-khan.jpg` | **Placeholder use.** See below. |

`dr-sheryar-khan.jpg` is a dentist-with-patient image carried over from the previous brand. It is doing real work in two places, but it was shot for ElderSmiles-the-practice rather than ElderSmiles-inside-Careably, and its filename no longer describes it. Worth replacing with a purpose-shot image and renaming.

Any photograph of an identifiable resident needs a signed release before it goes on the public site.

---

## 3. Copy that does not exist yet

The design's navigation and footer promise pages that have no content. Rather than ship links pointing at `#`, they are held back. Each needs copy before it can be restored.

**Navigation:**

| Item | Status |
| --- | --- |
| For Families | No copy. Held back. |
| About | No copy. Held back. |

**Footer columns:**

| Column | Links in the design | Status |
| --- | --- | --- |
| Company | About Us, Our Partners, Careers, News | None exist. Held back. |
| Services | Health, Wellness, Support, All Services | Would need per-category pages. Held back. |
| Resources | Blog, FAQ, For Providers, Contact Us | Only Contact exists. Held back. |

The design also shows a **Services dropdown** in the header. Not built, because there is nothing to put in it yet.

---

## 4. Open information

**Phone number.** The design shows `(407) 123-4567`, a placeholder pattern. No number is published: `SITE.phone` is `null`, the footer omits it, and the structured data omits `telephone`. Either supply the real number or confirm email-only is intended.

**Social profiles.** The design's footer carries LinkedIn, Facebook and Instagram icons. No URLs were supplied, so the icons are not rendered. Icons that link nowhere are worse than no icons.

**Street address.** Needed for complete `Organization` structured data and a proper footer NAP block. `Orlando, Florida` is used as locality with no street line, and the schema omits `streetAddress` rather than guessing.

**Response-time commitment.** Nothing in the source commits to one, so the site and the acknowledgement email promise none. If the business wants to commit to one, it can be added in both places.

**The ElderSmiles carousel.** The design shows three dots beneath the ElderSmiles card, implying several Careably services rotate there. Only ElderSmiles exists. It ships as a single static card; the carousel returns when there is a second service to put in it.

---

## 5. Infrastructure

**Resend domain verification.** `careably.care` must be verified in the Resend dashboard before `INQUIRY_FROM_EMAIL` can send from that domain. Until then `.env.local` uses Resend's `onboarding@resend.dev` sender, which only delivers to the Resend account owner's own address.

**Repository and directory name.** Both are still `eldersmiles`: the local folder, the `name` field in `package.json`, and the GitHub remote `Rumiq-Technologies-Ltd/eldersmiles`. Renaming the remote is a GitHub operation with redirect implications, so it was left alone. Worth doing deliberately rather than incidentally.
