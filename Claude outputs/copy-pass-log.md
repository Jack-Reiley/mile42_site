# Copy pass log

Ticket 5, site-wide copy pass under the rules in website-feedback-review.md Priority 4, as tightened in the Code prompt of 12 Sep 2026. Branch feature/home-rewrite-prototype, uncommitted.

Rule-1 counts are "X, not Y" and "X. Not Y." constructions in copy strings (comments excluded), counted mechanically with a regex for `, not `, `. Not ` and a line beginning `Not `.

Format per page: rule-1 count before and after, then every changed string as a before/after pair. Strings that were deleted outright are marked `(deleted)`.

Settled copy left untouched: home hero heading and lead, the buyer sentence on Home, the three differentiator titles on Home, the Vickee card heading on Home, the Phase Zero commercial rows, "What we have built" on Why Mile42, "Three shapes" on How We Work, the Vickee pillar copy on Meet Vickee, and the Privacy page.

---

## WhatWeDo (site/src/pages/WhatWeDo.jsx)

Rule-1 count: before 0, after 0.

Component change to make rule 9 possible: `FeaturePanel` in site/src/components/primitives.jsx now renders its eyebrow only when one is passed. No copy in the component changed.

before: Core practice
after: (deleted, rule 9)

before: Most of what we build now runs on agentic AI: systems that take action inside real workflows, connected to real data, with governance the business can trust. It is the thread through advisory, engineering, and the products we ship.
after: Most of what we build now runs on agentic AI: systems that take action inside real workflows, with governance the business can trust. It runs through advisory, engineering, and the products we ship.

before: Offering · Phase Zero
after: (deleted, rule 9)

before: Name your messiest, most manual workflow. We assess the readiness around it, build a working solution on it, and hand you a sequenced roadmap of what comes next. It runs in parallel to production, it is reversible on day one, and it proves something against a number you already recognize.
after: Name your messiest, most manual workflow. We assess the readiness around it, build a working solution on it, and hand you a sequenced roadmap of what comes next. It runs beside production and is reversible on day one. What it proves, it proves against a number you already recognize.

before: Describe the situation in your own words. The right starting point is usually obvious once we hear it, and so is the case where none of the three fits.
after: Explain where you are, in a few sentences. The right starting point is usually obvious once we hear it, and so is the case where none of the three fits.

Left as is: the panel note "Name a process. See it working. Map what comes next." is the offer's own line and names three of its four stages, so it is a real list rather than a rhythm triad. "We meet you at three moments" describes the three cards.

## Advisory (site/src/pages/Advisory.jsx)

Rule-1 count: before 1, after 1. The one that stays: "A legacy estate needs a sequenced path forward, not a rewrite."

before: Engagements
after: (deleted, rule 9)

before: Offering · Phase Zero
after: (deleted, rule 9)

before: Name your messiest, most manual workflow. We assess its readiness, run a working pilot beside production, and hand you a roadmap of next steps. It runs in parallel, it is reversible on day one, and it is measured against your own baseline.
after: Name your messiest, most manual workflow. We assess its readiness, run a working pilot beside production, and hand you a roadmap of next steps. It is reversible on day one, and it is measured against your own baseline.

before: Tell us what you are trying to decide.
after: What are you trying to decide?

before: Send the decision as you currently understand it, half-formed is fine. The first reply is usually a set of questions.
after: Send it as you currently understand it, half-formed is fine. The first reply is usually a set of questions.

Rule 5: "without us in the room" is kept here (OUTCOMES) as the site's one use; Home and StageJourney lose theirs below. Kept eyebrows: "How advisory works", "What you leave with" (section headers), "Advisory" on the CTA (breadcrumb-style).

## Engineering (site/src/pages/Engineering.jsx)

Rule-1 count: before 2, after 1. The one that stays: "Agents and copilots that operate inside real workflows, not demos."

before: Reusable methods, agents, workflows, and patterns built from prior client work. Not sold separately: they lower the risk and the cost of the engagement they are used in.
after: Reusable methods, agents, workflows, and patterns built from prior client work. They belong to the engagement they are used in, and they lower its risk and its cost.

before: Capabilities
after: (deleted, rule 9)

before: What we bring
after: (deleted, rule 9)

before: Committing to an outcome is difficult when every engagement starts from nothing. It becomes practical when a meaningful share of the work has been solved, tested, and proven somewhere else.
after: Committing to an outcome is difficult when every engagement starts from nothing. It becomes practical when a meaningful share of the work has already been solved and proven somewhere else.

