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

**Navigation:** Services · For Communities · ElderSmiles · Contact

> [!NOTE]
> The design's nav is: What We Do, Services, For Communities, For Families, About, Contact. "What We Do" was removed with the section it pointed at. "For Families" and "About" have no copy and no route, so they are held back rather than shipped as dead links. See `docs/assets.md`.

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

**Image:** `public/images/hero-care.jpg`. From `lg` it bleeds to the right edge beside the copy, with an 80px fade on its left edge only. Below `lg` it sits in normal flow beneath the copy. Nothing is laid over it.

"Explore Services" targets `#services`, the two network services.

---

### 2. Service categories — `id="categories"`

**Heading:** One Community. Many Needs. One Solution.

Three categories, dot-separated rows:

| Health | Wellness | Support |
| --- | --- | --- |
| Dental · Podiatry · Audiology | Art and Activities | Transportation · Mobility |
| Primary Care · Specialty Care | | Personal Support · Coordination |
| Preventive & Chronic Care | | And More Community Services |

> [!NOTE]
> The HTML scaffold had **four** columns (Health, Arts & Wellness, Support, Community Partners) with the heading "One partner. Many solutions for every need." The design supersedes both.
>
> Wellness was reduced to the single line "Art and Activities" at the client's request, replacing "Therapy · Fitness · Nutrition", "Mental Health · Activities" and "Preventive & Lifestyle Services".

---

### 3. Our services — `id="services"`

The destination for the hero's "Explore Services" button and the nav's "Services" item.

**Heading:** Our services

**Intro:**
> Careably coordinates the providers who deliver care inside your community. These are the services running today.

Two cards. Only services that actually operate appear here.

**ElderSmiles** (internal, links to `/eldersmiles`)
> Professional dental care delivered right where residents live.

> Clinical teams travel to the community with portable equipment and treat residents in a designated room or at bedside.

> Built for residents with dementia, limited mobility, behavioral challenges and complex medical histories.

Highlights: Routine cleanings & exams · Digital x-rays · Denture care & more · Within your community

Link: **Learn more about ElderSmiles**

**Florida Cares Transport** (external, links to `https://flcarestransport.com/`)
> Compassionate medical transportation, every step of the way.

> Non-emergency medical transportation for passengers with mobility needs, wheelchair users and seniors.

> Serving Greater Orlando and surrounding areas, including all local airports.

Highlights: Wheelchair transport with ramps and lifts · Stretcher transport, bed to bed · Ambulatory, door to door · Stair chair service

Link: **Visit Florida Cares Transport**, opening in a new tab with `rel="noopener noreferrer"` and a screen-reader "(opens in a new tab)" notice.

> [!WARNING]
> Florida Cares Transport is a separate company. Every fact above is taken from flcarestransport.com, including the tagline, which is quoted. Do not embellish their claims or restate them as Careably's own.

> [!NOTE]
> This section replaces two things: the design's "Careably Difference" block with its ecosystem diagram, and the single "Meet ElderSmiles" promo card. Both were removed at the client's request. The design's three carousel dots under the ElderSmiles card anticipated exactly this, a rotating set of services; there are now two, shown side by side rather than rotating.

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

### 6. Partner CTA band

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
