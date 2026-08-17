# #38 — Remove the proof and partners pages

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/38
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/44
- Parent epic: none
- Delivery unit: `unit-nav-ia-cleanup`
- Requirement version: 1

## Objective

Neither the proof page nor the partners page is served, linked from the footer,
or reachable from any inbound text link, and every section that carried one of
those links keeps its own copy.

## Scope

- `site/src/App.jsx`: two `PAGES` entries and two imports removed.
- `site/src/pages/Proof.jsx` and `site/src/pages/Partners.jsx` deleted.
- `site/src/components/Footer.jsx`: the Proof and Partners links removed from the
  Company column.
- `site/src/pages/Home.jsx`: "Why organizations trust us" removed; the wrapper it
  sat in loses the bottom margin that was spacing it.
- `site/src/pages/AiProducts.jsx`: "See what we have shipped" and its paragraph
  removed.
- `site/src/pages/AgenticAi.jsx`: "See our partners" removed; the paragraph above
  it loses the bottom margin that was spacing it.

## Out of scope

- Any decision about whether either page returns later. No placeholder is left
  behind for it.
- A redirect for either path. Its absence is deliberate: the designed site is
  mounted under `/working` behind the coming-soon splash, so neither URL has ever
  been public and nothing outside the app can hold a link to it. This is the
  deliberate difference from #39, which does add a 301 because that page was
  reachable.

## Behavioral scenarios

SCN-001 through SCN-006 are carried from the ticket unchanged.

### SCN-001 — Neither page is served

Given the site is running
When a visitor requests the proof path or the partners path
Then no page is served for either
And the visitor is taken to the home page rather than shown a broken or empty page

### SCN-002 — The footer no longer offers either page

Given a visitor on any page
When they read the footer
Then no link to proof or partners appears in any column

### SCN-003 — No route links to either path

Given every page of the site
When its links are inspected
Then none of them resolves to the proof path or the partners path

### SCN-004 — Home keeps its copy without the link

Given the section on Home that carried "Why organizations trust us"
When a visitor reads it
Then the section's own copy is unchanged
And the link is gone, with no gap left where it sat

### SCN-005 — AI-driven Products keeps its proof section

Given the proof section on the AI-driven Products page
When a visitor reads it
Then its eyebrow, heading, and body are unchanged
And "See what we have shipped" is gone

### SCN-006 — Agentic AI keeps its multi-model paragraph

Given the paragraph on Agentic AI about staying multi-model and partner-literate
When a visitor reads it
Then the paragraph is present
And "See our partners" is gone, with no gap left where it sat

## Non-functional requirements

- No redirect is added, and the absence is deliberate rather than an oversight.
- No route table entry, footer column, or page section is left half-removed.
- No new dependency.

## Verification map

This repository has no test suite, so no scenario has automated coverage.
`lint`, `typecheck`, and `coverage` are configured as empty strings in
`.agents/software-delivery.config.json` and therefore do not exist yet.

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Both paths requested in the browser, landing on home |
| SCN-002 | Manual | — | N/A | Footer inspected on a rendered page |
| SCN-003 | Manual | — | N/A | Source-wide search for both paths across `site/src` returning nothing |
| SCN-004 | Manual | — | N/A | Home section captured, surviving copy and no spacing gap |
| SCN-005 | Manual | — | N/A | AI-driven Products proof section captured |
| SCN-006 | Manual | — | N/A | Agentic AI multi-model paragraph captured |

Gates run: `npm run build`, `npm run copy:build`, `npm run tokens:check`,
`npm run copy:parity`.

## Deliberate deviations

- **SCN-003 depends on #42 landing in the same unit.** #42 removes the last
  inbound proof link, on the Why Mile42 page, which this ticket does not reach.
  SCN-003 is therefore only true once both have landed. Both are in
  `unit-nav-ia-cleanup` and #42's commits precede #38's on the branch, so the
  assertion holds as shipped. If the two are ever split, #38 must merge after
  #42 or SCN-003 has to be narrowed.
- **`npm run copy:parity` is red for `/`, `/what-we-do/ai-products`, and
  `/what-we-do/engineering/agentic-ai`.** The copy prototype still carries the
  removed links. Accepted as designed divergence and routed to a follow-up
  ticket; not treated as a pass criterion here.
- **The commit named in the ticket body does not resolve.** The branch was
  rebased after design, so `8f3616b` is now `dae8be8`.

## Open questions

- Whether either page returns later is explicitly out of scope, and no
  placeholder is left behind for it. Carried forward from the ticket unresolved.
