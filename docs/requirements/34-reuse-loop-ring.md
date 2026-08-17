# #34 — Draw the reuse loop as a closed ring beside its argument

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/34
- Pull request: pending
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

The delivery model page draws its reuse argument as a hand-drawn closed ring of
five numbered nodes with the selected node's description reading in the middle,
sitting beside the argument it illustrates, with the section's copy tightened
around it.

## Scope

- New `site/src/components/ReuseLoop.jsx`, drawn as a wobbling radius that is
  deterministic across renders, with open chevrons rather than filled arrowheads.
- Radial node placement in `site/src/styles/index.css`, since each offset is an
  angle rather than a utility, with the label offset derived from how much of the
  label lies along that angle.
- Node fills mixed toward ink until white 12px numerals clear 4.5:1. Measured
  5.46, 8.99, 5.64, 15.11, and 7.25 to one.
- Ring at 2px, chevrons at 2.4px, nodes at 58px.
- Loop column fixed at 800px above `xl`, since the ring has a width floor rather
  than a proportion; the argument takes the remainder. Below `xl` the ring keeps
  only its title.
- Items renamed to name what accumulates rather than steps taken, each gaining a
  description.
- Copy tightened: the pricing argument cut from the opener, the pull quote
  promoted to the heading it restated, the two claims swapped so each sits with
  the evidence it introduces, the closing slogan cut, the 46rem cap dropped where
  the band has no column, and the ring's returns-to-01 label dropped.
- The band alternation broken by #33's merge repaired here.
- The `orange` contrast figure in the component comment corrected from 3.2 to
  3.06.

## Out of scope

- The handoff card above it, which is #33.
- The page's compact header and closing band, which are #35's.
- Removing the now-unused `Spine` in `site/src/components/Lists.jsx`.

## Behavioral scenarios

SCN-001 through SCN-019 are carried from the ticket unchanged.

### SCN-001 — The five tiles become a closed ring

Given a visitor opens the delivery model page
When they reach the section about each engagement improving the next
Then the five items are arranged as a closed ring of five numbered nodes rather than as a row of flat tiles
And the ring has no start or end point visible as a gap

### SCN-002 — The ring carries a direction

Given the ring as drawn
When the visitor looks at the arcs between the nodes
Then each arc carries an arrowhead pointing the same way around the ring
And the arrowheads are open marks rather than filled triangles

### SCN-003 — The ring reads as drawn rather than plotted

Given the ring
When it is compared with a geometric circle
Then its radius varies along its length
And its ends overlap rather than meeting exactly
And the same page loaded twice produces the identical ring

### SCN-004 — The ring opens with a node already selected

Given the page has just loaded
When the visitor first sees the ring
Then one node is already selected
And the selected node is `01 Client work`
And its description is already reading

### SCN-005 — Selecting a node reads its description in the middle

Given a node is selected
When the visitor selects a different node
Then that node's title and description replace what the middle of the ring was reading
And the ring, the node positions, and the node colours do not move or reorder

### SCN-006 — The selected node is visibly marked

Given the visitor moves between nodes
When a node becomes selected
Then that node sits down into its own shadow and the others do not
And each node keeps its own fill whether or not it is selected
And under a request for reduced motion the state changes without a transition

### SCN-007 — Every node numeral is legible on its fill

Given the five node fills as shipped
When each is measured against the white numeral it carries
Then every one of the five reaches at least 4.5:1

### SCN-008 — Node labels clear the ring

Given the ring at any width where it is drawn
When the five labels are compared with the ring stroke
Then no label overlaps the ring
And no label floats visibly away from the node it belongs to
And the labels do not overlap each other

### SCN-009 — Every node is reachable without a pointer

Given a visitor using a keyboard
When they tab through the section
Then each node is reached with a visible focus ring
And activating one selects it
And each node reports its pressed state

### SCN-010 — The selection is announced

Given a visitor using a screen reader
When a different node is selected
Then the new description is announced without moving focus

### SCN-011 — The section splits above xl and stacks below

Given a viewport at or above 1280px
When the visitor reaches the section
Then the argument and the ring sit side by side, centred on each other
And the ring's column holds its width while the argument takes the remainder
And below 1280px the two stack with the ring centred under the argument

### SCN-012 — The description follows the room available

Given the ring is drawn
When the viewport is at or above 1280px
Then the selected node's title and description both read inside the ring
And between 700px and 1280px the title reads inside the ring and the description below it
And the description never runs under the lower two nodes

### SCN-013 — The ring is dropped on a phone

Given a 375px viewport
When the visitor reaches the section
Then no ring is drawn
And the five items are a vertical list, each row showing its numeral and its title, separated by rules
And selecting a row shows that item's title and description below the list
And every row remains tappable

### SCN-014 — The items are named as things, not steps

Given the five items
When their titles are read in order
Then they name what accumulates rather than actions taken
And they are `Client work`, `Lessons learned`, `Reusable methods and assets`, `Delivery improvements`, `A stronger starting point`

