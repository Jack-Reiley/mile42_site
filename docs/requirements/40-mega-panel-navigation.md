# #40 — Build the mega panel navigation

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/40
- Pull request: pending
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

What we do and How we work each open a full-width panel under the header carrying
their child pages' own copy, with Agentic AI nested inside the Engineering column
and a navy overview cell closing the row, and the mobile drawer drills into a
section screen rather than expanding in place.

## Scope

- `site/src/components/Header.jsx`: the `NAV` table gains per-section columns, an
  optional nested child, and an overview cell; the bar gains the
  label-plus-caret split; the desktop panel and the mobile drill-down drawer are
  added, with Escape, outside-pointerdown, and route-change closing.
- Label as link, caret as toggle. One control cannot do both: a button loses the
  URL, middle-click, and open-in-new-tab; a bare link leaves the panel
  unreachable from the keyboard.
- The close-on-leave handler on the header rather than on the nav, so the trip
  from a trigger down into the panel never leaves the element.
- Insights removed from the header's nav table and from the footer's columns. Its
  route stays so it can be linked again once it has content.

## Out of scope

- Options A, C, and D from `subnav_preview.html`, which were considered and not
  built.
- Any in-section sub-navigation for moving between siblings once inside a
  section.
- The reading order of the panel column copy, which #43 changes.

## Behavioral scenarios

SCN-001 through SCN-014 are carried from the ticket unchanged.

### SCN-001 — A section opens a full-width panel

Given a visitor on a desktop-width viewport
When they open the What we do menu
Then a panel spans the full width of the header beneath it
And it shows one column per child page, each with its eyebrow, title, and body

### SCN-002 — Agentic AI is presented inside Engineering

Given the What we do panel is open
When the visitor reads the Engineering column
Then Agentic AI appears within that column, visibly subordinate to it
And it carries its own line of copy rather than standing as a bare link

### SCN-003 — The overview cell closes the row

Given either panel is open
When the visitor reaches the end of the row
Then a navy cell offers the section landing page with its own heading, body, and button
And both the heading and the button lead to that section's overview

### SCN-004 — The label navigates and the caret opens

Given a visitor on a desktop-width viewport
When they activate the section label
Then they go to the section overview page
And when they activate the caret beside it
Then the panel opens without navigating away

### SCN-005 — Hover opens the panel only where hover is real

Given a visitor on a device that reports hover
When the pointer enters a section trigger
Then that section's panel opens
And on a device that does not report hover, the same contact opens nothing

### SCN-006 — Moving from the trigger into the panel does not close it

Given a panel is open from hover
When the pointer travels from the trigger down into the panel
Then the panel stays open
And when the pointer leaves the header entirely, the panel closes

### SCN-007 — Escape closes the panel and returns focus

Given a panel is open
When the visitor presses Escape
Then the panel closes
And focus returns to the caret that opened it

### SCN-008 — A press outside the header dismisses the panel

Given a panel is open
When the visitor presses anywhere outside the header
Then the panel closes
And no navigation happens as a result of the dismissal

### SCN-009 — Navigating closes the menu

Given a panel or the mobile drawer is open
When the visitor follows any link inside it
Then the destination page loads
And the menu is closed on arrival rather than still covering the page

### SCN-010 — The panel is reachable and announced without a pointer

Given a visitor using a keyboard or a screen reader
When they reach a section's caret
Then it is announced as a control that expands the panel, and reports whether it is currently expanded
And activating it opens the panel
And every link inside the open panel can be reached and followed

### SCN-011 — Mobile drills into a section rather than expanding in place

Given a visitor on a 375px viewport
When they open the menu and choose a section
Then the drawer replaces the top-level list with that section's screen
And each child shows the same eyebrow, title, and body the desktop panel shows, still legible at that width

### SCN-012 — The way back out is where focus lands

Given the drawer has drilled into a section
When the screen appears
Then focus is on the control that returns to the top-level menu
And activating it returns to the top-level list

