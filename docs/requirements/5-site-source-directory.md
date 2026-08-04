# #5 — Create the site source directory with the style guide applied

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/5
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/9
- Parent epic: none
- Delivery unit: `unit-2-site-source-directory`
- Requirement version: 1

## Objective

`site/` serves all 16 routes in the design's visual language, with the extracted
theme imported rather than copied, and everything invented clearly marked.

## Scope

- `site/` — Vite 7, React 19, Tailwind 4, react-router 8; 16 routes
- Component layer mapping the prototype's ~15 recurring patterns onto the theme
- Three fonts self-hosted via `@fontsource`
- Illustration manifest plus four harvested placeholder assets
- `site/EXTRAPOLATIONS.md`
- Root `dev`/`build`/`preview` pointing at `site/`; `netlify.toml` updated
- `copy:parity` and `illustrations:placeholders` gates

## Out of scope

- Modifying `copy_prototype/` or `design/tokens/theme.css`
- New copy
- Netlify production cutover
- Fixing the design's contrast failures

## Behavioral scenarios

Scenarios SCN-001 to SCN-015 are carried verbatim from the ticket, including
design amendment 1. See the ticket for full Given/When/Then text.

## Non-functional requirements

- No external network requests for fonts or styles
- No horizontal overflow
- Single `h1`, ordered headings, landmark regions, visible focus
- Static bundle deployable on Netlify
- `theme.css` unmodified

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Integration | `site` production build | N/A | All 16 routes render; browser pass on `/` and `/contact` |
| SCN-002 | Manual | — | N/A | Browser screenshot vs `design/Homepage.pdf` |
| SCN-003 | Manual | — | N/A | Browser screenshot vs `design/Homepage.pdf` |
| SCN-004 | Integration | build resolves `@import "../../../design/tokens/theme.css"` | N/A | Zero hardcoded token values in `site/src` |
| SCN-005 | Integration | 8 woff2 bundled | N/A | No `fonts.googleapis`/`gstatic` reference |
| SCN-006 | Manual | — | N/A | `EXTRAPOLATED` markers in 20 files; `site/EXTRAPOLATIONS.md` |
| SCN-007 | Manual | — | N/A | Mobile-first construction; `scrollWidth === innerWidth` |
| SCN-008 | Integration | `site/verify/copy-parity.mjs` | N/A | All 16 routes match |
| SCN-009 | Manual | — | Browser | Submit hides form, shows success, reset restores |
| SCN-010 | Manual | — | Browser | 1 `h1`; header/main/footer landmarks present |
| SCN-011 | Integration | git diff | N/A | 0 changed files under `copy_prototype/`; its build passes |
| SCN-012 | Integration | root scripts | N/A | `dev`/`build`/`preview` target `site/` |
| SCN-013 | Integration | grep | N/A | No page imports an illustration path |
| SCN-014 | Integration | `site/verify/placeholders.mjs` | N/A | 4 of 4 flagged |
| SCN-015 | Manual | — | Browser | Spots overlap the card's top edge |

## Deliberate deviations

- **Copy parity excludes the decorative `›` glyph and compares `<main>` only.**
  The header and footer differ from the prototype by design — no "LOGO"
  placeholder, no mid-fidelity banner — and the arrow is decoration the two
  projects mark up differently.
- **Homepage card CTAs are buttons, not text links.** The comp shows pill
  buttons; the prototype used text links.
- **Illustration assets were harvested from the PDFs** and background-keyed to
  transparency. Not specified by the ticket, but "professional but fun" is
  carried by illustration and none was otherwise available.

## Open questions

- A true 375px viewport pass could not be completed: the browser extension
  reported successful resizes but `window.innerWidth` stayed at 1920. Responsive
  behaviour is verified by construction rather than by a narrow-viewport capture.
- Four illustrations cover sixteen pages, so reuse is visible.
- All items in `design/tokens/OPEN-QUESTIONS.md` remain open.
