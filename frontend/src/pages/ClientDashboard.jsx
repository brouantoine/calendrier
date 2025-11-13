import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { listPrograms, whoami } from '../api'
import Calendar from '../components/Calendar'
import { Link } from 'react-router-dom'   // +++

export default function ClientDashboard(){
  const [me,setMe]=useState(null)
  const [month,setMonth]=useState(new Date())
  const [programs,setPrograms]=useState([])

  useEffect(()=>{ (async()=>{ try{ setMe(await whoami()) }catch{} })() },[])
  useEffect(()=>{ (async()=>{
    try {
      const m = format(month,'yyyy-MM')
      const arr = await listPrograms({ month:m })
      setPrograms(Array.isArray(arr)?arr:[])
    } catch { setPrograms([]) }
  })() },[month])

  const prevMonth = ()=>{ const d=new Date(month); d.setMonth(d.getMonth()-1); setMonth(d) }
  const nextMonth = ()=>{ const d=new Date(month); d.setMonth(d.getMonth()+1); setMonth(d) }

  return (
    <div className="container">
      <div className="header">
        <h2>Bonjour 👋</h2>
        <div className="actions">
          {/* Bouton d’accès admin (création) */}
          {me?.is_staff && (
            <Link className="button" to="/admin">Espace Admin</Link>
          )}
          <button
            className="button ghost"
            onClick={()=>{
              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
              window.location.href='/login';
            }}
          >
            Se déconnecter
          </button>
          <button className="button" onClick={prevMonth}>◀</button>
          <span style={{fontWeight:700}}>{format(month,'LLLL yyyy',{locale:fr})}</span>
          <button className="button" onClick={nextMonth}>▶</button>
        </div>
      </div>

      <div className="card">
        <Calendar month={month} programs={programs} />
      </div>
    </div>
  )
}
