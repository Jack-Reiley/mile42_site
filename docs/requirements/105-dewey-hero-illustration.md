# #105 — Give Meet Dewey a Level One hero illustration

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/105
- Pull request: <PR_URL>
- Parent epic: none
- Delivery unit: unit-105
- Requirement version: 1

## Objective

The Meet Dewey hero shows the librarian, the page's own metaphor, as a Level One
illustration served through the site's asset pipeline. It had been running
`handshake`, a Level Two spot, because the site owned only one Level One drawing.

## Scope

- `design/illustrations/dewey_librarian_with_color.png`, the master extracted
  from the supplied wrapper.
- A `MAP` entry in `site/scripts/illustrations.mjs` at `[384, 768]`, untinted.
- A `META` entry in `manifest.js` at `level: 1` with authored alt text.
- The emitted `dewey-librarian` webp set and the regenerated
  `illustrations.data.json`.
- The Meet Dewey hero `Spot`, repointed and resized for the new aspect ratio.
- Hero coverage in `MeetDewey.test.jsx` and the handshake's remaining homes in
  `handshake-homes.test.jsx`.

## Out of scope

- The `chess` spot in the band below.
- `handshake` on the homepage or the client journey, both unchanged.
- The `path-handshake` card icon, which is #45.
- Any other page's hero, and the Level system itself.

## Behavioral scenarios

### SCN-001 — The Meet Dewey hero shows the librarian

Given a reader opens /meet-dewey
When the hero band renders
Then its illustration is the librarian artwork
And its accessible name describes a librarian and a shelf of books
And it is announced rather than hidden from assistive technology

### SCN-002 — The artwork is registered as a Level One illustration

Given the illustration manifest is read
When the Meet Dewey hero's entry is inspected
Then its level is 1
And it is not marked as a placeholder
And `npm run illustrations:placeholders` reports nothing outstanding

### SCN-003 — The hero image is served through the asset pipeline

Given the Meet Dewey hero has rendered
When its image element is inspected
Then it carries a srcSet offering more than one width
And a sizes value describing the width it actually renders at
And intrinsic width and height attributes matching the built artwork

### SCN-004 — The hero image stays the prioritised above-the-fold image

Given the Meet Dewey hero has rendered
When its image element is inspected
Then it loads eagerly at high fetch priority
And no other image on the page is prioritised ahead of it

### SCN-005 — The band holds its layout while the artwork loads

Given a reader opens /meet-dewey
When the hero artwork has not yet arrived
Then the space it will occupy is already reserved
And no copy in the hero moves once it arrives

### SCN-006 — The shipped artwork is the master, unaltered, at a recorded weight

Given the illustration build runs
When the full-size asset is compared against its trimmed master
Then every visible pixel is identical and the build passes
And the emitted data records each variant's width, height, and byte size
And those byte sizes are carried here as the measured baseline

### SCN-007 — The contrast question is answered by looking, not by assertion

Given the artwork is on the `orange-deep` band with no treatment added
When the hero is viewed in a browser
Then the developer records which strokes read and which do not
And that observation is attached to the ticket
And any correction is raised as its own ticket rather than folded in here

### SCN-008 — The handshake keeps its remaining homes

Given the hero no longer uses the handshake
When the homepage practice band and the client journey's Evolve stage render
Then each still shows the handshake artwork unchanged
And the `handshake` entry is still built and still registered

## Non-functional requirements

- The hero remains eagerly loaded, decoded synchronously, at high fetch
  priority, and is the only prioritised image on the page.
- No cumulative layout shift from the hero band. Measured: **CLS 0, zero layout
  shift entries**.
- Alt text authored by hand, per the manifest's standing rule.
- No token, theme, or band change. `tokens:check` untouched and green.
- No new dependency. `illustrations.data.json` stays generated.

### Measured weight (SCN-006 baseline)

Emitted by `npm run illustrations:build`, lossless verified:

| Entry | Master | 1x | 2x | Full size |
| --- | --- | --- | --- | --- |
| `handshake` (previous hero) | 1116×701 | 15 KB @256 | 57 KB @704 | 284 KB |
| `gears` | 1359×1510 | 48 KB @384 | 113 KB @768 | 123 KB |
| `chess` | 1761×1704 | 33 KB @340 | 69 KB @680 | 105 KB |
| **`dewey-librarian`** | **1674×1813** | **48 KB @384** | **120 KB @768** | **667 KB** |

