import { useState } from 'react'
import { Eyebrow, TextLink } from './primitives.jsx'

/**
 * The client journey stage selector: four stages on one ink line inside a single
 * card, with the open stage's detail rendered in the same card below a full-width
 * rule. Replaces the four `Card` tiles AND the four detail `Section`s that used to
 * follow them on /how-we-work/client-journey.
 *
 * Geometry that must not drift: the journey line sits at 61px from the row's top
 * (h3 line box 32px + its 14px margin = 46, plus half the 30px node). If the
 * heading's line-height or margin changes, that constant changes with it.
 */

const EASE = 'cubic-bezier(.2,0,0,1)'

/* Fills are the illustration accent that matches each stage's spot drawing.
   Stage 03 uses mint, the theme's green from the laptop blob. */
const STAGES = [
  {
    n: '01',
    title: 'Understand',
    intro:
      'Build shared context: what outcome matters, why now, and where execution is breaking down',
    outcome: 'Leaves clarity',
    fill: 'bg-orange',
    spot: 'lightbulb',
    eyebrow: '01 · Leaves clarity',
    heading: 'Context before solutions.',
    paras: [
      'Most engagements go wrong here, quietly. The work starts before anyone has agreed what outcome matters, why it matters now, or where execution is actually breaking down.',
      'We spend real time on this. Not a discovery workshop that produces a summary of what you already told us, but enough depth to make better calls under uncertainty later.',
    ],
    items: [
      'What outcome matters, stated specifically enough to know whether it moved.',
      'Why now, and what happens if nothing changes.',
      'Where execution is breaking down today, which is often not where it appears to be.',
      'What constraints are real, and which ones are habits.',
    ],
    quote: 'Without context, technology work becomes guesswork.',
  },
  {
    n: '02',
    title: 'Design',
    intro:
      'Bring technology, architecture, delivery, and organizational reality together into a sound path',
    outcome: 'Leaves confidence',
    fill: 'bg-sky',
    spot: 'gears',
    eyebrow: '02 · Leaves confidence',
    heading: 'A path that survives contact with your organization.',
    paras: [
      'Design here means more than an architecture diagram. It means bringing the technology, the delivery approach, and the organizational reality together into something that can actually be executed by the people who will have to execute it.',
      'A design that ignores adoption, operating model, or delivery risk is not a design. It is a preference.',
    ],
    items: [
      'An architecture, with the tradeoffs named rather than assumed.',
      'A sequence, including what happens first and why.',
      'An honest read on effort, dependency, and risk.',
      'A view on what changes for the people doing the work, and what that will take.',
    ],
    quote:
      'You should finish this stage able to explain the plan to your own leadership without us in the room.',
  },
  {
    n: '03',
    title: 'Build',
    intro:
      'Engineer the systems, products, integrations, and workflows, and improve how the organization executes',
    outcome: 'Leaves results',
    fill: 'bg-mint',
    spot: 'laptop',
    eyebrow: '03 · Leaves results',
    heading: 'Working systems, and a better way of executing.',
    paras: [
      'This is where most of the money and most of the risk sit. We engineer the systems, products, integrations, and workflows, and we stay accountable for whether they work in production rather than whether they were delivered on schedule.',
      'Two things happen at once. The system gets built, and the way your organization executes gets better, because how the work is done is part of what we are delivering.',
    ],
    items: [
      'Systems in production, used by the people they were built for.',
      'Governance, testing, and documentation that exist because they were built in, not because someone remembered at the end.',
      'A team that understands what was built and why.',
    ],
    link: { to: '/how-we-work/delivery-model', label: 'See the delivery model' },
  },
  {
    n: '04',
    title: 'Evolve',
    intro:
      'You know more, operate better, reuse more, and can do something you could not do before',
    outcome: 'Leaves capability and trust',
    fill: 'bg-gold',
    spot: 'handshake',
    eyebrow: '04 · Leaves capability and trust',
    heading: 'You should be able to do something you could not do before.',
    paras: [
      'The last stage is the one most firms skip, because it is the one that reduces their future revenue.',
      'Evolve means you can operate, extend, and change what was built without depending on us for every decision. It means the patterns and reasoning stayed with your team. It means the next initiative starts from a stronger position than this one did.',
    ],
    items: [
      'Your team can change the system without calling us.',
      'The decisions and their rationale are documented somewhere your people will find them.',
      'What you learned is reusable on work we are not involved in.',
      'If you bring us back, it is because you chose to, not because you are stuck.',
    ],
    quote: 'We build capability, not dependence.',
  },
]

