# #118 — Add the three engagement shapes to the Engagement model page

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/118
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/120
- Parent epic: none
- Delivery unit: U1 (shared branch `feature/113-home-rewrite` with #113, #114, #115, #117, #118, #119, #116)
- Requirement version: 2

## Objective

The engagement model names what the work looks like from the client's side: a fixed-scope pilot (Phase Zero), an embedded team, and an outcome-priced build, two sentences each, between the pricing posture and the delivery-model argument. Built on the Engagement model page and carried into /how-we-work by #119.

## Scope

- `site/src/pages/EngagementModel.jsx` at this ticket's commit (the `SHAPES` constant, the band, the delivery-model band's fill flip); on `site/src/pages/HowWeWork.jsx` once #119 merges the page.
- `site/src/pages/engagement-shapes.test.jsx`, new.

## Out of scope

- Moving the band to /how-we-work (#119).
- Naming the shapes on Home, What we do, or the header panel.
- The FDE label.

## Behavioral scenarios

### SCN-001 — The shapes band names the three shapes in order

Given a reader is on /how-we-work
When they reach the band headed "Three shapes the work takes."
Then the band carries the lead "Which one fits depends on how much is already known. Most engagements start with the first."
And it carries exactly three h3 headings in this order: "A fixed-scope pilot", "An embedded team", "An outcome-priced build"

### SCN-002 — Each shape is two sentences, verbatim

Given a reader is on /how-we-work
When they read the body under each shape's heading
Then "A fixed-scope pilot" reads "Phase Zero: one named process, about a month, and a fixed fee agreed before we start. You keep the baseline, the working pilot, and the roadmap whether or not you continue."
And "An embedded team" reads "A small senior team, with its agents, working inside your organization beside your own people on a live backlog. The scope moves as the work does, and the price follows the outcomes rather than the hours."
And "An outcome-priced build" reads "A defined system delivered end to end, for a price tied to what it has to do in production. The risk of the estimate is ours, and the baseline a Phase Zero produces is what that price is argued from."
And each body is exactly two sentences

### SCN-003 — The pilot shape links to the Phase Zero page

Given a reader is on /how-we-work
When they look under "A fixed-scope pilot"
Then there is one link named "What Phase Zero includes" to /what-we-do/phase-zero
And the other two shapes carry no link
And no link named "See Phase Zero" exists anywhere on the page

### SCN-004 — The band sits between the posture and the argument

Given a reader is on /how-we-work
When they read the engagement model bands in order
Then the band headed "We price for value.", whose lead opens "Clients want a partner with skin in the game.", is immediately followed by the band headed "Three shapes the work takes."
And that band is immediately followed by the band headed "The delivery model is what makes the commercial model possible."

### SCN-005 — The embedded shape is described in plain words

Given /how-we-work is rendered
When its text is read
Then neither "forward deployed" nor "forward-deployed" appears, in any case
And the standalone term "FDE" appears nowhere

### SCN-006 — The rest of the page is unchanged

Given a reader is on /how-we-work
When they read the delivery-model band
Then its three paragraphs, its "See the delivery model" and "See engineering" links, and its "Start with a pilot." panel with the "See how Phase Zero works" link to /what-we-do/phase-zero read as #115, #119 and #116 leave them
And the shapes are named on no other page, in the header's What we do panel, or in the mobile drawer

### SCN-007 — The page stays sound

Given /how-we-work is rendered
Then it has exactly one h1, "Execution is a system, not a sales pitch."
And the three shape titles are h3s under the h2 "Three shapes the work takes.", with no heading level skipped in document order
And the "What Phase Zero includes" link is a real anchor reachable by keyboard
And no em dash appears in the new copy

### SCN-008 — The bands alternate fills

Given /how-we-work is rendered at desktop width
When the three copy bands are inspected
Then the posture band sits on the page fill
And the shapes band sits on the surface fill
And the delivery-model band sits on the page fill
And each shape column carries an orange rule above its title

### SCN-009 — The layout holds at desktop and phone widths

Given /how-we-work is rendered at 1024px or wider
Then the three shapes sit in three columns on one row
Given the same page is rendered at 375px
Then the three shapes stack in one column in the same order
And nothing overflows the viewport horizontally

## Non-functional requirements

- Real h2 and h3s in valid order, a real anchor for the link.
- Ink type on the `surface` fill; the orange rule is decoration only.
- No horizontal overflow at 375px. No em dashes in new copy.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/engagement-shapes.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/engagement-shapes.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/pages/engagement-shapes.test.jsx`, `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-004 | Unit | `site/src/pages/engagement-shapes.test.jsx` | N/A | — |
| SCN-005 | Unit | `site/src/pages/engagement-shapes.test.jsx` | N/A | — |
| SCN-006 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx`, `site/src/pages/PhaseZero.test.jsx` | N/A | Header panel and drawer read on the dev server |
| SCN-007 | Unit | `site/src/pages/engagement-shapes.test.jsx`, `site/src/pages/routes.test.jsx` | N/A | Keyboard reach of the link |
| SCN-008 | Manual | — | N/A | Browser at 1024px: computed backgrounds or a screenshot |
| SCN-009 | Manual | — | N/A | Browser at 1024px and 375px |

## Deliberate deviations

- Contract version 2, 12 September 2026: every scenario reads against /how-we-work, the `#engagement-model` band, because #119 merged the page in the same unit. The posture band is headed "We price for value." (#116) with a lead opening "Clients want a partner with skin in the game."; the delivery-model band's links are "See the delivery model" and "See engineering" (#119); the page's one h1 is "Execution is a system, not a sales pitch."
- At this ticket's commit the band and its test live on `EngagementModel.jsx`; #119's commit moves both to `HowWeWork.jsx`.

## Open questions

- Whether buyers are using the "forward deployed engineer" term.
- Whether the shapes should be named on the /how-we-work topic card.
