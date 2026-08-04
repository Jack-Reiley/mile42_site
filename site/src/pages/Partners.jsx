import { Section, Wrap, Eyebrow, H1, H2, H3, Lead, Body, Quote, Button, TextLink, Card, Placeholder } from '../components/primitives.jsx'
import { LogoSlots } from '../components/Lists.jsx'

const LAYERS = [
  { kicker: 'Model layer', title: 'Anthropic · OpenAI', body: 'Capability moves fastest here, and the right choice today may not be the right choice next year' },
  { kicker: 'Data and AI foundation', title: 'Databricks · Snowflake', body: 'Agentic systems fail on data far more often than they fail on reasoning' },
  { kicker: 'Enterprise workflow', title: 'Salesforce Agentforce · ServiceNow', body: 'Where agents meet the processes an organization already runs' },
  { kicker: 'Content platforms', title: 'Contentstack · Contentful', body: 'Content operations are where AI changes the day to day work first' },
  { kicker: 'Commerce platforms', title: 'commercetools · Shopify · SAP Hybris', body: 'Our first market focus, and where our deepest prior experience sits' },
]

const EXPECTATIONS = [
  { title: 'A straight answer on fit.', body: 'We will tell you when a platform you already own is the right answer, and when it is not, including when that is inconvenient for us.' },
  { title: 'No hidden incentive.', body: 'If a commercial relationship would shape a recommendation we make to you, you will hear about it from us first.' },
  { title: 'Access when it matters.', body: 'Being close to these platforms means escalation paths and early visibility that a general contractor does not have.' },
]

/* EXTRAPOLATED — no comp for this page. */
export default function Partners() {
  return (
    <>
      <Section band="brand">
        <Wrap>
          <Eyebrow tone="ink" className="mb-4">Partners</Eyebrow>
          <H1 tone="hero" className="mb-6">Close to the platforms, captive to none of them.</H1>
          <Lead>Enterprise AI demand is moving faster than the capacity to implement it. Partnerships keep us close to where our clients are already investing, without turning us into a reseller for any one platform.</Lead>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">Partnerships should make our judgment better, not our pitch louder.</H2>
          <Body className="mb-4">Plenty of firms collect partner badges. The badge is not the point. What matters is whether being close to a platform changes the quality of the advice and the delivery.</Body>
          <Body className="mb-8">For us a partnership is useful when it does three things: gets us early access to what is changing, gives us people to call when something breaks in a way the documentation does not cover, and keeps us honest about where a platform genuinely fits rather than where we would like it to.</Body>
          <Quote>Partners help source demand. Our execution earns the right to keep it.</Quote>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Five layers of the enterprise AI stack.</H2>
          <Lead className="mb-10">These are the layers where the work actually happens. Most engagements touch three or four of them.</Lead>
          <div className="grid gap-3">
            {LAYERS.map((l) => (
              <Card key={l.kicker}><Eyebrow>{l.kicker}</Eyebrow><H3>{l.title}</H3><Body className="max-w-none">{l.body}</Body></Card>
            ))}
          </div>
          <Placeholder tag="Placeholder · B2, partner marks" className="mt-8">
            Logos are not cleared for display yet. Populate only marks with confirmed display rights, and only platforms the firm can demonstrate real experience in.
          </Placeholder>
          <div className="mt-8"><LogoSlots /></div>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">We build so the model layer can change.</H2>
          <Body className="mb-4">Model capability and pricing both move quickly. A system architected around one provider&#39;s current strengths is a system that will need rebuilding sooner than anyone budgeted for.</Body>
          <Body className="mb-8">So we design for substitution. That does not mean pretending every model is equivalent, because they are not. It means the choice is deliberate, documented, and reversible without tearing the system apart.</Body>
          <Quote className="mb-6">We stay multi-model and partner-literate so you can move with confidence.</Quote>
          <TextLink to="/agentic-ai">Inside our agentic AI practice</TextLink>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-10">Three things you should be able to expect.</H2>
          <div className="grid gap-4 lg:grid-cols-3">
            {EXPECTATIONS.map((e) => <Card key={e.title}><H3>{e.title}</H3><Body className="max-w-none">{e.body}</Body></Card>)}
          </div>
        </Wrap>
      </Section>

      <Section band="brand">
        <Wrap className="text-center">
          <H2 className="mb-4">Already invested in one of these?</H2>
          <Lead className="mx-auto mb-8">Tell us what you are running and what you are trying to do with it. We will tell you honestly whether the platform is the constraint or something else is.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
