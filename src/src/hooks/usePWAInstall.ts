import { useState, useEffect } from 'react'

let globalPrompt: any = null
let listeners: Array<(prompt: any) => void> = []

// Attach globally immediately so we don't miss the event before React mounts
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    globalPrompt = e
    listeners.forEach(fn => fn(e))
  })
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(globalPrompt)

  useEffect(() => {
    const handler = (prompt: any) => setDeferredPrompt(prompt)
    listeners.push(handler)
    
    // Check if it was caught right before this effect ran
    if (globalPrompt) setDeferredPrompt(globalPrompt)

    return () => {
      listeners = listeners.filter(fn => fn !== handler)
    }
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      globalPrompt = null
    }
  }

  return { install, isInstallable: !!deferredPrompt }
}
