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
 * `placeholder` marks artwork that is temporary. Everything here is custom
 * artwork, so nothing is flagged. `npm run illustrations:placeholders` reports
 * what remains outstanding, and should stay empty.
 *
 * Dimensions and variants come from `illustrations.data.json`, which is emitted
 * by `npm run illustrations:build` alongside the assets themselves. They are
 * generated rather than hand-written because Vite resolves an imported asset to
 * a URL but does not expose its size, and measuring it at runtime would mean
 * loading the image — the very thing that causes layout shift.
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
