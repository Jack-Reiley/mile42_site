# Handoff: Agentic AI — "The distance between an AI pilot and an AI system" drill-down

## Overview

The `/agentic-ai` page (`site/src/pages/AgenticAi.jsx`) is currently a long linear scroll of eight bands. This change makes the four "hard parts" the top-level navigation for the page's detailed content, so a reader drills into depth **without leaving the page**.

The four hard parts become a tab set rendered as a **numbered spine** — four circular nodes on a connecting rule, each in its own palette colour, with a checkmark glyph inside. Selecting one swaps a single panel below the spine. One panel is visible at a time; the spine never moves.

Four detail sections that today live as their own `<Section>` bands collapse into that panel:

| Node | Tab label | Panel heading | Was |
| --- | --- | --- | --- |
| 1 | Context and workflow design | Context before solutions. | Its own band **above** the four cards |
| 2 | Architecture and integration | Connecting an agent to real systems is most of the work. | Its own band below |
| 3 | Governance and risk | The controls are part of the build, not a review at the end. | Its own band below |
| 4 | Adoption and accountability | Go-live is the middle of the project, not the end. | Its own band below |

Note that node 1's content currently sits *above* the four cards. Folding it into the panel is deliberate — it removes an upward jump that a drill-down interaction would otherwise create.

**Out of scope, unchanged:** the navy page header/hero, the "Agentic systems that operate inside real business constraints." / "What we build" band, "We will tell you when the answer is not an agent.", and the closing CTA band. Nothing above the drill-down section changes.

## About the design files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, not production code to copy. The task is to **recreate this design in `site/`**, the existing Vite + React Router + Tailwind 4 app, using its established patterns:

- `site/src/components/primitives.jsx` — `Section`, `Wrap`, `H2`, `H3`, `Lead`, `Body`, `Quote`, `Eyebrow`, `Note`
- `site/src/components/Lists.jsx` — `NumList`, `TermList`, `CheckList`
- `design/tokens/theme.css` — every colour, type step, radius, and the hard shadow

**Do not introduce raw hex values.** Every colour below already exists as a theme token; the hexes are given only so you can verify a match. Two darkened tones are the exception and are flagged as such.

## Fidelity

**High-fidelity.** Colours, typography, spacing, radii, shadows, and interaction states are final and measured. Recreate pixel-for-pixel using the primitives and theme tokens above.

Copy is final and **verbatim** — it was supplied by the client during the design session. Sections 2 and 4 (Architecture, Adoption) contain copy that is newer than anything in the repo; treat the copy in this README as the source of truth and reconcile `docs/copy/agentic-ai.md` to it.

---

## Screen: Agentic AI — hard parts drill-down

**Purpose.** A technical buyer picks whichever of the four implementation risks they care about and reads it in full, without losing the page or their scroll position.

### Layout

One `<Section>` on the default `page` (white) band, default padding (`py-16 lg:py-24`), containing a `<Wrap measure="detail">` (max-width **1120px**, centred).

Vertical order inside the wrap:

1. `<H2>` — "The distance between an AI pilot and an AI system." · `margin-bottom: 20px`
2. `<Body>` — "Almost every organization has run the pilot…" · `margin-bottom: 16px`
3. `<Lead>` — "Anyone can call an API. The difficulty sits in everything around the call." · `margin-bottom: 40px`
4. **Spine tablist** · `margin-bottom: 34px`
5. **Panel** (tabpanel)

### Component: spine tablist

Container — `role="tablist"`, `aria-label="The four hard parts"`:

```
position: relative;
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 0 24px;
```

Connecting rule — one absolutely positioned `<span aria-hidden="true">`, drawn **before** the tabs in source order:

```
position: absolute;
left: 22px;
right: calc(25% - 40px);
top: 22px;
height: 1px;
background: rgba(47, 30, 20, 0.25);   /* ink at 25% */
```

`right: calc(25% - 40px)` is load-bearing and derived, not eyeballed. The dots are 44px wide and left-aligned in each `1fr` column, so the last dot's **centre** is at `columnLeft + 22px`, not at the container's right edge. For 4 equal columns with 24px gaps the correct inset is `W/4 − 3·gap/4 − 22 = 25% − 40px`. A plain `right: 22px` overshoots the last node by ~194px at 1120px and leaves a hairline hanging off the end. **If you change the column count or the gap, re-derive this value.**

