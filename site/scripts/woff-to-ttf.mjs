/* WOFF 1.0 to TrueType.
 *
 * The brand fonts reach this repository as web formats only: fontsource ships
 * .woff and .woff2, and there is no .ttf or .otf anywhere in the tree. The
 * renderer behind sharp resolves families through fontconfig, which reads TTF
 * and OTF. Handed a .woff it lists the family but rasterises .notdef boxes,
 * and handed a variable .woff2 it draws nothing at all — in both cases
 * silently, which is the failure this module exists to avoid.
 *
 * WOFF 1.0 is a plain sfnt whose tables are individually zlib-deflated behind
 * a 44-byte header and a 20-byte-per-table directory, so unpacking it needs
 * nothing beyond node:zlib. WOFF2 is not the same shape — it brotli-compresses
 * the whole font and transforms the glyf table — which is why the generator
 * asks for .woff specifically.
 */
import { inflateSync } from 'node:zlib'

const WOFF_SIGNATURE = 0x774f4646
const WOFF_HEADER_BYTES = 44
const WOFF_ENTRY_BYTES = 20
const SFNT_ENTRY_BYTES = 16

const pad4 = (n) => (n + 3) & ~3

const readDirectory = (woff, numTables) =>
  Array.from({ length: numTables }, (_, i) => {
    const at = WOFF_HEADER_BYTES + i * WOFF_ENTRY_BYTES
    return {
      tag: woff.readUInt32BE(at),
      offset: woff.readUInt32BE(at + 4),
      compressedLength: woff.readUInt32BE(at + 8),
      length: woff.readUInt32BE(at + 12),
      checksum: woff.readUInt32BE(at + 16),
    }
  })

/* An sfnt table is stored compressed only when that made it smaller, so an
   entry whose lengths match is already raw. */
const tableData = (woff, entry) => {
  const stored = woff.subarray(entry.offset, entry.offset + entry.compressedLength)
  const data = entry.compressedLength < entry.length ? inflateSync(stored) : stored

  if (data.length !== entry.length) {
    throw new Error(`WOFF table 0x${entry.tag.toString(16)} unpacked to the wrong length`)
  }
  return data
}

export function woffToTtf(woff) {
  if (woff.length < WOFF_HEADER_BYTES || woff.readUInt32BE(0) !== WOFF_SIGNATURE) {
    throw new Error('not a WOFF 1.0 file')
  }

  const flavor = woff.readUInt32BE(4)
  const numTables = woff.readUInt16BE(12)

  /* Table entries must be written in tag order for the sfnt directory to be
     well formed; WOFF does not require the source to be sorted. */
  const entries = readDirectory(woff, numTables).sort((a, b) => a.tag - b.tag)

  const header = Buffer.alloc(12 + numTables * SFNT_ENTRY_BYTES)
  const largestPowerOfTwo = 2 ** Math.floor(Math.log2(numTables))
  header.writeUInt32BE(flavor, 0)
  header.writeUInt16BE(numTables, 4)
  header.writeUInt16BE(largestPowerOfTwo * SFNT_ENTRY_BYTES, 6)
  header.writeUInt16BE(Math.floor(Math.log2(numTables)), 8)
  header.writeUInt16BE((numTables - largestPowerOfTwo) * SFNT_ENTRY_BYTES, 10)

  const tables = []
  let offset = header.length

  entries.forEach((entry, i) => {
    const data = tableData(woff, entry)
    const at = 12 + i * SFNT_ENTRY_BYTES

    header.writeUInt32BE(entry.tag, at)
    header.writeUInt32BE(entry.checksum, at + 4)
    header.writeUInt32BE(offset, at + 8)
    header.writeUInt32BE(entry.length, at + 12)

    const padded = Buffer.alloc(pad4(data.length))
    data.copy(padded)
    tables.push(padded)
    offset += padded.length
  })

  return Buffer.concat([header, ...tables])
}

const NAME_TABLE = 0x6e616d65
const FAMILY_NAME = 1
const TYPOGRAPHIC_FAMILY = 16
const WINDOWS_PLATFORM = 3

/* The family a renderer will match this font by, read from its own `name`
   table. The generator uses it to prove the prepared environment holds the
   faces it meant to put there: an empty or mis-copied font directory is
   otherwise indistinguishable from a correct one until the artwork is
   inspected by eye, because the renderer just substitutes and carries on. */
export function familyName(ttf) {
  const numTables = ttf.readUInt16BE(4)

  let table = null
  for (let i = 0; i < numTables; i++) {
    const at = 12 + i * 16
    if (ttf.readUInt32BE(at) === NAME_TABLE) table = ttf.readUInt32BE(at + 8)
  }
  if (table === null) throw new Error('font has no name table')

  const count = ttf.readUInt16BE(table + 2)
  const strings = table + ttf.readUInt16BE(table + 4)

  let best = null
  for (let i = 0; i < count; i++) {
    const at = table + 6 + i * 12
    const record = {
      platform: ttf.readUInt16BE(at),
      nameId: ttf.readUInt16BE(at + 6),
      length: ttf.readUInt16BE(at + 8),
      offset: ttf.readUInt16BE(at + 10),
    }
    if (record.nameId !== FAMILY_NAME && record.nameId !== TYPOGRAPHIC_FAMILY) continue

    /* Typographic family wins where both exist: for a family with more than
       four weights the plain family name is split per group. */
    const better = best === null || (record.nameId === TYPOGRAPHIC_FAMILY && best.nameId === FAMILY_NAME)
    if (better) best = record
  }
  if (best === null) throw new Error('font declares no family name')

  /* Copied before decoding: swap16 works in place, and `raw` is a view onto
     the caller's font buffer, so byte-swapping it would corrupt the name table
     of the very font about to be written out. */
  const raw = Buffer.from(ttf.subarray(strings + best.offset, strings + best.offset + best.length))
  const text =
    best.platform === WINDOWS_PLATFORM ? raw.swap16().toString('utf16le') : raw.toString('latin1')
  return text.trim()
}