### SCN-015 — The ring carries no label restating its direction

Given the ring
When it is inspected for text other than the node numerals, the node labels, and the centre copy
Then no label states that the loop returns to the first node

### SCN-016 — The item copy is the page's copy

Given the five items rendered in the ring
When their text is compared with the page's own source list
Then every title and description matches it exactly, with no rewriting

### SCN-017 — The section's copy is tightened

Given the delivery model page
When it is read from the top
Then the opener carries no argument about hours-based pricing
And no pull quote restates the heading directly above it
And the benefits section closes on the cards rather than on a slogan
And each of the two section claims sits with the evidence it introduces

### SCN-018 — Copy under a full-width heading runs to the band

Given a band on this page whose heading runs the full content column
When the copy under that heading is measured
Then it runs to the same measure rather than being held at a narrower column width
And copy inside the argument column beside the ring keeps its own column measure

### SCN-019 — The page's bands alternate

Given the delivery model page after the roles band was merged into the section above it
When a visitor scrolls the whole page
Then no two adjacent bands share a fill
And every section boundary is visible without a rule

## Non-functional requirements

- Contrast: every node numeral at or above 4.5:1 on its own fill; ink on
  `surface` for all label and body text on this band.
- Controls are real buttons, 58px on their shortest axis, keyboard reachable,
  using the existing `:focus-visible` treatment.
- The only motion is the 160ms node press, suppressed under
  `prefers-reduced-motion: reduce`.
- The ring must be deterministic across renders. No `Math.random`, no time
  source.
- No new dependency, no icon library, no new token. Radial placement is the one
  thing utilities cannot express and is the only reason `index.css` is touched.
- Verified at 375px, 700px, 1024px, 1280px, and 1440px.

## Verification map

This repository has no test suite, so no scenario has automated coverage.
`lint`, `typecheck`, and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and therefore do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Ring at 1440px; five nodes, closed path |
| SCN-002 | Manual | — | N/A | Chevron marks on each arc, all pointing one way |
| SCN-003 | Manual | — | N/A | Path `d` attribute compared across two loads |
| SCN-004 | Manual | — | N/A | Load state: node 01 pressed, its description reading |
| SCN-005 | Manual | — | N/A | Centre copy after selecting each node; node geometry unchanged |
| SCN-006 | Manual | — | N/A | Selected and unselected node, and the same with reduced motion |
| SCN-007 | Manual | — | N/A | Computed fills measured against white, all five ratios |
| SCN-008 | Manual | — | N/A | Captures at 700px, 1024px, and 1280px, either side of the label-size switch |
| SCN-009 | Manual | — | N/A | Keyboard pass plus `aria-pressed` on each node |
| SCN-010 | Manual | — | N/A | Live region and the `aria-controls` ancestor target |
| SCN-011 | Manual | — | N/A | Captures at 1024px and 1280px showing stack and split |
| SCN-012 | Manual | — | N/A | Where title and description sit at 700px, 1024px, and 1280px |
| SCN-013 | Manual | — | N/A | 375px list with no ring, plus a row selection |
| SCN-014 | Manual | — | N/A | The five rendered titles read in order |
| SCN-015 | Manual | — | N/A | Ring inspected for any returns-to-01 label |
| SCN-016 | Manual | — | N/A | Rendered item text compared against `REUSE` in `DeliveryModel.jsx` |
| SCN-017 | Manual | — | N/A | Full-page read at 1440px against the copy edits in scope |
| SCN-018 | Manual | — | N/A | Measured widths of copy under a full-width heading and inside the argument column |
| SCN-019 | Manual | — | N/A | Band sequence read down the whole page |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **The commit message for `b6a6436` states the argument column as 336px.** That
  is the figure at one viewport, not the general one. The column is the grid
  remainder and runs between about 328px at the `xl` onset and 384px once the
  1240px column binds. Recorded here rather than corrected in history.
- **The nine commits named in the ticket body do not resolve.** The branch was
  rebased after design. The equivalents are `2848f09`, `1d85120`, `8593137`,
  `8c3a3b0`, `8e428dd`, `8223196`, `96f7993`, `b6a6436`, and `fd983da`.
- **`Spine` in `site/src/components/Lists.jsx` is left in place with no caller.**
  Removing it is out of scope here per the ticket, and belongs to its own ticket.
- **`npm run copy:parity` is red for this page.**
  `/how-we-work/delivery-model` is one of the nine routes this wave deliberately
  rewrote. Accepted as designed divergence and routed to a follow-up ticket; not
  treated as a pass criterion here.

## Open questions

- The ring is `EXTRAPOLATED`: there is no comp for this page and no
  numbered-node treatment in the style guide. Whether it is recorded in
  `site/EXTRAPOLATIONS.md` alongside the other extrapolated patterns is still
  open, and is carried forward from the ticket rather than settled here.
