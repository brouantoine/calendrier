import { useEffect, useState } from 'react'
import { whoami } from '../../api'
import CreateClient from './CreateClient'
import CreateProgram from './CreateProgram'


export default function AdminDashboard(){
const [me,setMe]=useState(null)
useEffect(()=>{ (async()=>{ setMe(await whoami()) })() },[])


if(me && !me.is_staff) return <div className="container"><p>Accès refusé (admin uniquement)</p></div>


return (
<div className="container">
<h2>Espace Admin</h2>
<div className="row cols-2">
<CreateClient/>
<CreateProgram/>
</div>
</div>
)
}