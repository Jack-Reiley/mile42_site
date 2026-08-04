import { useEffect } from 'react'
import { useLocation } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

/** Restores the full-page-load scroll behaviour the Astro prototype had. */
function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

export default function Layout({ title, children }) {
  useScrollToTop()

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      <p className="proto-banner">
        Mid-fidelity prototype. Structure and copy only, no visual design. Placeholders are marked.
      </p>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
