import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Button } from './primitives.jsx'

/* EXTRAPOLATED — no comp exists for the header, and no logo exists in either
   PDF, so the wordmark stands in for a lockup. See EXTRAPOLATIONS.md. */

const NAV = [
  { href: '/what-we-do', label: 'What we do' },
  { href: '/how-we-work', label: 'How we work' },
  { href: '/why-mile42', label: 'Why Mile42' },
  { href: '/insights', label: 'Insights' },
]

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isCurrent = (href) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="border-b border-ink bg-page">
      <div className="mx-auto flex w-full max-w-site items-center justify-between gap-6 px-6 py-5 md:px-12">
        <Link to="/" className="font-heading text-heading-3 text-ink no-underline">
          Mile42
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              aria-current={isCurrent(href) ? 'page' : undefined}
              className="text-body text-ink no-underline aria-[current=page]:font-semibold hover:underline"
            >
              {label}
            </Link>
          ))}
          <Button to="/contact">Start a conversation</Button>
        </nav>

        <button
          type="button"
          className="lg:hidden rounded-pill border border-ink shadow-hard bg-surface px-btn-x py-2 text-body font-semibold"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-ink px-6 py-4 lg:hidden" aria-label="Primary">
          <ul className="flex flex-col gap-4">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  to={href}
                  aria-current={isCurrent(href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="text-body text-ink no-underline aria-[current=page]:font-semibold"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button to="/contact" className="w-full" onClick={() => setOpen(false)}>
                Start a conversation
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
