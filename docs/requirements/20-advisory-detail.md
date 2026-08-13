# #20 — Redesign the Advisory detail page to the detail concept comp

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/20
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/PENDING
- Parent epic: none
- Delivery unit: `unit-advisory`
- Requirement version: 1

## Objective

`/what-we-do/advisory` stops being an extrapolation: six bands in the comp's
order, the concrete offer within one screen, and a named Phase Zero offering
that does not exist anywhere on the site today.

## Scope

- `site/src/pages/Advisory.jsx` rewritten to six sections
- `design/tokens/theme.css`: `--container-detail: 1120px`, pinned in
  `design/tokens/verify/expected.json`
- `site/src/components/primitives.jsx`: a `measure` option on `Wrap`, three
  detail-page band paddings on `Section`, `Breadcrumb`, `LabelBody`,
  `FeaturePanel`, a `tint` band, and an `accent` tone on `TextLink`
- `site/src/components/Lists.jsx`: a `ruled` variant on `TermList`, plus
  `NumberedSteps` and `CheckList`
- One 52px clipboard spot, tinted from `--color-orange` by the stage #19 added
- `copy_prototype/src/pages/Advisory.jsx` carries the same copy — authorised by
  this ticket
- The Aug 12 comp committed as `design/advisory-detail.html`
- `site/EXTRAPOLATIONS.md` records every deliberate deviation

## Out of scope

The Phase Zero page itself. The sibling detail pages. `/what-we-do`. Colour
tokens — nothing is added to the palette. Everything in `copy_prototype/` except
the copy on this one route. Header, footer, and the route table.

## Behavioral scenarios

SCN-001 through SCN-023 are carried from the ticket unchanged, including the
scope addition in its final comment, which routes `--container-detail` here.

## Non-functional requirements

- Accent-as-text meets AA. Covered by SCN-009 and SCN-010; the rule generalises
  to #21 and #22.
- The three pre-existing contrast failures in `design/tokens/OPEN-QUESTIONS.md`
  stay open. This page does not depend on them.
- No layout shift from the illustration.
- Keyboard operability with a visible focus indicator, including the breadcrumb.
- No new dependency.
- The build is the gate. There is no test suite in this repository.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Six `section` elements in `main`, in order |
| SCN-002 | Manual | — | N/A | 24×5 orange mark, sky crumb text, `h1` "You need clarity.", nothing else in the band |
| SCN-003 | Manual | — | N/A | `nav[aria-label="Breadcrumb"]`, parent is a link, leaf carries `aria-current="page"`, separator `aria-hidden` |
| SCN-004 | Manual | — | N/A | Copy checked against the ticket text |
| SCN-005 | Manual | — | N/A | Grid measures three columns at 1440, two at 1023, one at 767 |
| SCN-006 | Manual | — | N/A | Surface fill, ink border, hard shadow, 52px icon, eyebrow, heading, note, body, link |
| SCN-007 | Manual | — | N/A | Link resolves to `/contact` |
| SCN-008 | Manual | — | N/A | Tint is `#e6f1fe`; two label/body blocks; steps and checks as specified |
| SCN-009 | Manual | — | N/A | Step numeral `#f05800` measures 3.01 on the tint |
| SCN-010 | Manual | — | N/A | Panel eyebrow ink measures 14.57 on the surface fill |
| SCN-011 | Manual | — | N/A | All four badges carry `aria-hidden="true"` |
| SCN-012 | Manual | — | N/A | Label column, three paragraphs, two links with their destinations |
| SCN-013 | Manual | — | N/A | Sky eyebrow, heading, unchanged lead, button to `/contact` |
| SCN-014 | Manual | — | N/A | Nine deleted strings searched for in the rendered `main`; none present |
| SCN-015 | Manual | — | N/A | At 1023 every label/body and the panel are single column; header nav `display: none` |
| SCN-016 | Manual | — | N/A | At 767 the term list and the checks are single column; headings step down |
| SCN-017 | Manual | — | N/A | At 320 `scrollWidth === clientWidth` and no element overflows |
| SCN-018 | Automated + manual | `site/scripts/illustrations.mjs` tint assertion | N/A | 52px, `alt=""`, `path-clipboard-104.webp` |
| SCN-019 | Manual | — | N/A | Five other callers measured: every `dl` still `display: flex`, gap 20px, `dt` 16px/700; statement cards still 24px padding |
| SCN-020 | Manual | — | N/A | `prefers-reduced-motion` rule present in the emitted CSS |
| SCN-021 | Manual | — | N/A | One `h1`; h1, h2, h3, h2, h3, h3, h3, h3, h3, h2, h2 with no skipped level; content inside `main` |
| SCN-022 | Automated | `site/verify/copy-parity.mjs` | N/A | — |
| SCN-023 | Automated | `design/tokens/verify/check.mjs` | N/A | 39 pinned values, 38 tokens |

There is no test suite in this repository, so no scenario has a test file.
`lint`, `typecheck`, and `coverage` are empty strings in
`.agents/software-delivery.config.json` and therefore do not exist.

## Deliberate deviations

Each is recorded in `site/EXTRAPOLATIONS.md` as well.

- **The step numeral is `--color-orange` darkened 6%**, and **the feature eyebrow
  is ink rather than the accent.** The accent-as-text rule; it generalises to the
  two sibling pages.
- **Off-scale type snaps to the token scale**: h1 38 → 36, h2 27 → 36, h3 18 → 26,
  lead 17 → 18. The page header therefore carries the H2 token while remaining
  the page's only `h1`.
- **Panel radius and shadow snap to `--radius-card` and `--shadow-hard`.**
- **Term titles ship at 16px semibold ink, not the comp's rendered 14px muted.**
  The comp's own `.term-title` rule asks for 16px and is silently overridden by a
  later `.term p` rule, so its rendered size is an accident rather than intent.
- **The breadcrumb is real navigation**, authored rather than copied.
- **The eyebrow keeps the token's `.08em` tracking**, not the comp's `.09em`.
- **Phase Zero links to `/contact`** until the ticket that owns the route flips
  it.
- **Horizontal padding stays at `px-6 md:px-12`.**
- **The site's four-column footer stays.**

## Open questions

- The Phase Zero route is not settled and belongs to the ticket that owns it.
- `NumberedSteps` has one caller. If no later page uses it, it is a candidate to
  fold back into the page.
