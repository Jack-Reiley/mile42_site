# #91 — Rewrite the Meet Dewey hero and add the shared-context introduction band

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/91
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/92
- Parent epic: none
- Delivery unit: single-ticket, independent, based on `main`
- Requirement version: 1

## Objective

A reader arriving at Meet Dewey meets the argument for a context layer before
the product. The hero states the wager and names the category, and a new
introduction band carries the case as a labelled contrast and three enterprise
outcomes, before the page explains what Dewey does.

## Scope

- The Meet Dewey hero: eyebrow, heading, description, and the handshake artwork
  moved into it.
- A new shared-context introduction band: the chess lede, the labelled contrast
  in two responsive forms, and the three outcomes.
- Registration of the `chess` illustration through the existing asset pipeline,
  plus a `handshake-704` variant for the hero.

## Out of scope

- Every section below the introduction band. "Data in. Answers out.", the
  pillars, the librarian diagram, the "Why not just...?" comparison, and the
  closing band keep their current copy and order.
- Any other page.
- The `handshake` path card icon on the navy band, which is #45.
- Colour token changes, and the global type-scale question.
- Retiring em dashes from repository comments. They are acceptable in
  repository documents and are not acceptable in public-facing copy.

## Behavioral scenarios

### SCN-001 — The hero opens on the argument, not the product name

Given a reader opens Meet Dewey
When the hero renders
Then the eyebrow reads "The context layer for enterprise AI"
And the heading reads "Intelligence is table stakes. Context is where you win."
And the description reads "Powerful models are available to everyone. Dewey turns what your organization uniquely knows into governed, up-to-date context that people and agents can use, without exposing your systems of record."
And the heading does not repeat what the description says

### SCN-002 — The page still opens the way a top-level page opens

Given a reader opens Meet Dewey
When the page renders
Then it carries exactly one `h1`
And it carries no breadcrumb navigation

### SCN-003 — The hero carries the lead artwork

Given a reader opens Meet Dewey
When the hero renders
Then the handshake illustration sits beside the hero copy
And it is loaded eagerly at high priority as the page's largest above-the-fold image
And it declares intrinsic dimensions so it does not shift the band as it loads

### SCN-004 — The introduction makes the case before the product does anything

Given a reader has read the hero
When the next band renders
Then its heading reads "Your people know the business. Your agents scale the work. Dewey gives them shared context."
And the chess illustration sits beside that copy
And the band carries no eyebrow of its own
And the band appears before the "Data in. Answers out." section

### SCN-005 — The contrast pairs correspond one to one

Given the reader is viewing the introduction band at 1024px or wider
When the contrast renders
Then the left column is labelled "Without a context layer" and the right "With Dewey"
And each of the three problems sits on the same row as the answer that resolves it
And an arrow sits between each pair, on that pair's row, whatever the length of either cell
And the pairs read, in order: scattered context to one governed context layer; unbounded source access to authorized access; a separate pipeline per agent to answers grounded in identifiable sources

### SCN-006 — Below the side-by-side breakpoint the contrast stacks as real lists

Given the reader is viewing the introduction band below 1024px
When the contrast renders
Then the two panels stack vertically
And each panel renders its items as a real list
And the arrow between them is hidden from assistive technology

### SCN-007 — Only one form of the contrast is ever present

Given the reader is viewing the introduction band at any width
When the contrast renders
Then exactly one of the two forms is displayed
And no contrast item is announced twice

### SCN-008 — The outcomes are statements, not a second headline

Given the reader reaches the end of the introduction band
When the outcomes render
Then three statements appear: "Your systems stay protected.", "Your people remain accountable.", and "Your agents act from context the enterprise can inspect, govern, and trust."
And none of them is a heading element
And the band still carries exactly one heading

### SCN-009 — Everything below the introduction is untouched

Given a reader scrolls past the introduction band
When the rest of the page renders
Then "Data in. Answers out." and the five-step integration strip are unchanged
And the pillars, the librarian diagram, the "Why not just...?" comparison, and the closing band keep their current copy and order
And the page carries seven sections

### SCN-010 — The rendered copy carries no em dashes

Given a reader opens Meet Dewey
When the page renders
Then no em dash appears anywhere in the visible text

