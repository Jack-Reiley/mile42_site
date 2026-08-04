import { Link } from 'react-router'

const COLUMNS = [
  {
    heading: 'What we do',
    links: [
      { href: '/what-we-do/advisory', label: 'Advisory' },
      { href: '/what-we-do/engineering', label: 'Engineering' },
      { href: '/what-we-do/ai-products', label: 'AI-driven Products' },
      { href: '/agentic-ai', label: 'Agentic AI' },
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
      { href: '/why-mile42', label: 'Why Mile42' },
      { href: '/proof', label: 'Proof' },
      { href: '/partners', label: 'Partners' },
      { href: '/insights', label: 'Insights' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { href: '/contact', label: 'Start a conversation' },
      { href: '/contact', label: 'Email' },
      { href: '/contact', label: 'LinkedIn' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr__in">
        <div className="ftr__cols">
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <h2>{heading}</h2>
              <ul>
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link to={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ftr__btm">
          <span>Mile42. Execution is the craft.</span>
          <Link to="/legal/privacy" style={{ display: 'inline', padding: 0 }}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
