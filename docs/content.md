# Approved Site Copy

Every user-visible string comes from this file. **Change copy here first, then the component.** Lists render from typed data in `src/constants/`.

Sources, in priority order:

1. `docs/careably-landing-design.jpeg` — the approved visual design. **Authoritative.**
2. The client's HTML scaffold — authoritative for hex values, secondary for copy.

Where they conflict the design wins. Conflicts are noted inline.

Rules enforced throughout: no em-dashes, no placeholder data published as fact, no invented proof, no link without a destination.

---

## Global

**Brand name:** Careably. One word. Rendered as two tones, navy "Care" and teal "ably".

**Tagline:** Health. Wellness. Support. Living.

**Contact:**
- Email: `hello@careably.care`
- Domain: `careably.care`
- Locality: Orlando, Florida

> [!WARNING]
> **No phone number is published.** The design shows `(407) 123-4567`, which is a placeholder pattern, and no real number was supplied. `SITE.phone` is `null` and the structured data omits `telephone`. Do not publish the design's number.

> [!NOTE]
> The design's footer shows `info@careably.care`. The client superseded this with `hello@careably.care`, which is what ships.

**CTA labels:**

| Constant | String | Where |
| --- | --- | --- |
| `CTA.header` | Get Started | Header button, mobile nav |
| `CTA.partner` | Partner With Careably | Hero secondary, CTA band, form submit, footer |
| `CTA.services` | Explore Services | Hero primary |

**Navigation:** What We Do · Services · For Communities · ElderSmiles · Contact

> [!NOTE]
> The design's nav is: What We Do, Services, For Communities, For Families, About, Contact. "For Families" and "About" have no copy and no route, so they are held back rather than shipped as dead links. See `docs/assets.md`.

---

## Home

### 1. Hero

**H1**, with the final phrase in teal:

```
Healthcare and services, brought to you.
```

**Subtext:**
> Careably connects communities and their residents with trusted health, wellness and support services, conveniently delivered where they live.

> [!IMPORTANT]
> The design sets an em-dash before "conveniently". Rewritten to a comma.

**CTAs:** `Explore Services` (primary) · `Partner With Careably` (outline)

**Image:** `public/images/hero-care.jpg`, bleeding right under a left-to-right white gradient.

---

### 2. Services — `id="services"`

**Heading:** One Community. Many Needs. One Solution.

Three categories, dot-separated rows:

| Health | Wellness | Support |
| --- | --- | --- |
| Dental · Podiatry · Audiology | Therapy · Fitness · Nutrition | Transportation · Mobility |
| Primary Care · Specialty Care | Mental Health · Activities | Personal Support · Coordination |
| Preventive & Chronic Care | Preventive & Lifestyle Services | And More Community Services |

> [!NOTE]
> The HTML scaffold had **four** columns (Health, Arts & Wellness, Support, Community Partners) with the heading "One partner. Many solutions for every need." The design supersedes both.

---

### 3. The Careably Difference — `id="what-we-do"`

**Eyebrow:** The Careably Difference

**Heading:** All the right services. One trusted partner.

**Body:**
> Careably is a comprehensive service platform that connects residents, families, communities and providers, making it easier to access the care and services that improve quality of life.

> [!IMPORTANT]
> The design sets an em-dash before "making". Rewritten to a comma.

**CTA:** How It Works

**Ecosystem diagram:**

- Top node: Residents & Families
- Bottom node: Communities
- Centre: Careably
- Left: Dental · Podiatry · Audiology · Primary Care
- Right: Therapy · Wellness · Transportation · And More

The diagram is a `figure` with a screen-reader caption; the connectors and arrows are decorative and hidden. Below `lg` it collapses to a plain stack.

---

### 4. Why Careably?

**Heading:** Why Careably?

**Convenient**
> Services are brought directly to your community whenever possible, saving time and reducing disruption.

**Coordinated**
> One platform, one point of coordination, and seamless communication for residents, families and communities.

**Trusted**
> We work with qualified, credentialed providers and carefully selected service partners you can trust.

**Comprehensive**
> A wide range of health, wellness and support services, tailored to your community's needs.

> [!IMPORTANT]
> "Convenient" and "Comprehensive" both carry em-dashes in the design. Both rewritten to commas.

---

### 5. Who We Serve — `id="for-communities"`

**Heading:** Who We Serve
**Subtitle:** We partner with a wide range of residential communities.

Senior Living · Assisted Living · Memory Care · Group Homes · Supported Living · Other Residential Communities

> [!NOTE]
> From the HTML scaffold, which marks this block "deliberately text-only; no photographs". The design omits the section, but its "For Communities" nav item needs a destination, so it was kept.

---

### 6. Meet ElderSmiles

**Eyebrow:** A Careably Service
**Heading:** Meet ElderSmiles
**Body:** Professional dental care delivered right where residents live.

