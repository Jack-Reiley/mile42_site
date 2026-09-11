import data from './illustrations.data.json'

/**
 * Illustrations are data, not markup. Pages reference entries by key and never
 * import an image path, so replacing the whole set is one directory plus one
 * edit here.
 *
 * `level` follows the style guide's Level One/Two/Three system:
 *   1 — hero scene on a gradient blob with floating accents; hero use only
 *   2 — mid-size spot, ink line art with one flat fill
 *   3 — small spot
 *
 * Level Three now covers two visual treatments. The `path-*` entries are flat
 * single-colour linework tinted from a token at build time, not the ink-plus-fill
 * drawing the level system was written around. Size is what the level records.
 *
 * `placeholder` marks artwork that is temporary. Everything here is custom
 * artwork, so nothing is flagged. `npm run illustrations:placeholders` reports
 * what remains outstanding, and should stay empty.
 *
 * `retired` marks artwork that is deliberately not drawn. #109 took every
 * illustration off the site: first the eight ink sketches, then the four flat
 * `path-*` icons. `Spot` skips a retired entry, so the flag is the single
 * switch. It is not `placeholder`: a placeholder is unfinished, a retired entry
 * is finished and withheld.
 *
 * The #109 entries stay retired. What draws now is the second set of artwork,
 * added entry by entry after it: new keys rather than flag flips, because each
 * is a different drawing from the one it replaces, and the slot it takes was
 * re-opened at the band or component that had closed it (the hero splits,
 * PathCard's icon column, FeaturePanel's level-sized slot). The retired
 * entries and their inert Spot calls are kept as the record of the first set.
 *
 * Dimensions and variants come from `illustrations.data.json`, which is emitted
 * by `npm run illustrations:build` alongside the assets themselves. They are
 * generated rather than hand-written because Vite resolves an imported asset to
 * a URL but does not expose its size, and measuring it at runtime would mean
 * loading the image — the very thing that causes layout shift.
 *
 * Only the human judgement below is authored by hand: alt text, level, whether
 * the artwork is still a placeholder, and whether it is retired.
 */

// Resolved through Vite so every file is content-hashed. Keyed by filename.
const urls = import.meta.glob(['./*.webp', './*.svg'], { eager: true, query: '?url', import: 'default' })
const urlFor = (name) => urls[`./${name}`]

const META = {
  'hero-desk': {
    level: 1,
    alt: 'A person seated at a desk typing, with a cursor, a star and a gear floating around them',
    placeholder: false,
    retired: true,
  },
  /* The site's second Level One, and the only one that is a hero because of what
     it depicts rather than only how it is drawn: Meet Vickee argues the librarian
     metaphor, so the librarian is what its first image shows. */
  'vickee-librarian': {
    level: 1,
    alt: 'A librarian taking a book from a well-stocked shelf',
    placeholder: false,
    retired: true,
  },
  /* The How we work hero, in the slot the gears held. A hero scene rather than
     a spot, so Level One, and the first raster entry back on the site. */
  'robot-team': {
    level: 1,
    alt: 'A robotic arm and a person turning a large gear together, with a green checkmark above',
    placeholder: false,
    retired: false,
  },
  handshake: {
    level: 2,
    alt: 'A robotic hand and a human hand shaking',
    placeholder: false,
    retired: true,
  },
  chess: {
    level: 2,
    alt: 'A human hand and a robotic hand each moving a piece on a chessboard',
    placeholder: false,
    retired: true,
  },
  laptop: {
    level: 2,
    alt: 'Hands typing on a laptop',
    placeholder: false,
    retired: true,
  },
  lightbulb: {
    level: 3,
    alt: 'A lit lightbulb',
    placeholder: false,
    retired: true,
  },
  gears: {
    level: 2,
    alt: 'Two interlocking gears',
    placeholder: false,
    retired: true,
  },
  /* Level Two by size. The treatment is a third one: ink linework with no flat
     fill and no tint, so it ships in the artwork's own black rather than being
     recoloured from a token the way the `path-*` masks are. */
  'brain-gear': {
    level: 2,
    alt: 'A brain and a gear drawn as one shape, divided down the middle',
    placeholder: false,
    retired: true,
  },
  'path-lightbulb': {
    level: 3,
    alt: 'A lit lightbulb',
    placeholder: false,
    retired: true,
  },
  'path-gears': {
    level: 3,
    alt: 'Two interlocking gears',
    placeholder: false,
    retired: true,
  },
  'path-handshake': {
    level: 3,
    alt: 'A robotic hand and a human hand shaking',
    placeholder: false,
    retired: true,
  },
  'path-clipboard': {
    level: 3,
    alt: 'A clipboard holding a checklist',
    placeholder: false,
    retired: true,
  },
  /* The first `path-*` entry back on the site after #109, in the Advisory
     card's slot. A target inside the bulb rather than the plain bulb the retired
     `path-lightbulb` drew, which is why it is a new entry and not a flag flip. */
  'path-lightbulb-target': {
    level: 3,
    alt: 'A lit lightbulb with an arrow striking a target inside it',
    placeholder: false,
    retired: false,
  },
  /* The Engineering card's slot, where `path-gears` was. Three gears rather
     than two, and in the green it was authored in rather than a token tint. */
  'path-gears-trio': {
    level: 3,
    alt: 'Three interlocking gears',
    placeholder: false,
    retired: false,
  },
  /* The AI products card's slot, where `path-handshake` was. */
  'path-phone-circuit': {
    level: 3,
    alt: 'A phone with a circuit board on its screen',
    placeholder: false,
    retired: false,
  },
  /* The four Phase Zero panels, where `path-clipboard` was. Ink line with one
     flat fill, so Level Two, and FeaturePanel sizes its slot up for it. */
  'magnifier-gear': {
    level: 2,
    alt: 'A magnifying glass held over a gear',
    placeholder: false,
    retired: false,
  },
  /* The mono cut of the same drawing. Registered so the build accepts the
     master; withheld until a placement wants it. */
  'path-magnifier-gear': {
    level: 3,
    alt: 'A magnifying glass held over a gear',
    placeholder: false,
    retired: true,
  },
}