The served variants are on par with `gears`, the closest comparable hero. The
full-size asset is heavy — 667 KB against `hero-desk`'s 596 KB — because the
drawing is built on soft gradient blobs and stipple, which lossless WebP cannot
reduce. It is never served at the hero's rendered width: at 256 CSS px the
browser selects the 384w candidate at 1x and the 768w at 2x, and the 1674w
candidate exists only for a viewport far wider than this layout allows.

### Measured contrast (SCN-007)

Computed from the master's own pixels composited over `--color-orange-deep`
`#c24700`, rather than from a screen capture, which cannot be trusted for
colour:

| Measurement | Value |
| --- | --- |
| Ink strokes sitting on a colour blob | 4.20:1 |
| Ink strokes sitting on the bare band | 4.20:1 |
| Same ink on `--color-surface` for reference | 19.18:1 |

51% of the linework sits directly on the band. It reads at 4.20:1, above the
3:1 that WCAG 1.4.11 asks of non-text graphical objects. Confirmed by eye at
zoom: the shelf's right frame, its base, the figure's hair outline and legs are
all legible.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | Browser pass at 1920px |
| SCN-002 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | `npm run illustrations:placeholders` reports none |
| SCN-003 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | `currentSrc` resolved to `dewey-librarian-384.webp` at dpr 1 |
| SCN-004 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-005 | Manual | — | N/A | PerformanceObserver on reload: CLS 0, 0 shift entries; `aspect-ratio: auto 1674 / 1813` reserved |
| SCN-006 | Build | — | N/A | `npm run illustrations:build` — lossless verified, idempotent; sizes in the table above |
| SCN-007 | Manual | — | N/A | Contrast table above; zoomed capture of the shelf frame and legs |
| SCN-008 | Unit | `site/src/pages/handshake-homes.test.jsx` | N/A | — |

Unit tests never parse this document.

## Deliberate deviations

- **The design's weight estimate was wrong and is corrected here.** It predicted
  roughly 3x the nearest comparable — about 124 KB at 384w and 329 KB at 768w —
  and recorded that as an unresolved decision. Those figures came from a Pillow
  encode standing in for the pipeline. The pipeline's own sharp encode produces
  48 KB and 120 KB, level with `gears`. There is no weight tradeoff to decide.

- **The design's contrast prediction was wrong and is corrected here.** It said
  the linework "falls to near-invisibility" on the band. That came from looking
  at a composite, not measuring one. Measured, the ink reads at 4.20:1, above
  the 3:1 threshold for graphical objects. SCN-007 is satisfied by the
  observation, and no follow-up is warranted.

- **The hero artwork is held at 16rem, not the 22rem the handshake used.** The
  design left the width to implementation. Measured at 1920px, the copy column
  is 279px tall and the artwork renders 277px at 16rem, 312px at 18rem, and
  381px at 22rem. Only 16rem keeps the band's height set by its copy rather than
  by its illustration, so the band holds the 471px it had before this change.

- **`StageJourney.jsx` gained a `matchMedia` guard, outside this ticket's
  stated scope.** `canHover()` called `window.matchMedia` unguarded, which
  throws in any environment lacking it. No existing test triggered it because it
  fires on `mouseenter`; SCN-008's client-journey assertion has to open the
  Evolve stage, and the synthetic mouseenter surfaced it as an unhandled error.
  Fixed rather than worked around in the test, using the guard `reveal.js:62`
  already uses. A browser always has `matchMedia`, so no user-facing behavior
  changed.

## Open questions

- Narrow viewports are unverified. The browser tooling reports a successful
  resize while the viewport does not change, the same limitation recorded on
  #5, #12, #15 and #54. Below `lg` the hero collapses to one column with the
  artwork centred at `70vw` capped by the same 16rem; that path has not been
  seen.
- Whether the artwork's green and orange are the brand tokens exactly is not
  verified. An exact match would be a change to the master, not to code.