/* The card padding is the one value repeated in three places: the card itself and
   the two elements that have to bleed past it (the rule and the closed-state hint). */
const PAD = 'clamp(18px,2.4vw,44px)'

const DETAIL_ID = 'stage-journey-detail'

/* Hover previews the detail on a mouse; a tap must not, because a touch browser
   fires a synthetic mouseenter on tap and the preview would race the click. */
const canHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export default function StageJourney({ Spot }) {
  /* Two sources, one open stage. Hovering previews a stage, clicking pins one so
     it survives the pointer leaving. A preview outranks the pin while it lasts,
     so hovering across the row reads the row rather than fighting the pinned
     stage, and the pin comes back when the pointer leaves the card. */
  const [pinned, setPinned] = useState(null)
  const [hovered, setHovered] = useState(null)
  const open = hovered === null ? pinned : hovered
  const stage = open === null ? null : STAGES[open]

  const preview = (i) => {
    if (canHover()) setHovered(i)
  }

  return (
    /* `isolate` is required: the open column's field is a -z-10 child, and without a
       stacking context on the card it would paint behind the card's own background. */
    <div
      className="relative isolate rounded-card border border-ink bg-page shadow-hard py-10"
      style={{ paddingLeft: PAD, paddingRight: PAD }}
    >
      <div
        className="relative grid grid-cols-1 -mx-[clamp(18px,2.4vw,44px)] min-[700px]:mx-0 min-[700px]:grid-cols-4"
        onMouseLeave={() => setHovered(null)}
      >
        <span aria-hidden="true" className="hidden min-[700px]:block absolute inset-x-0 top-[61px] h-px bg-ink" />

        {STAGES.map((s, i) => {
          const on = open === i
          return (
            <button
              key={s.n}
              type="button"
              aria-expanded={on}
              aria-controls={on ? DETAIL_ID : undefined}
              onMouseEnter={() => preview(i)}
              /* Clearing the preview on click is what makes the pinned stage
                 close on a second click: with no preview left to fall back to,
                 nothing reopens it until the pointer moves to another stage. */
              onClick={() => {
                setPinned(pinned === i ? null : i)
                setHovered(null)
              }}
              /* `flex flex-col` is load-bearing, not layout preference. A `button`
                 stretched by the grid centres its own content vertically in every
                 browser, which drops the shorter columns below the journey line and
                 leaves only the tallest one on it. Column layout pins them to the top. */
              className={`relative flex flex-col order-[var(--stage-order)] px-[clamp(18px,2.4vw,44px)] py-[22px] text-left min-[700px]:order-0 min-[700px]:px-[clamp(10px,1.4vw,20px)] min-[700px]:pt-0 min-[700px]:pb-[34px] ${
                i ? 'border-t border-ink min-[700px]:border-t-0 min-[700px]:border-l' : ''
              }`}
              style={{ '--stage-order': String(i * 2) }}
            >
              {/* The connector: the open column's field runs from the journey line
                  down to the rule above the detail, so the two are one surface. */}
              <span
                aria-hidden="true"
                className={`absolute inset-0 -z-10 origin-top transition-transform motion-reduce:transition-none min-[700px]:top-[61px] ${
                  on ? `scale-y-100 ${s.fill}` : 'scale-y-0'
                }`}
                style={{ transitionDuration: '380ms', transitionTimingFunction: EASE }}
              />

              {/* Stacked, title and node sit on one line. On the row they stack, and
                  `block` restores exactly the flow the 61px line constant assumes. */}
              <div className="flex items-center gap-3 min-[700px]:block">
                <h3
                  className="font-heading font-bold leading-8 text-ink min-[700px]:mb-[14px]"
                  style={{ fontSize: 'clamp(19px,1.9vw,26px)' }}
                >
                  {s.title}
                </h3>

                {/* The CheckList badge from Lists.jsx, carrying the stage numeral.
                    Selected presses down and shrinks the shadow — the style guide's press state. */}
                <span
                  className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-pill border border-ink font-eyebrow text-eyebrow text-ink transition-all motion-reduce:transition-none ${
                    on ? `${s.fill} translate-y-[2px] shadow-[0_1px_0_var(--color-ink)]` : 'bg-page shadow-hard'
                  }`}
                  style={{ transitionDuration: '180ms', transitionTimingFunction: EASE }}
                >
                  {s.n}
                </span>
              </div>

              <p className="mt-[18px] text-body text-ink">{s.intro}</p>
              <Eyebrow as="span" tone="ink" className="mt-[14px] block">
                {s.outcome}
              </Eyebrow>
            </button>
          )
        })}

        {stage === null ? null : (
          /* The drop. This wrapper is deliberately NOT keyed by stage: it mounts
             once when a stage opens and animates its single grid track from 0fr,
             so the detail grows out of the row instead of appearing under it.
             Switching stages swaps the copy inside an already-open panel.

             It also bleeds to the card's edges so the inner clip, which is what
             makes the 0fr track actually hide the content, cuts exactly where the
             card's own border is rather than mid-rule.

             The detail is a grid item so that `order` can place it directly beneath
             the stage that was tapped once the row is stacked. On the row that
             ordering is meaningless — four columns are one glance — so it reverts to
             the last item and spans the full width. */
          <div
            id={DETAIL_ID}
            className="grid grid-rows-[1fr] order-[var(--stage-order)] animate-[m42-drop_440ms_var(--ease-m42)_both] motion-reduce:animate-none min-[700px]:order-last min-[700px]:col-span-4 min-[700px]:-mx-[clamp(18px,2.4vw,44px)]"
            style={{ '--stage-order': String(open * 2 + 1) }}
          >
            {/* `overflow-hidden` is the clip, and it is also what gives the grid
                item the min-height of 0 that lets the 0fr track collapse. */}
            <div className="overflow-hidden">
              {/* Keyed by stage so switching stages replays the rule and the item
                  stagger rather than swapping copy under a finished animation. */}
              <div key={stage.n}>
                {/* The card's own division between the stage row and the open
                    detail, edge to edge because the wrapper already bled out. */}
                <span
                  aria-hidden="true"
                  className="mb-[30px] block h-px origin-left bg-ink animate-[m42-draw-x_440ms_var(--ease-m42)_both] motion-reduce:animate-none"
                />

                <div style={{ paddingLeft: PAD, paddingRight: PAD }}>
                  <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-start">
                    <div>
                      <Eyebrow className="mb-[10px]">{stage.eyebrow}</Eyebrow>
                      <h4 className="mb-[18px] font-heading text-heading-2 text-ink text-pretty">
                        {stage.heading}
                      </h4>
                      {stage.paras.map((p, i) => (
                        <p key={i} className={`text-body text-ink ${i ? '' : 'mb-[14px]'}`}>
                          {p}
                        </p>
                      ))}
                      {stage.link ? (
                        <TextLink to={stage.link.to} className="mt-[22px]">
                          {stage.link.label}
                        </TextLink>
                      ) : null}
                    </div>

                    <div>
                      {Spot ? <Spot name={stage.spot} decorative sizes="76px" className="mb-4 h-[76px] w-[76px] object-contain" /> : null}
                      <Eyebrow tone="ink" className="mb-4">You leave with:</Eyebrow>
                      <ol className="flex flex-col gap-[14px]">
                        {stage.items.map((text, i) => (
                          <li
                            key={text}
                            className="grid grid-cols-[34px_minmax(0,1fr)] gap-[10px] animate-[m42-item_420ms_var(--ease-m42)_both] motion-reduce:animate-none"
                            style={{ animationDelay: `${260 + i * 60}ms` }}
                          >
                            <span className="pt-[5px] font-eyebrow text-eyebrow text-accent">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-body text-ink">{text}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Not the `Quote` primitive: this measure is 44rem against its 46rem, and
                      two `max-w-*` utilities on one element resolve by stylesheet order
                      rather than by the order they are written in. */}
                  {stage.quote ? (
                    <p className="mt-9 max-w-[44rem] font-heading text-heading-3 text-ink text-pretty">
                      {stage.quote}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
