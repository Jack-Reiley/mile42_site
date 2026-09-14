import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Quote, Button, TextLink, Spot } from '../components/primitives.jsx'
import { PlainList, RuledGroup, TermList } from '../components/Lists.jsx'
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
/* No client case studies exist yet and none are invented here. The proof is
   what the firm has built: two products and this site. The figures in the
   third block were read from the repository on 2026-09-12: pull requests
   merged into main (`gh pr list --state merged --base main`, 42) and the days
   from the first commit, c1da603 on 2026-08-04, to that day (39). They go
   stale as work lands; refresh them with the same reading at commit time. */
const BUILT = [
  {
    title: 'Vickee',
    body: 'Vickee is the governed knowledge layer that turns what your organization uniquely knows into up-to-date context people and agents can use, without exposing your systems of record. It is built as storage, automatic indexing, and multi-mode retrieval in one API, with data moving in and out through deterministic code connectors.',
    href: '/meet-vickee',
    linkLabel: 'Meet Vickee',
  },
  {
    title: 'Blink Social',
    body: 'Blink Social, our content strategy and planning tool, is built by this team and running in production. It is the plainest evidence that this team ships.',
  },
  {
    title: 'This website',
    body: 'This site was built with the delivery model described on the Delivery model page. Every change ran as a ticket, a design with acceptance scenarios, an agent-written implementation, an independent verification, and a pull request reviewed and merged by a named person. So far that is 42 pull requests in under six weeks.',
    href: '/how-we-work/delivery-model',
    linkLabel: 'See the delivery model',
  },
]
const TOOLING = [
  ['Models', 'Claude · Codex · GrokBot'],
  ['Engineering', 'GitHub · React'],
  ['Coordination', 'Slack · custom agentic workflows and integrations'],
  ['Knowledge', 'Vickee'],
]

const SELL = ['Advice that ends at a document', 'Technology delivered without an outcome', 'Execution without context']
const REQUIRE = ['Judgment tied to action', 'Technology built for outcomes', 'Execution that leaves capability']
/* One sentence each. The longer bodies these replace argued the firm's
   philosophy to itself; a reader wants the habit, and can ask about the rest. */
const PRINCIPLES = [
  { title: 'Clarity over complexity', body: 'If an idea needs jargon to sound important, we have not expressed it clearly enough.' },
  { title: 'Context before solutions', body: 'Good execution begins with understanding the situation, and without that understanding technology work is guesswork.' },
  { title: 'Judgment, not information', body: 'AI is making information and playbooks nearly free, and what does not commoditize is knowing the right call for a specific situation and standing behind it.' },
  { title: 'Meet you where you are', body: 'We start with the need you already recognize, then explain what the work should change.' },
  { title: 'Each engagement improves the next', body: 'What we learn becomes reusable methods and patterns, so you are never paying us to rediscover something we solved elsewhere.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function WhyMile42() {
  return (
    <>
      <Section band="brand" grain>
        {/* Meet Vickee's uneven split. The copy keeps the larger share so the
            headline holds to two lines at the desktop width; the mark is square
            and reads at a fraction of the width a scene would need. */}
        <Wrap className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <div>
            {/* The off-white, not sky. This band was `forest`, where sky reached
                5.97:1; on the revised brand green it is 3.28 and ice only 4.43,
                both under the 4.5 a 12px eyebrow needs. Same conclusion Meet
                Vickee's band reached: where neither coloured on-dark tone
                survives, the eyebrow takes the tone the headings take. */}
            <Eyebrow tone="hero" className="mb-4">Why we exist</Eyebrow>
            <H1 tone="hero" className="mb-6">We were built around the part that is actually hard.</H1>
            <Lead tone="hero">The ideas are cheap and the technology is available to everyone. Execution is the part that keeps failing.</Lead>
          </div>
          {/* Decorative: the header lockup already names the firm, so a second
              mark in the same viewport says nothing a reader needs read aloud.
              An SVG, so `sizes` has nothing to choose between and is left off. */}
          <Spot
            name="mile42-mark-white"
            priority
            decorative
            className="h-auto w-full max-w-[12rem] justify-self-center lg:max-w-[18rem] lg:justify-self-end"
          />
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">What we have built.</H2>
          {/* The home page's ruled columns rather than cards, for the same
              reason it gives: three bordered boxes above a tooling list read as
              four objects of equal weight. */}
          <div className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} mb-12 grid gap-x-8 gap-y-7 md:grid-cols-3`}>
            {BUILT.map((b) => (
              <RuledGroup key={b.title} as="h3" title={b.title} ruleClass="border-t-brand-deep">
                <Body className="max-w-none text-ink/72">{b.body}</Body>
                {b.href && (
                  <p className="mt-4">
                    <TextLink to={b.href}>{b.linkLabel}</TextLink>
                  </p>
                )}
              </RuledGroup>
            ))}
          </div>
          <Eyebrow className="mb-4">Tooling</Eyebrow>
          <TermList items={TOOLING} variant="wide" />
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">Our engagements are built around your outcomes.</H2>
          <Body className="mb-4">Most firms are structured to protect their margin when work goes wrong. Ours protects your result, and that one difference shapes how every engagement is scoped and run.</Body>
          <Body className="mb-8">We own the work. The results are yours.</Body>
          {/* The two lists are a contrast, so they are read across rather than
              down. Each column is a flex column and its closing line is pushed
              to the bottom, which keeps the two lines on one baseline even
              though the bold list runs slightly taller than the plain one. */}
          <div className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} grid gap-x-12 gap-y-8 md:grid-cols-2`}>
            <div className="flex flex-col">
              <Eyebrow className="mb-4">What most firms sell</Eyebrow>
              <PlainList items={SELL} className="mb-6" />
              <Body className="mt-auto">Each of these is normal and billable. None of them is enough.</Body>
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
          <Body className="mb-10 lg:mb-16">The tools are stronger and the playbooks are easier to reach than they have ever been. Neither one turns itself into working systems, changed behavior, better decisions, or results someone can measure. Abundance has arguably made that harder, because there are more plausible options and less agreement about which direction is right.</Body>
          <ExecutionContrast
            platform="One platform"
            weakTitle="Same technology, weak execution"
            strongTitle="Same technology, strong execution"
            stages={CONTRAST}
            result={CONTRAST_RESULT}
          />
          <Quote className="mt-12 lg:mt-[72px]">Two firms can buy the same tool. Only one of them builds the execution system around it.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">Five principles that hold under pressure.</H2>
          <Lead className="mb-10">Capability alone does not hold up when the situation is uncertain and the pressure is real. These are the habits that do.</Lead>
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
          <Lead tone="hero" className="mx-auto mb-8">The argument on this page is only worth what happens next. Send us something that has to work and judge us on that.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
