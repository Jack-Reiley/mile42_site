import { Section, Wrap, Eyebrow, H1, H2, Lead, Body, Quote, Button } from '../components/primitives.jsx'
import { CompareTable, CheckList } from '../components/Lists.jsx'
import DeweyPillars from '../components/DeweyPillars.jsx'
import IntegrationSteps from '../components/IntegrationSteps.jsx'
import LibrarianDiagram from '../components/LibrarianDiagram.jsx'

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



/* The four claims the intro band closes on. Bare statements, so `CheckList`
   renders them as a plain list rather than a description list. */
const INTRO_PROOF = [
  { body: 'One governed context layer' },
  { body: 'Always current across enterprise sources' },
  { body: 'Scoped by user, role, and business domain' },
  { body: 'Auditable from retrieval through action' },
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
            Your agents don&#8217;t need the keys. They need the context.
          </H1>
          {/* U+2060 before every unspaced em dash on this page. A browser will
              break either side of one, and breaking before it starts the next
              line with the dash; the word joiner leaves only the break after
              it, which is the one that reads. */}
          <Lead tone="hero">
            Dewey gives every agent a current, governed view of your enterprise&#8288;&#8212;without giving
            autonomous software direct access to your systems of record.
          </Lead>
        </Wrap>
      </Section>

      {/* The argument the hero asserts, laid out before the product does
          anything.

          `tint` rather than the `surface` this started on. Surface is a
          half-step off the page fill on either side of it, so the band read as
          the hero's run-off rather than as the page's argument. Two warmer
          fills were tried first and both lost: `panel-orange` is the hero's own
          hue, and the two ran together into one orange region that cost the
          hero its bottom edge while dulling the orange tick badges to nothing.
          `tint` is the accent at 10% over white, already a band on three detail
          pages, and being the cool opposite of the hero is what draws the line
          between them.

          Four weights rather than four paragraphs. Set as a stack of equal
          16px blocks this was a wall: no entry point, no visible turn from the
          problem to the answer, and a conclusion a reader could not tell from
          the setup. The copy is unchanged; what carries the structure is the
          size of each piece and where it sits on the band. */}
      <Section band="tint">
        <Wrap>
          <H2 className="mb-6">Intelligence isn&#8217;t the hard part. Context is.</H2>

          {/* The charge, at lead size, the way the homepage's economic argument
              opens. It is the premise the two columns below answer. */}
          <Lead className="mb-10 lg:mb-12">
            AI models are increasingly capable. But inside an enterprise, capability without context
            is guesswork&#8288;&#8212;and guesswork at machine speed creates real risk.
          </Lead>

          {/* The problem and the answer, read across rather than down. Stacked
              they were two indistinguishable paragraphs; side by side the turn
              between them is the layout rather than something the reader has to
              find in the prose. The rule above and the one between are the only
              chrome — a bordered panel here would be the homepage's shape.

              `max-w-none` on both: these run their column, not the site's 46rem
              measure, which at half the band would leave each one short of its
              own divider. */}
          <div className="grid gap-8 border-t border-ink/20 pt-8 lg:grid-cols-2 lg:gap-14 lg:pt-10">
            <Body className="max-w-none">
              The context agents need is scattered across systems, documents, teams, and users.
              Connecting agents directly to every source exposes credentials, production systems,
              and sensitive data. Building context separately for every agent creates duplicated
              work and competing versions of the truth.
            </Body>
            <Body className="max-w-none lg:border-l lg:border-ink/20 lg:pl-14">
              Dewey creates a governed context layer between your enterprise and its agents. It
              brings approved knowledge together in an always-current, federated model, applies the
              right access rules for each user and agent, and provides a record of what agents
              knew, where they acted, and when.
            </Body>
          </div>

          {/* The conclusion, at heading scale behind the ink rule Why Mile42
              draws its commitments with. At lead size it was two points off the
              body around it and read as a fourth paragraph; this is the line
              the whole band exists to land, so it is sized like one. */}
          <Quote className="mt-10 border-l-[6px] border-ink pl-6 lg:mt-12">
            The right agent gets the right context&#8288;&#8212;without getting the keys to the enterprise.
          </Quote>

          {/* Full band width on the same two-column grid the argument above
              runs, so the four claims close the band as a summary strip rather
              than as a list tucked under the left margin. */}
          <CheckList
            items={INTRO_PROOF}
            columns={2}
            className="mt-10 border-t border-ink/20 pt-8 lg:mt-12"
          />
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
