# #113 — Rewrite the home page around the stalled AI initiative

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/113
- Pull request: to be linked when the shared PR opens
- Parent epic: none
- Delivery unit: U1 (shared branch `feature/113-home-rewrite` with #113, #114, #115, #117, #118, #119, #116)
- Requirement version: 2

## Objective

The home page opens on the buyer's problem, a stalled AI pilot, names who the firm serves, carries the three differentiators with the Vickee card, offers Phase Zero, Advisory and Engineering, lists the platforms the firm builds on, and moves the consulting-model argument to one panel above a closing call to action in its own words. The footer loses the LinkedIn link that pointed at /contact, and the share card and shell metadata say what the hero says.

## Scope

- `site/src/pages/Home.jsx`, `site/src/pages/home-hero-copy.js`, `site/index.html`, the regenerated `site/public/share-card.png` and `site/src/assets/social.data.json`.
- `site/src/components/Footer.jsx`: the LinkedIn entry removed.
- Eleven test files moved to the new copy and structure: `hero-and-argument-band`, `homepage-restructure`, `vickee-entry-points`, `vickee-trademark-retired`, `phase-zero-commercial-line`, `PhaseZero`, `illustrations-restored`, `handshake-homes`, `band-colours`, `go-live`, `Footer`.

## Out of scope

- Every other page. The later tickets in the unit own their pages.
- Retiring /what-we-do/ai-products (#119).
- A company LinkedIn page; the link is removed rather than repointed.
- Vendor logos in the platform strip.

## Behavioral scenarios

### SCN-001 — The hero states the buyer's problem

Given a reader opens the homepage
When the hero band is visible
Then the page's one h1 reads "Most AI pilots never make it past the demo."
And the lead reads "Almost every organization has run one. It demonstrated well, leadership was encouraged, and nothing changed. Mile42 exists for what comes next: getting agents into real workflows, past security review, and into daily use."
And "Start a conversation" leads to /contact and "See how we deliver" leads to /how-we-work/delivery-model
And the words "Execution, Rebuilt." do not appear in the band

### SCN-002 — The page names who it is for

Given a reader has read the hero
When the reader reaches the band directly under it
Then it states "Mile42 is who you call when an AI initiative has stalled between prototype and production, and the next attempt has to work. We work with mid-market and enterprise leaders in IT, marketing, customer experience, and operations."
And that band carries no heading of its own

### SCN-003 — The three objections, in order, each with a link

Given a reader reaches the band headed "Three things we hear on the first call."
When the reader scans it
Then three headings appear in this order:
  "Our AI pilot never made it to production."
  "Security will not let agents touch our systems of record."
  "We will tell you when the answer is not an agent."
And each carries a short body drawn from the page it links to
And the links "How we close the gap", "How Vickee answers security", and "When an agent is the wrong tool" lead to /what-we-do/engineering, /meet-vickee, and /what-we-do/engineering/agentic-ai

### SCN-004 — The Vickee card leads on the benefit

Given a reader reaches the Vickee card inside the objections band
When the reader reads it
Then its heading is "Decide what your agents are allowed to know. Then show security the audit trail."
And its body is "Vickee holds a governed, read-only copy of what your agents may know, indexes it automatically, and answers with sources attached. Agents never hold credentials to your systems of record."
And the card catalog drawer diagram, the two supporting points, and the "Meet Vickee" button to /meet-vickee are present
And the card no longer repeats the stalled-project story the hero carries

### SCN-005 — The offer is Phase Zero, Advisory, Engineering

Given a reader reaches "Three ways organizations work with us."
When the reader reads the three cards left to right
Then they are "You need a pilot", "You need clarity", "You need to execute"
And the Phase Zero card states "About a month. Fixed fee, agreed before we start, typically between $10k and $30k depending on the process."
And "Explore Phase Zero", "Explore advisory", and "Explore engineering" lead to /what-we-do/phase-zero, /what-we-do/advisory, and /what-we-do/engineering
And no "You need proven solutions" card and no separate "Start with a pilot." panel appear on the page

### SCN-006 — The platform strip is text, grouped by category

Given a reader reaches the band headed "Platforms we build on."
When the reader reads it
Then five rows appear in this order: Models; Data and AI foundation; Enterprise workflow; Content and experience; Commerce
And each row names its platforms as text, with no logos or images
And the word "Partners" appears nowhere on the page

### SCN-007 — The engagement argument is one block above the close

Given a reader reaches the band immediately before the closing call to action
When the reader reads it
Then it is headed "Consulting should create momentum, not overhead."
And it opens on the conflict-of-interest charge, then how Mile42 was built differently
And it states "A senior, US-based team. The people you meet are the people who do the work."
And it lists the three engagement principles in order
And the gear-and-brain drawing sits beside the copy
And "Our engagements are built around your outcomes." and "Most firms are structured to protect their margin" appear nowhere on the page

### SCN-008 — The closing call to action uses its own words

Given a reader reaches the last band
When the reader reads it
Then its heading is "Name the process. See it working in a month."
And its lead names Phase Zero and one workflow the reader chooses
And "Start a conversation" leads to /contact
And neither "Tell us what needs to work" nor "We will tell you honestly" appears on the page

### SCN-009 — The footer has no LinkedIn link

Given a reader reaches the footer on any route
When the reader scans the Contact column
Then it offers "Start a conversation" and "Email" only
And the other columns are as #119 leaves them

### SCN-010 — The share card and shell metadata say what the hero says

Given a link to the homepage is shared, or a crawler reads the shell
When the card is rendered
Then the description is the hero lead, word for word
And the card artwork was drawn from the current heading and lead
And the card's alt text names the new heading

### SCN-011 — Artwork draws where the rewrite seated it

Given a reader opens the homepage
When every band has loaded
Then the developer drawing appears once, in the hero
And the magnifier-and-gear appears once, breaking the top edge of the Phase Zero card
And the gear-and-brain appears once, in the engagement panel
And no other illustration appears, including the retired #109 entries and the handshake

### SCN-012 — The page stays sound

Given a reader using a keyboard or assistive technology opens the homepage
When the page is read in order
Then there is exactly one h1 and no heading level is skipped
And seven bands appear in the order: hero, buyer line, objections, offer, platforms, engagement, close
And every call to action and text link is a real link with a destination, reachable by Tab
And the hero and closing bands keep the off-white text tone on the blue field

### SCN-013 — The layout holds at phone width

Given a reader opens the homepage at 375px wide
When the page has finished loading
Then the hero stacks copy above the drawing
And the three objections and the three offering cards stack in one column
And the magnifier on the Phase Zero card clears the card's eyebrow
And the platform rows stack term above names
And nothing overflows the viewport horizontally

## Non-functional requirements

- One h1; unbroken heading outline; every interactive element is a native link or button.
- The blue bands keep the off-white text tone on every line (4.92:1 against 4.5).
- No new images; the hero remains the page's one eager, high-priority image.
- No horizontal overflow at 375px. No em dashes in new copy. "Partners" nowhere on the page.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/hero-and-argument-band.test.jsx`, `site/src/go-live.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/hero-and-argument-band.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/pages/homepage-restructure.test.jsx` | N/A | — |
| SCN-004 | Unit | `site/src/pages/vickee-entry-points.test.jsx`, `site/src/pages/vickee-trademark-retired.test.jsx` | N/A | — |
| SCN-005 | Unit | `site/src/pages/homepage-restructure.test.jsx`, `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | — |
| SCN-006 | Unit | `site/src/pages/homepage-restructure.test.jsx` | N/A | — |
| SCN-007 | Unit | `site/src/pages/hero-and-argument-band.test.jsx` | N/A | — |
| SCN-008 | Unit | `site/src/pages/homepage-restructure.test.jsx` | N/A | — |
| SCN-009 | Unit | `site/src/components/Footer.test.jsx` | N/A | — |
| SCN-010 | Unit | `site/src/social-metadata.test.jsx` | N/A | Share card image attached to the PR |
| SCN-011 | Unit | `site/src/components/illustrations-restored.test.jsx`, `site/src/pages/handshake-homes.test.jsx` | N/A | — |
| SCN-012 | Unit + manual | `site/src/pages/homepage-restructure.test.jsx`, `site/src/pages/band-colours.test.jsx` | N/A | Keyboard pass at 1440px on the dev server |
| SCN-013 | Manual | — | N/A | Browser at 375px: stacking, magnifier clearing the eyebrow, no horizontal overflow |

## Deliberate deviations

- SCN-009 (contract version 2, 12 September 2026): "every other footer link is unchanged" reads "the other columns are as #119 leaves them", because #119 removed the AI-driven Products entry and repointed the two How we work links at fragments in the same unit.
- The commit for this ticket carries, in `Home.jsx` and the #113 test files, lines the first copy pass (#116's earlier layer) rewrote before the slice was cut: the argument body ("Mile42 was built the other way round."), the offering bodies, and the assertions that pin them. They are recorded in #116's log under "Earlier layer".
- `npm run social:build` needs `PANGOCAIRO_BACKEND=fontconfig` on macOS with sharp 0.35.3, because the prebuilt libvips resolves fonts through CoreText and ignores the script's fontconfig environment. Documenting that in the script is a follow-up.

## Open questions

- Whether the review's eight-ticket sequence gets an epic. Not needed for this ticket.
