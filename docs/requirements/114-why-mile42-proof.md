# #114 — Replace the Why Mile42 doctrine block with a proof section

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/114
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/120
- Parent epic: none
- Delivery unit: U1 (shared branch `feature/113-home-rewrite` with #113, #114, #115, #117, #118, #119, #116)
- Requirement version: 2

## Objective

Why Mile42 replaces the "Our doctrine" band with "What we have built.": Vickee, Blink Social, and this website, each in one column, followed by the delivery tooling the firm uses. Nothing is claimed that the repository or a live product cannot back.

## Scope

- `site/src/pages/WhyMile42.jsx`: the `BUILT` and `TOOLING` constants, the proof band, the doctrine removed.
- `site/src/pages/why-mile42-proof.test.jsx`, new.

## Out of scope

- The founders' track record and the people section (deferred to February).
- Shortening the five principles (#116).
- The Delivery model page's own tooling list.
- Vendor logos.

## Behavioral scenarios

### SCN-001 — The proof section sits where the doctrine was

Given a reader opens Why Mile42
When the reader scrolls past the hero
Then the first band after the hero is headed "What we have built."
And the band after it is headed "Our engagements are built around your outcomes."
And the hero, the engagements band, and every band below them are unchanged in structure, with their copy as #116 leaves it

### SCN-002 — Three things built, in order

Given a reader reaches "What we have built."
When the reader scans the three columns left to right
Then their titles are "Vickee", "Blink Social", "This website", in that order
And each title is a heading one level below the band's heading

### SCN-003 — Vickee is described and linked

Given a reader reads the Vickee column
When the reader reaches its end
Then it states what Vickee is: "Vickee is the governed knowledge layer that turns what your organization uniquely knows into up-to-date context people and agents can use, without exposing your systems of record."
And it states what Vickee is built with: "It is built as storage, automatic indexing, and multi-mode retrieval in one API, with data moving in and out through deterministic code connectors."
And a link "Meet Vickee" leads to /meet-vickee

### SCN-004 — Blink Social is described and not linked

Given a reader reads the Blink Social column
When the reader reaches its end
Then it states "Blink Social, our content strategy and planning tool, is built by this team and running in production. It is the plainest evidence that this team ships."
And the column carries no link

### SCN-005 — This website is described with real figures and linked

Given a reader reads the "This website" column
When the reader reaches its end
Then it states the site was built with the delivery model described on the Delivery model page
And it names the steps every change ran through: a ticket, a design with acceptance scenarios, an agent-written implementation, an independent verification, and a pull request reviewed and merged by a named person
And it gives, as numbers, the pull requests merged and the elapsed time as "under six weeks"
And a link "See the delivery model" leads to /how-we-work/delivery-model

### SCN-006 — The figures come from the repository

Given the implementation commit is being prepared
When the figures in the "This website" column are set
Then the pull request count is the number of pull requests merged into main
And the elapsed time is measured from the first commit on 4 August 2026 to the day of the commit
And the method and date of the reading are recorded beside the copy in the source

### SCN-007 — The tooling list

Given a reader reaches the end of the three columns
When the reader reads on
Then a label "Tooling" introduces a list of four rows in this order:
  Models: Claude · Codex · GrokBot
  Engineering: GitHub · React
  Coordination: Slack · custom agentic workflows and integrations
  Knowledge: Vickee
And the rows are text only, with no logos or images

### SCN-008 — The doctrine is gone

Given a reader opens Why Mile42
When the reader reads the whole page
Then "Our doctrine." appears nowhere
And "Four commitments define the firm" appears nowhere
And none of the four commitments ("Better customer outcomes are our purpose", "Technology is our domain", "Execution is our craft", "Your increased capabilities are our legacy") appears

### SCN-009 — The page stays sound

Given a reader using a keyboard or assistive technology opens Why Mile42
When the page is read in order
Then there is exactly one h1 and no heading level is skipped
And the two links in the proof section are real links with destinations, reachable by Tab
And the tooling list is announced as a list of terms and definitions
And the page still opens and closes on the brand band with the off-white text tone

### SCN-010 — The layout holds at phone width

Given a reader opens Why Mile42 at 375px wide
When the reader reaches "What we have built."
Then the three columns stack in one column, Vickee first
And each tooling row stacks the term above its definition
And nothing overflows the viewport horizontally

## Non-functional requirements

- One h1; unbroken heading outline; both links are native anchors.
- The brand bands keep the off-white tone; the page keeps exactly two brand bands.
- No new images. No horizontal overflow at 375px. No em dashes in new copy; no person named in the figures.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/why-mile42-proof.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/why-mile42-proof.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/pages/why-mile42-proof.test.jsx`, `site/src/pages/vickee-entry-points.test.jsx` | N/A | — |
| SCN-004 | Unit | `site/src/pages/why-mile42-proof.test.jsx` | N/A | — |
| SCN-005 | Unit | `site/src/pages/why-mile42-proof.test.jsx` | N/A | — |
| SCN-006 | Manual | — | N/A | Repository reading recorded below and in the PR |
| SCN-007 | Unit | `site/src/pages/why-mile42-proof.test.jsx` | N/A | — |
| SCN-008 | Unit | `site/src/pages/why-mile42-proof.test.jsx` | N/A | — |
| SCN-009 | Unit + manual | `site/src/pages/why-mile42-proof.test.jsx`, `site/src/pages/forest-retired.test.jsx`, `site/src/pages/brand-band-tones.test.jsx` | N/A | Keyboard pass on the dev server |
| SCN-010 | Manual | — | N/A | Browser at 375px |

## Deliberate deviations

- Contract version 2, 12 September 2026: SCN-001 reads "unchanged in structure, with their copy as #116 leaves it"; SCN-004's second sentence is "It is the plainest evidence that this team ships."; SCN-005 gives the merged pull request count and the elapsed time only. The requirements-contract count and the per-person counts were dropped on 12 September and the scenario was brought into line with the body and the test.
- Figures read at commit time on 12 September 2026: 42 pull requests merged into `main` (`gh pr list --state merged --base main`, cross-checked against 42 "Merge pull request" commits on `main`); 39 days from the first commit `c1da603` on 4 August 2026, stated as "under six weeks".

## Open questions

- None.
