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
| `/what-we-do/advisory`, all six bands | `design/advisory-detail.html` |
| `/what-we-do/ai-products`, all six bands | `design/ai-products-detail.html` |
| `/what-we-do/engineering`, all six bands | `design/engineering-detail.html` |
| Buttons, colours, type, shadow, radii | `design/tokens/` (from `design/Style Guide.pdf`) |

Note the band's heading differs from the comp. The comp re-headlines it as
"Start with what you need right now."; the copy prototype is the copy authority,
so its wording is used and copy parity is enforced against it.

## Extrapolated — whole pages

Every page except the homepage and the four `/what-we-do` pages. Eleven of
sixteen.

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

## `/what-we-do/advisory` — deviations from its comp

The page follows `design/advisory-detail.html`. It is the first of the three
detail pages, so it also lands the patterns the other two consume.

| What | Comp | Built | Why |
| --- | --- | --- | --- |
| **Accent as text** | step numeral `--color-orange`, feature eyebrow `--color-orange` | numeral darkened to 94%, `#f05800`; eyebrow `--color-ink` | The numeral measures 2.68 on the tint against the 3.0 it needs; 6% darkening reaches **3.01**. The eyebrow would need a 24% darkening to reach 4.5 as 12px text, which stops reading as the accent, so it moves to ink and the 52px icon carries the colour instead. **This rule generalises to #21 and #22.** |
| **Off-scale type** | h1 38, h2 27, h3 18, lead 17 | nearest token: 36, 36, 26, 18 | The #7 precedent. The page header is still the only `h1`; it just carries the H2 token, because 38px snaps to 36 rather than to H1's 57. |
| **Panel shape** | 14px radius, `0 5px 0` shadow, badge `0 3px 0` | `--radius-card` 12px and `--shadow-hard` `0 4px 0` | Same precedent. |
| **Term titles** | 14px muted, in the comp as rendered | 16px semibold ink | The comp's own `.term-title` asks for 16px and is overridden by a later `.term p` rule, so its rendered 14px looks like an accident rather than intent. Shipping the intent, with the title distinguished from its definition by more than weight. |
| **Breadcrumb** | decoration, no link markup | a `nav` landmark, a real link to `/what-we-do`, `aria-current` on the leaf, and an `aria-hidden` separator | A breadcrumb is navigation. Authored rather than copied, and #21 and #22 use the same component. |
| **Eyebrow tracking** | `.09em` | the token's `.08em` | One hundredth of an em, and the token is the source of truth. |
| **Phase Zero link** | `href="#"` | `/contact` | The Phase Zero page does not exist yet, and `App.jsx` bounces an unknown path to the homepage, which reads as a broken site. The ticket that owns the route flips it. |
| **Horizontal padding** | `clamp(22px,5vw,64px)` | `px-6 md:px-12` | As on `/what-we-do`. Retired by #23 after measurement. |

The content **measure** is not a deviation: `--container-detail` is 1120px and
the page renders 1120px at a 160px inset at 1440, matching the comp exactly.

## `/what-we-do/ai-products` — deviations from its comp

The page follows `design/ai-products-detail.html` and inherits every
cross-cutting decision above. Two things are its own.

| What | Comp | Built | Why |
| --- | --- | --- | --- |
| **Page accent** | `--pop` `#d4537e`, a magenta | `--color-red` `#ff203d` | The magenta is not in the style guide, and it is the only one of the three detail accents that is not already a token. Red is the nearest palette hue and its contrast is within a hundredth of the comp's in every position: 3.80 on white against 3.93, 3.98 on navy against 3.84. The rendered page therefore differs from the comp in three places — the breadcrumb mark, the three column rules, and the check badge fill. The red-as-error connotation was weighed and accepted. |
| **Group title size** | 17px | `--text-heading-3` 26px | The snapping rule. The comp sets its section subheading at 18px and its group titles at 17px, a one-pixel difference, so both landing on the same token preserves the relationship rather than flattening it. |

The checked outcomes render as a **description list**: they are a bold label and
its explanation, which is a term and a definition, and that keeps the labels out
of the heading outline.

## `/what-we-do/engineering` — deviations from its comp

The page follows `design/engineering-detail.html` and introduces no pattern of
its own: its capability section is the AI-driven Products ruled column wrapping
the Advisory term rows, composed rather than built. Two deviations are its own,
and both are deliberate.

| What | Comp | Built | Why |
| --- | --- | --- | --- |
| **A fifth capability** | four items under "Systems and platforms" | five, including "Source data consolidation and readiness" | The comp is a layout render; `copy_prototype/` is the copy authority. Accepting the cut would mean deleting a claimed capability on the strength of a column that looked crowded — a sales decision reached from a layout constraint. The missing item is the only one with a two-line description, which explains its disappearance better than a decision would. The rendered page therefore differs from the comp by one visible row. |
| **Green on light backgrounds** | `--color-brand` `#00b785` | darkened to 92%, `#00a87a` | Brand green is the faintest of the three accents. The group rules measure **2.59** at full strength against orange's 3.06 and red's 3.80, so they would read visibly weaker and undercut the accent-as-wayfinding the three pages build. No WCAG threshold applies — these are decorative — so this is a quality decision. Darkened, the rules measure **3.05**. **The breadcrumb mark on navy keeps the pure token** at 5.84, because darkening it there would reduce contrast rather than improve it. |

