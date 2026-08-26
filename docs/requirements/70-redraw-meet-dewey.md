# #70 — Redraw Meet Dewey: illustrate the five steps and fold three bands into one interactive diagram

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/70
- Pull request: not yet opened
- Parent epic: none
- Delivery unit: single ticket, stacked on #64
- Requirement version: 2

## Objective

Meet Dewey stops explaining itself in prose and starts showing itself. The five
integration steps become a drawing, and the three bands that argued the same
point three times become one diagram whose parts carry the argument.

## A note on how this contract came to exist

This document was written after the implementation, the same way #64's was and
for the same reason: the work went from Backlog straight to implementation at
Brett's direction, so it never passed through `design-ticket` and had no
scenarios while it was being built.

It also grew while it was being built. The ticket opened covering one band and
was extended four times, each extension agreed in conversation and appended to
the issue before the code was written. The scenarios below were written from
those agreements and from the behaviour that exists, and the whole of it was
reviewed on localhost before this file was committed.

Recorded plainly because it changes how the document should be read: a contract
written after the code can describe the code rather than constrain it. Every
scenario below is traceable to a line in the issue's Scope section, except
SCN-007 and SCN-008, which exist because the implementation reached into a
component this ticket does not own.

## Scope

- The "Data in. Answers out." band of `site/src/pages/MeetDewey.jsx`.
- The "Every library needs a librarian", "Connectors are code, not prompts", and
  "One source of truth, every agent" bands, which become one.
- The page's hero eyebrow, heading, and lead line.
- Two new components, `IntegrationSteps` and `LibrarianDiagram`, with tests.
- `CatalogDrawer` split into shareable parts, with its own output unchanged.

## Out of scope

- Any other route. The homepage is touched only in that it must not change.
- Meet Dewey's remaining bands: the seven pillars, "Why not just…?", and the CTA.
- Retiring `LibrarianFlow` and `StepStrip`, which this leaves unused. Removing a
  shared component is its own decision.
- The section eyebrow's colour. The handoff draws it blue; it stays ink because
  12px accent text on a white band is what #62 is about.

## Approach

Two handoffs, treated differently, because they arrived in different states.

`data-in-answers-out.html` is a bundled artifact with the artwork inline. The
five blobs, their sketches, and the arrows are its paths verbatim. What changed
is how they are arranged: the handoff draws one 1080-wide SVG, which cannot
reflow, so each step is a 216-wide window onto the same coordinate space with
its group translated into place. The `userSpaceOnUse` gradient therefore still
resolves against the full row, and step five ends on the orange the single wide
drawing ends on, while the five steps are free to become a stacked list on a
phone.

`Dewey Homepage Graphic Integration` needed more judgement, because it redraws a
picture the repository already has. The handoff was authored against a `main`
that did not yet contain `CatalogDrawer`, so it reproduces that component's
artwork from scratch, down to identical strings. Reproducing it again here would
leave the homepage and Meet Dewey free to drift. `CatalogDrawer` is split into
`CatalogStack`, `DrawerFace`, `PublishCurves` and `AnswerCurves` instead, and
both pages compose the same parts.

The handoff also scales a fixed 1500px stage with a CSS transform, which scales
the type with it: at a 1024 viewport its 12px labels land near 7px. The diagram
is built on `CatalogDrawer`'s real 1080 grid instead, so every label renders at
its own size, and below `xl` the picture gives way to stacked text — which is
what `CatalogDrawer` and its own handoff already concluded about this drawing.

Six of the handoff's hotspots carry copy lifted from the three bands. A seventh
was added: the connectors band argued in two directions, and the outbound half —
agent-proposed writes gated by human signoff — appears in none of the six. The
return leg is drawn under the inbound bundle, and is the one mark in the diagram
that is not in `CatalogDrawer`.

Hotspots are buttons rather than hover targets, so focus reaches every panel.
The panel is floored at the height of its tallest state because the eight states
ranged 278 to 332 pixels and moving between them shoved the rest of the page.

## Behavioral scenarios

### SCN-001 — The five integration steps are drawn