Each tab — `<button type="button" role="tab">`:

```
display: flex;
flex-direction: column;
align-items: stretch;
justify-content: flex-start;
width: 100%;
text-align: left;
border: 0;
background: none;
padding: 0;
cursor: pointer;
font-family: inherit;
```

`display: flex` here is also load-bearing. "Governance and risk" is the only title that fits on one line at 19px/25px; the other three wrap to two. The grid stretches all four buttons to the tallest, and a UA `<button>` **vertically centres its content box** when it is taller than its content — which drops node 3's dot and title by 12.5px and visibly breaks the spine. `display: block` does not defeat this. Flex column with `justify-content: flex-start` does. (`align-self: start` on the button is an equally valid fix.)

Dot — first child of the button, `<span aria-hidden="true">`, content is a checkmark glyph `✓` (U+2713):

```
display: grid;
place-items: center;
width: 44px;
height: 44px;
border-radius: var(--radius-pill);
border: 1px solid var(--color-ink);
font: 700 19px/1 var(--font-body);
transition: transform 140ms var(--ease-m42);
```

Selected adds:

```
background: <fill>;
color: <mark>;
box-shadow: var(--shadow-hard);   /* 0 4px 0 #2f1e14 */
transform: translateY(-1px);
```

Unselected adds:

```
background: var(--color-page);    /* #ffffff */
color: <rest>;
/* no shadow */
```

Title — second child, `<span>`:

```
display: block;
margin-top: 14px;
font: 700 19px/25px var(--font-heading);
text-wrap: pretty;
color: var(--color-ink);              /* selected */
color: rgba(47, 30, 20, 0.55);        /* unselected */
```

19px is between `--text-body-lg` (18) and `--text-heading-3` (26) and is not on the scale. It is a deliberate step for a four-across label; if you would rather stay on-scale, 18px reads acceptably and 26px does not fit four across at 1120px.

#### Per-node colours

| Node | Tab label | `fill` (selected) | Token | `mark` (glyph on fill) | `rest` (glyph on white) |
| --- | --- | --- | --- | --- | --- |
| 1 | Context and workflow design | `#00b785` | `--color-brand` | `#2f1e14` `--color-ink` | `#00785a` |
| 2 | Architecture and integration | `#fab600` | `--color-gold` | `#2f1e14` `--color-ink` | `#8a6400` |
| 3 | Governance and risk | `#ff5e00` | `--color-orange` | `#fffbf3` `--color-hero-heading` | `#c93f00` |
| 4 | Adoption and accountability | `#002161` | `--color-navy` | `#fffbf3` `--color-hero-heading` | `#002161` |

Every `fill` is a measured palette colour already in `theme.css`. The `rest` column is **not** in the theme: each is its fill darkened far enough that a 19px glyph stays legible on white. At full strength the gold checkmark measures ~1.9:1 on white and effectively disappears. Promote these four to tokens (e.g. `--color-brand-deep`, `--color-gold-deep`, `--color-orange-deep`) or derive them with `color-mix(in srgb, var(--color-gold) X%, black)` — do not leave them as inline hex. Note this is new ground: `theme.css` has no darkened-variant convention yet, so pick one and record it in `OPEN-QUESTIONS.md`.

### Component: panel

`role="tabpanel"`, `id="hard-parts-panel"`, `aria-labelledby` = the active tab's id, `tabIndex="0"`:

```
border: 1px solid var(--color-ink);
border-radius: var(--radius-card);        /* 12px */
box-shadow: var(--shadow-hard);           /* 0 4px 0 #2f1e14 */
background: var(--color-surface);         /* #f9f4ec */
padding: var(--spacing-card);             /* 40px */
```

Inside: `display: flex; flex-direction: column; gap: 24px`.

**Panel head** (first, above the gap flow):

