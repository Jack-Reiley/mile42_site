# Handoff: /meet-vickee/controls redesign

## Overview

A redesign of the existing Controls page (`site/src/pages/Controls.jsx`) for the
reader who has to explain an agent's controls to an auditor. The page keeps all
of the current copy and all five control areas. What changes is the form: the
five identical `CompareTable` sections become a **ruled register** — a label
column stating the control area, and a hairline-ruled list of controls beside
it — and the band rhythm varies so no two consecutive sections read the same.

Two content changes were requested directly by the design owner:

1. **The hero carries the H1 only.** The header `Lead` is removed from the band.
2. **That Lead becomes the second section**, replacing the honesty paragraph,
   which is removed from the page.

See "Open items for the ticket" — item 2 conflicts with requirement #122
SCN-002 and with `Controls.test.jsx`, and needs a decision before merge.

## About the design files

The files in this bundle are **design references created in HTML**. They are
prototypes showing intended look, structure, and copy — not production code to
copy directly. The task is to recreate the design in the site's existing
environment (React 19 + React Router + Tailwind 4, composing
`site/src/components/primitives.jsx`) using its established patterns. Do not
introduce a new styling approach, a new colour, or a new primitive where an
existing one covers the need.

`support.js` is the design tool's own runtime, needed only to open the
`.dc.html` files in a browser. It is not part of the design and must not be
ported.

## Fidelity

**High-fidelity.** Every colour, type size, line height, rule weight, radius,
shadow, and padding below is exact and taken from `design/tokens/theme.css`. No
new token is introduced. Recreate it to the measurements given.

## Screens / Views

One route: `/meet-vickee/controls`. Seven bands, top to bottom.

Content column: `max-w-site` (1240px) with `Wrap`; the inner measure used by
the mock is 1120px, matching `--container-detail`. Band horizontal inset is the
existing `px-6 md:px-12`.

### 1. Page header — band `navy`, grain

- Composition: `<Section band="navy" grain pad="header">` → `<Wrap>` →
  `Breadcrumb` → `H1`.
- Breadcrumb: the existing `Breadcrumb` primitive, unchanged —
  `to="/meet-vickee"`, `parent="Meet Vickee"`, `current="Controls"`,
  `markClass="bg-orange"`, default `tone="sky"`. The mock draws it as static
  markup; **use the primitive**, which emits the `nav aria-label="Breadcrumb"`
  landmark and the real parent link.
- H1: "How agents are controlled." — Merriweather Sans 700, 57px/63px,
  `-0.022em`, `--color-hero-heading` `#fffbf3`. This is the `H1` primitive with
  `tone="hero"`. Note the current page uses `H2 as="h1"`; the redesign wants the
  full display step, so switch to `H1`.
- Vertical padding: the mock uses 64px top / 72px bottom. `pad="header"`
  (22/30) is too tight for a hero carrying no lead paragraph. Either add a
  `pad` entry or use `pad="default"` (`py-16 lg:py-24`) and accept 64/96.
- Grain: `BAND_GRAIN.navy` — `soft-light` at `0.5`, centred. Unchanged.

### 2. Statement — band `page`

- Composition: `<Section band="page">` → `<Wrap>` → one paragraph, no heading,
  no eyebrow, no rule.
- Copy, verbatim: "What an agent can reach, what it can change, what record it
  leaves, and what you would show an auditor. Written for the person who has to
  sign off, not the person who builds it."
- Type: Figtree 400, **22px / 36px**, `--color-ink`, `text-wrap: pretty`.
  22px sits between `--text-body-lg` (18/32) and `--text-heading-3` (26/32) and
  is the one **extrapolated** value on the page. Options, in order of
  preference: (a) render `Lead` and accept 18/32; (b) add a `Statement`
  component carrying 22/36; (c) add a `--text-statement` token. Decide with the
  design owner — do not scatter a one-off `text-[22px]`.
- Padding: `py-14` (56px) in the mock.

### 3–7. The five control areas

Each is one `Section` → `Wrap` → a two-column grid.

Band sequence, which is what carries the varied rhythm:

| # | Control area | Band | Type tone |
| --- | --- | --- | --- |
| 01 | Access control | `surface` | ink |
| 02 | Change control and separation of duties | `page` | ink |
| 03 | Logging and evidence | `navy` + grain | on-dark |
| 04 | Monitoring and review | `page` | ink |
| 05 | When it is wrong | `surface` | ink |

