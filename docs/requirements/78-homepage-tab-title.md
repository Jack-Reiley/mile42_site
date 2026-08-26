# #78 — The homepage tab title still carries the headline it replaced

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/78
- Pull request: pending
- Parent epic: none
- Delivery unit: unit-home-title
- Requirement version: 1

## Objective

The homepage's browser tab names the site with words the page actually shows.

## Scope

- The homepage title string in `site/src/App.jsx`.
- An assertion pinning it, so the next copy change fails a gate rather than
  drifting quietly.

## Out of scope

- Every other route's title.
- The `· Mile42` suffix and how titles are composed in `Layout.jsx`.
- The hero eyebrow itself, which is #74's.
- Meta description, Open Graph, and other metadata this repository does not set.
- The `<title>Mile42</title>` in `site/index.html`, which covers the document
  before React mounts.

## Behavioral scenarios

### SCN-001 — The tab agrees with the page

Given a reader opens the homepage
Then the browser tab names the site
And it does not carry a headline the page no longer shows

### SCN-002 — The other routes are undisturbed

Given any other route in the site
Then its title is unchanged
And every title still ends in the site suffix

### SCN-003 — The tab echoes the page's own opening words

Given a reader opens the homepage
Then the browser tab reads "Execution, Rebuilt. · Mile42"
And that phrase is the one the hero's eyebrow shows

## Non-functional requirements

- Accessibility: the document title is the first thing a screen reader
  announces on load, so it must name the site. It does.
- No performance, security, or migration implications.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Browser pass, including navigating away and back |
| SCN-002 | Unit | `site/src/pages/routes.test.jsx` (existing suffix assertion, unmodified) | N/A | — |
| SCN-003 | Unit + manual | `site/src/pages/routes.test.jsx` (added) | N/A | Tab read from the running page |

SCN-001 is manual because `Layout` writes to a real `document` on an effect; a
jsdom render of the component in isolation does not exercise it. The browser
pass covers both first paint and in-app navigation back to `/`.

## Deliberate deviations

- The pinning assertion sits in `routes.test.jsx` rather than beside the
  homepage render tests. The title is a route-table fact and that file is what
  tests the route table, so a reader looking for it finds it next to the
  existing suffix assertion.

## Known pre-existing condition

`site/src/pages/MeetDewey.test.jsx` fails on `main` and therefore on this
branch, so `npm run test:unit` reports 220 passed and 1 failed. It is #77's
defect, fixed by PR #88, which is merge order 1 in this run. Not skipped,
disabled or modified here.

## Open questions

- None.
