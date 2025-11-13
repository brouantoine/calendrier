import { addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameMonth } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { useNavigate } from 'react-router-dom'

export default function Calendar({ month, programs=[] }){
  const navigate = useNavigate()
  const first = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
  const last  = endOfWeek(endOfMonth(month),   { weekStartsOn: 1 })
  const days = []; for(let d=first; d<=last; d=addDays(d,1)) days.push(d)

  // groupage par date
  const byDate = programs.reduce((acc,p)=>{
    (acc[p.date] ||= []).push(p); return acc
  }, {})

  return (
    <>
      <div className="grid-head">
        {["LUN","MAR","MER","JEU","VEN","SAM","DIM"].map(d => <div key={d} className="grid-head-cell">{d}</div>)}
      </div>
      <div className="calendar-grid">
        {days.map(d=>{
          const key = format(d,'yyyy-MM-dd')
          const items = byDate[key] || []
          const first4 = items[0]?.title?.slice(0,4) || ''
          return (
            <div key={key}
              className={`tile ${isSameMonth(d,month)?'':'tile--muted'}`}
              onClick={()=> items.length && navigate(`/day/${key}`)}>
              <div className="day">{format(d,'dd',{locale:fr})}</div>
              {!!items.length && (
                <>
                  <div className="mask">{first4}<span className="dots"/></div>
                  <span className="pip"/>
                  {items.length>1 && <span className="badge">{items.length}</span>}
                </>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
