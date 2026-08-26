import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Button } from '../components/primitives.jsx'
import { CompareTable } from '../components/Lists.jsx'
import DeweyPillars from '../components/DeweyPillars.jsx'
import IntegrationSteps from '../components/IntegrationSteps.jsx'
import LibrarianDiagram from '../components/LibrarianDiagram.jsx'
import { REVEAL_GROUP, REVEAL_ROW } from '../components/reveal.js'

/* Ported from the Dewey comp. Copy is verbatim; the structure is the site's
   own components. The comp draws this as a child of "What we do" with a
   breadcrumb — it is a top-level page instead, so it opens the way /why-mile42
   and /insights do, with an eyebrow and a hero H1 on its own identity band.

   `blue` is that identity band, the way `navy` is What We Do's and `gold` is
   How We Work's. Why Mile42 shares `brand` since #84 retired forest. */

const STEPS = [
  { label: 'Create', line: 'A tenant and namespace. Nothing lands by accident.' },
  { label: 'Upload', line: 'One call. Extraction, chunking, and embedding are automatic.' },
  { label: 'Index', line: 'Status is queryable, so agents know the moment content is searchable.' },
  { label: 'Search', line: 'By meaning, by exact term, by similarity, or as a question with a cited answer.' },
  { label: 'Retrieve', line: 'Full content for many files in one batch call, across namespaces.' },
]

const PILLARS = [
  {
    title: 'Organized by design',
    benefit: 'Knowledge lands in a place, not a pile. Tenants isolate customers or business units, namespaces separate domains, and directories and tags organize within them. The card catalog rolls it all up so agents and admins can see what’s known at a glance.',
    proof: [
      'Multi-tenant with per-tenant namespaces, created explicitly so nothing lands by accident',
      'Full filesystem semantics: directories, move and rename, metadata sidecars, tags, file links',
      'Card catalog rollups at the namespace, tenant, and platform level',
    ],
  },
  {
    title: 'Indexing is automatic',
    benefit: 'Upload is the whole pipeline. Put a file in and Dewey extracts the text, chunks it, and embeds it. No separate vector database to run, no sync jobs to babysit, no drift between what’s stored and what’s searchable.',
    proof: [
      'Single call to upload, with folder paths auto-created to any depth',
      'Async indexing with a status endpoint, so agents know exactly when content becomes searchable',
      'Replace a file in place and the index follows',
    ],
  },
  {
    title: 'Retrieval in every shape',
    benefit: 'Meaning and precision are different problems. Dewey gives agents both, plus answers. Semantic search finds concepts. Hybrid search adds an exact-term leg for part numbers and error codes. Ask returns a synthesized answer with cited sources.',
    proof: [
      'Semantic, hybrid, ask, and similarity endpoints, plus bounded grep and structured find',
      'Hybrid results report which leg found each hit, so relevance is explainable',
      'Batch retrieval pulls full content for many files in one call, across namespaces',
    ],
  },
  {
    title: 'Built for agents, approachable to humans',
    benefit: 'Point an agent at Dewey and it can learn the system on its own. The API serves a task-oriented agent guide with real captured examples. Humans get a wiki-style admin console over the same data, with search and cited answers built in.',
    proof: [
      'Self-serve agent guide served by the API itself, with worked scenarios from a live stack',
      'Error responses carry stable machine-readable codes so agents can branch, fix, and retry',
      'Admin console plus operations: stats, dedup, reindexing, and scheduled maintenance jobs',
    ],
  },
  {
    title: 'Agents never touch the system of record',
    benefit: 'Payroll, orders, HR, finance: these systems were never designed to be probed by autonomous software. Dewey is the buffer. Curated extracts land in Dewey, and agents work against the copy. The blast radius of a misbehaving agent is a read-only knowledge layer, not your ERP.',
    proof: [
      'No SOR credentials in agent context windows, prompts, or logs',
      'Least privilege by construction: scoped by tenant, namespace, and tags',
      'Retrieval load lands on Dewey, not on production transactional systems',
    ],
  },
  {
    title: 'One source of truth, every agent',
    benefit: 'Multi-agent systems drift when each agent carries its own context. Dewey centralizes knowledge and memory so every agent, and every human, reads from the same catalog. Update a document once and every consumer sees the change.',
    proof: [
      'One platform serving orchestrators, sub-agents, and humans from the same store',
      'Exactly one current version of every file, findable by all',
      'The card catalog is the shared map of what is known',
    ],
  },
  {
    title: 'Connected in both directions, deterministically',
    benefit: 'Data moves between Dewey and your systems of record through connectors built from plain, deterministic code. No LLM sits in the sync path, so there is no inference cost per run, no drift, and no surprises: the same input shapes the same way every time. Outbound updates can be gated by human review before they touch a source system.',
    proof: [
      'Inbound connectors with transformation and validation built in, so data arrives shaped and classified',
      'Configurable synchronization schedules per connector',
      'Outbound updates to SORs run as deterministic code, gated by human review and signoff',
    ],
  },
]



