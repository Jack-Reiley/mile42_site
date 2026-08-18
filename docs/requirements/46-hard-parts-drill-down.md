# #46 — Turn the four hard parts into an on-page drill-down on the Agentic AI page

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/46
- Pull request: <pending>
- Parent epic: none
- Delivery unit: `unit-46-hard-parts-drill-down`
- Requirement version: 1

## Objective

The four hard parts are the top-level navigation for the Agentic AI page's
detailed content. A technical buyer opens whichever implementation risk they care
about and reads it in full, without leaving the page or losing their scroll
position.

## Scope

- One drill-down section replacing five bands on
  `/what-we-do/engineering/agentic-ai`.
- `HardParts` component: a spine tab list at `lg` and up, four independent
  disclosures below it, one block renderer shared by both.
- Nine panel block kinds: `lead`, `body`, `subhead`, `quote`, `num`, `terms`,
  `checks`, `titled`, `link`.
- `TermList` gains a third `wide` variant for the architecture and platform
  tables.
- Three darkened glyph tones in `design/tokens/theme.css`, written as
  `color-mix` derivations.
- The client's newer verbatim copy for Architecture and integration and for
  Adoption and accountability.
- `We will tell you when the answer is not an agent.` moves to the cream band so
  the alternation holds. Its copy is untouched.
- The repository's first unit test runner, and coverage of the four scenarios the
  build cannot check.

## Out of scope

- The navy page header and hero, the `Agentic systems that operate inside real
  business constraints.` band, and the closing call-to-action band.
- Deep linking. Selection is in-page state only.
- `docs/copy/agentic-ai.md`, which lives in `vthokiebrett/mile42-website`.
- Spot illustrations. This section uses no imagery.
- Any icon library. The checkmark is the text glyph `✓` (U+2713).
- `copy:parity`, which is red on nine of fourteen routes before this ticket
  starts and needs its own ticket.

## Behavioral scenarios

SCN-001 through SCN-013 are carried from the ticket unchanged.

### SCN-001 — The section opens on the first hard part

Given a visitor is on /what-we-do/engineering/agentic-ai at a viewport of 1024px or wider
When the drill-down section comes into view
Then four numbered nodes are shown on one connecting rule under the heading "The distance between an AI pilot and an AI system."
And the first node, "Context and workflow design", is the selected one
And exactly one panel is shown below the nodes
And that panel is headed "Context before solutions."

### SCN-002 — Selecting another node swaps the panel in place

Given the drill-down is showing the first hard part
When the visitor activates the node labelled "Governance and risk"
Then the panel below shows the heading "The controls are part of the build, not a review at the end."
And the content of the other three hard parts is not shown
And the nodes stay where they are
And the page does not scroll, navigate, or change its address

### SCN-003 — Arrow keys move through the spine and select as they go

Given keyboard focus is on the selected node
When the visitor presses the right arrow key
Then focus and selection move together to the next node
And the panel shows that node's hard part
When the visitor presses the right arrow key on the last node
Then focus and selection move to the first node
And pressing the left arrow key on the first node moves them to the last

### SCN-004 — Home and End jump to the first and last hard part

Given keyboard focus is on any node
When the visitor presses Home
Then focus and selection move to "Context and workflow design"
When the visitor presses End
Then focus and selection move to "Adoption and accountability"

### SCN-005 — The panel is named by the hard part it is showing

Given a screen reader is reading the drill-down
When the visitor reaches the four nodes
Then they are announced as a tab list labelled "The four hard parts"
And the selected node is announced as selected and the other three are not
When the visitor moves into the panel
Then the panel is announced as named by the selected node
And the panel's name is not announced twice
And the panel can be reached by the tab key after the node list

### SCN-006 — Below lg the four parts are independent disclosures

Given a visitor is on the page at a viewport narrower than 1024px
When the drill-down section comes into view
Then the four hard parts are shown as four stacked cards, each with its number, title, and one-line summary
And no connecting rule is drawn
And the first card is open and showing its content
And the other three are collapsed
And each card's control reports whether it is expanded

### SCN-007 — Any number of disclosures can be open at once

Given the visitor is below 1024px with only the first hard part open
When the visitor opens "Architecture and integration"
Then both it and "Context and workflow design" are open at the same time
When the visitor closes "Context and workflow design"
Then it collapses and "Architecture and integration" stays open
And all four can be open at once, and all four can be closed

### SCN-008 — The folded bands are gone from the page

Given a visitor is reading the whole page
When they scroll from the hero to the closing call to action
Then the four hard parts' detail appears only inside the drill-down
And there is no separate band headed "Context before solutions."
And there is no separate band headed "The controls are part of the build, not a review at the end."
And there is no separate band headed "Connecting an agent to real systems is most of the work."
And there is no separate band headed "Go-live is the middle of the project, not the end."
And no link on the page jumps to one of those bands

### SCN-009 — Architecture and Adoption carry the client's newer copy

Given the visitor has opened "Architecture and integration"
Then the panel lists Permissions, Latency, Failure modes, Cost control, and Dependency outages as full-width term rows
And it carries the subheading "Multi-model by default." followed by the five platform rows
And it carries no link to a partners page
Given the visitor has opened "Adoption and accountability"
Then the panel lists A named owner, A measure that predates the agent, A route for the people using it, and A review cadence, each with a numbered badge
And it closes on "The measure of the work is what the organization does differently six months after launch."

### SCN-010 — The bands still alternate after the fold

