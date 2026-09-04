#!/usr/bin/env node
/* Builds the assets a social crawler or a browser asks for by name.
 *
 *   design/tokens/theme.css          -> band and text colours
 *   src/assets/mile42-logo*.svg      -> the lockup, and the 42 device cut from it
 *   src/pages/home-hero-copy.js      -> the words on the card
 *
 *     -> public/share-card.png        1200x630, opaque
 *        public/icon.svg              the 42 device, square
 *        public/icon-32.png           tab-sized raster fallback
 *        public/apple-touch-icon.png  180x180, opaque
 *        src/assets/social.data.json  what was drawn, for the suite to check
 *
 * Run with `npm run social:build` from the repository root. Idempotent, and
 * offline: it reads only files already in the tree.
 *
 * Not part of `npm run build`, for the same reason illustrations.mjs is not.
 * The build stays free of native rasterisation, and the outputs are reviewed
 * as committed files rather than regenerated per deploy.
 *
 * The images go to public/ rather than src/assets/ because Vite content-hashes
 * an imported asset's filename. LinkedIn, Slack and X cache a card by its image
 * URL, so a hashed name would silently invalidate every previously shared link
 * on any rebuild. public/ is copied verbatim, which is what makes the path an
 * identifier. The manifest is build metadata rather than a served file, so it
 * stays in src/assets/ beside illustrations.data.json.
 *
 * On fonts: see ./woff-to-ttf.mjs. The renderer substitutes silently when a
 * family is missing, so this script builds its own fontconfig environment and
 * then proves the substitution did not happen. Never hand-edit the emitted
 * JSON or the generated images.
 */

import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { familyName, woffToTtf } from './woff-to-ttf.mjs'

const run = promisify(execFile)

const HERE = dirname(fileURLToPath(import.meta.url))
const SITE = resolve(HERE, '..')
const ROOT = resolve(SITE, '..')
const PUBLIC = join(SITE, 'public')

const CARD = { width: 1200, height: 630 }

/* Mixed case, a numeral and a curly apostrophe, so a face that only half
   resolved shows up as a difference rather than passing on the letters. */
const PROBE_TEXT = 'Mile42 — Execution, Rebuilt. We didn\u2019t.'
const APPLE_TOUCH_SIZE = 180
const ICON_PNG_SIZE = 32

/* Both families reach us as .woff only. `style` is what fontconfig will match
   against, and `family` is what the SVG asks for. */
const FONTS = [
  {
    family: 'Merriweather Sans',
    file: '@fontsource/merriweather-sans/files/merriweather-sans-latin-700-normal.woff',
  },
  {
    family: 'Figtree',
    file: '@fontsource/figtree/files/figtree-latin-400-normal.woff',
  },
]

const readText = (...parts) => readFile(join(...parts), 'utf8')

/* ---------------------------------------------------------------- colours */

/* The card must not carry its own copy of the palette. A hex pasted here would
   keep rendering the old brand after a token moved, and nothing would say so. */
const token = (css, name) => {
  const found = css.match(new RegExp(`--color-${name}:\\s*([^;]+);`))
  if (!found) throw new Error(`theme.css has no --color-${name}`)
  return found[1].trim()
}

const hexToRgb = (hex) => {
  const value = hex.replace('#', '')
  const full = value.length === 3 ? [...value].map((c) => c + c).join('') : value
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
}

const rgbToHex = (rgb) => '#' + rgb.map((c) => c.toString(16).padStart(2, '0')).join('')

/* primitives.jsx draws the hero band as the accent darkened 8%, expressed as a
   color-mix the browser resolves. librsvg has no color-mix, so the same
   operation happens here rather than the result being transcribed. */
const mixWithBlack = (hex, percent) =>
  rgbToHex(hexToRgb(hex).map((c) => Math.round(c * (percent / 100))))

const palette = async () => {
  const css = await readText(ROOT, 'design', 'tokens', 'theme.css')
  return {
    band: mixWithBlack(token(css, 'accent'), 92),
    text: token(css, 'hero-heading'),
    lockup: token(css, 'surface'),
    mark: '#262322',
  }
}

/* ------------------------------------------------------------------ fonts */

/* A fontconfig environment holding nothing but the two brand faces. Scoping it
   this tightly is deliberate: it makes a missing family fail loudly here rather
   than resolve to whatever the host happens to have installed. */
