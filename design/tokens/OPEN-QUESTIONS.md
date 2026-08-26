# Open questions for the designer

Everything the style guide does not answer. Each item has a value in
`theme.css` already, marked `INFERRED`, so work is not blocked — but each is our
decision, not the designer's, and should be confirmed or corrected.

Ordered by how much rework a late answer causes.

---

## 1. The hero H1 fails contrast — 2.51 (answered)

`--color-hero-heading` `#fffbf3` on `--color-brand` `#00b785` measured **2.51**.
WCAG AA needs 4.5 for normal text and 3.0 for large. At 57px it counts as large,
and it still failed.

**Question:** darken the green, darken the heading, or accept the ratio as a
deliberate brand decision?

**Answered by #69: darken the green, to `#00805d`.**

The question as written understated the problem. The same pair was drawn at
seven sites, not one, and four of them are normal text where the bar is 4.5
rather than 3.0: the `Coming Soon` line at 18px on the public splash, both
drill-down badge numerals at 12px and 11px, and the eyebrow on three page
heroes. Only the headings ever sat at the 3.0 bar.

Two of the three proposed answers were not available:

- **Darkening the heading** is impossible. The tone is already `#fffbf3`, and
  pure white, the brightest colour there is, reaches only **2.59** on the old
  green. Both thresholds sit above that ceiling, so no lighter tone resolves any
  of the seven sites.
- **Accepting it** would have left the only page the public can reach failing at
  2.51 against a 4.5 bar.

So the green moved. `#00805d` is the old value at 70%, chosen for contrast
headroom rather than to match a handoff tone, the same way `--color-accent-deep`
and `--color-orange-deep` were: the off-white reaches **4.79** on it, which is
the margin `orange-deep` (4.85) and the blue band (4.92) were given so their
grain films could be tuned without dropping under AA. `#008460` is the least
darkening that clears 4.5 at all, at 4.57, and was rejected as too tight to film.

**The band flipped with it.** No darkening of this green carries both tones:
checked at every step from 100% to 20%, cream and ink never both clear 4.5, and
they cross near 82% where neither passes. This is the same crossover question 15
records for the orange. So `brand` stopped being a light field with dark type and
became a dark field with light type, the way `orange-deep` already is. Every
line on a brand surface now takes the off-white; ink measures 3.22 there.

**Sizes affected and where it was applied:** the splash heading and its 18px
line, the `h1` on Contact, Insights and Privacy plus their eyebrows and leads,
the Insights closing band, the WhereAgentsWork decision card, the LibrarianFlow
Dewey column, and both HardParts badge numerals.

The gate no longer waives this pairing. It is declared once per size it is drawn
at, which is the defect that let the small-text uses go unmeasured for so long.

## 2. The blue eyebrow fails contrast — 4.41 (answered)

`--color-accent` `#0073f4` on white measures **4.41**, and **4.03** on
`--color-surface` cream. At 12px this is normal text and needs 4.5. A later
audit found it worse than that: **3.86** on the tint band and **3.36** on the
`cta` fill a selected selector row draws, across 42 call sites.

**Question:** darken the blue, enlarge the eyebrow, or accept?

**Answered by #62: none of those.** The accent is `measured` and pinned in
`verify/expected.json`, so moving it would need a designer revision of the PDF,
and it would drag the tint band, the blue band, the topic panel fills, and the
focus ring with it. Enlarging every eyebrow changes the design. Instead the
accent gained a text-only variant, `--color-accent-deep`, following the
convention question 15 describes. 82% is the lightest mix clearing 4.5 on all
four fills; the `cta` case sets it.

The standing ask in question 15 covers what is still open here: whether a
designer-supplied set should replace these derived variants.

## 3. No interaction states exist

The guide shows six CTA variants in their **default state only**. There is no
hover, focus, active, disabled, or loading anywhere, for any component.

Focus in particular is an accessibility requirement, not a nicety.

**Question:** what happens on hover and on press? Given the `0 4px 0` shadow, the
obvious reading is a press-down — translate 4px down and drop the shadow — but
that is a design decision and we have not invented it. What is the focus-visible
treatment?

## 4. No spacing scale, grid, or breakpoints

The guide has no spacing system at all. `--spacing-page`, `--spacing-card`,
`--spacing-btn-x`, `--spacing-btn-gap`, and `--container-site` were reverse-
measured from the comp at 1440px.

**Question:** is there an underlying scale — 4pt, 8pt, something else? Are
100px margins and 40px gutters fixed, or proportional?

## 5. No responsive design

`Homepage.pdf` is a single desktop frame at 1440px. There is **no mobile view,
no tablet view, and no breakpoint list**. Every responsive decision on the site
will be invented.

For a marketing site this is the largest single gap.

**Question:** can we get a mobile comp of the hero and the three-column band? At
minimum: does the three-column card stack, and does the 100px margin shrink?

## 6. Missing line heights

Leading exists only where the comp happens to set text on more than one line.
Two steps never do:

- `heading-2` — 42px is a guess interpolated between `heading-1` (1.105) and `heading-3` (1.231)
- `eyebrow` — 17px is a guess

**Question:** what are the intended values?

## 7. No letter-spacing anywhere

No tracking value is stated for any step. The per-glyph adjustments in the PDF
are ordinary font kerning, not a tracking setting, so nothing can be derived.

`--text-eyebrow--letter-spacing` is set to `0.08em` purely because condensed
uppercase usually needs it.

**Question:** what tracking, per step? Headlines especially — Merriweather Sans
at 57px often wants slight negative tracking.

## 8. Whole components have no spec

Nothing exists for: **cards** (beyond what the homepage comp implies),
**form fields**, **navigation/header**, **footer**, tables, modals, tooltips,
badges, or tabs.

The contact page is entirely unspecified, and it is the site's conversion point.

**Question:** which of these are coming? Form fields and the header/footer are
needed before the site can ship.

## 9. Eyebrow case contradicts itself

The specimen reads "Eyebrow" in sentence case. Every eyebrow on the comp is ALL
CAPS. We followed usage and the token carries `uppercase`.

**Question:** confirm.

## 10. Two colours are float-ambiguous

Recovered from PDF fill operators, which store floats:

- `--color-brand` `#00b785` — raw `(0, 0.7165, 0.5203)` could round to `#00b685` or `#00b786`
- `--color-gold` `#fab600` — raw `(0.9793, 0.7143, 0)`

Off by at most one step per channel; invisible, but worth pinning exactly.

**Question:** confirm the intended hex values.

## 11. The grain texture is not tokenizable

Both the hero band and the illustrations carry a raster grain/noise overlay.
It is a bitmap with an alpha mask, not something a token can express.

**Question:** is the grain a reusable overlay asset we can export once and apply
to any band, or is it baked per-illustration?

## 12. No logo, no icon system (lockup answered)

There was **no logo anywhere** in either PDF — no lockup, no clearspace, no
minimum size, no misuse rules. The header had nowhere to go.

**The lockup landed in #85.** Ten source variants were supplied; two are wired
up. The header draws the standard mark at 120x60 and the Coming Soon splash
draws the light variant, both sized to whole pixels on both axes because the
asset is an exact 2:1 and a fractional box puts the mark's hairline ring off the
device pixel grid, where it rasterizes as a soft grey line rather than a solid
one. The mark has no hinting, so identical strokes still land on different pixel
phases and render at slightly different weights; only a pixel-fitted master
closes that.

**Still open:** clearspace, minimum size, and misuse rules, none of which the
supplied files answer. Which of the ten variants is intended for which context
is also unrecorded. The icon system below is untouched.

There is also no icon set, no grid, no stroke-width rule, and no sizes. The
three "Level One/Two/Three" illustrations are bespoke artwork, not a system.

**Question:** when does the logo land? What do "Level One/Two/Three" mean —
complexity tiers, or usage contexts?

## 13. No muted text colour

The palette has no text tints. Everything is `--color-ink` or `--color-accent`.
The copy prototype leans on a three-step grey ramp for secondary text, captions,
and notes, and there is no equivalent here.

**Question:** should secondary text be a tint of ink, or is flat ink intentional?

## 14. No motion guidance

No durations, easings, or transition principles.

**Question:** is there an intended motion character, and is there a
reduced-motion position?

## 15. No darkened-variant convention

Three palette colours are field colours rather than text colours. On white,
`--color-gold` measures **1.79:1**, `--color-brand` **2.59**, and
`--color-orange` **3.06**. A small glyph set in any of them disappears.

#46 needed exactly that — a 19px checkmark on white — so it added three
darkened variants, written as `color-mix` derivations of the parent rather than
as new hexes, following how `blue` in `primitives.jsx` and the ruled-group green
are already derived:

| Token | Derivation | Result | On white |
| --- | --- | --- | --- |
| `--color-brand-deep` | `--color-brand` at 66% | `#007958` | 5.43 |
| `--color-gold-deep` | `--color-gold` at 55% | `#8a6400` | 5.39 |
| `--color-orange-deep` | `--color-orange` at 76% | `#c24700` | 5.00 |

The percentages were chosen to land on the tones the design handoff measured.
Gold matches exactly. Brand is 2/255 off on one channel. Orange cannot be
reproduced by a uniform darken at all — the handoff's `#c93f00` scales red to
78.8% and green to 67% — so 76% was chosen to match its contrast (5.00 against
5.01) rather than its exact channels.

`--color-navy` needs no variant; it is already 15.7:1 on white.

#62 added a fourth, `--color-accent-deep`, for the opposite reason: the accent
is already a text colour, it just misses AA at 12px. Its 82% is the least
darkening of the four, and like orange it was chosen to hit a contrast target
rather than to match a handoff tone. See question 2.

**Question:** is `-deep` the right suffix, and should the whole palette get
darkened variants systematically rather than three of them arriving as one
ticket needs them? A designer-supplied set would replace these.
