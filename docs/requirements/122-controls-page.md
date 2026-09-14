# #122 — Add a controls page for the audit and finance reader

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/122
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/125
- Parent epic: none
- Delivery unit: U2 (stacked on U1, `feature/122-controls-page` based on `feature/121-auditor-facing-copy`), run `2026-09-14-auditor-copy-and-controls-page`
- Requirement version: 1

## Objective

A controller, internal audit lead, CFO, or risk owner can read one page,
/meet-vickee/controls, and answer for each control what it is, how it works,
and what evidence they would receive. The page opens by saying what has not
been evidenced.

## Supersedes

This document supersedes one row of the retained-construction table in
`docs/requirements/116-copy-rules.md` SCN-001: the table gains
`/meet-vickee/controls` with the header lead "Written for the person who has to
sign off, not the person who builds it." as that route's one ", not "
construction. 116 is a versioned record and is deliberately not edited,
following the convention of 103 and 121.

## Scope

- New `site/src/pages/Controls.jsx` and `site/src/pages/Controls.test.jsx`.
- `site/src/App.jsx`: `PAGES` entry `/meet-vickee/controls`, title "How agents
  are controlled · Mile42".
- `site/src/components/Header.jsx`: the Meet Vickee entry gains `overview` and
  one `columns` entry; `PANEL_GRID` gains `1`.
- `site/src/components/Footer.jsx`: "Controls" nested under Meet Vickee in the
  Company column.
- `site/src/pages/MeetVickee.jsx` and `site/src/components/VickeePillars.jsx`:
  the buffer pillar gains `link`; the pane renders it as a `TextLink` after the
  proof box when present.
- `site/src/pages/Home.jsx`: the security differentiator gains `more`, rendered
  as a second `TextLink` on its own line.
- Tests: `Controls.test.jsx` (new), `Header.test.jsx` (new),
  `Footer.test.jsx`, `MeetVickee.test.jsx`, `homepage-restructure.test.jsx`,
  `copy-rules.test.jsx` (retained table only).

## Out of scope

- Any framework name, attestation, pen test, questionnaire, roadmap, or planned
  certification.
- Any claim not already on Meet Vickee or Agentic AI, except the exportable
  per-query log and the writeback setting, which the ticket confirms.
- Restyling any existing page; the header changes only by data.
- A redirect or sitemap entry.

## Behavioral scenarios

### SCN-001 — The controls page is reachable at its own route

Given the site is rendered
When /meet-vickee/controls is opened
Then the page renders with one h1 reading "How agents are controlled."
And the document title is "How agents are controlled · Mile42"
And the breadcrumb links to /meet-vickee and names the current page "Controls"

### SCN-002 — The honesty block comes before every control

Given /meet-vickee/controls is open
When the page is read from the top
Then the first paragraph after the header band reads exactly: "Vickee has not been through a third-party audit, and Mile42 does not yet hold a security certification. What follows is what can be evidenced today, control by control. Where something is a configuration your team chooses rather than a default, it says so."
And no h2 precedes it

### SCN-003 — Five controls, in order, each with a table

Given /meet-vickee/controls is open
When the h2 headings between the honesty block and the closing band are read
Then they are, in order: "Access control", "Change control and separation of duties", "Logging and evidence", "Monitoring and review", "When it is wrong"
And each is followed by one lead paragraph and one table
And every table's header row reads "Control", "How it works", "Evidence you receive"
And every row names a control, says how it works, and names the evidence received

### SCN-004 — The tables say what is a choice and what is a practice

Given /meet-vickee/controls is open
When the "Change control and separation of duties" table is read
Then the writeback row says writeback is off or gated by a named approver, and that which one is a setting your team chooses
When the "Monitoring and review" and "When it is wrong" tables are read
Then every row drawn from engagement practice opens "Set up during the engagement:"

### SCN-005 — The closing band invites the reader's own framework

Given /meet-vickee/controls is open
When the last band is read
Then its h2 reads "Bring your control framework."
And its lead reads "Send the questionnaire, the control list, or the questions your auditors asked last time. We will answer each one against what is on this page, and say plainly where the answer is not yet."
And its button links to /contact

### SCN-006 — The page names no framework, certification, or roadmap

Given /meet-vickee/controls is open
When all rendered text is read
Then none of "SOC 2", "SOC2", "ISO 27001", "NIST", "roadmap", or "certified" appears
And no em dash appears
And the only ", not " construction on the route is the header Lead's

### SCN-007 — The header offers Controls under Meet Vickee

Given any route is open at desktop width
When the "Meet Vickee menu" control is activated
Then a panel opens containing a link "Controls" to /meet-vickee/controls and a "Start here" link to /meet-vickee
And the "Meet Vickee" label itself still links to /meet-vickee
Given any route is open at phone width with the drawer open
When the Meet Vickee section is drilled into
Then the same Controls link is listed

### SCN-008 — The footer nests Controls under Meet Vickee

Given any route is open
When the footer's Company column is read
Then "Controls" links to /meet-vickee/controls and is listed directly after "Meet Vickee" with the nested treatment Agentic AI has under Engineering

### SCN-009 — Meet Vickee and Home each point the auditor at the page

Given /meet-vickee is open
When the pillar "Agents never touch the system of record" is selected
Then its pane contains a link "What an auditor receives" to /meet-vickee/controls
And no other pillar's pane contains that link
Given / is open
When the differentiator "Security will not let agents touch our systems of record." is read
Then it contains the link "How Vickee answers security" to /meet-vickee and the link "What an auditor receives" to /meet-vickee/controls
And the other two differentiators each keep their single link

