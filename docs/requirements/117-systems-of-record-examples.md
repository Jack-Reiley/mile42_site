# #117 — Add marketing-side examples wherever the site lists systems of record

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/117
- Pull request: to be linked when the shared PR opens
- Parent epic: none
- Delivery unit: U1 (shared branch `feature/113-home-rewrite` with #113, #114, #115, #117, #118, #119, #116)
- Requirement version: 1

## Objective

Every place the site lists example systems of record names CMS, CDP, commerce, and marketing automation beside the finance and ERP examples, so a marketing or customer experience buyer sees their own systems named. The catalog drawer keeps four rows and draws CMS & CDP, CRM & marketing, Commerce, Analytics.

## Scope

- `site/src/components/CatalogDrawer.jsx`: `SOURCES` and `LABEL`.
- `site/src/components/LibrarianDiagram.jsx`: the sources part body.
- `site/src/pages/MeetVickee.jsx`: the librarian band's first body and the pillar's `benefit`.
- `site/src/pages/Home.jsx`: the second objection's closing sentence.
- `site/src/pages/vickee-entry-points.test.jsx`: the drawer assertion.

## Out of scope

- Widening the drawer's source column.
- The two single-example ERP lines on /meet-vickee.
- The Agentic AI platform table.
- Any copy-rule change (#116).

## Behavioral scenarios

### SCN-001 — The catalog drawer names the marketing-side systems

Given a reader is on /
When they look at the catalog drawer's "Your systems of record" rows
Then there are exactly four rows in this order: CMS & CDP, CRM & marketing, Commerce, Analytics
And no row reads "ERP & finance" or "Marketing & CRM"
And the "Your agents" rows are unchanged

### SCN-002 — The drawer's accessible description matches the picture

Given a reader is on / with a screen reader
When the catalog drawer is announced
Then it is one image whose name says that CMS and CDP, CRM and marketing automation, commerce, and analytics systems publish curated copies into Vickee
And the name still says agents never reach the source systems

### SCN-003 — Each row sits on its curve end

Given / is rendered at 1280px and again at 1440px
When the catalog drawer's wide layout is inspected
Then each of the four source rows sets on one line
And each row's centre sits on the end of its own curve

### SCN-004 — /meet-vickee draws the same rows

Given a reader is on /meet-vickee
When they reach the librarian diagram
Then the "Your systems of record" region lists the same four rows in the same order as the home page's drawer
And at 1280px each row sets on one line on its curve end
And below 1280px the region's part still opens with the eyebrow "Your systems of record"

### SCN-005 — The librarian band opens on the full list

Given a reader is on /meet-vickee
When they read the first body under "Every library needs a librarian."
Then it opens "CMS and CDP, CRM and marketing automation, commerce, ERP and finance, analytics: systems of record were built for controlled transactions."

### SCN-006 — The sources part opens on the full list

Given a reader is on /meet-vickee
When the librarian diagram's "Your systems of record" part is shown, in the panel at 1280px and up or in the list below it
Then its body opens "CMS and CDP, CRM and marketing automation, commerce, ERP and finance, analytics: these systems were built for controlled transactions."
And its title is still "Agents never touch the system of record."

### SCN-007 — The pillar names customer records and content first

Given a reader is on /meet-vickee
When they read the pillar "Agents never touch the system of record"
Then its body opens "Customer records, content, orders, payroll, finance:"
And "Payroll, orders, HR, finance" is not on the page

### SCN-008 — The home objection extends to CDP and commerce

Given a reader is on /
When they read the objection "Security will not let agents touch our systems of record."
Then its body ends "That holds for a CDP or a commerce platform as much as for an ERP."
And its link "How Vickee answers security" still goes to /meet-vickee

### SCN-009 — The old examples are gone

Given the site is rendered
When / and /meet-vickee are opened
Then "Marketing & CRM", "Marketing and CRM", and "Payroll, orders, HR, finance" appear on neither page
And no other page in the site contains them

### SCN-010 — Both pages stay sound

Given / and /meet-vickee are rendered
Then the heading outline of each page is what #113 and the existing Meet Vickee contract pin
And the librarian diagram's hotspots are still reachable by keyboard and still named "Your systems of record"
And no em dash appears in the new copy
And below 1280px the drawer's stacked layout lists the four rows and nothing overflows the viewport

## Non-functional requirements

- The drawer stays one `role="img"` with a complete written-out name; the /meet-vickee hotspots keep their names and focus behaviour.
- No wrap in the source rows at 1280px or 1440px on either page; no horizontal overflow at 375px.
- No em dashes in new copy.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/vickee-entry-points.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/vickee-entry-points.test.jsx` | N/A | — |
| SCN-003 | Manual | — | N/A | Browser at 1280px and 1440px: row heights on / |
| SCN-004 | Unit + manual | `site/src/components/LibrarianDiagram.test.jsx` | N/A | Browser at 1280px on /meet-vickee |
| SCN-005 | Unit | `site/src/pages/MeetVickee.test.jsx` | N/A | — |
| SCN-006 | Unit | `site/src/pages/MeetVickee.test.jsx` | N/A | — |
| SCN-007 | Unit | `site/src/pages/MeetVickee.test.jsx` | N/A | — |
| SCN-008 | Unit | `site/src/pages/vickee-entry-points.test.jsx`, `site/src/pages/homepage-restructure.test.jsx` | N/A | — |
| SCN-009 | Unit + manual | `site/src/pages/vickee-entry-points.test.jsx`, `site/src/pages/MeetVickee.test.jsx` | N/A | Repository grep for the three old strings |
| SCN-010 | Unit + manual | `site/src/components/LibrarianDiagram.test.jsx` | N/A | Browser at 375px |

## Deliberate deviations

- The drawer's fourth row is Analytics, not ERP & finance, by the design decision of 12 September 2026; ERP and finance stay in both prose lists, the pillar, and the home differentiator sentence.
- The librarian band's first body and the sources part body also carry a #116 rewrite of their second sentence; this ticket's commit takes the list, #116's the rewrite.

## Open questions

- Whether the drawer grows to five rows later so ERP & finance can return beside Analytics.
