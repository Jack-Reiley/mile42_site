# #32 — Give the client journey page the detail header and open its stages on hover

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/32
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/44
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

The client journey page opens on the same compact header the What We Do detail
pages draw, filled with its own topic colour, and its stage card opens a stage on
hover and grows the detail out of the row rather than showing it beneath.

## Scope

- Compact header on the client journey page, using the shared panel fill.
- `PANEL_FILL` extracted from `primitives.jsx` so the topic panel on How We Work
  and the header on the page it leads to cannot drift apart.
- `Breadcrumb` gains an ink tone, since sky on a light band measures about 1.4:1.
- Hover-to-open and click-to-pin on the stage card; the hint strip removed.
- The three entry points linked to `/what-we-do/advisory`,
  `/what-we-do/engineering`, and `/what-we-do/ai-products`.

## Out of scope

- The delivery model and engagement model pages, which take the same header
  under #35.
- Any change to the four stages' copy.
- The client journey page's closing band, which moves to gold under #35 as a
  section-wide decision.
- The site content column, which is #36's contract.

## Behavioral scenarios

SCN-001 through SCN-014 are carried from the ticket unchanged.

### SCN-001 — The client journey page opens on the compact detail header

Given a visitor opens the client journey page
When the page loads
Then the page opens on the short header the What We Do detail pages use rather than a full-height hero
And the header band carries the same fill as the client journey panel on How We Work
And the page's first-level heading reads "Four stages. Four stronger positions to be in."

### SCN-002 — The breadcrumb replaces the eyebrow and reads in ink

Given the client journey header
When a visitor reads the line above the heading
Then a breadcrumb reads "How we work" then "Client journey" in the ink tone
And "How we work" navigates to the How We Work page
And "Client journey" is marked as the current page

### SCN-003 — The removed hero's lead paragraph survives

Given the full-height hero has been replaced
When a visitor reads the first content section
Then the paragraph the hero carried appears there, above the stage card

### SCN-004 — The card ends at the stage row on load

Given a visitor loads the client journey page
When no stage has been opened
Then the card shows the four stages on one row and nothing beneath them
And no hint strip explaining the interaction is present

### SCN-005 — Hovering a stage previews it on a mouse

Given a visitor on a device that reports hover and a fine pointer
When the pointer enters a stage
Then that stage's detail opens inside the same card
And that stage's numeral badge takes the pressed state
And that stage's fill runs from the journey line down to the rule above the detail

### SCN-006 — Clicking pins a stage so it survives the pointer leaving

Given a stage is previewed on hover
When the visitor clicks it
And the pointer then leaves the card
Then that stage stays open

### SCN-007 — A preview outranks the pin, and the pin comes back

Given one stage is pinned
When the pointer hovers a different stage
Then the hovered stage is shown
And when the pointer leaves the card, the pinned stage is shown again

### SCN-008 — Clicking the open stage closes it

Given a stage is pinned and the pointer is on it
When the visitor clicks it again
Then the card returns to the stage row with no detail shown

### SCN-009 — A touch device keeps click only

Given a visitor on a device that does not report hover and a fine pointer
When the visitor taps a stage
Then the stage opens on the tap
And no preview opens ahead of the tap

### SCN-010 — The detail grows out of the row rather than appearing under it

Given a stage is opened from the closed state
When the detail appears
Then it expands from no height inside the same card, beneath a rule drawn edge to edge across the card
And the "You leave with" items arrive in sequence

### SCN-011 — Stacked, the detail sits under the stage that was opened

Given a viewport narrow enough that the four stages stack
When a visitor opens a stage other than the last
Then that stage's detail appears directly beneath it rather than after all four stages

### SCN-012 — Reduced motion removes the animation, not the behavior

Given a visitor whose system requests reduced motion
When a stage is opened
Then the detail, its rule, and its items appear without the drop, draw, or stagger
And the same stage content is reachable

### SCN-013 — Every stage is reachable and announced without a pointer

Given a visitor using a keyboard or a screen reader
When they move through the stage row
Then each stage is a button reached in reading order with a visible focus ring
And activating one opens its detail
And the button's expanded state reflects whether its detail is open, and points at the detail region

### SCN-014 — Each entry point links to the practice that covers it

Given the section explaining where a visitor can enter the journey
When the visitor reads the three entry points
Then Advisory links to the Advisory page
And Engineering links to the Engineering page
And AI-driven products and accelerators links to the AI-driven Products page

## Non-functional requirements

- Breadcrumb, heading, and body text on the header fill meet AA at their sizes;
  sky is not used on a light band.
- Stage controls are real buttons, keyboard reachable in DOM order, with the
  existing `:focus-visible` treatment.
- All motion added here is suppressed under `prefers-reduced-motion: reduce`.
- The page keeps the site's single 1240px content column.
- No new dependency, no new route, no change to the four stages' copy.

## Verification map

This repository has no test suite, so no scenario has automated coverage. The
`commands` block in `.agents/software-delivery.config.json` configures `lint`,
`typecheck`, and `coverage` as empty strings, so those gates do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Page top at 1240px; header band fill compared against the How We Work panel |
| SCN-002 | Manual | — | N/A | Breadcrumb tone, link target, and `aria-current` read from the accessibility tree |
| SCN-003 | Manual | — | N/A | First content section shows the relocated lead above the card |
| SCN-004 | Manual | — | N/A | Load state at 1240px: four stages, nothing beneath, no hint strip |
| SCN-005 | Manual | — | N/A | Pointer enter with hover and fine pointer emulated |
| SCN-006 | Manual | — | N/A | Click then pointer leave; stage stays open |
| SCN-007 | Manual | — | N/A | Hover a second stage while one is pinned, then leave the card |
| SCN-008 | Manual | — | N/A | Second click on the pinned stage returns the card to the row |
| SCN-009 | Manual | — | N/A | Coarse-pointer emulation below 700px; tap only |
| SCN-010 | Manual | — | N/A | Open from closed with motion on; detail grows from zero height |
| SCN-011 | Manual | — | N/A | Stacked width, stage 02 opened; detail sits under stage 02 |
| SCN-012 | Manual | — | N/A | Same open with `prefers-reduced-motion: reduce` forced |
| SCN-013 | Manual | — | N/A | Keyboard pass plus `aria-expanded` and `aria-controls` inspection |
| SCN-014 | Manual | — | N/A | Each of the three entry-point links resolved to its destination |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **`npm run copy:parity` is red for this page.** `/how-we-work/client-journey`
  is one of the nine routes this wave deliberately rewrote, so the configured
  `test` gate fails on it. Accepted as designed divergence by developer decision
  on 2026-08-17, and routed to its own follow-up ticket rather than resolved
  here. The gate is not treated as a pass criterion for this ticket.
- **The commits named in the ticket body do not resolve.** The branch was rebased
  after design, so `3e2021c`, `f81091f`, and `11b0cd5` are now `7a05045` (compact
  header), `1c1c4a6` (hover open, dropped out of the row), and `e1e962c` (entry
  points linked).

## Open questions

- None. Delivery grouping was the ticket's open question and is settled by
  `.delivery/runs/2026-08-17-nav-ia-cleanup/delivery-plan.json`: one
  shared-branch unit, `unit-nav-ia-cleanup`. The `copy:parity` question is
  routed to a follow-up ticket.
