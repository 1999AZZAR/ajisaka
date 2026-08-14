import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const navigate = useNavigate()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    // Playful entrance animation for the title and background
    if (titleRef.current) {
      anime({
        targets: titleRef.current.children,
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        easing: 'easeOutElastic(1, .6)',
        duration: 1200,
      })
    }
    
    // Floating background letters
    if (bgRef.current) {
      anime({
        targets: bgRef.current.children,
        translateY: ['-10px', '10px'],
        rotate: [-5, 5],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 2500,
        delay: anime.stagger(200)
      })
    }
  }, [])

  return (
    <>
      <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-paper to-[oklch(0.95_0.02_78)] px-6 py-10">
        {/* Decorative floating Aksara letters */}
        <div ref={bgRef} aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
          <span className="absolute top-10 left-10 text-8xl text-accent" style={{ fontFamily: 'var(--font-javanese)' }}>ꦲ</span>
          <span className="absolute bottom-20 right-10 text-9xl text-accent-2" style={{ fontFamily: 'var(--font-javanese)' }}>ꦤ</span>
          <span className="absolute top-1/3 right-5 text-7xl text-text-2" style={{ fontFamily: 'var(--font-javanese)' }}>ꦕ</span>
          <span className="absolute bottom-1/3 left-5 text-8xl text-warn" style={{ fontFamily: 'var(--font-javanese)' }}>ꦫ</span>
        </div>

        <div className="relative z-10 w-full max-w-3xl">
          {/* Main hero card */}
          <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[2.5rem] border-4 border-white/80 bg-white/60 p-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-transform">
            
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-accent-2/40 opacity-75 blur-md" />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-accent to-[oklch(0.48_0.14_25)] text-6xl shadow-[0_8px_0_oklch(0.4_0.14_25)] ring-4 ring-white">
                <span className="drop-shadow-md">🗡️</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <h1 ref={titleRef} className="font-display text-[3.2rem] leading-[1.1] text-text drop-shadow-sm">
                <span className="block text-accent">{t('app.petualangan')}</span>
                <span className="block">{t('app.ajisaka')}</span>
              </h1>
              <p className="max-w-[16rem] text-base font-medium text-text-2">
                {t('home.desc')}
              </p>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 w-full">
              <button 
                onClick={() => navigate('/menu')}
                className="w-full sm:w-64 rounded-3xl bg-gradient-to-b from-accent to-[oklch(0.50_0.14_25)] px-8 py-5 font-display text-2xl tracking-wide text-white shadow-[0_8px_0_oklch(0.40_0.14_25),0_15px_20px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_0_oklch(0.40_0.14_25),0_20px_25px_rgba(0,0,0,0.2)] active:translate-y-2 active:shadow-[0_0px_0_oklch(0.40_0.14_25),0_0px_0_rgba(0,0,0,0)]"
              >
                {t('home.play')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}