/**
 * Vector artwork. An SVG is one file at every size, so it has no variants, no
 * `srcSet`, and nothing for `illustrations:build` to emit: it is copied in from
 * `design/illustrations` by hand with its `viewBox` trimmed to the painted area,
 * the same trim the raster masters get. `width` and `height` are that trimmed
 * viewBox, recorded here because there is no generated data to read them from,
 * and `Spot` still needs the ratio to reserve space before the file arrives.
 *
 * The first artwork back on the site after #109, and the first entries that are
 * not retired. Both are heroes, which is why both are Level One.
 */
const VECTOR = {
  'dashboard-user': {
    file: 'dashboard-user.svg',
    width: 1370,
    height: 1617,
    level: 1,
    alt: 'A person standing before a dashboard of charts, task lists, and connected databases',
    placeholder: false,
    retired: false,
  },
  'developer-desk': {
    file: 'developer-desk.svg',
    width: 1421,
    height: 798,
    level: 1,
    alt: 'A person seated at a desk working on a laptop, with code, gears, charts and a database floating around them',
    placeholder: false,
    retired: false,
  },
  /* Level Two by size, the way brain-gear was. Single-colour linework, so the
     stroke is set to the ink token's value rather than the #333333 it was
     authored in, for the reason chess was tinted: untinted it sits colder than
     every line of type beside it. Hand-set because an SVG in an `img` cannot
     take `currentColor`. */
  'gear-brain': {
    file: 'gear-brain.svg',
    width: 100,
    height: 100,
    level: 2,
    alt: 'A gear and a brain drawn as one shape, divided down the middle',
    placeholder: false,
    retired: false,
  },
  /* The brand mark, filled white for the Why Mile42 hero. Cut from the blue-500
     master in `design/illustrations/mile42 Logos` with its content-credential
     metadata stripped and the fill flipped; the viewBox was already the painted
     area. The header lockup already names the firm, so every placement of this
     is decorative and the alt is here only because the manifest wants one. */
  'mile42-mark-white': {
    file: 'mile42-mark-white.svg',
    width: 450,
    height: 449,
    level: 1,
    alt: 'The Mile42 mark',
    placeholder: false,
    retired: false,
  },
}

export const illustrations = Object.fromEntries([
  ...Object.entries(META).map(([key, meta]) => {
    const { width, height, variants } = data[key]
    const srcSet = [
      ...variants.map((v) => `${urlFor(`${key}-${v.width}.webp`)} ${v.width}w`),
      `${urlFor(`${key}.webp`)} ${width}w`,
    ].join(', ')

    return [key, { ...meta, src: urlFor(`${key}.webp`), width, height, srcSet }]
  }),
  ...Object.entries(VECTOR).map(([key, { file, ...meta }]) => [
    key,
    { ...meta, src: urlFor(file), srcSet: undefined },
  ]),
])

export const placeholderKeys = Object.entries(illustrations)
  .filter(([, v]) => v.placeholder)
  .map(([k]) => k)
