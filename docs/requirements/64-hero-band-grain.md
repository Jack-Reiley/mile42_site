# #64 — Lay the grain texture over every page's hero band

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/64
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/67
- Parent epic: none
- Delivery unit: single ticket, stacked on #63
- Requirement version: 1

## Objective

Every route's opening band carries the grain the design system calls its
signature texture, so the largest colour fields on the site stop reading flat.

## A note on how this contract came to exist

This document was written after the implementation, not before it. #64 went from
Backlog straight to implementation at Brett's direction, so it never passed
through `design-ticket` and had no scenarios when its PR opened. The scenarios
below were then written from the ticket's stated acceptance intent and the
behaviour that was built, and the design was reviewed and approved before this
file was committed.

Recorded plainly because the order matters when reading it: a contract written
after the code can describe the code rather than constrain it. Every scenario
here was checked against the ticket's original acceptance intent, and the one
scenario that is not derivable from it, SCN-009, exists because the
implementation touched a component this ticket did not own.

## Scope

- The first `Section` of each of the fifteen routes.
- The `Grain` primitive gains a blend and an opt-in re-centring of its raster.
- `Section` gains a `grain` prop and whatever positioning that requires.
- A per-band recipe, since one blend does not carry eight band colours.
- Tests covering the treatment structurally rather than page by page.

## Out of scope

- Grain on any band other than the first on a route.
- Grain inside illustrations, cards, or buttons.
- Replacing or re-exporting the grain raster.
- Any change to band colours, typography, spacing, or copy.
- The catalog drawer's own film, which predates this work.

## Approach

`Grain` already existed but had been tuned for one surface, the catalog drawer,
at `multiply` and 0.3 opacity.

The tile's pixels average **203 of 255**, which is a light grey rather than a mid
grey. `multiply` is the only blend written around a light source. Every other
blend expects mid grey, so handed this tile it spends its range shifting the
band's colour instead of texturing it: soft-light on navy at 0.5 lifts the band
eleven levels and returns a per-pixel spread of 2.7, which is a wash, not grain.

So `Grain` takes a `blend`, and an opt-in `centred` that re-aims the same raster
onto mid grey with `brightness(0.629) contrast(2.78)`. It is opt-in because the
catalog drawer was tuned against the tile as authored and must not move.

Each band then states the blend and opacity that land a spread near 6/255 while
holding the band's mean colour within one level of where it started. `soft-light`
wins on the deep fields, `overlay` on the mid and pale ones.

`Section` gains a `grain` prop, sets `relative isolate`, writes the film first,
and wraps its contents in a positioned element so type and artwork paint over the
texture rather than through it. The isolation confines the blend to the band it
belongs to.

## Behavioral scenarios

### SCN-001 — Every route's opening band carries grain

Given a reader opens any route
When the first band is displayed
Then a grain film covers that band's colour field

### SCN-002 — The film sits under what the band carries

Given a hero band carrying a heading, buttons, cards, or artwork
When the band is displayed
Then that content paints over the film rather than through it
And its contrast is unchanged from before the film was added

### SCN-003 — Grain stops at the hero

Given a route with more than one band
When the bands below the first are displayed
Then none of them carries a band-wide grain film
And artwork with its own film is unaffected

### SCN-004 — The film is decorative

Given a reader using assistive technology, or a pointer
When they reach a grained band
Then the film is absent from the accessibility tree
And it does not receive pointer events

### SCN-005 — The film covers its band at any width

Given a reader at any viewport width, including above the width at which the content column stops growing
When a grained band is displayed
Then the film covers that band exactly
And the texture shows no visible seam and no pooling

### SCN-006 — The band keeps its colour

Given a band whose fill is a brand colour
When the film is applied
Then the band's mean colour stays within one level of its unfilmed value

### SCN-007 — The film costs no layout and no loading priority

Given the home page, whose hero illustration is its largest contentful paint
When the hero renders
Then the film occupies no space in the layout
And the hero image keeps its eager loading and its high fetch priority

### SCN-008 — Every band states its own grain recipe

Given a band colour defined for the site
When grain is requested on that band
Then the band has its own blend and opacity rather than inheriting a default

### SCN-009 — The catalog drawer is unchanged

