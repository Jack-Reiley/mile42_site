# #74 — Rewrite the homepage hero and add the anti-consulting band

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/74
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/76
- Parent epic: none
- Delivery unit: unit-74-75-hero-copy-and-band-colours
- Requirement version: 1

## Objective

The homepage hero takes a position instead of listing services, and the band
under it carries the economic argument that position rests on.

## Scope

- Hero eyebrow, headline, and supporting copy on `site/src/pages/Home.jsx`.
- A band between the hero and Core Practice: a bordered panel on the cream
  field, artwork in the left column and copy in the right, stacking copy-first
  below `lg`.
- `design/illustrations/Brain_gear.png` registered as a master in the
  illustration MAP and manifest, with variants emitted by the build.
- The two existing test files that pin the homepage band order by index, since
  inserting a band shifts every index by one.

## Out of scope

- The browser tab title in `site/src/App.jsx`, which still reads "We help
  organizations deliver their most important work" and now disagrees with the
  headline. No replacement copy was supplied.
- Band colour, which is #75.

## Behavioral scenarios

### SCN-001 — The hero states a position

Given a reader opens the homepage
When the hero band renders
Then the eyebrow reads "Execution, Rebuilt."
And the headline reads "The consulting model is broken. We didn't bring it with us."
And the supporting copy names senior judgment, AI-native delivery, and what Mile42 leaves out

### SCN-002 — The argument sits between the claim and the work

Given a reader has read the hero
When they continue down the page
Then the next band is headed "Consulting should create momentum, not overhead."
And it carries the conflict-of-interest paragraph, the how-Mile42-differs paragraph, and the what-you-get paragraph in that order
And the band after it is the core practice band

### SCN-003 — The argument reads as an object, not a gap

Given the argument band renders at a desktop width
Then its content sits inside a bordered panel with the site's hard shadow
And the panel is drawn on the cream field, distinct from the white band below it
And the artwork sits in the panel's left column against the panel's own padding
And the copy sits to its right

### SCN-004 — The argument opens on its heading on a phone

Given the argument band renders below the large breakpoint
Then the heading and the three paragraphs come first
And the artwork follows them
And the artwork is capped smaller than it is beside the copy

### SCN-005 — The artwork is a built asset, not a placed file

Given the brain-and-gear artwork appears on the homepage
Then it resolves to an asset emitted by the illustration build
And the build serves a variant sized for the width it is rendered at
And the artwork carries alt text describing what it depicts
And a master left unregistered fails the illustration build rather than shipping

### SCN-006 — The page stays sound at every width

Given the homepage renders at a phone, tablet, or desktop width
Then no band scrolls the document sideways
And the new band's heading sits at the second level, under no heading but the page's own

### SCN-007 — The band order change preserves what it moved

Given the homepage band order now carries an extra band
Then core practice still precedes the three ways organizations work with us
And the Dewey block still sits in the opening run of the page rather than near the end
And the page still closes on the call to action

## Non-functional requirements

- No horizontal overflow at 375, 1024, and 1440.
- The hero illustration stays eager with high fetch priority and enters without
  fading, so the LCP work in #12 is not given back.
- The new artwork is lazy and carries intrinsic dimensions, so it reserves its
  space before it loads.
- Real heading hierarchy and real landmarks, per the repository's accessibility
  guidance.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/pages/hero-and-argument-band.test.jsx` | N/A | — |
| SCN-002 | Unit | `site/src/pages/hero-and-argument-band.test.jsx` | N/A | — |
| SCN-003 | Manual | — | N/A | Browser at 1440; panel border, shadow, cream field, artwork left against the card's 40px padding |
| SCN-004 | Manual | — | N/A | Browser at 375; heading first, artwork last, capped at 7rem against 13rem beside the copy |
| SCN-005 | Unit + build | `site/src/pages/hero-and-argument-band.test.jsx`; `npm run illustrations:build` is the gate on registration | N/A | Served variant read off the rendered `img` at 375 and 1440 |
| SCN-006 | Unit + manual | `site/src/pages/hero-and-argument-band.test.jsx` for the outline | N/A | `document.documentElement.scrollWidth` against `innerWidth` at three widths |
| SCN-007 | Unit | `site/src/pages/homepage-restructure.test.jsx`, `site/src/pages/dewey-entry-points.test.jsx` | N/A | — |

There is no E2E harness in this repository, so no scenario names one. Geometry
and colour stay manual on purpose: the suite omits the Tailwind plugin, so jsdom
resolves no utility to a rendered value and an assertion there would measure
nothing. The same split is documented in
`site/src/components/accent-contrast.test.jsx`.

## Deliberate deviations

- The supplied supporting copy contained an em dash, rendered as a comma to
  follow the repository owner's standing rule against them.
- The hero eyebrow keeps the body-size treatment the line it replaces used,
  rather than becoming the uppercase `Eyebrow` primitive, so the hero's
  proportions do not change.
- The branch carries both tickets in this delivery unit and is named
  `feature/74-75-hero-copy-and-band-colours` rather than
  `feature/<ticket>-<slug>`. There is no epic, so the epic-level naming example
  in `branching-and-prs.md` does not apply and both ticket numbers are carried.

## Open questions

- The document title in `site/src/App.jsx` needs replacement copy before it can
  be brought back into agreement with the headline.
- `npm run test:unit` is red on `main` from a pre-existing `MeetDewey.test.jsx`
  heading mismatch, so the configured `test` command cannot be green for anyone.
  Caused by neither ticket in this unit and not fixed here, since the repository
  forbids editing a test to force a pass. It needs its own bug ticket.
