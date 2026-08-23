# #63 — Restructure the homepage: lead with core practice and merge the two engagement bands

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/63
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/65
- Parent epic: none
- Delivery unit: `unit-63-homepage-restructure`
- Requirement version: 1

## Objective

A reader meets what Mile42 does before being asked to choose how to engage, and
the offer reads as one band rather than two competing ones.

## Scope

- Core practice band, with the Dewey panel #60 nested inside it, moved to the
  first position under the hero and changed from `surface` to the `page` band
- Engagement principles merged into the offerings band behind a hairline rule,
  in the existing `LabelBody` two-column shape, their H2 demoted to an h3
- `leave` field removed from `OFFERINGS`, each value folded into that column's
  description, and the "You leave with:" label markup deleted
- Offerings card subgrid reduced from five explicit rows to four
- "Larger firms can say this" pull-quote deleted, retiring the page's last
  `Quote` usage
- Laptop spot anchor and the body-to-button gap re-derived against the shorter
  card
- #60's SCN-001 amended in its test and its requirements document

## Out of scope

- Any page other than the homepage
- The hero band and the closing call-to-action band
- The header, the footer, and the nav
- The content of the Dewey panel, the catalog drawer, and the practice columns.
  They move; they do not change
- Copy on the principles, and on the offerings kickers, headings, and link labels
- `StageJourney.jsx`, which carries its own unrelated "You leave with" block on
  the Client Journey page

## Behavioral scenarios

### SCN-001 — The core practice band leads the page

Given a reader arrives on the homepage
When they scroll past the hero
Then the core practice band is the next band presented
And the Dewey block is presented within that same band
And the three ways to work with us are presented after it

### SCN-002 — The offer and its terms are one band

Given a reader is on the homepage
When they reach the band headed "Three ways organizations work with us"
Then the three offering columns are presented within it
And the engagement principles are presented within the same band, below the columns
And that band presents exactly one second-level heading

### SCN-003 — Each column's value is part of its description

Given a reader is reading an offering column
When they read its description
Then the value that column delivers is stated as part of that description
And no "You leave with" label is presented anywhere on the page

### SCN-004 — The pull-quote is gone

Given a reader is on the homepage
When they read the engagement principles
Then no quotation about larger firms' economics is presented

### SCN-005 — The spot illustrations hold their positions on a wide viewport

Given a reader is on the homepage at a viewport of 1280px or wider
When the offerings card is presented
Then the lightbulb breaks the card's top edge and stays within its own column
And the laptop crosses its column divider and stays within the card
And the handshake breaks the card's right edge
And no illustration overlaps body copy or a button

### SCN-006 — The card holds together as the viewport narrows

Given a reader is on the homepage
When the viewport is 1120px, 768px, or 375px wide
Then every spot illustration is presented clear of the copy
And the page does not scroll horizontally

### SCN-007 — The offering columns stay aligned

Given a reader is viewing the offerings card at 1024px or wider
When the three columns are presented side by side
Then each column's description ends on the same line as the others
And each column's button begins at the same height as the others

### SCN-008 — The Dewey block reads correctly in its new position

Given a reader is on the homepage
When they reach the Dewey block
Then it is presented inside the band that carries the practice argument
And that band is the first band under the hero
And the block still names Dewey, states what it does, shows its supporting
points, and leads to the Meet Dewey page

### SCN-009 — The moved and merged content honours reduced motion

Given a reader has asked their system for reduced motion
When they open the homepage
Then the core practice band and the engagement principles are presented in their
resting position without animating

### SCN-010 — The offering links still resolve

Given a reader is on the homepage
When they activate an offering column's button
Then they arrive at that column's page, carrying the site's base path

## Non-functional requirements

- No horizontal overflow at 1440, 1280, 1120, 768, or 375
- Heading outline unbroken: one h1, one h2 per band, no level skipped
- Offering buttons and the Dewey button keep real link semantics and stay
  keyboard reachable
- No new dependency, no new component, no change to generated illustration data
- `npm run build`, `npm run test:unit`, and `npm run tokens:check` pass

## Verification map

