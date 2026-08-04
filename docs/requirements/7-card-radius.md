# #7 — Card radius is 12px, not 0

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/7
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/8
- Parent epic: none
- Delivery unit: `unit-1-card-radius`
- Requirement version: 1

## Objective

`--radius-card` matches the comp at 12px, its provenance is honest, and the
measurement mistake that caused the error is recorded so it does not recur.

## Scope

- `design/tokens/theme.css` — `--radius-card: 12px`, provenance corrected from
  `derived` to `measured`
- `design/tokens/verify/expected.json` — pinned value follows
- `design/tokens/README.md` — corrected shape row; the false square-corner claim
  removed; the radius audit and the measurement method recorded

## Out of scope

- Every other token. Buttons were independently re-verified as true pills.
- Any new token. The border ring and the shadow both derive their radius from
  the card in CSS.

## Behavioral scenarios

### SCN-001 — The card radius matches the comp

Given the card in `design/Homepage.pdf` has 12px rounded corners
When `--radius-card` is read
Then it is `12px`
And its provenance is `measured`

### SCN-002 — The gate agrees

Given the corrected token
When `npm run tokens:check` runs
Then the pinned value in `expected.json` matches `theme.css`
And the check exits zero

### SCN-003 — Documentation no longer contradicts the design

Given the README previously stated that square corners were intentional
When it is read
Then no passage claims the card is square-cornered
And the measurement method for corner radius is recorded

### SCN-004 — No other radius changed

Given only the card radius was wrong
When the theme is compared with the previous version
Then `--radius-pill` is still `9999px`
And no radius token was added or removed

## Non-functional requirements

- `npm run tokens:check` passes.
- No token added or removed; this is a value correction only.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Integration | `design/tokens/verify/expected.json` | N/A | Path geometry: straight edges inset 12px from a 1240×555 bbox |
| SCN-002 | Integration | `design/tokens/verify/check.mjs` | N/A | Exit 0; a 10px value exits 1 |
| SCN-003 | Manual | — | N/A | README shape table and audit note |
| SCN-004 | Integration | `design/tokens/verify/expected.json` | N/A | `--radius-pill` still pinned at `9999px`; 2 radius tokens before and after |

No E2E level applies: no rendered output exists yet, since #5 is not implemented.

## Deliberate deviations

None.

## Open questions

None. The value is measured from path geometry, and a full audit of every filled
path in both PDFs confirmed no other token is affected.
