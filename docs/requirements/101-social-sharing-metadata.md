# #101 — Add Open Graph and Twitter card tags, and generate the share image and favicon set

- Source ticket: https://github.com/Jack-Reiley/mile42_site/issues/101
- Pull request: <URL>
- Parent epic: none
- Delivery unit: 101-social-sharing-metadata
- Requirement version: 1

## Objective

A Mile42 URL pasted into LinkedIn, Slack, X, or iMessage unfurls as a branded
card carrying the homepage hero, and a browser tab carries the Mile42 mark
rather than a default glyph.

## Scope

- Open Graph and Twitter card tags in `site/index.html`, covering type, site
  name, title, description, url, image, image dimensions, image alt, and locale.
- `theme-color`, set to the hero band's blue.
- A 1200x630 share image drawn from the homepage hero.
- An icon set cut from the existing lockup: an SVG icon, a 32px PNG fallback,
  and a 180x180 apple-touch-icon.
- `site/scripts/social-assets.mjs`, which generates all of the above, plus the
  manifest that keeps the artwork honest about the copy it drew.
- Tests holding the shell, `site/src/site-meta.js`, the hero copy, and the
  generated artwork together.

## Out of scope

- Per-route Open Graph tags. Social crawlers do not execute JavaScript, so
  per-route cards require build-time prerendering of each route's HTML. Every
  shared URL gets the same homepage card.
- `robots.txt`, `sitemap.xml`, `<link rel="canonical">`, and per-page meta
  descriptions, all still deferred from #97.
- JSON-LD and other structured data.
- `favicon.ico`. See deviations.
- `copy_prototype/`.
- Netlify domain configuration.

## Behavioral scenarios

### SCN-001 — A shared link unfurls as a branded card

Given the production URL is pasted into a social or messaging client
When the client fetches the page and reads its metadata
Then it finds an Open Graph title, description, type, site name, url, and image
And it presents a titled card with artwork rather than a bare link

### SCN-002 — The card artwork is reachable by a remote crawler

Given a crawler that has fetched the page and does not run JavaScript
When it resolves the declared image reference
Then that reference is an absolute `https://` URL on the production origin
And it is not a site-relative path
And requesting it returns the image

### SCN-003 — The card declares its shape and describes itself

Given a consumer that will not render a large card without declared dimensions
When it reads the image metadata
Then the width and height are declared and match the artwork's real pixels
And alternative text describes what the card shows

### SCN-004 — X renders the large-format card

Given a link shared on X
When the card type is read
Then it is the large-image format
And the title, description, and image are available under the Twitter names

### SCN-005 — The card's words cannot drift from the page's words

Given the shell already declares a page title and meta description
When the Open Graph and Twitter titles and descriptions are read
Then each matches the shell's own value exactly
And a change to one that is not carried to the others fails the suite

### SCN-006 — The artwork cannot outlive the copy it shows

Given the share image was generated from the homepage hero copy
When that hero copy changes without the image being regenerated
Then the mismatch is reported as a failure
And the failure names the copy that moved

### SCN-007 — The card is drawn in the brand's own typefaces

Given the rendering environment does not have the brand fonts installed system-wide
When the share image is generated
Then its text is set in the brand typefaces rather than a substituted fallback
And a render that silently fell back is distinguishable from a correct one and fails

### SCN-008 — A browser tab carries the brand mark

Given a visitor opens any page on the site
When the browser requests an icon
Then it receives the Mile42 mark rather than a default glyph or a 404
And the mark is legible at tab size

### SCN-009 — An iOS home-screen shortcut carries the brand mark

Given a visitor adds the site to their iOS home screen
When the system requests a touch icon
Then a 180x180 icon is available
And it is opaque, because iOS composites no background behind it

### SCN-010 — Regenerating the assets changes nothing

Given the generated image, icons, and manifest are committed
When the generation script is run again against unchanged sources
Then every output is byte-identical
And the working tree is clean

### SCN-011 — The generated assets survive the production build

Given a production build of the site
When the build output is inspected
Then the share image and the icons are present at the paths the shell declares
And each declared icon and image reference resolves within the build output

### SCN-012 — The card is readable in a feed, not just at full size

Given the card is displayed at the width a feed actually gives it, around 500px
When a reader looks at it without zooming
Then the headline and the lead are readable
And the lockup is recognisable

## Non-functional requirements

- The share image is 1200x630 and fully opaque. Consumers composite an Open
  Graph image onto an unknown background, and an alpha channel is how a card
  ends up with light text on white.
- PNG rather than JPEG. The card is flat colour and type, which is where JPEG
  artefacts land hardest.
- The share image is 53kB, far under every platform's limit.
- The `<head>` additions are static markup with no runtime cost and no effect
  on LCP.
