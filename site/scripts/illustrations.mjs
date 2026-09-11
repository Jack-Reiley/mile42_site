#!/usr/bin/env node
/* Builds the site's illustration assets from the masters in design/illustrations.
 *
 *   design/illustrations/<master>.png
 *     -> trim to the alpha bounding box   (removes transparent margin only)
 *     -> tint, if the entry asks for one  (RGB replaced, alpha untouched)
 *     -> encode lossless WebP             (artwork preserved exactly)
 *     -> site/src/assets/illustrations/<key>.webp          full size
 *        site/src/assets/illustrations/<key>-<w>.webp      responsive variants
 *     -> site/src/assets/illustrations/illustrations.data.json
 *
 * Lossless is verified rather than asserted: the full-size asset is compared
 * against its own trimmed master, and any pixel with alpha > 0 that differs
 * fails the build. Fully transparent pixels are exempt because their RGB is
 * meaningless and WebP normalises it.
 *
 * A tinted entry is held to a stricter assertion instead: every alpha value
 * must still be byte-identical to the trimmed master, and every visible pixel
 * must carry exactly the tint. The masters for these are single-colour alpha
 * masks, so recolouring is one exact operation and a drifted mask fails the
 * build rather than shipping.
 *
 * Variants are downscales of that same artwork. They are necessarily
 * resampled, so they are not pixel-compared; the full-size asset is the one
 * that must be untouched.
 *
 * Dimensions and variant lists are emitted as data because Vite resolves an
 * imported asset to a URL but does not expose its size, and reading it at
 * runtime would require loading the image — the very thing that causes layout
 * shift. Never hand-edit the emitted JSON.
 *
 * Run with `npm run illustrations:build`. Idempotent.
 */

import sharp from 'sharp'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(SITE, '..')
const MASTERS = join(ROOT, 'design', 'illustrations')
const THEME = join(ROOT, 'design', 'tokens', 'theme.css')
const OUT = join(SITE, 'src', 'assets', 'illustrations')

/**
 * Master filename -> illustration key, the variant widths to emit, and an
 * optional `tint` naming a colour token, or `mask` for a single-colour master
 * whose colour is not a token. Both go through the same recolour, assertion,
 * and thickening; the difference is only where the colour comes from.
 *
 * `refill` is for ink-and-fill artwork instead: it names the token the flat
 * fill is swapped to, leaving the ink line and the grain as drawn.
 *
 * Widths trace to real rendered sizes rather than arbitrary breakpoints:
 *   hero  — `max-w-[34rem]` is 544px, so ~1088 at 2x DPR; a 375px viewport
 *           renders it near 343px, so ~686 at 2x
 *   spots — `w-28 lg:w-32` is 112–128px, so ~256 at 2x
 *   paths — 64px rendered, so ~128 at 2x
 * A variant wider than the artwork itself is skipped rather than upscaled.
 *
 * `tint` is a token name rather than a hex, so the colour stays a reference to
 * `design/tokens/theme.css` and a token change propagates on the next build
 * instead of requiring new binaries.
 */
