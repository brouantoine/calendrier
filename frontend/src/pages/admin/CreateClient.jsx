import { useState } from 'react'
import { createClient } from '../../api'

export default function CreateClient(){
  const [f,setF]=useState({username:'',first_name:'',last_name:'',phone:'',pin_code:''})
  const [msg,setMsg]=useState('')

  async function submit(e){
    e.preventDefault(); setMsg('')
    if((f.pin_code||'').length < 4){ setMsg('PIN trop court (≥ 4).'); return }
    const r = await createClient(f)
    setMsg(`Client créé (#${r.id}) : @${r.username}`)
  }

  function copyCreds(){
    const txt = `Utilisateur: @${f.username}\nCode: ${f.pin_code}`
    navigator.clipboard?.writeText(txt)
  }

  return (
    <div className="card">
      <h3>Créer un client</h3>
      <form onSubmit={submit} className="row">
        <div className="row cols-2">
          <input className="input" placeholder="Nom d’utilisateur" value={f.username} onChange={e=>setF({...f,username:e.target.value})} />
          <input className="input" placeholder="Code (≥4 chiffres)" value={f.pin_code} onChange={e=>setF({...f,pin_code:e.target.value})} />
          <input className="input" placeholder="Prénom" value={f.first_name} onChange={e=>setF({...f,first_name:e.target.value})} />
          <input className="input" placeholder="Nom" value={f.last_name} onChange={e=>setF({...f,last_name:e.target.value})} />
          <input className="input" placeholder="Contact (téléphone)" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} />
        </div>
        <div className="row cols-2">
          <button className="button" type="submit">Créer</button>
          <button className="button ghost" type="button" onClick={copyCreds}>Copier identifiants</button>
        </div>
        {msg && <div style={{color:'var(--muted)'}}>{msg}</div>}
      </form>
    </div>
  )
}
