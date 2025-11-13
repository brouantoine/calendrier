import { Link } from "react-router-dom"

export default function Navbar({ children, right }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        <span className="logo-dot" />
        <Link to="/" className="brand-name">Calendrier</Link>
        <div className="nav-title">{children}</div>
      </div>

      <div className="nav-right">
        {right}
        <a className="badge-maker" href="https://yatou.ci" target="_blank" rel="noreferrer">
          BY <span className="gradtext">yatou.ci</span>
        </a>
      </div>
    </header>
  )
}