const MAP = {
  'pc_user_with_color.png': { key: 'hero-desk', widths: [384, 768, 1100] },
  // 256 for the home page's offering spot, which renders near 128px. 704 is the
  // Meet Vickee hero: `max-w-[22rem]` is 352px, so 704 at 2x. Without it a 2x
  // screen falls past the 512 to the full-size master, which is 284KB and the
  // LCP image on that page.
  'robo_handshake_with_color.png': { key: 'handshake', widths: [256, 512, 704] },
  'laptop_with_color.png': { key: 'laptop', widths: [256, 512] },
  'lightbulb_with_color.png': { key: 'lightbulb', widths: [256, 512] },
  // The How we work hero renders it near 352px, so 384/768 covers 1x and 2x.
  'gears_with_color.png': { key: 'gears', widths: [384, 768] },
  // The home page's anti-consulting panel renders it at 128px stacked and 208px
  // beside the copy, so 128/256 covers the phone at 1x and 2x and 256/416 the
  // card's own column at both.
  'Brain_gear.png': { key: 'brain-gear', widths: [128, 256, 416] },
  'lightbulb_mono.png': { key: 'path-lightbulb', widths: [64, 128, 256], tint: '--color-orange' },
  'gears_mono.png': { key: 'path-gears', widths: [64, 104, 128, 208, 256], tint: '--color-brand' },
  // 64/128/256 for the 64px path card, 104/208 for the 52px feature panel. The
  // 64w matters: without a 1x candidate the browser hands a 1x screen the 104w
  // and downscales it itself, which averages back some of the alpha work below.
  'handshake_mono.png': { key: 'path-handshake', widths: [64, 104, 128, 208, 256], tint: '--color-red' },
  'clipboard_mono.png': { key: 'path-clipboard', widths: [104, 208], tint: '--color-orange' },
  // The Meet Vickee context lede renders it at 340px, so 340/680 covers 1x and
  // 2x. Tinted rather than left as authored: the master is pure black on alpha
  // and the site's ink is a warm brown, so untinted it would sit colder than
  // every line of type beside it. Being a mask, it takes the same exact-tint
  // assertion the path spots do.
  'chess_mono.png': { key: 'chess', widths: [340, 680], tint: '--color-ink' },
  // The Meet Vickee hero. It fills a 390px column at `lg` and is capped at 352px
  // below it, so 400 covers 1x and 800 covers 2x at both. The 2x candidate is
  // what matters here: at 390px rendered a retina screen wants 780, and without
  // an 800 the nearest candidate up is the 1674w master at 683KB. Untinted:
  // this is authored full-colour artwork, not an alpha mask, so it ships in the
  // colours it was drawn in.
  //
  // It costs far more than anything else here — roughly 124KB at 384w against
  // gears' 49KB. The drawing is built on soft gradient blobs and a stipple
  // texture rather than flat fills, and lossless WebP cannot reduce smooth
  // noise. Recorded on #105 rather than solved by dropping the lossless
  // guarantee, which the tinted masks depend on.
  'vickee_librarian_with_color.png': { key: 'vickee-librarian', widths: [400, 800] },
  // The How we work hero, in the slot the gears held. Same 384/768 as the gears
  // for the same reason: the column renders near 352px, so that covers 1x and 2x.
  // Untinted, full-colour artwork like the librarian.
  'robot_gear_team_with_color.png': { key: 'robot-team', widths: [384, 768] },
  // The Advisory path card's icon, in the slot `path-lightbulb` held and at the
  // same 64px, so the same 64/128/256. The master is already the orange token
  // on alpha; it is still registered as a tint so the build asserts that rather
  // than trusting the export, and so a token change reaches it.
  'lightbulb_target_mono_orange.png': { key: 'path-lightbulb-target', widths: [64, 128, 256], tint: '--color-orange' },
  // The Engineering path card's icon, in the slot `path-gears` held. A mask in
  // a single green, #60e2a0, that is not a token, so `mask` rather than `tint`:
  // it ships in the colour it was exported in, and still takes the thickening
  // below. Left as plain artwork it arrived at 64px with roughly half the
  // stroke alpha of the two tinted icons beside it.
  'gears_trio_mono_green.png': { key: 'path-gears-trio', widths: [64, 128, 256], mask: true },
  // The AI products path card's icon, in the slot `path-handshake` held.
  // Exactly the red token on alpha, so tinted.
  'phone_circuit_mono_red.png': { key: 'path-phone-circuit', widths: [64, 128, 256], tint: '--color-red' },
  // The Phase Zero panels, in the slot `path-clipboard` held. FeaturePanel
  // renders a Level Two spot at 112px, so 112/224 covers 1x and 2x. Ink line
  // over one fill; the fill was painted accent blue and is swapped to sky,
  // which on the panel's off-white surface reads as the lens rather than as a
  // solid disc.
  'magnifier_gear_with_color.png': { key: 'magnifier-gear', widths: [112, 224], refill: '--color-sky' },
  // Built but not placed: the mono cut of the same drawing, kept for the day a
  // panel on a dark band wants the single-colour treatment.
  'magnifier_gear_mono.png': { key: 'path-magnifier-gear', widths: [104, 208], mask: true },
}