A `surface` band following a `page` band takes `border-top: 1px solid
rgba(47,30,20,0.16)` so the two light fields separate. `page` following `navy`
needs none.

**Outer grid** (the `LabelBody` shape, with its own track sizes):

```
display: grid;
grid-template-columns: minmax(240px, 1fr) minmax(0, 2.2fr);
gap: 56px;
align-items: start;
```

`LabelBody` exists for exactly this and should be extended with these tracks
rather than duplicated. Its current `lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.6fr)]`
squeezes the 36px H2 into too narrow a column here. Below `lg` it must collapse
to one column, label above register.

**Label column:**

- Eyebrow: the two-digit control number — `01`…`05`. `Eyebrow` primitive,
  IBM Plex Sans Condensed 600, 12px/17px, `0.08em`, uppercase.
  Tone `accent` (`--color-accent-deep` `#005ec8`) on light bands, `sky`
  (`#73e1ff`) on navy.
- H2: the control area name. `H2` primitive — Merriweather Sans 700, 36px/42px,
  `-0.018em`. Ink on light, `tone="hero"` on navy. `margin: 6px 0 10px`.
- Lead: the area's one-line summary. `Lead` primitive, 18px/32px, same tone rule.

**Register column** — a new component. Suggested name `ControlRegister`, sibling
to `CompareTable` in `site/src/components/Lists.jsx`, same `{ columns, rows }`
data shape so `Controls.jsx` keeps its existing `CONTROLS` array untouched. Add
a `tone` prop (`'ink' | 'hero'`) for the navy band.

Header row:

```
display: grid;
grid-template-columns: minmax(0,1fr) minmax(0,1.75fr) minmax(0,1fr);
gap: 24px;
border-bottom: 1px solid var(--color-ink);   /* on navy: rgba(255,251,243,0.5) */
padding-bottom: 8px;
```

Three labels, eyebrow type: "Control", "How it works", "Evidence you receive".
On light bands they are `rgba(47,30,20,0.72)`; on navy, `#73e1ff`.

Data rows — same three tracks and gap, so the labels stay aligned:

```
border-top: 1px solid rgba(47,30,20,0.16);   /* on navy: rgba(255,251,243,0.25) */
padding: 18px 0;
```

- Cell 1, the control name: Merriweather Sans 700, 16px/24px, ink (or
  `#fffbf3`). An `h3` in the mock.
- Cell 2, how it works: Figtree 400, 15px/24px, `text-wrap: pretty`.
- Cell 3, evidence received: Figtree 400, 15px/24px.

**The three tracks are proportional on purpose.** An earlier pass used fixed
`230px / 1fr / 260px`, which made the description column the narrowest of the
three once the container fell below about 1100px. Keep them fractional, with
the middle track always the widest.

### 8. Closing band — `orange-deep`, grain

Unchanged from the current page. `<Section band="orange-deep">` → `<Wrap
className="text-center">` → `H2 tone="hero"` "Bring your control framework." →
`Lead tone="hero"` (the existing paragraph, verbatim) → `Button to="/contact"`
"Start a conversation". Padding 72px in the mock; grain `overlay` at `0.27`.

## Copy

All copy is unchanged from `site/src/pages/Controls.jsx` on `main` — the five
`CONTROLS` entries (titles, leads, and all 14 rows), the column headers, and the
closing band. Take it from the existing file, not from the mock, so no
apostrophe or serial comma drifts. The only deltas are the two content changes
named in the Overview.

## Interactions & behavior

Nothing new. The page is static content.

- `Button` keeps its existing states: hover lifts 2px and the hard shadow grows
  to `0 6px 0`; `:active` translates 4px down and drops the shadow.
  Transition `--duration-btn` (160ms) `--ease-m42`.
- Breadcrumb link: underline on hover, from the primitive.
- Reveal-on-scroll comes from `Wrap` / `REVEAL_GROUP` as on every other route.
  The register's rows are siblings arriving in sequence, so `REVEAL_GROUP.relay`
  is the right choice inside `ControlRegister` — the same treatment the other
  list shapes in `Lists.jsx` use.
- Responsive: the outer two-column grid collapses to one column below `lg`. The
  register itself must not scroll horizontally — its columns are fractional, so
  below roughly 700px it should stack each row to one column (name, then how it
  works, then a labelled evidence line) rather than compress. Verify at 375px,
  52rem, and 64rem, per #122's non-functional requirements.

## State management

None. No state, no data fetching, no client-side interactivity.

## Design tokens

Every value below already exists in `design/tokens/theme.css`. Nothing new.

**Colour**

