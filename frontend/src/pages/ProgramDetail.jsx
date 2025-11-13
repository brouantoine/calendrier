import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProgram } from '../api'

export default function ProgramDetail(){
  const { id } = useParams()
  const nav = useNavigate()
  const [p,setP]=useState(null)

  useEffect(()=>{ (async()=> setP(await getProgram(id)) )() },[id])
  if(!p) return <div className="container"><div className="card">Chargement…</div></div>

  return (
    <div className="container">
      <div className="header">
        <h2>{p.title}</h2>
        <div className="actions">
          <button className="button ghost" onClick={()=>nav(-1)}>← Retour</button>
        </div>
      </div>

      <div className="detail-card">
        <div className="chips">
          <span className="chip">{p.date} · {p.time?.slice(0,5)}</span>
          <span className="chip">{p.type}</span>
          {(p.platforms||[]).map(x=><span key={x} className="chip">{x}</span>)}
        </div>

        {p.media_brief && (
          <div className="section">
            <div className="section-h"><h3>Brief visuel</h3><CopyBtn text={p.media_brief}/></div>
            <div className="section-pre">{p.media_brief}</div>
          </div>
        )}

        {p.caption && (
          <div className="section">
            <div className="section-h"><h3>Légende</h3><CopyBtn text={p.caption}/></div>
            <div className="section-pre">{p.caption}</div>
          </div>
        )}

        {(p.hashtags||[]).length>0 && (
          <div className="section">
            <div className="section-h"><h3>Hashtags</h3>
              <CopyBtn text={p.hashtags.map(h=>`#${h}`).join(' ')}/></div>
            <div className="section-pre">{p.hashtags.map(h=>`#${h}`).join(' ')}</div>
          </div>
        )}

        {p.notes && (
          <div className="section">
            <div className="section-h"><h3>Notes</h3></div>
            <div className="section-pre">{p.notes}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function CopyBtn({text}) {
  return <button
    className="button"
    onClick={async()=>{ await navigator.clipboard.writeText(text) }}
  >Copier</button>
}
