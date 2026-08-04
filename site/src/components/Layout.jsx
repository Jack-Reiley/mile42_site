import { useEffect } from 'react'
import { useLocation } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout({ title, children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
