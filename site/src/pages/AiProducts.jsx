import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, Card } from '../components/primitives.jsx'

const FORMS = [
  { title: 'Delivery accelerators', body: 'Reusable methods, agents, workflows, components, and patterns built from prior client work. These are not sold separately. They lower the risk and the cost of the engagement they are used in.' },
  { title: 'Client-owned products', body: 'Sometimes the right answer is a product built for one organization and owned outright by that organization. You own the code, the IP, and the roadmap. We build it and hand it over.' },
  { title: 'Market-facing products', body: 'Occasionally a pattern proves general enough to become a product in its own right. That is rare and we treat it as rare.' },
]

const BENEFITS = [
  { title: 'Less invention.', body: 'The parts of your build that have been solved before are not rebuilt from scratch on your budget.' },
  { title: 'Less risk.', body: 'Proven patterns fail less often than novel ones, and they fail in ways we have already seen.' },
  { title: 'A faster start.', body: 'The engagement begins from something rather than from a blank page.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function AiProducts() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">AI-driven Products</Eyebrow>
          <H1 tone="hero" className="mb-6">You need proven solutions.</H1>
          <Lead className="mb-8">Some of what you are about to build has been built before. Starting from zero is a choice, and it is usually the expensive one.</Lead>
          <Button to="/contact">Ask what already exists</Button>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">A firm that has done the work should not arrive empty-handed.</H2>
          <Body className="mb-4">Every engagement produces something reusable. A method that worked. An integration pattern that held up. A set of agents that turned out to be right for a class of problem rather than one client.</Body>
          <Body className="mb-4">Most consulting firms let that evaporate at the end of the engagement, then bill the next client to rebuild it. We capture it instead, and the next client gets there faster.</Body>
          <Body className="mb-8">That is what we mean by AI-driven products. Not a catalog you buy from. A body of proven work that reduces what your engagement has to invent.</Body>
          <Quote>Use what already works when starting from zero is unnecessary.</Quote>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">Three forms, depending on what the work needs.</H2>
          <div className="grid gap-4 lg:grid-cols-3">
            {FORMS.map((f) => <Card key={f.title}><H3>{f.title}</H3><Body className="max-w-none">{f.body}</Body></Card>)}
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">Reuse is why the economics work.</H2>
          <Body className="mb-4">Committing to an outcome is difficult when every engagement starts from nothing. It becomes practical when a meaningful share of the work has been solved, tested, and proven somewhere else.</Body>
          <Body className="mb-8">So the accelerators are not a marketing asset. They are the reason our commercial model works, and the reason it keeps improving. Each engagement should leave you with a better outcome and leave us with sharper methods for the next one.</Body>
          <Quote className="mb-6">The work should not disappear when the engagement ends.</Quote>
          <TextLink to="/how-we-work/engagement-model">See the engagement model</TextLink>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">The clearest proof is what we have built and run ourselves.</H2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <H3>AI development pipeline</H3>
              <Body className="max-w-none">Our multi-agent delivery system. It is how the seven delivery roles actually run, and it is the most direct reason a small team can take on work at this scale. Used on engagements, not sold as software.</Body>
            </Card>
            <Card>
              <H3>Blink Social</H3>
              <Body className="max-w-none">A content strategy and planning tool. It handles the part of content operations that usually happens in spreadsheets and inboxes: deciding what to produce, why it matters, who it is for, and when it ships. Planning carries through to generation, review, and publishing, so the strategy and the execution stay connected instead of drifting apart.</Body>
              <Body className="max-w-none">Built by this team and running in production. It is the clearest evidence that we ship products rather than only advise on them.</Body>
            </Card>
          </div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-10">Faster time to value and lower delivery risk.</H2>
          <div className="grid gap-4 lg:grid-cols-3">
            {BENEFITS.map((b) => <Card key={b.title}><H3>{b.title}</H3><Body className="max-w-none">{b.body}</Body></Card>)}
          </div>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">Ask what already exists.</H2>
          <Lead className="mx-auto mb-8">Describe what you are planning to build. We will tell you honestly which parts we have solved before and which parts are genuinely new.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