/**
 * The one colour a `mask` master is drawn in. Read from the visible pixels and
 * refused if there is more than one, so a master that is not actually a mask
 * fails the build rather than being flattened to whichever colour came first.
 */
async function masterRgb(trimmedBuf, label) {
  const { data } = await sharp(trimmedBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const seen = new Set()
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue
    seen.add((data[i] << 16) | (data[i + 1] << 8) | data[i + 2])
    if (seen.size > 1) throw new Error(`${label}: mask master carries more than one colour`)
  }
  const [packed] = seen
  return [packed >> 16, (packed >> 8) & 255, packed & 255]
}

/** The declared value of a colour token, read the way the token checker does. */
function tokenRgb(name) {
  const css = readFileSync(THEME, 'utf8')
  const declared = css.match(new RegExp(`^\\s*${name}\\s*:\\s*([^;]+);`, 'm'))?.[1].trim()
  const hex = declared?.match(/^#([0-9a-f]{6})$/i)?.[1]
  if (!hex) throw new Error(`Tint token ${name} is missing from theme.css or is not a 6-digit hex`)
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
}

/** Fails if the encode altered any visible pixel. */
async function assertVisuallyLossless(trimmedBuf, encodedBuf, label) {
  const a = await sharp(trimmedBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const b = await sharp(encodedBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  if (a.info.width !== b.info.width || a.info.height !== b.info.height) {
    throw new Error(`${label}: size changed during encode`)
  }

  let visible = 0
  let alpha = 0
  for (let i = 0; i < a.data.length; i += 4) {
    if (a.data[i + 3] !== b.data[i + 3]) alpha++
    if (a.data[i + 3] === 0) continue // fully transparent: RGB is meaningless
    if (
      a.data[i] !== b.data[i] ||
      a.data[i + 1] !== b.data[i + 1] ||
      a.data[i + 2] !== b.data[i + 2]
    ) {
      visible++
    }
  }
  if (visible || alpha) {
    throw new Error(
      `${label}: encode was not lossless — ${visible} visible pixel(s) and ${alpha} alpha value(s) changed`,
    )
  }
  return a.info
}

/**
 * How far the alpha of a downscaled mask is pulled back up. Applied as
 * `a ** ALPHA_GAMMA`, so 0 and 255 are fixed points and only the antialiasing
 * in between moves.
 *
 * The masters are line drawings a thousand pixels wide whose ink is 80% solid.
 * Resampled down for a path card, a stroke lands on well under a pixel and the
 * ink arrives around a third of full alpha, so on the navy band the average ink
 * pixel composites to under 2:1 rather than the 4–5.8:1 the tint itself reaches.
 * The drawing is legible; its coverage is not.
 *
 * 0.6 lifts that by roughly half again. It cannot spread ink into a pixel the
 * resample left empty, so the shape is the artwork's, not this script's. It is
 * the smaller of the two levers: the render size in `MAP` is the other, and
 * moving the card from 48px to 64px did more than the curve did.
 */
const ALPHA_GAMMA = 0.6

const ALPHA_CURVE = Uint8Array.from({ length: 256 }, (_, a) =>
  Math.round(255 * (a / 255) ** ALPHA_GAMMA),
)

/**
 * How far a mask is grown, in master pixels, before it is downscaled.
 *
 * The curve above can only re-weight pixels the resample already touched. This
 * adds stroke where there was none, which is the difference between a stroke
 * that survives a 16x reduction and one that dissolves into it.
 *
 * 2 is where the busiest drawing stops tolerating it: at 4 the handshake's
 * knuckle hatching closes up into a solid mass, while the lightbulb and the
 * gears would still take more. The radius that suits every master is the one
 * the densest master allows.
 */
const DILATE_RADIUS = 2

/**
 * Morphological dilate on the alpha channel, as two separable max passes.
 *
 * The masters are alpha masks whose RGB is already the flat tint on every
 * pixel, transparent ones included, so growing alpha can only expose more of
 * that one colour. On artwork with real RGB it would drag colour outward, which
 * is why only tinted entries take it.
 */
function dilateAlpha(data, width, height, radius) {
  const pass = (src, dst, stride, outer, inner) => {
    for (let o = 0; o < outer; o++) {
      for (let i = 0; i < inner; i++) {
        let max = 0
        for (let d = -radius; d <= radius; d++) {
          const at = i + d
          if (at < 0 || at >= inner) continue
          const a = src[((stride === 1 ? o * width + at : at * width + o) << 2) + 3]
          if (a > max) max = a
        }
        dst[((stride === 1 ? o * width + i : i * width + o) << 2) + 3] = max
      }
    }
  }

  const horizontal = new Uint8ClampedArray(data)
  pass(data, horizontal, 1, height, width)
  const both = new Uint8ClampedArray(horizontal)
  pass(horizontal, both, width, width, height)
  return both
}

/** Grows a tinted mask ahead of the downscale. Variants only, as with the curve. */
async function thickenMask(tintedBuf) {
  const { data, info } = await sharp(tintedBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const grown = dilateAlpha(data, info.width, info.height, DILATE_RADIUS)

  return sharp(Buffer.from(grown), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer()
}

/**
 * Re-weights the alpha of an already-resized mask. Variants only: the full-size
 * asset is the one held pixel-identical to its master, and the masters are
 * solid enough at full size that the curve would be a no-op there anyway.
 */
async function boostVariantAlpha(resizedBuf) {
  const { data, info } = await sharp(resizedBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 3; i < data.length; i += 4) data[i] = ALPHA_CURVE[data[i]]

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer()
}

/**
 * Swaps the one flat fill in an ink-and-fill drawing for a token colour.
 *
 * The masters at this level are ink line over a single fill with grain on it,
 * so every pixel is read as a mix of the ink and the fill's mean, plus a small
 * residual that is the grain (or the antialiasing at an edge). The mix is kept
 * and the residual is carried over, so the line, the edges and the texture all
 * survive; only the colour underneath them changes. Alpha is untouched.
 *
 * The fill's mean is measured from the pixels far from the ink rather than
 * declared, because the grain pulls it away from whichever token it was
 * painted with.
 */
async function refillArtwork(trimmedBuf, ink, target) {
  const { data, info } = await sharp(trimmedBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const dist = (i) => Math.hypot(data[i] - ink[0], data[i + 1] - ink[1], data[i + 2] - ink[2])
  const fill = [0, 0, 0]
  let n = 0
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 255 || dist(i) < 150) continue
    fill[0] += data[i]
    fill[1] += data[i + 1]
    fill[2] += data[i + 2]
    n++
  }
  if (!n) throw new Error('refill: no fill pixels found away from the ink')
  for (let c = 0; c < 3; c++) fill[c] /= n

  const axis = fill.map((f, c) => f - ink[c])
  const axisLength = axis[0] ** 2 + axis[1] ** 2 + axis[2] ** 2
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue
    const p = [data[i], data[i + 1], data[i + 2]]
    const along = p.reduce((sum, v, c) => sum + (v - ink[c]) * axis[c], 0) / axisLength
    const t = Math.min(1, Math.max(0, along))
    for (let c = 0; c < 3; c++) {
      const residual = p[c] - (ink[c] + t * axis[c])
      data[i + c] = Math.min(255, Math.max(0, Math.round(ink[c] + t * (target[c] - ink[c]) + residual)))
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer()
}

/** Replaces RGB with the tint on every pixel, leaving alpha untouched. */
async function applyTint(trimmedBuf, [r, g, b]) {
  const { data, info } = await sharp(trimmedBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    data[i] = r
    data[i + 1] = g
    data[i + 2] = b
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer()
}

/** Fails if the tint altered the mask or if any visible pixel is off-colour. */
async function assertTinted(trimmedBuf, encodedBuf, [r, g, b], label) {
  const master = await sharp(trimmedBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const out = await sharp(encodedBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  if (master.info.width !== out.info.width || master.info.height !== out.info.height) {
    throw new Error(`${label}: size changed during tint`)
  }

  let alpha = 0
  let offColour = 0
  for (let i = 0; i < master.data.length; i += 4) {
    if (master.data[i + 3] !== out.data[i + 3]) alpha++
    if (out.data[i + 3] === 0) continue // fully transparent: RGB is meaningless
    if (out.data[i] !== r || out.data[i + 1] !== g || out.data[i + 2] !== b) offColour++
  }
  if (alpha || offColour) {
    throw new Error(
      `${label}: tint was not exact — ${alpha} alpha value(s) changed and ` +
        `${offColour} visible pixel(s) are not the tint colour`,
    )
  }
  return out.info
}

async function main() {
  if (!existsSync(MASTERS)) throw new Error(`No masters directory at ${MASTERS}`)
  await mkdir(OUT, { recursive: true })

  const present = (await readdir(MASTERS)).filter((f) => f.toLowerCase().endsWith('.png'))
  const unregistered = present.filter((f) => !MAP[f])
  if (unregistered.length) {
    throw new Error(
      `Unregistered master(s): ${unregistered.join(', ')}. Add them to MAP in site/scripts/illustrations.mjs.`,
    )
  }

  const data = {}
  const written = new Set()

  for (const [file, { key, widths, tint, mask, refill }] of Object.entries(MAP)) {
    const src = join(MASTERS, file)
    if (!existsSync(src)) throw new Error(`Missing master for "${key}": ${file}`)

    const trimmed = await sharp(src).trim({ threshold: 0 }).png().toBuffer()
    const rgb = tint ? tokenRgb(tint) : mask ? await masterRgb(trimmed, key) : null
    // A refilled master is the artwork the lossless check is held to: the swap
    // is the intended change, and everything after it must still be exact.
    const artwork = refill ? await refillArtwork(trimmed, tokenRgb('--color-ink'), tokenRgb(refill)) : trimmed
    const source = rgb ? await applyTint(trimmed, rgb) : artwork
    const full = await sharp(source).webp({ lossless: true, effort: 6 }).toBuffer()
    const info = rgb
      ? await assertTinted(trimmed, full, rgb, key)
      : await assertVisuallyLossless(artwork, full, key)
    await writeFile(join(OUT, `${key}.webp`), full)
    written.add(`${key}.webp`)

    // Only the tinted entries are grown and curved. They are the single-colour
    // masks, where every pixel already carries the tint and moving alpha cannot
    // pull a second colour into the edge. The full-colour artwork has its own
    // edges to respect, and the full-size asset above is untouched by both.
    const variantSource = rgb ? await thickenMask(source) : source

    const variants = []
    for (const w of widths) {
      if (w >= info.width) continue // never upscale
      const resized = await sharp(variantSource).resize({ width: w }).png().toBuffer()
      const shaped = rgb ? await boostVariantAlpha(resized) : resized
      const buf = await sharp(shaped).webp({ quality: 90, effort: 6 }).toBuffer()
      const meta = await sharp(buf).metadata()
      await writeFile(join(OUT, `${key}-${w}.webp`), buf)
      written.add(`${key}-${w}.webp`)
      variants.push({ width: meta.width, height: meta.height, bytes: buf.length })
    }

    data[key] = { width: info.width, height: info.height, variants }

    const vs = variants.map((v) => `${v.width}w`).join(' ') || 'none'
    console.log(
      `  ${key.padEnd(15)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ` +
        `${String(Math.round(full.length / 1024)).padStart(5)}KB  ` +
        `${rgb ? `${tint ?? 'own colour'} tint verified` : refill ? `${refill} refill verified` : 'lossless verified'.padEnd(14)}   variants: ${vs}`,
    )
  }

  // The manifest globs this directory eagerly, so a variant left behind by an
  // earlier width list is still bundled even though no `srcSet` names it. The
  // script owns the directory, so it removes what it no longer emits.
  const stale = (await readdir(OUT)).filter((f) => f.endsWith('.webp') && !written.has(f))
  for (const f of stale) await rm(join(OUT, f))

  await writeFile(
    join(OUT, 'illustrations.data.json'),
    `${JSON.stringify(data, null, 2)}\n`,
  )
  console.log(`\n${Object.keys(MAP).length} illustrations built from ${MASTERS}`)
  if (stale.length) console.log(`${stale.length} stale asset(s) removed: ${stale.join(', ')}`)
}

await main()
