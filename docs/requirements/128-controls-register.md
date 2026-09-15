# #128 — Redesign the Controls page as a ruled register with varied band rhythm

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/128
- Pull request: pending
- Parent epic: none
- Delivery unit: U1 (independent, `feature/128-controls-register` based on `main`), run `2026-09-14-controls-register-and-copy-pass`
- Requirement version: 1

## Objective

The reader who has to explain an agent's controls to an auditor reads
/meet-vickee/controls as a control register: a numbered label column naming
each control area beside a hairline-ruled three-column list, on a band
sequence that varies so no two consecutive areas read the same. Every control,
row, and column header says what it said before; only the form changes.

## Supersedes

`docs/requirements/122-controls-page.md` version 2 marks the affected parts in
place: SCN-002 (the honesty paragraph) is retired, SCN-003 (five tables) is
superseded for the shape of each area, and the responsive NFR about table
scroll is superseded by SCN-009 below.

## Scope

- `site/src/pages/Controls.jsx`: the header band drops its lead; the honesty
  band is removed; a statement band renders the former lead with the `Lead`
  primitive; each control area renders inside `LabelBody` with the wider
  tracks, the label column carrying the two-digit number, the h2, and the
  lead, and the body column carrying `ControlRegister`; the band list becomes
  `surface, page, navy, page, surface`; the closing band is unchanged.
  `CONTROLS` and `COLUMNS` are byte-identical to `main`.
- `site/src/components/Lists.jsx`: new `ControlRegister`, sibling to
  `CompareTable`, same `{ columns, rows }` shape, `tone: 'ink' | 'hero'`.
- `site/src/components/primitives.jsx`: `LabelBody` gains a `tracks="wide"`
  option (`minmax(240px,1fr) minmax(0,2.2fr)`); the default tracks are
  unchanged, so Advisory and Engineering do not move.
- `site/src/pages/Controls.test.jsx` rewritten in place;
  `site/src/components/Lists.test.jsx` added.
- `docs/requirements/122-controls-page.md` version 2 (supersession notes).
- `design/design_handoff_controls/` committed on the branch as the reference.

## Out of scope

- Any change to control copy: the five titles, leads, 14 rows, column
  headers, and closing band.
- Header, footer, Meet Vickee, and Home links to the page (#122 SCN-007 to
  SCN-009).
- New colour, token, primitive, pad step, or dependency.
- Handoff directions 1b and 1c.

## Behavioral scenarios

### SCN-001 — The page keeps its route, title, breadcrumb, and heading size

Given `/meet-vickee/controls` is open
When the page is read from the top
Then the tab title is "How agents are controlled · Mile42"
And the breadcrumb landmark links to `/meet-vickee` and names "Controls" as the current page
And the only h1 reads "How agents are controlled." at the detail-page heading size, the same step the other child pages use
And the header band carries no paragraph

### SCN-002 — The statement band follows the header

Given `/meet-vickee/controls` is open
When the second band is read
Then it is a light `page` band with exactly one paragraph and no heading or eyebrow
And the paragraph reads exactly: "What an agent can reach, what it can change, what record it leaves, and what you would show an auditor. Written for the person who has to sign off, not the person who builds it."
And the sentence "Vickee has not been through a third-party audit" appears nowhere on the page

### SCN-003 — Eight bands in the handoff's order

Given `/meet-vickee/controls` is open
When the sections are read top to bottom
Then their fills are navy, page, surface, page, navy, page, surface, orange-deep
And the first, fifth, and eighth carry grain
And the five control areas sit in the third to seventh

See Deliberate deviations: grain is carried by the first band only, pending
the design owner's decision recorded there.

### SCN-004 — Each control area has a numbered label column

Given `/meet-vickee/controls` is open
When a control area is read
Then its label column shows a two-digit number as an eyebrow, the area's h2, and the area's one-line lead, in that order
And the numbers run 01 to 05 and the h2s read "Access control", "Change control and separation of duties", "Logging and evidence", "Monitoring and review", "When it is wrong"
And at `lg` and above the label column sits beside the register; below `lg` it sits above it