### SCN-011 — The new illustration is served through the asset pipeline

Given the site is built
When the chess illustration is requested
Then it is served from a content-hashed file with a responsive source set
And its alternative text describes the drawing
And its intrinsic dimensions come from generated data rather than being hand-written

### SCN-012 — A fourth contrast pair cannot silently land in the wrong row

Given a future editor adds a fourth pair to the contrast data
When the desktop form renders
Then the pair is placed in its own row rather than colliding with an existing one, or the omission is obvious at the point of change

### SCN-013 — Content is never left waiting on motion

Given a reader has reduced motion enabled, or the browser does not support the reveal
When the introduction band renders
Then all of its content is visible and readable
And no content depends on JavaScript having run to become visible

### SCN-014 — The band's text meets contrast requirements

Given the introduction band renders on the surface fill and the hero on orange-deep
When their text is measured
Then every text and background pairing used meets WCAG AA

## Non-functional requirements

- Real heading hierarchy: exactly one `h1` on the page, exactly one `h2` in the
  introduction band.
- The contrast is legible to assistive technology in whichever responsive form
  is displayed, and its arrows are decorative.
- No em dashes in the rendered page copy. Repository comments and documents are
  unaffected.
- The new artwork goes through `Spot`, so it carries a content hash, a
  responsive `srcSet`, and intrinsic dimensions that prevent layout shift.
- `npm run test:unit && npm run tokens:check` passes.
- `npm run build && npm run copy:build` passes.
- No new dependency.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-003 | Unit + manual | `site/src/pages/MeetDewey.test.jsx` | N/A | Hero artwork beside copy at desktop |
| SCN-004 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-005 | Manual | — | N/A | Arrow sits on its pair's row for all three pairs at 1280px |
| SCN-006 | Unit + manual | `site/src/pages/MeetDewey.test.jsx` | N/A | Panels stacked at 375px |
| SCN-007 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-008 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-009 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-010 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-011 | Unit + build | `site/src/pages/MeetDewey.test.jsx` | N/A | Built asset carries a hashed filename |
| SCN-012 | Unit | `site/src/pages/MeetDewey.test.jsx` | N/A | — |
| SCN-013 | Unit | `site/src/components/reveal.test.jsx` | N/A | Reduced-motion pass in the browser |
| SCN-014 | Automated gate | `npm run tokens:check` | N/A | — |

This repository has no E2E harness, and `commands.coverage`, `commands.lint`,
and `commands.typecheck` are empty strings in
`.agents/software-delivery.config.json`. E2E is therefore not an available
level, and responsive and visual behavior is covered by a recorded manual
browser pass instead. Tests never parse this document, and none was generated
from it.

## Deliberate deviations

1. **The desktop contrast is a labelled group rather than list markup.** Its
   three rows must be direct children of the shared grid for the arrows to
   align against cells of differing height, which rules out a `ul` wrapper. The
   form below `lg` renders real lists, and only one form is ever present.
   Accepted 26 Aug 2026.
2. **The introduction band overrides the global type scale.** The design handoff
   sets 36/46 for the heading and 18/34 for the body; `theme.css` produces 42/32
   and marks both inferred. The handoff was followed and the override is scoped
   to this band only.
3. **Live colour tokens are used where the handoff names teal and orange.** The
   handoff's `tokens.css` predates #69 and #84: its teal is the brand green that
   #84 retired, and its orange sits a shade off `--color-orange`.
4. **The handoff's two SVG layers were not used.** The site's existing
   `handshake` webp is the same drawing already composed, and going through
   `Spot` keeps the content hash, responsive `srcSet`, and intrinsic dimensions
   that two raw SVGs would not have. The handoff's caution against flattening
   the layers is recorded here rather than silently overruled.
5. **The design handoff is not committed.** Confirmed 26 Aug 2026. Nothing in
   the build or at runtime reads it, and every illustration master the build
   consumes is tracked. Code comments cite it for provenance only, so a reviewer
   cannot open those sources from the repository.

## Open questions

1. The global type-scale question is unresolved. Correcting `theme.css` to the
   handoff's values would move all sixteen pages and belongs to its own ticket.
