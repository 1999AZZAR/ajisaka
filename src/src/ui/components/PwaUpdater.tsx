import { useRegisterSW } from 'virtual:pwa-register/react'

export function PwaUpdater() {
  useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (!newWorker) return

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
            window.location.reload()
          }
        })
      })
    },
    onRegisterError(error) {
      console.error('SW registration error', error)
    },
  })

  return null
}