- Eyebrow — the active tab's label, uppercase. `font: 600 12px/17px var(--font-eyebrow)`, `letter-spacing: 0.08em`, `text-transform: uppercase`, `color: var(--color-accent)` `#0073f4`, `margin-bottom: 6px`.
- Heading — the panel heading (the sentence from the table at the top of this doc), rendered as `<h3>`: `font: 700 26px/34px var(--font-heading)`, `color: var(--color-ink)`, `max-width: 30ch`, `text-wrap: pretty`, `margin: 0`.

The eyebrow duplicates the selected tab's text. That is intentional confirmation of what you drilled into, but it does mean the label is announced twice — consider `aria-hidden` on the eyebrow since `aria-labelledby` already names the panel.

`26px` heading inside a `36px` H2 section is correct: it is `--text-heading-3` under `--text-heading-2`. Line height is 34 rather than the token's 32, for the two-line headings.

### Panel content blocks

The panel body is a list of typed blocks rendered in order. Nine kinds, all of which map onto existing `Lists.jsx` shapes or a plain primitive. Blocks are separated by the container's `24px` gap.

| Kind | Renders as | Spec |
| --- | --- | --- |
| `lead` | `<Lead>` | `400 18px/32px` Figtree, ink, `max-width: 52rem`, `text-wrap: pretty` |
| `body` | `<Body>` | `400 16px/26px` Figtree, ink, `max-width: 52rem` |
| `subhead` | `<H3>` | `700 26px/34px` Merriweather Sans, ink, `max-width: 30ch`, `margin-top: 16px` |
| `quote` | `<Quote>` | `700 26px/34px` Merriweather Sans, ink, `max-width: 44rem` |
| `num` | `NumList`-like | label + numbered items, see below |
| `terms` | `TermList` | optional label + term/definition rows, see below |
| `checks` | `CheckList` | label + numbered-badge statements, 2 columns |
| `titled` | `CheckList` (titled) | label + numbered-badge title/body pairs, 2 columns |
| `link` | `TextLink` | `600 16px/1` Figtree, ink, trailing `›` |

`max-width: 52rem` on `lead`/`body` is wider than the primitives' `46rem`, because the panel is already inset 40px inside a 1120px wrap. Either override the primitive's measure per call site or accept `46rem` — the difference is one line break on the longest paragraph.

**Block labels** (`num`, `terms`, `checks`, `titled`) are all the same: `600 12px/17px` IBM Plex Sans Condensed, `letter-spacing: 0.08em`, uppercase, `color: var(--color-accent)` `#0073f4`, `margin-bottom: 10–16px`. The `num` label is ink rather than accent in the prototype; unify on accent.

**`num` items** — 2-column grid `2.25rem 1fr`, `gap: 12px`, `column-gap` between rows `16px`:
- numeral: `600 12px/17px` IBM Plex Sans Condensed, `letter-spacing: 0.08em`, `color: var(--color-accent)`, `padding-top: 6px`
- title: `700 16px/24px` Merriweather Sans, ink
- body: `400 14px/21px` Figtree, `rgba(47,30,20,0.72)`, `margin-top: 2px`

**`terms` rows** — one row per item, full width:
```
display: grid;
grid-template-columns: 230px 1fr;
gap: 24px;
border-top: 1px solid rgba(47, 30, 20, 0.16);
padding: 14px 0;
```
- term: `700 16px/24px` Merriweather Sans, ink
- definition: `400 15px/24px` Figtree, ink, `text-wrap: pretty`

This is a wider variant than `TermList variant="ruled"` (which is 2-up columns with a smaller muted definition). The single-column full-width form is what the client's reference shows for both the architecture table and the platform table. Add it as a third `TermList` variant rather than a new component.

**`checks` / `titled` badge** — the marker is a **number**, not a checkmark. (The spine dots use checkmarks; the in-panel lists use numbers. That split is a client decision, not an oversight.)
```
display: grid;
place-items: center;
width: 22px;  /* 24px for `titled` */
height: 22px; /* 24px */
margin-top: 2px;
border: 1px solid var(--color-ink);
border-radius: var(--radius-pill);
background: var(--color-brand);        /* #00b785 */
box-shadow: 0 2px 0 var(--color-ink);
font: 700 11px/1 var(--font-body);     /* 12px for `titled` */
color: #fff;                           /* #fffbf3 for `titled` */
```
`0 2px 0` is a half-height hard shadow for a 22px object. The design system specifies only `0 4px 0` and states there is no elevation ladder — this is a deliberate small-object exception. Flag it; the alternative is dropping the shadow on badges entirely.

