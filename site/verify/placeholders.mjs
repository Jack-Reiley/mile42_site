#!/usr/bin/env node
/* Lists illustrations still using placeholder artwork.
 * Treat "no placeholders remaining" as a gate before any public deploy — the
 * current set was sourced from elsewhere and is pending custom replacements. */
import { createServer } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const vite = await createServer({ root: SITE, server: { middlewareMode: true }, appType: 'custom' })
const { illustrations, placeholderKeys } = await vite.ssrLoadModule(
  '/src/assets/illustrations/manifest.js',
)
await vite.close()

const total = Object.keys(illustrations).length
if (placeholderKeys.length === 0) {
  console.log(`No placeholder artwork remaining (${total} illustrations).`)
  process.exit(0)
}
console.log(`${placeholderKeys.length} of ${total} illustrations are still placeholder artwork:`)
for (const k of placeholderKeys) console.log(`  ${k}  (level ${illustrations[k].level})`)
console.log('\nReplace before any public deploy.')
