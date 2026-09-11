# #111 — Restore illustrations across the site with a second set of artwork

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/111
- Pull request: https://github.com/Jack-Reiley/mile42_site/pull/112
- Parent epic: none
- Delivery unit: U1
- Requirement version: 1

## Objective

A second set of illustrations draws in the places #109 emptied. Four heroes get
a scene, the homepage argument panel gets its spot, the three What we do path
cards get an icon each, and the four Phase Zero panels share one mid-size
drawing. Every drawn entry is new artwork under a new key; the twelve #109
entries stay registered, retired, and off the site.

## Scope

- Nine live entries: `developer-desk`, `dashboard-user`, `robot-team`,
  `mile42-mark-white` (heroes); `gear-brain` (argument panel);
  `path-lightbulb-target`, `path-gears-trio`, `path-phone-circuit` (path
  cards); `magnifier-gear` (Phase Zero panels on Home, What we do, Engagement
  model, Advisory).
- The four hero bands get their two-column split at `lg`; Why Mile42 gets one
  it never had. The homepage argument panel gets its 13rem track back.
- `PathCard` restores its `4rem` icon column per card, only where the card's
  spot draws.
- `FeaturePanel` sizes its slot by the entry's level: 112px for Level Two,
  52px for the flat icons.
- `site/scripts/illustrations.mjs` gains `mask` (a single-colour master tinted
  with its own colour, so it takes the stroke thickening) and `refill` (the
  flat fill of ink-and-fill artwork swapped to a token, ink and grain kept).
  The magnifier's fill is `--color-sky`.
- SVG masters are copied in by hand with dimensions recorded in the manifest.
- `illustrations-retired.test.jsx` is replaced by
  `illustrations-restored.test.jsx`; `MeetVickee.test.jsx` and
  `hero-and-argument-band.test.jsx` are updated from "draws nothing".

## Out of scope

- Further artwork. `path-magnifier-gear` is built and withheld, and five
  masters sit in `design/illustrations/unplaced/`.
- Restyling the bands beyond re-opening the slots the artwork needs.
- Removing the retired #109 entries or their inert `Spot` calls.
- The `mile42 Logos/linkedin/` folder and `Logo mark comparison.zip`, which
  stay untracked.

## Behavioral scenarios

### SCN-001 — Each hero draws its scene beside the copy

Given a reader opens the homepage, Meet Vickee, How we work, or Why Mile42
When the page has finished loading
Then the hero band shows that page's artwork
And the hero copy keeps the wider column at desktop width

### SCN-002 — Hero artwork is the one eager image on its page

Given a reader opens a page whose hero draws artwork
When the page starts loading
Then exactly one image on the page is eager and high priority
And it is the hero's artwork

### SCN-003 — Heroes are announced, the brand mark is not

Given a reader using assistive technology opens a page with hero artwork
When the hero is read
Then the Home, Meet Vickee and How we work artwork are announced with their
alt text
And the Why Mile42 mark is skipped, because the header lockup already names
the firm

### SCN-004 — The homepage argument panel draws its spot

Given a reader opens the homepage
When the reader reaches the argument panel
Then the gear-and-brain drawing appears beside the panel's copy
And the copy keeps the 46rem measure

### SCN-005 — Each What we do path card carries its own icon

Given a reader opens What we do
When the three path cards have loaded
Then the Advisory card shows the lightbulb and target
And the Engineering card shows the three gears
And the AI products card shows the tilted phone
And each card's accessible name is its own copy alone

### SCN-006 — A path card without live artwork keeps the closed layout

Given a path card whose spot is a retired entry
When the card renders
Then no image appears on it
And its copy starts at the card's left padding with no empty gutter

### SCN-007 — The Phase Zero panels share the magnifier

Given a reader opens the homepage, What we do, Engagement model, or Advisory
When the reader reaches the Phase Zero panel
Then the magnifier-and-gear drawing appears above the panel's eyebrow at
mid-spot size
And its lens is the site's light blue

### SCN-008 — Panels with a retired spot draw nothing

Given a reader opens Engineering or AI products
When the reader reaches the page's feature panel
Then no image appears in it
And the eyebrow is the first thing in the panel's left column

### SCN-009 — The retired set stays off the site

Given a reader opens any page, and opens each client journey stage
When every band has loaded
Then none of the twelve #109 entries appears anywhere
And the three offerings cards on the homepage carry no artwork
And the Meet Vickee lede carries no chess drawing

### SCN-010 — Artwork reserves its space before it arrives

Given any page that draws artwork
When the page lays out before an image has loaded
Then the artwork's box is already the size it will be
And no copy moves when the image arrives

### SCN-011 — Every drawn entry is built and registered

Given the illustration manifest
When it is read
Then every entry that draws has alt text, a level, and dimensions
And every raster entry has responsive variants that cover its rendered size
at 1x and 2x
And no entry is marked as a placeholder

