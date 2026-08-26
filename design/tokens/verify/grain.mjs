#!/usr/bin/env node
/* Measures the contrast a text colour actually retains over a band that draws
 * the grain film, and how strong that film's texture reads.
 *
 * The token gate next door measures flat pairings. It cannot see the film, and
 * the film is what eats the margin: on the blue band a 0.55 overlay takes
 * off-white from 4.92 flat down to 4.36 composited, under AA.
 *
 * Before this existed, every figure in BAND_GRAIN's comments was produced ad
 * hoc and could not be reproduced, re-checked, or extended to a new band. That
 * is why the recipes read as conclusions with no working shown.
 *
 * This is a measurement aid, not a pass/fail gate. It prints what each band
 * measures so a recipe can be chosen against a number rather than by eye.
 *
 * Calibration: at a 5x5 window it returns the figures already recorded for
 * orange-deep (4.54 at 0.40, 4.50 at 0.45, 4.39 at 0.60) exactly, and blue's
 * within 0.03. That is how it is known to be measuring the same thing the
 * earlier bands were tuned against.
 */

import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..', '..', '..')
const THEME = resolve(HERE, '..', 'theme.css')
const TILE = join(ROOT, 'site', 'public', 'grain-fine.png')
const sharp = createRequire(join(ROOT, 'site', 'package.json'))('sharp')

/* The texture every band aims at, as a luminance spread in 0-255. Set by #83
   from the brand band's retuned film. Lower is subtler. */
const TARGET = 3.95
const WINDOW = 5

const css = readFileSync(THEME, 'utf8')

/** Declared value of a token, read the way check.mjs reads it. */
function declared(name) {
  const m = css.match(new RegExp(`^\\s*${name}\\s*:\\s*([^;]+);`, 'm'))
  return m ? m[1].trim() : null
}

const NAMED = { white: '#ffffff', black: '#000000' }

function resolveColor(expr) {
  const e = expr.trim()
  if (e in NAMED) return resolveColor(NAMED[e])
  if (e.startsWith('#')) {
    const h = e.slice(1)
    const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
  }
  const v = e.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/i)
  if (v) {
    const d = declared(v[1])
    if (d === null) throw new Error(`${v[1]} is not declared in theme.css`)
    return resolveColor(d)
  }
  const mix = e.match(/^color-mix\(\s*in\s+srgb\s*,([\s\S]*)\)$/i)
  if (mix) {
    const parts = []
    let depth = 0
    let start = 0
    const s = mix[1]
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') depth++
      else if (s[i] === ')') depth--
      else if (s[i] === ',' && depth === 0) { parts.push(s.slice(start, i)); start = i + 1 }
    }
    parts.push(s.slice(start))
    const pct = parts[0].match(/\s(\d+(?:\.\d+)?)%\s*$/)
    if (!pct) throw new Error(`color-mix needs an explicit percentage: ${e}`)
    const p = Number(pct[1]) / 100
    const a = resolveColor(parts[0].slice(0, pct.index))
    const b = resolveColor(parts[1])
    return [0, 1, 2].map((i) => a[i] * p + b[i] * (1 - p))
  }
  throw new Error(`cannot resolve colour: ${e}`)
}

const lin = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
const luminance = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const contrast = (a, b) => {
  const x = luminance(a), y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

/* The `centred` filter Section applies to the tile: brightness then contrast,
   on sRGB channel values, which is how CSS filters operate. */
const clamp = (v) => Math.min(1, Math.max(0, v))
const centred = (c) => clamp((clamp(c * 0.629) - 0.5) * 2.78 + 0.5)

/* W3C compositing separable blend modes. */
const softLight = (cb, cs) =>
  cs <= 0.5
    ? cb - (1 - 2 * cs) * cb * (1 - cb)
    : cb + (2 * cs - 1) * ((cb <= 0.25 ? ((16 * cb - 12) * cb + 4) * cb : Math.sqrt(cb)) - cb)
const overlay = (cb, cs) => (cb <= 0.5 ? 2 * cb * cs : 1 - 2 * (1 - cb) * (1 - cs))
const BLEND = { 'soft-light': softLight, overlay }

const { data, info } = await sharp(TILE).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: CH } = info

