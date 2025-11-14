import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onLoading } from '../lib/loadingBus'

function ShipWheel(props){
  return (
    <svg className="helm" width={96} height={96} viewBox="0 0 64 64" {...props}>
      <g fill="none" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round">
        <circle cx="32" cy="32" r="10"/>
        {/* 8 branches */}
        {[0,45,90,135,180,225,270,315].map(a=>(
          <line key={a}
            x1={32+14*Math.cos(a*Math.PI/180)} y1={32+14*Math.sin(a*Math.PI/180)}
            x2={32+24*Math.cos(a*Math.PI/180)} y2={32+24*Math.sin(a*Math.PI/180)} />
        ))}
      </g>
    </svg>
  )
}

export default function Layout(){
  const loc = useLocation()
  const [busy,setBusy] = useState(false)
  useEffect(()=> onLoading(setBusy), [])

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <span className="logo-dot" />
          <Link to="/" className="brand-name">Calendrier éditorial</Link>
          <span className="nav-title">{loc.pathname}</span>
        </div>
        <div className="nav-right">
  <a
    className="by-link"
    href="https://yatou.ci"
    target="_blank"
    rel="noreferrer"
    aria-label="Visiter yatou.ci"
  >
    <span className="by-pill">
      <span className="by">BY</span>
      <span className="brand-gradient">yatou.ci</span>
      <span className="country">Côte d’Ivoire</span>
    </span>
  </a>
</div>

      </nav>

      <Outlet />

      {busy && (
        <div className="overlay">
          <ShipWheel/>
        </div>
      )}
    </>
  )
}
