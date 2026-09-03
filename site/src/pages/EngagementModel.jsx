import { Section, Wrap, H2, Lead, Body, Quote, Button, TextLink, Breadcrumb, ButtonRow, FeaturePanel } from '../components/primitives.jsx'

/* EXTRAPOLATED — no comp for this page. */
export default function EngagementModel() {
  return (
    <>
      {/* The compact page header the detail pages draw, in the fill this page's
          topic panel carries on How We Work. The band rhythm is the detail
          comps' shorter one; the column is the site's single 1240px measure. */}
      <Section band="panel-orange" grain pad="header">
        <Wrap>
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
        <Wrap>
          <H2 className="mb-3">Clients want a partner with skin in the game.</H2>
          <Lead className="mb-4">The goal is not to sell more hours. Selling hours means our incentive improves when the work takes longer, and we would rather not build a business on that.</Lead>
          <Body className="mb-4">Large time and materials programs are getting harder to justify, and reasonably so. They place the risk of overrun entirely on the buyer, and they reward the seller for the thing the buyer least wants.</Body>
          <Body className="mb-8">At the same time, buyers expect AI to create real efficiency. If a firm claims AI has transformed its delivery and still bills the same hourly way it did five years ago, one of those two things is not true.</Body>
          <Quote>Our progress is measured by value created, not effort expended.</Quote>
        </Wrap>
      </Section>

      {/* On `surface` rather than `page`. Dropping the pricing band left this
          section and the one above it on the same fill, so the boundary between
          two long stretches of copy disappeared.

          The Phase Zero panel closes this band rather than taking one of its
          own. As its own band it was a short white strip between two long
          bands, which chopped the page where it should have been building to
          the offer. The panel shares the band's fill and is carried by its
          border and shadow, which is how What We Do already draws it. */}
      <Section band="surface" pad="band">
        <Wrap>
          <H2 className="mb-6">The delivery model is what makes the commercial model possible.</H2>
          <Body className="mb-4">When delivery speed is set by headcount, the only honest thing to sell is time, and the risk of everything taking longer sits with you. Our delivery runs AI agents across every major role in an engagement, which compresses the work enough that we can carry the risk of an estimate instead of passing it to you.</Body>
          <Body className="mb-4">Reuse compounds the same effect. Each engagement produces methods and patterns that lower the cost of the next one, so a meaningful share of the work is not being invented on your budget.</Body>
          {/* The hinge. The two paragraphs above are reasons the delivery model
              makes the commercial model possible, and this is the third, which
              is why it opens on "also". Without it the band stops at reuse and
              the panel below introduces Phase Zero cold, on a page that had
              been building to it. */}
          <Body className="mb-8">It is also why the first engagement is the small one. Phase Zero produces the baseline a value price has to be argued from, and until that number exists the risk of an estimate is ours to carry rather than yours.</Body>
          <ButtonRow>
            <TextLink to="/how-we-work/delivery-model">See the delivery model</TextLink>
            <TextLink to="/what-we-do/ai-products">See AI-driven products</TextLink>
          </ButtonRow>
          {/* Verbatim the homepage panel, so the offer reads the same wherever
              it is made. */}
          <FeaturePanel
            className="mt-12"
            spot="path-clipboard"
            eyebrow="Offering · Phase Zero"
            title="Start with a pilot."
            note="Name a process. See it working. Map what comes next."
          >
            <Body className="max-w-none">
              Phase Zero is a working pilot on one process you name, built beside production and
              measured against your own baseline. You get something running, and a roadmap for what
              comes after it. It is priced to be a decision, not an investment.
            </Body>
            <p className="mt-4">
              <TextLink to="/what-we-do/phase-zero" tone="accent">See how Phase Zero works</TextLink>
            </p>
          </FeaturePanel>
        </Wrap>
      </Section>

      <Section band="gold" pad="cta">
        <Wrap className="text-center">
          <H2 className="mb-4">Ask us what it would cost.</H2>
          <Lead className="mx-auto mb-8">Describe the outcome you need. We will tell you what we would need to know to price it, and how we would structure the work.</Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
