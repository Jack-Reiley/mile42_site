#!/usr/bin/env node
/* Diffs the rendered copy of every route in site/ against copy_prototype/.
 *
 * A 16-page re-skin invites exactly one silent mistake: quietly rewording
 * something while restyling it. The prototype is the verified copy reference,
 * so this asserts the words did not move.
 *
 * Scope is <main> only. The header and footer differ deliberately — the
 * prototype's "LOGO" placeholder and its mid-fidelity banner are not carried
 * across — and that difference is intentional rather than drift.
 *
 * Each project is rendered with its OWN react-dom/server and react-router.
 * Sharing one renderer across both would mix two copies of React and throw
 * "Invalid hook call".
 */

import { createServer } from 'vite'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SITE = resolve(HERE, '..')
const PROTO = resolve(SITE, '..', 'copy_prototype')

const text = (html) => {
  const main = /<main[^>]*>([\s\S]*)<\/main>/.exec(html)
  return (main ? main[1] : html)
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&#x([0-9a-f]+);/gi, (_, x) => String.fromCharCode(parseInt(x, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .split('\n').map((s) => s.replace(/\s+/g, ' ').trim())
    // Drop decorative glyphs. Both projects render a trailing › on text links;
    // it is decoration rather than copy, and the two mark it up differently.
    .filter((s) => s && s !== '\u203a')
}

/** Render every route of one project using that project's own React stack. */
async function renderAll(root, routes) {
  const req = createRequire(resolve(root, 'package.json'))
  const { createElement } = await import(pathToFileURL(req.resolve('react')))
  const { renderToStaticMarkup } = await import(pathToFileURL(req.resolve('react-dom/server')))
  const { StaticRouter } = await import(pathToFileURL(req.resolve('react-router')))

  const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: App, PAGES } = await vite.ssrLoadModule('/src/App.jsx')
    const list = routes ?? PAGES.map((p) => p.path)
    const out = {}
    for (const route of list) {
      out[route] = text(
        renderToStaticMarkup(createElement(StaticRouter, { location: route }, createElement(App))),
      )
    }
    return { out, routes: list }
  } finally {
    await vite.close()
  }
}

const { out: mine, routes } = await renderAll(SITE)
const { out: theirs } = await renderAll(PROTO, routes)

let failures = 0
for (const route of routes) {
  const a = mine[route] ?? []
  const b = theirs[route] ?? []
  const diffs = []
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) diffs.push([i, b[i], a[i]])
  }
  if (diffs.length === 0) {
    console.log(`OK    ${route}  (${b.length} text nodes)`)
  } else {
    failures++
    console.log(`DIFF  ${route}  (${diffs.length} of ${Math.max(a.length, b.length)})`)
    for (const [i, want, got] of diffs.slice(0, 6)) {
      console.log(`   [${i}] prototype: ${JSON.stringify(want)}`)
      console.log(`   [${i}] site     : ${JSON.stringify(got)}`)
    }
    if (diffs.length > 6) console.log(`   ... ${diffs.length - 6} more`)
  }
}

console.log(failures === 0 ? '\nCopy parity: all 16 routes match.' : `\n${failures} route(s) differ.`)
process.exit(failures === 0 ? 0 : 1)
