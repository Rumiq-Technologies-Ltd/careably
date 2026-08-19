# Careably Brand System

Colour anchors are the client's own CSS custom properties, taken from the HTML scaffold they supplied. They are exact, not sampled. Everything else is a ramp built around them.

Visual reference: `docs/careably-landing-design.jpeg`.

---

## 1. Colour

### Anchors, from the client stylesheet

| Client variable | Hex |
| --- | --- |
| `--navy` | `#082a66` |
| `--navy-dark` | `#051f4d` |
| `--teal` | `#12aa9d` |
| `--teal-dark` | `#07877f` |
| `--teal-light` | `#eaf8f6` |
| `--blue-light` | `#f4f9fc` |
| `--text` | `#172033` |
| `--muted` | `#5e6878` |
| `--border` | `#dce8ed` |

### Scales

```
navy-50   #eef2fa      teal-50   #eaf8f6   <- anchor (--teal-light)
navy-100  #dae3f2      teal-100  #d0f0ec
navy-200  #b5c6e4      teal-200  #a3e2da
navy-300  #8aa3d1      teal-300  #6ecec3
navy-400  #5578b4      teal-400  #35bcae
navy-500  #2b5395      teal-500  #12aa9d   <- anchor (--teal)
navy-600  #16407e      teal-600  #0f9b8f
navy-700  #0e336f      teal-700  #07877f   <- anchor (--teal-dark)
navy-800  #0a2d6a      teal-800  #0a6b65
navy-900  #082a66   <- anchor (--navy)
navy-950  #051f4d   <- anchor (--navy-dark)
```

Card tints, one per "Why Careably" card, matching the design's four pastels:

```
tint-mint   #f0f9f7
tint-sky    #f1f6fc
tint-lilac  #f4f3fb
tint-sand   #fdf7ee
```

### Measured contrast

Computed, not estimated. Anything failing is marked and constrained.

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `navy-900` on white | 13.6:1 | AAA |
| `ink` on white | ~15:1 | AAA |
| `ink-muted` on white | 5.6:1 | AA |
| `teal-800` on white | 6.4:1 | AA |
| `teal-700` on white | 4.45:1 | **Fails AA body by 0.05.** Large text and non-text only. |
| `teal-600` on white | 3.4:1 | Large text only. |
| `teal-500` on white | 2.89:1 | **Fails everything.** Decoration only. |
| white on `teal-800` | 6.4:1 | AA |
| white on `teal-600` | 3.4:1 | Large text only. |
| white on `navy-900` | 13.6:1 | AAA |

### The teal rule

**`teal-500` is the brand accent and never touches text.** It is a divider, an icon fill on a light tint, a hairline. Nothing more.

Text that must read as teal uses `teal-800`. Anything white sitting on teal uses a `teal-800` background or darker.

This is why three surfaces are darker than the design shows:

| Surface | Design | Shipped | Why |
| --- | --- | --- | --- |
| CTA band gradient end | bright teal | `teal-800` | White body copy spans the full width on narrow viewports and lands on the gradient's far end. 3.4:1 became 6.4:1. |
| "Communities" ecosystem node | bright teal | `teal-800` | 15px semibold white label, 3.4:1 against a 4.5:1 requirement. |
| `teal` button variant | bright teal | `teal-800` | Same reason. Currently unused, fixed so it is safe when reached for. |

The CTA band paragraph is pure white rather than `white/90` for the same reason: at 90% over the gradient end it measured 3.3:1.

Teal at full brightness survives everywhere it carries no text: the wordmark's "ably" (28px bold, large text), the hero's "to you." (64px), icon glyphs on `teal-50`, dividers, and the dashed connectors in the ecosystem diagram.

---

## 2. Typography

**Display:** Source Serif 4. **Body:** Plus Jakarta Sans. Both via `next/font/google`, both variable, self-hosted at build time.

The design sets headings in a bookish transitional serif and everything else in a geometric grotesque. The client's HTML fell back to Georgia and Arial, which are stand-ins rather than a choice; this pair is the closest real match.

### Scale

Base is **17px**.

| Role | Size | Line height | Family |
| --- | --- | --- | --- |
| Hero | `clamp(2.25rem, 5vw, 4.25rem)` | 1.05 | Serif |
| H1 | `clamp(1.875rem, 3.6vw, 2.75rem)` | 1.12 | Serif |
| Section H2 | `clamp(1.75rem, 3.2vw, 2.375rem)` | 1.12 | Serif |
| H3 / card title | `1.1875rem` | 1.3 | Sans |
| Lead | `1.125rem` | 1.6 | Sans |
| Body | `1.0625rem` (17px) | 1.6 | Sans |
| Small | `0.9375rem` (15px) | 1.6 | Sans |
| Eyebrow | `0.8125rem` bold, `0.09em` tracking, uppercase | 1 | Sans |

Nothing user-facing goes below 15px. The design's 14px nav was raised to 15px for the same reason. Measure caps at `62ch`.

---

## 3. Shape and spacing

The client CSS uses a `7px` button radius and `14px` / `18px` card radii, which is a flatter system than the previous brand's pills.

| Element | Radius |
| --- | --- |
| Buttons, inputs | `7px` / `8px` |
| Cards, pills, nodes | `14px` |
| Large panels, tinted cards | `16px` |
| Circles (icon wells, ecosystem centre) | full |

**Container:** `max-width: 1240px`, padding `1.25rem` mobile / `2rem` from `md`.

**Section rhythm:** `py-16` mobile, `py-20` at `md`, `py-24` at `lg`. Bands run tighter at `py-11` / `py-14`.

**Elevation.** Shadows are tinted navy, never black:

```
--shadow-card: 0 1px 2px rgb(8 42 102 / 0.04), 0 8px 24px rgb(8 42 102 / 0.06);
--shadow-lift: 0 2px 4px rgb(8 42 102 / 0.06), 0 14px 34px rgb(8 42 102 / 0.1);
```

---

## 4. Iconography

`lucide-react`, `strokeWidth={1.75}`, one family.

The reference HTML used bare Unicode glyphs as service icons (`♡`, `✦`, `◎`, `⌂`). Those render inconsistently across platforms, cannot be styled reliably, and are announced as punctuation by screen readers. Replaced with real icons, marked `aria-hidden` since the adjacent label already carries the meaning.

---

## 5. Motion

CSS only, no library.

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal { animation: reveal-in linear both; animation-timeline: view(); }
  }
}
```

Static is both the default and the fallback. Interaction transitions are 150ms on colour; buttons drop 1px on `:active`.

Banned: scroll hijacking, pinned sections, marquees, parallax, infinite loops, `window.addEventListener("scroll")`.

---

## 6. Logo

**Two files were supplied and they do not match each other.**

| File | What it shows |
| --- | --- |
| `public/images/careably-logo.jpg` | Stacked lockup: a heart enclosing a figure and a cupped hand, with "Careably" beneath. |
| The landing page design | A circular "C" monogram beside a horizontal "Careably" wordmark. |

Neither is a vector, and the stacked lockup is illegible at a 78px header height.

**Shipped meanwhile:** the wordmark set in Source Serif 4, navy "Care" and teal "ably". This is what the client's own HTML does (`Care<span>ably</span>`), so it is sanctioned rather than invented. The ecosystem diagram's centre uses the same treatment, again following the client's HTML.

**Needed:** `careably-logo.svg`, plus a standalone mark for the header, favicon and app icons. Once it arrives it drops into `Wordmark.tsx` and `opengraph-image.tsx`.
