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
 * Every entry is retired, so nothing here draws anywhere on the site and `Spot`
 * currently cannot render. That is deliberate rather than an oversight, and the
 * plumbing is kept on purpose: the entries stay registered with their alt text
 * and generated dimensions, and the assets are still built, so restoring any of
 * this is a flag change plus band-level layout work rather than a rebuild from
 * nothing. Removing the plumbing is its own ticket, if it is ever wanted.
 *
 * The Spot calls left in the pages are inert for the same reason. They still
 * record which artwork belonged where and at what size. What they no longer
 * record is the layout around them: the heroes, the homepage argument panel,
 * and PathCard were all restructured to close the space the artwork left, so
 * putting art back is a redesign of those bands, not a swap.
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
const urls = import.meta.glob('./*.webp', { eager: true, query: '?url', import: 'default' })
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
}

export const illustrations = Object.fromEntries(
  Object.entries(META).map(([key, meta]) => {
    const { width, height, variants } = data[key]
    const srcSet = [
      ...variants.map((v) => `${urlFor(`${key}-${v.width}.webp`)} ${v.width}w`),
      `${urlFor(`${key}.webp`)} ${width}w`,
    ].join(', ')

    return [key, { ...meta, src: urlFor(`${key}.webp`), width, height, srcSet }]
  }),
)

export const placeholderKeys = Object.entries(illustrations)
  .filter(([, v]) => v.placeholder)
  .map(([k]) => k)
