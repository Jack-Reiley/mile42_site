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
 * `placeholder` marks artwork that is temporary. Everything here is now custom
 * artwork, so nothing is flagged. `npm run illustrations:placeholders` reports
 * what remains outstanding, and should stay empty.
 *
 * These files are built from the masters in `design/illustrations/` by
 * `npm run illustrations:build`. Do not edit them by hand.
 */
export const illustrations = {
  'hero-desk': {
    src: heroDesk,
    level: 1,
    alt: 'A person seated at a desk typing, with a cursor, a star and a gear floating around them',
    placeholder: false,
  },
  handshake: {
    src: handshake,
    level: 2,
    alt: 'A robotic hand and a human hand shaking',
    placeholder: false,
  },
  laptop: {
    src: laptop,
    level: 2,
    alt: 'Hands typing on a laptop',
    placeholder: false,
  },
  lightbulb: {
    src: lightbulb,
    level: 3,
    alt: 'A lit lightbulb',
    placeholder: false,
  },
}

export const placeholderKeys = Object.entries(illustrations)
  .filter(([, v]) => v.placeholder)
  .map(([k]) => k)
