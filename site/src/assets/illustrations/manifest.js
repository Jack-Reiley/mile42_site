import data from './illustrations.data.json'

/**
 * Illustrations are data, not markup. Pages reference entries by key and never
 * import an image path, so replacing the whole set is one directory plus one
 * edit here.
 *
 * `level` follows the style guide's Level One/Two/Three system:
 *   1: hero scene on a gradient blob with floating accents; hero use only
 *   2: mid-size spot, ink line art with one flat fill
 *   3: small spot
 *
 * Level Three now covers two visual treatments. The `path-*` entries are flat
 * single-colour linework tinted from a token at build time, not the ink-plus-fill
 * drawing the level system was written around. Size is what the level records.
 *
 * `placeholder` marks artwork that is temporary. Everything here is custom
 * artwork, so nothing is flagged. `npm run illustrations:placeholders` reports
 * what remains outstanding, and should stay empty.
 *
 * Dimensions and variants come from `illustrations.data.json`, which is emitted
 * by `npm run illustrations:build` alongside the assets themselves. They are
 * generated rather than hand-written because Vite resolves an imported asset to
 * a URL but does not expose its size, and measuring it at runtime would mean
 * loading the image, the very thing that causes layout shift.
 *
 * Only the human judgement below is authored by hand: alt text, level, and
 * whether the artwork is still a placeholder.
 */

// Resolved through Vite so every file is content-hashed. Keyed by filename.
const urls = import.meta.glob('./*.webp', { eager: true, query: '?url', import: 'default' })
const urlFor = (name) => urls[`./${name}`]

const META = {
  'hero-desk': {
    level: 1,
    alt: 'A person seated at a desk typing, with a cursor, a star and a gear floating around them',
    placeholder: false,
  },
  handshake: {
    level: 2,
    alt: 'A robotic hand and a human hand shaking',
    placeholder: false,
  },
  chess: {
    level: 2,
    alt: 'A human hand and a robotic hand each moving a piece on a chessboard',
    placeholder: false,
  },
  laptop: {
    level: 2,
    alt: 'Hands typing on a laptop',
    placeholder: false,
  },
  lightbulb: {
    level: 3,
    alt: 'A lit lightbulb',
    placeholder: false,
  },
  gears: {
    level: 2,
    alt: 'Two interlocking gears',
    placeholder: false,
  },
  /* Level Two by size. The treatment is a third one: ink linework with no flat
     fill and no tint, so it ships in the artwork's own black rather than being
     recoloured from a token the way the `path-*` masks are. */
  'brain-gear': {
    level: 2,
    alt: 'A brain and a gear drawn as one shape, divided down the middle',
    placeholder: false,
  },
  'path-lightbulb': {
    level: 3,
    alt: 'A lit lightbulb',
    placeholder: false,
  },
  'path-gears': {
    level: 3,
    alt: 'Two interlocking gears',
    placeholder: false,
  },
  'path-handshake': {
    level: 3,
    alt: 'A robotic hand and a human hand shaking',
    placeholder: false,
  },
  'path-clipboard': {
    level: 3,
    alt: 'A clipboard holding a checklist',
    placeholder: false,
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
