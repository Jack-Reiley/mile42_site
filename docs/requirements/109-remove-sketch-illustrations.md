# #109 — Stop rendering the ink sketch illustrations, keeping their layout slots

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/109
- Pull request: <URL>
- Parent epic: none
- Delivery unit: U1
- Requirement version: 1

## Objective

The eight hand-drawn ink sketch illustrations stop appearing anywhere on the
site. The flat `path-*` spot icons are untouched. Every entry stays built and
registered, and every placement stays in the source, so a later ticket restores
artwork by swapping the art rather than rebuilding the layout.

## Contract drift recorded at implementation

The ticket was designed against main before PR 108 merged, so it names
`MeetDewey.jsx`, `MeetDewey.test.jsx`, and the `dewey-librarian` entry. The
rename moved all three to `MeetVickee.jsx`, `MeetVickee.test.jsx`, and
`vickee-librarian`. The affected surface is otherwise unchanged: twelve render
sites, eight sketch entries, four source files, four affected test files. No
scenario changes meaning, so the identifiers are re-pointed here rather than
returned to design.

## Scope

- The eight sketch entries stop rendering: `hero-desk`, `vickee-librarian`,
  `brain-gear`, `handshake`, `chess`, `laptop`, `lightbulb`, `gears`.
- `site/src/assets/illustrations/manifest.js` marks them retired.
- `site/src/components/primitives.jsx` teaches `Spot` to skip a retired entry.
- Comments at `Home.jsx`, `MeetVickee.jsx`, `HowWeWork.jsx`, and
  `StageJourney.jsx` record that the calls are deliberately inert.
- The four affected test files assert the new behavior.

## Out of scope

- The `path-*` flat spot icons.
- The brand lockup and the header logo.
- The inline SVG diagrams: `LibrarianDiagram`, `IntegrationSteps`,
  `CatalogDrawer`, `ExecutionContrast`.
- Deleting `.webp` assets, `manifest.js`, `illustrations.data.json`, or the
  `illustrations:build` / `illustrations:placeholders` scripts.
- `copy_prototype/`, which carries none of this artwork.
- Commissioning or designing replacement artwork.
- Holding any slot open. Brett chose "let it fall where it may" after
  comparing three rendered options; SCN-006 records where each band settles.

## Behavioral scenarios

### SCN-001 — The homepage draws no sketch illustration

Given a reader opens the homepage
When the page has finished loading
Then no hand-drawn sketch illustration appears anywhere on it
And the only illustration still drawn is the flat clipboard icon in the Phase
Zero panel

### SCN-002 — Meet Vickee draws no sketch illustration

Given a reader opens Meet Vickee
When the page has finished loading
Then neither the librarian nor the chess drawing appears
And the page draws no illustration at all

### SCN-003 — How We Work draws no sketch illustration

Given a reader opens How We Work
When the page has finished loading
Then the gears drawing does not appear

### SCN-004 — The client journey's stages draw no sketch illustration

Given a reader opens the client journey
When the reader opens any one of the four stages
Then that stage's spot drawing does not appear
And the "You leave with" list is the first thing in its column

### SCN-005 — The flat path icons are untouched

Given a reader opens What We Do, Engineering, Advisory, AI Products,
Engagement Model, or the homepage
When each page has finished loading
Then every flat single-colour path icon still draws as it does today

### SCN-006 — Each band settles where the browser puts it

Given the sketch illustrations no longer draw
When a reader views the site at 1024px and above
Then the Home, Meet Vickee, and How We Work heroes keep their column
arrangement with the artwork half left blank
And the homepage argument panel keeps its blank 13rem track, because its copy
is already pinned to the second column
And Meet Vickee's lede copy occupies the full width of the band
And nothing has been added anywhere to hold a slot open

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
- Keyboard behavior, focus order, and reduced-motion handling are unchanged. The
  removed elements were `pointer-events-none` and not focusable.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit | `site/src/components/sketch-illustrations-retired.test.jsx` | N/A | Browser pass at 390/832/1440 |
| SCN-002 | Unit | `site/src/pages/MeetVickee.test.jsx` | N/A | Browser pass at 390/832/1440 |
| SCN-003 | Unit | `site/src/components/sketch-illustrations-retired.test.jsx` | N/A | Browser pass at 390/832/1440 |
| SCN-004 | Unit | `site/src/pages/handshake-homes.test.jsx` | N/A | Browser pass, stage opened |
| SCN-005 | Unit | `site/src/components/sketch-illustrations-retired.test.jsx` | N/A | Browser pass |
| SCN-006 | Manual | — | N/A | Browser pass; jsdom resolves no Tailwind utility, so rendered geometry cannot be asserted here |
| SCN-007 | Unit | `site/src/components/sketch-illustrations-retired.test.jsx`, `site/src/pages/hero-and-argument-band.test.jsx` | N/A | `npm run illustrations:placeholders` |
| SCN-008 | Unit | `site/src/components/sketch-illustrations-retired.test.jsx`, `site/src/components/reveal.test.jsx` | N/A | — |
| SCN-009 | Unit | `site/src/pages/MeetVickee.test.jsx` | N/A | Browser network panel |
| SCN-010 | Unit | `site/src/components/sketch-illustrations-retired.test.jsx`, `site/src/pages/hero-and-argument-band.test.jsx` | N/A | Browser pass |

E2E is N/A throughout: the repository has no E2E suite, and every scenario here
is either a rendered-output assertion jsdom can make or a geometry question only
a real browser can answer. SCN-006 is the geometry one and is manual by design.

## Deliberate deviations

- The ticket's Summary and two bullets of its Initial acceptance intent describe
  holding each slot open. Brett superseded that during design after comparing
  three rendered options. SCN-006 is the replacement and the ticket carries a
  pointer at the top of its body.
- Files were staged individually rather than with `git add -A`, because three
  unrelated untracked files under `design/illustrations/mile42 Logos/` were in
  the working tree before this ticket began and must not enter this PR.

## Open questions

- Whether the blank hero halves stand as a shippable state or want a copy or
  layout follow-up. Raise at reconciliation if the browser pass looks worse than
  the comparison suggested.
- Whether the restore follow-up ticket is created now or after this merges.