### SCN-010 — Heading order and keyboard reach

Given /meet-vickee/controls is open
When headings are listed in document order
Then there is exactly one h1, every other heading is an h2, and no level is skipped
When the page is traversed with Tab
Then every link and button, including the breadcrumb link, the closing button, and the header's Meet Vickee caret, receives focus in reading order

## Row sources

Every table row traces to an existing line or to one of the two confirmed
facts. Line numbers are against `feature/121-auditor-facing-copy` at `e375e1f`.

| Table | Control | Source |
| --- | --- | --- |
| Access control | Scope by tenant and namespace | `MeetVickee.jsx:17` "A tenant and namespace. Nothing lands by accident." |
| Access control | Least privilege by construction | `MeetVickee.jsx:66` "Least privilege by construction: scoped by tenant, namespace, and tags" |
| Access control | Credential isolation | `MeetVickee.jsx:65` "No SOR credentials in agent context windows, prompts, or logs" |
| Change control | Governed copy | `MeetVickee.jsx:63` "Curated extracts land in Vickee, and agents work against the copy." |
| Change control | Writeback setting | Confirmed fact (ticket): off, or gated by a named approver, as a visible setting. `MeetVickee.jsx:83,87` carry the gating. |
| Change control | Deterministic connectors | `MeetVickee.jsx:83` "connectors built from plain, deterministic code. No LLM sits in the sync path" |
| Logging and evidence | Cited answers | `MeetVickee.jsx:68` (#121) "Every answer cites its sources, so a control can be evidenced rather than asserted" |
| Logging and evidence | Per-query log | Confirmed fact (ticket): exportable per-query log. `AgenticAi.jsx:116` "An audit trail sufficient to explain a specific output after the fact." |
| Monitoring and review | Continuous evaluation | `AgenticAi.jsx:114` "Evaluation that keeps running after launch." (engagement practice) |
| Monitoring and review | Review cadence | `AgenticAi.jsx:136` "A review cadence" (engagement practice) |
| Monitoring and review | Route for bad outputs | `AgenticAi.jsx:135` "A route for the people using it" (engagement practice) |
| When it is wrong | Named accountability | `AgenticAi.jsx:115` "A named person accountable for every consequential decision." (engagement practice) |
| When it is wrong | Bounded blast radius | `MeetVickee.jsx:63` "The blast radius of a misbehaving agent is a read-only knowledge layer, and your ERP never sees it." |
| When it is wrong | Reversible content | `MeetVickee.jsx:40` "Replace a file in place and the index follows"; removal confirmed at design |

## Non-functional requirements

- Semantic markup: one `h1`, `h2` per section, `nav aria-label="Breadcrumb"`,
  real `table` with `th scope="col"` and `th scope="row"` (what `CompareTable`
  emits).
- Text contrast on every band meets AA: the header is `navy` (sky breadcrumb
  10.03:1, off-white 14.64:1), the close is `orange-deep` (off-white 4.85:1).
- No new dependency, primitive, or colour token.
- Responsive at 375px, 52rem, and 64rem: the body never scrolls horizontally;
  only the tables do, inside their own container.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-001; `site/src/pages/routes.test.jsx` (renders via `PAGES`); `site/src/go-live.test.jsx` (unprefixed route) | N/A, no E2E harness | Browser: tab title and h1 at 1024px |
| SCN-002 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-002 | N/A | — |
| SCN-003 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-003 | N/A | Browser: five tables, each column header |
| SCN-004 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-004 | N/A | — |
| SCN-005 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-005 | N/A | Browser: closing band on orange-deep |
| SCN-006 | Unit (jsdom) | `site/src/pages/Controls.test.jsx` SCN-006 (page); `site/src/pages/copy-rules.test.jsx` SCN-001, SCN-012 (route, every state, header and footer included) | N/A | — |
| SCN-007 | Unit (jsdom) | `site/src/components/Header.test.jsx` (desktop caret and panel, drawer drill-in, other panels unchanged) | N/A | Browser: panel at 1024px, drawer at 375px |
| SCN-008 | Unit (jsdom) | `site/src/components/Footer.test.jsx` "the footer nests Controls under Meet Vickee" | N/A | — |
| SCN-009 | Unit (jsdom) | `site/src/pages/MeetVickee.test.jsx` "the buffer pillar points at the controls page"; `site/src/pages/homepage-restructure.test.jsx` (link table row, per-differentiator link counts) | N/A | Browser: pillar 05 pane, home middle column |
| SCN-010 | Unit + manual | `site/src/pages/Controls.test.jsx` SCN-010 (heading order) | N/A | Browser Tab traversal at 1024px: logo, three label links, three carets, Why Mile42, CTA, breadcrumb link, closing button, then footer, in that order |

jsdom has no layout, so table scroll, band contrast, and focus order are
manual. No E2E suite exists and none is added.

## Deliberate deviations

- Header band: `navy` with the `sky` breadcrumb, the design's in-contract
  fallback. On `orange-deep` the breadcrumb's two tones both fail AA (sky
  3.32:1, ink 3.19:1). The orange identity is kept in the breadcrumb mark and
  the closing band.
- The honesty block keeps the `Body` primitive's 46rem measure rather than
  running the full column, for readability at desktop widths.
- Screenshots were viewed in the browser pass but are not attached to the PR;
  the measurements in the verification report stand in for them.

## Open questions

- None. The ticket's seven assumptions were resolved at design; the two
  unresolved decisions (header fill, stacking) are resolved above.
