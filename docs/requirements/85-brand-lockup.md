# #85 — Put the supplied brand lockup in the header and on the splash

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/85
- Pull request: pending
- Parent epic: none
- Delivery unit: unit-lockup
- Requirement version: 1

## Objective

The header and the Coming Soon splash draw the supplied brand lockup instead of
a text wordmark, and the splash keeps a real, announceable heading while doing
it.

## Scope

- The header bar draws the lockup as its link home.
- The splash draws the light lockup inside its `h1`.
- Both marks are sized to whole pixels on both axes.
- Coverage for both surfaces, where none existed.
- `OPEN-QUESTIONS.md` question 12 records what the lockup answered.

## Out of scope

- The green lockup variants and whether they match the brand field. #69 owns
  that as its SCN-010.
- Favicon, social card, and any other placement of the mark.
- Clearspace, minimum size, and misuse rules. Question 12 asks for these and the
  supplied files do not answer them.
- The icon system, question 12's other half.

## Behavioral scenarios

### SCN-001 — Both surfaces carry the brand mark

Given the site header and the splash page
When either is displayed
Then it shows the supplied lockup rather than a text wordmark

### SCN-002 — The splash still has a real heading

Given a reader using assistive technology on the splash page
When they list the page's headings
Then the page has a top-level heading
And that heading is announced with the brand's name rather than as an empty heading

### SCN-003 — The mark reads as drawn

Given a display at either one or two device pixels per CSS pixel
When the lockup is rendered
Then its ring reads as a solid line rather than a soft grey one
And its strokes read at an even weight rather than visibly uneven

### SCN-004 — The header keeps the page grid

Given the header bar
When the lockup replaces the wordmark
Then the mark's left edge holds the same inset as the content column beneath it

### SCN-005 — The splash mark suits the field it sits on

Given the splash page's coloured field
When the lockup is displayed on it
Then the light variant is used rather than a variant drawn for a pale field

### SCN-006 — The open question records what landed

Given a reader consulting the design token open questions
When they read the entry about the missing logo
Then it records that the lockup arrived, where it is used, and what is still unanswered

## Non-functional requirements

- The mark must not shift layout as it loads: both axes are stated so the ratio
  is reserved before the asset arrives.
- Whole-pixel box on both axes. The asset is an exact 2:1, and a fractional box
  puts the ring's hairline off the device pixel grid.
- The header mark is a link and stays keyboard reachable with a visible focus
  treatment.
- No raster fallback. The mark ships as SVG.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/components/brand-lockup.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/components/brand-lockup.test.jsx` | N/A | — |
| SCN-003 | Manual | `site/src/components/brand-lockup.test.jsx` covers the precondition only | N/A | Browser pass at 1x and 2x |
| SCN-004 | Manual | — | N/A | Browser pass against the content column |
| SCN-005 | Unit | `site/src/components/brand-lockup.test.jsx` | N/A | — |
| SCN-006 | Manual | — | N/A | `design/tokens/OPEN-QUESTIONS.md` question 12 |

SCN-003 cannot be fully automated. Stroke rasterization is not observable from
the DOM, so the test asserts the precondition the commits reason about, that
both axes are stated as whole numbers in the asset's 2:1 ratio, and the visual
half is a manual pass.

## Deliberate deviations

- This contract was written against an implementation that already existed on
  `feature/site-logo`. The design records the behavior that work should satisfy
  rather than driving it. The sizing decisions in its commits were accepted as
  final during design.

## Open questions

- Which of the ten committed lockup variants is intended for which context. Two
  are wired up and nothing records what the rest are for.
- Whether the favicon and social card should move to the mark in a later pass.

## Known pre-existing condition

`site/src/pages/MeetDewey.test.jsx` fails on `main` and therefore on this
branch. It is unrelated to this work and is tracked as #77. It has not been
skipped, disabled or modified here.
