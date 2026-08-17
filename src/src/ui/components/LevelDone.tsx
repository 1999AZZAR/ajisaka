import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { useTranslation } from 'react-i18next'
import { fireConfetti } from '../../engine/confetti'

const rewardMeta = {
  '1': {
    icon: '🗡️',
    nameKey: 'level_done.reward1_name',
    textKey: 'level_done.reward1_text',
  },
  '2': {
    icon: '🛡️',
    nameKey: 'level_done.reward2_name',
    textKey: 'level_done.reward2_text',
  },
  '3': {
    icon: '👑',
    nameKey: 'level_done.reward3_name',
    textKey: 'level_done.reward3_text',
  },
} as const

export default function LevelDone() {
  const { level } = useParams<'level'>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const m = rewardMeta[(level ?? '1') as keyof typeof rewardMeta] ?? rewardMeta['1']
  const next = Number(level) + 1
  const isLast = Number(level) >= 3

  const iconRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('../../engine/audio').then(m => m.playLevelDone())
    
    // Huge popping animation for the reward icon
    if (iconRef.current) {
      fireConfetti()
      anime({
        targets: iconRef.current,
        scale: [0, 1.2, 1],
        rotate: ['-15deg', '15deg', '0deg'],
        opacity: [0, 1],
        easing: 'easeOutElastic(1, .8)',
        duration: 1500,
        delay: 200,
      })
    }

    // Slide up text content
    if (contentRef.current) {
      anime({
        targets: contentRef.current.children,
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, { start: 400 }),
        easing: 'easeOutElastic(1, .8)',
        duration: 1000,
      })
    }
  }, [level])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        navigate(isLast ? '/menu' : `/level/${next}`)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate, isLast, next])

  return (
    <main className="mx-auto flex h-full overflow-hidden w-full max-w-3xl flex-col px-6 pb-10 pt-10 bg-gradient-to-b from-paper to-white">
      <section className="relative flex flex-1 min-h-0 flex-col items-center justify-center overflow-y-auto rounded-[2.5rem] border-[3px] border-white/80 bg-white/70 p-8 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        
        {/* Majestic background sunburst */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
           <div className="absolute left-1/2 top-1/2 -ml-[100%] -mt-[100%] h-[200%] w-[200%] animate-spin-slow" style={{ animationDuration: '30s' }}>
              <div className="h-full w-full opacity-15" style={{ background: 'repeating-conic-gradient(var(--color-accent) 0 10deg, transparent 10deg 20deg)' }} />
           </div>
           {/* Center glow to blend the rays */}
           <div className="absolute left-1/2 top-1/2 -ml-[50%] -mt-[50%] h-[100%] w-[100%] rounded-full bg-white/60 blur-[40px]" />
        </div>

        <div className="relative z-10 my-auto">
          <span className="inline-block rounded-full bg-accent-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_3px_0_oklch(0.65_0.13_80)] mb-6">
            {t('level_done.success_label')}
          </span>

          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-accent-2/40 opacity-75 blur-md" />
              <div ref={iconRef} className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-accent-2 to-[oklch(0.65_0.13_80)] text-8xl shadow-[0_8px_0_oklch(0.65_0.13_80)] border-4 border-white opacity-0 transform-gpu">
                <span className="drop-shadow-lg">{m.icon}</span>
              </div>
            </div>
            
            <div ref={contentRef} className="flex flex-col items-center gap-3">
              <h1 className="font-display text-[2.2rem] leading-tight text-text drop-shadow-sm opacity-0 transform-gpu">{t(m.nameKey)}</h1>
              <p className="max-w-[16rem] text-[1rem] font-medium leading-relaxed text-text-2 opacity-0 transform-gpu">{t(m.textKey)}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="shrink-0 mt-8 flex flex-col gap-4">
        {!isLast && (
          <button 
            autoFocus
            onClick={() => navigate(`/level/${next}`)}
            className="w-full rounded-[1.5rem] bg-gradient-to-b from-accent to-[oklch(0.50_0.14_25)] px-8 py-4 font-display text-xl tracking-wide text-white shadow-[0_6px_0_oklch(0.40_0.14_25),0_10px_20px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_0_oklch(0.40_0.14_25),0_15px_25px_rgba(0,0,0,0.2)] active:translate-y-[6px] active:shadow-[0_0px_0_oklch(0.40_0.14_25),0_0px_0_rgba(0,0,0,0)]"
          >
            {t('level_done.next')}
          </button>
        )}
        <button 
          autoFocus={isLast}
          onClick={() => navigate('/menu')}
          className="w-full rounded-[1.5rem] bg-white border-2 border-border px-8 py-4 font-display text-xl tracking-wide text-text shadow-[0_6px_0_oklch(0.86_0.025_78)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_0_oklch(0.86_0.025_78)] active:translate-y-[6px] active:shadow-[0_0px_0_oklch(0.86_0.025_78)]"
        >
          {t('level_done.back')}
        </button>
      </footer>
    </main>
  )
}