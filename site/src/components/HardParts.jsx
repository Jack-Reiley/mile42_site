import { useRef, useState } from 'react'
import { Eyebrow, H3, TextLink } from './primitives.jsx'
import { TermList } from './Lists.jsx'

/**
 * The Agentic AI page's four hard parts as one drill-down. Replaces the four
 * `Section` bands that used to carry this detail, plus the card grid that linked
 * to them, so a reader opens the risk they care about without leaving the page.
 *
 * Two forms, because `role` is markup rather than style and one set of buttons
 * cannot be a tablist at one width and a disclosure set at another:
 *
 *   lg and up  — a tablist over one panel. One part visible at a time.
 *   below lg   — four independent disclosures. Any number open at once.
 *
 * Both are rendered and CSS chooses, rather than a width read in JavaScript.
 * `display: none` takes a subtree out of the accessibility tree, so nothing is
 * announced twice. The cost is two pieces of state, so a part selected on the
 * spine is not carried across a resize. Both forms start on the first part, so
 * a resize lands somewhere defined.
 *
 * `parts` is the page's own `PARTS`, passed in rather than copied, as
 * `WhereAgentsWork` takes `ROLES` — the copy belongs beside the rest of the
 * page's copy.
 */

const SPINE_TAB = 'hard-parts-tab'
const SPINE_PANEL = 'hard-parts-panel'
const ROW_HEAD = 'hard-parts-row'
const ROW_PANEL = 'hard-parts-region'

/* One measured palette colour per part. `mark` is whichever of ink or off-white
   clears contrast on that fill; `rest` is that colour's darkened variant, which
   is what keeps a 19px glyph legible on white — at full strength the gold
   checkmark measures 1.79:1 and effectively disappears. */
const NODE_TONE = [
  { fill: 'bg-brand', mark: 'text-ink', rest: 'text-brand-deep' },
  { fill: 'bg-gold', mark: 'text-ink', rest: 'text-gold-deep' },
  { fill: 'bg-orange', mark: 'text-hero-heading', rest: 'text-orange-deep' },
  { fill: 'bg-navy', mark: 'text-hero-heading', rest: 'text-navy' },
]

/* The numbered badge the in-panel lists use. A numeral, not the tick `CheckList`
   draws: the marker carries sequence here rather than decorating a statement.
   `0 2px 0` is a half-height hard shadow, for a 22px object that the design
   system's single 4px elevation would swallow. See EXTRAPOLATIONS.md. */
