import { useEffect } from 'react'
import { useLocation } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { scanForReveal, startRevealFallback } from './reveal.js'

export default function Layout({ title, children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.title = title
  }, [title])

  /* Where scroll-driven CSS animation exists this does nothing at all — the
     stylesheet already owns the reveal. Where it does not, this starts the
     observer that stands in for it.

     Re-run per route: a route change swaps the content without reloading the
     document, so the new content has never been seen by the observer. The
     effect runs after React has committed that content, which is what makes
     the query find it. */
  useEffect(() => {
    if (startRevealFallback()) scanForReveal()
  }, [pathname])

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
