import { useState } from 'react'
import { login } from '../api'
import { useNavigate } from 'react-router-dom'


export default function Login(){
const [username,setU]=useState('')
const [password,setP]=useState('')
const [err,setErr]=useState('')
const nav = useNavigate()


async function onSubmit(e){
e.preventDefault(); setErr('')
try{
await login(username,password)
nav('/')
}catch(e){ setErr('Identifiants invalides') }
}
return (
<div className="container">
<div className="card" style={{maxWidth:420, margin:'80px auto'}}>
<h2>Connexion</h2>
<form onSubmit={onSubmit}>
<div className="row">
<input className="input" placeholder="Utilisateur" value={username} onChange={e=>setU(e.target.value)}/>
<input className="input" type="password" placeholder="Code / Mot de passe" value={password} onChange={e=>setP(e.target.value)}/>
{err && <div style={{color:'#fecaca'}}>{err}</div>}
<button className="button" type="submit">Se connecter</button>
</div>
</form>
<p style={{opacity:.8, marginTop:8}}>Astuce: l’admin va sur <span className="link" onClick={()=>nav('/admin')}>/admin</span> après connexion.</p>
</div>
</div>
)
}