/** The filmed field, as a W*H grid of composited [r,g,b]. */
function field(fill, blend, opacity) {
  const band = fill.map((v) => v / 255)
  const f = BLEND[blend]
  if (!f) throw new Error(`unsupported blend: ${blend}`)
  const out = new Float64Array(W * H * 3)
  for (let p = 0, i = 0; p < W * H; p++, i += CH) {
    for (let k = 0; k < 3; k++) {
      out[p * 3 + k] = (opacity * f(band[k], centred(data[i + k] / 255)) + (1 - opacity) * band[k]) * 255
    }
  }
  return out
}

/** Worst WINDOW-square box average, by contrast against the text colour. */
function worst(out, text) {
  const px = (x, y, k) => out[((y % H) * W + (x % W)) * 3 + k]
  let lowest = Infinity
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const acc = [0, 0, 0]
      for (let dy = 0; dy < WINDOW; dy++)
        for (let dx = 0; dx < WINDOW; dx++)
          for (let k = 0; k < 3; k++) acc[k] += px(x + dx, y + dy, k)
      const c = contrast(acc.map((v) => v / (WINDOW * WINDOW)), text)
      if (c < lowest) lowest = c
    }
  }
  return lowest
}

/** Luminance spread of the composited field. How strong the texture reads. */
function spread(out) {
  let s = 0, s2 = 0
  for (let p = 0; p < W * H; p++) {
    const L = 0.299 * out[p * 3] + 0.587 * out[p * 3 + 1] + 0.114 * out[p * 3 + 2]
    s += L; s2 += L * L
  }
  const m = s / (W * H)
  return Math.sqrt(s2 / (W * H) - m * m)
}

const CREAM = 'var(--color-hero-heading)'
const INK = 'var(--color-ink)'
const SURFACE = 'var(--color-surface)'
const mixWith = (token, pct, other) => `color-mix(in srgb, ${token} ${pct}%, ${other})`

/* Every band that draws the film, its fill expression, its blend, its shipped
   opacity, and the tightest text set on it. Fills are spelled the way BAND
   spells them; a change to a parent token carries through automatically. */
const BANDS = [
  ['navy', 'var(--color-navy)', 'soft-light', 0.5, CREAM, 4.5],
  ['blue', mixWith('var(--color-accent)', 92, 'black'), 'overlay', 0.25, CREAM, 4.5],
  ['brand', 'var(--color-brand)', 'soft-light', 0.4, CREAM, 4.5],
  ['gold', 'var(--color-gold)', 'overlay', 0.37, INK, 4.5],
  ['orange-deep', mixWith('var(--color-orange)', 76, 'black'), 'overlay', 0.27, CREAM, 4.5],
  ['panel-accent', mixWith('var(--color-accent)', 16, SURFACE), 'overlay', 0.47, INK, 4.5],
  ['panel-forest', mixWith('var(--color-brand)', 18, SURFACE), 'soft-light', 0.62, INK, 4.5],
  ['panel-orange', mixWith('var(--color-orange)', 16, SURFACE), 'overlay', 0.57, INK, 4.5],
  ['tint', mixWith('var(--color-accent)', 10, 'white'), 'overlay', 1, INK, 4.5],
  ['surface', SURFACE, 'overlay', 1, INK, 4.5],
  ['page', 'var(--color-page)', 'overlay', 1, INK, 4.5],
]

console.log(`grain: target texture ${TARGET.toFixed(2)}, worst case measured over ${WINDOW}x${WINDOW}px\n`)
console.log('band            blend       opacity   texture   worst   bar   ')
let failures = 0
for (const [name, fillExpr, blend, opacity, textExpr, bar] of BANDS) {
  const out = field(resolveColor(fillExpr), blend, opacity)
  const s = spread(out)
  const w = worst(out, resolveColor(textExpr))
  const off = Math.abs(s - TARGET) > 0.1 && s > TARGET
  if (w < bar) failures++
  console.log(
    name.padEnd(15) + blend.padEnd(12) + opacity.toFixed(2).padStart(7) +
    s.toFixed(2).padStart(10) + (off ? ' !' : '  ') +
    w.toFixed(2).padStart(7) + String(bar).padStart(6) + (w < bar ? '  UNDER AA' : ''),
  )
}
console.log()
if (failures) {
  console.error(`${failures} band(s) put their text under AA once the film is composited.`)
  process.exit(1)
}
console.log('every filmed band clears AA with its text, at the recorded texture')