Given a reader on Meet Dewey at a desktop width
When the "Data in. Answers out." band is displayed
Then the five steps are drawn as five gradient blobs with a sketch in each
And a single warm gradient runs continuously across all five
And an arrow joins each step to the next

### SCN-002 — The sequence survives without the picture

Given a reader using assistive technology
When they reach the five steps
Then the steps are an ordered list of five items
And each item states its own numeral, label, and line
And the drawings are absent from the accessibility tree

### SCN-003 — The band's copy runs the width of the band

Given a reader on Meet Dewey above the width at which the content column stops growing
When the "Data in. Answers out." band is displayed
Then both paragraphs span the same left and right edge as the illustration below them

### SCN-004 — Three bands become one diagram, and every claim survives

Given a reader on Meet Dewey
When the page is displayed
Then there is one band where there were three
And the librarian, connectors, and source-of-truth arguments are all still made
And every named point from the three bands is still present

### SCN-005 — Every part of the diagram is reachable without a pointer

Given a reader navigating by keyboard
When they tab through the diagram
Then each of the seven parts takes focus in turn
And focusing a part shows that part's panel
And the panel is named as the region each control drives

### SCN-006 — Pointing at a part does not move the page

Given a reader moving between parts of the diagram
When the panel's content changes
Then the panel's height does not change
And nothing below the diagram moves

### SCN-007 — The picture is drawn once

Given the card catalog diagram, which the homepage already draws
When Meet Dewey draws it
Then both compose the same components rather than two copies of the artwork

### SCN-008 — The homepage graphic is unchanged, and stays static

Given the homepage's catalog drawer
When it is displayed
Then its rendered markup is identical to before this work
And it has no hotspots, no dimming, and no copy panel

### SCN-009 — The outbound path is carried

Given a reader on the diagram
When they reach the outbound part
Then the return leg from Dewey to the systems of record is drawn
And the panel states that agents propose, humans approve, and code executes

### SCN-010 — Labels render at their own size

Given a reader at any width where the diagram is drawn
When the diagram is displayed
Then no label in it renders below the site's 12px minimum

### SCN-011 — Below the diagram's width, the parts become text

Given a reader below the width at which the diagram is drawn
When they reach the section
Then all seven parts are shown as stacked text
And none of them requires a pointer to read
And the diagram's tinted frame is not drawn around that text

### SCN-012 — The hero states the product

Given a reader arriving on Meet Dewey
When the hero band is displayed
Then the eyebrow reads "Dewey™"
And the heading names the product and who it is for

Amended at version 2. See the contract change below.

## Contract change, version 1 to version 2

**What changed.** SCN-012's third clause, "And the lead line still opens with
'Every agent needs a library.'", is removed. The first two clauses stand.

**Why.** #77 restored this hero after a merge resolution in PR #66 reverted it.
The revert had left the page saying "Every agent needs a library." twice, once
as the `h1` and again as the first sentence of the lead directly beneath it.
Restoring #70's heading fixes the `h1`; the duplication is what remained.

Brett decided during #77's design that the hero should not repeat the line.
Since the phrase appears nowhere else in `site/src/`, that retires it from the
site. That reverses a deliberate #70 decision, so it is recorded here rather
than left as a silent disagreement between this document and the code.

**Approved by** Brett, during #77 design.

**Evidence.** `site/src/pages/MeetDewey.test.jsx` asserts the eyebrow and the
heading, and asserts that the retired line appears nowhere in the hero.

## Edge cases

- The step blobs each carry the whole 1080-wide gradient rather than a slice of
  it. Re-ordering or removing a step changes which part of the ramp it lands on,
  which is intended: the ramp belongs to the row, not to the step.
- The panel's floor is a measured pixel value. It holds because the panel is only
  ever drawn at one width, 1080, so it cannot be invalidated by the viewport. A
  seventh proof term or a much longer body would invalidate it, which is why the
  measurement and its range are recorded here.
- `LibrarianFlow` and `StepStrip` are now unreachable from any page. Left in
  place deliberately; see Out of scope.

## Non-functional requirements

- No new dependency. Two new components and one existing raster.
- The grain inside the step blobs is the site's own seamless 256px tile at the
  handoff's 30%, not the design system's `grain-texture.jpg`, which is a single
  patch and shows its seams when repeated. This is what `CatalogDrawer` already
  does.
