# #54 — Add reveal motion to static content

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/54
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/55
- Parent epic: none
- Delivery unit: `unit-1-reveal-motion`
- Requirement version: 3

## Why there is a version 2

Version 1 animated the `<section>`. It shipped to review and was rejected on
sight, correctly: the effect was invisible in practice, and the measurements
show why rather than being a matter of taste.

A band is routinely taller than the viewport. On the homepage the offerings band
is 906px, and its animation completed after 500px of scroll — with 406px of
itself still below the fold. Every "you leave with" block and every button in
that lower half finished animating before it was ever on screen. What did happen
on screen was one rigid 900px object moving 8px across 500px of scrolling, a
rate under 2%.

So there were three faults, all following from one decision:

| Fault | Version 1 | Version 2 |
| --- | --- | --- |
| Wrong target | the band | the contents |
| Wrong range | a share of the element's height, so tall blocks finished off screen | a fixed scroll distance, so everything settles at the same height |
| Wrong amplitude | 8px, a third of a line-height | 32px vertical, 48px horizontal |

Version 1's own open questions recorded "staggering children is a follow-up if
it feels flat." It felt flat. That is now the requirement rather than a
follow-up.

## What version 3 changed

Version 2 fixed the mechanism. Version 3 is craft: the motion was correct but
coarse, and read as blocks sliding rather than a page composing itself.

- **Granularity.** A relay lets a container hand the motion to its children
  instead of taking it. Every list and card grid is now a relay, so items arrive
  one at a time; hero copy columns are relays, so an eyebrow, heading, lead and
  buttons each enter in turn. A page went from roughly five moving parts to
  twenty-three.
- **Curve.** The reveal has its own easing. `--ease-m42` is built for a button,
  where the reader has just acted and wants the result now. An entrance nobody
  asked for has to earn its place, so it is an exponential-out: most of the
  distance covered early, then a long settle.
- **Weight.** A 0.985 scale, so an element grows into place rather than sliding
  to it.
- **Timing.** 900ms and a 340px scroll range, with the stagger tightened from
  90ms to 80ms — when the unit was a whole block a long interval read as
  deliberate; with finer parts it read as waiting.

## Objective

Static content arrives with direction and sequence, so a page feels alive as it
is read. Interactive components behave as they do now.

## Scope

- Motion tokens in `design/tokens/theme.css`, marked `INFERRED`
- Element-level reveal carried by `Wrap`, so all sixteen routes inherit it
- Directional entrances for two-column blocks pairing copy with imagery
- Sequenced arrival for sibling cards
- A time-played entrance for the first band of a page, which is above the fold
- An `IntersectionObserver` fallback for engines without `animation-timeline`
- A global `prefers-reduced-motion` position covering the whole site
- Unit coverage for the structural claims

## Out of scope

- Behavioural change to the interactive components at default settings
- Parallax, illustration animation, route transition animation
- Header and footer, which are chrome rather than page content

## Behavioral scenarios

Revised on the ticket. SCN-001 to SCN-011 are carried from there by reference.

## Non-functional requirements

- No layout shift attributable to the reveal
- The hero's eager, high-priority loading from #12 preserved
- No horizontal scrollbar from content entering off the side of the page
- Failure of the fallback script degrades to no animation, never to no content
- `prefers-reduced-motion` respected sitewide with no per-call-site opt-in

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Integration + Manual | `site/src/components/reveal.test.jsx` | Browser | Section carries no reveal class; contents animate individually |
| SCN-002 | Integration | `reveal.test.jsx` | N/A | Hidden state gated behind an attribute only the observer sets |
| SCN-003 | Integration + Manual | `reveal.test.jsx` | Browser | Nothing hidden under reduced motion; StageJourney still opens |
| SCN-004 | Integration + Manual | `reveal.test.jsx` | Browser | `m42-in-solid` on both eager heroes; start opacity 1 |
| SCN-005 | Integration | `reveal.test.jsx` | N/A | `REVEAL.left` / `REVEAL.right` on the two-column blocks |
| SCN-006 | Integration + Manual | `reveal.test.jsx` | Browser | Offerings measured at progress 0.764 / 0.514 / 0.264; hero copy staggered at 0 / 80 / 160 / 240ms |
| SCN-007 | Integration | `reveal.test.jsx` | N/A | Every value resolves from a token; no literal in the rules |
| SCN-008 | Manual | — | Browser | Opacity and transform only; no layout property animated |
| SCN-009 | Integration + Manual | `reveal.test.jsx` | Browser | Fallback rules driven by an observer; see deviation |
| SCN-010 | Manual | — | Browser | Page that cannot scroll renders everything visible |
| SCN-011 | Integration + Manual | `reveal.test.jsx` | Browser | First band plays over time, since a view timeline reports it finished |

## Regression guard added

`site/src/pages/routes.test.jsx` renders all fourteen routes. It exists because
the bundler does not catch a missing import: two pages referenced a shared
constant without importing it, built cleanly, and would have thrown on first
paint. Only the page nobody opened would have shown it.

## Deliberate deviations

- **SCN-007 is met for the reveal, not for the pre-existing interaction
  motion.** Seven literal durations remain across `StageJourney`, `HardParts`,
  `WhereAgentsWork` and `ReuseLoop`: 140, 160, 180, 380, 420 and 440ms. Snapping
  them onto a scale would change their timing, and the ticket puts behavioural
  change to those components out of scope. The two constraints cannot both hold,
  so the narrower one wins and the wider claim is recorded here rather than
  quietly satisfied. Carried unchanged from version 1.

- **The global reduced-motion rule needs a second, opposite rule.** Collapsing
  durations preserves an animation's end state, which is what keeps
  StageJourney's panel opening. It does nothing to a scroll-driven animation,
  whose progress is position-based, so the reveal is switched off outright
  instead. The opacity reset alongside it covers the fallback, which hides with
  a plain declaration rather than a keyframe and so survives having its
  animation removed. Carried and extended from version 1.

- **The fallback's engine gate is verified by construction, not by running
  Firefox.** The rules and the observer were exercised in Chrome with the
  `@supports` gate lifted, which proves the mechanism; the gate's own condition
  is covered by unit tests. Nothing here was checked in Firefox itself.

## Open questions

- The 280px settle distance and the 90ms interval are judgement, not
  measurement. They answer `OPEN-QUESTIONS.md` question 14 as our extrapolation
  and stay open for the designer.
- Header and footer do not participate. If the footer should arrive with the
  rest of the page, that is a small follow-up.
