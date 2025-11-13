import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config) => {
  const t = localStorage.getItem('access')
  if (t) config.headers.Authorization = `Bearer ${t}`
  return config
})

export async function login(username, password) {
  const { data } = await api.post('/token/', { username, password })
  localStorage.setItem('access', data.access)
  localStorage.setItem('refresh', data.refresh)
}
export function logout(){
  localStorage.removeItem('access'); localStorage.removeItem('refresh')
}

export async function whoami() {
  const { data } = await api.get('/me/')
  return data
}

export async function createClient(payload) {
  const { data } = await api.post('/admin-actions/create-client/', payload)
  return data
}

export async function listClients(){
  const { data } = await api.get('/clients/')
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export async function listPrograms(params = {}) {
  // params peut contenir { month: 'YYYY-MM' } OU { day: 'YYYY-MM-DD' } OU { client }
  const { data } = await api.get('/programs/', { params })
  return data
}
export async function getProgram(id) {
  const { data } = await api.get(`/programs/${id}/`)
  return data
}
export async function createProgram(p) {  // p = {client,date,time,title,type,...}
  const { data } = await api.post('/programs/', p)
  return data
}
