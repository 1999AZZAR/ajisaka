import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('#root not found')

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

registerSW({
  onNeedRefresh() {
    if (window.confirm('Ada pembaruan Petualangan Ajisaka. Muat ulang?')) {
      window.location.reload()
    }
  },
  onOfflineReady() {
    console.info('Petualangan Ajisaka siap dimainkan secara offline.')
  },
})

// Global SFX listener for interactive operations
window.addEventListener('pointerdown', (e) => {
  const target = e.target as HTMLElement
  
  // Only play sound if tapping an interactive element
  const isInteractive = target?.closest('button, a, [role="button"], input, select, textarea, [tabindex="0"]')
  
  // Exclude the drawing canvas itself since it has its own stroke sounds
  if (isInteractive && target.tagName !== 'CANVAS') {
    import('./engine/audio').then(m => m.playClick())
  }
}, { capture: true })