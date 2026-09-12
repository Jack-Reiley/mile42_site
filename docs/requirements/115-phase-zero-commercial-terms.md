# #115 — Publish the Phase Zero commercial terms and retire "priced to be a decision"

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/115
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/120
- Parent epic: none
- Delivery unit: U1 (shared branch `feature/113-home-rewrite` with #113, #114, #115, #117, #118, #119, #116)
- Requirement version: 2

## Objective

The Phase Zero page closes on "What it costs, and what you keep." with five labelled rows (duration, fee, scope, what you keep, what comes next), and every other surface that carried "priced to be a decision" states the terms in one sentence instead.

## Scope

- `site/src/pages/PhaseZero.jsx`: the `TERMS` constant and the closing band.
- `site/src/pages/WhatWeDo.jsx` and the engagement model panel (now on `site/src/pages/HowWeWork.jsx` after #119): one sentence each.
- `site/src/components/Header.jsx`: the Phase Zero column body.
- `site/src/pages/phase-zero-commercial-line.test.jsx`, `site/src/pages/PhaseZero.test.jsx`.

## Out of scope

- A hero-tone `TermList` variant.
- Advisory, which never carried the posture line.
- The "Three shapes" section (#118).
- The home page's Phase Zero card (#113).

## Behavioral scenarios

### SCN-001 — The Phase Zero page closes on the terms

Given a reader is on /what-we-do/phase-zero
When they reach the final band of the page
Then the band is the navy band the page header used
And it carries the h2 "What it costs, and what you keep."
And below the terms it carries one link named "Start a conversation" to /contact
And the h2 "Priced to be a decision, not an investment." is not on the page

### SCN-002 — Five rows, in order, verbatim

Given a reader is on /what-we-do/phase-zero
When they read the band under "What it costs, and what you keep."
Then the terms render as a description list with exactly five terms in this order: Duration, Fee, Scope, What you keep, What comes next
And Duration is defined as "Typically about a month."
And Fee is defined as "Fixed, agreed before we start. Typically between $10k and $30k depending on the process."
And Scope is defined as "One named process, the four stages above, and nothing that is not written down first."
And What you keep is defined as "The baseline, the working pilot, and the roadmap, whether or not you continue."
And What comes next is defined as "Your call. Most Phase Zeros lead into an engineering engagement. None of them have to."

### SCN-003 — The posture line is retired everywhere

Given the site is rendered
When any of /what-we-do/phase-zero, /what-we-do, /how-we-work, or / is opened
And the header's What we do panel is opened on desktop
And the mobile drawer's What we do section is opened
Then the text "priced to be a decision" appears on none of them
And none of them describes Phase Zero as free or as costing nothing

### SCN-004 — What we do states the terms

Given a reader is on /what-we-do
When they read the lead under "Before you choose, there is a smaller way to start."
Then it ends "About a month, fixed fee, typically $10k to $30k."
And the "Start with a pilot." panel keeps its title and its "See how Phase Zero works" link to /what-we-do/phase-zero; its body and eyebrow are #116's

### SCN-005 — The engagement model panel states the terms

Given a reader is on /how-we-work, below the engagement model band
When they read the "Start with a pilot." panel
Then its body is "Phase Zero is a working pilot on one process you name, built beside production and measured against your own baseline. You get something running, and a roadmap for what comes after it. About a month, fixed fee, typically $10k to $30k."
And the "See how Phase Zero works" link to /what-we-do/phase-zero is unchanged

### SCN-006 — The header card carries the short form

Given the header is rendered
When the What we do panel is opened on desktop
Then the Phase Zero column body reads "The low-risk way in. About a month, fixed fee."
When the mobile drawer is opened and its What we do section is expanded
Then the same body appears there verbatim

### SCN-007 — The home page card is unchanged

Given a reader is on /
When they read the Phase Zero offering card
Then it still reads "About a month. Fixed fee, agreed before we start, typically between $10k and $30k depending on the process."
And nothing this ticket changed appears on the home page

### SCN-008 — The page stays sound

Given /what-we-do/phase-zero is rendered
Then it has exactly one h1, "A working pilot on your process."
And no heading level is skipped in document order
And the "Start a conversation" link is reachable by keyboard
And no em dash appears in the new copy on any of the four changed surfaces

### SCN-009 — The terms are legible on the navy band

Given /what-we-do/phase-zero is rendered at 1024px
When the closing band is inspected
Then the heading takes the hero tone against the navy fill
And the five rows sit on the page fill inside a bordered card
And term and definition text are ink on that fill

### SCN-010 — The layout holds at phone width

Given /what-we-do/phase-zero is rendered at 375px
When the closing band is inspected
Then each row stacks its term above its definition in one column
And the card fits inside the viewport
And nothing overflows the viewport horizontally

## Non-functional requirements

- The terms are a real `dl`; the heading is a real h2 in valid order; the link is a real anchor.
- Heading on navy uses the hero tone; rows use ink on the page fill.
- No horizontal overflow at 375px. No em dashes in new copy.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/PhaseZero.test.jsx`, `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-004 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-005 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-006 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-007 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-008 | Unit | `site/src/pages/PhaseZero.test.jsx` | N/A | Keyboard reach of the contact link |
| SCN-009 | Manual | — | N/A | Browser at 1024px: computed colours or a screenshot |
| SCN-010 | Manual | — | N/A | Browser at 375px |

## Deliberate deviations

- Contract version 2, 12 September 2026: SCN-003 and SCN-005 read the engagement model on /how-we-work (#119 retired /how-we-work/engagement-model); SCN-004 pins the panel's title and link, its body and eyebrow being #116's; SCN-008 names the h1 "A working pilot on your process." (#116).

## Open questions

- Whether a hero-tone `TermList` variant is wanted later.
