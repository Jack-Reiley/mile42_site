# Mile42 design tokens

The machine-readable form of `design/Style Guide.pdf`. Build from this, not from
the PDF.

- **`theme.css`** — the canonical Tailwind 4 `@theme` block. The file a human
  edits is the file Tailwind reads; there is no generator and no JSON
  intermediate.
- **`OPEN-QUESTIONS.md`** — what the style guide does not answer.
- **`verify/`** — the `npm run tokens:check` gate.

## Using it

`theme.css` contains the `@theme` block **only**. It deliberately does not
import Tailwind, so an app supplies that itself:

```css
@import "tailwindcss";
@import "../../design/tokens/theme.css";
```

Import it rather than copying it. A copy drifts the moment the designer revises
anything.

## Why this file exists

The style guide's values are **not text-extractable**. Text extraction returns
only the seven type-step labels, the four font names, and the words "Primary"
and "Secondary" — 406 characters in total. Every colour, size, radius, border,
and shadow exists solely as vector fill operators and text matrices. No hex code
and no pixel value is printed anywhere on either page.

An agent told to "read the values from the PDF" gets almost nothing and invents
the rest. That is the failure this directory prevents.

## How the values were recovered

Colours came from the fill operators of `page.get_drawings()`. Type sizes came
from the text-matrix scale of each specimen's `Tm` operator, since Figma exports
the text as Type3 glyph programs with degenerate bounding boxes — the usual text
APIs return no position or size at all. Line heights and layout geometry came
from walking `Homepage.pdf`'s content stream while tracking the CTM stack, which
gives each run an absolute position.

## Provenance

Every token is one of three kinds:

| Marker | Meaning |
| --- | --- |
| `measured` | Read from the vector or text operators of `Style Guide.pdf`. Authoritative. |
| `derived` | Measured from `Homepage.pdf`. Real, but an *instance* — the comp uses this value, which is not the same as the designer specifying it as a global. |
| `INFERRED` | Absent from both documents. Our decision. Tracked in `OPEN-QUESTIONS.md`. |

### Colour — values measured, names inferred

The guide labels only two groups, "Primary" and "Secondary". **No individual
colour is named**, so every semantic name below is our inference from observed
usage. The hex values are exact.

| Token | Value | Value provenance | Name basis |
| --- | --- | --- | --- |
| `--color-brand` | `#00b785` | measured | full-bleed hero band |
| `--color-accent` | `#0073f4` | measured | section eyebrows |
| `--color-cta` | `#ffdf65` | measured | primary button fill |
| `--color-ink` | `#2f1e14` | measured | text, borders, shadow |
| `--color-surface` | `#f9f4ec` | measured | second band, secondary button fill |
| `--color-page` | `#ffffff` | measured | page and card fill |
| `--color-hero-heading` | `#fffbf3` | derived | the H1 on green is off-white, not `--color-page` |
| `--color-on-cta` | `#000000` | derived | button labels are pure black, **not** `--color-ink` |

The ten secondary colours (`navy` `sky` `ice` `red` `pink` `orange` `peach`
`gold` `forest` `mint`) are all `measured`, but have **no observed usage
anywhere**, so they are named by hue. Renaming them later is expected.

### Type

Sizes are `measured`. Line heights are `derived` — the style guide sets every
specimen on a single line, so it carries no leading whatsoever. Weights are
`INFERRED` from Google Fonts family naming (Bold → 700, Semibold → 600,
Regular → 400).

| Step | Size | Line height | Weight | Family |
| --- | --- | --- | --- | --- |
| `heading-1` | 57px | 63px `derived` | 700 `INFERRED` | Merriweather Sans |
| `heading-2` | 36px | 42px **`INFERRED`** | 700 `INFERRED` | Merriweather Sans |
| `heading-3` | 26px | 32px `derived` | 700 `INFERRED` | Merriweather Sans |
| `body-lg` | 18px | 32px `derived` | 400 `INFERRED` | Figtree |
| `body-lg-semibold` | 18px | 32px `derived` | 600 `INFERRED` | Figtree |
| `body` | 16px | 26px `derived` | 400 `INFERRED` | Figtree |
| `eyebrow` | 12px | 17px **`INFERRED`** | 600 `INFERRED` | IBM Plex Sans Condensed |

