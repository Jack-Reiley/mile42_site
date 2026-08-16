import { Section, Wrap, H2, Lead, Body, Quote, Button, TextLink, Breadcrumb, ButtonRow } from '../components/primitives.jsx'

/* EXTRAPOLATED — no comp for this page. */
export default function EngagementModel() {
  return (
    <>
      {/* The compact page header the detail pages draw, in the fill this page's
          topic panel carries on How We Work. The column and the band rhythm are
          the detail comps' too, so this page lines up with every other detail
          page in the site rather than with the wider homepage language. */}
      <Section band="panel-orange" pad="header">
        <Wrap measure="detail">
          <Breadcrumb
            to="/how-we-work"
            parent="How we work"
            current="Engagement model"
            markClass="bg-orange"
            tone="ink"
          />
          <H2 as="h1">We price for value, not for effort.</H2>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap measure="detail">
          <H2 className="mb-3">Clients want a partner with skin in the game.</H2>
          <Lead className="mb-4">The goal is not to sell more hours. Selling hours means our incentive improves when the work takes longer, and we would rather not build a business on that.</Lead>
          <Body className="mb-4">Large time and materials programs are getting harder to justify, and reasonably so. They place the risk of overrun entirely on the buyer, and they reward the seller for the thing the buyer least wants.</Body>
          <Body className="mb-8">At the same time, buyers expect AI to create real efficiency. If a firm claims AI has transformed its delivery and still bills the same hourly way it did five years ago, one of those two things is not true.</Body>
          <Quote>Our progress is measured by value created, not effort expended.</Quote>
        </Wrap>
      </Section>

      <Section pad="band">
        <Wrap measure="detail">
          <H2 className="mb-6">The delivery model is what makes the commercial model possible.</H2>
          <Body className="mb-4">When delivery speed is set by headcount, the only honest thing to sell is time, and the risk of everything taking longer sits with you. Our delivery runs AI agents across every major role in an engagement, which compresses the work enough that we can carry the risk of an estimate instead of passing it to you.</Body>
          <Body className="mb-8">Reuse compounds the same effect. Each engagement produces methods and patterns that lower the cost of the next one, so a meaningful share of the work is not being invented on your budget.</Body>
          <ButtonRow>
            <TextLink to="/how-we-work/delivery-model">See the delivery model</TextLink>
            <TextLink to="/what-we-do/ai-products">See AI-driven products</TextLink>
          </ButtonRow>
        </Wrap>
      </Section>

      <Section band="gold" pad="cta">
        <Wrap measure="detail" className="text-center">
          <H2 className="mb-4">Ask us what it would cost.</H2>
          <Lead className="mx-auto mb-8">Describe the outcome you need. We will tell you what we would need to know to price it, and how we would structure the work.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
