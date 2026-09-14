# #121 — Add two auditor-facing sentences and correct two labels the site overstates

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/121
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/124
- Parent epic: none
- Delivery unit: U1 (independent, `feature/121-auditor-facing-copy` from `main`), run `2026-09-14-auditor-copy-and-controls-page`
- Requirement version: 1

## Objective

The person who has to explain controls to an external auditor sees the word
"auditor" and the idea of a record that can be produced where the site already
argues governance, and two labels that said more than the product or the page
supports now say exactly what is true: the delivery role pane's second box is a
named person's decision, and human-gated writeback is a setting the client
turns on.

## Supersedes

This document supersedes one line of SCN-006 in
`docs/requirements/116-copy-rules.md`: "And the delivery role pane labels its
second box 'Engineer's decision'". The box is labelled "Named person's
decision" from this ticket on. 116 is a versioned record of what was true when
#116 shipped and is deliberately not edited, following the convention of 103.
Every other clause of 116 SCN-006 still holds, including the h2 "Where agents
work, and what stays with the engineer who owns it.", which this ticket leaves
alone.

## Scope

Four strings and the two test assertions that pinned the old ones.

- `site/src/pages/Home.jsx`: the second `DIFFERENTIATORS` body gains the
  closing sentence "When an auditor asks how an agent reached an answer, there
  is a record."
- `site/src/pages/MeetVickee.jsx`: the pillar "Agents never touch the system
  of record" gains a fourth `proof` line, "Every answer cites its sources, so a
  control can be evidenced rather than asserted"
- `site/src/components/WhereAgentsWork.jsx`: the second box's eyebrow reads
  "Named person&#8217;s decision".
- `site/src/components/VickeePillars.jsx`: the `note` reads "One platform.
  Every pillar is in the product today. Human-gated writeback is a setting your
  team turns on."
- `site/src/pages/copy-rules.test.jsx:240` expects the new eyebrow;
  `site/src/components/SelectorPanel.test.jsx:104` matches the new note.

## Out of scope

- The delivery-model h2 "Where agents work, and what stays with the engineer
  who owns it." and the copy-rules test title "names the engineer who owns the
  work".
- The writeback pillar's own body and proof line, which already say gating is
  by human review; the footnote carries the qualification for the group.
- `AgenticAi.jsx`, whose lead opens on a similar sentence.
- The controls page (#122), which builds on this branch.
- Any layout, component, route, token, or data change.

## Behavioral scenarios

### SCN-001 — The home differentiator names the auditor

Given a reader is on /
When they read the body under "Security will not let agents touch our systems of record."
Then it ends with the sentence "When an auditor asks how an agent reached an answer, there is a record."
And the sentence before it still reads "That holds for a CDP or a commerce platform as much as for an ERP."
And the differentiator's link still reads "How Vickee answers security"

### SCN-002 — The buffer pillar evidences its control

Given a reader is on /meet-vickee
When they select the pillar "Agents never touch the system of record"
Then the "Where it lives in the product" box lists exactly four proof lines
And the fourth reads "Every answer cites its sources, so a control can be evidenced rather than asserted"
And the first three are unchanged
And every other pillar still lists exactly three proof lines

### SCN-003 — The delivery-role pane names a person, not a role

Given a reader is on /how-we-work/delivery-model
When they select each of the seven roles in turn
Then the right-hand box is labelled "Named person's decision" every time
And the handoff between the boxes still reads "Goes to the accountable person"
And "Engineer's decision" appears nowhere on the rendered site

### SCN-004 — The pillars note states the writeback setting

Given a reader is on /meet-vickee
When they read the footnote under the seven pillar titles
Then it reads "One platform. Every pillar is in the product today. Human-gated writeback is a setting your team turns on."
And "live in the product today" appears nowhere on the rendered site

### SCN-005 — The new copy follows the written rules

Given the four changed strings
When they are inspected
Then none contains an em dash
And no other copy on the four affected surfaces has changed

### SCN-006 — The changed panes still read and announce correctly

Given a reader is on /meet-vickee with a screen reader
When they select the pillar "Agents never touch the system of record"
Then the pane is announced as before, and the four proof lines are exposed as items of one list
And at 375px and 1280px the pane and the footnote show no horizontal overflow

## Non-functional requirements

- Accessibility: proof lines remain `li` in one `ul`; the pane keeps
  `aria-live="polite"`; the eyebrow stays plain text inside the box, not a
  heading.
- Layout: no horizontal overflow at 375px on /, /meet-vickee, or
  /how-we-work/delivery-model.
- No em dash in the new copy.
- `npm run test:unit`, `npm run tokens:check`, and `npm run build` pass.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit (jsdom) | `site/src/pages/homepage-restructure.test.jsx` ("ends the security body on the auditor and the record") | N/A, no E2E harness | Browser pass at 800px and 375px, body ends on the sentence, no overflow |
| SCN-002 | Unit (jsdom) | `site/src/pages/MeetVickee.test.jsx` ("the buffer pillar evidences its control": four lines in order, six pillars at three) | N/A | Browser pass, pane lists the four lines |
| SCN-003 | Unit (jsdom), every screen state | `site/src/pages/copy-rules.test.jsx` (SCN-006 eyebrow pin; "#121" sweep: old label absent on all 13 routes, new label present for every role, handoff label present) | N/A | Browser pass, all seven roles show the label |
| SCN-004 | Unit (jsdom), every screen state | `site/src/components/SelectorPanel.test.jsx` (note text); `site/src/pages/copy-rules.test.jsx` ("#121" sweep: old note absent on all routes, new note present on /meet-vickee) | N/A | Browser pass, footnote wraps to four lines at 375px without overflow |
| SCN-005 | Unit (jsdom) + review | `site/src/pages/copy-rules.test.jsx` SCN-012 (no em dash in rendered copy, every route and state) | N/A | Diff review: the four added or changed lines contain no U+2014; no other string in the four files changed |
| SCN-006 | Manual | Structure asserted by SCN-002's `getAllByRole('listitem')` inside `[aria-live="polite"]` | N/A | Browser pass at 375px and 800px, plus a 1280px measurement: `scrollWidth <= clientWidth` on the document, the pane, and the footnote; the pane keeps `aria-live="polite"` and one `ul` of four `li` |

jsdom has no layout, so the overflow clauses of SCN-006 are manual by design.
No E2E suite exists and none is added.

## Deliberate deviations

- The fourth proof line drops the full stop the ticket and design gave it, so
  it matches the three lines above it. Brett's call at localhost review on
  14 September 2026; SCN-002's wording in the ticket carries the period, this
  contract does not.
- Screenshots were taken in the browser pass but are not attached to the PR;
  the measurements above are recorded instead.

## Open questions

- Whether the delivery-model h2 should follow the label to "named person".
  Left as is; a one-line follow-up if wanted.
- Whether the writeback pillar's own body should also state that gating is a
  setting. The footnote carries it for the group.
