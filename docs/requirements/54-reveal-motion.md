# #54 — Add subtle reveal motion to static content

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/54
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/55
- Parent epic: none
- Delivery unit: `unit-1-reveal-motion`
- Requirement version: 1

## Objective

Static content enters with a consistent, restrained motion on every page.
Interactive components behave as they do now. Nothing is hidden, delayed, or
made to feel slower.

## Scope

- Motion tokens in `design/tokens/theme.css`, marked `INFERRED`
- `--ease-m42` reconciled out of `site/src/styles/index.css` into the token file
- A CSS-only reveal carried by `Section`, with a `reveal={false}` opt-out
- A global `prefers-reduced-motion` position covering the whole site
- Unit coverage for the structural claims

## Out of scope

- Behavioural change to the interactive components at default settings
- Parallax, scroll-scrubbed effects, illustration animation
- Route transition animation

## Behavioral scenarios

SCN-001 to SCN-009 are carried verbatim from the ticket.

## Non-functional requirements

- No layout shift attributable to the reveal
- No JavaScript added for reveal behaviour
- The hero's eager, high-priority loading from #12 preserved
- `prefers-reduced-motion` respected sitewide with no per-call-site opt-in

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | Browser | Below-fold sections at opacity 0, reaching 1 on scroll |
| SCN-002 | Integration | `site/src/components/reveal.test.jsx` | N/A | No observer or timer in the component layer |
| SCN-003 | Integration + Manual | `reveal.test.jsx` | Browser | Reduced-motion declarations applied live; all sections visible, panel still opens |
| SCN-004 | Integration | `reveal.test.jsx` | N/A | `reveal={false}` present on the home hero |
| SCN-005 | Integration | `reveal.test.jsx` | N/A | Section reveals by default; interaction motion untouched |
| SCN-006 | Integration | `reveal.test.jsx` | N/A | Reveal resolves duration and easing from tokens; see deviation |
| SCN-007 | Manual | — | Browser | Opacity and transform only; no layout properties animated |
| SCN-008 | Integration | `reveal.test.jsx` | N/A | `@supports` gate; base state visible |
| SCN-009 | Manual | — | Browser | Forced non-scrolling page: every section visible |

## Deliberate deviations

- **SCN-006 is met for the reveal, not for the pre-existing interaction motion.**
  Seven literal durations remain across `StageJourney`, `HardParts`,
  `WhereAgentsWork` and `ReuseLoop`: 140, 160, 180, 380, 420 and 440ms. Snapping
  them onto a small scale would change their timing, and the ticket puts
  behavioural change to those components out of scope. The two constraints
  cannot both hold, so the narrower one wins and the wider claim is recorded
  here rather than quietly satisfied. Unifying them is a follow-up that needs
  its own approval, because it is a behavioural change.

- **The global reduced-motion rule needed a second, opposite rule.** Collapsing
  durations preserves an animation's end state, which is what keeps
  StageJourney's panel opening. It does nothing to a scroll-driven animation,
  whose progress is position-based, so the reveal is switched off outright
  instead. `animation: none` is safe there and unsafe above; the two cases are
  genuinely different and both are commented in place.

## Open questions

- Section-level reveal only. Staggering children is a follow-up if it feels flat.
- The motion character recorded here answers `OPEN-QUESTIONS.md` question 14 as
  our extrapolation, and stays open for the designer.
