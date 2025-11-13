import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Le host du Quick Tunnel change à chaque run.
// Solution simple: allowedHosts: true (autorise tout en DEV).
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // écoute 0.0.0.0
    port: 5173,
    allowedHosts: true,   // <— évite "Blocked request: host not allowed"
    cors: true,
    hmr: {
      // Le tunnel est en HTTPS → WebSocket sécurisé
      protocol: 'wss',
      clientPort: 443,    // HMR via 443 à travers Cloudflare
      // NE PAS fixer 'host' => Vite utilisera window.location.hostname (ton sous-domaine trycloudflare)
    },
  },
})
