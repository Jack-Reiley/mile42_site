# #75 — Move the homepage bands to blue and Meet Dewey's to a new orange-deep

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/75
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/76
- Parent epic: none
- Delivery unit: unit-74-75-hero-copy-and-band-colours
- Requirement version: 1

## Objective

The homepage opens and closes on blue and Meet Dewey on a burnt orange, with
every line on those bands legible against the colour it sits on.

## Scope

- `site/src/components/primitives.jsx`: an `orange-deep` entry in `BAND`, its
  `BAND_GRAIN` recipe, and a `hero` entry in `EYEBROW_TONE`.
- `site/src/pages/Home.jsx`: the hero band and the closing band, and the type
  tones on both.
- `site/src/pages/MeetDewey.jsx`: the hero band and the closing band, and the
  type tones on both.
- `design/tokens/verify/check.mjs`: the off-white on orange-deep pairing, so the
  new band is measured rather than assumed.

## Out of scope

- Contact, Insights and Privacy, which still open on the brand green.
- #69, which stays separate by decision. It tracks off-white on brand green in
  `ComingSoon.jsx` and `HardParts.jsx`, neither of which this ticket touches.

## Behavioral scenarios

### SCN-001 — The homepage opens and closes on the same field

Given a reader opens the homepage
Then the hero band is drawn on the blue field
And the closing call to action is drawn on the same blue field
And neither is the brand green

### SCN-002 — Meet Dewey opens and closes on the burnt orange

Given a reader opens Meet Dewey
Then the hero band is drawn on the orange-deep field
And the closing call to action is drawn on the same field

### SCN-003 — Every line on a dark band is legible on it

Given a band drawn on blue or on orange-deep
When any eyebrow, heading, lead, or body line is set on it
Then that line takes the off-white tone rather than ink or a coloured on-dark tone
And it meets WCAG AA for its size against the band as composited, including any grain film

### SCN-004 — The new band states its own grain recipe

Given orange-deep is available as a band
Then it declares a blend and an opacity of its own
And that recipe holds the band's mean colour within one level of the bare colour
And it leaves the worst glyph-sized area above the AA threshold for the tone the band carries

### SCN-005 — The film still stops at the opening band

Given any page in the site
Then only its opening band carries the grain film
And a closing band on the same colour carries none

### SCN-006 — The new pairings are measured, not asserted by eye

Given a type tone is set on a band colour anywhere in the site
When the token gate runs
Then that pairing appears in its enforced list with a real computed ratio
And off-white on orange-deep is among them

### SCN-007 — A dark band with no surviving coloured eyebrow has a tone to fall back to

Given a band where neither the sky nor the ice eyebrow tone meets AA
When an eyebrow is set on it
Then it can take the off-white tone through the same tone prop the other eyebrows use
And no call site hand-writes the colour utility to get there

## Non-functional requirements

- Every type-on-band pairing introduced here meets WCAG AA at its rendered size,
  measured on the composited band rather than the bare colour.
- A band's grain recipe holds its mean colour within one level of the bare
  colour.
- No new colour literal enters a page; band colour resolves through `BAND`.

## Measured

| Band | Type | Ratio | Threshold |
| --- | --- | --- | --- |
| `blue` #006ae0 | off-white, bare | 4.92 | 4.5 |
| `blue` #006ae0 | off-white, filmed at 0.35 | 4.53 | 4.5 |
| `orange-deep` #c24700 | off-white, bare | 4.85 | 4.5 |
| `orange-deep` #c24700 | off-white, filmed at 0.40 | 4.54 | 4.5 |
| `orange-deep` #c24700 | ice, bare | 4.49 | 4.5 |
| `orange-deep` #c24700 | sky, bare | 3.32 | 4.5 |
| `orange-deep` #c24700 | ink, bare | 3.19 | 4.5 |

Filmed values are the worst glyph-sized area of the composited band, taken as a
5x5 device-pixel patch. The measure was calibrated against the ratios already
recorded on `blue` in `primitives.jsx` before it was used to solve the new
band, so the numbers mean the same thing as the ones already in that file.

The recipe search for `orange-deep`, off-white, overlay:

| Opacity | Spread /255 | Mean shift | Worst patch |
| --- | --- | --- | --- |
| 0.40 | 4.23 | 0.0 | 4.54 |
| 0.45 | 4.76 | 0.0 | 4.50 |
| 0.60 | 6.35 | 0.1 | 4.39 |

0.40 is taken. The 6/255 spread target wants 0.60 and lands under AA there,
which is the same trade `blue` already makes at 0.35. Soft-light returns a
comparable spread at the same contrast but moves the band's mean 1.1 levels,
past the one level every band in the file is held to.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/band-colours.test.jsx` | N/A | Computed background read off both rendered bands |
| SCN-002 | Unit | `site/src/pages/band-colours.test.jsx` | N/A | Computed background read off both rendered bands |
| SCN-003 | Unit + integration | `site/src/pages/band-colours.test.jsx` for the tone props; `npm run tokens:check` for the ratios | N/A | Computed colours read off the rendered lines |
| SCN-004 | Unit + analysis | `site/src/pages/hero-grain.test.jsx` fails any `BAND` key with no recipe; `site/src/pages/band-colours.test.jsx` pins the recipe | N/A | The solve above, recorded on the recipe in `primitives.jsx` |
| SCN-005 | Unit | `site/src/pages/hero-grain.test.jsx` | N/A | — |
| SCN-006 | Unit + integration | `site/src/pages/band-colours.test.jsx`; `npm run tokens:check` | N/A | Gate output reports 16 pairings meeting AA, up from 15 |
| SCN-007 | Unit | `site/src/pages/band-colours.test.jsx` | N/A | — |

There is no E2E harness in this repository, so no scenario names one. Contrast
is asserted by `design/tokens/verify/check.mjs`, which compiles the theme, not
by the vitest suite, which omits the Tailwind plugin and cannot resolve a
utility to a colour. That split is documented in
`site/src/components/accent-contrast.test.jsx`.

## Deliberate deviations

- `BAND['orange-deep']` writes its 76% mix out rather than referencing the
  `--color-orange-deep` token, following the precedent in `CARD_FILL`: that
  token's job is a small glyph staying legible on white, this one is a field,
  and a change made for one should not silently move the other. The gate holds
  a second copy of the same literal, which the gate's own header already
  requires for `tint` and `blue`, and which `band-colours.test.jsx` pins.
- The branch carries both tickets in this delivery unit. See #74's deviations.

## Open questions

- Two `PAIRS` labels in the gate read "the hero band" and "the hero H1 on the
  brand band", meaning brand green. Both stay true for Contact, Insights and
  Privacy, so neither changes here, but the wording will mislead once those
  pages move.
- `npm run test:unit` is red on `main` from a pre-existing `MeetDewey.test.jsx`
  heading mismatch. Caused by neither ticket in this unit and not fixed here.
