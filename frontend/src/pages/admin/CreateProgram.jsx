import { useEffect, useState } from 'react'
import { createProgram, listClients } from '../../api'
import { format } from 'date-fns'

export default function CreateProgram(){
  const [clients,setClients] = useState([])
  const [clientId,setClientId] = useState(0)
  const [dateStr,setDateStr] = useState(format(new Date(),'yyyy-MM-dd'))
  const [time,setTime] = useState('09:00')                       // NEW
  const [title,setTitle] = useState('')
  const [type,setType] = useState('vente')
  const [media_brief,setMB] = useState('')
  const [caption,setCaption] = useState('')
  const [platforms,setPlatforms] = useState('Facebook, Instagram, TikTok')
  const [hashtags,setHashtags] = useState('')
  const [notes,setNotes] = useState('')
  const [msg,setMsg] = useState('')

  useEffect(() => { (async () => {
    try { setClients(await listClients()) } catch { setClients([]) }
  })() }, [])

  async function submit(e){
    e.preventDefault(); setMsg('')
    if(!clientId){ setMsg('Choisis un client.'); return }
    const payload = {
      client: clientId, date: dateStr, time,                // NEW
      title, type, media_brief, caption,
      platforms: platforms.split(',').map(s=>s.trim()).filter(Boolean),
      hashtags: hashtags.split(',').map(s=>s.replace(/^#/,'').trim()).filter(Boolean),
      notes
    }
    const r = await createProgram(payload)
    setMsg(`Programme enregistré pour ${r.date} à ${r.time?.slice(0,5) || time}`)
  }

  return (
    <div className="card">
      <h3>Nouveau programme (jour)</h3>
      <form onSubmit={submit} className="row">
        <div className="row cols-3">
          {clients.length>0 ? (
            <select className="input" value={clientId} onChange={e=>setClientId(parseInt(e.target.value||'0',10)||0)}>
              <option value="0">— Sélectionner un client —</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>@{c.username} — {c.first_name} {c.last_name}</option>
              ))}
            </select>
          ) : (
            <input className="input" type="number" placeholder="ID client" value={clientId} onChange={e=>setClientId(parseInt(e.target.value||'0',10)||0)} />
          )}
          <input className="input" type="date" value={dateStr} onChange={e=>setDateStr(e.target.value)} />
          <input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} /> {/* NEW */}
        </div>

        <input className="input" placeholder="Titre (pour calendrier)" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="input" placeholder="Brief visuel (Photo/Vidéo)" value={media_brief} onChange={e=>setMB(e.target.value)} />
        <textarea className="input" placeholder="Légende (copier-coller)" value={caption} onChange={e=>setCaption(e.target.value)} />
        <div className="row cols-2">
          <input className="input" placeholder="Plateformes (séparées par virgules)" value={platforms} onChange={e=>setPlatforms(e.target.value)} />
          <input className="input" placeholder="Hashtags (séparés par virgules)" value={hashtags} onChange={e=>setHashtags(e.target.value)} />
        </div>
        <textarea className="input" placeholder="Notes internes" value={notes} onChange={e=>setNotes(e.target.value)} />
        <div className="row cols-2">
          <button className="button" type="submit">Enregistrer</button>
          {msg && <div style={{alignSelf:'center', color:'var(--muted)'}}>{msg}</div>}
        </div>
      </form>
    </div>
  )
}