- Generation is offline and idempotent; it reads only files already in the tree.
- Generation is not wired into `npm run build`, following `illustrations:build`.
  The build stays free of native rasterisation and font handling.
- Icon and image references are root-relative or absolute, so they resolve from
  nested routes such as `/what-we-do/engineering/agentic-ai`.

## Verification map

| Scenario | Expected level | Automated coverage | E2E behavior | Manual evidence |
| --- | --- | --- | --- | --- |
| SCN-001 | Unit + manual | `site/src/social-metadata.test.jsx` | N/A | Share debugger on the deployed URL, after merge |
| SCN-002 | Unit | `site/src/social-metadata.test.jsx` | N/A | Reachability confirmed after DNS is confirmed |
| SCN-003 | Unit | `site/src/social-metadata.test.jsx` | N/A | — |
| SCN-004 | Unit + manual | `site/src/social-metadata.test.jsx` | N/A | X card validator, after merge |
| SCN-005 | Unit | `site/src/social-metadata.test.jsx` | N/A | Mutation-checked: a site-relative `og:image` fails 2 tests |
| SCN-006 | Unit | `site/src/social-metadata.test.jsx` | N/A | Mutation-checked: editing the hero lead alone fails 3 tests |
| SCN-007 | Script gate | `site/scripts/social-assets.mjs` | N/A | Three sabotage runs (empty, collapsed, unprepared font env) each fail loudly |
| SCN-008 | Unit + manual | `site/src/social-metadata.test.jsx` | N/A | 32px render inspected; the `42` reads |
| SCN-009 | Unit + manual | `site/src/social-metadata.test.jsx` | N/A | 180x180, 3 channels, no alpha; inspected |
| SCN-010 | Script gate | `site/scripts/social-assets.mjs` | N/A | Three consecutive runs, byte-identical by md5 |
| SCN-011 | Build | — | N/A | `npm run build`; all four assets in `site/dist/`, every declared reference resolves |
| SCN-012 | Manual | — | N/A | Card downscaled to 500px and inspected |

Automated tests never read this document, and nothing here generates a test.

## Deliberate deviations

- **The design's Unresolved decision 1 was resolved by removing the choice
  rather than making it.** The design offered vendoring OFL TTFs into
  `design/fonts/` or authoring an outlined SVG master, each with a real cost.
  Neither was needed: WOFF 1.0 is a plain sfnt with zlib-deflated tables, so
  `site/scripts/woff-to-ttf.mjs` converts the fontsource files already in
  `node_modules` at generation time. No font binary is committed and nothing is
  downloaded. This did require adding `@fontsource/figtree` as a devDependency,
  because the variable package installed for the site ships `.woff2` only,
  which is a different container and not convertible this way.
- **The card's type scale is not the hero's.** The page sets a 57px headline
  against an 18px lead, a ratio of 3.2. Held to that ratio the card's lead
  would land near 7px once a feed scales the image to ~500px wide, failing
  SCN-012. The card uses 55px against 29px. Faces, weights, colours, and the
  headline's 1.105 leading are the hero's own, verified against the running
  page's computed styles.
- **No `favicon.ico`**, per the design's recommendation on Unresolved decision
  2. `sharp` cannot write ICO, and every current browser accepts the SVG and
  PNG icons declared here. Note that under the SPA catch-all in `_redirects`, a
  request for `/favicon.ico` returns the HTML shell with a 200 rather than a 404.
- **The hero band's grain film is not on the card.** The design listed it as
  optional; it is texture that platform recompression tends to destroy, and it
  costs file size for something no consumer is guaranteed to show.
- **SCN-011 as designed mentioned the manifest sitting "at the paths the shell
  declares".** The manifest is build metadata, not a served file, so it lives in
  `site/src/assets/social.data.json` and is deliberately not shipped. The
  scenario is verified for the share image and the icons, which are the things
  the shell actually declares.

## Open questions

- **Is the site serving at `https://mile42.ai` today, and is the canonical form
  the apex or `www`?** The design's Unresolved decision 3, still open. `og:url`
  and `og:image` are absolute, so a wrong answer produces a card that fails to
  load for everyone. `site/src/site-meta.js` holds the origin as one constant so
  the correction is a one-line change.
- **The `42` device as the icon** was the design's recommendation on Unresolved
  decision 4 and is implemented as such. It is a brand call; the mark is cut
  from the existing lockup and no new artwork was commissioned.
- **`.nvmrc` pins Node 24.16.0, which is not installed in this environment.**
  All gates ran on Node 22.23.2, which satisfies the declared
  `engines: >=22.12.0`. CI parity was not achieved locally.