Grid: `checks` is `1fr 1fr` with `gap: 14px 36px`; `titled` is `1fr 1fr` with `gap: 22px 44px`. Both collapse to one column below `md`.

`titled` item internals: 2-column `auto 1fr`, `gap: 12px`, `align-items: start`; term `700 16px/24px` Merriweather Sans ink; definition `400 15px/23px` Figtree `rgba(47,30,20,0.72)`, `margin-top: 3px`.

---

## Interactions & behaviour

**Selecting a tab.** Click, or `Enter`/`Space` on a focused tab, sets the active index. The panel content replaces in place. No scroll movement, no navigation, no URL change by default (see below).

**Transitions.** The only animated property is the dot's `transform`, `140ms cubic-bezier(0.2, 0, 0, 1)` (`--ease-m42`). Content swaps instantly — a cross-fade on a panel this tall reads as a page flash. Respect `prefers-reduced-motion` by dropping the transition (`motion-reduce:transition-none`, as the primitives already do).

**Hover.** Not specified by the design system. The prototype has none on the spine. Recommended: unselected dot border goes to full ink and the title to `rgba(47,30,20,0.8)`. Confirm before shipping.

**Press.** The dot follows the CTA press convention: `translateY(3px)` and `box-shadow: 0 1px 0` on `:active`, matching `BTN_BASE` in `primitives.jsx`.

**Focus.** Inherited from the `:focus-visible` rule in `site/src/styles/index.css` — `3px solid var(--color-accent)`, `offset 3px`. Verify it is not clipped by the spine's `overflow`; nothing in the spine sets `overflow`, so it should be fine.

**Keyboard.** Implemented as a proper tablist: roving `tabIndex` (active tab `0`, others `-1`), `ArrowLeft`/`ArrowRight` wrap around, `Home`/`End` jump to first/last, and selection follows focus (automatic activation, correct for panels that are cheap to render). The panel itself is `tabIndex="0"` so it can be reached after the tablist. This is in the reference implementation — copy the handler.

**Responsive.** The prototype is desktop-only at 1120px, matching how the rest of the site is drawn. Below roughly `lg` the four-across spine will not hold — 19px titles in a 260px column wrap to three lines and the connecting rule stops meaning anything. Recommended fallback, needs your call:
- `md` and below: drop the connecting rule (`display: none` on the `aria-hidden` span), stack the four as a 2×2 grid of dot+title, keep the panel below.
- `sm`: consider the stacked-disclosure pattern instead (option `1b` in `all-options-explored.dc.html`) — an accordion is a better small-screen shape than a tablist, and that option is already built if you want to look at it.

**Deep linking.** Not implemented. Worth adding: reflect the active node in the URL (`?part=governance` or `#governance`) so a specific hard part can be linked from a proposal or an email, and read it on mount. This is the main functional gap between the prototype and something production-ready.

## State management

One piece of state.

```js
const [active, setActive] = useState(0)   // 0–3, index into PARTS
```

Transitions: tab click → `setActive(i)`. Arrow/Home/End → `setActive(next)` **and** move DOM focus to that tab's button (keep a ref array).

No data fetching. `PARTS` is a module-level constant in the page file, exactly as `QUESTIONS` / `HARD_PARTS` / `SYSTEMS` already are in `AgenticAi.jsx`. Keep the block list as data rather than JSX so the four panels cannot drift apart in styling — the reference implementation renders every block through one `DrillPanel` component driven by `kind`.

## Design tokens

All from `design/tokens/theme.css` unless marked NEW.

Colours: `--color-ink` `#2f1e14` · `--color-page` `#ffffff` · `--color-surface` `#f9f4ec` · `--color-accent` `#0073f4` · `--color-brand` `#00b785` · `--color-gold` `#fab600` · `--color-orange` `#ff5e00` · `--color-navy` `#002161` · `--color-hero-heading` `#fffbf3`

Ink alphas in use: `0.16` (hairlines) · `0.25` (spine rule) · `0.55` (unselected title) · `0.72` (definition body). `theme.css` defines no muted text colour; `Note` in `primitives.jsx` already establishes ink-at-opacity as the convention.

