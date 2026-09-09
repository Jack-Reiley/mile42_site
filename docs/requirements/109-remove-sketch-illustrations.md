# #109 — Stop rendering the ink sketch illustrations, keeping their layout slots

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/109
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/110
- Parent epic: none
- Delivery unit: U1
- Requirement version: 2

## Objective

Every illustration stops appearing anywhere on the site, and the containers that
existed to sit copy beside an image close the space instead of holding it open.
The header logo becomes the only image the site renders. Entries stay built and
registered and every Spot call stays in the source, so restoring artwork is a
flag change plus band-level layout work rather than a rebuild from nothing.

## Contract version 2

Version 1 covered the eight ink sketches only, explicitly excluded the flat
`path-*` icons, and deliberately added nothing to hold a slot open. Brett
reviewed the first pass and changed both halves of that:

- The four `path-*` icons are retired too, so nothing in the manifest draws.
- The blank space is closed rather than left. Three heroes, the homepage
  argument panel, and `PathCard` are restructured.
- `Lead` and `Body` keep their site-wide 46rem measure. The headline gains the
  width; body copy does not. Lifting that cap would move all sixteen pages.

The consequence Brett accepted knowingly: restoring artwork to these slots is
now a redesign of each band, not a swap. Version 1's premise that the placement
survives intact holds only for which artwork belonged where and at what size,
not for the layout around it.

## Contract drift recorded at implementation

The ticket was designed against main before PR 108 merged, so it names
`MeetDewey.jsx`, `MeetDewey.test.jsx`, and the `dewey-librarian` entry. The
rename moved all three to `MeetVickee.jsx`, `MeetVickee.test.jsx`, and
`vickee-librarian`. The affected surface is otherwise unchanged: twelve render
sites, eight sketch entries, four source files, four affected test files. No
scenario changes meaning, so the identifiers are re-pointed here rather than
returned to design.

## Scope

- All twelve entries stop rendering: the eight sketches (`hero-desk`,
  `vickee-librarian`, `brain-gear`, `handshake`, `chess`, `laptop`, `lightbulb`,
  `gears`) and the four flat icons (`path-lightbulb`, `path-gears`,
  `path-handshake`, `path-clipboard`).
- Three heroes and the homepage argument panel become one column.
- `PathCard` drops its 4rem icon gutter.
- `site/src/assets/illustrations/manifest.js` marks them retired.
- `site/src/components/primitives.jsx` teaches `Spot` to skip a retired entry.
- Comments at `Home.jsx`, `MeetVickee.jsx`, `HowWeWork.jsx`, and
  `StageJourney.jsx` record that the calls are deliberately inert.
- The four affected test files assert the new behavior.

## Out of scope

- The brand lockup and the header logo.
- The site-wide 46rem reading measure on `Lead` and `Body`.
- Removing the illustration plumbing. Every entry is now retired and `Spot` can
  never render, so the manifest, assets, build scripts and inert calls are dead
  weight by design. Brett chose to keep them; the cleanup is its own ticket.
- The inline SVG diagrams: `LibrarianDiagram`, `IntegrationSteps`,
  `CatalogDrawer`, `ExecutionContrast`.
- Deleting `.webp` assets, `manifest.js`, `illustrations.data.json`, or the
  `illustrations:build` / `illustrations:placeholders` scripts.
- `copy_prototype/`, which carries none of this artwork.
- Commissioning or designing replacement artwork.
- Commissioning replacement artwork or deciding whether any returns.

## Behavioral scenarios

### SCN-001 — No page draws an illustration

Given a reader opens any page on the site
When the page has finished loading
Then no illustration appears anywhere on it
And the header logo is the only image the page renders

### SCN-002 — Meet Vickee and How we work draw nothing

Given a reader opens Meet Vickee or How we work
When the page has finished loading
Then neither the librarian, the chess drawing, nor the gears appear

### SCN-003 — The homepage draws nothing, including the Phase Zero icon

Given a reader opens the homepage
When the page has finished loading
Then no hero artwork, no argument-panel artwork, no offerings-card artwork,
and no clipboard icon appears

### SCN-004 — The client journey's stages draw no spot

Given a reader opens the client journey
When the reader opens any one of the four stages
Then that stage's spot drawing does not appear
And the "You leave with" list is the first thing in its column

### SCN-005 — The flat path icons are retired too

Given a reader opens What We Do, Engineering, Advisory, AI Products,
Engagement Model, or the homepage
When each page has finished loading
Then no flat single-colour path icon appears
And each path card is named by its own copy, with its link still reachable

### SCN-006 — The containers close the space the artwork left

Given the illustrations no longer draw
When a reader views the site at 1024px and above
Then the Home, Meet Vickee and How we work heroes are one column, and each
headline runs the full width of the wrap
And the homepage argument panel's copy starts at the card's own padding rather
than being indented past an empty track
And each path card's copy starts at the card's edge rather than behind a 4rem
gutter
And each offerings card's button follows its body copy directly, rather than
being pushed down by padding held for an absent spot
And the lead and body copy keep the site's 46rem reading measure

### SCN-007 — Every retired entry is still built and registered

