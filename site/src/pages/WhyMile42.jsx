import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Quote, Button } from '../components/primitives.jsx'
import { PlainList } from '../components/Lists.jsx'
import ExecutionContrast from '../components/ExecutionContrast.jsx'
import { REVEAL_GROUP, REVEAL_ROW } from '../components/reveal.js'

/* The four stages of execution the same platform passes through, and the two
   readings of each. The result the two arrive at is held apart from them: it is
   what the diagram ends on rather than one more stage. */
const CONTRAST = [
  { label: 'Context', weak: 'Unclear context', strong: 'Clear context' },
  { label: 'Decisions', weak: 'Slow decisions', strong: 'Better decisions' },
  { label: 'Build', weak: 'Poor adoption', strong: 'Sound engineering' },
  { label: 'Delivery', weak: 'Fragmented delivery', strong: 'Adoption and follow-through' },
]
const CONTRAST_RESULT = { label: 'Result', weak: 'Expensive potential', strong: 'Measurable value' }
/* The commitments carry their own subject — "purpose", "domain", "craft",
   "legacy" are each the last word of their own statement — so the label column
   they used to sit in was repeating them.
 *
 * The rule runs down the side rather than across the top so every commitment
 * carries the same weight of colour. A rule above is a fixed length whatever
 * the statement does, which leaves the four-line column looking under-marked
 * next to the two-line one. */
const DOCTRINE = [
  { head: 'Better customer outcomes are our', keyword: 'purpose', rule: 'border-brand' },
  { head: 'Technology is our', keyword: 'domain', rule: 'border-navy' },
  { head: 'Execution is our', keyword: 'craft', rule: 'border-orange' },
  { head: 'Your increased capabilities are our', keyword: 'legacy', rule: 'border-accent' },
]
const DOCTRINE_INTRO = 'Four commitments define the firm, and everything about how we operate follows from them.'

const SELL = ['Advice that ends at a document', 'Technology delivered without an outcome', 'Execution without context']
const REQUIRE = ['Judgment tied to action', 'Technology built for outcomes', 'Execution that leaves capability']
const PRINCIPLES = [
  { title: 'Clarity over complexity', body: 'If an idea needs jargon to sound important, we have probably not expressed it clearly enough. Clear language is not cosmetic. It reflects clear thinking, and clear thinking leads to better execution. Prefer the simplest idea that remains true.' },
  { title: 'Context before solutions', body: 'Good execution begins with understanding. That is especially true in an AI-native world, where context improves decisions, engineering, delivery, and the AI systems themselves. Without context, technology work becomes guesswork.' },
  { title: 'Judgment, not information', body: 'AI is making information, frameworks, and generic playbooks nearly free. What does not commoditize is judgment: knowing a specific situation, making the right call under uncertainty, and standing behind what happens next.' },
  { title: 'Meet you where you are', body: 'You are trying to make a decision, execute important work, reduce risk, or move faster without losing control. We start with the need you recognize, then explain the expertise required and what the work should change.' },
  { title: 'Each engagement improves the next', body: 'A firm built around execution cannot treat every engagement as a blank page. What we learn becomes reusable methods, patterns, and components, which lowers the cost and the risk of the work that follows. That benefits you directly. You are not paying us to rediscover something we solved somewhere else.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function WhyMile42() {
  return (
    <>
      <Section band="brand" grain>
        <Wrap>
          <Eyebrow tone="sky" className="mb-4">Why we exist</Eyebrow>
          <H1 tone="hero" className="mb-6">We were built around the part that is actually hard.</H1>
          <Lead tone="hero">Not the ideas. Not the technology. The execution.</Lead>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Our doctrine.</H2>
          <Lead className="mb-10">{DOCTRINE_INTRO}</Lead>
          <ul className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4`}>
            {DOCTRINE.map(({ head, keyword, rule }) => (
              <li key={keyword} className={`border-l-[6px] pl-5 ${rule}`}>
                <p className="font-heading text-heading-3 text-ink">
                  {head} {keyword}
                </p>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">Our engagements are built around your outcomes.</H2>
          <Body className="mb-4">Most firms are structured to protect their margin when work goes wrong. We are structured to protect your result. That principle shapes how we scope, staff, and run every engagement.</Body>
          <Body className="mb-8">We own the work. You own the results.</Body>
          {/* The two lists are a contrast, so they are read across rather than
              down. Each column is a flex column and its closing line is pushed
              to the bottom, which keeps the two lines on one baseline even
              though the bold list runs slightly taller than the plain one. */}
          <div className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} grid gap-x-12 gap-y-8 md:grid-cols-2`}>
            <div className="flex flex-col">
              <Eyebrow className="mb-4">What most firms sell</Eyebrow>
              <PlainList items={SELL} className="mb-6" />
              <Body className="mt-auto">Each of these is normal, defensible, and billable. None of them is enough.</Body>
            </div>
            <div className="flex flex-col">
              <Eyebrow className="mb-4">What we require instead</Eyebrow>
              <PlainList items={REQUIRE} variant="title" className="mb-6" />
              <Body className="mt-auto">If the work does not change how you operate, it is not enough.</Body>
            </div>
          </div>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">The same technology produces very different outcomes.</H2>
          <Lead className="mb-4">If technology were the differentiator, two organizations buying the same platform would get the same result. They do not, and the gap between them is often enormous.</Lead>
          <Body className="mb-10 lg:mb-16">The tools are stronger and the playbooks are easier to reach than they have ever been. Neither one turns itself into working systems, changed behavior, better decisions, or results someone can measure. Abundance has arguably made that harder, because there are more plausible options, more pressure to act, and less agreement about which direction is right.</Body>
          <ExecutionContrast
            platform="One platform"
            weakTitle="Same technology, weak execution"
            strongTitle="Same technology, strong execution"
            stages={CONTRAST}
            result={CONTRAST_RESULT}
          />
          <Quote className="mt-12 lg:mt-[72px]">The tool is not the advantage. The execution system around it is.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">Five principles that hold under pressure.</H2>
          <Lead className="mb-10">A firm built around execution needs more than capability. It needs a way of thinking that improves decisions when the situation is uncertain and the pressure is real.</Lead>
          {/* Ruled rows rather than cards. Five bodies of this length in a card
              grid leaves ragged trailing space in every box; hairlines carry the
              same separation and let each principle run to its own height. */}
          <ul className="border-t border-ink/14">
            {PRINCIPLES.map((p) => (
              <li
                key={p.title}
                className="grid gap-2 border-b border-ink/14 py-6 md:grid-cols-[18rem_1fr] md:gap-10"
              >
                <h3 className="font-heading text-body font-bold text-ink">{p.title}</h3>
                {/* No `max-w-none` here. The row is wider than the reading
                    measure, so `Body` keeps its own 46rem cap. */}
                <Body>{p.body}</Body>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      {/* Closes on the band the page opened on. Both take the on-dark tones:
          ink reaches 3.22:1 on the revised brand green, the off-white 4.79. */}
      <Section band="brand">
        <Wrap className="text-center">
          <H2 tone="hero" className="mb-4">That is the reasoning. Here is the test.</H2>
          <Lead tone="hero" className="mx-auto mb-8">Bring us something that has to work. The argument on this page is only worth as much as what happens next.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
