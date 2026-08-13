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
| `/what-we-do`, all four bands | `design/what-we-do-combined.html` |
| Buttons, colours, type, shadow, radii | `design/tokens/` (from `design/Style Guide.pdf`) |

Note the band's heading differs from the comp. The comp re-headlines it as
"Start with what you need right now."; the copy prototype is the copy authority,
so its wording is used and copy parity is enforced against it.

## Extrapolated — whole pages

Every page except the homepage and `/what-we-do`. Fourteen of sixteen.

## `/what-we-do` — deviations from its comp

The page follows `design/what-we-do-combined.html`. Six things differ on purpose.

| What | Comp | Built | Why |
| --- | --- | --- | --- |
| **Blue band** | `--accent` `#0073f4` | accent darkened to 92%, `#006ae0` | No palette colour reaches AA on the accent; white peaks at **4.41**. Darkening the band instead of the text clears every element: ice eyebrow **4.55**, on-dark body, link, and H2 **4.92**. Expressed as `color-mix` on the token, so nothing is added to `theme.css`. |
| **Path icon colour** | handshake `#ff5c9d` | `--color-red` `#ff203d` | The comp's magenta is off-palette. Red matches the AI-driven Products page the card links to, so the three path icons read orange, green, red and icon colour becomes wayfinding. Contrast on navy drops to 3.98 from pink's 9.87; the icons are decorative and carry a full text label. |
| **Off-scale type** | h3 22, path h3 19, path body 14, quote 24, H1 54 | nearest token: 26, 26, 16, 26, 57 | The #7 radius precedent: the token scale wins over a comp value that is not on it. The path cards absorb the growth — verified at 1440, 1024, 768, 390, and 320, where they wrap rather than clip. |
| **Path card radius** | 14px | `--radius-card` 12px | Same precedent. #7 settled that card radius is token-driven. |
| **Horizontal padding** | `clamp(24px,5vw,72px)` | `px-6 md:px-12` | Changing it means moving `Section`, `Header`, and `Footer` together or misaligning content against the wordmark. #23 measured it and retired the change: above 1336px `--container-site` binds first and the site already matches the comp. |
| **Footer** | two-item ink bar | the site's four-column footer | The site footer is shared by sixteen routes and is not this page's to replace. |

Still extrapolated on this page: every breakpoint below 1440 for **type** — the
site steps headings down its own scale rather than adopting the comp's 42/33px
H1 steps, which is the convention the rest of the site already uses. Layout
breakpoints are not extrapolated: the comp collapses at 1023 and 767, which are
Tailwind's `lg` and `md` exactly.

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

The placeholder set has been replaced. All seven illustrations are custom
artwork, built from the masters in `design/illustrations/` by
`npm run illustrations:build`, which trims transparent margin and encodes
lossless WebP. The script fails if any pixel with `alpha > 0` differs from its
trimmed master, so "lossless" is enforced rather than claimed.

`npm run illustrations:placeholders` reports none remaining.

**Level Three now covers two visual treatments.** The three `path-*` entries are
flat single-colour linework rather than the ink-plus-fill drawing the level
system was written around. Their masters are 2001×2001 black-on-transparent
alpha masks, and the colour is applied at build time from a token named in the
`MAP` entry, so a token change propagates on the next build instead of requiring
new binaries. A tinted entry is held to a stricter assertion than the lossless
one: every alpha value byte-identical to the trimmed master, and every visible
pixel exactly the tint. Level records size, not treatment.

Still extrapolated about illustration:

- **Four scene pieces for sixteen pages**, so reuse is visible. Accepted rather
  than disguised. The three path icons are additional and used on one page.
- Placement follows the comp: **each spot breaks a different boundary.** The
  lightbulb crosses the card's top edge, the laptop crosses its column divider
  into the next column, and the handshake crosses the card's right edge. That
  variation is why the band does not read as three identical columns.
- Vertical offsets are adapted rather than copied. Our card is 456px tall
  against the comp's 555, so the comp's literal offsets land on body copy. The
  handshake sits 56px below the card's top rather than the comp's 98px, which
  restores the comp's actual relationship: level with the heading, clear of the
  body.
- Comp placement applies from `lg` upward only. Below that the columns stack
  full width and the spots sit inside them, since a right-edge overhang would
  risk horizontal scrolling. That arrangement is invented — the comp is
  desktop-only.
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
