# #21 — Redesign the AI-driven Products detail page to the detail concept comp

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/21
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/28
- Parent epic: none
- Delivery unit: `unit-ai-products`
- Requirement version: 1

## Objective

`/what-we-do/ai-products` stops being an extrapolation. The preamble is cut, the
three offer forms sit directly under the opening claim, and the two-card proof
band compresses into a single panel.

## Scope

- `site/src/pages/AiProducts.jsx` rewritten to six sections
- `site/src/components/Lists.jsx`: `GroupColumns` and `RuledGroup`, the one new
  pattern, built to take children so #22 can nest term rows inside it
- `path-handshake` reused with one added variant pair for the 52px render
- `copy_prototype/src/pages/AiProducts.jsx` carries the same copy
- The comp committed as `design/ai-products-detail.html`
- `site/EXTRAPOLATIONS.md` records the red correction and the snapped type

## Out of scope

`/what-we-do/engineering`, `/what-we-do`, and `/proof`. Colour tokens — the
comp's off-palette magenta is corrected to an existing token rather than added.
Everything in `copy_prototype/` except the copy on this one route. Header,
footer, and the route table. No new illustration master.

## Behavioral scenarios

SCN-001 through SCN-022 are carried from the ticket unchanged, including the
scope addition in its final comment, which has this page consume
`--container-detail` from #20.

## Non-functional requirements

- The one accent-as-text failure is fixed, per SCN-008 and #20's rule.
- The three pre-existing contrast failures stay open.
- No layout shift from the illustration.
- Keyboard operability with a visible focus indicator, including the breadcrumb.
- No new dependency.
- The build is the gate. There is no test suite in this repository.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Manual | — | N/A | Six `section` elements in `main`, in order |
| SCN-002 | Manual | — | N/A | Red 24×5 mark, sky "What we do / AI-driven Products", `h1`, nothing else in the band |
| SCN-003 | Manual | — | N/A | `nav[aria-label="Breadcrumb"]`, parent link, `aria-current` leaf, `aria-hidden` separator |
| SCN-004 | Manual | — | N/A | Heading, muted lead, "What we offer", three titled columns each with a red top rule |
| SCN-005 | Manual | — | N/A | `350.664px ×3` at 1440, `446.5px ×2` at 1023, one column at 767 |
| SCN-006 | Manual | — | N/A | Panel renders with the 52px handshake and the "Proof" eyebrow |
| SCN-007 | Manual | — | N/A | "See what we have shipped" resolves to `/proof` |
| SCN-008 | Manual | — | N/A | Panel eyebrow ink measures 14.57 on the surface fill |
| SCN-009 | Manual | — | N/A | Tint band, "What you leave with", three checked outcomes in one column |
| SCN-010 | Manual | — | N/A | `dl` with three `dt`/`dd` pairs; every badge `aria-hidden`; labels absent from the heading outline |
| SCN-011 | Manual | — | N/A | Label column heading, two paragraphs, link to `/how-we-work/engagement-model` |
| SCN-012 | Manual | — | N/A | Sky eyebrow, heading, lead, button to `/contact` |
| SCN-013 | Manual | — | N/A | Eight deleted strings searched for in the rendered `main`; none present; the header band holds no button |
| SCN-014 | Manual | — | N/A | At 1023 label/body and panel are single column; header nav `display: none` |
| SCN-015 | Manual | — | N/A | At 320 `scrollWidth === clientWidth`, zero overflowing elements |
| SCN-016 | Automated + manual | `site/scripts/illustrations.mjs` | N/A | `srcSet` carries 96w, 104w, 192w, 208w from one master; `design/illustrations/` gained nothing |
| SCN-017 | Manual | — | N/A | `alt=""`, absent from the accessibility tree |
| SCN-018 | Manual | — | N/A | `RuledGroup` takes children; this page passes a paragraph and #22's comp needs term rows in the same slot |
| SCN-019 | Manual | — | N/A | `prefers-reduced-motion` rule present in the emitted CSS |
| SCN-020 | Manual | — | N/A | One `h1`; h1, h2, h3, h4×3, h2, h3, h2, h2 with no skipped level |
| SCN-021 | Automated | `site/verify/copy-parity.mjs` | N/A | — |
| SCN-022 | Automated | `design/tokens/verify/check.mjs` | N/A | `theme.css` unchanged by this ticket |

There is no test suite in this repository. `lint`, `typecheck`, and `coverage`
are empty strings in `.agents/software-delivery.config.json`.

## Deliberate deviations

- **The page accent is `--color-red`, not the comp's off-palette `#d4537e`.**
  Three rendered elements differ from the comp: the breadcrumb mark, the three
  column rules, and the check badge fill.
- **Group titles snap to `--text-heading-3` 26px** from the comp's 17px.
- **The feature eyebrow is ink**, per #20's accent-as-text rule.
- **Panel radius and shadow snap to the tokens**; padding stays at 24/48; the
  four-column site footer stays.

## Open questions

- The two products named in the Proof panel are not linked. The comp does not
  link them and this ticket follows it, but a panel whose argument is evidence is
  a natural place for links. Worth a product view; not a blocker.
