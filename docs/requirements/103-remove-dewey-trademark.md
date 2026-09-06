# #103 — Drop the ™ from every Dewey mark on the site

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/103
- Pull request: <URL>
- Parent epic: none
- Delivery unit: unit-103-dewey-trademark
- Requirement version: 1

## Objective

Nowhere on the site does the Dewey name carry a trademark symbol.

## Supersedes

This document supersedes the "The trademark symbol" section of
`docs/requirements/60-dewey-entry-points.md`. That file is a versioned record of
what was true when #60 shipped and is deliberately not edited. Its list of
marked locations, and its reasoning for choosing `™` over `®`, describe a
decision that no longer holds.

## Scope

Line numbers are against `main` at `4c9cc96`, the base of this branch.

- The homepage Dewey panel heading loses the symbol (`Home.jsx:269`).
- The homepage Dewey heading width cap returns from `max-w-[68rem]` to
  `max-w-[66rem]`, the measured value it held before #60 (`Home.jsx:268`).
- The comment above that cap stops citing the trademark as the reason for 68rem
  and keeps the 66rem rationale that predates it (`Home.jsx:254-267`).
- The catalog drawer label plate loses the symbol, written there as the
  `&#8482;` entity (`CatalogDrawer.jsx:153`).
- The Meet Dewey pillars heading loses the symbol (`MeetDewey.jsx:442`).
- The Meet Dewey hero eyebrow comment stops carrying the glyph and stops
  claiming the name "still carries its mark everywhere else on the page"
  (`MeetDewey.jsx:188-194`).
- The unrendered librarian flow column loses the symbol
  (`LibrarianFlow.jsx:76`).

## Out of scope

- `docs/requirements/60-dewey-entry-points.md` and every other historical
  requirements document. They record what was true when they shipped.
- `®`, a footer trademark notice, or any other trademark treatment. Nothing
  replaces the symbol.
- The unmarked "Dewey" mentions across the site. They were never marked.
- Deleting `LibrarianFlow.jsx` and `StepStrip`, which #70 left unreachable. That
  decision is still open and belongs to its own ticket.
- `copy_prototype/`, which carries no trademark symbol and is a fixed reference.

## Behavioral scenarios

### SCN-001 — The Dewey page carries no trademark symbol

Given a reader opens /meet-dewey
When the page renders
Then the pillars heading reads "Why teams put Dewey between their data and their agents."
And no text anywhere on the page contains a trademark symbol

### SCN-002 — The homepage carries no trademark symbol

Given a reader opens the homepage
When the practice band's Dewey panel renders
Then its heading reads "Meet Dewey, the knowledge layer that keeps agents out of your systems of record."
And the catalog drawer's label plate reads "Dewey"
And no text anywhere on the homepage contains a trademark symbol

### SCN-003 — The homepage Dewey heading returns to its pre-trademark measure

Given the homepage Dewey panel heading no longer carries the symbol
When the page is viewed at a viewport wide enough for the panel to exceed 1039px
Then the heading sets on one line
And when the viewport narrows below roughly 1215px
Then the heading balances onto two lines

### SCN-004 — Navigation, buttons, and spoken diagram labels are unchanged

Given the site renders
When the header nav, footer nav, every "Meet Dewey" link and button, and the librarian diagram's announced labels are read
Then each has exactly the accessible name it had before this change

### SCN-005 — The symbol cannot return unnoticed

Given a future change reintroduces a trademark symbol beside Dewey
And it is written either as the literal character or as an HTML entity
When the unit suite runs
Then the suite fails and names the file that carries it

## Non-functional requirements

- No accessible name in the header, footer, or Dewey entry-point links changes.
  `Footer.test.jsx` and `dewey-entry-points.test.jsx` assert on them.
- The token gate stays green. No theme or token file is touched.
- No new dependency. The only bundle change is the removed characters.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/dewey-trademark-retired.test.jsx` | N/A — no E2E harness in this repository | Browser pass on /meet-dewey |
| SCN-002 | Unit | `site/src/pages/dewey-trademark-retired.test.jsx` | N/A — no E2E harness in this repository | Browser pass on / |
| SCN-003 | Unit + manual | `site/src/pages/dewey-trademark-retired.test.jsx` | N/A — no E2E harness in this repository | Heading line count at a wide viewport and below 1215px. The suite omits the Tailwind plugin, so jsdom cannot resolve the cap to a width; the test asserts the constant and the browser supplies the line count. |
| SCN-004 | Unit (regression) | `site/src/components/Footer.test.jsx`, `site/src/pages/dewey-entry-points.test.jsx`, `site/src/components/LibrarianDiagram.test.jsx` | N/A — no E2E harness in this repository | — |
| SCN-005 | Unit | `site/src/pages/dewey-trademark-retired.test.jsx` | N/A — no E2E harness in this repository | Guard proven by reintroducing the `&#8482;` entity and confirming the suite failed naming `CatalogDrawer.jsx:153`, then restoring the file byte-identically. |

## Deliberate deviations

- The contract was corrected after design and before implementation. The design
  had been written against a checkout 46 commits behind `origin/main`, and #91
  had already replaced the Meet Dewey hero eyebrow and h1, both of which the
  first version listed as carrying the mark, and had already rewritten the two
  #77 assertions the design planned to invert. Three rendered marks were found,
  not five. Brett approved the correction before any repository write, and the
  ticket records it under "Contract correction".
- The symbol was found in one place the design did not anticipate: a code
  comment at `MeetDewey.jsx:193`. It is corrected rather than deleted, because
  the sentence around it stops being true.

## Open questions

- Whether `LibrarianFlow.jsx` and `StepStrip` should be deleted now that nothing
  renders them. Open since #70.
- Whether anything outside this repository carries the mark (share images,
  `design/` PDFs, external profiles). Not checked.
