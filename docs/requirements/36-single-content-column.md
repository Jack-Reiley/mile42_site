# #36 — Six routes run a narrower content column than the rest of the site

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/36
- Pull request: pending
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

Every route renders its content on the site's single content column, so the left
edge is continuous from the wordmark through the content into the footer, and no
page can opt out of it.

## Scope

- `site/src/components/primitives.jsx`: the `measure` prop and its width map
  removed from `Wrap`, which now renders one container at the site width. The
  relationship between the cap and the section padding is documented on `Wrap`.
- `site/src/pages/Advisory.jsx`, `AiProducts.jsx`, `Engineering.jsx`,
  `ClientJourney.jsx`, `DeliveryModel.jsx`, `EngagementModel.jsx`: every
  `measure` usage removed.

## Out of scope

- Any change to the pages' content, copy, band structure, or band fills.
- The band rhythm on the three How We Work child pages, which is #35's.

## Behavioral scenarios

SCN-001 through SCN-006 are carried from the ticket unchanged.

### SCN-001 — Every route runs one content column

Given the site
When each route is loaded in turn
Then its content is laid out on the same content column as every other route

### SCN-002 — The left edge is continuous from header to footer

Given any route, at a viewport wide enough for the column cap to bind
When a visitor scrolls from the header through the content into the footer
Then the left edge of the wordmark, the content, and the footer is one edge
And it does not shift inward on the way down the page

### SCN-003 — The six previously narrow pages match the rest

Given the four What We Do detail pages and the two How We Work topic pages that previously ran the narrower column
When each is compared with a page that always ran the site column
Then their content starts and ends on the same edges

### SCN-004 — No page can opt out of the column any more

Given the shared layout container
When the source is inspected
Then no page passes a width to it
And no mechanism remains for a page to request the narrower measure

### SCN-005 — Nothing else about the six pages changed

Given each of the six affected pages
When it is compared with its previous rendering
Then its copy, its band order, and its band fills are unchanged
And only the width its content is laid out on differs

### SCN-006 — Narrow viewports are unaffected

Given a viewport too narrow for the column cap to bind
When a visitor loads any of the six pages
Then the content is inset by the section's own horizontal padding as before
And no content runs to the viewport edge or overflows it

## Non-functional requirements

- One container definition for the whole site, so the grid has a single source.
- No layout regression at any of the site's existing breakpoints.
- No new dependency.

## Verification map

This repository has no test suite, so no scenario has automated coverage. This
is a grid defect, so the evidence is measured `getBoundingClientRect().left`
values rather than a visual impression. `lint`, `typecheck`, and `coverage` are
configured as empty strings in `.agents/software-delivery.config.json` and
therefore do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Measured content left edge on every route at a width where the cap binds |
| SCN-002 | Manual | — | N/A | Wordmark, first content element, and footer edges on a previously narrow page |
| SCN-003 | Manual | — | N/A | The six pages' edges compared against a page that always ran the site column |
| SCN-004 | Manual | — | N/A | Source search for `measure` across `site/src` returning no usage |
| SCN-005 | Manual | — | N/A | Diff of the six pages showing only `measure` removed |
| SCN-006 | Manual | — | N/A | Each of the six pages at a viewport below the cap; no overflow |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **The ticket says sixteen routes; the site now serves fourteen.** That was true
  when the ticket was written. #38 removes the proof and partners pages. The
  scenarios are written against every route the site serves rather than against
  a count, so they hold whichever of the two lands first.
- **`npm run copy:parity` is red across this branch.** It compares copy rather
  than layout, so it would not have caught this defect and does not confirm the
  fix. Accepted as designed divergence and routed to a follow-up ticket; not
  treated as a pass criterion here.
- **The commit named in the ticket body does not resolve.** The branch was
  rebased after design, so `38cd37f` is now `ec2952f`.

## Open questions

- The detail comps draw the narrower column, so the built site now differs from
  them by design. Whether the comps are annotated to record that is open and is
  not owned here. Carried forward from the ticket unresolved.
