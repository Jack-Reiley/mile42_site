# #39 — Move Agentic AI under the Engineering practice

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/39
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/44
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

The Agentic AI page is served at `/what-we-do/engineering/agentic-ai`, the old
top-level address keeps working through both a server redirect and an in-app one,
and the footer presents the page as part of Engineering rather than as a fourth
practice beside it.

## Scope

- `site/src/App.jsx`: the `PAGES` path changes; a `MOVED` table is added and
  rendered as replacing redirects ahead of the catch-all, so the catch-all cannot
  shadow the moved route.
- `site/public/_redirects`: a 301 from the old prefixed path to the new one,
  placed above the SPA fallback because Netlify takes the first match.
- `site/src/components/Footer.jsx`: the link moves into the What we do column
  under Engineering and is marked as nested, which renders it indented behind a
  rule.
- `site/src/pages/Home.jsx`, `WhatWeDo.jsx`, `Engineering.jsx`: the inbound link
  targets change.

## Out of scope

- The page's own content and layout, which is #41.
- The mega panel's Engineering column, which is #40.

## Behavioral scenarios

SCN-001 through SCN-006 are carried from the ticket unchanged.

### SCN-001 — The page is served at its new address

Given a visitor requests the Agentic AI page under the Engineering practice
When the page loads
Then the Agentic AI page is served
And its content is the same page that was previously served at the top level

### SCN-002 — A server request to the old address is redirected permanently

Given a visitor requests the old top-level Agentic AI address directly, without the app already loaded
When the server answers
Then it returns a permanent redirect to the new address
And the browser lands on the Agentic AI page

### SCN-003 — In-app navigation to the old address is redirected

Given a visitor is already on the site
When navigation inside the app targets the old address
Then the visitor is taken to the new address instead
And the old address does not remain in the browser's history to go back to

### SCN-004 — The footer presents the page as part of Engineering

Given a visitor reads the footer
When they look at the What we do column
Then Agentic AI appears beneath Engineering, visibly indented under it
And it no longer appears as a peer of the three practices

### SCN-005 — Inbound links point at the new address

Given the links to Agentic AI on Home, on What We Do, and on Engineering
When a visitor follows any of them
Then they arrive at the new address directly
And no redirect is passed through on the way

### SCN-006 — Nothing else moved

Given the rest of the site
When its routes are inspected
Then every other page is served at the address it had before

## Non-functional requirements

- The old address returns a permanent redirect rather than a soft one, so it is
  not indexed as a live page.
- The move does not change the page's title.
- No new dependency.

## Verification map

This repository has no test suite, so no scenario has automated coverage. The
server redirect is a Netlify rule and cannot be exercised by the dev server, so
SCN-002's evidence must state plainly whether a real 301 was observed on a
deploy preview or the built `_redirects` file was inspected instead.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | New address loaded in the browser |
| SCN-002 | Manual | — | N/A | Deploy-preview 301, or the built `_redirects` contents with a statement that no deploy was available |
| SCN-003 | Manual | — | N/A | In-app navigation to the old address, ending on the new one, back button not returning to it |
| SCN-004 | Manual | — | N/A | Footer What we do column showing the indent |
| SCN-005 | Manual | — | N/A | The three inbound links followed, no redirect passed through |
| SCN-006 | Manual | — | N/A | Route table compared against the previous one |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`. `lint`, `typecheck`, and `coverage` are configured as
empty strings in `.agents/software-delivery.config.json` and do not exist yet.

## Deliberate deviations

- **`_redirects` carries the `/working` prefix while `PAGES` and `MOVED` do
  not.** The router mounts under a basename and resolves root-relative paths
  against it; `_redirects` is read by Netlify rather than by the router. The
  asymmetry is deliberate and is the thing most likely to be got wrong later,
  which is why the file carries a comment saying so.
- **`npm run copy:parity` reports `/what-we-do/engineering/agentic-ai` as 117 of
  117 differing.** That is the route move itself: the prototype still serves the
  page at `/agentic-ai`, so the comparison has no counterpart route to match.
  Accepted as designed divergence and routed to a follow-up ticket; not treated
  as a pass criterion here.
- **The commit named in the ticket body does not resolve.** The branch was
  rebased after design, so `220cedc` is now `5ad47a9`.

## Open questions

- The `/working` prefix is temporary and belongs to the coming-soon splash
  (PR #18). Both redirect forms need revisiting when the site moves to the root,
  and that work is not owned here. Carried forward from the ticket unresolved.
