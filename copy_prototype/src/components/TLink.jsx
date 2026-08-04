import { Link } from 'react-router'

/** The prototype's recurring "text ›" text link. */
export default function TLink({ to, children }) {
  return (
    <Link className="tlink" to={to}>
      {children} <span className="arw">&#8250;</span>
    </Link>
  )
}
