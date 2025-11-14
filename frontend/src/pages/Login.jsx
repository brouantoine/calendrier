import { useState } from 'react'
import { login } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username,setU] = useState('')
  const [password,setP] = useState('')
  const [err,setErr] = useState('')
  const nav = useNavigate()

  async function onSubmit(e){
    e.preventDefault(); setErr('')
    try{
      await login(username.trim(), password)
      nav('/')
    }catch{
      setErr('Identifiants invalides')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        {/* Marque / titre */}
        <div className="login-brand">
          <span className="logo-dot" />
          <h1 className="brand-line">
            <span>Mon </span>
            <span className="brand-gradient">Calendrier</span>
          </h1>
        </div>
        <h2 className="login-title">Connexion</h2>

        {/* Formulaire */}
        <form className="login-form" onSubmit={onSubmit} autoComplete="on">
          <div className="input-wrap">
            <span className="input-icon" aria-hidden="true">
              {/* user */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#999" strokeWidth="1.8"/>
                <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#999" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              className="input has-icon"
              placeholder="Utilisateur"
              value={username}
              onChange={e=>setU(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>

          <div className="input-wrap">
            <span className="input-icon" aria-hidden="true">
              {/* lock */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="11" width="16" height="9" rx="2" stroke="#999" strokeWidth="1.8"/>
                <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#999" strokeWidth="1.8"/>
              </svg>
            </span>
            <input
              className="input has-icon"
              type="password"
              placeholder="Code / Mot de passe"
              value={password}
              onChange={e=>setP(e.target.value)}
            />
          </div>

          {err && <div className="login-error">{err}</div>}

          <button className="button login-btn" type="submit">Se connecter</button>
        </form>

        {/* Badge bas */}
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