function Badge({ n, size }) {
  const big = size === 'lg'
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 grid flex-none place-items-center rounded-pill border border-ink bg-brand font-bold shadow-[0_2px_0_var(--color-ink)] ${
        big ? 'h-6 w-6 text-[12px] text-hero-heading' : 'h-[22px] w-[22px] text-[11px] text-white'
      }`}
    >
      {n}
    </span>
  )
}

/* Block labels are the page's eyebrow: accent, condensed, uppercase. The
   reference draws the `num` and `checks` labels in ink and the handoff asks to
   unify on accent, which is what every other eyebrow on this page already is. */
function BlockLabel({ children }) {
  return children ? <Eyebrow as="p" className="mb-4">{children}</Eyebrow> : null
}

/**
 * One panel's body. Every block goes through here so the four panels cannot
 * drift apart in styling.
 *
 * `lead`, `body`, and `quote` are plain elements rather than the primitives:
 * their measures are 52rem and 44rem against the primitives' 46rem, and two
 * `max-w-*` utilities on one element resolve by stylesheet order rather than by
 * the order they are written. Same reason StageJourney draws its own quote.
 */
function DrillPanel({ blocks }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'lead':
            return (
              <p key={i} className="max-w-[52rem] text-body-lg text-ink text-pretty">{b.text}</p>
            )

          case 'body':
            return <p key={i} className="max-w-[52rem] text-body text-ink text-pretty">{b.text}</p>

          case 'subhead':
            return (
              <H3 key={i} as="h4" className="mt-4 max-w-[30ch] leading-[34px] text-pretty">
                {b.text}
              </H3>
            )

          case 'quote':
            return (
              <p
                key={i}
                className="max-w-[44rem] font-heading text-heading-3 leading-[34px] text-ink text-pretty"
              >
                {b.text}
              </p>
            )

          /* The numeral is announced rather than hidden: it is the question's
             label in the copy, not decoration the sentence repeats. */
          case 'num':
            return (
              <div key={i} className="border-t border-ink/16 pt-[22px]">
                <BlockLabel>{b.label}</BlockLabel>
                <ul className="flex flex-col gap-4">
                  {b.items.map((it) => (
                    <li key={it.n} className="grid grid-cols-[2.25rem_1fr] gap-3">
                      <span className="pt-1.5 font-eyebrow text-eyebrow text-accent-deep">{it.n}</span>
                      <span>
                        <span className="block font-heading text-body font-bold leading-6 text-ink text-pretty">
                          {it.title}
                        </span>
                        <span className="mt-0.5 block text-[14px] leading-[21px] text-ink/72 text-pretty">
                          {it.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )

          case 'terms':
            return (
              <div key={i}>
                {b.label ? <Eyebrow as="p" className="mb-[10px]">{b.label}</Eyebrow> : null}
                <TermList items={b.items} variant="wide" />
              </div>
            )

          case 'checks':
            return (
              <div key={i} className="border-t border-ink/16 pt-[22px]">
                <BlockLabel>{b.label}</BlockLabel>
                <ul className="grid gap-[14px] md:grid-cols-2 md:gap-x-9">
                  {b.items.map((text, j) => (
                    <li key={text} className="grid grid-cols-[auto_1fr] items-start gap-3">
                      <Badge n={j + 1} />
                      <span className="text-[15px] leading-6 text-ink text-pretty">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )

          case 'titled':
            return (
              <div key={i}>
                <BlockLabel>{b.label}</BlockLabel>
                <dl className="grid gap-[22px] md:grid-cols-2 md:gap-x-11">
                  {b.items.map(({ title, body }, j) => (
                    <div key={title} className="grid grid-cols-[auto_1fr] items-start gap-3">
                      <Badge n={j + 1} size="lg" />
                      <div>
                        <dt className="font-heading text-body font-bold leading-6 text-ink text-pretty">
                          {title}
                        </dt>
                        <dd className="mt-[3px] text-[15px] leading-[23px] text-ink/72 text-pretty">
                          {body}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            )

          case 'link':
            return (
              <TextLink key={i} to={b.to}>{b.text}</TextLink>
            )

          default:
            return null
        }
      })}
    </div>
  )
}

/**
 * The tablist form.
 *
 * Selection follows focus, which is the correct pattern for panels that are
 * cheap to render, so the arrow keys move both together.
 */
function Spine({ parts }) {
  const [active, setActive] = useState(0)
  const tabs = useRef([])

  const go = (i) => {
    setActive(i)
    tabs.current[i]?.focus()
  }

  /* Keyed off the tab the event came from rather than off `active`. Roving
     tabIndex keeps the two in step in a browser, so the difference only shows
     when something focuses a tab without selecting it — but a handler that
     reads state the event did not come from is a bug waiting for the first
     caller that breaks the assumption. */
  const onKeyDown = (from) => (e) => {
    const last = parts.length - 1
    const moves = {
      ArrowRight: () => (from === last ? 0 : from + 1),
      ArrowLeft: () => (from === 0 ? last : from - 1),
      Home: () => 0,
      End: () => last,
    }
    const move = moves[e.key]
    if (!move) return
    e.preventDefault()
    go(move())
  }

  const part = parts[active]

  return (
    <div className="hidden lg:block">
      {/* The rule's right inset is derived, not eyeballed. The dots are 44px and
          left-aligned in each 1fr column, so the last dot's centre sits at
          columnLeft + 22, which for four equal columns with a 24px gap is
          W/4 - 3*gap/4 - 22 = 25% - 40px. Re-derive it if either changes. */}
      <div
        role="tablist"
        aria-label="The four hard parts"
        aria-orientation="horizontal"
        className="relative mb-[34px] grid grid-cols-4 gap-x-6"
      >
        <span
          aria-hidden="true"
          className="absolute left-[22px] right-[calc(25%-40px)] top-[22px] h-px bg-ink/25"
        />

        {parts.map((p, i) => {
          const on = i === active
          const tone = NODE_TONE[i]
          return (
            /* `flex flex-col` with a flush start is load-bearing. Three of the
               four titles wrap to two lines, the grid stretches every button to
               the tallest, and a UA button centres its content box when it is
               taller than its content — which drops the one single-line node off
               the rule by half a line. `display: block` does not defeat it. */
            <button
              key={p.title}
              type="button"
              role="tab"
              id={`${SPINE_TAB}-${i}`}
              aria-selected={on}
              aria-controls={SPINE_PANEL}
              tabIndex={on ? 0 : -1}
              ref={(el) => { tabs.current[i] = el }}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown(i)}
              className="group flex w-full flex-col items-stretch justify-start text-left"
            >
              <span
                aria-hidden="true"
                className={`grid h-11 w-11 place-items-center rounded-pill border border-ink font-body text-[19px] font-bold leading-none transition-transform duration-[140ms] ease-m42 active:translate-y-[3px] active:shadow-[0_1px_0_var(--color-ink)] motion-reduce:transition-none ${
                  on
                    ? `-translate-y-px shadow-hard ${tone.fill} ${tone.mark}`
                    : `bg-page group-hover:border-ink ${tone.rest}`
                }`}
              >
                &#10003;
              </span>
              <span
                className={`mt-[14px] block font-heading text-[19px] font-bold leading-[25px] text-pretty ${
                  on ? 'text-ink' : 'text-ink/55 group-hover:text-ink/80'
                }`}
              >
                {p.title}
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={SPINE_PANEL}
        aria-labelledby={`${SPINE_TAB}-${active}`}
        tabIndex={0}
        className="rounded-card border border-ink bg-surface p-card shadow-hard"
      >
        <div className="mb-6">
          {/* Hidden from assistive technology: `aria-labelledby` already names
              the panel with this exact text, and announcing it twice is noise.
              It stays visible as confirmation of what was opened. */}
          <Eyebrow as="span" aria-hidden="true" className="mb-1.5 block">{part.title}</Eyebrow>
          <H3 className="max-w-[30ch] leading-[34px] text-pretty">{part.heading}</H3>
        </div>
        <DrillPanel blocks={part.blocks} />
      </div>
    </div>
  )
}

/**
 * The disclosure form.
 *
 * Independent toggles rather than one-at-a-time: the point of the small-screen
 * shape is being able to hold two hard parts open and compare them. The first
 * part is open at rest, matching the spine's default.
 */
function Disclosures({ parts }) {
  const [open, setOpen] = useState({ 0: true })

  return (
    <div className="flex flex-col gap-[14px] lg:hidden">
      {parts.map((p, i) => {
        const on = !!open[i]
        return (
          /* Deliberately not `overflow-hidden`, which is what the design
             reference uses to keep the open region inside the card's radius.
             The header button fills the card edge to edge, so a clip here eats
             its focus ring: the site's `:focus-visible` draws 3px at 3px
             offset and the button has 1px of slack. The region rounds its own
             bottom corners instead, and the button needs no rounding because
             it has no fill of its own. */
          <div key={p.title} className="rounded-card border border-ink bg-page shadow-hard">
            {/* A heading wrapping the control, so the four parts are navigable
                as headings rather than only as buttons. */}
            <h3>
              <button
                type="button"
                id={`${ROW_HEAD}-${i}`}
                aria-expanded={on}
                aria-controls={`${ROW_PANEL}-${i}`}
                onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
                /* EXTRAPOLATED below `sm`. The reference draws this at 1120px,
                   where the title has room; at 375 the fixed gutters leave it a
                   151px column and a three-line title. The chrome steps down
                   rather than the type. */
                className="grid w-full grid-cols-[2rem_1fr_auto] items-start gap-3 px-5 py-6 text-left sm:grid-cols-[2.75rem_1fr_auto] sm:gap-[18px] sm:px-[30px] sm:py-[26px]"
              >
                <span className="pt-2 font-eyebrow text-eyebrow text-accent-deep">{p.n}</span>
                <span>
                  <span className="block font-heading text-[22px] font-bold leading-7 text-ink text-pretty">
                    {p.title}
                  </span>
                  <span className="mt-1.5 block max-w-[62ch] text-[15px] leading-6 text-ink/72 text-pretty">
                    {p.heading}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-[34px] w-[34px] place-items-center rounded-pill border border-ink bg-cta font-body text-[17px] font-bold leading-none text-on-cta shadow-[0_2px_0_var(--color-ink)]"
                >
                  {on ? '−' : '+'}
                </span>
              </button>
            </h3>

            {on ? (
              <div
                id={`${ROW_PANEL}-${i}`}
                role="region"
                aria-labelledby={`${ROW_HEAD}-${i}`}
                /* 11px, not 12: the card's radius less its 1px border, which is
                   the curve this fill actually sits inside. */
                className="rounded-b-[11px] border-t border-ink bg-surface p-6 sm:p-8"
              >
                <DrillPanel blocks={p.blocks} />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default function HardParts({ parts }) {
  return (
    <>
      <Spine parts={parts} />
      <Disclosures parts={parts} />
    </>
  )
}