No E2E layer exists in this repository, so the E2E column is N/A throughout
rather than naming a spec that does not exist.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/homepage-restructure.test.jsx` | N/A | Band order confirmed in browser: hero 93, practice 712, three ways 2368, CTA 3580 at 1440 |
| SCN-002 | Unit | `site/src/pages/homepage-restructure.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/pages/homepage-restructure.test.jsx` | N/A | — |
| SCN-004 | Unit | `site/src/pages/homepage-restructure.test.jsx` | N/A | — |
| SCN-005 | Manual | — | N/A | Measured at 1280 and 1440; see the table below |
| SCN-006 | Manual | — | N/A | `scrollWidth === clientWidth` at 1120, 768, 375; spots inside the card at 375 |
| SCN-007 | Manual | — | N/A | Description bottom and button top identical across all three columns: 270/410 at 1440, 345/485 at 1280, 371/407 at 1120 |
| SCN-008 | Unit | `site/src/pages/dewey-entry-points.test.jsx`, `site/src/pages/homepage-restructure.test.jsx` | N/A | — |
| SCN-009 | Manual | — | N/A | The reduced-motion block in `site/src/styles/index.css` targets `.m42-in` and `.m42-in-group > *`; both moved blocks are direct children of a `Wrap`, which carries `m42-in-group`. Rendered under exactly that rule, both sit at resting position |
| SCN-010 | Unit | `site/src/pages/homepage-restructure.test.jsx` | N/A | — |

### SCN-005 measured evidence

| Relationship | #15 target | 1280 | 1440 |
| --- | --- | --- | --- |
| Lightbulb above card top | 37px | 37 | 37 |
| Lightbulb inside its column's right edge | 35px | 35 | 35 |
| Laptop past its column divider | 25px | 25 | 25 |
| Handshake past the card's right edge | 24px | 23 | 23 |
| Laptop clearance below the body copy | > 0 | 9 | 9 |
| Laptop clearance above the button | > 0 | 13 | 13 |

Card measures 1184 x 578 at 1280 and 1240 x 503 at 1440, against the comp's 555.

Measured on a settled render. Before Figtree loads, the fallback font's wider
metrics wrap each column heading onto two lines and add 32px above the body row,
which inflates every vertical number on this page. An earlier pass recorded
535px at 1440 and 561px at 1280 from exactly that transient. Anyone re-measuring
this card must wait for the webfont, or they will reproduce the wrong numbers.

## Deliberate deviations

- **The core practice band moved from `surface` to `page`.** Not a styling
  preference. The offerings card below it is white and the comp draws that card
  on surface; leaving the practice band cream would put two cream bands in
  sequence and they would read as one. The Dewey panel keeps its `tint` fill and
  separates from white as clearly as it did from cream.

- **The body-to-button gap widened from 96px to 128px at `xl`, and the laptop's
  bottom anchor moved from 184px to 105px.** Removing the "You leave with" row
  shortened the card, which put the laptop on top of the body copy: the same
  collision #15's second deviation fixed. Widening the gap and re-centring the
  spot in it restores the clearance, measured at 9px below the body and 13px
  above the button at both 1280 and 1440. Below `xl` nothing changes; the spots
  already sit clear above the card there.

  This makes the card shorter overall, not closer to the comp. Measured settled
  at 1440, the card goes from 528px on the parent branch to 503px here, against
  the comp's 555px, so the change moves it 25px further away. That is accepted:
  the row it lost carried real content, and the gap is sized by what the laptop
  spot needs rather than by a target height. An earlier version of this document
  claimed the card reached 535px and was therefore closer to the comp. Both
  halves of that were wrong, and verification caught it.

- **#60's SCN-001 was amended.** It pinned the Dewey block to "the band
  immediately before the closing call to action", which described where the
  practice band sat when #60 was written. Moving that band contradicts it, so the
  scenario now pins the block to the practice band and that band to its position
  under the hero, in `site/src/pages/dewey-entry-points.test.jsx` and
  `docs/requirements/60-dewey-entry-points.md`. The block's relationship to the
  practice argument is unchanged. Recorded here because it edits an in-review
  PR's acceptance contract.

- **`docs/requirements/15-spot-placement.md` was left as written.** Its vertical
  numbers are now stale, but it is the historical record of what #15 shipped
  rather than a live contract. The new anchors are recorded above instead.

  For anyone reading the two side by side: #15's recorded 560px card is the same
  pre-webfont transient described above. The card it shipped measured 528px
  settled. That is #15's record to correct, not this ticket's.

## Open questions

None blocking.

One accepted consequence is on the record rather than treated as a defect later:
with the Dewey panel inside the band that now leads, "Three ways organizations
work with us" begins roughly 2,275px down the page at 1440px. The practice band
is 1656px tall and Dewey's panel is 966px of it. Confirmed as intended.
