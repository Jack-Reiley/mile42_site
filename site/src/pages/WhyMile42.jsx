import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, Card } from '../components/primitives.jsx'
import { TermList, PlainList } from '../components/Lists.jsx'
import ExecutionContrast from '../components/ExecutionContrast.jsx'

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
const DOCTRINE = [['Purpose', 'Better customer outcomes are our purpose'], ['Domain', 'Technology is our domain'], ['Craft', 'Execution is our craft'], ['Legacy', 'Your increased capabilities are our legacy']]
const SELL = ['Advice that ends at a document', 'Technology delivered without an outcome', 'Execution without context']
const REQUIRE = ['Judgment tied to action', 'Technology built for outcomes', 'Execution that leaves capability']
const PRINCIPLES = [
  { title: 'Clarity over complexity', body: 'If an idea needs jargon to sound important, we have probably not expressed it clearly enough. Clear language is not cosmetic. It reflects clear thinking, and clear thinking leads to better execution. Prefer the simplest idea that remains true.' },
  { title: 'Context before solutions', body: 'Good execution begins with understanding. That is especially true in an AI-native world, where context improves decisions, engineering, delivery, and the AI systems themselves. Without context, technology work becomes guesswork.' },
  { title: 'Judgment, not information', body: 'AI is making information, frameworks, and generic playbooks nearly free. What does not commoditize is judgment: knowing a specific situation, making the right call under uncertainty, and standing behind what happens next.' },
  { title: 'Meet you where you are', body: 'You are trying to make a decision, execute important work, reduce risk, or move faster without losing control. We start with the need you recognize, then explain the expertise required and what the work should change.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function WhyMile42() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">Why we exist</Eyebrow>
          <H1 tone="hero" className="mb-6">We were built around the part that is actually hard.</H1>
          <Lead>Not the ideas. Not the technology. The execution.</Lead>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">Meaningful progress is still difficult.</H2>
          <Body className="mb-4">The tools are stronger and the playbooks are easier to reach. Organizations still have to turn all of that into working systems, changed behavior, better decisions, and results someone can measure.</Body>
          <Body className="mb-8">That has not become easier. In some ways abundance made it harder, because there are more plausible options, more pressure to act, and less agreement about which direction is right.</Body>
          <Quote>The gap is not access to ideas. It is the ability to turn them into outcomes.</Quote>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">The same technology produces very different outcomes.</H2>
          <Lead className="mb-10 lg:mb-16">If technology were the differentiator, two organizations buying the same platform would get the same result. They do not, and the gap between them is often enormous.</Lead>
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
          <H2 className="mb-6">Our doctrine.</H2>
          <Body className="mb-8">Four commitments define the firm, and everything about how we operate follows from them.</Body>
          <TermList items={DOCTRINE} />
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">Our engagements are built around your outcomes.</H2>
          <Body className="mb-4">Most firms are structured to protect their margin when work goes wrong. We are structured to protect your result. That principle shapes how we scope, staff, and run every engagement.</Body>
          <Body className="mb-8">We own the work. You own the results.</Body>
          <Eyebrow className="mb-4">What most firms sell</Eyebrow>
          <PlainList items={SELL} className="mb-6" />
          <Body className="mb-8">Each of these is normal, defensible, and billable. None of them is enough.</Body>
          <Eyebrow className="mb-4">What we require instead</Eyebrow>
          <PlainList items={REQUIRE} variant="title" className="mb-8" />
          <Body className="mb-8">If the work does not change how you operate, it is not enough.</Body>
          <Quote className="mb-6">Larger firms can say this. Their economics make it hard to mean it. Ours are built to mean it.</Quote>
          <TextLink to="/proof">Why organizations trust us</TextLink>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">Four principles that hold under pressure.</H2>
          <Lead className="mb-10">A firm built around execution needs more than capability. It needs a way of thinking that improves decisions when the situation is uncertain and the pressure is real.</Lead>
          <div className="grid gap-4 md:grid-cols-2">
            {PRINCIPLES.map((p) => <Card key={p.title}><H3>{p.title}</H3><Body className="max-w-none">{p.body}</Body></Card>)}
          </div>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-6">Each engagement should improve the next one.</H2>
          <Body className="mb-4">A firm built around execution cannot treat every engagement as a blank page. What we learn becomes reusable methods, patterns, and components, which lowers the cost and the risk of the work that follows.</Body>
          <Body className="mb-8">That benefits you directly. You are not paying us to rediscover something we solved somewhere else.</Body>
          <Quote>The work should not disappear when the engagement ends.</Quote>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">That is the reasoning. Here is the test.</H2>
          <Lead className="mx-auto mb-8">Bring us something that has to work. The argument on this page is only worth as much as what happens next.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