### SCN-012 — The build verifies its recolours and refuses strays

Given the masters in design/illustrations
When the illustration build runs
Then a mask entry is encoded in its own single colour with alpha untouched
And a refill entry keeps its ink line and grain with the fill swapped to the
named token
And a master that is not registered fails the build by name
And running the build again changes nothing

### SCN-013 — The bands hold at phone width

Given a reader opens any page with restored artwork at 375px wide
When the page has finished loading
Then each hero stacks its artwork below the copy, centred
And each path card keeps its icon beside its copy
And nothing overflows the viewport horizontally

## Non-functional requirements

- One eager, high-priority image per page, and it is the hero's. What we do
  is the exception by design: its three path-card icons are above the fold
  inside the hero and are eager; the Phase Zero panel below is lazy.
- Hero transfer baseline: `dashboard-user.svg` 149KB gzipped,
  `developer-desk.svg` 54KB gzipped, `robot-team-768.webp` 91KB,
  `mile42-mark-white.svg` 2.5KB. No hero exceeds 150KB transferred.
- Every `img` carries `width` and `height`. SVG entries take theirs from the
  trimmed `viewBox` recorded in the manifest.
- Decorative artwork (the brand mark, the path icons, the magnifier) has an
  empty alt; the three announced heroes and the gear-and-brain carry theirs.
- Every image is `pointer-events-none select-none` through `Spot`.
- Stroke weight at 64px, measured as mean alpha of inked pixels in the 64w
  variant: lightbulb-target 122, gears-trio 111 (69 before `mask`),
  phone-circuit 133.
- `npm run test:unit` (573 tests), `npm run tokens:check`, `npm run build`,
  `npm run copy:build`, and `npm run illustrations:build` pass.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit + manual | `site/src/components/illustrations-restored.test.jsx`, `site/src/pages/MeetVickee.test.jsx` | N/A | 1440px: developer-desk 536×301, dashboard-user 384×453, robot-team 347×293, mark 284×283, each in the right column |
| SCN-002 | Unit | `site/src/components/illustrations-restored.test.jsx`, `site/src/pages/MeetVickee.test.jsx` | N/A | — |
| SCN-003 | Unit | `site/src/components/illustrations-restored.test.jsx` | N/A | — |
| SCN-004 | Unit + manual | `site/src/components/illustrations-restored.test.jsx`, `site/src/pages/hero-and-argument-band.test.jsx` | N/A | 1440px: gear-brain 208×208 in the 13rem track |
| SCN-005 | Unit + manual | `site/src/components/illustrations-restored.test.jsx` | N/A | 1440px: three 64×64 icons, `rotate: -5deg` on the phone, every title one line |
| SCN-006 | Unit | `site/src/components/illustrations-restored.test.jsx` | N/A | — |
| SCN-007 | Unit + manual | `site/src/components/illustrations-restored.test.jsx` | N/A | 112×112 on all four panels; fill sampled sky in `magnifier-gear-224.webp` |
| SCN-008 | Unit | `site/src/components/illustrations-restored.test.jsx` | N/A | — |
| SCN-009 | Unit | `site/src/components/illustrations-restored.test.jsx` | N/A | — |
| SCN-010 | Unit + manual | `site/src/components/illustrations-restored.test.jsx` | N/A | Every `img` carries `width`/`height`; no shift observed on reload at 1440px and 375px |
| SCN-011 | Unit | `site/src/components/illustrations-restored.test.jsx` | N/A | — |
| SCN-012 | Manual | none: the build itself asserts and fails | N/A | `npm run illustrations:build` reports `--color-orange tint verified`, `own colour tint verified`, `--color-red tint verified`, `--color-sky refill verified`; a second run leaves `git status` clean; an unregistered master named `gears_trio_mono_green.png` failed the build by name before it was registered |
| SCN-013 | Manual | none: geometry is not computed in jsdom | N/A | 375px: every hero image below its `h1`, `scrollWidth` equals `innerWidth` on all seven pages; path icons beside copy |

## Deliberate deviations

- What we do carries three eager images rather than one. The path cards are
  the hero's content and sit above the fold; the design's "one eager image"
  rule is about competing fetches below the fold, and the panel lower down
  stays lazy. Recorded in the test rather than relaxed.
- `path-magnifier-gear` is registered and built but withheld with
  `retired: true`. The flag means "not drawn" here rather than #109's "taken
  off"; the manifest comment says so.

## Open questions

- Whether `npm run illustrations:build` joins the configured `verify`
  command. Left out: it takes tens of seconds and depends on `sharp`, and it
  is a documented manual gate for tickets that touch masters.
- `--color-sky` for the magnifier fill was chosen this session; `--color-ice`
  is the paler alternative if the panel wants it.
