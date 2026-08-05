#!/usr/bin/env node
/* Builds the site's illustration assets from the masters in design/illustrations.
 *
 *   design/illustrations/<master>.png
 *     -> trim to the alpha bounding box   (removes transparent margin only)
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
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = resolve(SITE, '..')
const MASTERS = join(ROOT, 'design', 'illustrations')
const OUT = join(SITE, 'src', 'assets', 'illustrations')

/**
 * Master filename -> illustration key, plus the variant widths to emit.
 *
 * Widths trace to real rendered sizes rather than arbitrary breakpoints:
 *   hero  — `max-w-[34rem]` is 544px, so ~1088 at 2x DPR; a 375px viewport
 *           renders it near 343px, so ~686 at 2x
 *   spots — `w-28 lg:w-32` is 112–128px, so ~256 at 2x
 * A variant wider than the artwork itself is skipped rather than upscaled.
 */
const MAP = {
  'pc_user_with_color.png': { key: 'hero-desk', widths: [384, 768, 1100] },
  'robo_handshake_with_color.png': { key: 'handshake', widths: [256, 512] },
  'laptop_with_color.png': { key: 'laptop', widths: [256, 512] },
  'lightbulb_with_color.png': { key: 'lightbulb', widths: [256, 512] },
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

  for (const [file, { key, widths }] of Object.entries(MAP)) {
    const src = join(MASTERS, file)
    if (!existsSync(src)) throw new Error(`Missing master for "${key}": ${file}`)

    const trimmed = await sharp(src).trim({ threshold: 0 }).png().toBuffer()
    const full = await sharp(trimmed).webp({ lossless: true, effort: 6 }).toBuffer()
    const info = await assertVisuallyLossless(trimmed, full, key)
    await writeFile(join(OUT, `${key}.webp`), full)

    const variants = []
    for (const w of widths) {
      if (w >= info.width) continue // never upscale
      const buf = await sharp(trimmed)
        .resize({ width: w })
        .webp({ quality: 90, effort: 6 })
        .toBuffer()
      const meta = await sharp(buf).metadata()
      await writeFile(join(OUT, `${key}-${w}.webp`), buf)
      variants.push({ width: meta.width, height: meta.height, bytes: buf.length })
    }

    data[key] = { width: info.width, height: info.height, variants }

    const vs = variants.map((v) => `${v.width}w`).join(' ') || 'none'
    console.log(
      `  ${key.padEnd(12)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ` +
        `${String(Math.round(full.length / 1024)).padStart(5)}KB  lossless verified   variants: ${vs}`,
    )
  }

  await writeFile(
    join(OUT, 'illustrations.data.json'),
    `${JSON.stringify(data, null, 2)}\n`,
  )
  console.log(`\n${Object.keys(MAP).length} illustrations built from ${MASTERS}`)
}

await main()
