# What was invented

Only **the hero and the three-column band on the homepage** have a design comp.
Everything else on this site extrapolates that language. This file is the index
so the difference is visible at a glance rather than buried.

In the source, extrapolated sections carry `{/* EXTRAPOLATED — no comp */}`.

## Followed a comp

| Where | Source |
| --- | --- |
| Homepage hero | `design/Homepage.pdf` |
| Homepage "Three ways" band | `design/Homepage.pdf` |
| Buttons, colours, type, shadow, radii | `design/tokens/` (from `design/Style Guide.pdf`) |

Note the band's heading differs from the comp. The comp re-headlines it as
"Start with what you need right now."; the copy prototype is the copy authority,
so its wording is used and copy parity is enforced against it.

## Extrapolated — whole pages

Every page except the homepage. Fifteen of sixteen.

## Extrapolated — structural decisions

| Decision | What we did | Why it is a guess |
| --- | --- | --- |
| **Header** | Wordmark, inline nav, CTA button, "Menu" toggle under `lg` | No comp, and **no logo exists in either PDF** — no lockup, clearspace, or minimum size. The wordmark stands in. |
| **Footer** | Four link columns on a cream band | No comp |
| **Responsive** | Mobile-first: single column, opting into `md:` and `lg:` | The comp is a single desktop frame at 1440px. **Every** breakpoint choice is invented. |
| **Responsive type** | Steps down the existing scale, e.g. `text-heading-2 lg:text-heading-1` | 57px is unusable at 375px. Deliberately does not add mobile tokens to `theme.css`. |
| **Hover** | Underline on links | Not specified |
| **Active** | Translate down 4px, drop the shadow | Not specified. The `0 4px 0` shadow strongly implies a press-down, but it is the designer's call. |
| **Focus** | 3px accent outline, 3px offset | Not specified, and this is an accessibility requirement rather than a preference. |
| **Muted text** | `text-ink/70` for notes and placeholders | The palette has **no muted text colour**, while the prototype relies on a three-step grey ramp. |
| **Form fields** | Ink hairline, card radius, accent focus ring | **No form spec exists at all**, and contact is the conversion point. |
| **Placeholders** | Dashed ink border on cream | Prototype scaffolding, kept visibly provisional |
| **Spine, logo slots** | Bordered cards with the hard shadow | No comp |

## Illustration — now custom artwork

The placeholder set has been replaced. All four illustrations are custom
artwork, built from the masters in `design/illustrations/` by
`npm run illustrations:build`, which trims transparent margin and encodes
lossless WebP. The script fails if any pixel with `alpha > 0` differs from its
trimmed master, so "lossless" is enforced rather than claimed.

`npm run illustrations:placeholders` reports none remaining.

Still extrapolated about illustration:

- **Four pieces for sixteen pages**, so reuse is visible. Accepted rather than
  disguised.
- Placement follows the comp's signature break-out: spots overlap their
  container's edge instead of sitting inside it.
- `hero-desk` is Level One and hero-only. Do not scale it down for section use.
- Nothing references an image path. Pages resolve entries through
  `src/assets/illustrations/manifest.js`.

**Comp fidelity now carries a documented exception.** `design/Homepage.pdf`
shows the previous artwork, so the illustrations deliberately differ from the
comp while composition, colour, type, and shape still match.

## Not fixed here, on purpose

The three contrast failures recorded in `design/tokens/OPEN-QUESTIONS.md` are
properties of the design as drawn, not implementation choices:

- Hero H1, `hero-heading` on `brand` — **2.51**, below even AA-large
- Accent eyebrow on white — **4.41**, below AA-normal at 12px
- Accent eyebrow on cream — **4.03**

Changing a designer's colours to satisfy a checker is not this ticket's call.
They remain questions 1 and 2 for the designer.
