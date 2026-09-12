# #116 — Apply the written copy rules across every page

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/116
- Pull request: to be linked when the shared PR opens
- Parent epic: none
- Delivery unit: U1 (shared branch `feature/113-home-rewrite` with #113, #114, #115, #117, #118, #119, #116)
- Requirement version: 2

## Objective

Every page and copy-bearing component reads under the ten copy rules of 12 September 2026: at most one "X, not Y" per page, no "That is not X. It is Y.", distinct closing calls to action, no rhythm triads, four phrases used once site-wide, varied sentence shape, subjects for abstractions, one-sentence principles, label-only eyebrows gone, no em dashes. Every changed string is logged.

## Scope

- `site/src/pages/`: `Home.jsx`, `WhatWeDo.jsx`, `Advisory.jsx`, `Engineering.jsx`, `AgenticAi.jsx`, `PhaseZero.jsx`, `HowWeWork.jsx`, `DeliveryModel.jsx`, `MeetVickee.jsx`, `WhyMile42.jsx`, `Contact.jsx`, `Insights.jsx`: copy only.
- `site/src/components/`: `Header.jsx` (one string), `StageJourney.jsx`, `WhereAgentsWork.jsx`, `VickeePillars.jsx`, `LibrarianDiagram.jsx`, `primitives.jsx` (the `FeaturePanel` eyebrow guard).
- Tests moved: `PhaseZero.test.jsx`, `DeliveryModel.test.jsx`, `MeetVickee.test.jsx`, `homepage-restructure.test.jsx`, `illustrations-restored.test.jsx`, `SelectorPanel.test.jsx`, `hero-and-argument-band.test.jsx`.
- Test added: `site/src/pages/copy-rules.test.jsx`, the mechanical rules on rendered copy.
- `Claude outputs/copy-pass-log.md`, with its "Earlier layer" section.

## Out of scope

- The settled copy: the home hero heading and lead, the buyer sentence, the three differentiator titles, the Vickee card heading, the Phase Zero commercial rows, "What we have built", "Three shapes", the Vickee pillars, the Privacy page.
- The "Start a conversation" button label.
- Naming a founder anywhere.
- The Agentic AI platform table and its "partner-literate" line.
- "rather than", which is outside rule 1.

## Behavioral scenarios

### SCN-001 — At most one contrast construction per page

Given the site is rendered
When any one of the 13 routes is opened
And every panel, tab, disclosure, selector pane, and header section panel that route can reveal is opened
Then the visible copy of that route, header and footer included, contains at most one ", not " or ". Not " construction
And where one is present it is the construction named for that route in the design table

### SCN-002 — "Tell you honestly" is Contact's alone

Given the site is rendered
When every route is opened
Then the phrase "tell you honestly" appears exactly once, on /contact
And "We will tell you honestly" and "Bring the problem" appear on no route

### SCN-003 — No two closing bands match

Given the site is rendered
When the closing band of each route that has one is read
Then no two routes share a closing heading
And no two routes share a closing lead
And no route's closing heading is "Tell us what needs to work."

### SCN-004 — The "That is not X. It is Y." move is gone

Given the site is rendered
When every route is opened
Then no sentence beginning "That is not", "This is not", or "It is not" is followed by a sentence beginning "It is"

### SCN-005 — Four phrases appear once site-wide

Given the site is rendered
When every route is opened
Then "blank page" appears once, on /how-we-work/delivery-model
And "skin in the game" appears once, on /how-we-work
And "table stakes" appears once, on /meet-vickee
And "in the room" appears once, on /what-we-do/advisory

### SCN-006 — Abstractions have a subject

Given the site is rendered
When every route, panel, and pane is opened
Then "senior judgment" appears nowhere
And the word "humans" appears nowhere
And /how-we-work/delivery-model carries the h2 "Where agents work, and what stays with the engineer who owns it." and the eyebrow "Three things that stay with a named person"
And the delivery role pane labels its second box "Engineer's decision"
And /what-we-do/engineering/agentic-ai carries "what your team has to approve" and "A named person accountable for every consequential decision."

### SCN-007 — Rhetorical triads are cut, real threes stay

Given the site is rendered
When /what-we-do, /what-we-do/advisory, /what-we-do/engineering, /what-we-do/engineering/agentic-ai, /how-we-work/delivery-model, /why-mile42, /contact, and / are opened
Then each of the rule-4 rewrites recorded in the copy-pass log is present in its "after" form
And the Home principles, the Engineering outcomes and offers, the Phase Zero worth columns, the Meet Vickee outcomes, and the Contact expectations still list three items

### SCN-008 — Label-only eyebrows are gone, audience eyebrows stay

Given the site is rendered
When every route is opened
Then none of "Core practice", "How we engage", "Offering · Phase Zero", "Offering · Phase Zero pilot", "Proof", "Capabilities", "Engagements", "What we offer", and "What we bring" renders as an eyebrow
And the Phase Zero feature panels on /what-we-do, /what-we-do/advisory, and /how-we-work open on their title with the magnifier above it
And "Not sure where to start", "You need clarity", "You need to execute", "Before a major investment", "Client journey", "Delivery model", and "Engagement model" still render as eyebrows

### SCN-009 — Rule 6 and rule 7 rewrites are present

Given the site is rendered
When /how-we-work, /contact, /what-we-do/engineering, /why-mile42, and /meet-vickee are opened
Then the client journey lead ends "You should be better off at the end of every one, whether or not you continue to the next."
And the Contact expectation reads "If the situation is clear enough, we will suggest a call. Otherwise we ask what we would need to know."
And the Engineering production paragraph opens "Real data is messier than the sample."
And the Meet Vickee intro heading reads "Your people know the business and your agents scale the work. Vickee gives them shared context."
And verification names any paragraph it judges to still hold two consecutive sentences of the same length and shape

### SCN-010 — Why Mile42 principles are a title and one sentence

Given a reader is on /why-mile42
When they reach the principles list
Then it renders five rows, each with an h3 title and one body sentence
And the titles are, in order: Clarity over complexity; Context before solutions; Judgment, not information; Meet you where you are; Each engagement improves the next

### SCN-011 — The settled copy is untouched

Given the site is rendered
When /, /what-we-do/phase-zero, /why-mile42, /how-we-work, /meet-vickee, and /legal/privacy are opened
Then the home hero heading and lead are the ones bound to the share card
And the buyer sentence, the three differentiator titles, and the Vickee card heading on / are unchanged
And the Phase Zero commercial rows, the "What we have built" section, the "Three shapes" section, the seven Vickee pillars, and the Privacy page match the tree before this pass
And every primary call-to-action button is labelled "Start a conversation"

### SCN-012 — No em dash in rendered copy

Given the site is rendered
When every route, panel, and pane is opened
Then no rendered text contains an em dash

### SCN-013 — Tests moved, none loosened; the log is complete

Given the shared branch
When the unit suite, the token check, and the build run
Then every test that pinned old wording now pins the new wording with the same behavioural claim
And no test is skipped, commented out, or deleted
And the suite, the token check, and the build all pass
And every copy string in this ticket's commit appears as a before/after pair in the copy-pass log, in its "12 September pass" or "Earlier layer" section

## Non-functional requirements

- Heading hierarchy, landmarks, list semantics, and the selector, tablist, and disclosure roles are unchanged; deleting an eyebrow removes a `span`, never a heading.
- No new assets; bundle change is string length.
- The mechanical-rules test renders routes and components, never reads source files, and never parses this document.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/copy-rules.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/copy-rules.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/pages/copy-rules.test.jsx` | N/A | — |
| SCN-004 | Unit | `site/src/pages/copy-rules.test.jsx` | N/A | — |
| SCN-005 | Unit | `site/src/pages/copy-rules.test.jsx` | N/A | — |
| SCN-006 | Unit | `site/src/pages/copy-rules.test.jsx` | N/A | — |
| SCN-007 | Manual | — | N/A | Read every route on the dev server against the log's rule-4 entries; name any remaining triad |
| SCN-008 | Unit | `site/src/pages/copy-rules.test.jsx`, `site/src/components/illustrations-restored.test.jsx` | N/A | — |
| SCN-009 | Unit + manual | `site/src/pages/copy-rules.test.jsx`, `site/src/pages/MeetVickee.test.jsx` | N/A | Read every route; name any remaining same-shape pair |
| SCN-010 | Unit | `site/src/pages/copy-rules.test.jsx` | N/A | — |
| SCN-011 | Unit | `site/src/social-metadata.test.jsx`, `site/src/pages/phase-zero-commercial-line.test.jsx`, `site/src/pages/why-mile42-proof.test.jsx`, `site/src/pages/engagement-shapes.test.jsx`, `site/src/pages/MeetVickee.test.jsx`, `site/src/pages/Privacy.test.jsx` | N/A | — |
| SCN-012 | Unit | `site/src/pages/copy-rules.test.jsx` | N/A | — |
| SCN-013 | Unit + manual | the whole suite, `npm run tokens:check`, `npm run build` | N/A | The log's two sections against the commit's diff |

## Deliberate deviations

- The first copy pass (the "earlier layer") rewrote lines in `Home.jsx`, `Engineering.jsx`, `HowWeWork.jsx` and the #113 test files that #113 and #119 then rewrote or merged. Those lines are not separable from that work with confidence, so they travel in the #113 and #119 commits; the log lists them under "Earlier layer" and this note records where they sit.
- Rule 1 is counted on `, not ` and `. Not `. The librarian diagram's two `, never ` constructions are outside the rule set and the earlier design's "No direct writes" edit is dropped.
- The mechanical-rules test counts each rule on the two viewport forms a page keeps in the DOM (Tailwind `hidden` and `*:hidden`) and takes the larger, because jsdom applies no stylesheet and a whole-tree count would see one sentence twice.

## Open questions

- None.
