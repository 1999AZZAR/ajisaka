import { useRegisterSW } from 'virtual:pwa-register/react'

export function PwaUpdater() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r)
    },
    onRegisterError(error) {
      console.error('SW registration error', error)
    },
  })

  if (!needRefresh) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-8 md:w-96 z-[999] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex flex-col gap-3 rounded-2xl border-2 border-accent/20 bg-white p-4 shadow-xl shadow-accent/10">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-text">Pembaruan Tersedia</h3>
            <p className="text-sm font-medium text-text-2">
              Versi terbaru Petualangan Ajisaka sudah siap. Muat ulang untuk memperbarui!
            </p>
          </div>
          <button
            onClick={() => setNeedRefresh(false)}
            className="rounded-full p-1 text-text-2 hover:bg-black/5 hover:text-text transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => updateServiceWorker(true)}
            className="flex-1 rounded-xl bg-accent px-4 py-2 font-display font-bold text-white shadow-md shadow-accent/30 transition-transform active:scale-95"
          >
            Muat Ulang Sekarang
          </button>
        </div>
      </div>
    </div>
  )
}