const prepareFonts = async () => {
  const dir = await mkdtemp(join(tmpdir(), 'mile42-social-'))
  const fonts = join(dir, 'fonts')
  await mkdir(fonts)

  for (const { family, file } of FONTS) {
    const ttf = woffToTtf(await readFile(join(SITE, 'node_modules', file)))

    /* The family in the file is what the renderer matches against, so a font
       that does not name itself what the card asks for would be substituted
       away silently. Checked here, where the answer is still unambiguous. */
    const declared = familyName(ttf)
    if (declared !== family) {
      throw new Error(`${file} declares the family "${declared}", not "${family}"`)
    }

    const path = join(fonts, `${family.replace(/\s+/g, '-')}.ttf`)
    await writeFile(path, ttf)

    /* Read back rather than trusting the write. An environment holding none of
       the faces it should still renders — the renderer substitutes — so the
       only moment this is unambiguous is here, against the directory the
       renderer is about to be pointed at. */
    if (familyName(await readFile(path)) !== family) {
      throw new Error(`the prepared font environment does not hold ${family}`)
    }
  }

  const config = join(dir, 'fonts.conf')
  await writeFile(
    config,
    `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fonts}</dir>
  <cachedir>${join(dir, 'cache')}</cachedir>
</fontconfig>
`,
  )
  return { dir, config }
}

/* ----------------------------------------------------------------- layout */

