# #119 — Merge Client journey and Engagement model into How We Work, and retire AI-driven Products into Engineering

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/119
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/120
- Parent epic: none
- Delivery unit: U1 (shared branch `feature/113-home-rewrite` with #113, #114, #115, #117, #118, #119, #116)
- Requirement version: 2

## Objective

/how-we-work is one long page carrying the client journey and the engagement model as anchored bands; /how-we-work/delivery-model keeps its page with a summary band leading to it; AI-driven Products folds into Engineering. Every retired path 301s at the host and redirects in the app.

## Scope

- `site/src/App.jsx`, `site/src/components/Layout.jsx`, `site/public/_redirects`.
- `site/src/pages/HowWeWork.jsx` (merged), `site/src/pages/Engineering.jsx` (accelerators and reuse bands), `site/src/pages/WhatWeDo.jsx` (path cards), `site/src/pages/DeliveryModel.jsx` (one link).
- `site/src/components/Header.jsx`, `site/src/components/Footer.jsx`, `site/src/components/StageJourney.jsx` (doc comment); link edits in `Advisory.jsx`, `AgenticAi.jsx`, `PhaseZero.jsx`.
- `ClientJourney.jsx`, `EngagementModel.jsx`, `AiProducts.jsx` deleted.
- `path-magnifier-gear` un-retired, tinted sky: `site/scripts/illustrations.mjs`, the manifest, `illustrations.data.json`, the three webps.
- Nine test files updated; `routes.test.jsx` gains the redirect suite.

## Out of scope

- Any change to the Delivery model page beyond its one link.
- The Home offering trio (#113).
- An anchor into Engineering's accelerators band.
- Rewriting historical `docs/requirements/` files that name the old routes.
- A sitemap or `netlify.toml` change.

## Behavioral scenarios

### SCN-001 — How we work carries the merged bands in order

Given a reader is on /how-we-work
When they read the page from the top
Then the bands run: the hero, "Any firm can claim it executes well.", "Four stages. Four stronger positions to be in.", "The journey is the same. Where you enter is not.", "How the work gets done.", "We price for value.", "Three shapes the work takes.", "The delivery model is what makes the commercial model possible.", and "Read it, then test it."
And the bands headed "Four stages. Four stronger positions to be in.", "How the work gets done.", and "We price for value." are sections with the ids client-journey, delivery-model, and engagement-model
And each of those three opens on an h2 preceded by the eyebrow "Client journey", "Delivery model", or "Engagement model"
And no breadcrumb, second h1, or second call-to-action band appears between the hero and the closing band

### SCN-002 — The retired How we work paths land on their band in the app

Given the app is running
When it is opened at /how-we-work/client-journey or navigated there from another page
Then the location becomes /how-we-work#client-journey
And the section with id client-journey is scrolled into view
And the same holds for /how-we-work/engagement-model and the section with id engagement-model
And a link to either fragment from the header panel, the mobile drawer, or another page lands the same way

### SCN-003 — A fragment landing clears the sticky header

Given /how-we-work is opened at #client-journey, #delivery-model, or #engagement-model at desktop width
When the scroll settles and the header has condensed
Then the top edge of the named section sits below the header's bottom edge with visible clearance

### SCN-004 — The host redirects the three retired paths

Given the deployed site
When a request arrives for /how-we-work/client-journey or /how-we-work/engagement-model
Then it is answered with a 301 to /how-we-work
When a request arrives for /what-we-do/ai-products
Then it is answered with a 301 to /what-we-do/engineering
And these rules precede the single-page fallback in public/_redirects

### SCN-005 — Nothing in the app points at a retired path

Given the site source under site/src and site/public
When it is searched for /how-we-work/client-journey, /how-we-work/engagement-model, and /what-we-do/ai-products
Then the only matches are the in-app redirect table, the host redirect file, and their tests
And no route in the page table, no header or footer link, and no in-page link carries any of the three
And the app's route for /what-we-do/ai-products renders the Engineering page

### SCN-006 — Engineering carries the accelerators and the reuse argument

Given a reader is on /what-we-do/engineering
When they read past the capabilities band
Then the next band is headed "What you do not have to build from scratch." with the lead "Some of what you are about to build has been built before. Starting from zero is a choice, and it is usually the expensive one."
And under the h3 "Three forms, depending on what the work needs." it carries three h4 groups in order: "Delivery accelerators", "Client-owned products", "Market-facing products", bodies as #116 leaves them
And the band after it is headed "Reuse is why the economics work." with its two paragraphs and one link "See the engagement model" to /how-we-work#engagement-model
And the page carries no panel headed "The clearest proof is what we have built ourselves." and no mention of Blink Social
And /why-mile42 still names Blink Social and links "Meet Vickee" to /meet-vickee

### SCN-007 — What we do offers Phase Zero, Advisory, Engineering

Given a reader is on /what-we-do
When they look at the hero's path cards
Then there are three, in order: "Phase Zero" under "Not sure where to start" with the body "About a month, fixed fee, typically $10k to $30k." linking to /what-we-do/phase-zero; "Advisory"; "Engineering"
And the Phase Zero card draws the magnifier icon in the sky token with empty alt text, sized and prioritised like the other two card icons
And no card names AI products or accelerators
And the header's What we do panel and the mobile drawer list Phase Zero, Advisory, and Engineering (with Agentic AI), and nothing else

### SCN-008 — The merged page stays sound

Given /how-we-work is rendered
Then it has exactly one h1, "Execution is a system, not a sales pitch."
And in document order no heading level is skipped: h2 for every band, h3 for the four stages and the three shapes, h4 only inside a stage's detail
And every link introduced by the merge, including the entry list, the two fragment links in the header, the footer, and the delivery model button, is a real anchor reachable by keyboard
And no em dash appears in the new copy

### SCN-009 — The bands carried in from other tickets read as they left them

Given a reader is on /how-we-work
When they reach the engagement model bands
Then the shapes band reads as #118 defined it, the Phase Zero panel "Start with a pilot." reads as #115 defined it with "See how Phase Zero works" to /what-we-do/phase-zero
And within the bands from the engagement model section to the closing band, the offering is never called free and never said to cost nothing
And the argument band above still reads "The claim is free. What is not free is describing the operating model"
And StageJourney still opens each stage on selection and draws no retired artwork

### SCN-010 — Every surface still routes and lists the right links

Given the header and footer are rendered
Then the How we work panel and the footer's How we work column each carry exactly three links: Client journey to /how-we-work#client-journey, Delivery model to /how-we-work/delivery-model, Engagement model to /how-we-work#engagement-model
And /how-we-work/delivery-model still resolves as a page and its band on /how-we-work links to it with a button
And the delivery model page's reuse link reads "See engineering" and points at /what-we-do/engineering

### SCN-011 — The layout holds at desktop and phone widths

Given /how-we-work, /what-we-do, and /what-we-do/engineering are rendered at 1024px or wider
Then the ruled columns sit three across and the path cards stack beside the hero copy
Given the same pages are rendered at 375px
Then every band stacks in one column in the same order, the mobile drawer's How we work drill-in carries the three links, and nothing overflows the viewport horizontally

## Non-functional requirements

- Real `<section>` landmarks with ids, one h1, unbroken outline, real anchors, decorative card icons with empty alt.
- The scroll effect uses the default (instant) behaviour; reveal entrances stop under `prefers-reduced-motion`.
- Sky icon and eyebrows on navy as the panel already uses.
- No horizontal overflow at 375px. No em dashes in new copy.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/routes.test.jsx`, `site/src/pages/engagement-shapes.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/routes.test.jsx` | N/A | — |
| SCN-003 | Manual | — | N/A | Browser: band top versus header bottom after landing, desktop and 375px |
| SCN-004 | Unit + manual | `site/src/pages/routes.test.jsx` | N/A | One request per retired path on the deploy preview |
| SCN-005 | Unit | `site/src/pages/routes.test.jsx`, `site/src/go-live.test.jsx` | N/A | Source sweep |
| SCN-006 | Unit | `site/src/pages/DeliveryModel.test.jsx`, `site/src/pages/vickee-entry-points.test.jsx`, `site/src/pages/why-mile42-proof.test.jsx` | N/A | — |
| SCN-007 | Unit | `site/src/components/illustrations-restored.test.jsx`, `site/src/pages/phase-zero-commercial-line.test.jsx` | N/A | Visual check that the sky magnifier reads on navy |
| SCN-008 | Unit | `site/src/pages/routes.test.jsx`, `site/src/pages/engagement-shapes.test.jsx` | N/A | — |
| SCN-009 | Unit | `site/src/pages/engagement-shapes.test.jsx`, `site/src/pages/phase-zero-commercial-line.test.jsx`, `site/src/pages/handshake-homes.test.jsx` | N/A | — |
| SCN-010 | Unit | `site/src/components/Footer.test.jsx`, `site/src/pages/PhaseZero.test.jsx`, `site/src/pages/DeliveryModel.test.jsx` | N/A | — |
| SCN-011 | Manual | — | N/A | Screenshots at 1024px+ and 375px, `scrollWidth` |

## Deliberate deviations

- Contract version 2, 12 September 2026: SCN-001 names the engagement model band "We price for value." (#116); SCN-006 drops the "What we bring" eyebrow clause (#116 rule 9) and reads the accelerator bodies as #116 leaves them; SCN-007 lists Phase Zero, Advisory, and Engineering (with Agentic AI), the child sitting under Engineering on `main` and in the tree.
- This ticket's commit carries, in the merged `HowWeWork.jsx` and `Engineering.jsx`, lines the first copy pass (#116's earlier layer) rewrote on the pages it merged; they are recorded in #116's log under "Earlier layer".

## Open questions

- Whether the Phase Zero card should draw the sky-tinted mono magnifier (as built) or the coloured `magnifier-gear`.
- Whether the three-sentence delivery model summary reads as Jerry wants it.
- Whether anything should link to `#delivery-model`.