### SCN-005 — The register is a real table with the same content as before

Given `/meet-vickee/controls` is open
When a control area's register is read
Then it is one `table` whose column headers read "Control", "How it works", "Evidence you receive"
And every row's first cell is a row header and is followed by two cells
And the fourteen rows across the five areas carry the same text as `main`, character for character
And every table element carries its explicit table role so the structure survives any layout change

### SCN-006 — The register is hairlines on the band

Given `/meet-vickee/controls` is open at 64rem or wider
When a register is inspected
Then it has no border, no rounded corner, no fill, and no shadow
And the header row is separated by a 1px rule and each data row by a 1px rule at reduced opacity
And the middle column is wider than each of the other two
And the register is not inside a horizontally scrolling container

### SCN-007 — The navy control area is legible

Given `/meet-vickee/controls` is open
When the "Logging and evidence" area is read
Then its number, column labels, and heading are off-white or sky on navy and meet AA
And its rules are off-white at reduced opacity, not ink

### SCN-008 — Light bands separate

Given `/meet-vickee/controls` is open
When the "Access control" and "When it is wrong" bands are inspected
Then each carries a 1px top rule, since each follows a `page` band
And the "Change control" and "Monitoring" bands carry none, since each follows navy or the statement

### SCN-009 — Nothing scrolls sideways at phone width

Given `/meet-vickee/controls` is open at 375px
When the page is scrolled to the bottom
Then the body does not scroll horizontally
And no register scrolls horizontally
And each register row reads as a stack: control name, how it works, then an evidence line that names itself
And at 52rem the register shows its three columns and the label column sits above it
And at 64rem the label column sits beside the register

### SCN-010 — Heading order and keyboard reach are unchanged

Given `/meet-vickee/controls` is open
When headings and focus order are checked
Then there is one h1 followed only by h2s
And Tab reaches the breadcrumb link, then the closing button, then the footer, in that order after the header

### SCN-011 — The statement is the page's one contrast construction

Given `/meet-vickee/controls` is open
When ", not " constructions are counted on the page
Then there is exactly one, and it is in the statement paragraph

### SCN-012 — The closing band is unchanged

Given `/meet-vickee/controls` is open
When the last band is read
Then it is orange-deep with the heading "Bring your control framework.", the existing lead verbatim, and a "Start a conversation" button to `/contact`

### SCN-013 — The page's inbound links are unchanged

Given the header panel, header drawer, footer, Meet Vickee, and Home
When their links are read
Then each still points at `/meet-vickee/controls` as #122 left it

### SCN-014 — The build matches the handoff, with the named deviations

Given the branch running on localhost and the seven handoff screenshots
When each band is compared in order at 1240px content width
Then every mismatch is written down before fixing, fixed, and re-captured
And the only remaining differences are the four deviations named in this design: heading size, statement size, hero padding step, and stacking breakpoint
And Brett has reviewed the page on localhost before the PR opens

### SCN-015 — Gates pass with nothing skipped

Given the branch head under the pinned Node
When `npm run test:unit`, `npm run tokens:check`, `npm run build`, and `npm run copy:build` run
Then all pass
And no test is skipped, disabled, or marked `todo`

## Non-functional requirements

- Semantic markup: one h1, h2 per section, breadcrumb landmark, real table
  with `th scope="col"` and `th scope="row"` plus explicit roles.
- AA on every band: sky on navy 10.03:1 and off-white on navy 14.64:1 (#122's
  measurements, same tokens); off-white on orange-deep 4.85:1; ink at 72% on
  `surface` and `page` for the column labels.
- No new dependency, colour token, type token, primitive, or pad step.
- Responsive at 375px, 52rem, and 64rem; the body never scrolls horizontally
  and neither does the register.
