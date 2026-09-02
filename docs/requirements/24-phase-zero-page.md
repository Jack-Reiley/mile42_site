# #24 — Create the Phase Zero page

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/24
- Pull request: TBD
- Parent epic: none
- Delivery unit: U1-phase-zero
- Requirement version: 1

## Objective

A Phase Zero page at `/what-we-do/phase-zero` that explains the offering the
rest of the site points at, built to option 2A of
`design/design_handoff_phase_zero/`, and reachable from the Advisory panel, the
header panel and the footer.

## Scope

- The route, registered in `site/src/App.jsx`.
- The page, composed from the existing primitives, ordered so the reader's own
  question comes first.
- Three list shapes the design needs and the codebase did not have: a `TermList`
  variant taking a per-item rule colour, a vertical stage card, and a two-lane
  handoff diagram.
- Navigation: a footer link, a header panel card, and the panel grid widened to
  carry a fourth column.
- The Advisory panel's "Start with Phase Zero" link flipped off `/contact`.

## Out of scope

- `/what-we-do/advisory` beyond the single link flip.
- `design/tokens/`.
- The site-wide commercial line, which #99 settles on this same branch.

## Behavioral scenarios

### SCN-001 — The page answers the Advisory panel's call to action

Given a reader is on `/what-we-do/advisory`
When they activate "Start with Phase Zero"
Then they arrive at `/what-we-do/phase-zero`
And the page renders rather than bouncing to the homepage

### SCN-002 — The page opens on the reader's own question

Given a reader arrives at the page
Then the first heading is the level-one "Proof, not a proposal."
And the next heading is a level-two "What is the one process you would fix first?"
And that question is set at the largest type step on the page

### SCN-003 — The four diagnostic questions are offered as a set

Given a reader is in the question band
Then all four questions appear, each with its explanation
And each carries a rule in its own colour
And a single primary action leads to `/contact`

### SCN-004 — The engagement is shown as four ordered stages

Given a reader is in the offer band
Then Identify, Analyze, Pilot and Roadmap appear in that order
And each carries its sequence number and its sentence
And the fixed-scope note appears beneath them

### SCN-005 — The build is shown as a handoff between people and agents

Given a reader is in the build band at 1024px or wider
Then four human steps appear in a lane named People
And four agent steps appear in a lane named Agents
And each human step sits directly above the agent step it pairs with
And the direction marker between "Review the work" and "Validate" points from the agent to the person
And the markers in the other three columns point from the person to the agent

### SCN-006 — The handoff survives a narrow viewport

Given a reader is in the build band below 1024px
Then the four pairings appear stacked, one per row
And each keeps its direction marker between the human step and the agent step
And no part of the page scrolls horizontally

### SCN-007 — The page states its commercial terms without calling itself free

Given a reader reaches the closing band
Then it reads "Priced to be a decision, not an investment."
And it states that scope is fixed, there is no obligation to continue, and the roadmap is kept either way
And the word "free" appears nowhere in the page's main content

### SCN-008 — The page is reachable from site navigation

Given a reader is anywhere on the site
When they open the "What we do" panel
Then a Phase Zero entry is offered
And the footer offers the same destination

### SCN-009 — The page carries a single grained band

Given the page renders
Then only its opening band carries the grain film
And no band below it does

### SCN-010 — Headings form a navigable outline

Given a reader moves through the page by heading
Then exactly one level-one heading exists
And no heading level is skipped

## Non-functional requirements

- **NFR-1.** Four lanes only at `lg` and above.
- **NFR-2.** Colour is never the only carrier of meaning.
- **NFR-3.** Type, colour, radius and shadow resolve to `design/tokens/theme.css`.
  No raw hex.
- **NFR-4.** Real landmarks, real heading hierarchy, real link and button
  semantics, and keyboard-reachable interactive elements.
- **NFR-5.** Any layout choice not specified by the handoff is extrapolated and
  belongs in `site/EXTRAPOLATIONS.md`.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/PhaseZero.test.jsx` | N/A | Click through from the Advisory panel |
| SCN-002 | Unit + manual | `site/src/pages/PhaseZero.test.jsx` (heading order only) | N/A | Type step measured in the browser |
| SCN-003 | Unit + manual | `site/src/pages/PhaseZero.test.jsx` (question text only) | N/A | Per-question rule colour read from `QUESTION_MARKS` |
| SCN-004 | Unit + manual | `site/src/pages/PhaseZero.test.jsx` (stage names only) | N/A | Sequence numerals and the fixed-scope note read in the browser |
| SCN-005 | Unit + manual | `site/src/pages/PhaseZero.test.jsx` (pairing only) | N/A | Arrow direction read from `UP_AT`; browser pass at 1440 |
| Route renders | Unit | `site/src/pages/routes.test.jsx` | N/A | - |
| SCN-006 | Manual | - | N/A | Browser pass at 375, 768, 1023; no horizontal overflow |
| SCN-007 | Unit | `site/src/pages/PhaseZero.test.jsx` | N/A | - |
| SCN-008 | Unit | `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | Click through from the Header panel and the Footer |
| SCN-009 | Unit | `site/src/pages/hero-grain.test.jsx` | N/A | - |
| SCN-010 | Unit | `site/src/pages/PhaseZero.test.jsx` | N/A | - |

SCN-006 is manual because the suite runs in jsdom, which applies no media
queries.

SCN-002 through SCN-005 are marked "Unit + manual" after verification found the
unit tests cover only part of each scenario: heading order but not type step,
question text but not rule colour, stage names but not numerals or the note,
lane pairing but not arrow direction. The behaviour is correct in every case;
the map previously overstated what the automated tests prove. SCN-008's panel half became automated when #99's guard test began
opening the panel; the footer half and the click-through stay manual because
jsdom follows no navigation.

E2E is N/A throughout: the repository has no E2E harness.

## Deliberate deviations

Three departures from the handoff README, each commented at the point it happens
in the source:

- The question band takes no grain. The site films only a page's opening band and
  `hero-grain.test.jsx` enforces it, so the invariant won rather than the test
  being weakened.
- Band and card padding follow the primitives, not the prototype's 64px and 26px.
  This is the README's own rule that discrepancies resolve in favour of the
  primitives.
- The "worth" band takes the surface fill the prototype draws rather than the
  white the README names. On white it and the build band above it run together
  as one field.

A fourth, resolved during implementation:

- The handoff's ~900px diagram switch is implemented at `lg` (1024px). Measured
  at 905px the person cells carry about 110px of text and bodies run seven to
  nine lines; at 1023px they run five to six and read. `HandoffLanes.jsx` now
  uses `lg:block` and `lg:hidden` rather than `min-[900px]`.

## Open questions

- Whether the handoff README should be amended to name `lg` rather than ~900px,
  or the override simply stand as a recorded deviation.
