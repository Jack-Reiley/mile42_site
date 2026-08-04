import { Link } from 'react-router'
import TLink from '../components/TLink.jsx'
import { NumList, StatementCards, TermList } from '../components/Lists.jsx'

const QUESTIONS = [
  {
    n: '01',
    title: 'What outcome actually matters, and how will we know if it moved?',
    body: 'If nobody can name the measure, the project has no definition of done.',
  },
  {
    n: '02',
    title: 'Where is execution breaking down today?',
    body: 'Automating around a broken process usually preserves the break and hides it.',
  },
  {
    n: '03',
    title: 'What is the smallest system that would prove this works in production?',
    body: 'Not a demo. Something real, narrow, and used by actual people.',
  },
]

const HARD_PARTS = [
  {
    title: 'Context and workflow design',
    body: 'Understanding the work well enough to know where an agent belongs and, more importantly, where it does not. Most failed AI projects automated a step that was never the bottleneck.',
  },
  {
    title: 'Architecture and integration',
    body: 'Connecting agents to real data, real systems, and the platforms you already run. Permissions, latency, failure modes, cost control, and what happens when a system the agent depends on is down.',
  },
  {
    title: 'Governance and risk',
    body: 'Controls, evaluation, and oversight that let the business trust what it deploys. What the agent is allowed to do, how you know it is working, who is accountable when it is wrong, and how you prove any of that to a regulator or an auditor.',
  },
  {
    title: 'Adoption and accountability',
    body: 'Getting the system used, measured, and improved after go-live. An agent nobody trusts is an expensive way to do nothing.',
  },
]

const SYSTEMS = [
  ['Agents', 'Systems that take action inside a workflow, not just answer questions about it'],
  [
    'Copilots',
    'Assistance embedded where the work already happens, rather than in a separate tool',
  ],
  [
    'RAG and knowledge systems',
    'Retrieval that is accurate, current, permission-aware, and traceable to a source',
  ],
  ['Workflow automation', 'Removing manual steps that consume capacity without adding judgment'],
  [
    'Enterprise AI applications',
    'Applications where AI is the core of how the product works, not a feature bolted on',
  ],
  [
    'Data and systems integration',
    'The foundation the rest of it depends on, which is usually the real project',
  ],
]

const WRONG_TOOL = [
  'The task is fully deterministic and already well specified.',
  'The cost of being occasionally wrong is higher than the cost of being always slow.',
  'The real bottleneck is a decision nobody is empowered to make, which no technology fixes.',
  'The underlying data is not good enough yet, and the agent would only surface that faster and more expensively.',
]

const CONTROLS = [
  'Defined boundaries on data access and permitted actions.',
  'Evaluation that runs continuously, not once at launch.',
  'A clear human accountability point for every consequential decision.',
  'An audit trail sufficient to explain a specific output after the fact.',
]

const STACK = [
  ['Model layer', 'Anthropic · OpenAI'],
  ['Data and AI foundation', 'Databricks · Snowflake'],
  ['Enterprise workflow', 'Salesforce Agentforce · ServiceNow'],
  ['Content platforms', 'Contentstack · Contentful'],
  ['Commerce platforms', 'commercetools · Shopify · SAP Hybris'],
]

