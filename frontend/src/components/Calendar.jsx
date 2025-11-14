import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Calendar({ month, programs=[] }){
  // regroupe par date ISO (yyyy-MM-dd)
  const byDate = programs.reduce((acc,p)=>{
    const k = p.date; (acc[k] ??= []).push(p); return acc
  },{})

  // calcule les jours à afficher (du lundi au dimanche, 6 lignes max)
  const y = month.getFullYear(), m = month.getMonth()
  const first = new Date(y,m,1)
  const start = new Date(first); start.setDate(1 - ((first.getDay()+6)%7)) // lundi
  const cells = Array.from({length:42}).map((_,i)=>{ const d=new Date(start); d.setDate(start.getDate()+i); return d })

  const monthStr = `${y}-${String(m+1).padStart(2,'0')}`

  return (
    <div className="calendar-wrap">
      <div className="grid-head">
        {['LUN','MAR','MER','JEU','VEN','SAM','DIM'].map(d=>(
          <div key={d} className="grid-head-cell">{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((d,i)=>{
          const key = format(d,'yyyy-MM-dd')
          const inMonth = format(d,'yyyy-MM') === monthStr
          const list = byDate[key] || []
          const firstTitle = list[0]?.title || ''
          return (
            <Link to={`/day/${key}`} className={`tile ${inMonth ? '' : 'tile--muted'}`} key={i}>
              <div className="day">{format(d,'dd')}</div>
              {firstTitle && <div className="title">{firstTitle}</div>}
              {list.length>0 && <span className="badge">{list.length}</span>}
              {list.length>0 && <span className="pip" />}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
