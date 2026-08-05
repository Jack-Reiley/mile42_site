#!/usr/bin/env node
/* Builds the site's illustration assets from the masters in design/illustrations.
 *
 *   design/illustrations/<master>.png
 *     -> trim to the alpha bounding box   (removes transparent margin only)
 *     -> encode lossless WebP             (artwork preserved exactly)
 *     -> site/src/assets/illustrations/<key>.webp
 *
 * Lossless is verified rather than asserted: every derived asset is compared
 * against its own trimmed master, and any pixel with alpha > 0 that differs
 * fails the build. Fully transparent pixels are exempt because their RGB is
 * meaningless and WebP normalises it.
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

/** Master filename -> illustration key. Explicit so a new master must be
 *  registered deliberately rather than guessed from its name. */
const MAP = {
  'pc_user_with_color.png': 'hero-desk',
  'robo_handshake_with_color.png': 'handshake',
  'laptop_with_color.png': 'laptop',
  'lightbulb_with_color.png': 'lightbulb',
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
      `Unregistered master(s): ${unregistered.join(', ')}. Add them to MAP in ${'site/scripts/illustrations.mjs'}.`,
    )
  }

  for (const [file, key] of Object.entries(MAP)) {
    const src = join(MASTERS, file)
    if (!existsSync(src)) throw new Error(`Missing master for "${key}": ${file}`)

    const trimmed = await sharp(src).trim({ threshold: 0 }).png().toBuffer()
    const webp = await sharp(trimmed).webp({ lossless: true, effort: 6 }).toBuffer()
    const info = await assertVisuallyLossless(trimmed, webp, key)

    await writeFile(join(OUT, `${key}.webp`), webp)
    console.log(
      `  ${key.padEnd(12)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ` +
        `${String(Math.round(webp.length / 1024)).padStart(5)}KB  lossless verified`,
    )
  }
  console.log(`\n${Object.keys(MAP).length} illustrations built from ${MASTERS}`)
}

await main()
