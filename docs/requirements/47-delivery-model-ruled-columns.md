# #47 — Replace the delivery model's benefit cards with ruled columns

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/47
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/51
- Parent epic: none
- Delivery unit: `unit-47-delivery-benefits-ruled-columns`
- Requirement version: 1

## Objective

The four claims under "Our progress is measured by value created, not effort
expended." read as four supporting points under one statement rather than as
four objects. Each is carried by the page's forest rule instead of a bordered
card, and the bodies line up across the row so no benefit carries ragged
trailing space.

## Scope

- The benefit grid on `/how-we-work/delivery-model` becomes four ruled columns
  built from `RuledGroup`, four across at `lg`, two at `md`, stacked below.
- A row subgrid aligns the bodies across each row, with row tracks declared per
  breakpoint so an unused row's gap is not added to the bottom of the band.
- `RuledGroup` gains an optional heading level, defaulting to the `h4` it
  already hardcoded.
- `Card` and `H3` leave the DeliveryModel import; nothing else on the page used
  them.
- `RuledGroup`'s title balances its line breaks, so a two-line title splits
  evenly rather than stranding a word.

## Out of scope

- Every other card on the delivery model page and across the site.
- The copy of the four benefits, which does not change.
- The band's own padding and its alternation with the sections around it.

## Behavioral scenarios

Carried from the ticket unchanged as SCN-001 through SCN-008.

### SCN-001 — The benefits are ruled columns, not cards

Given a visitor is on `/how-we-work/delivery-model` at a viewport of 1280px
When they reach the band headed "Our progress is measured by value created, not effort expended."
Then each of the four benefits is drawn with a 3px forest rule directly above its title
And no benefit is drawn with a surrounding border, a card fill, or a drop shadow
And each benefit shows its title above its body

### SCN-002 — Bodies start on the same line across a row

Given the band is showing benefits side by side
And at least one title in that row wraps to two lines while another sets on one
When the row is rendered
Then the first line of every body in that row starts at the same vertical position
And no body is lifted or dropped by how its own title wrapped

### SCN-003 — Column count steps down with the viewport

Given a visitor is on `/how-we-work/delivery-model`
When the viewport is 1024px or wider
Then all four benefits are shown across a single row
When the viewport is between 768px and 1023px
Then two benefits are shown per row across two rows
When the viewport is narrower than 768px
Then the benefits are stacked one per row in their source order

### SCN-004 — The band carries no space from an unused row

Given all four benefits are shown across a single row at 1280px
When the band is rendered
Then the space below the lowest body is the band's own bottom padding
And no additional empty grid row contributes space between the benefits and the bottom of the band

### SCN-005 — Heading order stays h2 then h3

Given the delivery model page is rendered
When the document's headings are read in order
Then "Our progress is measured by value created, not effort expended." is a level 2 heading
And each of the four benefit titles is a level 3 heading
And no heading level is skipped between them

### SCN-006 — The narrow viewport does not overflow

Given a visitor is on `/how-we-work/delivery-model` at a 375px viewport
When the band is rendered
Then the page does not scroll horizontally
And every rule, title, and body stays within the content column's horizontal padding

### SCN-007 — Existing ruled groups are unchanged

Given the pages that already call `RuledGroup` are rendered
When their ruled column blocks are read
Then every group title in them is still a level 4 heading
And their rule colour, column counts, and spacing are unchanged

### SCN-008 — The copy is unchanged

Given the delivery model page is rendered
When its text is compared against the base commit
Then the four benefit titles and the four bodies read exactly as they do today
And the route's copy parity result is no worse than the base commit's

## Non-functional requirements

- The forest rule is decorative and repeats nothing the text says, so it carries
  no contrast requirement. It measures 9.0:1 on `--color-page` regardless.
- No new dependency, stylesheet, or design token. `--color-forest` was already
  declared and already produced a utility under `tokens:check`.
- Semantics do not regress: the band keeps a real heading hierarchy and adds no
  interactive element, so there is no new keyboard or focus surface.
- Presentational only. No client-side state and no measurable bundle weight.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Computed styles at 1280px: `border-top: 3px rgb(0,84,61)`, other borders `0px/0px/0px`, `box-shadow: none`, background `rgba(0,0,0,0)` on all four |
| SCN-002 | Manual | — | N/A | All four `bodyTop` equal at 1440/1280/1024/768; forced one-line title still yields one shared `bodyTop` |
| SCN-003 | Manual | — | N/A | 4 columns at 1440/1280/1024, 2 at 768, 1 at 375, source order preserved |
| SCN-004 | Manual | — | N/A | `grid-template-rows` is 2 tracks at `lg` and 4 at `md`; space under the lowest body equals the band padding exactly (54px desktop, 34px mobile) |
| SCN-005 | Unit | `site/src/pages/DeliveryModel.test.jsx` | N/A | Full page outline shows no level skips |
| SCN-006 | Manual | — | N/A | At 375px `scrollWidth === clientWidth === 375`, no element extends past the client width |
| SCN-007 | Unit | `site/src/pages/DeliveryModel.test.jsx` | N/A | Engineering, AI-driven Products, and Agentic AI render `h4` group titles in the browser |
| SCN-008 | Unit | `site/src/pages/DeliveryModel.test.jsx` | N/A | Route text is byte-identical to the base commit; `copy:parity` output identical on all 14 routes |

Automated tests do not read this document, and no test was generated from it.

## Deliberate deviations

- The heading-level prop is named `as`, not the `titleAs` the design
  recommended. The design called the name non-binding. `as` matches the
  convention the primitives already use and no scenario depends on the name.
- The band's `H2` bottom margin moved from `mb-10` to `mb-9`, and the grid uses
  a 40px column gap and 36px row gap rather than the 34px `GroupColumns` uses.
  These are outside the stated scope and are recorded rather than reverted; no
  scenario constrains them.
- SCN-007 in the ticket names Home as a ruled-group page. Home has no
  `RuledGroup` call site on this base, so the scenario is verified against the
  three that exist: Engineering, AI-driven Products, and Agentic AI.
- The branch was created from `1abc035` before PR #48 merged, then `origin/main`
  at `684c979` was merged in. That merge supplied the vitest runner the
  contract's test intent depends on; before it, `npm run test:unit` did not
  exist on this base.
- The design asked for screenshots at five widths. The browser pane's tabs
  report `visibilityState: "hidden"` in this environment and every capture
  returns a blank frame, so the visual scenarios are evidenced by measured
  geometry and computed styles at those same five widths instead. This is an
  environment limitation, not a behavior gap.

- `text-wrap: balance` on the `RuledGroup` title was added after the contract
  was accepted, at the reviewer's request, once a 1024px check showed
  "Context is not lost." breaking after the negation and stranding `lost.` on
  its own line in a 202px column. It balances to "Context is / not lost." and is
  inert for a title that already fits on one line. It sits in the shared
  component rather than behind a new prop: the three other pages calling
  `RuledGroup` set their titles on one line at every width checked, except
  "Knowledge and automation" at 768px, which balances to an even two-line break.
  No scenario constrains line breaking, so this changes no scenario result.

## Open questions

- None.
