# #22 — Redesign the Engineering detail page to the detail concept comp

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/22
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/29
- Parent epic: none
- Delivery unit: `unit-engineering`
- Requirement version: 1

## Objective

`/what-we-do/engineering` stops being an extrapolation. The capabilities move
directly under the opening claim, Agentic AI is promoted out of the list into
its own panel, and the "why initiatives fail" argument moves to the end as the
closing case.

## Scope

- `site/src/pages/Engineering.jsx` rewritten to six sections, composing patterns
  #19, #20, and #21 already landed
- `path-gears` reused with one added variant pair for the 52px render
- `copy_prototype/src/pages/Engineering.jsx` carries the same copy, and **keeps**
  the fifth Systems and platforms capability
- The comp committed as `design/engineering-detail.html`
- `site/EXTRAPOLATIONS.md` records the restored capability and the darkened green

## Out of scope

`/what-we-do`, `/what-we-do/advisory`, and `/what-we-do/ai-products`.
`/agentic-ai` and `/how-we-work`, both linked from this page. Colour tokens.
Everything in `copy_prototype/` except the copy on this one route. Header,
footer, and the route table. No new illustration master.

## Behavioral scenarios

SCN-001 through SCN-022 are carried from the ticket unchanged, including the
scope addition that has this page consume `--container-detail` from #20.

## Non-functional requirements

- The one accent-as-text failure is fixed, per SCN-008 and #20's rule.
- The green accent reads at comparable weight to orange and red, per SCN-011.
  This is a quality requirement; no WCAG threshold applies to these decorative
  elements.
- The three pre-existing contrast failures stay open.
- No layout shift from the illustration.
- Keyboard operability with a visible focus indicator, including the breadcrumb.
- No new dependency.
- The build is the gate. There is no test suite in this repository.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Six `section` elements in `main`, in order |
| SCN-002 | Manual | — | N/A | Green 24×5 mark, sky "What we do / Engineering", `h1`, nothing else in the band |
| SCN-003 | Manual | — | N/A | Breadcrumb landmark, parent link, `aria-current` leaf, `aria-hidden` separator |
| SCN-004 | Manual | — | N/A | Heading, muted lead, Capabilities eyebrow, three green-ruled groups of term rows |
| SCN-005 | Automated + manual | `site/verify/copy-parity.mjs` catches a one-sided deletion | N/A | Terms per group measured: 4, 5, 3; the fifth is "Source data consolidation and readiness" with its full description |
| SCN-006 | Manual | — | N/A | `350.664px ×3` at 1440, `446.5px ×2` at 1023 with the third at the same width and its rule intact, `719px` at 767 |
| SCN-007 | Manual | — | N/A | Panel with 52px gears, "Core practice" eyebrow, heading, body, link to `/agentic-ai` |
| SCN-008 | Manual | — | N/A | Panel eyebrow ink measures 14.57 on the surface fill |
| SCN-009 | Manual | — | N/A | Tint band, "What you leave with", three checked outcomes in one column |
| SCN-010 | Manual | — | N/A | `dl` with three `dt`/`dd` pairs; badges `aria-hidden`; labels absent from the heading outline |
| SCN-011 | Manual | — | N/A | Group rule `#00a87a` measures 3.05 on white; the badge is darkened to match; the breadcrumb mark stays `#00b785` at 5.84 on navy |
| SCN-012 | Manual | — | N/A | "We build capability, not dependence." in the label column, two paragraphs, link to `/how-we-work` |
| SCN-013 | Manual | — | N/A | Sky eyebrow, heading, unchanged lead, button to `/contact` |
| SCN-014 | Manual | — | N/A | No hero eyebrow or button; the quote is gone; the promoted line is the closing band's heading |
| SCN-015 | Manual | — | N/A | At 1023 label/body and panel are single column; header nav `display: none` |
| SCN-016 | Automated + manual | `site/scripts/illustrations.mjs` | N/A | `srcSet` carries 96w, 104w, 192w, 208w from one master; `design/illustrations/` gained nothing |
| SCN-017 | Manual | — | N/A | `alt=""`, absent from the accessibility tree |
| SCN-018 | Manual | — | N/A | At 320 `scrollWidth === clientWidth`, zero overflowing elements |
| SCN-019 | Manual | — | N/A | `prefers-reduced-motion` rule present in the emitted CSS |
| SCN-020 | Manual | — | N/A | One `h1`; h1, h2, h3, h4×3, h2, h3, h2, h2 with no skipped level |
| SCN-021 | Automated | `site/verify/copy-parity.mjs` | N/A | — |
| SCN-022 | Automated | `design/tokens/verify/check.mjs` | N/A | `theme.css` unchanged by this ticket |

There is no test suite in this repository. `lint`, `typecheck`, and `coverage`
are empty strings in `.agents/software-delivery.config.json`.

## Deliberate deviations

- **All five Systems and platforms capabilities ship**, in both projects. The
  comp draws four. The rendered page differs from the comp by one visible row.
- **Green is darkened 8% on light backgrounds** — `#00a87a` — so the group rules
  and check badges read at comparable weight to the sibling pages' accents. The
  breadcrumb mark on navy keeps the pure token.
- **The feature eyebrow is ink**, per #20's rule.
- **Term rows use the Advisory values**, 16px padding and a 16px title, rather
  than the comp's 14px and 15px. One component, not two.
- **Group titles snap to 26px**, as on #21.
- Panel radius and shadow snap to the tokens; padding stays at 24/48; the
  four-column site footer stays.

## Open questions

- **The designer has not been told the fifth capability was restored.** The
  deviation is deliberate and documented, but the comp was drawn without it and
  the designer may have cut it on purpose. Worth one message rather than an
  assumption.