NEW, darkened glyph tones: `#00785a` · `#8a6400` · `#c93f00` (navy needs none). See the per-node colour table.

Typography: `--font-heading` Merriweather Sans · `--font-body` Figtree · `--font-eyebrow` IBM Plex Sans Condensed. Steps used: `36/42` (H2) · `26/34` (H3, quote — line height +2 over the token) · `19/25` (tab title, **off-scale**) · `18/32` (lead) · `16/26` (body) · `16/24` (terms, titled) · `15/24` and `15/23` (definitions) · `14/21` (num body) · `12/17 +0.08em` (eyebrows, labels)

Spacing: `40px` (`--spacing-card`, panel padding) · `34px` (spine to panel) · `24px` (block gap, spine column gap) · `22px` (spine rule inset, = dot radius) · `14px` (dot to title, terms row padding) · `12px` (badge to text)

Radius: `--radius-card` `12px` (panel) · `--radius-pill` (dots, badges)

Shadow: `--shadow-hard` `0 4px 0 #2f1e14` (panel, selected dot) · `0 2px 0 #2f1e14` (22–24px badges, NEW exception)

Easing: `--ease-m42` `cubic-bezier(0.2, 0, 0, 1)`, `140ms`

## Assets

**None.** No images, no icons, no illustrations. The checkmark is the text glyph `✓` (U+2713) set in Figtree; the numerals are text. Nothing needs exporting, and per the design system's iconography rule, do not substitute an icon library for the checkmark.

The four spot illustrations in `site/src/assets/illustrations/` are not used by this section. If you want one, the design system pairs Engineering with `laptop-hands`.

## Files

In this bundle:

- `AgenticAiHardParts.dc.html` — the chosen design (option 2d), standalone, with the full keyboard implementation. **This is the reference to build from.**
- `DrillPanel.dc.html` — the block renderer the panel uses. Its `kind` switch is the contract for the nine block types.
- `all-options-explored.dc.html` — all eight explorations from the design session, newest turn first. Turn 2 is the four selector treatments (2d is the chosen one); turn 1 is the four structural patterns. Useful for the small-screen question above, and for seeing what was rejected and why.

In the repo:

- `site/src/pages/AgenticAi.jsx` — the page to change
- `site/src/components/primitives.jsx`, `site/src/components/Lists.jsx` — compose from these
- `design/tokens/theme.css` — token source
- `docs/copy/agentic-ai.md` (in `vthokiebrett/mile42-website`) — copy source, now behind the copy in this README for sections 2 and 4
- `site/EXTRAPOLATIONS.md`, `design/tokens/OPEN-QUESTIONS.md` — record the off-scale 19px step, the `0 2px 0` badge shadow, and the darkened glyph tones here

## Verbatim copy

Client-supplied and final. Sentence case, full stops on headlines, no contractions, serial commas.

### Section intro

> **The distance between an AI pilot and an AI system.**
>
> Almost every organization has run the pilot. Someone built a prototype, it demonstrated well, leadership was encouraged, and then it stopped.
>
> Anyone can call an API. The difficulty sits in everything around the call.

### Node 1 — Context and workflow design

> **Context before solutions.**
>
> *lead* — Understanding the work well enough to know where an agent belongs and, more importantly, where it does not. Most failed AI projects automated a step that was never the bottleneck.
>
> *body* — Every engagement starts by understanding the work, not by selecting a technology. That is one of the firm's operating principles and it matters more here than anywhere else, because agentic systems are unusually sensitive to context. The same architecture that works in one organization fails in another with different data, incentives, and risk tolerance.
>
> **THREE QUESTIONS WE ANSWER BEFORE BUILDING ANYTHING**
>
> 01 · **What outcome actually matters, and how will we know if it moved?** If nobody can name the measure, the project has no definition of done.
> 02 · **Where is execution breaking down today?** Automating around a broken process usually preserves the break and hides it.
> 03 · **What is the smallest system that would prove this works in production?** Not a demo. Something real, narrow, and used by actual people.
>
> *link* — See the client journey → `/how-we-work/client-journey`

### Node 2 — Architecture and integration

