# #33 — Replace the delivery model's role tiles with one interactive handoff card

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/33
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/44
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

The delivery model page shows its seven roles inside one card: the roles listed
on one side, the selected role's handoff beside them as agent output above a
human decision on the brand green, sitting in the same band as the claim the
roles are evidence for.

## Scope

- New `site/src/components/WhereAgentsWork.jsx`, built from the design handoff at
  `design/illustrations/design_handoff_where_agents_work`.
- `site/src/pages/DeliveryModel.jsx`: the seven-`Card` grid replaced by
  `<WhereAgentsWork roles={ROLES} />`, with `ROLES` staying on the page.
- The roles band merged into the argument section above it, and the band fills
  below adjusted so no two adjacent bands share a fill.
- Two documented deviations from the handoff, recorded below and in the
  component.

## Out of scope

- The reuse loop lower on the same page, which is #34.
- The page's compact header and closing band, which are #35's.
- The site content column, which is #36's contract.

## Behavioral scenarios

SCN-001 through SCN-011 are carried from the ticket unchanged.

### SCN-001 — The seven tiles become one card

Given a visitor opens the delivery model page
When they reach the section about where agents work
Then the seven roles are presented inside a single card rather than as seven separate tiles
And the roles are listed on one side with a handoff shown beside them

### SCN-002 — The card opens with a role already selected

Given the page has just loaded
When the visitor first sees the card
Then one role is already selected
And its agent output and its human decision are both shown
And the selected role is Design

### SCN-003 — Selecting a role swaps the handoff

Given a role is selected
When the visitor selects a different role
Then the pane's heading, agent output, and human decision change to that role
And the list does not reorder or resize

### SCN-004 — The human side never empties

Given any role is selected
When the visitor selects the currently selected role again
Then that role stays selected
And the human decision remains on screen
And no state exists in which the card shows agent output without a human decision

### SCN-005 — The selected role is visibly marked

Given the visitor moves through the roles
When a role becomes selected
Then its row takes the yellow fill and the others do not
And under a request for reduced motion the fill changes without a transition

### SCN-006 — Every role is reachable without a pointer

Given a visitor using a keyboard
When they tab through the card
Then each role is reached in reading order with a visible focus ring
And activating one selects it
And each control reports its pressed state

### SCN-007 — The swap is announced

Given a visitor using a screen reader
When a different role is selected
Then the handoff pane's new content is announced without moving focus

### SCN-008 — The role copy is the page's copy

Given the seven roles rendered in the card
When their text is compared with the page's role definitions
Then every role title, agent output, and human decision matches the page's own source, with no rewriting

### SCN-009 — The roles sit with the argument they support

Given the delivery model page
When a visitor scrolls from the claim about agents and accountability to the roles
Then the roles are inside the same band as that claim rather than in a band of their own
And no two adjacent bands on the page share a fill

### SCN-010 — The card holds together on a small phone

Given a 375px viewport
When the visitor opens the section
Then the handoff pane sits below the role list, each running the width of the card
And neither the agent output box nor the human decision box crosses the card's border
And every role row remains tappable

### SCN-011 — Text on the card is readable

Given the card as shipped
When its text is measured against its fills
Then the human decision text and its label are ink on the green rather than an off-white tone
And the list footnote is dark enough to pass AA at its size

## Non-functional requirements

- Contrast: ink on the brand green for the decision box, ink at 70% for the
  footnote, accent numerals only as a numeral rather than as body text.
- Controls are real buttons with a hit area at or above 44px, keyboard
  reachable, using the existing `:focus-visible` treatment.
- The only motion is the 160ms row fill, suppressed under
  `prefers-reduced-motion: reduce`.
- No new dependency, no icon library, no new token.
- Responsive without a media query, verified at 375px, 700px, and 1240px.

## Verification map

This repository has no test suite, so no scenario has automated coverage.
`lint`, `typecheck`, and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and therefore do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Section at 1240px: one card, list beside pane |
| SCN-002 | Manual | — | N/A | Load state shows Design selected with both boxes filled |
| SCN-003 | Manual | — | N/A | Pane heading, output, and decision read after selecting several roles |
| SCN-004 | Manual | — | N/A | Reselecting the current role leaves it selected and the decision on screen |
| SCN-005 | Manual | — | N/A | Row fill on selection, and the same with reduced motion forced |
| SCN-006 | Manual | — | N/A | Keyboard pass plus `aria-pressed` on each control |
| SCN-007 | Manual | — | N/A | Live region and `aria-controls` read from the accessibility tree |
| SCN-008 | Manual | — | N/A | Rendered role text compared against `ROLES` in `DeliveryModel.jsx` |
| SCN-009 | Manual | — | N/A | Band sequence read down the page; no adjacent pair shares a fill |
| SCN-010 | Manual | — | N/A | 375px capture with the pane wrapped inside the card border |
| SCN-011 | Manual | — | N/A | Computed colours for the decision text and the footnote, with ratios |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **Footnote at ink 70% rather than the handoff's ink 50%.** ink/50 on the card
  fill measures about 3.1:1, which fails AA for 14px text; ink/70 measures about
  5.7:1. Recorded in the component.
- **The right pane's floor is `min-width: min(340px, 100%)` rather than the
  handoff's `min-width: 340px`.** Taken literally, the pane is wider than the
  card below roughly a 400px viewport and the two boxes run out through the
  card's right border. Recorded in the component.
- **The design handoff bundle is not in the repository.** It is untracked under
  `design/illustrations/design_handoff_where_agents_work`. Left untracked by
  developer decision on 2026-08-17, so this document cites it by path rather
  than by commit.
- **`npm run copy:parity` is red for this page.**
  `/how-we-work/delivery-model` is one of the nine routes this wave deliberately
  rewrote. Accepted as designed divergence and routed to a follow-up ticket; not
  treated as a pass criterion here.
- **The commit named in the ticket body was corrected once already.** The branch
  was rebased again after design, so `24f1396` is the commit that carries this
  work and still resolves.

## Open questions

- None. Delivery grouping is settled by
  `.delivery/runs/2026-08-17-nav-ia-cleanup/delivery-plan.json`. The handoff
  bundle and the `copy:parity` gate are both settled above.