The term rows inside each group use the Advisory values, 16px padding and a 16px
title, rather than the comp's 14px and 15px: one component, not two, and 15px
snaps to the 16px token anyway.

Still extrapolated on both comped pages: every breakpoint below 1440 for
**type**. The site steps headings down its own scale rather than adopting the
comps' intermediate sizes, which is the convention the rest of the site already
uses. Layout breakpoints are not extrapolated: all four comps collapse at 1023
and 767, which are Tailwind's `lg` and `md` exactly.

## Extrapolated — structural decisions

| Decision | What we did | Why it is a guess |
| --- | --- | --- |
| **Header** | Supplied `mile42-logo-dark` lockup at 40px tall, inline nav, CTA button, "Menu" toggle under `lg`. Horizontal inset matches the page grid: padding outside `max-w-site`, as `Section` and `Footer` do, and the mobile panel steps at `md` with them. | No comp. The brand lockup replaced the stand-in wordmark; the PDFs still define **no clearspace or minimum size**, so 40px is chosen to hold the mark's lettering at the wordmark's old cap height and to stay inside the 52px CTA that sets the bar's height. The asset's `viewBox` is cropped to its own artwork bounds so the drawn mark keeps the #23 grid inset; the export's padded `0 0 288 144` box would have pushed it 8px inside page content. The inset was corrected in #23; before that the wordmark sat 48px inside page content above 1336px, and the open panel sat 24px outside it between 768px and 1023px. |
| **Footer** | Four link columns on a cream band | No comp |
| **Responsive** | Mobile-first: single column, opting into `md:` and `lg:` | The comp is a single desktop frame at 1440px. **Every** breakpoint choice is invented. |
| **Responsive type** | Steps down the existing scale, e.g. `text-heading-2 lg:text-heading-1` | 57px is unusable at 375px. Deliberately does not add mobile tokens to `theme.css`. |
| **Hover** | Underline on links | Not specified |
| **Active** | Translate down 4px, drop the shadow | Not specified. The `0 4px 0` shadow strongly implies a press-down, but it is the designer's call. |
| **Focus** | 3px accent outline, 3px offset | Not specified, and this is an accessibility requirement rather than a preference. |
| **Muted text** | `text-ink/70` for notes and placeholders | The palette has **no muted text colour**, while the prototype relies on a three-step grey ramp. |
| **Form fields** | Ink hairline, card radius, accent focus ring | **No form spec exists at all**, and contact is the conversion point. |
| **Placeholders** | Dashed ink border on cream | Prototype scaffolding, kept visibly provisional |
| **Spine** | Bordered cards with the hard shadow | No comp |

## Agentic AI hard-parts drill-down (#46)

Built from a high-fidelity design handoff rather than from a comp, so the
measured values are the designer's. These five are ours.

| Decision | What we did | Why it is a guess |
| --- | --- | --- |
| **Off-scale tab title** | `19px/25px` for the four spine labels | Between `--text-body-lg` (18) and `--text-heading-3` (26) and on neither step. It is the handoff's own deliberate exception for a four-across label: 18px reads acceptably, 26px does not fit four across. |
| **Half-height badge shadow** | `0 2px 0` on the 22px and 24px in-panel badges | The design system specifies exactly one elevation, `0 4px 0`, and states there is no ladder. A 4px shadow on a 22px object swallows it. `StageJourney` already ships a `0 1px 0` pressed node, so this is the second small-object exception, not the first. |
| **Spine hover** | Unselected dot border to full ink, unselected title to `ink/80` | The design system specifies no hover and the prototype has none. Recommended by the handoff and adopted; the alternative is no hover affordance at all on a control that is unmistakably a control. |
| **Both responsive forms in the DOM** | Tab list and disclosures both render; `hidden`/`lg:block` chooses | `role` is markup, so one set of buttons cannot be a tab list at one width and a disclosure set at another. `display: none` removes a subtree from the accessibility tree, so nothing is announced twice. The cost is two pieces of state: a hard part selected on the spine is not carried across a resize below `lg`. Both forms open on hard part one, so a resize lands somewhere defined. (This originally carried a second reason, that `copy-parity.mjs` rendered every route with no DOM so `matchMedia` was unavailable at render. That check was retired in #49 and nothing enforces a DOM-free render now: the site is a client-only SPA with no SSR and no prerender step. The first reason is sufficient on its own.) |
| **Disclosure chrome below `sm`** | Numeral column `2rem`, gutters `20px/24px`, region padding `24px` | The handoff draws the disclosure option at 1120px only. At 375px its fixed gutters leave the title a 151px column and three lines. The chrome steps down rather than the type. |

The panel measure is the site's 1240px `Wrap`, not the handoff's 1120px. That is
not an extrapolation but a correction: the `measure` prop was removed in #36. The
spine rule inset `calc(25% - 40px)` is derived from column count and gap rather
than a fixed width, so it holds unchanged.

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
