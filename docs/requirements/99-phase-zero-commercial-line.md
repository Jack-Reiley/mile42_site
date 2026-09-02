# #99 — The site calls Phase Zero free in four places the page no longer does

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/99
- Pull request: TBD
- Parent epic: none
- Delivery unit: U1-phase-zero
- Requirement version: 1

## Objective

One commercial line for Phase Zero, stated the same way on every surface that
states it, so a reader arriving from the header, the homepage, What We Do or the
Engagement Model is not told the pilot is free and then shown a page that prices
it.

## Scope

- The header panel's Phase Zero card and the mobile drawer entry drawn from the
  same `NAV` constant.
- The homepage Phase Zero panel.
- The What We Do Phase Zero band.
- The Engagement Model paragraph that argued from the first engagement costing
  nothing, rebuilt as an argument about who carries the risk of an estimate.
- A guard test pinning all five surfaces together.

## Out of scope

- Pricing itself, engagement terms, and the contract.
- The Phase Zero page's layout and its closing band, which #24 settles.
- `site/src/pages/Advisory.jsx` and `site/src/pages/ClientJourney.jsx`, which
  describe Phase Zero but make no commercial claim.

## Behavioral scenarios

### SCN-001 — The header's Phase Zero card states the priced line

Given a reader is on any route
When the "What we do" panel is open
Then the Phase Zero card describes the offering as priced to be a decision
And the card does not use the word "free"

### SCN-002 — The mobile drawer carries the same line

Given the navigation drawer is open at a narrow viewport
When the reader reaches the Phase Zero entry
Then it shows the same commercial line as the desktop panel

### SCN-003 — The homepage Phase Zero panel states the priced line

Given a reader is on the homepage
When they reach the Phase Zero panel
Then the panel states the offering is priced to be a decision, not an investment
And the panel does not use the word "free"

### SCN-004 — The What We Do Phase Zero band states the priced line

Given a reader is on `/what-we-do`
When they reach the Phase Zero band
Then the band states the offering is priced to be a decision, not an investment
And the band does not use the word "free"

### SCN-005 — The Engagement Model argues the first engagement without claiming it costs nothing

Given a reader is on `/how-we-work/engagement-model`
When they read the delivery-model band's closing paragraph
Then it states the first engagement is priced to be a decision rather than an investment
And it states the risk of an unproven estimate stays with Mile42 until the baseline exists
And neither "free" nor "cost nothing" appears in the band

### SCN-006 — The Phase Zero page's own line is unchanged

Given a reader is on `/what-we-do/phase-zero`
Then the closing band still reads "Priced to be a decision, not an investment."
And no occurrence of "free" appears anywhere on the rendered route, header included

### SCN-007 — The credit against later work stays implied

Given a reader visits any of the five surfaces
Then none of them state that the pilot cost is credited against later work

### SCN-008 — Non-commercial uses of the word survive

Given a reader is on `/how-we-work` or `/why-mile42`
Then the sentences that use "free" in a non-commercial sense are unchanged

## Non-functional requirements

- The header card's link accessible name is unchanged. Only the body paragraph
  beneath the link changes.
- The panel grid does not break at the `lg` four-column breakpoint or in the
  drawer.
- No em dashes in copy or comments.
- `npm run test:unit`, `npm run tokens:check` and `npm run build` pass.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | Panel opened at 1440 |
| SCN-002 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | Drawer opened at 375 |
| SCN-003 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | - |
| SCN-004 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | - |
| SCN-005 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | - |
| SCN-006 | Unit | `site/src/pages/PhaseZero.test.jsx` | N/A | - |
| SCN-007 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | - |
| SCN-008 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | - |

E2E is N/A throughout: the repository has no E2E harness, and the delivery
config's `verify` is `npm run build && npm run copy:build`.

## Deliberate deviations

- The header card takes the short form of the line, "The low-risk way in, priced
  to be a decision.", rather than the pages' full sentence. The 248px panel
  column has no room for the long form. Both are pinned separately by the guard
  test so the card cannot keep the words while losing the posture.
- `phase-zero-commercial-line.test.jsx` stubs `window.matchMedia` locally rather
  than in `src/test-setup.js`. jsdom does not implement it, and the header asks
  it whether hovering is real before opening a panel on hover. This is the first
  test to reach that handler, so the stub stays with the test that needs it.

## Open questions

- None. Both questions the design left open are resolved. The header card takes
  the 45-character line: measured in the browser, it runs one line at 375 in the
  drawer, three at 1024 where "When something must be built." already runs three,
  and two above that, so it is not the widest card in the panel and the fallback
  is not needed. The delivery grouping is a shared branch with #24 rather than a
  stacked PR, on the user's instruction and because merging #24 alone would ship
  the contradiction this ticket exists to remove.
