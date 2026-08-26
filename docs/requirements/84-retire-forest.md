# #84 — Retire the forest green now that the brand green has moved

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/84
- Pull request: pending
- Parent epic: none
- Delivery unit: unit-palette
- Requirement version: 1

## Objective

The palette carries one green for dark fields rather than two a reader cannot
tell apart.

## Scope

- Delete `--color-forest` from the theme, the pinned fixture and the gate.
- Repoint every use at `--color-brand`: both Why Mile42 bands, the
  ExecutionContrast chip, the panel tint and its hover, the section marks, the
  Delivery Model rule, and the ReuseLoop diagram colour.
- Remove `BAND.forest` and its grain recipe together.
- Update every comment that describes forest as a live colour.

## Out of scope

- `--color-brand` itself. #69 owns it.
- The grain opacities. #83 owns them.
- Renaming the `panel-forest` slot.

## Behavioral scenarios

### SCN-001 — The palette carries one green, not two

Given the design tokens
When the palette is read
Then there is a single green for dark fields
And no token exists whose value a reader cannot distinguish from another

### SCN-002 — Every surface that was forest still reads correctly

Given each surface that previously drew the forest green
When it is displayed
Then it draws the brand green
And any text on it clears the threshold for the size it is set at

### SCN-003 — The tightest case is a recorded decision

Given the chip that previously relied on forest for its contrast
When its new ratio is recorded
Then the decision states the ratio it moved from and to
And the note that justified the old colour no longer claims something untrue

### SCN-004 — The pinned contract drops the colour deliberately

Given the token contract fixture
When the check runs
Then forest is absent from both the theme and the fixture
And the removal is recorded as a decision rather than appearing as a deletion

### SCN-005 — Nothing still refers to a colour that no longer exists

Given the stylesheet, the components, the tests and the gate
When they are searched for the retired token
Then no reference to it remains
And no utility resolves to a token that is not declared

## Non-functional requirements

- WCAG 2.1 AA at the size each string is drawn at, on every repointed surface.
- The token leaves the theme, the fixture and the gate together, so no
  intermediate state has a utility resolving to a missing token.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit + gate | `site/src/pages/forest-retired.test.jsx` | N/A | — |
| SCN-002 | Unit + manual | `site/src/pages/forest-retired.test.jsx` | N/A | Why Mile42 and How We Work browser pass |
| SCN-003 | Unit | `site/src/pages/forest-retired.test.jsx` | N/A | — |
| SCN-004 | Unit + gate | `site/src/pages/forest-retired.test.jsx`, `design/tokens/verify/check.mjs` | N/A | — |
| SCN-005 | Unit | `site/src/pages/forest-retired.test.jsx` | N/A | — |

## Measured effect

| Site | Text | Before | After |
| --- | --- | --- | --- |
| Why Mile42 hero and closing bands | off-white | 8.71 | 4.79 |
| Why Mile42 eyebrow | sky, now off-white | 5.97 | 4.79 |
| ExecutionContrast chip | off-white | 8.71 | 4.79 |
| `panel-forest`, 18% tint over surface | ink | 10.32 | 10.99 |

## Deliberate deviations

- **Why Mile42 loses its own band colour.** Approved during design. The site
  keeps five page identities rather than six.
- **The ExecutionContrast chip spends margin**, 9:1 to 4.79:1. Approved during
  design. It clears AA at every size, and its comment now records the move.
- **The `panel-forest` slot keeps its name** while its fill is a brand mix.
  Renaming changes no pixel and is left as an open question rather than done
  quietly. A comment on `PANEL_FILL` records this.

## Findings during implementation

Why Mile42's eyebrow was `tone="sky"`, correct on forest at 5.97:1 and **3.28**
on the band it moved to, under the 4.5 a 12px eyebrow needs. `ice` is 4.43 and
also fails, so neither coloured on-dark tone survives and the eyebrow takes the
off-white, the same conclusion Meet Dewey's band reached. Caught by the browser
pass, not by the source scan, which at the time did not know Why Mile42 had
joined this band. The scan now covers it.

## Open questions

- Whether `panel-forest` keeps its name.
- `--color-brand-deep` derives to `#00543d`, the exact value retired here.
  Raised for a decision rather than resolved silently.
