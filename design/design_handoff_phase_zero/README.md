# Handoff: Phase Zero page — option 2A

## Overview

A redesign of `/what-we-do/phase-zero` on the Mile42 site. The existing page's content is
unchanged in substance; what changes is the order it is argued in and how three of the
blocks are drawn.

The shape of option 2A, top to bottom:

1. Compact navy page header — breadcrumb + `h1` "Proof, not a proposal." (unchanged)
2. **New:** the diagnostic question band, on tint. The page now opens with the reader's own
   question ("What is the one process you would fix first?") and the four questions that
   surface it, instead of closing with them.
3. The offer — eyebrow, "Name a process. See it working. Map what comes next.", the two
   paragraphs, and the four stages as a numbered strip beside them
4. "Four shapes it can take." — four cards on the surface band
5. **Redrawn:** "The build starts and ends with human oversight." — People and Agents as a
   two-lane handoff diagram instead of two separate lists
6. The three "worth it" statements as ruled columns, plus the quote and the two cross-links
7. Navy closing band — centred, no eyebrow, no illustration

## About the design files

`PhaseZero-2A.dc.html` is a **design reference created in HTML**, not production code. It is
a prototype of the intended layout, type, colour and spacing. Do not port its markup.

The target codebase already exists: this is the Mile42 marketing site (Vite + React +
react-router + Tailwind 4, `site/src/`). Recreate the design there **using the existing
primitives**, not new markup:

- `site/src/components/primitives.jsx` — `Section`, `Wrap`, `Eyebrow`, `H2`, `H3`, `Lead`,
  `Body`, `Note`, `Quote`, `Button`, `ButtonRow`, `TextLink`, `Breadcrumb`, `Card`,
  `LabelBody`, `Spot`
- `site/src/components/Lists.jsx` — `TermList`, `CheckList`, `NumberedSteps`, `StepStrip`,
  `StatementCards`
- `design/tokens/theme.css` — every colour, type step, radius and shadow used below is
  already a token there. **Use the tokens and the Tailwind utilities, never the raw hex
  values in the prototype.** The hex values are listed here only so you can verify a match.

The page to edit is `site/src/pages/PhaseZero.jsx`. Its content constants (`QUESTIONS`,
`EXAMPLES`, `STAGES`, `PEOPLE`, `AGENTS`, `WORTH`) stay as they are apart from the copy
changes listed under "Copy changes" below. `site/src/pages/PhaseZero.test.jsx` will need
updating alongside.

## Fidelity

**High fidelity.** Colours, type steps, spacing and band rhythm in the prototype were taken
from `design/tokens/theme.css` and from the sibling What We Do detail pages, so the mock
should match the site closely once rebuilt on the primitives. Two caveats:

- The prototype is desktop only, drawn at the comp's 1440px frame. Responsive behaviour is
  described per band below and should follow the site's existing breakpoint habits.
- The prototype hard-codes the primitives' styling inline. Any small discrepancy between the
  prototype and the real primitives should be resolved **in favour of the primitives**.

## Band-by-band spec

Bands are `<Section>` with the detail-comp rhythm: `pad="header"` for the page header,
`pad="band"` for content bands, `pad="cta"` for the closing band. Content column is `<Wrap>`
(1240px).

### 1. Page header — unchanged

`<Section band="navy" grain pad="header">` · `Breadcrumb` to `/what-we-do`, current
"Phase Zero", `markClass="bg-orange"` · `H2 as="h1" tone="hero"` "Proof, not a proposal."

No change from today's page. Keep it.

### 2. Question band — NEW

`<Section band="tint" pad="band">`, grain on (the tint band's film is
`{ opacity: 1, blend: 'overlay' }` in `BAND_GRAIN`).

- Heading: the top type step — `H1` (57/63, −0.022em), ink, `max-width: 22ch`, balanced.
  Copy: "What is the one process you would fix first?" **This is the page's second-largest
  block, not the h1** — the navy header still owns the `h1`, so render this as `H1 as="h2"`.
