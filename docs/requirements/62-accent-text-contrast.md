# #62 — Make accent-coloured text meet AA on every band it sits on

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/62
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/66
- Parent epic: none
- Delivery unit: single ticket
- Requirement version: 1

## Objective

Every use of `--color-accent` as a text colour reaches WCAG 2.1 AA, so section
eyebrows, numbered steps, tertiary links, and contact form labels are legible on
the bands the design draws them on.

## Scope

- Add `--color-accent-deep`, the accent at 82% toward black, for text.
- Point `EYEBROW_TONE.accent` and `TEXT_LINK_TONE.accent` at it.
- Move the eleven hand-written `text-accent` spans that bypass the primitive.
- Change the Meet Dewey blue-band eyebrow from `sky` to `ice`.
- Add a contrast gate to `design/tokens/verify/check.mjs`.
- Add a source guard so the bare accent cannot return as a text colour.
- Update the audit table and the resolved open question in `design/tokens/`.

## Out of scope

- Changing `--color-accent`, or any band, panel fill, or focus ring derived
  from it.
- The hero H1 at 2.51:1 on the brand band. OPEN-QUESTIONS.md question 1.
- The `Placeholder` primitive's tag at 4.17:1. Prototype scaffolding, removed
  with the real content.
- Consolidating the eleven hand-written spans onto the `Eyebrow` primitive.
- Non-text contrast, WCAG 1.4.11.

## Behavioral scenarios

### SCN-001 — Accent eyebrows are legible on every light band

Given a reader is on any route
When an eyebrow set in the accent tone is displayed
Then its text contrasts with the band behind it by at least 4.5:1
And this holds on the white page fill, the cream surface fill, and the blue tint fill

### SCN-002 — The selected row's numeral is legible on the gold fill

Given a reader is viewing a selector panel on the delivery model or Meet Dewey page
And one of its rows is selected, so that row is filled gold
When the numeral for the selected row is displayed
Then it contrasts with the gold fill by at least 4.5:1
And the numerals for the unselected rows contrast with the cream fill by at least 4.5:1

### SCN-003 — Accent links are legible

Given a reader is on a practice detail page carrying a tertiary link in the accent tone
When the link is displayed
Then its label and its trailing chevron contrast with the band behind them by at least 4.5:1

### SCN-004 — The footer is legible on every route

Given a reader has scrolled to the footer on any of the 15 routes
When the four column headings are displayed
Then each contrasts with the footer fill by at least 4.5:1

### SCN-005 — Contact's form labels are legible

Given a reader is on the contact page
When the form's field labels are displayed
Then each contrasts with the fill behind it by at least 4.5:1

### SCN-006 — The Meet Dewey page header eyebrow is legible

Given a reader is on the Meet Dewey page
When the eyebrow above the page heading is displayed
Then it contrasts with the blue band by at least 4.5:1
And the heading and lead on that band are unchanged

### SCN-007 — Eyebrows revealed only by interaction are legible

Given a reader opens the mega panel, the agentic AI drill-down, a client journey stage, or the mobile navigation drawer
When an eyebrow appears as a result
Then it contrasts with the fill behind it by at least 4.5:1

### SCN-008 — The accent itself does not move

Given the accent token is used as a fill rather than as text
When the tinted band, the blue band, the topic panel fills, the focus ring, and any accent-coloured artwork are displayed
Then each is visually identical to before the change

### SCN-009 — A failing text-and-band pairing fails the build

Given a text colour and a band fill are declared as a pairing the design uses
When that pairing would render below its WCAG AA threshold
Then the token check fails and names the pairing and its measured ratio

### SCN-010 — The token contract is unaffected

Given the new variant is derived from the accent rather than written as a hex
When the token check runs
Then every pinned value in the contract fixture still matches
And the fixture required no edit

### SCN-011 — The published audit reflects reality

Given a reader consults the design token documentation
When they read the accessibility audit table
Then the accent rows report the shipped ratios rather than the failing ones
And the resolved open question records the decision and its reasoning

## Non-functional requirements

- No new dependency, no bundle size change, no runtime cost. One CSS custom
  property.
- Keyboard order, focus behaviour, roles, names, and reduced-motion behaviour
  are unchanged. No markup or interaction is touched.
- The contrast gate runs inside the existing `npm run tokens:check`.
- Ratios hold at every viewport. Contrast is viewport-independent, but the DOM
  path is not, so desktop and mobile are both exercised.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit + manual | `design/tokens/verify/check.mjs`, `site/src/components/accent-contrast.test.jsx` | N/A | Canvas-composite sweep, 15 routes, desktop 1280 and mobile 375 |
| SCN-002 | Unit + manual | `design/tokens/verify/check.mjs` | N/A | All 12 selector rows selected in turn; worst 4.66 on the gold fill |
| SCN-003 | Unit + manual | `site/src/components/accent-contrast.test.jsx` | N/A | Sweep covers the six tertiary links and their chevrons |
| SCN-004 | Unit + manual | `site/src/components/accent-contrast.test.jsx` | N/A | Sweep covers the footer on all 15 routes |
| SCN-005 | Unit + manual | `site/src/components/accent-contrast.test.jsx` | N/A | Sweep covers the contact form labels |
| SCN-006 | Unit + manual | `design/tokens/verify/check.mjs` | N/A | Measured on the blue band; ice 4.55 replaces sky 3.37 |
| SCN-007 | Manual | — | N/A | Mega panel measured open at 1280; drill-down exercised over 133 eyebrow samples; mobile drawer carries no eyebrows |
| SCN-008 | Manual | — | N/A | Fills re-measured after the change: tint `#e6f1fe`, blue `#006ae0`, panel `#d1dfed`, `bg-accent` `#0073f4`, all unchanged |
| SCN-009 | Unit | `design/tokens/verify/check.mjs` | N/A | Gate run against the pre-fix value; failed with all four ratios named |
| SCN-010 | Unit | `design/tokens/verify/check.mjs` | N/A | 39 pinned values match; `expected.json` untouched |
| SCN-011 | Manual | — | N/A | `design/tokens/README.md` audit table and OPEN-QUESTIONS question 2 updated |

E2E is not appropriate here. The repository has no E2E harness, and the
observable behaviour is a computed colour pair rather than a user journey. The
compiled-theme gate is the closest thing to an end-to-end check available and is
where the real ratios are asserted.

## Deliberate deviations

- The design proposed a source-level guard "so the eleven hand-written spans
  cannot return." It is implemented as a scan asserting the bare accent never
  appears as a text utility anywhere under `site/src`, which is broader than the
  eleven and cheaper than enumerating them.

## Open questions

- Designer sign-off on the deeper blue. Not treated as a gate, following the
  precedent recorded in OPEN-QUESTIONS.md question 15. Carried there.
- Whether the remaining palette gets `-deep` variants systematically. Question 15.
- The hero H1 at 2.51:1. Question 1, and now reported by the gate as known debt
  rather than silently absent.
