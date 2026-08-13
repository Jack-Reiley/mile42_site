# #23 — Align the header with the page grid

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/23
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/25
- Parent epic: none
- Delivery unit: `unit-header-alignment`
- Requirement version: 1

## Objective

The header wordmark, the open mobile navigation, and page content share one
horizontal inset on every route and at every width.

## Scope

- `site/src/components/Header.jsx`: the bar's `px-6 md:px-12` moves to a wrapper
  outside `max-w-site`, matching `Section` and `Footer`
- The mobile panel gains `md:px-12` so it steps with the bar
- The mobile panel gains a `max-w-site` inner box for structural consistency
- `site/EXTRAPOLATIONS.md`: the header row records the corrected inset

## Out of scope

The `clamp()` page padding the ticket originally proposed, retired during design
after measurement. `Section` and `Footer`, which are already correct.
`--container-site` and every other token. Vertical rhythm. Any page's content.
`copy_prototype/`.

## Behavioral scenarios

SCN-001 through SCN-010 are carried from the ticket unchanged.

### SCN-001 — The wordmark aligns with page content on a wide viewport

Given a visitor opens any route at a viewport of 1336px or wider
When the page renders
Then the left edge of the header wordmark is the same as the left edge of the page's first heading
And the same as the left edge of the footer's content

### SCN-002 — The alignment holds through the intermediate widths

Given a visitor opens any route at 1240px, 1280px, or 1336px
Then the wordmark and the page content share a left edge at each width
And no width between 1240px and the widest tested viewport shows a discrepancy

### SCN-003 — The alignment holds below the container cap

Given a visitor opens any route at 390px, 768px, or 1024px
Then the wordmark and the page content share a left edge
And the inset is 24px below 768px and 48px at or above it

### SCN-004 — The open mobile nav aligns with the wordmark

Given a visitor is on a viewport between 768px and 1023px
When the visitor opens the menu
Then the nav links share a left edge with the wordmark above them
And with the page content below them

### SCN-005 — The mobile nav aligns on a narrow phone

Given a visitor is on a 390px viewport
When the visitor opens the menu
Then the nav links share a left edge with the wordmark and the page content

### SCN-006 — Both header borders still span the full viewport

Given a visitor opens any route
Then the header's bottom border runs edge to edge with no inset
And when the mobile menu is open, the panel's top border also runs edge to edge

### SCN-007 — The header is unchanged in every other respect

Given a visitor compares the header before and after the change
Then the wordmark, navigation links, call-to-action button, and menu button are unchanged in size, spacing, and vertical position
And the header's height is unchanged at every tested width

### SCN-008 — The menu still opens, closes, and announces its state

Given a visitor is on a viewport narrower than 1024px
When the visitor activates the menu button
Then the panel opens and the button reports itself as expanded
And activating a link closes the panel
And the current route is still marked as the current page

### SCN-009 — Nothing else on the site moved

Given the sixteen routes are rendered before and after the change
Then no page's content inset differs at any tested width
And only the header and its panel changed position

### SCN-010 — The page does not scroll sideways

Given a visitor is on a 320px viewport
When the page renders, with the menu both closed and open
Then no horizontal scrollbar appears

## Non-functional requirements

- No visual change other than the alignment. Header height, type, spacing, and
  colour are untouched.
- Keyboard operability is unchanged. The menu button, the nav links, and the
  call to action keep their focus behaviour.
- No new dependency, no token change, no new utility.
- The build is the gate. There is no test suite in this repository and this
  ticket does not add one.

## Verification map

There is no test suite in this repository, so no scenario has automated
coverage. Evidence is measured `getBoundingClientRect().left` values recorded in
the PR, plus the configured gates.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Measured left edges at 1336 and 1440 |
| SCN-002 | Manual | — | N/A | Measured left edges at 1240, 1280, 1336 |
| SCN-003 | Manual | — | N/A | Measured left edges at 390, 768, 1024 |
| SCN-004 | Manual | — | N/A | Measured nav link edge at 768 and 900, menu open |
| SCN-005 | Manual | — | N/A | Measured nav link edge at 390, menu open |
| SCN-006 | Manual | — | N/A | Header and panel bounding widths equal the viewport |
| SCN-007 | Manual | — | N/A | Header heights before and after at every tested width |
| SCN-008 | Manual | — | N/A | Pointer pass: open, `aria-expanded`, link closes panel, `aria-current` |
| SCN-009 | Manual | — | N/A | Spot check of `/`, `/agentic-ai`, `/contact` at 1440 |
| SCN-010 | Manual | — | N/A | `scrollWidth === clientWidth` at 320, menu open and closed |

Gates run: `npm run build`, `npm run tokens:check`, `npm run copy:parity`.
`lint`, `typecheck`, and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and therefore do not exist yet.

## Deliberate deviations

- **The ticket's original padding change is not implemented.** Design retired it
  after measuring that `--container-site` binds before the padding above 1336px,
  so the site already matches the What We Do comp there, and that the comps'
  `5vw` term would make tablet widths tighter rather than wider. The ticket was
  re-scoped and retitled before it reached Ready; this document follows the
  designed scope.
- **`site/EXTRAPOLATIONS.md` changes as well as `Header.jsx`.** The ticket's
  completion criteria require both, so "only `Header.jsx` changed" is read as
  the rendering claim in SCN-009 rather than as a file count.

## Open questions

- None. The padding question is retired and the 1120px detail measure is routed
  to #20.