Given the Dewey catalog drawer, which drew grain before this work
When it is displayed
Then its film is identical to before

## Edge cases

- The three near-white bands, `page`, `surface` and `tint`, cannot reach the
  target spread. There is no headroom above near-white for a symmetric blend to
  work in, so they cap near 3/255 and read as a faint tooth. None is a hero band
  on any route today, and the recipe map carries them so a future one does not
  crash.
- A band added later without a recipe would throw at render rather than fall back
  silently. SCN-008 is what makes that a test failure instead of a runtime one.

## Non-functional requirements

- No new dependency and no new asset. One existing raster, one CSS filter.
- The film is one absolutely positioned element per band. It does not animate and
  nothing repaints after load.
- Keyboard order, focus behaviour, roles, names, and reduced-motion behaviour are
  unchanged. No markup that carries meaning is added.
- `npm run test:unit`, `npm run tokens:check`, `npm run build`, and
  `npm run copy:build` all pass.
- Node matches `.nvmrc` (24.16.0).

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit + manual | `site/src/pages/hero-grain.test.jsx` | N/A | All 15 routes checked in a browser |
| SCN-002 | Unit + manual | `site/src/pages/hero-grain.test.jsx` | N/A | Film confirmed first in the band, content in a positioned wrapper |
| SCN-003 | Unit + manual | `site/src/pages/hero-grain.test.jsx` | N/A | No band-wide film below the hero on any route |
| SCN-004 | Unit | `site/src/pages/hero-grain.test.jsx` | N/A | — |
| SCN-005 | Manual | — | N/A | Mobile, desktop and 1600px; film measured equal to its band, no seam or pooling |
| SCN-006 | Manual | — | N/A | Solved per band against the real tile; navy shifts 0.6 levels for a spread of 5.8 |
| SCN-007 | Manual | — | N/A | Film is `position: absolute`; hero image keeps `eager`, `fetchpriority=high`, `decoding=sync` and its intrinsic dimensions |
| SCN-008 | Unit | `site/src/pages/hero-grain.test.jsx` | N/A | — |
| SCN-009 | Manual | — | N/A | Drawer's two films measured `multiply`, no filter, 0.3, unchanged |

There is no E2E layer in this repository, so no scenario names one. SCN-005,
SCN-006, SCN-007 and SCN-009 are rendering and paint behaviour that a jsdom
render cannot observe, so they are manual by necessity rather than by preference.

The tests are written against structure rather than a list of pages, so a route
added later that forgets its hero grain fails rather than shipping flat.

## Cross-browser evidence

The treatment relies on `mix-blend-mode` combined with `filter`, which engines
have historically implemented differently, so this was checked rather than
assumed.

| | Chromium | WebKit, Safari, AppleWebKit 605.1.15 |
| --- | --- | --- |
| `mix-blend-mode: soft-light` | supported | supported |
| `mix-blend-mode: overlay` | supported | supported |
| `filter: brightness() contrast()` | supported | supported |
| `isolation: isolate` | supported | supported |
| Computed blend, filter and opacity on the navy film | as authored | as authored |
| Rendered result on navy, gold and brand | texture present, no colour shift across the boundary | same |

Checked with a page splitting each band in half, film on one side and the bare
colour on the other, so a colour shift would show as a visible seam. None
appeared in either engine.

**Gecko is untested.** Firefox is not installed on the machine this was verified
on. Recorded as a limitation rather than implied coverage.

## Deliberate deviations

- **The contract was written after the implementation.** See the note near the
  top. `implement-ticket` materializes the contract before or alongside the code;
  here the code and PR came first at Brett's direction, and the contract was
  retrofitted with the design approved before it was committed.
- **`centred` is opt-in rather than the default.** A mid-grey tile is what every
  blend other than `multiply` expects, so it would be the better default in
  isolation. It is opt-in because the catalog drawer's `multiply` at 0.3 was
  tuned against the tile as authored, and changing it would alter a surface this
  ticket does not own.

## Open questions

- Whether the near-white bands should carry a faint film at all, or none. Nothing
  depends on the answer until a route takes one as its hero.
- Whether the raster should be re-exported centred, which would remove the
  runtime filter at the cost of changing the asset the drawer depends on.