| Token | Hex | Use here |
| --- | --- | --- |
| `--color-ink` | `#2f1e14` | text, register rules, borders, hard shadow |
| `--color-page` | `#ffffff` | bands 02, 04 |
| `--color-surface` | `#f9f4ec` | bands 01, 05 |
| `--color-navy` | `#002161` | header band, band 03 |
| `--color-hero-heading` | `#fffbf3` | type on navy and orange-deep |
| `--color-sky` | `#73e1ff` | breadcrumb, eyebrows on navy |
| `--color-accent-deep` | `#005ec8` | eyebrow numerals on light bands |
| `--color-orange` | `#ff5e00` | breadcrumb mark only |
| `--color-orange-deep` | `#c24700` | closing band fill |
| `--color-cta` | `#ffdf65` | button fill |
| `--color-on-cta` | `#000000` | button label |
| ink at 72% | `rgba(47,30,20,0.72)` | register column labels |
| ink at 16% | `rgba(47,30,20,0.16)` | register row rules, band separator |

**Type** — `--text-heading-1` 57/63 `-0.022em`; `--text-heading-2` 36/42
`-0.018em`; `--text-body-lg` 18/32; `--text-body` 16/26; `--text-eyebrow` 12/17
`0.08em` uppercase. Register cells use 15px/24px and 16px/24px, both already
drawn elsewhere in `Lists.jsx`. The 22px/36px statement is the one
extrapolation; see band 2.

**Spacing** — outer grid gap 56px; register column gap 24px; register row
padding 18px 0; band padding 56px (control areas), 64/72px (header), 72px
(close). Label block inner margins 6px and 10px.

**Shape and shadow** — `--radius-card` 12px, `--radius-pill` 9999px,
`--shadow-hard` `0 4px 0 #2f1e14`, `--shadow-hard-lift` `0 6px 0`. Note the
register carries **no card and no shadow** — it is hairlines on the band. The
only shadowed element on the page is the CTA button.

## Assets

- `site/public/grain-fine.png` — the 256px noise tile, already in the repo.
  Rendered through the existing `Grain` component with `centred`; per-band
  opacity and blend from `BAND_GRAIN`. The mock references it directly at
  `site/public/grain-fine.png`.
- No illustrations. No icons. The page draws none, and none should be added.

## Files

In this bundle:

- `Controls Page.dc.html` — the chosen design (option 1a), the page to build.
- `Controls Page options 1a-1c.dc.html` — the three directions reviewed, kept
  for context. 1b and 1c were not selected.
- `support.js` — design-tool runtime, so the two files above open in a browser.
  Not part of the design.
- `screenshots/01-controls.png` … `07-controls.png` — the chosen design captured
  top to bottom, in order. Reference only; the `.dc.html` is authoritative for
  measurements.

In the repo, to change:

- `site/src/pages/Controls.jsx` — bands, band sequence, label columns; drop the
  header `Lead` and the honesty `Section`; add the statement band.
- `site/src/components/Lists.jsx` — add `ControlRegister`.
- `site/src/components/primitives.jsx` — extend `LabelBody` track sizes; add a
  header `pad` step if the taller hero is kept.
- `site/src/pages/Controls.test.jsx` — see below.

## Open items for the ticket

1. **The honesty paragraph is removed.** #122 SCN-002 requires it as the first
   thing after the header, and `Controls.test.jsx` asserts its exact text. The
   design owner asked for it to go. Either the requirement is superseded and the
   test updated, or the paragraph moves somewhere else on the page — a
   note under the statement band, or into the closing band. **Needs a decision
   before implementation.**
2. **The register is not a `<table>`.** #122's non-functional requirements
   mandate a real `table` with `th scope="col"` / `scope="row"`, which is what
   `CompareTable` emits. The ruled register is the visual point of this
   redesign, so the accessible options are: keep a real `table` and style it to
   the hairline register (`border-collapse`, no fill, rules on `tr`), or emit a
   description-list structure per row. The first keeps the requirement intact
   and is the recommended route — the measurements above translate directly to
   `table-layout: fixed` with `col` widths of 1fr / 1.75fr / 1fr.
3. **SCN-003** asserts each control area is followed by "one lead paragraph and
   one table". Wording needs updating to whatever 2 resolves to.
4. **H1 vs H2-as-h1.** The redesign uses the 57px display step. Confirm that is
   wanted on a child page — every other detail page uses `H2 as="h1"` at 36px.
5. **The 22px statement** needs a home in the type system. See band 2.