const escapeXml = (text) =>
  text.replace(/[&<>"']/g, (c) => `&${{ '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' }[c]};`)

const textElement = ({ text, x, y, font, size, weight, fill }) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" ` +
  `fill="${fill}" xml:space="preserve">${escapeXml(text)}</text>`

/* Measured rather than estimated. SVG has no line box, so the wrap has to know
   real widths, and character-count heuristics drift badly between a condensed
   heading face and a body face. Each distinct line is rendered once and its ink
   extent read back, which is exact for the only question being asked. */
const createMeasurer = (sharp) => {
  const cache = new Map()

  return async (text, { font, size, weight }) => {
    const key = `${font}|${size}|${weight}|${text}`
    if (cache.has(key)) return cache.get(key)

    const probe =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width * 3}" height="${Math.ceil(size * 3)}">` +
      textElement({ text, x: 0, y: size * 1.4, font, size, weight, fill: '#000' }) +
      '</svg>'

    const { info } = await sharp(Buffer.from(probe))
      .trim({ threshold: 0 })
      .png()
      .toBuffer({ resolveWithObject: true })

    const width = text.trim() === '' ? 0 : info.width
    cache.set(key, width)
    return width
  }
}

const wrap = async (text, style, maxWidth, measure) => {
  const lines = []
  let line = ''

  for (const word of text.split(' ')) {
    const candidate = line === '' ? word : `${line} ${word}`
    if (line !== '' && (await measure(candidate, style)) > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line !== '') lines.push(line)
  return lines
}

/* The hero's H1 carries `text-balance`, which evens the line lengths rather
   than filling each line before breaking. Greedy wrapping leaves the headline
   with a long first line and a stub second one, which is exactly the look that
   property exists to avoid, so the heading gets the same treatment here: the
   narrowest measure that still yields the same number of lines. */
const balancedWrap = async (text, style, maxWidth, measure) => {
  const target = (await wrap(text, style, maxWidth, measure)).length
  if (target < 2) return wrap(text, style, maxWidth, measure)

  let tooNarrow = 0
  let workable = maxWidth

  while (workable - tooNarrow > 1) {
    const middle = Math.floor((tooNarrow + workable) / 2)
    const lines = await wrap(text, style, middle, measure)
    if (lines.length <= target) workable = middle
    else tooNarrow = middle
  }
  return wrap(text, style, workable, measure)
}

/* ------------------------------------------------------------- share card */

const PAD = 76
const LOCKUP_WIDTH = 248
const LOCKUP_RATIO = 121.05 / 242.1

/* Faces, weights and colours are the hero's own, and the heading keeps the
   hero's tight 1.105 leading, which is a visible characteristic of the
   headline style.

   The type scale is not the hero's. The page sets a 57px headline against an
   18px lead, a ratio of 3.2 that works at full width; held to that ratio the
   card's lead would land near 7px once a feed scales the image to ~500px, and
   SCN-012 asks for a lead a reader can actually read there. The lead is set
   larger relative to the headline for that reason, and its leading sits
   between the card's density and the hero's airier 1.78. */
const KICKER = { font: 'Figtree', size: 27, weight: 400, leading: 44 }
const HEADING = { font: 'Merriweather Sans', size: 55, weight: 700, leading: 61 }
const LEAD = { font: 'Figtree', size: 29, weight: 400, leading: 46 }

const GAP_AFTER_LOCKUP = 46
const GAP_AFTER_KICKER = 14
const GAP_AFTER_HEADING = 28

const composeCard = async ({ copy, colours, lockupPaths, sharp }) => {
  const measure = createMeasurer(sharp)
  const contentWidth = CARD.width - PAD * 2

  const headingLines = await balancedWrap(copy.heading, HEADING, contentWidth, measure)
  const leadLines = await wrap(copy.lead, LEAD, contentWidth, measure)

  const lockupHeight = LOCKUP_WIDTH * LOCKUP_RATIO
  const blockHeight =
    lockupHeight +
    GAP_AFTER_LOCKUP +
    KICKER.leading +
    GAP_AFTER_KICKER +
    headingLines.length * HEADING.leading +
    GAP_AFTER_HEADING +
    /* The final block contributes its ink, not its leading box. Counting the
       last line's full leading would push the whole stack above centre by the
       descender space underneath it. */
    (leadLines.length - 1) * LEAD.leading +
    LEAD.size

  let cursor = Math.round((CARD.height - blockHeight) / 2)

  const lockup =
    `<g transform="translate(${PAD} ${cursor}) scale(${LOCKUP_WIDTH / 242.1})">` +
    `<g transform="translate(-23.9 -11.365)">` +
    lockupPaths.map((d) => `<path fill="${colours.lockup}" d="${d}"/>`).join('') +
    '</g></g>'

  cursor += lockupHeight + GAP_AFTER_LOCKUP

  const drawLines = (lines, style) =>
    lines.map((text, i) => {
      /* The baseline sits a little below the top of the line box; 0.78 of the
         size is where these two faces' cap height lands. */
      const y = Math.round(cursor + i * style.leading + style.size * 0.78)
      return textElement({ text, x: PAD, y, font: style.font, size: style.size, weight: style.weight, fill: colours.text })
    }).join('')

  const kicker = drawLines([copy.kicker], KICKER)
  cursor += KICKER.leading + GAP_AFTER_KICKER

  const heading = drawLines(headingLines, HEADING)
  cursor += headingLines.length * HEADING.leading + GAP_AFTER_HEADING

  const lead = drawLines(leadLines, LEAD)

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width}" height="${CARD.height}" ` +
    `viewBox="0 0 ${CARD.width} ${CARD.height}">` +
    `<rect width="${CARD.width}" height="${CARD.height}" fill="${colours.band}"/>` +
    lockup + kicker + heading + lead +
    '</svg>'

  return { svg, headingLines, leadLines }
}

/* --------------------------------------------------------------- fallback */

/* SCN-007. librsvg answers a missing family with a substitute and no warning,
   so a correct-looking script can ship a card set in whatever the host had.

   Three things can go wrong and all three have to be excluded. An environment
   holding none of the intended faces is caught in prepareFonts, by reading each
   font back off disk; it cannot be caught from pixels, because text that drew
   nothing still fills a canvas that trims to its own bounds. The other two are
   caught here: both families resolving to one face, and the renderer reaching
   past the prepared environment to a system face. */
const probeFor = (family, size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="${size * 2}">` +
  `<rect width="1600" height="${size * 2}" fill="#fff"/>` +
  textElement({ text: PROBE_TEXT, x: 10, y: size * 1.3, font: family, size, weight: 700, fill: '#000' }) +
  '</svg>'

/* The baseline has to run in its own process: fontconfig resolves its
   configuration once, so the same process cannot also ask what an unprepared
   environment would have produced. */
const renderWithoutPreparedFonts = async (probeSvg, dir) => {
  const svgPath = join(dir, 'probe.svg')
  const outPath = join(dir, 'probe-fallback.png')
  await writeFile(svgPath, probeSvg)

  /* Files rather than stdin: execFile has no input option, and a child that
     never sees end-of-stream simply hangs. */
  const script =
    "const sharp = require('sharp');" +
    'const [svg, out] = process.argv.slice(1);' +
    'sharp(svg).png().toFile(out);'

  const { FONTCONFIG_FILE, ...withoutConfig } = process.env
  await run(process.execPath, ['-e', script, svgPath, outPath], { cwd: SITE, env: withoutConfig })

  return readFile(outPath)
}

const assertBrandFonts = async (sharp, dir) => {
  const [headingProbe, bodyProbe] = FONTS.map(({ family }) => probeFor(family, 55))

  const [heading, body] = await Promise.all([
    sharp(Buffer.from(headingProbe)).png().toBuffer(),
    sharp(Buffer.from(bodyProbe)).png().toBuffer(),
  ])

  if (heading.equals(body)) {
    throw new Error(
      `${FONTS[0].family} and ${FONTS[1].family} rendered identically, so both resolved to one face`,
    )
  }

  const unprepared = await renderWithoutPreparedFonts(headingProbe, dir)
  if (unprepared.equals(heading)) {
    throw new Error(
      'the heading rendered identically without the prepared fonts, so the renderer substituted a ' +
        'system face; the card would ship off-brand',
    )
  }
}

/* ------------------------------------------------------------------ icons */

/* The wordmark is a 2:1 lockup and unreadable at tab size, and the brand has no
   separate square mark. The 42-in-broken-circle inside the lockup is square on
   its own, so the icon is cut from the same master rather than drawn anew: the
   three device paths, in the lockup's own coordinates, framed to the circle. */
const EXPECTED_LOCKUP_PATHS = 7
const DEVICE_PATH_INDEXES = [0, 1, 6]
const DEVICE_BOX = { x: 146, y: 11.865, size: 120 }

/* iOS masks a touch icon to a rounded square, so that one is drawn with room
   around the device. A tab favicon is masked by nothing and is only 32px
   across, so it takes the whole square. */
const APPLE_TOUCH_PADDING = 12

const iconSvg = (paths, fill, background, padding = 0) => {
  const x = DEVICE_BOX.x - padding
  const y = DEVICE_BOX.y - padding
  const size = DEVICE_BOX.size + padding * 2

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${size} ${size}" width="512" height="512">` +
    (background ? `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${background}"/>` : '') +
    paths.map((d) => `<path fill="${fill}" d="${d}"/>`).join('') +
    '</svg>'
  )
}

