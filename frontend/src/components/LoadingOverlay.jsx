import { createContext, useContext, useState } from 'react'
const Ctx = createContext({ show:()=>{}, hide:()=>{} })

export function LoadingProvider({children}){
  const [on,setOn] = useState(false)
  const api = {
    show:(ms=2000)=>{ setOn(true); if(ms) setTimeout(()=>setOn(false), ms) },
    hide:()=>setOn(false)
  }
  return (
    <Ctx.Provider value={api}>
      {children}
      {on && <div className="overlay">
        <ShipWheel className="helm"/>
      </div>}
    </Ctx.Provider>
  )
}
export const useLoading = ()=> useContext(Ctx)

export function ShipWheel(props){
  // SVG “volant de bateau”
  return (
    <svg viewBox="0 0 120 120" width="96" height="96" {...props}>
      <g stroke="#FF6B00" strokeWidth="6" fill="none" strokeLinecap="round">
        <circle cx="60" cy="60" r="26" />
        {/* 8 rayons */}
        {[0,45,90,135,180,225,270,315].map(a=>{
          const rad=a*Math.PI/180, r1=18, r2=48
          const x1=60+r1*Math.cos(rad), y1=60+r1*Math.sin(rad)
          const x2=60+r2*Math.cos(rad), y2=60+r2*Math.sin(rad)
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2}/>
        })}
        <circle cx="60" cy="60" r="6" fill="#FF6B00"/>
      </g>
    </svg>
  )
}