- Lead: `Lead` at full ink (not `text-ink/70` — it is carrying the band). Copy: "The one
  everyone works around, or the one eating human time for output that barely needs judgment.
  Name it and we will tell you whether it is a good Phase Zero."
- The four questions: a 4-column `dl`, 32px column gap, each cell with a **3px top rule in
  its own colour** and no bottom border:
  | # | question | rule colour | token |
  | --- | --- | --- | --- |
  | 1 | What frustrates people most? | `#ff5e00` | `--color-orange` |
  | 2 | What takes the most human time? | `#fab600` | `--color-gold` |
  | 3 | Where does quality slip? | `#00805d` | `--color-brand` |
  | 4 | What is the low-hanging fruit? | `#002161` | `--color-navy` |

  Term: Merriweather Sans Bold 20/26, balanced. Definition: Figtree 15/24 at `text-ink/72`,
  8px below the term. Cell padding-top 18px.

  This is `TermList variant="ruled" columns={4}` with a per-item rule colour — either extend
  `TermList` with an optional `marks` prop or add a small variant. Do not fork the component.
- One primary `Button` to `/contact`: "Start with Phase Zero". **No secondary button, and no
  free/price pill** — the closing band carries the commercial line.
- Band padding: 54px top, 64px bottom (a little deeper than a standard band, because it is
  the page's opening screen).
- Below `md`, the four questions go 2-up, then 1-up.

### 3. Offer band

`<Section pad="band">` on `page` white. Two equal columns, 64px gap, items aligned to top.

Left column:
- `Eyebrow` "Offering · Phase Zero pilot"
- `H2` "Name a process. See it working. Map what comes next." (balanced)
- `Lead` at `text-ink/70`: "Most firms answer an AI question with a roadmap and a demo. Both
  die on a shelf. We build a real working solution on one process you name, in a fraction of
  the time and at a fraction of the cost."
- `Body`: "You name the workflow. We assess the readiness around it, build something that
  actually runs on it, and hand you a sequenced roadmap for what comes after the proof. One
  engagement, fixed scope."

Right column — the four stages as one bordered card divided by rules, stacked vertically
(this is `NumberedSteps` inside a `Card`, or `StepStrip` turned vertical; the prototype draws
it as one `ol` with `border-card`, `shadow-hard`, `overflow-hidden`):
- Row: `grid-template-columns: 64px 1fr`, 20px gap, 20px/28px padding, 1px ink rule on top of
  every row **except the first**
- Numeral: Merriweather Sans Bold 27px, line-height 1, colour `#c24700`
  (`--color-orange-deep`)
- Label: Merriweather Sans Bold 20/26 — Identify, Analyze, Pilot, Roadmap
- Line: Figtree 15/24, the stage's existing sentence, unchanged
- Below the card, `Note` at 15px: "Fixed scope, and every stage produces something you keep
  whether or not you continue."

Below `lg` the two columns stack, left column first.

### 4. Four shapes band

`<Section band="surface" pad="band">`.

- A baseline-aligned row: `H2` "Four shapes it can take." on the left; on the right, `Body`
  at `text-ink/70`, max 34rem: "One named process, not a department and not a category. The
  right one is usually already obvious to the people doing the work." 40px gap,
  `justify-content: space-between`, 24px below.
- Four `Card`s in a 4-column grid, 16px gap, 26px padding. Each card:
  - a 32×5px rounded (3px) colour mark at the top — orange, sky `#73e1ff`, mint `#c7ffb1`,
    gold `#fab600`, in that order
  - `H3` at 20/26 (a step down from the 26px token, because the column is 275px wide)
  - `Body` at 15/24
- Card copy is the existing `EXAMPLES` array, unchanged.
- 4-up → 2-up at `md` → 1-up.

### 5. Build band — the two-lane diagram

`<Section pad="band">` on white. `Eyebrow` "How we build it", `H2` "The build starts and ends
with human oversight.", `Lead` at `text-ink/70` "An AI-native build, not a demo. It runs in
parallel to production and is measured against the baseline from stage one." 40px below the
lead sits the diagram.

The diagram is a **new component** — suggested name `HandoffLanes`, along
`site/src/components/LibrarianDiagram.jsx`. One bordered panel: `border-card`,
`border-ink`, `shadow-hard`, fill `tint` (`#e6f1fe`), padding 36px/40px. Inside, a
`grid-template-columns: 96px repeat(4, minmax(0,1fr))`, 20px column gap, three rows:

**Row 1 — People.** First cell: the eyebrow "People", vertically centred. Then four white
`Card`-style cells (border-ink, radius 12px, shadow-hard, 20px padding) each carrying:
- the `CheckList` badge — 24px pill, ink border, `bg-orange` fill, white ✓, shadow-hard —
  12px above the label
- label: Merriweather Sans Bold 16/22 — Name the outcome, Give context, Review the work,
  Approve to land
- body: Figtree 14/21 at `text-ink/72` — the existing `PEOPLE` bodies, unchanged

**Row 2 — the arrows.** First cell empty. Then one arrow per column, centred, 12px padding
top and bottom. Each arrow is a 1px × 26px ink line plus a small solid triangle (the
prototype uses ▼ / ▲ glyphs at 11px; in the codebase prefer a CSS triangle or a tiny inline
SVG so it does not depend on font coverage). Direction per column:

| column | person | direction | agent |
| --- | --- | --- | --- |
| 1 | Name the outcome | down | Plan |
| 2 | Give context | down | Build |
| 3 | Review the work | **up** | Validate |
| 4 | Approve to land | down | Deploy |

Column 3 points **up**: Validate hands its output back to the reviewer. The other three take
their input from the person above. The whole row is `aria-hidden` — it is decoration; the
argument is carried by the labels.

**Row 3 — Agents.** First cell: the eyebrow "Agents", top-aligned with 18px padding-top.
Then a single element spanning the remaining four columns with a **1px ink top rule running
the full width** and 18px padding-top, containing its own
`grid-template-columns: repeat(4, minmax(0,1fr))` with the same 20px gap — so the labels
land exactly under the columns above while the rule stays continuous. Each label:
Merriweather Sans Bold 20/26, **centred**, no box, no numeral.

Below the panel, 38px down: `Quote` "AI work rarely stalls on the technology. It stalls where
people and machines are supposed to meet."

Responsive: below ~900px the lanes cannot hold four columns. Stack to four
person → arrow → agent groups, one per row, keeping the arrow between each pair.

Semantics: People is a `dl` (label + explanation). Agents is an ordered list — the sequence
is the point.

### 6. Worth band

`<Section pad="band">` on white.

- Three columns, 16px gap. Each: a **3px orange top rule**, 18px padding-top, `H3` (26/32)
  for the title, `Body` beneath. Content is the existing `WORTH` array. This replaces the
  three `Card`s the current page draws — the statements are short enough that a rule reads
  better than a box, and it echoes the question band above.
- 36px below: nothing — the quote already sat in band 5.
- Two `TextLink tone="accent"`, 26px gap, 28px below the columns: "See where it sits in the
  client journey" → `/how-we-work/client-journey`, "See the engagement model" →
  `/how-we-work/engagement-model".

### 7. Closing band

`<Section band="navy" pad="cta">` — **no grain**, matching the page header's fill but flat.
`<Wrap className="text-center">`.

- No eyebrow.
- `H2 tone="hero"` (balanced): "Priced to be a decision, not an investment."
- `Lead tone="hero"` in a `max-w-[42rem]` centred wrapper: "The scope is fixed and agreed
  before we start, there is no obligation to continue, and the roadmap is yours either way."
- `Button` to `/contact`: "Start a conversation"

## Copy changes

Everything else on the page is the existing copy, verbatim. These are the deliberate changes,
and they need to land in `PhaseZero.jsx` (and anywhere else the phrases appear):

1. **The commercial line is no longer "free."** The old "Phase Zero is free." card — heading
   plus "You pay when you decide to scale it. …" — is replaced by the closing band above:
   "Priced to be a decision, not an investment." + "The scope is fixed and agreed before we
   start, there is no obligation to continue, and the roadmap is yours either way." The
   credit against later work is implied, not stated. Do not reintroduce the word "free" on
   this page.
2. **`AGENTS`**: `['Plan', 'Build', 'Check', 'Deploy to systems of record']` becomes
   `['Plan', 'Build', 'Validate', 'Deploy']`.
3. **The question set moves.** `QUESTIONS` now leads the page (band 2) rather than sitting
   under "Choosing a pilot process". The eyebrow "Choosing a pilot process" and the heading
   "The one you would fix first." are **dropped** — the question itself is the heading now.
   The lead that introduced them is split: the sentence "One named process, not a department
   and not a category. The right one is usually already obvious to the people doing the
   work." moves to band 4, beside "Four shapes it can take."
4. The old "For example" eyebrow is dropped; "Four shapes it can take." is promoted from
   `H3` to `H2` as its band's own heading.
5. The `Quote` and the two cross-links are unchanged and stay in the order given above.

## Design tokens

All of these already exist in `design/tokens/theme.css`. Listed for verification only.

| Role | Value | Token |
| --- | --- | --- |
| Ink — text, borders, shadow | `#2f1e14` | `--color-ink` |
| Page / card fill | `#ffffff` | `--color-page` |
| Surface band | `#f9f4ec` | `--color-surface` |
| Tint band | `#e6f1fe` | accent at 10% over white |
| Navy band | `#002161` | `--color-navy` |
| On-navy heading + body | `#fffbf3` | `--color-hero-heading` |
| Breadcrumb / on-navy eyebrow | `#73e1ff` | `--color-sky` |
| Eyebrow on light | `#005ec8` | `--color-accent-deep` |
| CTA fill / label | `#ffdf65` / `#000` | `--color-cta` / `--color-on-cta` |
| Rule + badge accents | `#ff5e00`, `#fab600`, `#00805d`, `#002161`, `#c7ffb1`, `#73e1ff` | orange, gold, brand, navy, mint, sky |
| Stage numeral | `#c24700` | `--color-orange-deep` |
| Muted body | ink at 70% / 72% | `text-ink/70`, `text-ink/72` |

Type: Merriweather Sans Bold headings (57/63 −0.022em · 36/42 −0.018em · 26/32, plus a 20/26
step used inside narrow columns), Figtree body (18/32 lead, 16/26 body, 15/24 and 14/21 in
dense cells), IBM Plex Sans Condensed SemiBold 12px uppercase +0.08em eyebrows.

Shape and edge: 12px card radius, pill buttons, 1px ink border + `0 4px 0` ink shadow, hover
lifts to `0 6px 0`, active translates 4px down and drops the shadow. Content column 1240px.
Band padding 54px (`pad="band"`), 92px (`pad="cta"`), 30px (`pad="header"`).

Motion: none is authored on this page beyond the site's existing reveal (`Wrap` opts content
in via `REVEAL_GROUP.up`; lists relay via `REVEAL_GROUP.relay`). The lane diagram should use
`REVEAL_ROW` on each of its two label rows so the four columns arrive in sequence rather than
as one slab, and the arrow row should be `.m42-in-still`.

## Assets

- `assets/grain-fine.png` — the site's existing 256px seamless grain tile, copied from
  `site/public/grain-fine.png`. Already in the codebase; nothing new to add.
- No illustrations are used in option 2A. The navy header and closing band are typographic.
  If you want a spot after all, `Spot name="laptop"` in the offer band is the natural place.

## Files in this bundle

- `PhaseZero-2A.dc.html` — the chosen design, option 2A, standalone. Open it in a browser.
- `PhaseZero-all-options.dc.html` — the full exploration: 2A plus the four earlier options
  (1a terms-up-front, 1b interactive stage selector, 1c diagram-led, 1d question-first).
  Useful for the reasoning behind 2A, and for the interactive stage selector in 1b if that
  idea gets picked up later.
- `support.js` — the runtime the two HTML files need. Keep it beside them.
- `assets/grain-fine.png`
