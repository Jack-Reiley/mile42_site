# #35 — Give the How We Work section one header, one band rhythm, and clickable panels

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/35
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/44
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

The How We Work section agrees with itself: all three child pages open on the
same compact header in their own topic colour, all three close on gold, every
topic panel on the landing page is clickable across its whole area, and the
engagement model page no longer carries the pricing band.

## Scope

- Compact header on the delivery model and engagement model pages.
- One band per topic colour in `primitives.jsx`, with `PANEL_FILL_HOVER` added
  beside `PANEL_FILL`, so a topic panel and the page it leads to cannot drift
  into two different colours.
- Topic links stretched over their panels on `HowWeWork.jsx`, with a deeper fill
  on hover.
- Closing band moved to gold on all three child pages. The client journey's grain
  goes with the green, since multiplied over gold it dulls the fill.
- Pricing band and the larger-firms quote removed from the engagement model page;
  the second remaining section moved to surface.
- The three pages moved onto the band rhythm the What We Do detail pages run.

## Out of scope

- The client journey page's own header, which is #32's. Its closing band belongs
  here, because the move to gold is a section-wide decision made across all three
  child pages at once.
- The delivery model's handoff card (#33) and reuse ring (#34).
- **The site content column.** The ticket's scope mentions moving these pages
  onto the detail pages' column as well as their band rhythm. The column is
  #36's contract and is asserted there, so this document covers the band rhythm
  only. Two tickets asserting one behavior would mean two verifications that can
  disagree.

## Behavioral scenarios

SCN-001 through SCN-013 are carried from the ticket unchanged.

### SCN-001 — The delivery model page opens on the compact header

Given a visitor opens the delivery model page
When it loads
Then it opens on the same short header its sibling client journey page uses rather than a full-height hero
And the header carries the delivery model's own topic colour

### SCN-002 — The engagement model page opens on the compact header

Given a visitor opens the engagement model page
When it loads
Then it opens on the same short header
And the header carries the engagement model's own topic colour

### SCN-003 — A topic's panel and its page's header are the same colour

Given the three topic panels on the How We Work landing page
When a visitor follows one to its page
Then the page's header is filled with the same colour as the panel they came from
And this holds for all three topics

### SCN-004 — The breadcrumb replaces the eyebrow on both pages

Given either page's header
When a visitor reads the line above the heading
Then a breadcrumb reads "How we work" then the page's own name, in ink
And "How we work" navigates to the section landing page
And the page's own name is marked as current

### SCN-005 — Each removed hero's lead survives

Given the full-height hero has been replaced on both pages
When a visitor reads the first content section of each
Then the paragraph that hero carried is present there

### SCN-006 — All three child pages close on gold

Given each of the three How We Work child pages
When a visitor reaches the closing call to action
Then it sits on the same gold the section landing page closes on
And no child page closes on the brand green

### SCN-007 — The grain leaves with the green band

Given the client journey page's closing band
When a visitor looks at its fill
Then it is an even gold with no grain texture over it
And it reads as the same yellow as the section's other gold bands

### SCN-008 — A whole topic panel is the click target

Given a visitor on the How We Work landing page
When they click anywhere within a topic panel
Then they go to that topic's page
And this holds for all three panels

### SCN-009 — A topic panel responds to the pointer

Given a visitor moves the pointer over a topic panel
When the pointer is within it
Then the panel's fill deepens
And under a request for reduced motion the fill still changes, without a transition

### SCN-010 — Each panel offers one labelled link

Given a visitor using a keyboard or a screen reader
When they move through the topic panels
Then each panel presents exactly one link, named for the topic it leads to
And no panel presents an unlabelled or non-interactive element as clickable

### SCN-011 — The engagement model page no longer carries the pricing band

Given the engagement model page
When a visitor reads it end to end
Then no pricing band appears
And the quote about larger firms' economics is gone

### SCN-012 — The two remaining copy sections are separated

Given the engagement model page's two remaining copy sections
When a visitor scrolls from the first into the second
Then the two sit on different fills, so the boundary between them is visible

### SCN-013 — The three pages run the section's band rhythm

Given the three How We Work child pages
When their bands are compared with the What We Do detail pages
Then all three use the shorter header, band, and closing rhythm those pages use rather than the homepage's taller one

## Non-functional requirements

- Breadcrumb and heading text on each panel fill meet AA at their sizes.
- Each panel's hover fill stays light enough for its ink copy to meet AA.
- One real link per panel, keyboard reachable, with the existing focus-visible
  treatment.
- The colour transition is suppressed under `prefers-reduced-motion: reduce`.
- No new dependency, no new route.

## Verification map

This repository has no test suite, so no scenario has automated coverage.
`lint`, `typecheck`, and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and therefore do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Delivery model page top at 1240px |
| SCN-002 | Manual | — | N/A | Engagement model page top at 1240px |
| SCN-003 | Manual | — | N/A | Computed panel fills compared against the three page header fills |
| SCN-004 | Manual | — | N/A | Breadcrumb tone, link target, and `aria-current` on both pages |
| SCN-005 | Manual | — | N/A | First content section of each page shows the relocated lead |
| SCN-006 | Manual | — | N/A | Closing band fill on all three child pages |
| SCN-007 | Manual | — | N/A | Client journey closing band inspected for a grain layer |
| SCN-008 | Manual | — | N/A | Click inside each panel away from the link text |
| SCN-009 | Manual | — | N/A | Hover fill change, and the same with reduced motion forced |
| SCN-010 | Manual | — | N/A | Accessibility tree: one named link per panel, no clickable div |
| SCN-011 | Manual | — | N/A | Engagement model page read end to end |
| SCN-012 | Manual | — | N/A | Computed fills of the two remaining copy sections |
| SCN-013 | Manual | — | N/A | Band padding compared against a What We Do detail page |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **The site content column is not asserted here.** Routed to #36 so one
  behavior has one contract. Recorded rather than silently dropped.
- **A topic panel's stretched link makes selecting text inside the panel
  impractical.** A deliberate trade for a whole-panel target, carried from the
  ticket's edge cases.
- **`npm run copy:parity` is red for these pages.** `/how-we-work`,
  `/how-we-work/client-journey`, `/how-we-work/delivery-model`, and
  `/how-we-work/engagement-model` are four of the nine routes this wave
  deliberately rewrote; the copy prototype still carries the pricing band and the
  larger-firms quote. Accepted as designed divergence and routed to a follow-up
  ticket; not treated as a pass criterion here.
- **The commits named in the ticket body do not resolve.** The branch was rebased
  after design, so `f2ea16d`, `2b6b77d`, `ba81068`, `dfb22dc`, and `9392e75` are
  now `5ea2b46` (compact header), `b1978fb` (clickable panels), `d7ac36f` (gold
  closing band), `e3f516c` (pricing band removed), and `c659fe5` (the two copy
  bands separated).

## Open questions

- The copy prototype still carries the pricing band and the larger-firms quote.
  Whether it is updated to match or accepted as diverged belongs to the
  copy-parity follow-up ticket, not to this one. Carried forward unresolved.
