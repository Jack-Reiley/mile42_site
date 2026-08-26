# #83 — Take every band's grain film to one measured texture

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/83
- Pull request: pending
- Parent epic: none
- Delivery unit: unit-palette
- Requirement version: 1

## Objective

Every band that draws the grain film reads at the same texture, and the number
that defines it can be measured rather than judged by eye.

## Scope

- Re-solve every band's opacity so its composited field lands on the target.
- Rewrite the per-band reasoning, which described constraints no longer in force.
- Commit a measurement tool, which the repository did not have.

## Out of scope

- The brand band's own opacity. #69 set it and this takes it as the reference.
- The grain tile, the `centred` filter, and the blend chosen per band.
- Any band fill colour.

## Behavioral scenarios

### SCN-001 — Every band that carries the film reads at one texture

Given the bands that draw the grain film
When each is displayed
Then the texture reads at the same strength on all of them
And no band is conspicuously coarser or fainter than its neighbours

### SCN-002 — No band loses contrast to the change

Given the text drawn on each filmed band
When it is measured against the composited field rather than the flat fill
Then every line clears the threshold for the size it is set at
And no band's margin is smaller than it was before

### SCN-003 — The target is a stated number, not a matter of taste

Given a contributor adding a new band
When they consult the band system
Then the intended texture is recorded as a number they can measure against
And the recipe for reaching it is described rather than implied

### SCN-004 — The measurement can be reproduced

Given the figures recorded against each band
When someone re-runs the measurement
Then they obtain the recorded values
And a change to a band's fill or opacity can be re-measured without inventing a method

### SCN-005 — The recorded reasoning matches what the values do

Given the notes written against each band
When they are read alongside the values
Then no note describes a constraint that no longer applies
And the two bands whose films were cut to protect contrast no longer describe themselves as a special case

## Non-functional requirements

- No new runtime dependency. The tool is a development script and is not
  imported by the site.
- The tool resolves fills through the theme rather than hardcoding them, so it
  stays correct when a token changes.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Tool + unit | `design/tokens/verify/grain.mjs`, `site/src/pages/brand-band-tones.test.jsx` | N/A | Browser pass over every band |
| SCN-002 | Tool | `design/tokens/verify/grain.mjs` exits non-zero if any band's text drops under AA | N/A | — |
| SCN-003 | Unit | `site/src/pages/brand-band-tones.test.jsx` | N/A | — |
| SCN-004 | Tool | `design/tokens/verify/grain.mjs` | N/A | Reproduces the previously recorded figures |
| SCN-005 | Manual | — | N/A | `BAND_GRAIN` comments rewritten |

## Measured result

Target texture 3.95, worst glyph-sized contrast over a 5x5px window.

| Band | Blend | Was | Now | Texture | Worst | Bar |
| --- | --- | --- | --- | --- | --- | --- |
| navy | soft-light | 0.70 | 0.50 | 3.88 | 13.71 | 4.5 |
| blue | overlay | 0.35 | 0.25 | 3.95 | 4.65 | 4.5 |
| brand | soft-light | 0.40 | 0.40 | 3.95 | 4.53 | 4.5 |
| gold | overlay | 0.95 | 0.37 | 3.95 | 8.58 | 4.5 |
| orange-deep | overlay | 0.40 | 0.27 | 3.91 | 4.63 | 4.5 |
| panel-accent | overlay | 0.80 | 0.47 | 3.88 | 11.44 | 4.5 |
| panel-forest | soft-light | 0.80 | 0.62 | 3.89 | 10.99 | 4.5 |
| panel-orange | overlay | 0.75 | 0.57 | 3.91 | 11.85 | 4.5 |
| tint, surface, page | overlay | 1.00 | 1.00 | at or under target | | |

`blue` and `orange-deep` both gained margin, 4.55 to 4.65 and 4.54 to 4.63,
because reducing film only ever raises contrast. The compromise their comments
described is gone.

## Tool calibration

At a 5x5 window the tool returns orange-deep's previously recorded figures
exactly (4.54 at 0.40, 4.50 at 0.45, 4.39 at 0.60) and blue's within 0.03. That
is the evidence it measures the same thing the earlier bands were tuned against.

## Deliberate deviations

- `panel-forest` was re-solved to 0.62 rather than the 0.56 first recorded on
  the ticket, because #84 changed its parent colour and therefore its fill.

## Open questions

- Whether the tool becomes a `commands` entry in the delivery config. It is a
  measurement aid rather than a pass/fail gate, so it may not belong there.
- What tolerance counts as one texture. Every band lands within 0.11 of target;
  nothing in the repository sets a precedent for the allowed spread.
