# #60 — Surface Dewey on the homepage and from the practice pages

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/60
- Pull request: not yet opened. Held pending Brett's localhost review, which the
  approved design makes a precondition. See Deliberate deviations.
- Parent epic: none
- Delivery unit: independent, single ticket
- Requirement version: 6

## Objective

Dewey shipped in #58 as a complete page at `/meet-dewey` that nothing else on
the site pointed at. Give it the three entry points a reader would expect: a
block on the homepage, and a link from each of the two practice pages whose
argument Dewey belongs to.

## Scope

- A Dewey block on the homepage, between the core practice band and the closing
  call to action, stating what Dewey is, the problem it solves, and what it
  does, then four supporting points and a button to `/meet-dewey`.
- A link to `/meet-dewey` on the Agentic AI page, inside the capability band
  that already claims knowledge and retrieval work.
- A description of Dewey and a link to `/meet-dewey` on the AI-driven Products
  page, inside the proof panel that already names Blink Social.

### Contract change at version 2: the homepage copy is written, not quoted

Version 1 required the homepage block's copy to come verbatim from
`dewey-messaging-package.md`. Reviewed on localhost, that copy did not do the
job the block exists for. The package's headlines are written for a reader who
already knows what Dewey is: "Upload is the whole pipeline" and "The right
search for the moment" name a benefit without explaining it, and the library
framing leads with a metaphor instead of a product. The homepage is the surface
where a first-time reader learns what Dewey is, so abstraction there tells them
nothing.

Version 2 replaced that copy with plain language written for a layperson. The
four points each gained an explanation rather than a slogan, which is why they
moved from three columns to four in two.

Version 3 changes who the block is addressed to. Version 2 was clear but opened
on "Dewey is the knowledge layer between your data and your AI agents", which
is a product category and speaks to an engineering lead. The buyer for this
site is mid-market and enterprise, and that reader arrives with a stalled
pilot, a security review that killed it, and a budget that has already paid for
retrieval plumbing more than once. The block now opens on that problem and
explains what Dewey is immediately after, so it is no less concrete than
version 2 while reaching the person who signs. The four points were rewritten
to match: sealed systems of record, something security review can approve, cost
amortized across projects, and one answer instead of one per agent.

Version 4 rewrites the heading to lead with the product name. Version 3 opened
on "Most AI pilots stall in the same place, and it is not the model", which
made the problem the headline and left the name to the eyebrow and the button.
The heading now reads "Meet Dewey, the knowledge layer that keeps agents out of
your systems of record", which carries the name the nav and footer already use,
says what Dewey is, and states the enterprise stake in one line. The stalled
pilot moved down into the lead rather than being dropped, so nothing version 3
established was lost. The eyebrow shortened to "A Mile42 product" so the band
does not say "Dewey" twice in two lines.

The heading is the only H2 on the homepage that wraps, so it takes
`text-balance`. Left to the default it broke across the full 1240px column with
a short second line; balanced it splits 651px and 730px. `RuledGroup` titles
already use this for the same reason and it is a no-op at widths where a
heading fits on one line.

Brett directed every one of these changes and approved the replacement copy
each time. The version 2 copy is preserved in commit b29e872 and the version 3
copy in ddd9749, if either is ever wanted back.

### Contract change at version 5: one band, and a drawn diagram

Two further changes, both directed and chosen by Brett from previews built on
localhost.

**The core practice band and the Dewey band are now one band.** They were
adjacent and made the same argument from two directions: the practice explains
why this firm implements agentic AI, and Dewey is what that practice produced.
Split, a reader met the product with no idea why this firm would have one. Five
layouts were previewed and Brett chose the one that keeps the practice above and
sets Dewey inside it as a tinted panel. The practice capabilities moved from
`Card` to `RuledGroup`, because four bordered cards stacked above a bordered
panel read as five objects of equal weight and the panel has to be the one that
carries. The two homepage bands were 893px and 995px; the merged band is one.

