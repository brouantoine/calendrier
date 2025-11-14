import { useState } from 'react'
import { login } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username,setU] = useState('')
  const [password,setP] = useState('')
  const [err,setErr] = useState('')
  const [busy,setBusy] = useState(false)
  const nav = useNavigate()

  async function onSubmit(e){
    e.preventDefault(); setErr('')
    try{
      setBusy(true)
      await login(username.trim(), password)
      nav('/')
    }catch{
      setErr('Identifiants invalides')
    }finally{
      setBusy(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        {/* Marque */}
        <div className="login-brand">
          <span className="logo-dot" aria-hidden />
          <span className="brand-yatou">Y’<span>atOu</span></span>
        </div>

        <h1 className="login-title">Connexion</h1>

        <form onSubmit={onSubmit} className="login-form">
          <label className="input-wrap">
            <span className="input-icon" aria-hidden>
              {/* user icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21a8 8 0 10-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              className="input has-icon"
              placeholder="Utilisateur"
              value={username}
              onChange={e=>setU(e.target.value)}
              autoComplete="username"
            />
          </label>

          <label className="input-wrap">
            <span className="input-icon" aria-hidden>
              {/* lock icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 018 0v3" />
              </svg>
            </span>
            <input
              type="password"
              className="input has-icon"
              placeholder="Code / Mot de passe"
              value={password}
              onChange={e=>setP(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          {err && <div className="login-error">{err}</div>}

          <button className="button login-btn" type="submit" disabled={busy}>
            {busy ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <div className="login-foot">
          <span className="by-pill">
            BY <a className="gradlink" href="https://yatou.ci" target="_blank" rel="noreferrer">yatou.ci</a> — Côte d’Ivoire
          </span>
        </div>
      </div>
    </div>
  )
}