> **Connecting an agent to real systems is most of the work.**
>
> *lead* — The reasoning is rarely the hard part. The engineering sits in everything around it: reaching the data where it actually lives, respecting the permissions that already exist, and behaving predictably when something upstream is slow, wrong, or unavailable.
>
> *body* — We design for those constraints from the start, because every one of them is cheaper to handle in the architecture than to discover in production.
>
> **WHAT THE ARCHITECTURE HAS TO ACCOUNT FOR**
>
> **Permissions** — The agent reaches what the person it acts for is allowed to reach, enforced by the access model you already run rather than a second one built beside it.
> **Latency** — A response fast enough for the workflow it sits inside. An answer that arrives after the decision was made is not an answer.
> **Failure modes** — Defined behavior when the model is wrong, the call times out, or the input looks nothing like the examples it was built against.
> **Cost control** — Knowing what a transaction costs before volume turns it into a budget conversation, and having somewhere to go when it does.
> **Dependency outages** — What the workflow does when a system the agent depends on is down, including whether the work can still be done by hand.
>
> *subhead* — **Multi-model by default.**
>
> *body* — We stay close to the platforms shaping enterprise AI without becoming captive to any one of them. Model capability moves quickly, pricing moves quickly, and the right choice today may not be the right choice next year.
>
> *body* — So we build so the model layer can change without rebuilding the system around it, and we tell you plainly when a platform decision is being driven by genuine fit rather than by familiarity.
>
> **Model layer** — Anthropic · OpenAI
> **Data and AI foundation** — Databricks · Snowflake
> **Enterprise workflow** — Salesforce Agentforce · ServiceNow
> **Content platforms** — Contentstack · Contentful
> **Commerce platforms** — commercetools · Shopify · SAP Hybris
>
> *body* — We stay multi-model and partner-literate so you can move with confidence.

The "See our partners" link was **removed** from this panel at the client's request. The platform table carries no label.

### Node 3 — Governance and risk

> **The controls are part of the build, not a review at the end.**
>
> *lead* — Enterprise AI gets stopped by risk, legal, and security more often than it gets stopped by engineering. Treating governance as a final gate is how programs die two weeks before launch.
>
> *body* — We design for it from the start: what data the system can reach, what actions it is permitted to take, what a human has to approve, how outputs are evaluated over time, and what audit trail exists when someone asks what happened and why.
>
> **FOUR THINGS EVERY SYSTEM WE BUILD HAS**
>
> 1 · Defined boundaries on data access and permitted actions.
> 2 · Evaluation that runs continuously, not once at launch.
> 3 · A clear human accountability point for every consequential decision.
> 4 · An audit trail sufficient to explain a specific output after the fact.
>
> *quote* — A system the business cannot trust will not be used, and an unused system has no value regardless of how good the model is.

### Node 4 — Adoption and accountability

> **Go-live is the middle of the project, not the end.**
>
> *lead* — A system that works and is not used produces the same business result as a system that does not work. Adoption is not a communications exercise added at launch. It is a constraint that shapes what gets built, who it is built with, and what it is allowed to change.
>
> *body* — So we plan for the part after go-live before there is anything to go live with: who owns the system, what gets measured, how the people doing the work say it is wrong, and what happens to that signal once they do.
>
> **WHAT IS IN PLACE BEFORE LAUNCH**
>
> 1 · **A named owner** — One person accountable for the system after we leave, identified while it is still being built rather than at handover.
> 2 · **A measure that predates the agent** — The number the work was already judged on, so improvement can be shown rather than asserted.
> 3 · **A route for the people using it** — A way to report a bad output that reaches someone who can change the system, and a record of what changed as a result.
> 4 · **A review cadence** — Scheduled examination of what the system is actually doing, because the work it supports will not hold still.
>
> *quote* — The measure of the work is what the organization does differently six months after launch.

## Open questions for the client

1. Small-screen behaviour — 2×2 stack, or switch to the accordion pattern?
2. Deep linking — should a hard part be linkable from outside the page?
3. Hover state on the spine (the design system specifies none).
4. Does "We will tell you when the answer is not an agent." stay as its own band below the drill-down, or fold into node 1?
5. The three darkened glyph tones need a naming convention in `theme.css`.
