import heroDesk from './hero-desk.webp'
import handshake from './handshake.webp'
import laptop from './laptop.webp'
import lightbulb from './lightbulb.webp'

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
 * `placeholder: true` means the artwork is temporary. The current set was
 * sourced from elsewhere and is being replaced by custom illustrations, so
 * treat "no placeholders remaining" as a gate before any public deploy.
 * `npm run illustrations:placeholders` lists what is still outstanding.
 */
export const illustrations = {
  'hero-desk': {
    src: heroDesk,
    level: 1,
    alt: 'A person at a desk working at a computer, surrounded by a cursor, a star and a gear',
    placeholder: true,
  },
  handshake: {
    src: handshake,
    level: 2,
    alt: 'A robotic hand and a human hand shaking',
    placeholder: true,
  },
  laptop: {
    src: laptop,
    level: 2,
    alt: 'Hands typing on a laptop',
    placeholder: true,
  },
  lightbulb: {
    src: lightbulb,
    level: 3,
    alt: 'A lit lightbulb',
    placeholder: true,
  },
}

export const placeholderKeys = Object.entries(illustrations)
  .filter(([, v]) => v.placeholder)
  .map(([k]) => k)