**Highlights:** Routine cleanings & exams · Digital x-rays · Denture care & more · Within your community

**Link:** Learn more about ElderSmiles → `/eldersmiles`

> [!NOTE]
> The design renders the link text as "Learn more about ElderSmlies". Corrected.
>
> The design also shows three carousel dots under this card, implying a rotating set of Careably services. Only ElderSmiles exists today, so it ships as a single static card. A carousel with one slide is a lie about the content.

---

### 7. Partner CTA band

**Heading:** Better care. Stronger communities. Together.
**Body:** Let's bring more convenience, coordination and care to your community.
**Button:** Partner With Careably

---

## `/contact`

**H1:** Partner With Careably

**Intro:**
> Tell us about your community and we will follow up to talk through services, coordination and next steps.

**What happens next:**
1. We read your inquiry and get in touch by email.
2. We talk through which services your residents need most.
3. We agree a starting point and put the first visits on your calendar.

> [!CAUTION]
> Do not add a response-time promise. Nothing in the source commits to one, and "we respond within 24 hours" would be invented.

**Form labels**

| Field | Label | Notes |
| --- | --- | --- |
| inquiryType | I am | A residential community · A family member or resident · A service provider · Other |
| fullName | Full name | required |
| organisation | Community name / Organisation name | required for community and provider |
| role | Role or title | optional |
| residentCount | Approximate residents | community only, optional |
| email | Email | required |
| phone | Phone | required |
| city | City or area | optional |
| interests | Services of interest | optional, Health / Wellness / Support |
| message | How can we help? | optional, 2000 characters |
| consent | I agree to be contacted about this inquiry. | required |

**Message helper text:**
> Please do not include medical or health details in this form.

**Submit:** `Partner With Careably` / pending: `Sending…`

**Form-level error:**
> We could not send your request. Please try again, or email us at hello@careably.care.

---

## `/eldersmiles`

**Eyebrow:** A Careably Service
**H1:** ElderSmiles
**Intro:** Professional dental care delivered right where residents live.

### What is included

**Exams and diagnostics**
- Comprehensive and periodic exams
- Digital radiographs and oral cancer screenings

**Prevention and hygiene**
- Cleanings and periodontal maintenance
- Fluoride and silver diamine fluoride treatments
- Individual oral-care recommendations and education

**Restorative care and dentures**
- Fillings, restorative care, and appropriate extractions
- Denture cleaning, adjustments, repairs, relines, impressions, and delivery

### Built for specialized care needs

> ElderSmiles is designed for residents with dementia, limited mobility, behavioral challenges, and complex medical histories.

> Care can include bedside treatment, shorter or multiple visits, consistent clinical teams, and minimally invasive options.

> Care is never forced. If a resident becomes distressed or declines treatment, we stop, document the event, notify the appropriate parties, and reassess at a later visit.

> [!IMPORTANT]
> The third statement is the most important trust claim on the page. Do not shorten or soften it.

### Coverage and billing

> ElderSmiles bills the resident's dental insurance or the resident directly.

> We credential with major Medicare Advantage and commercial dental plans, verify benefits during enrollment, and provide families with estimated coverage and out-of-pocket costs before treatment.

> Traditional Medicare Parts A and B do not cover routine dental care. Private-pay rates are available for residents without applicable coverage.

**Callout:**
> ElderSmiles does not currently participate in Florida Medicaid.

> [!WARNING]
> Required disclosure. Removing it is not a copy decision.

---

## `/thank-you`

**H1:** Thank you for reaching out.

> We have received your inquiry and will be in touch to talk through what your community needs and how Careably can help.

> Anything urgent? Email us at hello@careably.care.

---

## Footer

**Left:** wordmark, "Health. Wellness. Support. Living.", `careably.care`

**Explore:** What We Do · Services · For Communities · ElderSmiles

**Let's Connect:** hello@careably.care · Orlando, Florida · Partner With Careably

> [!NOTE]
> The design's footer has five columns (Company, Services, Resources, Let's Connect) and three social icons. Company and Resources point at About Us, Our Partners, Careers, News, Blog, FAQ and For Providers, none of which exist, and no social URLs were supplied. Trimmed to real destinations. See `docs/assets.md`.

---

## Removed with the ElderSmiles rebrand

Deliberately not carried over, since Careably is a coordination platform rather than a dental practice:

- The fifteen-item private-pay fee schedule and the five-item public subset
- Infection control, sterilization chain, safe equipment transport
- Operatory coordination flow, documentation cadence, PointClickCare and MatrixCare
- The `$0` facility cost model and the community-provides list
- Onboarding timeline and the four-week estimate
- Dr. Sheryar Khan's biography and Contemporary Dental Care
- The compliance and insurance credential list

The clinical scope, specialized-care statements and billing disclosures survive on `/eldersmiles`.
