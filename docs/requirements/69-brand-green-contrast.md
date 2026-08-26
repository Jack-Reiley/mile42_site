# #69 — Off-white on the brand green fails AA everywhere it is used as text

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/69
- Pull request: pending
- Parent epic: none
- Delivery unit: unit-palette
- Requirement version: 1

## Objective

Every text use of the off-white on the brand green clears the WCAG AA threshold
for the size it is actually drawn at, and the gate can no longer miss a size.

## Scope

- Revise `--color-brand` from `#00b785` to `#00805d` and re-pin it.
- Flip every text surface on a brand fill to the light tone.
- Retune the brand band's grain film against the revised field.
- Regenerate the brand-tinted illustration variants.
- Declare the pairing in the gate once per size it is drawn at.
- Answer `OPEN-QUESTIONS.md` question 1.

## Out of scope

- The accent. #62 covered it.
- Non-text contrast, WCAG 1.4.11.
- The `Placeholder` primitive's tag, prototype scaffolding.
- The green logo lockup variants. See the deviation below.

## Behavioral scenarios

### SCN-001 — The public splash page is legible

Given a visitor reaches the site at its root, before launch
When the splash page is displayed
Then its heading contrasts with the green field behind it by at least its WCAG AA threshold
And the line beneath the heading contrasts by at least 4.5:1

### SCN-002 — The drill-down badges are legible

Given a reader has opened the drill-down on the Agentic AI page
When the numbered badges on the brand fill are displayed
Then each contrasts with that fill by at least 4.5:1
And this holds for both badge sizes

### SCN-003 — Withdrawn

Captured as "the brand fill itself does not move". Superseded during design: the
fill moves deliberately and SCN-006 states the behavior that replaces it.

### SCN-004 — A pairing is checked at the size it is drawn at

Given one text colour and one fill are used at more than one size
When the token check runs
Then each size is evaluated against the threshold that applies to it
And a pairing failing at any of its declared sizes is named with that size and its measured ratio

### SCN-005 — The open question records what was decided

Given a reader consults the design token open questions
When they read the entry about off-white on the brand green
Then it records the decision taken, the sizes affected, and the places it was applied

### SCN-006 — The brand green moves once, everywhere

Given the brand green is used as a band, a card fill, a rule, a badge fill and an illustration tint
When any of those surfaces is displayed
Then every one of them draws the revised green
And no surface carries the previous value from a separate hardcoded copy

### SCN-007 — Every line on a brand band takes the light tone

Given a band, card or column drawn on the brand fill
When any text on it is displayed
Then every line takes the light tone rather than ink
And each line clears the threshold for the size it is set at

### SCN-008 — The grain film does not eat the margin

Given a brand band that draws the grain film
When its text is measured against the filmed field rather than the flat token
Then the worst glyph-sized area still clears the threshold for that text's size
And the film's opacity is recorded with the measurement that set it

### SCN-009 — Generated artwork matches the revised token

Given the illustration variants that bake a brand tint at build time
When the artwork is regenerated
Then the tint matches the revised token
And no committed variant still carries the previous green

### SCN-010 — The green lockups match the brand field

Given a logo lockup drawn in the brand green
When it is placed on or beside a brand surface
Then the mark's green and the field's green are the same value

### SCN-011 — The revision is deliberate, not accidental

Given the pinned token contract
When the token check runs
Then the revised green is the pinned value
And the record states that this was a recorded revision with its reason rather than a value recovered from the PDF

## Non-functional requirements

- WCAG 2.1 AA 1.4.3 at the size each string is drawn at, including the
  responsive step where `H1` renders at 36px rather than 57px.
- Measurement against the composited field, grain included, not the flat token.
- No new runtime dependency.
- The gate fails the build on a regression rather than reporting it as debt.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Gate + manual | `design/tokens/verify/check.mjs` | N/A | Browser pass on `/` |
| SCN-002 | Gate + manual | `design/tokens/verify/check.mjs` | N/A | Drill-down opened, both badge sizes |
| SCN-003 | — | withdrawn | — | — |
| SCN-004 | Unit + gate | `site/src/pages/brand-band-tones.test.jsx` | N/A | — |
| SCN-005 | Manual | — | N/A | `OPEN-QUESTIONS.md` question 1 |
| SCN-006 | Unit | `site/src/pages/brand-band-tones.test.jsx` | N/A | — |
| SCN-007 | Unit | `site/src/pages/brand-band-tones.test.jsx` | N/A | Browser pass on all four brand bands |
| SCN-008 | Tool + unit | `design/tokens/verify/grain.mjs`, `brand-band-tones.test.jsx` | N/A | — |
| SCN-009 | Build | `npm run illustrations:build` lossless assertion | N/A | Six `path-gears` variants regenerated |
| SCN-010 | BLOCKED | — | N/A | See deviation |
| SCN-011 | Gate + unit | `design/tokens/verify/check.mjs`, `brand-band-tones.test.jsx` | N/A | — |

## Deliberate deviations

**SCN-010 could not be satisfied on this branch.** The green lockup files live
in `design/illustrations/mile42 Logos/`, which exists only on
`feature/site-logo` under #85. This branch is cut from `main`, where those files
do not yet exist, so there is nothing here to re-export. The delivery plan
recorded these two units as having no code dependency, and that was wrong.

Not deferred silently: it is raised for a decision, since the follow-up boundary
forbids deferring a failed required scenario.

## Open questions

- `--color-brand-deep` derives to `#00543d`, which is the exact value #84
  retires. Left at its existing 66% derivation so no decision is made silently.
  Raised for a decision.