This puts `Home.jsx`'s existing core practice band inside this ticket's scope,
which the version 1 contract excluded. Nothing was dropped in the merge: the
"we will tell you when the answer is not an agent" note and the "the opportunity
is AI, the constraint is implementation" line both survive, and the practice
descriptions were shortened for a four-column row with Brett's approval.

**The landing line is cut and the panel heading takes the site measure.** "The
opportunity is AI. The constraint is implementation." was restored during the
merge, because option B's preview had dropped it silently and a deliberate cut
is not the same as an accident. Brett then cut it deliberately, so it is gone,
and a test asserts it stays gone rather than drifting back.

The panel's heading was capped at `34ch`, a measure carried over from a
two-column preview where the heading had half the panel. In the full-width panel
that wrapped it at 615px with 545px of empty panel beside it, while the
paragraph below ran 1056px: the heading was narrower than its own body copy.
Both now take the site's 46rem, so they share one column edge. The remaining
two-line break is `H3`'s built-in `text-balance`, which every heading at that
level on this site uses.

**The three-box flow is now the card catalog drawer.** Brett supplied a design
handoff at `design/illustrations/design_handoff_catalog_drawer` and selected
option `2a` from it. It is implemented as `site/src/components/CatalogDrawer.jsx`
at the handoff's stated fidelity: a 1080px five-column grid of
190/190/320/190/190, curved connectors, and every endpoint, both label pills and
the drawer face's centre landing on y=207. Those figures were measured in the
browser rather than eyeballed, as the handoff explicitly asks.

Dewey's supporting points dropped from four to two. The sealed systems of record
and the one shared source are both shown by the diagram now, and repeating them
underneath would be the same sentence twice. The approval argument and the cost
argument remain, because the picture cannot make either.

Two things did not change. The library framing stays intact on `/meet-dewey`,
where the reader has already been told what the product is, and "Agents never
touch your systems of record" survives from the package unaltered, because it
was already the clearest line in it.

No scenario changed. SCN-001 requires the block to name Dewey, say what Dewey
does, and show supporting points, which is a stronger claim after this change
than before it. The copy on the two practice pages is unchanged from version 1.

## Out of scope

- Moving or renaming `/meet-dewey`. The top-level placement was decided in #58.
- Any change to the header navigation or the footer.
- Any change to the Dewey page, its components, or its tests.
- The narrow-viewport verification #58 recorded as not done for the Dewey page
  itself. This ticket verifies only its own new content.

## Behavioral scenarios

### SCN-001 — The homepage carries a Dewey block in position

Given a reader is on the homepage
When they scroll past the core practice band
Then a Dewey block is presented before the closing call to action
And it names Dewey, states what Dewey does, and shows three supporting points

### SCN-002 — The homepage block leads to the Dewey page

Given the Dewey block is presented on the homepage
When the reader activates its call to action
Then they arrive at the Meet Dewey page

### SCN-003 — The Agentic AI page points to Dewey

Given a reader is on the Agentic AI page
When they read the capability listing that claims knowledge and retrieval work
Then a link to the Meet Dewey page is presented within that same band
And activating it takes them to the Meet Dewey page

### SCN-004 — The AI-driven Products page describes Dewey and links to it

Given a reader is on the AI-driven Products page
When they read the proof panel that names what the firm has built itself
Then Dewey is described there as a product of the firm, as Blink Social already is
And a link to the Meet Dewey page is presented
And activating it takes them to the Meet Dewey page

### SCN-005 — Nothing that already shipped changes

Given the Dewey page, the header, and the footer as they stand on main
When this work is complete
Then the Meet Dewey page renders its eight sections unchanged
And the header presents the same top-level navigation it did before
And the footer presents the same Meet Dewey entry it did before
And the route for the Dewey page is unchanged

### SCN-006 — Every new entry point is real, keyboard reachable navigation

Given a reader navigating by keyboard alone
When they reach any of the three new Dewey entry points
Then each one receives a visible focus indicator
And each one is a link that can be activated from the keyboard
And each one carries an accessible name that identifies Dewey as the destination

