import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import './styles/index.css'

/* The designed site is not public yet, so it is mounted under /working and
   every other path gets the splash. A router basename does the whole job:
   PAGES keeps its root-relative paths, and every in-app link and
   useLocation() call resolves against the prefix without being rewritten. */
const WORKING_BASE = '/working'

const { pathname } = window.location
const isWorking = pathname === WORKING_BASE || pathname.startsWith(`${WORKING_BASE}/`)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isWorking ? (
      <BrowserRouter basename={WORKING_BASE}>
        <App />
      </BrowserRouter>
    ) : (
      <ComingSoon />
    )}
  </StrictMode>,
)
