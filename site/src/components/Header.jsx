import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Button, Eyebrow } from './primitives.jsx'

/* EXTRAPOLATED — no comp exists for the header, and no logo exists in either
   PDF, so the wordmark stands in for a lockup. See EXTRAPOLATIONS.md.

   The panel carries each section page's own copy rather than a nav-only
   summary, so the menu and the page it leads to make the same promise. Update
   them together. */

const OVERVIEW_BODY = 'The overview, if you would rather read it in order.'

const NAV = [
  {
    href: '/what-we-do',
    label: 'What we do',
    overview: { title: 'What we do', body: OVERVIEW_BODY },
    columns: [
      {
        href: '/what-we-do/advisory',
        eyebrow: 'Advisory',
        title: 'You need clarity',
        body: 'Before a major investment.',
      },
      {
        href: '/what-we-do/engineering',
        eyebrow: 'Engineering',
        title: 'You need to execute',
        body: 'When something must be built.',
        child: {
          href: '/what-we-do/engineering/agentic-ai',
          label: 'Agentic AI',
          body: 'How the agents actually run the work.',
        },
      },
      {
        href: '/what-we-do/ai-products',
        eyebrow: 'AI products and accelerators',
        title: 'You need proven solutions',
        body: 'Reuse what already works.',
      },
    ],
  },
  {
    href: '/how-we-work',
    label: 'How we work',
    overview: { title: 'How we work', body: OVERVIEW_BODY },
    columns: [
      {
        href: '/how-we-work/client-journey',
        eyebrow: 'What happens, and in what order?',
        title: 'Client journey',
        body: 'Four stages, and the stronger position each one leaves you in.',
      },
      {
        href: '/how-we-work/delivery-model',
        eyebrow: 'How does the work get done?',
        title: 'Delivery model',
        body: 'Agents across every major role, humans accountable for judgment and outcomes.',
      },
      {
        href: '/how-we-work/engagement-model',
        eyebrow: 'How do we engage commercially?',
        title: 'Engagement model',
        body: 'Why we would rather sell an outcome than a timesheet.',
      },
    ],
  },
  { href: '/why-mile42', label: 'Why Mile42' },
]

/* A caret that points down when closed and up when open. */
function Caret({ open }) {
  return (
    <span
      aria-hidden="true"
      className={`ml-1 inline-block h-2 w-2 border-r-2 border-b-2 border-current transition-transform duration-200 ease-m42 ${
        open ? '-translate-y-px rotate-[225deg]' : '-translate-y-0.5 rotate-45'
      }`}
    />
  )
}

/* The column's eyebrow and title are one link, so its accessible name reads
   "Advisory: You need clarity" rather than the title alone. The body sits
   outside it, and a nested child needs its own link, which cannot be nested
   inside another. */
/* The design system's smallest heading is 26px, which wraps every title in a
   248px column. The panel sets its own size rather than borrowing one. */
const PANEL_TITLE = 'font-heading font-bold text-[1.125rem] leading-[1.6rem]'

function PanelColumn({ column, onNavigate }) {
  return (
    <div>
      <Link to={column.href} onClick={onNavigate} className="group block no-underline">
        <Eyebrow as="span" className="mb-2 block">{column.eyebrow}</Eyebrow>
        <span className={`${PANEL_TITLE} text-ink group-hover:underline`}>
          {column.title}
        </span>
      </Link>
      <p className="mt-2 text-body text-ink/72">{column.body}</p>
      {column.child && (
        <div className="mt-4 border-l-2 border-ink/20 pl-3">
          <Link
            to={column.child.href}
            onClick={onNavigate}
            className="text-body font-semibold text-ink no-underline hover:underline"
          >
            {column.child.label}
          </Link>
          <p className="text-body text-ink/72">{column.child.body}</p>
        </div>
      )}
    </div>
  )
}

/* The overview cell. Navy so the panel has somewhere to land, and so the
   section landing page is never the one thing the menu forgets. */
