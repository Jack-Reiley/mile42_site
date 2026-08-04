# #4 — Extract the style guide into a Tailwind theme

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/4
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/6
- Parent epic: none
- Delivery unit: `unit-1-style-guide-theme`
- Requirement version: 1

## Objective

An agent or developer can build to the Mile42 design system by reading
`design/tokens/` alone, without opening a PDF, and can tell which values are
authoritative and which are inferred.

## Scope

- `design/tokens/theme.css` — the canonical Tailwind 4 `@theme` block, carrying
  the `@theme` block only so an app can import it alongside its own Tailwind
  import.
- `design/tokens/README.md` — provenance for every token, the recovery method,
  and the accessibility audit.
- `design/tokens/OPEN-QUESTIONS.md` — the designer question list.
- `design/tokens/verify/` — the `npm run tokens:check` gate, comprising a
  contract fixture (`expected.json`) and a compilation check (`check.mjs`).
- `commands.test` registered in `.agents/software-delivery.config.json`.

## Out of scope

- Applying the theme to anything.
- Loading or self-hosting the three fonts.
- Component classes.
- Any change to `copy_prototype/`.
- A reproducible PDF extraction script. Deliberately deferred; see
  Open questions.

## Behavioral scenarios

### SCN-001 — Theme compiles into usable utilities

Given `design/tokens/theme.css` and a probe file referencing every token
When the token check runs
Then Tailwind compiles without error
And a utility exists for every declared token

### SCN-002 — Type steps carry size, leading, and weight together

Given a heading token such as `--text-heading-1`
When its utility is generated
Then the rule sets font-size, line-height, and font-weight from the theme
And no separate leading or weight class is required at the call site

### SCN-003 — The full palette is present

Given the style guide's six primary and ten secondary colours
When the theme is read
Then all sixteen are declared
And each carries a semantic name rather than a positional one

### SCN-004 — Both eyebrow colours exist

Given the comp uses `#0073F4` for section eyebrows and `#2F1E14` for the "YOU LEAVE WITH:" eyebrow
When an implementer looks for an eyebrow colour
Then two distinct tokens exist
And the README states which context each belongs to

### SCN-005 — Every token declares provenance

Given any token in the theme
When its entry is read in `README.md`
Then it is marked `measured`, `derived`, or `INFERRED`
And the derived and inferred entries name their source or reasoning

### SCN-006 — Inferred values are unmistakable

Given a developer or agent reading only `design/tokens/`
When they encounter a value absent from the style guide, such as letter-spacing or a breakpoint
Then it is visibly marked as inferred at the point of use
And they can act on it without believing the designer specified it

### SCN-007 — Gaps become questions rather than silent guesses

Given the guide omits interaction states, spacing scale, and card/form/nav specs
When `OPEN-QUESTIONS.md` is read
Then each gap appears as a specific answerable question
And the two float-ambiguous hexes are listed for confirmation

### SCN-008 — The theme is importable without modification

Given an app that already imports Tailwind
When it imports `theme.css`
Then the theme applies with no duplicate Tailwind import and no edits to the file

### SCN-009 — Contrast is recorded for the core pairings

Given the guide gives no accessibility guidance
When the README is read
Then contrast ratios are recorded for ink-on-cream, ink-on-green, blue-on-white, and black-on-yellow
And any pairing below WCAG AA is flagged as a question, not silently shipped

## Non-functional requirements

- Compiles under Tailwind 4.3.3.
- No build step, no generator, no JSON intermediate in the authoring path. The
  file a human edits is the file Tailwind reads.
- `design/tokens/` is comprehensible without opening either PDF.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Integration | `design/tokens/verify/check.mjs` | N/A | — |
| SCN-002 | Integration | `design/tokens/verify/check.mjs` | N/A | Compiled `.text-heading-1` sets all three properties |
| SCN-003 | Integration | `design/tokens/verify/check.mjs` + `design/tokens/verify/expected.json` | N/A | 18 colour tokens pinned in the fixture |
| SCN-004 | Integration | `design/tokens/verify/expected.json` | N/A | `--color-accent` and `--color-ink` both pinned; README documents each context |
| SCN-005 | Manual | — | N/A | Provenance tables in `design/tokens/README.md` |
| SCN-006 | Manual | — | N/A | `INFERRED` markers inline in `theme.css` |
| SCN-007 | Manual | — | N/A | 14 questions in `design/tokens/OPEN-QUESTIONS.md` |
| SCN-008 | Integration | `design/tokens/verify/check.mjs` | N/A | Probe entry supplies the Tailwind import; `theme.css` unmodified |
| SCN-009 | Manual | — | N/A | Contrast table in `README.md`; 3 failures raised as questions 1 and 2 |

No E2E level applies: this ticket produces no rendered output. Per
`behavioral-contracts.md`, the chosen level is stated rather than inventing a
browser check for work with no UI.

## Deliberate deviations

- **The verification harness gained a contract fixture beyond the approved
  design.** The approved plan described a compile check only. During
  implementation a negative test showed that check is a tautology on its own:
  because it generates its probe *from* `theme.css`, a token renamed to
  `--color-brnad` still produces `bg-brnad` and passes. `expected.json` was
  added as an independent source of truth so renames and value drift fail.
  This strengthens SCN-003 and SCN-004 from manual to automated.

## Open questions

- A reproducible PDF extraction script remains out of scope, as agreed at design
  time. It becomes valuable when the designer delivers a revised PDF; worth
  filing as a follow-up then.
- 14 questions for the designer are recorded in `design/tokens/OPEN-QUESTIONS.md`.
  Three are contrast failures measured from the design as drawn, two of which
  affect the hero.