/* The contrast the intro band turns on, paired row by row and tightened out of
   the two prose paragraphs it replaces. Every line is drawn from that copy
   rather than claiming anything the paragraphs did not.

   Pairs rather than two independent lists: each problem has one answer directly
   across from it, and the arrow between them is the whole argument. Scattered
   becomes one layer, unbounded access becomes authorized access, competing
   answers become sourced ones. */
const CONTRAST = [
  [
    'Context scattered across systems, documents, teams, and users',
    'Approved knowledge in one shared, governed layer',
  ],
  [
    'Direct access to every source creates unacceptable risk',
    'Each person and agent gets exactly what they are authorized to know',
  ],
  [
    'A separate pipeline per agent creates competing versions of the truth',
    'The sources behind every answer',
  ],
]

/* The three outcomes the band lands on, one sentence each, as written. They
   were a single block at heading scale, which read as a second headline
   competing with the H2; split across three marked columns they keep the
   prominence without taking the heading's job. */
const OUTCOMES = [
  { text: 'Your systems stay protected.', rule: 'border-navy' },
  { text: 'Your people remain accountable.', rule: 'border-brand' },
  { text: 'Your agents act from context the enterprise can inspect, govern, and trust.', rule: 'border-orange' },
]

const COMPARE = [
  ['Object storage', 'Stores bytes, answers nothing.', 'Storage plus automatic indexing plus retrieval, one API.'],
  ['Standalone vector DB', 'You still build ingestion, chunking, storage, and ops around it.', 'The pipeline is built in. Upload is the integration.'],
  ['RAG framework code', 'Glue code your team owns forever.', 'A running service with an admin plane, not a library to maintain.'],
  ['Wiki or drive', 'Organized for humans, opaque to agents.', 'Readable by both: agent guide for machines, admin UI for people.'],
  ['Direct SOR access', 'Credentials in agent context, unbounded load on production, one schema change breaks every agent.', 'A governed, read-optimized copy. Agents get answers, never the keys.'],
  ['Per-agent context', 'Each agent drifts toward its own private truth.', 'One centralized catalog every agent reads and trusts.'],
  ['LLM-driven pipelines', 'Inference cost on every sync, behavior that drifts with the model.', 'Deterministic code connectors: testable, versioned, same result every run.'],
]

