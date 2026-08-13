# #19 — Redesign the What We Do page to the combined-hero comp

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/19
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/PENDING
- Parent epic: none
- Delivery unit: `unit-what-we-do`
- Requirement version: 1

## Objective

`/what-we-do` stops being an extrapolation and becomes designed work: four bands
in the comp's order, the three engagement paths inside the hero, and a benefits
band that argues the commercial model rather than restating the firm's
standards.

## Scope

- `site/src/pages/WhatWeDo.jsx` rewritten to four bands: navy hero carrying the
  three path cards, blue core-practice band, cream benefits band, navy CTA
- `site/src/components/primitives.jsx`: `navy` and `blue` entries in `BAND`, a
  `tight` band padding option, `PathCard`, on-dark tones for `Eyebrow`,
  `TextLink`, `H2`, `H3`, `Lead`, and `Body`, and a `decorative` option on `Spot`
- `site/scripts/illustrations.mjs`: an optional `tint` on a `MAP` entry, naming a
  colour token, with its own build-time assertion
- Three mono masters in `design/illustrations/` and three `META` entries
- `copy_prototype/src/pages/WhatWeDo.jsx` carries the same copy — authorised by
  this ticket, which `CLAUDE.md` otherwise forbids
- The Aug 12 comp committed as `design/what-we-do-combined.html`
- `site/EXTRAPOLATIONS.md` records every deliberate deviation

## Out of scope

The three child detail pages. Every other page, including the ones using the
`brand` band. `design/tokens/` — no colour is added. Everything in
`copy_prototype/` except the copy on this one route. Header and footer. The
untracked `whatwedo_preview.html`, which is neither the old nor the new comp.

## Behavioral scenarios

SCN-001 through SCN-020 are carried from the ticket unchanged. They are not
restated here in full; the ticket body is the design-time source and this
document maps each to its evidence below.

## Non-functional requirements

- The blue band meets AA. Covered by SCN-008.
- The three pre-existing contrast failures in `design/tokens/OPEN-QUESTIONS.md`
  stay open. This page uses none of those pairings.
- No layout shift from illustrations: intrinsic dimensions come from the
  generated data file.
- Keyboard operability with a visible focus indicator on every interactive
  element.
- No new dependency. The tint stage uses `sharp`, already a devDependency.
- The build is the gate. There is no test suite in this repository and this
  ticket does not add one.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Four `section` elements in `main`, in order, from the accessibility tree |
| SCN-002 | Manual | — | N/A | Browser pass at 1440 against the comp |
| SCN-003 | Manual | — | N/A | Hero grid measures `550.156px 645.844px` at 1440, matching the comp exactly |
| SCN-004 | Manual | — | N/A | Each card is one `link` node with zero nested links |
| SCN-005 | Manual | — | N/A | Hover rules read out of the emitted stylesheet; see the limitation below |
| SCN-006 | Manual | — | N/A | Focus outline resolves to `#0073f4`, 3.42:1 on navy |
| SCN-007 | Manual | — | N/A | Band resolves to `#006ae0`; copy and link destination checked |
| SCN-008 | Manual | — | N/A | Measured ratios: eyebrow 4.55, body 4.92, link 4.92, H2 4.92 |
| SCN-009 | Manual | — | N/A | Browser pass; grid is `608px 608px` at 1440 and two columns at 768 |
| SCN-010 | Manual | — | N/A | Browser pass at 1440 |
| SCN-011 | Manual | — | N/A | Twelve deleted strings searched for in the rendered `main`; none present |
| SCN-012 | Manual | — | N/A | At 1023: hero and core practice single column, benefits still two, header nav `display: none` |
| SCN-013 | Manual | — | N/A | At 767 and 390: benefits single column, path cards intact |
| SCN-014 | Manual | — | N/A | At 320: `scrollWidth === clientWidth`, no element past the viewport |
| SCN-015 | Automated + manual | `site/scripts/illustrations.mjs` tint assertion via `npm run illustrations:build` | N/A | Icons measure 48×48, `alt=""`, absent from the accessibility tree |
| SCN-016 | Automated | `site/scripts/illustrations.mjs` via `npm run illustrations:build` | N/A | Negative test: a deliberately corrupted tint failed the build |
| SCN-017 | Manual | — | N/A | `@media (prefers-reduced-motion: reduce)` rule present in the emitted CSS |
| SCN-018 | Manual | — | N/A | One `h1`; h2 for path cards and bands, h3 for benefit cards; content inside `main` |
| SCN-019 | Automated | `site/verify/copy-parity.mjs` via `npm run copy:parity` | N/A | — |
| SCN-020 | Automated | `design/tokens/verify/check.mjs` via `npm run tokens:check` | N/A | `theme.css` unchanged in the diff |

There is no test suite in this repository, so no scenario has a test file.
`lint`, `typecheck`, and `coverage` are empty strings in
`.agents/software-delivery.config.json` and therefore do not exist.

## Deliberate deviations

Each is recorded in `site/EXTRAPOLATIONS.md` as well.

- **The blue band is the accent darkened to 92%, `#006ae0`.** No palette colour
  reaches AA on `#0073f4`. Expressed as `color-mix` on the token; `theme.css` is
  untouched.
- **The handshake is `--color-red`, not the comp's `#ff5c9d` or the ticket's
  earlier `--color-pink`.** Superseded during design so the path icons mirror the
  three detail-page accents.
- **Off-scale type snaps to the token scale**: path headings 19 → 26, path bodies
  14 → 16, benefit headings 22 → 26, quote 24 → 26, H1 54 → 57.
- **The path card radius is `--radius-card` 12px, not the comp's 14px.** The
  ticket's Scope says 14px; #7 settled that card radius is token-driven, and the
  three sibling detail tickets snap the same 14px to the same token. Called out
  because it is a design-time decision this implementation took.
- **Horizontal padding stays at `px-6 md:px-12`.** Deferred to #23, which then
  measured it and retired the change.
- **The site's four-column footer stays.** Ratified during design.
- **Responsive type steps down the site's own scale**, not the comp's 42/33px
  H1 steps. That is the existing site-wide convention.

## Open questions

- **`92%` is a derived minimum, not a designer's choice.** It came from the AA
  threshold. If the designer wants a specific on-dark blue it should become a
  token and replace the derivation.
- The focus ring fades in over 150ms on the path cards, because Tailwind 4's
  `transition-colors` includes `outline-color`. It is suppressed under reduced
  motion. Left as is; flagged in case an instant ring is preferred.