`heading-2` and `eyebrow` never appear on more than one line in either document,
so their leading is a guess. Letter-spacing is `INFERRED` for every step — no
tracking value is stated anywhere, and the per-glyph adjustments in the PDF are
ordinary font kerning, not a tracking setting.

**The eyebrow specimen is sentence case, but every eyebrow on the homepage comp
is ALL CAPS.** Usage wins: the token carries uppercase. Recorded as a decision.

Both eyebrow colours exist because the comp uses two: `--color-accent` for
section eyebrows, and `--color-ink` for the "YOU LEAVE WITH:" eyebrow inside the
card.

### Layout

The style guide contains **no spacing scale, grid, container, or breakpoint**.
These are `derived` from real measurements of the comp at its 1440px frame.
Tailwind's default dynamic spacing is left intact; these are named additions.

| Token | Value | How |
| --- | --- | --- |
| `--spacing-page` | 100px | hero text and card both start at x=100 |
| `--spacing-card` | 40px | card at x=100, first column at x=140; column pitch 413 less 373 width |
| `--spacing-btn-x` | 24px | label bbox inset inside the 162px-wide button |
| `--spacing-btn-gap` | 21px | hero buttons at x=100..314 and x=335 |
| `--container-site` | 1240px | 1440 less two 100px margins; card measures exactly 1240 |

### Shape

| Token | Value | Provenance |
| --- | --- | --- |
| `--radius-pill` | `9999px` | measured — buttons are true pills, radius = height / 2 |
| `--radius-card` | `0px` | derived — **square corners are intentional**, not an omission |
| `--shadow-hard` | `0 4px 0 #2f1e14` | measured — a duplicate shape offset 4px down, no blur, no spread |

The shadow is a neo-brutalist sticker shadow, not a soft elevation. There is
only one level; do not invent a scale. Borders are 1px `--color-ink` everywhere —
full-strength hairlines, not the pale rules the copy prototype uses.

## Accessibility audit

The style guide gives **no accessibility guidance at all**. Computed WCAG 2.1
contrast ratios for the pairings the comp actually uses:

| Pairing | Ratio | AA normal | AA large |
| --- | --- | --- | --- |
| `ink` on `page` | 15.95 | pass | pass |
| `on-cta` on `cta` | 15.99 | pass | pass |
| `ink` on `surface` | 14.57 | pass | pass |
| `ink` on `cta` | 12.15 | pass | pass |
| `ink` on `brand` | 6.16 | pass | pass |
| **`accent` on `page`** | **4.41** | **fail** | pass |
| **`accent` on `surface`** | **4.03** | **fail** | pass |
| **`hero-heading` on `brand`** | **2.51** | **fail** | **fail** |

Two real problems, both carried into `OPEN-QUESTIONS.md` rather than quietly
corrected here:

1. **The hero H1 fails at 2.51.** `#fffbf3` on `#00b785` misses even the 3.0
   large-text threshold. This is the single most prominent element on the site.
2. **The blue eyebrow fails at 4.41 on white and 4.03 on cream.** At 12px it is
   normal text, so it needs 4.5.

These are measurements of the design as drawn, not opinions about it.

## The gate

```sh
npm run tokens:check
```

Two independent checks:

1. **Contract** — every pinned value in `verify/expected.json` matches
   `theme.css`. This catches a renamed, mistyped, or silently re-valued token.
2. **Compilation** — the theme compiles under Tailwind and every declared token
   produces a utility. This catches a malformed value or a namespace typo.

Both are needed. The compilation check alone is a tautology: it generates its
probe *from* `theme.css`, so a token renamed to `--color-brnad` would produce
`bg-brnad` and pass. Only `expected.json` is an independent source of truth.

**What the gate cannot do is tell you a value is wrong.** No hex or size is
printed in the PDF, so a transcription error is invisible to automation — it
would simply be pinned in both files. Correctness rests on the extraction method
described above, not on a green check.

Only `measured` and `derived` values are pinned. `INFERRED` values may change
freely, because they are our decisions rather than the designer's.
