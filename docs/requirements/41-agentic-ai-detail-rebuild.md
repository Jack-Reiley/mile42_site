# #41 — Rebuild the Agentic AI page on the Engineering detail pattern

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/41
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/44
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

The Agentic AI page reads as part of the Engineering practice that now owns it:
the same navy detail header, a three-level breadcrumb, a capability listing below
the hero, an architecture and integration section that covers more than model
choice, an adoption and accountability section, and each hard part linked to the
section that carries it.

## Scope

- `site/src/pages/AgenticAi.jsx`: navy header with a three-level breadcrumb;
  capability listing with the framing lead above it; the architecture and
  integration section widened; an adoption and accountability section added; the
  hard parts linked to same-page anchors; the closing band moved to navy.
- `site/src/components/primitives.jsx`: `Breadcrumb` takes an optional
  `ancestors` list and renders each level as its own link, so every existing
  two-level page keeps working unchanged.

## Out of scope

- The route move, which is #39.
- The in-page drill-down specified in
  `design/illustrations/design_handoff_agentic_ai_drilldown`, which is a new
  build with its own ticket rather than documentation of work already done.

## Behavioral scenarios

SCN-001 through SCN-009 are carried from the ticket unchanged. SCN-007 is
superseded by the drill-down ticket when it lands; see Deliberate deviations.

### SCN-001 — The page opens on the Engineering detail header

Given a visitor opens the Agentic AI page
When it loads
Then it opens on the same navy header the What We Do detail pages use
And the hero heading sits on that band in the on-dark tone

### SCN-002 — The breadcrumb reads all three levels

Given the page header
When a visitor reads the breadcrumb
Then it reads What we do, then Engineering, then Agentic AI
And the first two are links to those pages
And Agentic AI is marked as the current page

### SCN-003 — Two-level breadcrumbs are unchanged

Given the pages that show a two-level breadcrumb
When each is loaded
Then its breadcrumb reads exactly as it did before, with one parent and the current page

### SCN-004 — The capability listing opens the page

Given a visitor reads down from the header
When they reach the first content section
Then it presents what the practice builds as a capability listing with an eyebrow, a list heading, and ruled groups of terms
And the framing paragraph about implementation sits above that listing

### SCN-005 — Architecture and integration covers more than model choice

Given the architecture section
When a visitor reads it
Then it addresses the operational constraints an agent has to meet, including permissions, latency, failure modes, cost control, and what happens when a dependency is down
And model choice appears as one part of that section rather than as its subject

### SCN-006 — Adoption and accountability has a section

Given the page
When a visitor reads it end to end
Then a section addresses what happens after go-live, including who owns the system, what is measured, and how a bad output is reported and acted on

### SCN-007 — Each hard part leads to the section that carries it

Given the four hard-part cards
When a visitor follows the link on any one of them
Then the page moves to the section that covers that hard part
And the target section's heading is visible rather than clipped at the top of the viewport

### SCN-008 — The page closes on the band it opened on

Given a visitor reaches the end of the page
When they read the closing call to action
Then it sits on the same navy as the page header, in the on-dark tones

### SCN-009 — The bands alternate down the page

Given the page's sequence of bands
When a visitor scrolls through it
Then no two adjacent content bands share a fill

## Non-functional requirements

- Heading, eyebrow, and body tones on the navy bands meet AA at their sizes.
- The breadcrumb is a real navigation landmark with real links at every level.
- Same-page links move the page without breaking the back button's meaning.
- No new dependency, no new route.

## Verification map

This repository has no test suite, so no scenario has automated coverage.
`lint`, `typecheck`, and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and therefore do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Page top captured; header band compared with a What We Do detail page |
| SCN-002 | Manual | — | N/A | All three breadcrumb levels read, the first two followed, `aria-current` on the third |
| SCN-003 | Manual | — | N/A | Two-level breadcrumb pages loaded and compared with their previous rendering |
| SCN-004 | Manual | — | N/A | First content section captured with the lead above the listing |
| SCN-005 | Manual | — | N/A | Architecture section shown covering all five constraints |
| SCN-006 | Manual | — | N/A | Adoption and accountability section captured |
| SCN-007 | Manual | — | N/A | All four hard-part links followed, landing position captured |
| SCN-008 | Manual | — | N/A | Closing band fill compared with the header |
| SCN-009 | Manual | — | N/A | Band sequence listed in order down the page |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **"Align the bands" is settled narrowly.** What shipped aligns the header and
  the closing band: both navy, with the detail pages' shorter closing rhythm. The
  interior content bands run the site's default band rhythm rather than the
  shorter one the Engineering page uses on its interiors. That is the intended
  endpoint. SCN-001, SCN-008, and SCN-009 assert the header, the closing band,
  and the alternation, and do not assert that the interior padding matches
  Engineering's.
- **SCN-007 is superseded by the drill-down ticket when it lands.** That ticket
  folds the four standalone sections into one panel and replaces the anchor links
  with tab selection. Until it ships, SCN-007 is the behavior on the page and is
  verified as written. Recorded here so a later verification does not read the
  change as a regression.
- **Several blocks of this page's copy are marked in the source as draft** rather
  than carried from the prototype: the three capability group titles, the
  adoption section, and the architecture rows. That marking is part of the change
  and stays.
- **The drill-down design handoff is not in the repository.** It is untracked at
  `design/illustrations/design_handoff_agentic_ai_drilldown`. Left untracked by
  developer decision on 2026-08-17, so this document cites it by path.
- **`npm run copy:parity` reports this route as 117 of 117 differing.** The
  prototype still serves the page at `/agentic-ai` and with the pre-rebuild copy.
  Accepted as designed divergence and routed to a follow-up ticket; not treated
  as a pass criterion here.
- **The commits named in the ticket body do not resolve.** The branch was rebased
  after design, so `979d9fa`, `e63688a`, `1ef053b`, `133ca8d`, `987eaea`,
  `ac933b1`, and `5d11dbc` are now `c9d9d4c` (header), `35d1926` (three-level
  breadcrumb and band alignment), `5e7470e` (architecture and integration),
  `770ca94` (adoption and accountability), `f83a9b9` (capability listing),
  `9b58831` (implementation lead placement), and `adfdda7` (hard parts linked).

## Open questions

- The capability group titles, the adoption section, and the architecture rows
  are draft copy. They need approval as copy, which this ticket does not claim to
  have obtained. The drill-down handoff carries the same copy and calls it final,
  so approving it once settles both. Carried forward unresolved.