### SCN-013 — Insights is not offered anywhere in the chrome

Given any page of the site
When a visitor reads the header and the footer
Then neither offers Insights
And the Insights page itself is still served if its address is requested

### SCN-014 — The current section is marked

Given a visitor is on a page inside a section
When they read the header
Then that section's label is marked as the current one, including when the visitor is on a child page rather than the section overview

## Non-functional requirements

- The panel and the drawer are built from real links and real buttons, keyboard
  reachable, with the existing focus-visible treatment.
- The caret reports its expanded state and identifies the panel it controls.
- The bar, the panel, and the drawer share one horizontal inset so all three
  track the page grid's edge.
- Panel column copy remains legible at 375px in the drawer; the panel itself is
  desktop-only.
- The caret's rotation is the only motion, and it is decorative.
- No new dependency.

## Verification map

This is the largest behavioral surface in the wave, so the manual pass is
itemized per scenario rather than summarized. This repository has no test suite;
`lint`, `typecheck`, and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Both panels captured open at 1240px |
| SCN-002 | Manual | — | N/A | Engineering column showing the nested Agentic AI link and its body |
| SCN-003 | Manual | — | N/A | Overview cell heading, body, and button targets |
| SCN-004 | Manual | — | N/A | Label activated, then the caret, with the resulting URL in each case |
| SCN-005 | Manual | — | N/A | Hover open with a fine pointer, and the same contact with hover emulated away |
| SCN-006 | Manual | — | N/A | Pointer travel from trigger into panel, then out of the header |
| SCN-007 | Manual | — | N/A | Escape pressed; panel closed and focus position read |
| SCN-008 | Manual | — | N/A | Pointerdown outside the header; panel closed, URL unchanged |
| SCN-009 | Manual | — | N/A | A link followed from the panel and from the drawer |
| SCN-010 | Manual | — | N/A | Keyboard pass plus `aria-expanded` and `aria-controls` on each caret |
| SCN-011 | Manual | — | N/A | 375px top-level drawer and a drilled section screen |
| SCN-012 | Manual | — | N/A | Focus position immediately after drilling in |
| SCN-013 | Manual | — | N/A | Header and footer inspected; the Insights address requested |
| SCN-014 | Manual | — | N/A | A child page loaded, with the section label's current marking |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

A touch or emulated coarse-pointer device is required for the negative half of
SCN-005. If only emulation was used, the evidence says so.

## Deliberate deviations

- **The panel's content follows the whole header bar in reading order.** A
  keyboard visitor reaches it after the remaining nav items rather than
  immediately after the caret. This is a consequence of the panel being a
  full-width sibling of the bar, and is called out rather than hidden.
- **The panel's column copy is the section pages' own copy.** That is a
  maintenance commitment as much as a design one, and the `NAV` table says so at
  the top. #41 and #42 rebuild two of the pages the panel quotes; both are in
  this delivery unit, and the panel copy is checked against them at merge.
- **#43 changes the panel columns' reading order after this ticket.** The
  eyebrow/title swap is #43's contract, not this one's. SCN-001 asserts that each
  column carries an eyebrow, a title, and a body, which stays true either way.
- **`subnav_preview.html` is not in the repository.** It is untracked at the
  repository root. Left untracked by developer decision on 2026-08-17, so this
  document cites it by name rather than by commit.
- **`npm run copy:parity` is red across this branch.** It scopes to `<main>`, so
  it does not cover the header at all and neither confirms nor contradicts this
  ticket. Accepted as designed divergence and routed to a follow-up ticket.
- **The commits named in the ticket body do not resolve.** The branch was rebased
  after design, so `87db087` and `07d9360` are now `0575a58` (the panel) and
  `67ea296` (keeping the panel open across the gap and letting the label
  navigate).

## Open questions

- In-section sub-navigation for moving between siblings once inside a section is
  still open and is not part of this ticket.
- Insights is hidden rather than deleted. Restoring it needs its own ticket, and
  until then the site serves a page nothing links to.