export default function AgenticAi() {
  return (
    <>
      <section className="sec sec--hero">
        <div className="wrap">
          <p className="eyebrow mb-14">Core practice</p>
          <h1 className="h1">Agentic AI, implemented.</h1>
          <p className="sub mb-28">
            Most organizations do not have an AI strategy problem. They have an AI implementation
            problem. The models work. Getting them to change how work happens is the hard part.
          </p>
          <Link className="btn" to="/contact">
            Tell us what you are trying to automate
          </Link>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Context before solutions.</h2>
          <p className="body mb-28">
            Every engagement starts by understanding the work, not by selecting a technology. That
            is one of the firm's operating principles and it matters more here than anywhere
            else, because agentic systems are unusually sensitive to context. The same architecture
            that works in one organization fails in another with different data, incentives, and
            risk tolerance.
          </p>
          <div className="grid g3 mb-28">
            {QUESTIONS.map((q) => (
              <div className="card" key={q.n}>
                <p className="kicker">{q.n}</p>
                <h3 className="card-title">{q.title}</h3>
                <p className="body">{q.body}</p>
              </div>
            ))}
          </div>
          <TLink to="/how-we-work/client-journey">See the client journey</TLink>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">The distance between an AI pilot and an AI system.</h2>
          <p className="body mb-28">
            Almost every organization has run the pilot. Someone built a prototype, it demonstrated
            well, leadership was encouraged, and then it stopped.
          </p>
          <p className="sub mb-28">
            Anyone can call an API. The difficulty sits in everything around the call.
          </p>
          <div className="grid g4 mb-28">
            {HARD_PARTS.map((h) => (
              <div className="card" key={h.title}>
                <h3 className="card-title">{h.title}</h3>
                <p className="body">{h.body}</p>
              </div>
            ))}
          </div>
          <p className="quote">The opportunity is AI. The constraint is implementation.</p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">Agentic systems that operate inside real business constraints.</h2>
          <TermList items={SYSTEMS} termWidth="260px" maxWidth="880px" className="mb-28" />
          <p className="body">
            The last row is the one most programs underestimate. Agentic systems fail on data and
            integration far more often than they fail on reasoning.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">We will tell you when the answer is not an agent.</h2>
          <p className="body mb-28">
            Some problems are better solved by fixing a process, deleting a step, integrating two
            systems properly, or writing conventional software that behaves predictably every time.
            Reaching for an agent in those cases adds cost, latency, and a new category of failure
            in exchange for very little.
          </p>
          <p className="kicker mb-14">When an agent is usually the wrong tool</p>
          <NumList items={WRONG_TOOL} className="mb-28" />
          <p className="quote">
            A no you can trust early is cheaper than a yes that fails seven months in.
          </p>
        </div>
      </section>

      <section className="sec sec--band">
        <div className="wrap">
          <h2 className="h2">The controls are part of the build, not a review at the end.</h2>
          <p className="body">
            Enterprise AI gets stopped by risk, legal, and security more often than it gets stopped
            by engineering. Treating governance as a final gate is how programs die two weeks before
            launch.
          </p>
          <p className="body mb-28">
            We design for it from the start: what data the system can reach, what actions it is
            permitted to take, what a human has to approve, how outputs are evaluated over time, and
            what audit trail exists when someone asks what happened and why.
          </p>
          <div className="grid g2 mb-28">
            <StatementCards items={CONTROLS} />
          </div>
          <p className="quote">
            A system the business cannot trust will not be used, and an unused system has no value
            regardless of how good the model is.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="h2">Multi-model by default.</h2>
          <p className="body">
            We stay close to the platforms shaping enterprise AI without becoming captive to any one
            of them. Model capability moves quickly, pricing moves quickly, and the right choice
            today may not be the right choice next year.
          </p>
          <p className="body mb-28">
            So we build so the model layer can change without rebuilding the system around it, and
            we tell you plainly when a platform decision is being driven by genuine fit rather than
            by familiarity.
          </p>
          <TermList items={STACK} termWidth="240px" maxWidth="820px" className="mb-28" />
          <p className="body">
            We stay multi-model and partner-literate so you can move with confidence.
          </p>
          <TLink to="/partners">See our partners</TLink>
        </div>
      </section>

      <section className="sec sec--cta">
        <div className="wrap">
          <h2 className="h2">Tell us what you are trying to automate.</h2>
          <p className="sub mb-28">
            Describe the work. We will tell you honestly whether an agent is the right answer, what
            it would take, and where the risk sits.
          </p>
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  )
}