export default function MeetDewey() {
  return (
    <>
      {/* The off-white tone throughout, which is what this band was chosen to
          carry: it reaches 4.85:1 here where ink reaches 3.19.

          The eyebrow takes `hero` rather than the `ice` it had on the blue band
          this replaces. Ice measures 4.49 on this fill, a hundredth under AA
          before the grain film touches it, and sky 3.32. See EYEBROW_TONE. */}
      <Section band="orange-deep" grain>
        <Wrap>
          {/* The eyebrow names the category rather than the product. #77 put
              the trademarked name here, back when the heading was "Meet Dewey™.
              The librarian for AI agents (and humans)." and the eyebrow was the
              only thing above it; the heading below now leads with the problem
              instead of the name, so the eyebrow has to say what this is. The
              name still carries its mark everywhere else on the page. */}
          <Eyebrow tone="hero" className="mb-4">The context layer for enterprise AI</Eyebrow>
          {/* Two sentences in one heading, the way "Data in. Answers out." is
              set further down the page. */}
          <H1 tone="hero" className="mb-6">
            Agents don&#8217;t need the keys. They need the context.
          </H1>
          <Lead tone="hero">
            Dewey gives authorized agents governed, up-to-date enterprise context, without giving
            autonomous software direct access to your systems of record.
          </Lead>
        </Wrap>
      </Section>

      {/* The argument the hero asserts, laid out before the product does
          anything.

          Scannable rather than read. This band was four paragraphs of prose; a
          reader had to work through all of it to find a comparison the copy was
          already making in order. The contrast is the layout now: three lines
          against three, the second half raised off the band, so the shape of
          the argument is visible before a word of it is read. The prose is not
          summarized somewhere else on the page — these lines are that copy,
          tightened.

          The three outcomes below them were one heading-scale block, which read
          as a second headline arguing with the H2 above it. Split across three
          marked columns they keep the weight without taking the heading's job.

          No eyebrow over the heading. The band opens on the heading itself,
          which is the only block on this page that does; the label it carried
          named the same thing the heading says.

          `surface`, the warm off-white. Four other fills were tried on this
          band: `tint` and `panel-accent` read cold under the hero,
          `panel-orange` is the hero's own hue and the two ran together into one
          orange region that cost the hero its bottom edge, and `gold` put a
          yellow field directly beneath the sticky header's yellow CTA. What
          separates this band from the white one below it is no longer its fill
          but what sits on it: a raised white card, three marked columns, and a
          rule under each block. */}
      <Section band="surface">
        <Wrap>
          {/* Centred in one column, with the detail below it left aligned.
              The band opens on a statement rather than on a column of text, and
              the contrast rows underneath still read left to right.

              Measures rather than the band width. Centred type needs a shorter
              line than ranged-left type does, because a reader returning to the
              start of each line has no fixed left edge to find; at the band's
              full width both blocks read as bannered rather than composed.

              The cap bounds the heading, it does not set its breaks: `H2` is
              balanced, so within that width the browser evens the lines rather
              than filling them. Widen or narrow the cap to move the break; do
              not expect a given sentence to land on a given line. */}
          <div className="mb-10 text-center lg:mb-14">
            <H2 className="mx-auto max-w-[34ch]">
              Your people know the business. Your agents scale the work. Dewey gives them shared
              context.
            </H2>
            {/* The measure is on the wrapper, not the Lead. `Lead` carries its
                own `max-w-[46rem]`, and a second max-w utility on the same
                element resolves by stylesheet order rather than by the order
                the two are written. */}
            <div className="mx-auto mt-5 max-w-[52rem]">
              <Lead className="max-w-none">
                Your people understand the customers, policies, history, and nuance behind the
                work. Agents can extend their capacity with unprecedented speed and reach. But
                people and agents cannot work together effectively when they operate from
                different or incomplete versions of what the enterprise knows.
              </Lead>
            </div>
          </div>

          {/* Two columns joined row by row rather than two boxed panels. The
              panels stated the problem and the answer side by side and left the
              reader to line them up; the rows say which answer belongs to which
              problem, and the arrow is what makes that a transformation rather
              than a pair of lists.

              The left column is muted and the right is semibold ink. That, plus
              where the arrow points, is what carries the emphasis now that
              neither side is a raised object. */}
          <div className={REVEAL_GROUP.relay}>
            {/* Decorative. The pairing lives on each row, and these read aloud
                once per row would be three repetitions of the same two labels;
                the list carries a name instead. */}
            <div
              aria-hidden="true"
              className="hidden md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-x-10"
            >
              <Eyebrow as="span" tone="ink">Without a context layer</Eyebrow>
              <span />
              <Eyebrow as="span">With Dewey</Eyebrow>
            </div>

            <ul aria-label="Working without a context layer, and with Dewey" className="md:mt-3">
              {CONTRAST.map(([problem, answer]) => (
                <li
                  key={problem}
                  className="grid items-center gap-x-10 gap-y-2 border-t border-ink/20 py-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
                >
                  <span className="text-body text-ink/70 text-pretty">{problem}</span>
                  {/* Turns to point down when the row stacks, so it still reads
                      as this problem becoming this answer rather than as a
                      bullet sitting between two unrelated lines. */}
                  <span
                    aria-hidden="true"
                    className="rotate-90 justify-self-start text-[20px] leading-none text-orange-deep md:rotate-0 md:justify-self-center"
                  >
                    &#8594;
                  </span>
                  <span className="text-body font-semibold text-ink text-pretty">{answer}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not headings. Three statements at body-lg semibold behind the same
              rule Why Mile42 marks its commitments with, so they read as the
              band's payoff rather than as a second heading level. */}
          <ul
            className={`${REVEAL_GROUP.relay} ${REVEAL_ROW} mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8`}
          >
            {OUTCOMES.map(({ text, rule }) => (
              <li key={text} className={`border-t-[3px] pt-4 ${rule}`}>
                <span className="font-heading text-body-lg font-bold leading-7 text-ink text-pretty">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">Data in. Answers out.</H2>
          {/* Both paragraphs run the band rather than the site's 46rem measure,
              which is how the handoff sets them: the copy and the illustration
              under it share one left and right edge, and at the site measure the
              copy stopped two thirds of the way across a strip that runs the
              full width. */}
          <Body className="mb-3 max-w-none">
            Upload a file and Dewey takes it from there: storing, indexing, analyzing, and more.
            Agents then search by meaning, match exact terms when precision matters, or ask a
            question and get a cited answer. Storage, indexing, and retrieval in one API, built for
            agents from the first line.
          </Body>
          <Body className="mb-10 max-w-none">
            Every agent and every human works from the same live, rolled-up view of what your
            organization knows.
          </Body>

          <Eyebrow tone="ink" className="mb-3">The whole integration, in five steps</Eyebrow>
          <IntegrationSteps steps={STEPS} />
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Why teams put Dewey™ between their data and their agents.</H2>
          <Lead className="mb-3">Seven reasons, one system.</Lead>
          <Body className="mb-10">
            Each pillar pairs the benefit you get with where it lives in the product. Pick one to
            see both.
          </Body>
          <DeweyPillars pillars={PILLARS} />
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <H2 className="mb-4">Every library needs a librarian.</H2>
          <Body className="mb-3">
            Marketing and CRM, commerce, ERP and finance, analytics: systems of record were built
            for controlled transactions, not for autonomous software running open-ended queries.
            You don&#8217;t hand a patron the keys to the archive. The librarian retrieves
            what&#8217;s appropriate and keeps the stacks intact.
          </Body>
          <Body className="mb-8">
            That is Dewey&#8217;s job between agents and sensitive systems. Publish curated extracts
            into Dewey and agents work against the copy, never the source.
          </Body>

          <LibrarianDiagram />
        </Wrap>
      </Section>

      <Section band="surface">
        <Wrap>
          <H2 className="mb-4">Why not just&#8230;?</H2>
          <Body className="mb-8">Dewey is not another database to integrate. It&#8217;s the integration.</Body>
          <CompareTable
            columns={['Alternative', 'Where it falls short', 'Dewey’s answer']}
            rows={COMPARE}
          />
        </Wrap>
      </Section>

      {/* The same field the page opens on. Both lines were ink, which is what
          the gold band this replaces wanted; this one wants the off-white.

          No grain: only a page's opening band carries the film. So the
          off-white here measures the full 4.85:1 rather than the 4.54 the
          filmed hero holds. */}
      <Section band="orange-deep">
        <Wrap className="text-center">
          <H2 tone="hero" className="mb-4">Give your agents a library.</H2>
          <Lead tone="hero" className="mx-auto mb-8">
            The fastest way to judge a knowledge layer is to put your knowledge in it. Bring a
            corpus.
          </Lead>
          <Button to="/contact">Start a conversation</Button>
        </Wrap>
      </Section>
    </>
  )
}
