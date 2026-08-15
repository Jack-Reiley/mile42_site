import { Section, Wrap, Grain, H2, Lead, Body, Quote, Button, Breadcrumb, TextLink, Spot } from '../components/primitives.jsx'
import { TermList } from '../components/Lists.jsx'
import StageJourney from '../components/StageJourney.jsx'

/* Each entry point names the What we do page that covers it, so the definition
   is the link rather than a label repeated beside one. */
const ENTRY = [
  ['Understand or Design', <TextLink to="/what-we-do/advisory">Advisory</TextLink>],
  ['Design or Build', <TextLink to="/what-we-do/engineering">Engineering</TextLink>],
  [
    'Build, with parts already solved',
    <TextLink to="/what-we-do/ai-products">AI-driven products and accelerators</TextLink>,
  ],
]

/* EXTRAPOLATED — no comp for this page. */
export default function ClientJourney() {
  return (
    <>
      {/* The compact page header the detail pages draw, in the fill this page's
          topic panel carries on How We Work. The measure stays the page's own
          rather than the detail comps' narrower column, so the header aligns
          with the sections below it. */}
      <Section band="panel-accent" pad="header">
        <Wrap>
          <Breadcrumb
            to="/how-we-work"
            parent="How we work"
            current="Client journey"
            markClass="bg-accent"
            tone="ink"
          />
          <H2 as="h1">Four stages. Four stronger positions to be in.</H2>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-3">Understand, design, build, evolve.</H2>
          <Lead className="mb-4">The stage describes what we do together. The outcome describes the state you are left in. Every stage should leave you better off than when it started, whether or not you continue to the next one.</Lead>
          <Body className="mb-14">Four stages on one line. Select a stage to read what it produces, and what you are left holding when it ends.</Body>
          <StageJourney Spot={Spot} />
          <Quote className="mt-14">The work is complete only when you are stronger for the next decision, build, or initiative.</Quote>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-6">The journey is the same. Where you enter is not.</H2>
          <Body className="mb-8">Not everyone starts at stage one. Some organizations already have clarity and need execution. Some have been building for a year and need an honest read on whether the path still holds.</Body>
          <TermList items={ENTRY} className="mb-8" />
          <Quote>Tell us where you actually are, not where a process says you should be.</Quote>
        </Wrap>
      </Section>

      <Section band="brand" className="relative">
        <Grain />
        <Wrap className="relative text-center">
          <H2 className="mb-4">Tell us where you are.</H2>
          <Lead className="mx-auto mb-8">We will tell you which stage you are actually in, which is not always the one it feels like.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
