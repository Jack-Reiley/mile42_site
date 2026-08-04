import { Link, useLocation } from 'react-router'

const NAV = [
  { href: '/what-we-do', label: 'What we do' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/why-mile42', label: 'Why Mile42' },
  { href: '/insights', label: 'Insights' },
]

export default function Header() {
  const { pathname } = useLocation()
  const isCurrent = (href) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="hdr">
      <div className="hdr__in">
        <Link className="logo-block" to="/">
          LOGO
        </Link>
        <nav className="nav" aria-label="Primary">
          {NAV.map(({ href, label }) => (
            <Link key={href} to={href} aria-current={isCurrent(href) ? 'page' : undefined}>
              {label}
            </Link>
          ))}
          <Link className="btn" to="/contact">
            Start a conversation
          </Link>
        </nav>
        <Link className="btn" to="/contact" style={{ display: 'inline-flex' }} data-mobile-cta>
          Contact
        </Link>
      </div>
    </header>
  )
}
