# #42 — Give Why Mile42 its own identity and the diverging execution diagram

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/42
- Pull request: pending
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

The Why Mile42 page draws its argument rather than listing it: one platform node
above four stages of execution on a widening funnel and two results at the bottom,
on a forest band the page owns, with the doctrine read second and five sections
none of which exists only to introduce the next.

## Scope

- New `site/src/components/ExecutionContrast.jsx`, taking the page's stages and
  result as props the way `WhereAgentsWork` takes its roles.
- `site/src/components/primitives.jsx`: `forest` added to the band map. The page
  opens and closes on it, both bands taking the on-dark tones, since ink reaches
  only 1.77:1 on forest.
- `site/src/pages/WhyMile42.jsx`: section order changed to hero, doctrine,
  engagements, contrast, principles, closing call to action; commitments
  restructured to a side rule per commitment; principles rendered as ruled rows;
  the two engagement lists read across with their closing lines pushed to a
  shared baseline; three pull quotes removed with the sections around them; the
  dead proof link removed.

## Out of scope

- The rest of the page's copy, which is carried over unchanged.

## Behavioral scenarios

SCN-001 through SCN-012 are carried from the ticket unchanged.

### SCN-001 — The contrast is drawn rather than listed

Given a visitor reaches the section arguing that the same technology produces different outcomes
When they look below its copy
Then one platform is shown at the top, four stages of execution beneath it, and two results at the bottom
And the two contrast cards that used to state this are gone

### SCN-002 — The two readings diverge down the diagram

Given the diagram on a desktop-width viewport
When a visitor follows it from the platform down to the results
Then the gap between the two readings widens at each stage

### SCN-003 — The diagram simplifies on a phone

Given a viewport below the diagram's breakpoint
When a visitor reaches the diagram
Then it reads as a plain two-column comparison with each stage's name above its pair
And no text is squeezed into a column too narrow to read

### SCN-004 — The diagram is readable in sequence

Given a visitor using a screen reader
When they move through the diagram
Then each row is announced with its stage name before its two readings
And no purely decorative rule or connector is announced

### SCN-005 — The page opens and closes on its own band

Given a visitor opens the page
When it loads
Then the hero sits on forest with an off-white heading and a sky eyebrow
And the closing call to action sits on the same forest
And no band on the page uses the brand green the homepage hero uses

### SCN-006 — The doctrine reads second

Given a visitor reads down from the hero
When they reach the first section after it
Then it is the doctrine
And the sections that argue from those commitments follow it rather than precede it

### SCN-007 — Five sections, none of them merely introductory

Given the page
When its sections are listed in order
Then there are five: hero, doctrine, engagements, contrast, principles, and the closing call to action
And no section exists only to set up the one after it

### SCN-008 — Each commitment carries its own mark

Given the four commitments
When a visitor reads them
Then each carries a rule down its side in its own colour
And no separate label column repeats the word the statement already ends on
And a longer commitment is marked as heavily as a shorter one

### SCN-009 — Five principles read as ruled rows

Given the principles section
When a visitor reads it
Then five principles are presented as ruled rows rather than as cards
And each body runs to the page's reading measure rather than the full row width
And the principle about each engagement improving the next is one of the five

### SCN-010 — The two engagement lists read across

Given the section about how engagements are built
When a visitor compares its two columns
Then the two lists read across as a contrast
And their closing lines sit on one baseline even though the columns differ in height

### SCN-011 — The muted tones are readable

Given the diagram's stage names, its weak column, and its strong result
When they are measured against the band behind them
Then each is dark or saturated enough to be read as text at its size, rather than taking the handoff's lighter values

### SCN-012 — Nothing on the page links to a removed page

Given the page
When its links are inspected
Then none of them points at the removed proof page

## Non-functional requirements

- Every text tone on forest and on the surface band meets AA at its size.
- The diagram carries no interaction, no state, and no measurement, so there is
  nothing to make keyboard reachable inside it.
- The diagram's layout holds from 375px upward.
- No new dependency.

## Verification map

This repository has no test suite, so no scenario has automated coverage.
`lint`, `typecheck`, and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and therefore do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Diagram captured at 1240px; no contrast cards remain |
| SCN-002 | Manual | — | N/A | Measured side-column widths row by row down the funnel |
| SCN-003 | Manual | — | N/A | Diagram captured at 375px as a two-column comparison |
| SCN-004 | Manual | — | N/A | Reading order of one row read from the accessibility tree |
| SCN-005 | Manual | — | N/A | Hero and closing band fills; no `brand` band on the page |
| SCN-006 | Manual | — | N/A | Section order read from the top of the page |
| SCN-007 | Manual | — | N/A | The five sections listed in order |
| SCN-008 | Manual | — | N/A | The four commitments captured with their side rules |
| SCN-009 | Manual | — | N/A | Principles captured as ruled rows; the fifth present; body measure checked |
| SCN-010 | Manual | — | N/A | Measured baseline of both closing lines |
| SCN-011 | Manual | — | N/A | Computed colours and ratios for stage names, weak column, and strong result |
| SCN-012 | Manual | — | N/A | The page's links inspected for the removed proof path |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **Stage names and the weak column run at ink 70%, not the handoff's ink 50%.**
  50% measures about 3.1:1 on the surface band; 70% is the site's muted tone and
  reaches about 5.7:1.
- **The strong result chip is forest, not the handoff's brand green.** Brand
  green measures about 2.6:1 on the surface band.
- **This ticket carries #38's SCN-003 across the finish line.** #38 removes the
  proof page and its three other inbound links but does not reach this page's.
  #38's contract asserts that no route links to either removed path, which is
  only true once this ticket has also landed. Both are in `unit-nav-ia-cleanup`
  and this ticket's commits precede #38's on the branch, so the ordering is a
  decision rather than an accident. If the two are ever split, #38 must merge
  after this one.
- **The handoff and its standalone reference file are not in the repository.**
  Both are untracked under `design/illustrations`. Left untracked by developer
  decision on 2026-08-17, so this document cites them by path.
- **`npm run copy:parity` is red for `/why-mile42`.** The page's structure and
  copy have deliberately moved past the prototype's. Accepted as designed
  divergence and routed to a follow-up ticket; not treated as a pass criterion
  here.
- **The commits named in the ticket body do not resolve.** The branch was rebased
  after design, so `d177624` and `f75d424` are now `4eb5902` (the diverging
  diagram) and `4ed7a40` (forest band and the reorder).

## Open questions

- None. The ordering relationship with #38 is settled by the delivery plan, and
  the untracked attachments are settled above.