before: Core practice
after: (deleted, rule 9)

before: A prototype only has to work once. A system has to work every time, on real data, for people who did not ask for it. Closing that gap is our core practice: agents and copilots that run inside your real workflows, connected to your real data, with the operational reality handled rather than deferred.
after: A prototype only has to work once. A system has to work every time, on real data, for people who did not ask for it. Closing that gap is our core practice: agents and copilots that run inside your real workflows and on your real data, with the operational reality handled up front.

before: Real data is messier than the sample, the integration has a constraint nobody documented, and adoption turns on a team whose incentives were never part of the plan. Engineering is the practice of closing that distance and staying accountable for whether it works.
after: Real data is messier than the sample. The integration has a constraint nobody documented, and adoption turns on a team whose incentives were never part of the plan. Engineering is the practice of closing that distance and staying accountable for whether it works.

before: Bring the thing that has to ship.
after: Show us what has to ship.

before: Describe what has to work and what is in the way. If it is not our kind of problem, you will hear that in the first reply.
after: Describe what has to work, and what is standing in the way. Expect a straight answer on whether it is our kind of problem.

Left as is: the three OFFERS and three OUTCOMES columns are layout slots. "You own the code, the IP, and the roadmap" is a real list. Kept eyebrows: "What you leave with", "Engineering" on the CTA.

## AgenticAi (site/src/pages/AgenticAi.jsx)

Rule-1 count: before 1, after 1. The one that stays: "The controls are part of the build, not a review at the end."

"We will tell you when the answer is not an agent." stays as the section H2. It is the source of the settled Home differentiator title, which links here.

before: Something real, narrow, and used by actual people, which rules out a demo.
after: Something real and narrow, used by actual people, which rules out a demo.

before: The reasoning is rarely the hard part. The engineering sits in everything around it: reaching the data where it actually lives, respecting the permissions that already exist, and behaving predictably when something upstream is slow, wrong, or unavailable.
after: The reasoning is rarely the hard part. The engineering sits in everything around it: reaching the data where it actually lives, respecting the permissions that already exist, and behaving predictably when something upstream fails.

before: We stay close to the platforms shaping enterprise AI without becoming captive to any one of them. Model capability moves quickly, pricing moves quickly, and the right choice today may not be the right choice next year.
after: We stay close to the platforms shaping enterprise AI without becoming captive to any one of them. Model capability and pricing both move quickly, and the right choice today may not be the right choice next year.

before: We design for it from the start: what data the system can reach, what actions it is permitted to take, what a human has to approve, how outputs are evaluated over time, and what audit trail exists when someone asks what happened and why.
after: We design for it from the start: what data the system can reach, what actions it is permitted to take, what your team has to approve, how outputs are evaluated over time, and what audit trail exists when someone asks what happened and why.

before: A clear human accountability point for every consequential decision.
after: A named person accountable for every consequential decision.

before: A system that works and is not used produces the same business result as one that does not work. Adoption is a constraint on the build from the first week: it shapes what gets built, who it is built with, and what it is allowed to change.
after: A system that works and is not used produces the same business result as one that does not work. Adoption is a constraint on the build from the first week: it shapes what gets built and who it is built with.

before: Capabilities
after: (deleted, rule 9)

before: Some problems are better solved by fixing a process, deleting a step, integrating two systems properly, or writing conventional software that behaves predictably every time. Reaching for an agent in those cases adds cost, latency, and a new category of failure in exchange for very little.
after: Some problems are better solved by fixing a process, deleting a step, integrating two systems properly, or writing conventional software that behaves predictably every time. Reaching for an agent in those cases adds cost and a new category of failure in exchange for very little.

before: Tell us what you are trying to automate.
after: Name the workflow that keeps stalling.

before: Describe the workflow and where it breaks. Whether an agent belongs there, what it would take, and where the risk sits are the first three things we work out.
after: Where does it break? Whether an agent belongs there, what it would take, and where the risk sits are the first three things we work out.

Left as is: the outer three clauses of the architecture lead map to the five-row list beneath it; "Three questions", "Four things", and the four launch items are real numbered lists. Kept eyebrow: "When an agent is usually the wrong tool".

## PhaseZero (site/src/pages/PhaseZero.jsx)

Rule-1 count: before 1, after 0.

before: Proof, not a proposal.
after: A working pilot on your process.