Given a visitor is reading the page
When they pass from the capability listing to the closing call to action
Then the drill-down sits on a white band
And "We will tell you when the answer is not an agent." sits on the cream band directly below it
And no two adjacent bands share a fill
And the text of the "not an agent" band is unchanged

### SCN-011 — Reduced motion removes the dot transition

Given the visitor's system asks for reduced motion
When they select a different hard part
Then the panel content changes with no transition
And the node's raised state changes with no transition

### SCN-012 — Focus is visible on every control

Given the visitor is moving through the page by keyboard
When focus lands on a spine node, on the panel, or on a disclosure header
Then a visible focus indicator is drawn around it
And no part of that indicator is clipped by the element it belongs to

### SCN-013 — The section renders with no browser present

Given the page is rendered to static markup with no window or document
When /what-we-do/engineering/agentic-ai is rendered
Then the render completes without error
And the drill-down's first hard part is present in the output

## Non-functional requirements

- **No browser API during render.** `site/verify/copy-parity.mjs` renders every
  route through `renderToStaticMarkup` with no DOM. No `window`, `document`, or
  `matchMedia` in a render path. This is why the responsive switch is CSS rather
  than a width check.
- **No raw hex in page or component source.** Every colour resolves through a
  theme token or a `color-mix` derivation of one.
- **Semantics are functional, not polish.** Real tab list roles, real
  `aria-expanded` disclosures, real heading levels, real buttons, everything
  keyboard reachable.
- **Contrast.** No new failure is introduced. The 12px accent label on the cream
  panel measures 4.03:1 and is the site's existing designer-owned exception,
  recorded as questions 1 and 2 in `design/tokens/OPEN-QUESTIONS.md`. It is
  inherited, not created, and not silently fixed here.
- **Reduced motion** is honoured on every transition this section adds.
- **The build is the gate.** `npm run build` must pass.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Desktop 1280px screenshot of the default state |
| SCN-002 | Manual | — | N/A | Screenshots of all four panels at 1280px |
| SCN-003 | Unit + manual | `site/src/components/HardParts.test.jsx` | N/A | Arrow keys walked through in a browser |
| SCN-004 | Unit + manual | `site/src/components/HardParts.test.jsx` | N/A | Home and End walked through in a browser |
| SCN-005 | Manual | — | N/A | Roles, names, and selected state read aloud; panel name announced once |
| SCN-006 | Manual | — | N/A | 768px and 375px screenshots |
| SCN-007 | Unit + manual | `site/src/components/HardParts.test.jsx` | N/A | Open and close combinations at 768px |
| SCN-008 | Manual | — | N/A | Full-page pass top to bottom |
| SCN-009 | Manual | — | N/A | Panels 2 and 4 read against the handoff copy |
| SCN-010 | Manual | — | N/A | Full-page pass, band fills compared |
| SCN-011 | Manual | — | N/A | Reduced motion enabled at the OS level |
| SCN-012 | Manual | — | N/A | Tab through the section at 1280px and 768px |
| SCN-013 | Unit | `site/src/components/HardParts.test.jsx` | N/A | `npm run copy:parity` reaches the route without throwing |

E2E is `N/A` throughout: this repository has no E2E harness, and adding one is
not this ticket's scope. The four scenarios that carry automated coverage are the
ones whose behavior a build and a screenshot cannot check. The rest are visual or
assistive-technology observations, which are recorded as manual evidence rather
than asserted mechanically.

Automated tests do not read this document, and nothing here generates a test.

## Deliberate deviations

1. **`Wrap` at the site's 1240px, not the handoff's 1120px.** The
   `measure="detail"` prop was removed by #36 for putting six of sixteen pages on
   a different left edge from the wordmark above them. The spine rule inset
   `calc(25% - 40px)` is derived from column count and gap rather than a fixed
   width, so it holds unchanged.
2. **Both responsive forms are in the DOM, switched by `hidden`/`lg:block`.**
   `role` is markup, so one button set cannot be a tab list at one width and a
   disclosure set at another, and a render-time `matchMedia` would break
   `copy:parity`. `display: none` removes a subtree from the accessibility tree,
   so nothing is announced twice. Cost: the two forms hold separate state, so a
   hard part selected on the spine is not carried across a resize below `lg`.
   Both default to hard part one, so the visitor lands on a defined state.
3. **`CheckList` and `NumList` are not extended.** The panel's markers are
   numerals rather than ticks, which is the distinction `CheckList`'s own doc
   comment turns on, and every value differs. A `marker` prop would fork the
   component rather than extend it.
4. **`lead`, `body`, and `quote` render as plain elements inside the panel.**
   Their measures are 52rem and 44rem against the primitives' 46rem, and two
   `max-w-*` utilities on one element resolve by stylesheet order. Same
   precedent as `StageJourney.jsx:284`.
5. **The `num` and `checks` block labels are accent, not ink.** The reference
   draws them in ink and the handoff asks to unify on accent, which is also the
   convention every other eyebrow on the page follows.
6. **The reference's tenth block kind, `gap`, is not built.** It is a design-time
   copy-slot placeholder.
7. **The base changed after design.** The design named `feature/nav-ia-cleanup`;
   PR #44 merged, so this bases on `main`. Nothing behavioral changed.

## Open questions

1. `copy:parity` is red on nine of fourteen routes and is registered as half the
   `test` gate, so that gate cannot pass. Needs its own ticket.
2. The panel eyebrow is `aria-hidden`, since `aria-labelledby` already names the
   panel. Confirm against a real screen reader during SCN-005 rather than by
   inspection.
