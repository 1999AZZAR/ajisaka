import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from './BackButton'
import anime from 'animejs'
import { useTranslation } from 'react-i18next'

const slides = [
  {
    titleKey: 'prolog_page.slides.1.title',
    icon: '📜',
    bodyKey: 'prolog_page.slides.1.body',
  },
  {
    titleKey: 'prolog_page.slides.2.title',
    icon: '👑',
    bodyKey: 'prolog_page.slides.2.body',
  },
  {
    titleKey: 'prolog_page.slides.3.title',
    icon: '🗡️',
    bodyKey: 'prolog_page.slides.3.body',
  },
  {
    titleKey: 'prolog_page.slides.4.title',
    icon: '⚔️',
    bodyKey: 'prolog_page.slides.4.body',
  },
  {
    titleKey: 'prolog_page.slides.5.title',
    icon: '🥀',
    bodyKey: 'prolog_page.slides.5.body',
  },
  {
    titleKey: 'prolog_page.slides.6.title',
    icon: '✨',
    bodyKey: 'prolog_page.slides.6.body',
  },
]

export default function Prolog() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [i, setI] = useState(0)
  const isDone = i >= slides.length - 1
  const s = slides[Math.min(i, slides.length - 1)]

  const slideRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Pop animation on slide change
    if (slideRef.current) {
      anime.remove(slideRef.current.children)
      anime({
        targets: slideRef.current.children,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutElastic(1, .8)',
        duration: 800,
        delay: anime.stagger(100)
      })
    }
  }, [i])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [i, isDone])

  const handleNext = () => {
    if (!isDone) setI((v) => v + 1)
    else navigate('/menu')
  }

  return (
    <main className="mx-auto flex h-dvh w-full max-w-3xl flex-col px-6 pb-6 pt-8 bg-paper overflow-hidden">
      <header className="mb-6 shrink-0 flex items-center justify-between">
        <BackButton />
        <span className="rounded-full bg-paper-2 border border-border px-4 py-1.5 text-xs font-bold text-text-2 shadow-sm">
          {t('prolog_page.title')}
        </span>
      </header>

      <section 
        ref={slideRef}
        className="relative flex flex-1 min-h-0 flex-col items-center justify-center gap-4 sm:gap-6 overflow-y-auto overflow-x-hidden rounded-[2rem] sm:rounded-[2.5rem] border-[3px] border-white/80 bg-white/70 p-4 sm:p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl no-scrollbar"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-6 select-none text-[6rem] sm:text-[8rem] leading-none text-accent/5 opacity-50"
          style={{ fontFamily: 'var(--font-javanese)' }}
        >
          ꦲ
        </span>

        <div className="relative shrink-0">
          <div className="absolute inset-0 animate-ping rounded-[1.5rem] sm:rounded-[2rem] bg-accent/20 blur-md opacity-60" />
          <div className="relative flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-paper to-paper-2 text-5xl sm:text-6xl shadow-[0_4px_0_oklch(0.86_0.025_78)] sm:shadow-[0_6px_0_oklch(0.86_0.025_78)] border-[3px] sm:border-4 border-white">
            <span className="drop-shadow-sm">{s.icon}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2 sm:gap-4 shrink-0">
          <h2 className="font-display text-[1.5rem] sm:text-[2rem] leading-tight text-text">{t(s.titleKey)}</h2>
          <p className="max-w-[16rem] text-[0.95rem] sm:text-[1.05rem] font-medium leading-relaxed text-text-2">{t(s.bodyKey)}</p>
        </div>
      </section>

      <footer className="mt-6 shrink-0 flex flex-col gap-6">
        <div className="flex items-center justify-center gap-3" aria-hidden="true">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${idx === Math.min(i, slides.length - 1) ? 'w-10 bg-accent shadow-sm' : 'w-2.5 bg-border/80'}`}
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className={`w-full rounded-[1.5rem] px-8 py-4 font-display text-xl tracking-wide text-white transition-all 
            ${!isDone 
              ? 'bg-gradient-to-b from-accent to-[oklch(0.50_0.14_25)] shadow-[0_6px_0_oklch(0.40_0.14_25),0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_0_oklch(0.40_0.14_25),0_15px_25px_rgba(0,0,0,0.2)] active:shadow-[0_0px_0_oklch(0.40_0.14_25)]' 
              : 'bg-gradient-to-b from-accent-2 to-[oklch(0.65_0.13_80)] shadow-[0_6px_0_oklch(0.65_0.13_80),0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_0_oklch(0.65_0.13_80),0_15px_25px_rgba(0,0,0,0.2)] active:shadow-[0_0px_0_oklch(0.65_0.13_80)]'} 
            hover:-translate-y-1 active:translate-y-[6px] active:shadow-[0_0px_0_rgba(0,0,0,0)]`}
        >
          {t(!isDone ? 'prolog_page.next' : 'prolog_page.play')}
        </button>
      </footer>
    </main>
  )
}