- Reveal-on-scroll respects reduced motion as the existing `reveal.js` does.
- No em dash; #116 SCN-012 stays green.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-001; `site/src/pages/routes.test.jsx` | N/A, no E2E harness | Browser: tab title and h1 at 1280px |
| SCN-002 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-002 | N/A | — |
| SCN-003 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-003 (fills, order, rules); `site/src/pages/hero-grain.test.jsx` (first band grained) | N/A | Browser: band sequence at 1280px |
| SCN-004 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-004 | N/A | Browser: label beside register at 1024px, above it at 832px |
| SCN-005 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-005; `site/src/components/Lists.test.jsx` | N/A | — |
| SCN-006 | Manual | `site/src/components/Lists.test.jsx` (no card classes, fixed layout, column proportions) | N/A | Browser at 1280px and 1024px: computed border 0, radius 0, transparent fill, no shadow; header widths 207/361/207 at 1280px, 160/279/160 at 1024px; parent overflow visible |
| SCN-007 | Unit + manual | `site/src/pages/Controls.test.jsx` SCN-007; `site/src/components/Lists.test.jsx` tone | N/A | Browser: sky labels `rgb(115,225,255)`, rules off-white at 25% on the navy band |
| SCN-008 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-003 (rules) | N/A | Browser: computed 1px top border on bands 3 and 7 only |
| SCN-009 | Manual | `site/src/components/Lists.test.jsx` (stacking classes, evidence label) | N/A | Browser at 375px: document width 375, every table scrollWidth = clientWidth, rows `display: block`, label shown; 832px: one column, three register columns; 1024px: two columns |
| SCN-010 | Unit + manual | `site/src/pages/Controls.test.jsx` SCN-010 | N/A | Browser Tab traversal at 1280px |
| SCN-011 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-011; `site/src/pages/copy-rules.test.jsx` retained table | N/A | — |
| SCN-012 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-012 | N/A | — |
| SCN-013 | Unit (jsdom) | `site/src/components/Header.test.jsx`, `site/src/components/Footer.test.jsx`, `site/src/pages/MeetVickee.test.jsx`, `site/src/pages/homepage-restructure.test.jsx` (unchanged) | N/A | — |
| SCN-014 | Manual | — | N/A | Compare/fix list in the PR body; Brett's localhost review |
| SCN-015 | Gate | `npm run test:unit && npm run tokens:check`; `npm run build && npm run copy:build` | N/A | Command output in the PR body |

jsdom has no layout, so hairlines, column widths, band contrast, stacking, and
focus order are browser evidence. No E2E suite exists and none is added.

## Deliberate deviations

- `H2 as="h1"` at 36px, not the handoff's 57px `H1` (creation decision 2).
- The statement renders with the `Lead` primitive at 18/32 and its 46rem
  measure, not the handoff's 22/36 across the full column (creation decision
  3: no new primitive or token).
- Hero padding is the existing `band` step (34/54), not the handoff's 64/72.
  Compared against `screenshots/01`, the 36px heading does not read cramped at
  54px; the `default` step (64/96) was not needed.
- Rows stack below Tailwind `md` (768px), the site's step nearest the
  handoff's "roughly 700px".
- Control names are `th scope="row"`, not `h3` (heading contract, #122
  SCN-010).
- Grain: the handoff draws the navy control area (band 5) and the orange-deep
  close (band 8) with grain, and SCN-003 carries that. This branch grains the
  header band only. The site rule that grain stops at the opening band is
  pinned for every route by `site/src/pages/hero-grain.test.jsx` ("grain
  stops at the hero"), the ticket's own scope says the closing band is
  unchanged (SCN-012), and #122 shipped both bands flat. Relaxing the rule for
  one page is a site-wide design decision the ticket did not make explicitly,
  so it is put to Brett at the localhost review rather than decided here.
- The reveal relay sits on each row rather than on the `tbody`. Chromium
  ignores a transform on a `tr` (measured: a 40px translate on a row moves it
  0px; on a cell or a `tbody` it moves 40px), so the cells carry the motion.
  They share a row's scroll position and arrive together, which satisfies the
  handoff's "rows arriving in sequence" within the design's stated tolerance.

## Open questions

- Grain on bands 5 and 8: see Deliberate deviations. Awaiting Brett's
  decision at the localhost review.