/* --------------------------------------------------------------- assembly */

const pathsFrom = (svg) => [...svg.matchAll(/<path\b[^>]*?\bd="([^"]*)"/gs)].map((m) => m[1])

const main = async () => {
  const colours = await palette()

  const lockupShapes = pathsFrom(await readText(SITE, 'src', 'assets', 'mile42-logo.svg'))
  if (lockupShapes.length !== EXPECTED_LOCKUP_PATHS) {
    throw new Error(
      `the lockup now has ${lockupShapes.length} paths, not ${EXPECTED_LOCKUP_PATHS}; ` +
        'the icon is cut from it by position and must be re-cut',
    )
  }
  const devicePaths = DEVICE_PATH_INDEXES.map((i) => lockupShapes[i])
  const lockupPaths = pathsFrom(await readText(SITE, 'src', 'assets', 'mile42-logo-light.svg'))

  const { HOME_HERO } = await import(join(SITE, 'src', 'pages', 'home-hero-copy.js'))

  const fonts = await prepareFonts()
  process.env.FONTCONFIG_FILE = fonts.config

  /* Imported only now. fontconfig reads its configuration the first time the
     renderer touches text, so the environment has to be in place beforehand. */
  const sharp = (await import('sharp')).default

  try {
    const { svg, headingLines, leadLines } = await composeCard({
      copy: HOME_HERO,
      colours,
      lockupPaths,
      sharp,
    })

    const card = await sharp(Buffer.from(svg))
      .flatten({ background: colours.band })
      .png({ compressionLevel: 9, palette: false })
      .toBuffer()

    await assertBrandFonts(sharp, fonts.dir)

    const icon = iconSvg(devicePaths, colours.mark, null)
    const appleTouch = await sharp(Buffer.from(iconSvg(devicePaths, colours.lockup, colours.band, APPLE_TOUCH_PADDING)))
      .resize(APPLE_TOUCH_SIZE, APPLE_TOUCH_SIZE)
      .flatten({ background: colours.band })
      .png({ compressionLevel: 9 })
      .toBuffer()
    const iconPng = await sharp(Buffer.from(iconSvg(devicePaths, colours.mark, null)))
      .resize(ICON_PNG_SIZE, ICON_PNG_SIZE)
      .png({ compressionLevel: 9 })
      .toBuffer()

    await writeFile(join(PUBLIC, 'share-card.png'), card)
    await writeFile(join(PUBLIC, 'icon.svg'), icon + '\n')
    await writeFile(join(PUBLIC, 'icon-32.png'), iconPng)
    await writeFile(join(PUBLIC, 'apple-touch-icon.png'), appleTouch)

    await writeFile(
      join(SITE, 'src', 'assets', 'social.data.json'),
      JSON.stringify(
        {
          shareCard: {
            width: CARD.width,
            height: CARD.height,
            band: colours.band,
            copy: HOME_HERO,
            headingLines,
            leadLines,
          },
          icon: { deviceBox: DEVICE_BOX, pngSize: ICON_PNG_SIZE, appleTouchSize: APPLE_TOUCH_SIZE },
          fonts: FONTS.map((f) => f.family),
        },
        null,
        2,
      ) + '\n',
    )

    console.log(`share-card.png  ${CARD.width}x${CARD.height}  ${(card.length / 1024).toFixed(1)}kB`)
    console.log(`heading         ${headingLines.length} lines`)
    console.log(`lead            ${leadLines.length} lines`)
    console.log(`icon.svg, icon-32.png, apple-touch-icon.png`)
  } finally {
    await rm(fonts.dir, { recursive: true, force: true })
  }
}

await main()