Given the illustration pipeline runs
When the manifest is read
Then all eight sketch entries are still present with their alt text, level,
and generated dimensions
And their responsive variants are still emitted
And no entry is reported as an outstanding placeholder

### SCN-008 — The placement spec survives in the source

Given a later ticket will restore artwork to these same slots
When the source is read after this change
Then all twelve Spot calls are still present
And each keeps its name, its sizes value, and its class list, including the
three offerings cards' individual offset classes
And a comment records that they are deliberately inert

### SCN-009 — No sketch image is fetched

Given a reader opens any page that used to draw a sketch illustration
When the page has finished loading
Then no request is made for any of the eight sketch images
And no image on the page is fetched with high priority

### SCN-010 — The pages stay sound

Given the illustrations have been removed
When each affected page is read
Then the heading hierarchy and landmarks are unchanged
And no alternative text is announced for artwork that is no longer there
And every remaining decorative icon still carries an empty alt

## Non-functional requirements

- Largest Contentful Paint on Home and Meet Vickee moves from the hero image to
  a text element. It must not regress; it is expected to improve.
- No new dependency.
- Build output size is unchanged: `manifest.js` glob-imports the assets eagerly,
  so they are still emitted even though nothing renders them. Accepted.
- Keyboard behavior and reduced-motion handling are unchanged. The removed
  elements were `pointer-events-none` and not focusable. `PathCard`'s icon sat
  inside the link, so removing it must not change the link's accessible name.
- Measured at 1440px after the change: the homepage h1 spans 1221px on two
  lines, down from three in a 600px column; its lead holds at 725px, the 46rem
  measure. No horizontal overflow at 1440, 832 or 390.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/components/illustrations-retired.test.jsx` | N/A | Browser pass, 9 routes |
| SCN-002 | Unit | `site/src/pages/MeetVickee.test.jsx`, `site/src/components/illustrations-retired.test.jsx` | N/A | Browser pass at 390/832/1440 |
| SCN-003 | Unit | `site/src/components/illustrations-retired.test.jsx`, `site/src/pages/hero-and-argument-band.test.jsx` | N/A | Browser pass at 390/832/1440 |
| SCN-004 | Unit | `site/src/components/illustrations-retired.test.jsx`, `site/src/pages/handshake-homes.test.jsx` | N/A | Browser pass, all four stages opened |
| SCN-005 | Unit | `site/src/components/illustrations-retired.test.jsx` | N/A | Browser pass |
| SCN-006 | Unit + Manual | `site/src/components/illustrations-retired.test.jsx` | N/A | Measured widths above; jsdom resolves no Tailwind utility, so the unit assertions are class contracts and the geometry is browser-only |
| SCN-007 | Unit | `site/src/components/illustrations-retired.test.jsx`, `site/src/pages/hero-and-argument-band.test.jsx` | N/A | `npm run illustrations:placeholders` |
| SCN-008 | Unit | `site/src/components/illustrations-retired.test.jsx`, `site/src/components/reveal.test.jsx` | N/A | — |
| SCN-009 | Unit | `site/src/pages/MeetVickee.test.jsx` | N/A | Production build fetches zero `.webp` |
| SCN-010 | Unit | `site/src/components/illustrations-retired.test.jsx`, `site/src/pages/hero-and-argument-band.test.jsx` | N/A | Browser pass |

E2E is N/A throughout: the repository has no E2E suite, and every scenario here
is either a rendered-output assertion jsdom can make or a geometry question only
a real browser can answer. SCN-006 is the geometry one and is manual by design.

## Deliberate deviations

- SCN-006 was extended after verification. Version 2 enumerated the heroes, the
  argument panel and `PathCard`, and deliberately kept the offerings cards'
  `xl:pt-32` as placement code carried over from version 1. Verification measured
  that as 128px of top padding holding a 140px gap between the body copy and the
  button on all three cards, raised it as F-001, and Brett resolved it in favour
  of closing the gap. It is now 24px of padding and a 36px gap, and the cards are
  429px tall rather than 533px. Both this document
  and the ticket were updated together this time; the first scope change updated
  only this document, which verification caught as F-002.
- The contract was widened to version 2 mid-implementation, after Brett reviewed
  the first pass. See "Contract version 2" above. Both the ticket's original Out
  of scope and version 1's SCN-006 now say the opposite of what shipped, and
  both are superseded rather than deleted.
- Issue 45, "Replace the handshake path card icon so it reads on the navy band",
  is about an icon this ticket removes. Brett approved closing it as obsolete.
- The test file rename landed one commit earlier than intended, in the manifest
  commit, because `git mv` had already staged it. Content and rename are
  therefore split across two commits.
- Files were staged individually rather than with `git add -A`, because three
  unrelated untracked files under `design/illustrations/mile42 Logos/` were in
  the working tree before this ticket began and must not enter this PR.

## Open questions

- Whether the blank hero halves stand as a shippable state or want a copy or
  layout follow-up. Raise at reconciliation if the browser pass looks worse than
  the comparison suggested.
- Whether the restore follow-up ticket is created now or after this merges.
