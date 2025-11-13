import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login.jsx'
import ClientDashboard from './pages/ClientDashboard.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ProgramDay from './pages/ProgramDay.jsx'
import ProgramDetail from './pages/ProgramDetail.jsx'
import Layout from './components/Layout.jsx'

import './styles.css'

function RequireAuth({ children }) {
  const hasToken = !!localStorage.getItem('access')
  return hasToken ? children : <Navigate to="/login" replace />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Toutes les pages app passent par la navbar Layout */}
        <Route element={<RequireAuth><Layout/></RequireAuth>}>
          <Route path="/" element={<ClientDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/day/:date" element={<ProgramDay />} />
          <Route path="/program/:id" element={<ProgramDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