before: Offering · Phase Zero pilot
after: (deleted, rule 9)

Left as is: the commercial rows (settled), the four diagnostic questions and four PEOPLE items (four-slot diagram, each deliberately "X. Without this, Y."), the three WORTH columns (layout), and "Name a process. See it working. Map what comes next." (the offer's own line). "The rules, the edge cases, what good looks like." is a list of what context means and stays.

Tests: PhaseZero.test.jsx pins the new h1 twice. illustrations-restored.test.jsx found the Phase Zero panel column by its "Offering · Phase Zero" eyebrow and now finds it by the panel title.

## HowWeWork (site/src/pages/HowWeWork.jsx), all bands except "Three shapes"

Rule-1 count: before 3, after 1. The one that stays: the hero H1 "Execution is a system, not a sales pitch."

before: Understand, design, build, evolve. Each stage describes what we do together, and each outcome is the state it leaves you in. Every stage should leave you better off than when it started, whether or not you continue to the next one.
after: Understand, design, build, evolve. Each stage describes what we do together, and each outcome is the state it leaves you in. You should be better off at the end of every one, whether or not you continue to the next.

before: Tell us where you actually are, not where a process says you should be.
after: Tell us where you actually are, and we start there.

before: We price for value, not for effort.
after: We price for value.

before: Offering · Phase Zero
after: (deleted, rule 9)

before: How we operate is obvious within the first conversation. Start one with a problem that has to work.
after: Everything on this page can be checked in a first conversation. Start from the stage you are actually in.

Rule 5: "skin in the game" stays here as the site's one use. Left as is: "Test coverage, documentation, and the reasoning behind each decision" and "a baseline, a working solution, and a roadmap" are real lists (the delivery model's artifacts and Phase Zero's deliverables). The CTA heading "Read it, then test it." bookends the page's own pull quote and is shared with no other page. Kept eyebrows: "How we work", "Client journey", "Delivery model", "Engagement model" (section headers).

## DeliveryModel (site/src/pages/DeliveryModel.jsx)

Rule-1 count: before 1, after 1. The one that stays: "Our progress is measured by value created, not effort expended."

before: Fewer people means fewer handoffs, fewer status meetings, and less of your time spent managing us.
after: Fewer people means fewer handoffs and less of your time spent managing us.

before: This is not AI writing your systems unsupervised.
after: Every agent works under a named engineer.

before: There is a version of this claim that is marketing, and we want to be clear we are not making it.
after: There is a version of the agents claim that is marketing: AI writing your systems unsupervised. We are not making it.

before: What they do is remove the drag: the reading, the drafting, the scaffolding, the test coverage, the documentation that usually gets written last or not at all. That is a large share of any engagement, and compressing it is what creates the speed.
after: What they do is remove the drag: reading the estate, drafting plans and code, scaffolding, generating test coverage, and writing the documentation that usually gets written last or not at all. That is a large share of any engagement, and compressing it is what creates the speed.

before: A firm built around execution cannot treat every engagement as a fresh start. What we learn on your work becomes reusable methods, patterns, and components, which lowers the cost and the risk of the work that follows.
after: A firm built around execution cannot treat every engagement as a fresh start. What we learn on your work becomes reusable methods and patterns, which lowers the cost and the risk of the work that follows.

Rule 5: "blank page" stays here (REUSE, "Delivery improvements") as the site's one use. Left as is: the three HUMAN_ONLY items are a numbered list and the four BENEFITS are layout slots. Kept eyebrows: "Three things that stay with a named person", "Note on ownership".

Tests: DeliveryModel.test.jsx pins the new BENEFITS[3] body.

## MeetVickee (site/src/pages/MeetVickee.jsx), non-pillar copy only

Rule-1 count: before 0, after 0.

before: Your people know the business. Your agents scale the work. Vickee gives them shared context.
after: Your people know the business and your agents scale the work. Vickee gives them shared context.

Rule 5: "table stakes" stays in the hero H1 as the site's one use. Left as is: the three OUTCOMES statements are layout slots from the handoff; "Storage, indexing, and retrieval" and "the database, the pipeline, and the glue code" name the product's three functions and the comparison table's rows; the comparison table cells are data. Kept eyebrows: "The context layer for enterprise AI", "The whole integration, in five steps".

Tests: MeetVickee.test.jsx pins the new intro heading.

## WhyMile42 (site/src/pages/WhyMile42.jsx), "What we have built" untouched

Rule-1 count: before 1, after 1. The one that stays: the principle title "Judgment, not information", which the review names as load-bearing on this page.

Rule 8: the five principles were already a title plus one sentence each when this pass started (PRINCIPLES in the file), so no principle changed.

before: Most firms are structured to protect their margin when work goes wrong. Ours protects your result, and that one difference shapes how every engagement is scoped, staffed, and run.
after: Most firms are structured to protect their margin when work goes wrong. Ours protects your result, and that one difference shapes how every engagement is scoped and run.

before: Each of these is normal, defensible, and billable. None of them is enough.
after: Each of these is normal and billable. None of them is enough.

before: Abundance has arguably made that harder, because there are more plausible options, more pressure to act, and less agreement about which direction is right.
after: Abundance has arguably made that harder, because there are more plausible options and less agreement about which direction is right.

Left as is: the SELL and REQUIRE lists are a three-slot contrast. Kept eyebrows: "Why we exist", "What most firms sell", "What we require instead", "Tooling" (all carry copy or head a list).

## Contact (site/src/pages/Contact.jsx)

Rule-1 count: before 1, after 1. The one that stays: "A founder, not a form queue."

Rule 3: "We tell you honestly whether we can help." stays here, the one page where the pattern survives. "Tell us what needs to work." stays as this page's H1; no other page's CTA now uses it.

before: We reply with questions or a time. If the situation is clear enough, we will suggest a call. If it is not, we will ask what we would need to know.
after: We reply with questions or a time. If the situation is clear enough, we will suggest a call. Otherwise we ask what we would need to know.

before: Describe the situation in your own words. You do not need a scope, a budget, or a defined project. If we are not the right firm for it, you will hear that too.
after: Describe the situation in your own words. You do not need a budget or a defined project. If we are not the right firm for it, you will hear that too.

Left as is: "Including when the answer is no, or not yet, or not us." is the honest-no line the surviving pattern carries. "A founder" wording stays until the people ticket names one (decision 3 in the review).

## Home (site/src/pages/Home.jsx), settled parts untouched

Rule-1 count: before 1, after 1. The one that stays: "Consulting should create momentum, not overhead."

before: Enterprise AI gets stopped by risk, legal, and security more often than by engineering. The controls are part of the build: what an agent can reach, what it may do, and what audit trail exists when someone asks why. That holds for a CDP or a commerce platform as much as for an ERP.
after: Enterprise AI gets stopped by risk, legal, and security more often than by engineering. The controls are part of the build: what data an agent can reach, what actions it may take, who has to approve, and what audit trail exists when someone asks why. That holds for a CDP or a commerce platform as much as for an ERP.

before: AI strategy, integration and ingestion strategy, discovery, modernization planning, platform selection, and architecture review. We help you decide before you commit, and you leave able to defend the decision without us in the room.
after: AI strategy, integration and ingestion strategy, discovery, modernization planning, platform selection, and architecture review. We help you decide before you commit, and you leave able to defend the decision on your own.

before: Traditional firms make more money when a project needs more people, more meetings, and more time. That is a conflict of interest built into the billing.
after: Traditional firms make more money when a project needs more people and more time. That is a conflict of interest built into the billing.

Left as is: the three PRINCIPLES are a numbered list; the three offering kickers carry audience copy; the Home CTA was already its own words and is shared with no other page. The "Start a conversation" button label is a control, not body copy, and was not changed anywhere.

Tests: homepage-restructure.test.jsx pins the new advisory card close.

## Insights (site/src/pages/Insights.jsx)

Rule-1 count: before 1, after 1. The one that stays: the H1 "Arguments, not explainers." No other string on the page met a rule. The page is a blocked placeholder and its CTA is shared with no other page.

## Engineering (addendum)

before: Your team can operate, extend, and change what we built without us.
after: Your team can operate and extend what we built without us.

The same verb triad sat in StageJourney's Evolve stage; both were cut to two so the pair no longer reads as a formula.

## Components

### Header (site/src/components/Header.jsx)

Rule-1 count: before 0, after 0. No string changed. The panel eyebrows are audience copy ("Not sure where to start", "You need clarity", "You need to execute") or questions ("What happens, and in what order?"), and every body line is one sentence.

### Footer (site/src/components/Footer.jsx)

Rule-1 count: before 0, after 0. Link labels only; no string changed.

### StageJourney (site/src/components/StageJourney.jsx)

Rule-1 count: before 1, after 0.

before: We spend real time on this. Not a discovery workshop that produces a summary of what you already told us, but enough depth to make better calls under uncertainty later.
after: We spend real time on this, and it is more than a discovery workshop that summarizes what you already told us. The aim is enough depth to make better calls under uncertainty later.

before: A design that ignores adoption, operating model, or delivery risk is a preference with a diagram attached.
after: A design that ignores adoption or delivery risk is a preference with a diagram attached.

before: You should finish this stage able to explain the plan to your own leadership without us in the room.
after: You should finish this stage able to explain the plan to your own leadership without our help.

before: Evolve means you can operate, extend, and change what was built without depending on us for every decision, because the patterns and the reasoning stayed with your team. The next initiative starts from a stronger position than this one did.
after: Evolve means you can operate and extend what was built without depending on us for every decision, because the patterns and the reasoning stayed with your team. The next initiative starts from a stronger position than this one did.

Left as is: the stage intros and "You leave with" items are real lists of what each stage covers and produces.

### WhereAgentsWork (site/src/components/WhereAgentsWork.jsx)

Rule-1 count: before 0, after 0.

before: Human decision
after: Engineer’s decision

Rule 7: the pane's other labels already name the subject ("Goes to the accountable person"), and the page heading is "what stays with the engineer who owns it", so the label follows it.

### ReuseLoop (site/src/components/ReuseLoop.jsx)

Rule-1 count: before 0, after 0. No copy of its own; the five items are the Delivery model page's REUSE list, logged there.

### HardParts (site/src/components/HardParts.jsx)

Rule-1 count: before 0, after 0. No copy of its own; the four parts are the Agentic AI page's PARTS, logged there.

---

## Totals and checks

Strings changed: 56 (each `before:` line above, including the 9 eyebrows deleted under rule 9). Most changes: AgenticAi 10, Engineering 10 (9 plus the addendum), then WhatWeDo, Advisory, HowWeWork and DeliveryModel at 5 each.

Rule-1 counts after the pass, per page (before in brackets): WhatWeDo 0 (0), Advisory 1 (1), Engineering 1 (2), AgenticAi 1 (1), PhaseZero 0 (1), HowWeWork 1 (3), DeliveryModel 1 (1), MeetVickee 0 (0), WhyMile42 1 (1), Contact 1 (1), Home 1 (1), Insights 1 (1), StageJourney 0 (1), Header 0, Footer 0, WhereAgentsWork 0.

Rule 5, one use each site-wide: "table stakes" (MeetVickee hero), "blank page" (DeliveryModel REUSE), "skin in the game" (HowWeWork engagement lead), "in the room" (Advisory OUTCOMES).

Rule 10: no em dash in any copy string before or after; none introduced.

Tests: `npm run test:unit` reported 30 files, 588 tests, all passing (the same 588 as before the pass). `npm run build` completed. Test files touched: PhaseZero.test.jsx, DeliveryModel.test.jsx, MeetVickee.test.jsx, homepage-restructure.test.jsx, illustrations-restored.test.jsx. No test deleted or skipped.

---

## Earlier layer (recorded 12 September 2026 at implementation)

Strings this ticket's commit carries that predate the 12 September pass. They came from the first copy pass, described by rule in the superseded ticket body, and were already in the working tree when the pass above was logged. Each is a source hunk assigned to #116 in the commit slice whose new text no entry above covers; the text is the source line with JSX and quoting stripped, so a `before` here is what `main` reads and an `after` is what the tree reads. Strings in `Home.jsx`, `Engineering.jsx`, `HowWeWork.jsx` and the #113 test files that the earlier layer touched travel in the #113 and #119 commits instead, because those files were rewritten or merged by those tickets and the earlier layer's lines are not separable from that work; the deviation is recorded in `docs/requirements/116-copy-rules.md`. Test assertions moved by the earlier layer (`SelectorPanel.test.jsx`, `hero-and-argument-band.test.jsx`, `MeetVickee.test.jsx`, `PhaseZero.test.jsx`) are not copy and are listed in that document instead.

### site/src/components/primitives.jsx

before: eyebrow
after: /* Optional since the copy pass retired label-only eyebrows; the panel opens on its title where no audience line is left to carry. */} {eyebrow ? {eyebrow} : null

### site/src/pages/Contact.jsx

before: lead: 'We reply with questions or a time.', rest: ' If the situation is clear enough, we will suggest a call. If it is not, we will ask what we would need to know.
after: lead: 'We reply with questions or a time.', rest: ' If the situation is clear enough, we will suggest a call. Otherwise we ask what we would need to know.

before: No sequence of nurture emails. No sales development representative. Just a conversation.
after: No nurture sequence and no sales development representative, just a conversation.

### site/src/components/WhereAgentsWork.jsx

before: note="Roles, not steps. Several run at once throughout an engagement.
after: note="Several run at once throughout an engagement.

### site/src/components/VickeePillars.jsx

before: note="One platform. Every pillar is live in the product today, not a roadmap.
after: note="One platform. Every pillar is live in the product today.

### site/src/pages/Insights.jsx

before: No articles exist yet. This page and its nav item should not go live until there are at least three. An empty insights index actively damages a firm whose positioning is that it sells judgment rather than information. The headline and subhead above are candidate directions, not approved copy.
after: No articles exist yet. This page and its nav item should not go live until there are at least three. An empty insights index actively damages a firm whose positioning is that it sells judgment rather than information. The headline and subhead above are candidate directions awaiting approval.

### site/src/components/Header.jsx

before: Agents across every major role, humans accountable for judgment and outcomes.
after: Agents across every major role, a named engineer accountable for the outcome.

### site/src/components/StageJourney.jsx

before: Governance, testing, and documentation that exist because they were built in, not because someone remembered at the end.
after: Governance, testing, and documentation that exist because they were built in from the start.

before: If you bring us back, it is because you chose to, not because you are stuck.
after: If you bring us back, it is by choice.

before: We build capability, not dependence.
after: The goal is a team that does not need us.

### site/src/components/LibrarianDiagram.jsx

before: Scalability', 'Retrieval load hits Vickee, not production. Your ERP never fields a thousand exploratory queries at 2 a.m.
after: Scalability', 'Retrieval load hits Vickee. Your ERP never fields a thousand exploratory queries at 2 a.m.

before: Connectors are code, not prompts.
after: Connectors are plain code.

before: Shared map', 'The catalog shows every agent what is known, not just what it happened to ingest.
after: Shared map', 'The catalog shows every agent what is known, including what it never ingested itself.

before: Publish curated extracts into Vickee and agents work against the copy, never the source. ' +
after: Publish curated extracts into Vickee and agents work against the copy. The source is never touched. ' +

before: Auditability', 'What agents can reach is an explicit, reviewable publication decision, not a side effect of a service account’s permissions.
after: Auditability', 'What agents can reach is an explicit, reviewable publication decision instead of a side effect of a service account’s permissions.

before: Orchestrators, sub-agents, and humans.
after: Orchestrators, sub-agents, and people.

before: Humans included', 'The wiki-style admin console reads the same shelf, with browse, search, and cited answers built in.'], ['No drift', 'One platform serving orchestrators, sub-agents, and humans from the same store, so no agent carries a private fork of reality.
after: People included', 'The wiki-style admin console reads the same shelf, with browse, search, and cited answers built in.'], ['No drift', 'One platform serving orchestrators, sub-agents, and people from the same store, so no agent carries a private fork of reality.

before: Agents propose. Humans approve. Code executes.
after: Agents propose. A person approves. Code executes.

before: Proposed, never written', 'Agents propose changes in Vickee, never in the SOR.
after: Proposed, never written', 'Agents propose changes in Vickee. The SOR is never written to directly.

### site/src/pages/MeetVickee.jsx

before: Knowledge lands in a place, not a pile. Tenants isolate customers or business units, namespaces separate domains, and directories and tags organize within them. The card catalog rolls it all up so agents and admins can see what’s known at a glance.
after: Every piece of knowledge lands at an address. Tenants isolate customers or business units, namespaces separate domains, and directories and tags organize within them. The card catalog rolls it all up so agents and admins can see what’s known at a glance.

before: Built for agents, approachable to humans', benefit: 'Point an agent at Vickee and it can learn the system on its own. The API serves a task-oriented agent guide with real captured examples. Humans get a wiki-style admin console over the same data, with search and cited answers built in.
after: Built for agents, approachable to people', benefit: 'Point an agent at Vickee and it can learn the system on its own. The API serves a task-oriented agent guide with real captured examples. People get a wiki-style admin console over the same data, with search and cited answers built in.

before: Retrieval load lands on Vickee, not on production transactional systems
after: Retrieval load lands on Vickee and never on production transactional systems

before: Multi-agent systems drift when each agent carries its own context. Vickee centralizes knowledge and memory so every agent, and every human, reads from the same catalog. Update a document once and every consumer sees the change.
after: Multi-agent systems drift when each agent carries its own context. Vickee centralizes knowledge and memory so every agent, and every person, reads from the same catalog. Update a document once and every consumer sees the change.

before: One platform serving orchestrators, sub-agents, and humans from the same store
after: One platform serving orchestrators, sub-agents, and people from the same store

before: RAG framework code', 'Glue code your team owns forever.', 'A running service with an admin plane, not a library to maintain.'], ['Wiki or drive', 'Organized for humans, opaque to agents.', 'Readable by both: agent guide for machines, admin UI for people.'], ['Direct SOR access', 'Credentials in agent context, unbounded load on production, one schema change breaks every agent.', 'A governed, read-optimized copy. Agents get answers, never the keys.
after: RAG framework code', 'Glue code your team owns forever.', 'A running service with an admin plane. Nothing for your team to maintain.'], ['Wiki or drive', 'Organized for people, opaque to agents.', 'Readable by both: agent guide for machines, admin UI for people.'], ['Direct SOR access', 'Credentials in agent context, unbounded load on production, one schema change breaks every agent.', 'A governed, read-optimized copy. Agents get answers and the keys stay with you.

before: Every agent and every human works from the same live, rolled-up view of what your
after: Every agent and every person works from the same live, rolled-up view of what your

before: into Vickee and agents work against the copy, never the source.
after: into Vickee and agents work against the copy. The source is never touched.

before: Vickee is not another database to integrate. It’s the integration.
after: One API in place of the database, the pipeline, and the glue code around them.

before: The fastest way to judge a knowledge layer is to put your knowledge in it. Bring a corpus.
after: Put a real corpus in it and ask your agents a hard question. That is the whole evaluation.

### site/src/pages/PhaseZero.jsx

before: What takes the most human time?', 'Manual effort for output that barely needs judgment.
after: What takes the most of your team’s time?', 'Manual effort for output that barely needs judgment.

before: It runs beside production, never through it, and it is reversible on day one.
after: It runs beside production without touching it, and it is reversible on day one.

before: The one everyone works around, or the one eating human time for output that barely needs judgment. Name it and we will tell you whether it is a good Phase Zero.
after: The one everyone works around, or the one eating your team’s time for output that barely needs judgment. Name it. Whether it is a good Phase Zero is usually clear within one conversation.

before: One named process, not a department and not a category. The right one is usually already obvious to the people doing the work.
after: One named process, small enough to finish. The right one is usually already obvious to the people doing the work.

before: The build starts and ends with human oversight.
after: The build starts and ends with your people in charge.

before: An AI-native build, not a demo. It runs in parallel to production and is measured against the baseline from stage one.
after: An AI-native build that runs in parallel to production and is measured against the baseline from stage one.

### site/src/pages/WhyMile42.jsx

before: 
after: /* One sentence each. The longer bodies these replace argued the firm's philosophy to itself; a reader wants the habit, and can ask about the rest. */

before: title: 'Clarity over complexity', body: 'If an idea needs jargon to sound important, we have probably not expressed it clearly enough. Clear language is not cosmetic. It reflects clear thinking, and clear thinking leads to better execution. Prefer the simplest idea that remains true.' }, { title: 'Context before solutions', body: 'Good execution begins with understanding. That is especially true in an AI-native world, where context improves decisions, engineering, delivery, and the AI systems themselves. Without context, technology work becomes guesswork.' }, { title: 'Judgment, not information', body: 'AI is making information, frameworks, and generic playbooks nearly free. What does not commoditize is judgment: knowing a specific situation, making the right call under uncertainty, and standing behind what happens next.' }, { title: 'Meet you where you are', body: 'You are trying to make a decision, execute important work, reduce risk, or move faster without losing control. We start with the need you recognize, then explain the expertise required and what the work should change.' }, { title: 'Each engagement improves the next', body: 'A firm built around execution cannot treat every engagement as a blank page. What we learn becomes reusable methods, patterns, and components, which lowers the cost and the risk of the work that follows. That benefits you directly. You are not paying us to rediscover something we solved somewhere else.
after: title: 'Clarity over complexity', body: 'If an idea needs jargon to sound important, we have not expressed it clearly enough.' }, { title: 'Context before solutions', body: 'Good execution begins with understanding the situation, and without that understanding technology work is guesswork.' }, { title: 'Judgment, not information', body: 'AI is making information and playbooks nearly free, and what does not commoditize is knowing the right call for a specific situation and standing behind it.' }, { title: 'Meet you where you are', body: 'We start with the need you already recognize, then explain what the work should change.' }, { title: 'Each engagement improves the next', body: 'What we learn becomes reusable methods and patterns, so you are never paying us to rediscover something we solved elsewhere.

before: Not the ideas. Not the technology. The execution.
after: The ideas are cheap and the technology is available to everyone. Execution is the part that keeps failing.

before: The tool is not the advantage. The execution system around it is.
after: Two firms can buy the same tool. Only one of them builds the execution system around it.

before: A firm built around execution needs more than capability. It needs a way of thinking that improves decisions when the situation is uncertain and the pressure is real.
after: Capability alone does not hold up when the situation is uncertain and the pressure is real. These are the habits that do.

before: Bring us something that has to work. The argument on this page is only worth as much as what happens next.
after: The argument on this page is only worth what happens next. Send us something that has to work and judge us on that.

### site/src/pages/Advisory.jsx

before: Before a major investment, the expensive mistake is rarely choosing the wrong option. It is committing before you understand what you are committing to.
after: The expensive mistake before a major investment is usually a commitment made before anyone understood what it involved, and only rarely the wrong option.

before: If what you need is not on this list, describe the decision and we will tell you whether we can help.
after: If the decision you are facing is not on this list, describe it anyway.

before: Direction, context, and decision confidence.
after: A decision, and the reasoning behind it.

### site/src/pages/AgenticAi.jsx

before: Agents', 'Systems that take action inside a workflow, not just answer questions about it
after: Agents', 'Systems that act inside a workflow, beyond answering questions about it

before: Enterprise AI applications', 'Applications where AI is the core of how the product works, not a feature bolted on
after: Enterprise AI applications', 'Applications where AI is the core of how the product works

before: kind: 'body', text: 'Every engagement starts by understanding the work, not by selecting a technology. That is one of the firm’s operating principles and it matters more here than anywhere else, because agentic systems are unusually sensitive to context. The same architecture that works in one organization fails in another with different data, incentives, and risk tolerance.
after: kind: 'body', text: 'Every engagement starts by understanding the work. Technology selection comes after, and that order matters more here than anywhere else, because agentic systems are unusually sensitive to context. The same architecture that works in one organization fails in another with different data, incentives, and risk tolerance.

before: Go-live is the middle of the project, not the end.
after: Go-live is the middle of the project.

before: Most organizations do not have an AI strategy problem. They have an AI implementation problem. The models work. Getting them to change how work happens is the hard part. Capabilities
after: Most organizations have an AI implementation problem, whatever the strategy deck says. The models work. Getting them to change how work happens is the hard part.

before: Almost every organization has run the pilot. Someone built a prototype, it demonstrated well, leadership was encouraged, and then it stopped.
after: The pilot is usually the easy part, and the reason it stopped is rarely the model.

### site/src/pages/DeliveryModel.jsx

before: Where agents work, and what a human is still responsible for.
after: Where agents work, and what stays with the engineer who owns it.

before: AI agents work across every major role in a modern engagement. Humans stay responsible for judgment, your context, the decisions, and the outcome. These are roles in a delivery system, not sequential steps. Several run at once throughout an engagement.
after: AI agents work across every major role in a modern engagement. The engineer who owns the work stays responsible for judgment, your context, the decisions, and the outcome. These are roles in a delivery system. Several run at once throughout an engagement, so there is no order to read them in.

before: Humans provide judgment. Agents accelerate execution. We own the work.
after: People provide the judgment and agents provide the speed. We own the work.

before: The fastest way to judge a delivery model is to put a real problem in front of it. Bring one.
after: A delivery model is only checkable on a real problem. Put one in front of this one.

### site/src/pages/Engineering.jsx

before: Product engineering', 'Building and evolving a product with a roadmap, not a one-off delivery.
after: Product engineering', 'Building and evolving a product that has a roadmap and a life after launch.

before: Something important has to work. Not designed, not scoped, not piloted. Work, in production, for real users, under real constraints.
after: Something important has to work, in production, for real users. The plan and the pilot were the easy part.

before: We build capability, not dependence.
after: The plan was sound. Production disagreed.