### SCN-007 — The new block honors the motion contract

Given a reader with no reduced-motion preference
When the Dewey block enters the viewport
Then its contents reveal in sequence the way other homepage content does
And given a reader who prefers reduced motion
When the same block enters the viewport
Then its contents are presented in their resting position without animating

### SCN-008 — The block holds together at narrow widths

Given a reader on a narrow viewport
When they reach the Dewey block
Then the three supporting columns restack into a single readable column
And no content overflows the viewport horizontally
And the call to action remains reachable

## Non-functional requirements

- Text and non-text contrast meet AA on the `tint` band, including the accent
  rules and the link colour.
- No new npm dependency, and no new component file. The block composes
  `Section`, `Wrap`, `Eyebrow`, `H2`, `Lead`, `Body`, `GroupColumns`,
  `RuledGroup`, and `Button`, all of which already existed.
- `npm run test:unit`, `npm run tokens:check`, `npm run build`, and
  `npm run copy:build` all pass.
- Node matches `.nvmrc` (24.16.0).

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/dewey-entry-points.test.jsx` | N/A | Reviewed on localhost; copy rewritten at versions 2 and 3 as a result |
| SCN-002 | Unit | `site/src/pages/dewey-entry-points.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/pages/dewey-entry-points.test.jsx` | N/A | — |
| SCN-004 | Unit | `site/src/pages/dewey-entry-points.test.jsx` | N/A | — |
| SCN-005 | Unit | `site/src/pages/MeetDewey.test.jsx`, `site/src/components/Footer.test.jsx`, `site/src/pages/routes.test.jsx` | N/A | All three pre-existing suites pass unmodified |
| SCN-006 | Unit + manual | `site/src/pages/dewey-entry-points.test.jsx` | N/A | Keyboard pass on localhost, pending Brett's review |
| SCN-007 | Manual | — | N/A | Localhost, with and without a reduced-motion preference, pending Brett's review |
| SCN-008 | Manual | — | N/A | Localhost at a narrow width, pending Brett's review |

There is no E2E layer in this repository, so no scenario names one. SCN-007 and
SCN-008 are motion and layout behavior that a jsdom render cannot observe, so
they are manual by necessity rather than by preference.

Automated tests do not parse this document, and none was generated from it.

### State of the manual evidence

Verified in a real browser on localhost at 1440x900 and at 375x812:

- SCN-002, SCN-003, SCN-004: every link resolves to `/working/meet-dewey`,
  carrying the router basename, and activating one navigates to the Dewey page.
- SCN-005: the Dewey page still renders eight sections with its own `h1`.
- SCN-006: all three are real anchors. The accessible name is "Meet Dewey" with
  the decorative chevron correctly excluded.
- SCN-007: the band's contents animate `m42-in-up` on a `view()` timeline, and
  all three columns animate independently rather than as one slab. Reduced
  motion is handled by the existing site-wide rule in `index.css`, which this
  block inherits rather than reimplements.
- SCN-008: at 375px the three columns stack at distinct offsets, document
  scroll width equals the viewport width, so nothing overflows.

Not established: **no visual screenshot was captured.** The browser tooling in
this environment returned blank frames at every viewport, the same class of
limitation #58 recorded against the resize tooling. Everything above was
verified through the DOM and computed style rather than by eye. Whether the
`tint` band actually sits well against the green closing band below it is a
judgement that has not been made and is the reason for the localhost review
phase.

## Findings

Three defects were found in the browser that the unit tests did not catch, and
all three are fixed on this branch.

- **The block skipped a heading level.** `RuledGroup` defaults its title to
  `h4`. That is right on the pages that put an `h3` list heading above their
  columns, and wrong here, where the band's `h2` is the only heading above it.
  The rendered outline went `h2` straight to `h4`. Now `as="h3"`, and
  `dewey-entry-points.test.jsx` asserts the outline has no gap so it cannot
  regress.
- **The eyebrow failed AA.** `Eyebrow` defaults to the accent tone, which at
  12px measures 3.86:1 on the `tint` fill against a 4.5:1 floor. Now `ink`, at
  13.96:1. `FeaturePanel` already takes ink for exactly this reason.
- **The column grid applied the reveal relay twice.** `GroupColumns` has carried
  `REVEAL_GROUP.relay` and `REVEAL_ROW` internally since #54 and #56, so passing
  them again at the call site duplicated every class. Removed.

Measured contrast on the `tint` band after the fixes, resolved through a canvas
composite so alpha and `oklab()` colours are handled correctly:

| Element | Ratio | Floor | Result |
| --- | --- | --- | --- |
| Eyebrow, heading, lead, pitch, column titles | 13.96 | 4.5 | pass |
| Column body, ink at 72% | 5.97 | 4.5 | pass |
| Column rule, accent, non-text | 3.86 | 3.0 | pass |
| Link on both practice pages | 14.57 | 4.5 | pass |

## Out of this ticket's scope, worth a follow-up

The site's existing accent eyebrows are already below AA. The homepage's own
"Core practice" eyebrow measures 4.03:1 at 12px on the `surface` fill, and
`primitives.jsx` notes the same problem on the detail pages. That is a
pre-existing, site-wide issue, not one this ticket introduced, and fixing it
here would have meant editing bands this ticket has no business touching. It
should become its own ticket.

## Deliberate deviations

- **The pull request is not opened at the end of implementation.** The
  `implement-ticket` contract creates the PR and moves the ticket to In QA.
  This ticket's approved design overrides that with a three-phase rollout:
  build, then Brett's localhost review, then handoff on his explicit go-ahead.
  The branch is pushed so the work is backed up. The ticket stays In Progress
  rather than moving to In QA, because it is not ready for verification until
  the review is done and the PR exists.
- **Links take the default ink tone, not the page accent.** `TextLink` defaults
  to ink. Accent on the cream `surface` fill sits on the AA boundary for
  body-sized text, and the existing accent link on AI-driven Products sits on a
  white band rather than inside a `surface` panel.
- **The homepage block takes `tint`, not Dewey's `blue`.** `blue` is Dewey's
  identity band from #58, but it is dark and would stack two saturated bands
  against the green closing band directly below it.
- **Dewey's description on AI-driven Products is a new paragraph rather than an
  edit to the Blink Social sentence.** No existing copy was rewritten, and Dewey
  is described at the same weight instead of being appended to another claim.

## Deliberate deviations from the catalog drawer handoff

- **The grain raster is the site's, not the bundle's.** The handoff calls for
  `grain-texture.jpg` at 30% multiply. That file is not a seamless tile and shows
  patch seams when repeated, which is why this site draws `/grain-fine.png`
  through the `Grain` primitive instead. Same intent, same opacity, the site's
  own asset.
- **Orange is `--color-orange`, not `#FF5000`.** The handoff names `#FF5000` for
  the back card's mark. The site's token is `#ff5e00` and `tokens:check` pins it.
  The difference is invisible on a 10px dot and the token wins.
- **The breakpoint is 1280px, not the handoff's 1160px.** 1160 is the card's
  width, not the viewport's. At a 1280px viewport the band's padding and the
  1240px container leave the panel 1104px inside its own padding, which is the
  first standard breakpoint that clears the 1080px grid.
- **The drawer face is elastic below 416px.** The handoff fixes it at 182px. At a
  320px viewport the shelf lines wrap and met the drawer pull with zero
  clearance, so the face is anchored `bottom-0` and the container grows. At the
  design width this resolves to exactly 182px and nothing moves.
- **The step badge and the "The card catalog drawer" title are not used.** They
  frame the handoff's own demo page. On the homepage the panel already carries
  its eyebrow and heading.

## Open questions

- None. The band fill, the call-to-action shape, and the AI-driven Products
  treatment were all settled during design.
