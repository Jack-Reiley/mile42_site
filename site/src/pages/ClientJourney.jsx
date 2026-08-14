import { Section, Wrap, Grain, Eyebrow, H1, H2, Lead, Body, Quote, Button, Spot } from '../components/primitives.jsx'
import { TermList } from '../components/Lists.jsx'
import StageJourney from '../components/StageJourney.jsx'

const ENTRY = [['Understand or Design', 'Advisory'], ['Design or Build', 'Engineering'], ['Build, with parts already solved', 'AI-driven products and accelerators']]

/* EXTRAPOLATED — no comp for this page. */
export default function ClientJourney() {
  return (
    <>
      <Section band="brand" className="relative">
        <Grain />
        <Wrap className="relative">
          <Eyebrow tone="ink" className="mb-4">The client journey</Eyebrow>
          <H1 tone="hero" className="mb-6">Four stages. Four stronger positions to be in.</H1>
          <Lead>The stage describes what we do together. The outcome describes the state you are left in. Every stage should leave you better off than when it started, whether or not you continue to the next one.</Lead>
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-3">Understand, design, build, evolve.</H2>
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
