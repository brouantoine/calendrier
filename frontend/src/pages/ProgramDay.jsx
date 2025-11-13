import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { listPrograms } from '../api'
import { format, parseISO } from 'date-fns'
import fr from 'date-fns/locale/fr'

export default function ProgramDay(){
  const { date } = useParams()
  const [items,setItems] = useState([])

  useEffect(()=>{ (async()=>{
    const data = await listPrograms({ day: date })
    // tri heure (null en fin)
    data.sort((a,b)=>(a.time||'99:99').localeCompare(b.time||'99:99'))
    setItems(data)
  })() },[date])

  return (
    <div className="container">
      <div className="header">
        <h2>Calendrier · {format(parseISO(date), "EEEE d MMMM yyyy", {locale:fr})}</h2>
        <Link className="button ghost" to="/">← Retour</Link>
      </div>

      <div className="day-list">
        {items.map(p=>(
          <Link key={p.id} to={`/program/${p.id}`} className="day-card">
            <div className="time">{(p.time||'').slice(0,5) || "—"}</div>
            <div>
              <div className="title">{p.title}</div>
              <div className="meta">
                <span className="pill">{p.type}</span>
                {p.platforms?.slice(0,3).map((pl,i)=><span key={i} className="pill">{pl}</span>)}
              </div>
            </div>
            <div>›</div>
          </Link>
        ))}
        {items.length===0 && <div className="card">Aucun programme ce jour.</div>}
      </div>
    </div>
  )
}
