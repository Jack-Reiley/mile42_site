import { Link } from 'react-router'

/* EXTRAPOLATED — no comp exists for the footer. See EXTRAPOLATIONS.md. */

const COLUMNS = [
  {
    heading: 'What we do',
    links: [
      { href: '/what-we-do/advisory', label: 'Advisory' },
      { href: '/what-we-do/engineering', label: 'Engineering' },
      { href: '/what-we-do/engineering/agentic-ai', label: 'Agentic AI', nested: true },
      { href: '/what-we-do/ai-products', label: 'AI-driven Products' },
    ],
  },
  {
    heading: 'How we work',
    links: [
      { href: '/how-we-work/client-journey', label: 'Client journey' },
      { href: '/how-we-work/delivery-model', label: 'Delivery model' },
      { href: '/how-we-work/engagement-model', label: 'Engagement model' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/meet-dewey', label: 'Meet Dewey' },
      { href: '/why-mile42', label: 'Why Mile42' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { href: '/contact', label: 'Start a conversation' },
      { href: 'mailto:hello@mile42.ai', label: 'Email' },
      { href: '/contact', label: 'LinkedIn' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink bg-surface px-6 py-16 md:px-12">
      <div className="mx-auto w-full max-w-site">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <h2 className="text-eyebrow font-eyebrow uppercase text-accent-deep mb-4">{heading}</h2>
              <ul className="flex flex-col gap-2">
                {links.map(({ href, label, nested }) => (
                  <li key={label} className={nested ? 'ml-3 border-l border-ink/25 pl-3' : undefined}>
                    <Link to={href} className="text-body text-ink no-underline hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-6">
          <span className="text-body text-ink">Mile42. Execution is the craft.</span>
          <Link to="/legal/privacy" className="text-body text-ink no-underline hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
