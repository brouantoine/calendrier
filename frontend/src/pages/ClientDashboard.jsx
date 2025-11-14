import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { whoami, listPrograms } from '../api'
import Calendar from '../components/Calendar'

export default function ClientDashboard(){
  const [me,setMe]     = useState(null)
  const [month,setMonth]= useState(new Date())
  const [items,setItems]= useState([])

  // loader global simple
  const [loading,setLoading] = useState(false)

  useEffect(()=>{(async()=>{ try{ setMe(await whoami()) }catch{} })()},[])

  useEffect(()=>{(async()=>{
    try{
      setLoading(true)
      const m = format(month,'yyyy-MM')
      const arr = await listPrograms({ month:m })
      setItems(Array.isArray(arr)?arr:[])
    } finally { setLoading(false) }
  })()},[month])

  const prev = ()=>{ const d=new Date(month); d.setMonth(d.getMonth()-1); setMonth(d) }
  const next = ()=>{ const d=new Date(month); d.setMonth(d.getMonth()+1); setMonth(d) }

  return (
    <div className="container">
      {/* NAVBAR (optionnel si tu as déjà un Layout) */}
      <div className="navbar">
        <div className="nav-left">
          <span className="logo-dot" />
          <b className="brand-name">Calendrier éditorial</b>
        </div>
        <div className="nav-right">
          {me?.is_staff && <Link to="/admin" className="button">Espace Admin</Link>}
          <button className="button ghost" onClick={()=>{
            localStorage.removeItem('access'); localStorage.removeItem('refresh'); window.location.href='/login'
          }}>Se déconnecter</button>
        </div>
      </div>

      <div className="header">
        <h2>Bonjour 👋</h2>
        <div className="actions">
          <button className="icon-btn button" onClick={prev}>◀</button>
          <span style={{fontWeight:900}}>{format(month,'LLLL yyyy',{locale:fr})}</span>
          <button className="icon-btn button" onClick={next}>▶</button>
        </div>
      </div>

      <div className="card">
        <Calendar month={month} programs={items}/>
      </div>

      {loading && (
        <div className="overlay" aria-live="polite" aria-busy="true">
          {/* Volant de bateau (SVG mono-orange) */}
          <svg className="helm" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chargement">
            <circle cx="32" cy="32" r="10" stroke="#FF6B00" strokeWidth="4"/>
            {Array.from({length:8}).map((_,i)=>(
              <line key={i}
                x1="32" y1="6" x2="32" y2="16"
                stroke="#FF6B00" strokeWidth="4" strokeLinecap="round"
                transform={`rotate(${i*45} 32 32)`}/>
            ))}
          </svg>
        </div>
      )}
    </div>
  )
}
