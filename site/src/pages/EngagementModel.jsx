import { Section, Wrap, H2, Lead, Body, Quote, Button, TextLink, Breadcrumb, ButtonRow, FeaturePanel } from '../components/primitives.jsx'
import { GroupColumns, RuledGroup } from '../components/Lists.jsx'

/* The three shapes an engagement takes. The engagement model explained the
   pricing posture and never said what the work looks like from the client's
   side, which is the gap the review named. Two sentences each.

   The embedded shape is described in plain words. The review allows the
   "forward deployed engineer" label only if buyers are already using it, and
   nothing on record says they are. */
const SHAPES = [
  {
    title: 'A fixed-scope pilot',
    body: 'Phase Zero: one named process, about a month, and a fixed fee agreed before we start. You keep the baseline, the working pilot, and the roadmap whether or not you continue.',
    href: '/what-we-do/phase-zero',
    linkLabel: 'What Phase Zero includes',
  },
  {
    title: 'An embedded team',
    body: 'A small senior team, with its agents, working inside your organization beside your own people on a live backlog. The scope moves as the work does, and the price follows the outcomes rather than the hours.',
  },
  {
    title: 'An outcome-priced build',
    body: 'A defined system delivered end to end, for a price tied to what it has to do in production. The risk of the estimate is ours, and the baseline a Phase Zero produces is what that price is argued from.',
  },
]

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

      {/* The shapes sit between the posture and the argument for it: a reader
          who has just been told we price for value wants to know what they
          would actually be buying before hearing why the delivery model makes
          that pricing possible. Ruled columns rather than cards, the way Phase
          Zero sets its own three statements; the rule is the page's orange. */}
      <Section band="surface" pad="band">
        <Wrap>
          <H2 className="mb-3">Three shapes the work takes.</H2>
          <Lead className="mb-9 max-w-none text-ink/70">Which one fits depends on how much is already known. Most engagements start with the first.</Lead>
          <GroupColumns>
            {SHAPES.map((s) => (
              <RuledGroup key={s.title} title={s.title} as="h3" ruleClass="border-orange">
                <Body className="max-w-none">{s.body}</Body>
                {s.href && (
                  <p className="mt-4">
                    <TextLink to={s.href} tone="accent">{s.linkLabel}</TextLink>
                  </p>
                )}
              </RuledGroup>
            ))}
          </GroupColumns>
        </Wrap>
      </Section>

      {/* Back on the page fill: the shapes band above took `surface`, and two
          long copy bands on one fill lose the boundary between them.

          The Phase Zero panel closes this band rather than taking one of its
          own. As its own band it was a short white strip between two long
          bands, which chopped the page where it should have been building to
          the offer. The panel shares the band's fill and is carried by its
          border and shadow, which is how What We Do already draws it. */}
      <Section pad="band">
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
            spot="magnifier-gear"
            eyebrow="Offering · Phase Zero"
            title="Start with a pilot."
            note="Name a process. See it working. Map what comes next."
          >
            <Body className="max-w-none">
              Phase Zero is a working pilot on one process you name, built beside production and
              measured against your own baseline. You get something running, and a roadmap for what
              comes after it. About a month, fixed fee, typically $10k to $30k.
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