- Every transition in the diagram is disabled under `prefers-reduced-motion`.
- Keyboard order follows the diagram's own left-to-right reading order.
- `npm run test:unit`, `npm run tokens:check`, `npm run build`, and
  `npm run copy:build` all pass.
- Node matches `.nvmrc` (24.16.0).

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit + manual | `site/src/components/IntegrationSteps.test.jsx` | N/A | Compared against the rendered handoff at 1440; blobs, sketches, arrows and the gradient's end colours match |
| SCN-002 | Unit | `site/src/components/IntegrationSteps.test.jsx` | N/A | — |
| SCN-003 | Manual | — | N/A | Measured at 1440: paragraph 1240px, illustration 1240px, same edges |
| SCN-004 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | Section count 8 → 6; all three titles and the outbound line asserted present |
| SCN-005 | Unit + manual | `site/src/components/LibrarianDiagram.test.jsx` | N/A | Focus drives the panel in a real browser; seven buttons, each with `aria-controls` on the panel |
| SCN-006 | Manual | — | N/A | Eight states measured before and after: 278–332px became a single 335px |
| SCN-007 | Manual | — | N/A | `LibrarianDiagram` imports `CatalogDrawer`'s parts; no second copy of the artwork exists |
| SCN-008 | Manual | — | N/A | Rendered the pre-split and post-split components side by side and diffed `innerHTML`; identical. Homepage carries no hotspot, no panel |
| SCN-009 | Unit | `site/src/components/LibrarianDiagram.test.jsx` | N/A | — |
| SCN-010 | Manual | — | N/A | No scale transform exists; the smallest type in the diagram is the 12px eyebrow at its authored size |
| SCN-011 | Unit + manual | `site/src/components/LibrarianDiagram.test.jsx` | N/A | At 390px the wide layout computes `display: none`, all seven render as list items, and the list's background is transparent |
| SCN-012 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | Read back from the rendered page |

There is no E2E layer in this repository, so no scenario names one.

SCN-003, SCN-006, SCN-007, SCN-008 and SCN-010 are layout and composition facts
that a jsdom render cannot observe, so they are manual by necessity rather than
by preference.

## Verification limitations

Recorded rather than implied:

- **Chromium only.** Checked in the in-app browser. Not checked in Safari,
  Firefox, or any Gecko engine.
- **Keyboard tab order was driven programmatically**, through focus events in a
  real browser and through `userEvent.tab()` in jsdom, not by a person tabbing
  through the page. SCN-005's ordering claim is weaker than its reachability
  claim as a result.
- **No screen reader was run.** SCN-002 and SCN-005 are verified structurally,
  by roles, names and the accessibility tree, not by listening to them.
- **The dimmed state fails contrast by design.** A part not being pointed at
  drops to 0.16 opacity, which no text passes at. It is decorative and transient,
  the same words sit in the panel at full contrast, and the stacked layout never
  dims. Flagged rather than justified: if this is wrong, the dim value is one
  constant.

## Deliberate deviations

- **The contract was written after the implementation**, and after the scope
  grew four times. See the note near the top.
- **A seventh hotspot that the handoff does not have.** Without it the outbound
  connector story leaves the site. Agreed with Brett before it was built.
- **The handoff's scaled stage was not used.** Reproducing it faithfully would
  have put 12px labels on screen at about 7px between 820 and 1240. Agreed with
  Brett before it was built.
- **The handoff's copy rewrite was taken as intended, not incidental.** It drops
  the bridge sentence out of the hero and replaces the paragraph explaining the
  Dewey Decimal System and the card catalog. Flagged to Brett at the time and
  left as the handoff draws it.
- **This ticket depends on #64.** It reuses `CatalogDrawer`, which is not on
  `main` yet, so #67 must merge first. The alternative was a second copy of the
  artwork.

## Open questions

- Whether `LibrarianFlow` and `StepStrip` should be removed now that nothing
  reaches them, or kept as available primitives.
- Whether the section eyebrow should take the handoff's blue once #62 settles
  what accent text may do on a white band.
- Whether the diagram's dim value should be raised from the handoff's 0.16.
