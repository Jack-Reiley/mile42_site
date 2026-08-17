# #43 — Lead the What We Do panel and cards with the practice name

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/43
- Pull request: pending
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

On both the What we do sub-nav panel and the What we do page path cards, the
practice name is the title and the situation line is the eyebrow above it, so the
heading slot carries the service name on both surfaces.

## Scope

- `site/src/components/Header.jsx`: the three `columns` entries under
  `/what-we-do`, and the accessible-name example in the comment above
  `PanelColumn`, which described the old order.
- `site/src/pages/WhatWeDo.jsx`: the three `PATHS` entries, and the comment above
  them, which asserted the old intent.

## Out of scope

- `site/src/pages/Home.jsx` card order.
- The How we work panel columns.
- The `h1` copy on the Advisory, Engineering, and AI products detail pages.
- `copy_prototype/`, which is a fixed reference.
- Any change to the `Eyebrow` or `PathCard` primitives, their type scale, or
  their tone.

## Behavioral scenarios

SCN-001 through SCN-008 are carried from the ticket unchanged.

### SCN-001 — The What we do panel column leads with the practice name

Given a visitor is viewing the site at a desktop width where the panel applies
When they open the What we do panel
Then each of the three columns shows its situation line as the small label above
And each column shows its practice name as the column title
And each column's third line is unchanged

### SCN-002 — The column's label and title remain one link

Given the What we do panel is open
When a visitor reaches a column with assistive technology or the keyboard
Then the situation line and the practice name are announced as a single link
And that link's accessible name reads the situation line first and the practice name second
And the third line is not part of the link's accessible name

### SCN-003 — The Agentic AI child link survives the reorder

Given the What we do panel is open
When a visitor looks at the Engineering column
Then the Agentic AI link is still nested inside that column with its own body line
And it is still a separate link from the column's own link

### SCN-004 — The What we do path cards lead with the practice name

Given a visitor is on the What we do page
When they reach the three path cards
Then each card shows its situation line as the small label above
And each card shows its practice name as the card heading
And the page's three card headings read Advisory, Engineering, and AI products and accelerators
And each card's heading level is unchanged from before this ticket

### SCN-005 — Neighbouring surfaces are untouched

Given this ticket is complete
When a visitor views the Home page cards, the How we work panel columns, and the Advisory, Engineering, and AI products detail page headlines
Then all of them read exactly as they did before this ticket

### SCN-006 — The longest label survives the narrow panel column

Given the What we do panel is open at the narrowest desktop width where it applies
When the third column renders its uppercased situation line
Then the line wraps within the column
And no text is clipped, truncated, or pushed outside the column
And the four cells of the panel row still align on one grid

### SCN-007 — The mobile drawer carries the same order

Given a visitor is at a 375px viewport
When they open the menu and drill into What we do
Then each column shows the situation line above the practice name
And no column's copy is clipped or forces horizontal scrolling

### SCN-008 — The change is contained to the two intended surfaces

Given the rendered copy of every route is compared against the copy prototype
When the comparison runs after this ticket
Then only the What we do route's differences have changed
And every other route reports the same differences it reported before this ticket

## Non-functional requirements

- `npm run build` passes. This is the repository's only real gate.
- `npm run tokens:check` continues to pass, since no token or theme file is
  touched.
- No new dependency, route, component, or prop.
- Heading hierarchy is preserved: the card heading element and level do not
  change, only its text.
- No motion or reduced-motion behavior is touched.
- No layout overflow or horizontal scrolling at 375px or at desktop panel width.

## Verification map

This repository has no test suite, and a two-array copy swap does not justify
introducing one; that belongs to a ticket that asks for it. `lint`, `typecheck`,
and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and therefore do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Desktop capture of the open panel |
| SCN-002 | Manual | — | N/A | Accessibility-tree read of each column link's name |
| SCN-003 | Manual | — | N/A | Same panel capture, plus the child link's own href |
| SCN-004 | Manual | — | N/A | What we do page capture plus the `main` heading outline |
| SCN-005 | Manual | — | N/A | Home, How we work panel, and the three detail headlines unchanged |
| SCN-006 | Manual | — | N/A | Panel at 1024px with measured cell tops, heights, and label wrap |
| SCN-007 | Manual | — | N/A | 375px drawer capture with no horizontal scroll |
| SCN-008 | Manual | — | N/A | `copy:parity` per-route summary diffed before and after |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **This ticket supersedes #37's SCN-008.** #37 put the practice name in the
  eyebrow and the situation in the title. Both cannot hold at once. #43's SCN-004
  is the surviving contract for the card's reading order, and #37's underlying
  intent, that the card leads with the practice it links to, is preserved in the
  stronger slot. Recorded in both documents, and pending developer confirmation.
- **The accessible name becomes "You need clarity: Advisory".** More awkward than
  the previous order, and accepted rather than solved: fixing it properly would
  mean the DOM order and the visual order diverging, which is a bigger change
  than this ticket.
- **`copy:parity` still exits non-zero after this ticket.** SCN-008 asserts
  containment, not a clean run: only the `/what-we-do` route's diff count may
  move. The command is red across this branch by intent.
- **`Eyebrow` uppercases through CSS, not markup.** The DOM text stays sentence
  case and assistive technology receives "You need clarity" rather than shouted
  text. No uppercase strings are hard-coded.

## Open questions

- After the swap, a panel column titled "Advisory" leads to a page whose `h1` is
  "You need clarity." The situation line still appears in the column as the
  eyebrow, so the promise is intact, but the emphasis no longer matches the
  destination page. Whether the detail page heroes should follow is left open and
  would be its own ticket.
- The Home page cards now read in the opposite order to the What we do cards.
  Deliberate per the approved scope decision, and a candidate follow-up.
