import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login(){
  const [username,setU] = useState('')
  const [password,setP] = useState('')
  const [err,setErr] = useState('')
  const nav = useNavigate()

  async function onSubmit(e){
    e.preventDefault(); setErr('')
    try{
      await login(username,password)
      nav('/')
    }catch{
      setErr('Identifiants invalides')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        {/* Marque */}
        <div className="login-brand">
          <span className="logo-dot" />
          <div style={{fontWeight:900, fontSize:24}}>
            <span className="brand-gradient">Mon Calendrier</span>
          </div>
        </div>

        <h2 className="login-title">Connexion</h2>

        <form onSubmit={onSubmit} className="login-form">
          {/* Utilisateur */}
          <div className="input-wrap">
            <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm8 8a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              className="input has-icon"
              placeholder="Utilisateur"
              value={username}
              onChange={e=>setU(e.target.value)}
            />
          </div>

          {/* Mot de passe */}
          <div className="input-wrap">
            <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 10h12v9H6zM8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              className="input has-icon"
              type="password"
              placeholder="Code / Mot de passe"
              value={password}
              onChange={e=>setP(e.target.value)}
            />
          </div>

          {err && (
            <div className="login-error">{err}</div>
          )}

          <button className="button login-btn" type="submit">Se connecter</button>
        </form>

        {/* BY yatou.ci — Côte d’Ivoire */}
        <div className="login-foot">
          <span className="by-pill">
            <span className="by">BY</span>
            <span className="brand-gradient">yatou.ci</span>
            <span className="country">Côte d’Ivoire</span>
          </span>
        </div>
      </div>
    </div>
  )
}