function OverviewCell({ item, onNavigate, className = '' }) {
  return (
    <div className={`bg-navy ${className}`}>
      <Eyebrow as="span" tone="sky" className="mb-2 block">Start here</Eyebrow>
      <Link
        to={item.href}
        onClick={onNavigate}
        className={`${PANEL_TITLE} text-hero-heading no-underline hover:underline`}
      >
        {item.overview.title}
      </Link>
      <p className="mt-2 text-body text-hero-heading/80">{item.overview.body}</p>
      <Button to={item.href} className="mt-4">See the overview</Button>
    </div>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const panelId = useId()

  const [openHref, setOpenHref] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drilledHref, setDrilledHref] = useState(null)

  const headerRef = useRef(null)
  const triggerRefs = useRef({})
  const backRef = useRef(null)
  /* A pinned panel was opened by a click and survives the pointer leaving.
     Without it, clicking a menu the pointer already opened just closes it. */
  const pinnedRef = useRef(false)

  const isCurrent = (href) => pathname === href || pathname.startsWith(`${href}/`)

  const closePanel = useCallback(({ restoreFocus = false } = {}) => {
    setOpenHref((current) => {
      if (restoreFocus && current) triggerRefs.current[current]?.focus()
      return null
    })
    pinnedRef.current = false
  }, [])

  const closeEverything = useCallback(() => {
    closePanel()
    setDrawerOpen(false)
    setDrilledHref(null)
  }, [closePanel])

  useEffect(closeEverything, [pathname, closeEverything])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (openHref) closePanel({ restoreFocus: true })
      if (drawerOpen) setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openHref, drawerOpen, closePanel])

  useEffect(() => {
    if (!openHref) return undefined
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) closePanel()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openHref, closePanel])

  /* Drilling in moves focus to the way back out. */
  useEffect(() => {
    if (drilledHref) backRef.current?.focus()
  }, [drilledHref])

  /* Hover-to-open only where hovering is real. On a touch screen the same tap
     would open and close the panel in one go. */
  const hoverOpens = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  const openItem = NAV.find((item) => item.href === openHref)
  const drilledItem = NAV.find((item) => item.href === drilledHref)

  /* Horizontal padding sits outside `max-w-site`, matching Section and Footer,
     so the wordmark shares the page grid's inset once the container cap binds
     (#23). It cannot move onto `header` itself: the panel and drawer are
     siblings of the bar, and padding there would inset their top borders. The
     panel and drawer repeat the same wrapper so all three track one edge. */
  return (
    <header ref={headerRef} className="relative border-b border-ink bg-page">
      <div className="px-6 py-5 md:px-12">
        <div className="mx-auto flex w-full max-w-site items-center justify-between gap-6">
          <Link to="/" className="font-heading text-heading-3 text-ink no-underline">
            Mile42
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
            onMouseLeave={() => {
              if (!pinnedRef.current) closePanel()
            }}
          >
            {NAV.map((item) => {
              const open = openHref === item.href
              if (!item.columns) {
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                    onMouseEnter={() => hoverOpens() && closePanel()}
                    className="text-body text-ink no-underline aria-[current=page]:font-semibold hover:underline"
                  >
                    {item.label}
                  </Link>
                )
              }
              return (
                <button
                  key={item.href}
                  type="button"
                  ref={(node) => { triggerRefs.current[item.href] = node }}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onMouseEnter={() => hoverOpens() && setOpenHref(item.href)}
                  onClick={() => {
                    if (open && pinnedRef.current) return closePanel()
                    pinnedRef.current = true
                    setOpenHref(item.href)
                  }}
                  className={`flex items-center text-body text-ink hover:underline ${
                    isCurrent(item.href) ? 'font-semibold' : ''
                  }`}
                >
                  {item.label}
                  <Caret open={open} />
                </button>
              )
            })}
            <Button to="/contact">Start a conversation</Button>
          </nav>

          <button
            type="button"
            className="lg:hidden rounded-pill border border-ink shadow-hard bg-surface px-btn-x py-2 text-body font-semibold"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            onClick={() => {
              setDrawerOpen((open) => !open)
              setDrilledHref(null)
            }}
          >
            {drawerOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* The panel spans the header rather than the nav item, so the three
          columns can hold the section pages' own copy. */}
      {openItem && (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full z-40 hidden border-b border-ink bg-page lg:block"
          onMouseLeave={() => {
            if (!pinnedRef.current) closePanel()
          }}
        >
          {/* The grid takes the bar's wrapper so its edges are the bar's edges.
              No padding on the grid itself: each cell carries its own, so the
              dividers run the full height and the navy cell reaches the
              container edge the way the comp draws it. The first column drops
              its left padding so its copy starts on the wordmark's edge rather
              than 24px inside it. */}
          <div className="px-6 md:px-12">
            <div className="mx-auto grid w-full max-w-site lg:grid-cols-[repeat(3,minmax(0,1fr))_19rem]">
              {openItem.columns.map((column, i) => (
                <div
                  key={column.href}
                  className={`py-8 ${i === 0 ? 'pr-6' : 'border-l border-ink/15 px-6'}`}
                >
                  <PanelColumn column={column} onNavigate={closeEverything} />
                </div>
              ))}
              <OverviewCell
                item={openItem}
                onNavigate={closeEverything}
                className="px-6 py-8"
              />
            </div>
          </div>
        </div>
      )}

      {drawerOpen && (
        <nav id="mobile-nav" className="border-t border-ink lg:hidden" aria-label="Primary">
          {drilledItem ? (
            <div>
              <button
                type="button"
                ref={backRef}
                onClick={() => setDrilledHref(null)}
                className="flex w-full items-center gap-2 border-b border-ink bg-surface px-6 py-4 text-body font-semibold text-ink md:px-12"
              >
                <span aria-hidden="true" className="text-lg leading-none">&#8249;</span>
                Menu
              </button>
              <ul className="flex flex-col">
                {drilledItem.columns.map((column) => (
                  <li key={column.href} className="border-b border-ink/15 px-6 py-5 md:px-12">
                    <PanelColumn column={column} onNavigate={closeEverything} />
                  </li>
                ))}
                <li>
                  <OverviewCell
                    item={drilledItem}
                    onNavigate={closeEverything}
                    className="px-6 py-6 md:px-12"
                  />
                </li>
              </ul>
            </div>
          ) : (
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-ink/15">
                  {item.columns ? (
                    <button
                      type="button"
                      onClick={() => setDrilledHref(item.href)}
                      className={`flex w-full items-center justify-between px-6 py-4 text-left text-body text-ink md:px-12 ${
                        isCurrent(item.href) ? 'font-semibold' : ''
                      }`}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-lg leading-none">&#8250;</span>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      aria-current={isCurrent(item.href) ? 'page' : undefined}
                      className="block px-6 py-4 text-body text-ink no-underline aria-[current=page]:font-semibold md:px-12"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="px-6 py-5 md:px-12">
                <Button to="/contact" className="w-full">Start a conversation</Button>
              </li>
            </ul>
          )}
        </nav>
      )}
    </header>
  )
}
