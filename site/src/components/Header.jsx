import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Button, Eyebrow } from './primitives.jsx'
import logo from '../assets/mile42-logo.svg'

/* EXTRAPOLATED — no comp exists for the header. The lockup is the supplied
   brand SVG; the rest of the bar is extrapolated. See EXTRAPOLATIONS.md.

   The panel carries each section page's own copy rather than a nav-only
   summary, so the menu and the page it leads to make the same promise. Update
   them together. */

const OVERVIEW_BODY = 'The overview, if you would rather read it in order.'

/* Written out per column count rather than interpolated: Tailwind generates a
   class only when the complete name appears in source, so `repeat(${n},...)`
   produces no utility at all and the panel silently collapses to one column. */
const PANEL_GRID = {
  3: 'lg:grid-cols-[repeat(3,minmax(0,1fr))_19rem]',
  4: 'lg:grid-cols-[repeat(4,minmax(0,1fr))_19rem]',
}

const NAV = [
  {
    href: '/what-we-do',
    label: 'What we do',
    overview: { title: 'What we do', body: OVERVIEW_BODY },
    columns: [
      {
        href: '/what-we-do/phase-zero',
        eyebrow: 'Not sure where to start',
        title: 'Phase Zero',
        body: 'The low-risk way in, priced to be a decision.',
      },
      {
        href: '/what-we-do/advisory',
        eyebrow: 'You need clarity',
        title: 'Advisory',
        body: 'Before a major investment.',
      },
      {
        href: '/what-we-do/engineering',
        eyebrow: 'You need to execute',
        title: 'Engineering',
        body: 'When something must be built.',
        child: {
          href: '/what-we-do/engineering/agentic-ai',
          label: 'Agentic AI',
          body: 'How the agents actually run the work.',
        },
      },
      {
        href: '/what-we-do/ai-products',
        eyebrow: 'You need proven solutions',
        title: 'AI products and accelerators',
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
  { href: '/meet-dewey', label: 'Meet Dewey' },
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
   "You need clarity: Advisory" rather than the title alone. The body sits
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
  const idPrefix = useId()
  /* A panel id per section rather than one shared id. Only one panel is
     rendered at a time, so a shared id would have every caret pointing at
     whichever section happened to be open, and at nothing at all while the
     panel is closed. */
  const panelId = (href) => `${idPrefix}${href.replace(/\W+/g, '-')}`

  const [openHref, setOpenHref] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drilledHref, setDrilledHref] = useState(null)
  const [condensed, setCondensed] = useState(false)

  const headerRef = useRef(null)
  const triggerRefs = useRef({})
  const backRef = useRef(null)

  const isCurrent = (href) => pathname === href || pathname.startsWith(`${href}/`)

  const closePanel = useCallback(({ restoreFocus = false } = {}) => {
    setOpenHref((current) => {
      if (restoreFocus && current) triggerRefs.current[current]?.focus()
      return null
    })
  }, [])

  const closeEverything = useCallback(() => {
    closePanel()
    setDrawerOpen(false)
    setDrilledHref(null)
  }, [closePanel])

  /* Condensed past a threshold rather than tracking the scroll continuously.
     The bar's height is what changes, and height is layout — recomputing it on
     every scroll frame would cost far more than the effect is worth. One class
     flip at 24px, with the transition doing the smoothing. */
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  return (
    /* The leave handler belongs on the header, not the nav: the panel is a
       child of the header, so travelling from a trigger down into the panel
       never leaves this element. On the nav it fired the moment the pointer
       cleared a nav item, closing the panel on the way to it. */
    <header
      ref={headerRef}
      /* Sticky so navigation stays reachable: the longest page is 3044px, and
         the header used to simply leave. z-40 clears the spot illustrations that
         break out of their cards, which sit at z-10. */
      className={`sticky top-0 z-40 border-b border-ink bg-page transition-shadow duration-[var(--duration-btn)] ease-m42 motion-reduce:transition-none ${
        condensed ? 'shadow-hard' : ''
      }`}
      onMouseLeave={() => hoverOpens() && closePanel()}
    >
      {/* Horizontal padding sits outside `max-w-site`, matching Section and
          Footer, so the wordmark shares the page grid's inset once the
          container cap binds (#23). It cannot move onto `header` itself: the
          panel and drawer are siblings of the bar, and padding there would
          inset their top borders. The panel and drawer repeat this wrapper so
          all three track one edge. */}
      <div
        className={`px-6 transition-[padding] duration-[var(--duration-btn)] ease-m42 motion-reduce:transition-none md:px-12 ${
          condensed ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-site items-center justify-between gap-6">
          {/* The asset's viewBox is cropped to the drawn mark, so the img box
              and the artwork share an edge and the lockup keeps the page grid's
              inset the way the wordmark did (#23).

              Both axes are sized explicitly rather than one being `auto`. The
              mark's ring tapers to a hairline, and an `auto` width resolved to
              80.695px, which put every stroke off the device pixel grid: 38% of
              the ring's ink rasterized as partial alpha and its thin arc topped
              out at alpha 191, which is what read as a soft, grey line. The
              asset is an exact 2:1, so 120x60 is whole pixels on both axes at
              any device ratio.

              60px rather than the 52px the CTA sets, so the lockup is now what
              sizes the bar. The mark has no hinting, so identical strokes land
              on different pixel phases and render at visibly different weights:
              at 48px the stems were 2.2px and the unevenness read as a fault in
              the artwork. 60px takes them to 2.8px, which narrows the gap
              between a stem that snaps to a pixel and one that straddles two.
              It does not close it. Only a pixel-fitted master does that. */}
          <Link to="/" className="no-underline">
            <img
              src={logo}
              alt="Mile42"
              width="120"
              height="60"
              className="block h-15 w-30"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
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
              /* The label navigates to the section overview and the caret opens
                 the panel. One control cannot do both: a button would lose the
                 URL, middle-click and open-in-new-tab, and a link alone would
                 leave the panel unreachable from the keyboard. */
              return (
                <div
                  key={item.href}
                  className="flex items-center"
                  onMouseEnter={() => hoverOpens() && setOpenHref(item.href)}
                >
                  <Link
                    to={item.href}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                    className="text-body text-ink no-underline aria-[current=page]:font-semibold hover:underline"
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    ref={(node) => { triggerRefs.current[item.href] = node }}
                    aria-expanded={open}
                    aria-controls={open ? panelId(item.href) : undefined}
                    aria-label={`${item.label} menu`}
                    onClick={() => (open ? closePanel() : setOpenHref(item.href))}
                    className="flex items-center px-1 text-ink"
                  >
                    <Caret open={open} />
                  </button>
                </div>
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
          id={panelId(openItem.href)}
          className="absolute inset-x-0 top-full z-40 hidden border-b border-ink bg-page lg:block"
        >
          {/* The grid takes the bar's wrapper so its edges are the bar's edges.
              No padding on the grid itself: each cell carries its own, so the
              dividers run the full height and the navy cell reaches the
              container edge the way the comp draws it. The first column drops
              its left padding so its copy starts on the wordmark's edge rather
              than 24px inside it. */}
          <div className="px-6 md:px-12">
            <div className={`mx-auto grid w-full max-w-site ${PANEL_GRID[openItem.columns.length]}`}>
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
                    /* Same split as the desktop nav: the label goes to the
                       overview, the chevron opens the section. */
                    <div className="flex items-center">
                      <Link
                        to={item.href}
                        aria-current={isCurrent(item.href) ? 'page' : undefined}
                        className="flex-1 px-6 py-4 text-body text-ink no-underline aria-[current=page]:font-semibold md:pl-12"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`${item.label} menu`}
                        onClick={() => setDrilledHref(item.href)}
                        className="self-stretch border-l border-ink/15 px-6 text-ink md:pr-12"
                      >
                        <span aria-hidden="true" className="text-lg leading-none">&#8250;</span>
                      </button>
                    </div>
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
