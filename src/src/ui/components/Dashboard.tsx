import { Link, useNavigate } from 'react-router-dom'
import { LevelCard } from './LevelCard'
import { useProgress } from '../../state/progress'
import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import TabelAksara from './TabelAksara'
import { useTranslation } from 'react-i18next'

const menu = [
  { level: 0, titleKey: 'dashboard.prolog', subtitleKey: 'dashboard.prolog_desc', icon: '📜', route: '/prolog', reward: undefined, rewardIcon: undefined },
  { level: 1, titleKey: 'dashboard.level1_title', subtitleKey: 'dashboard.level1_desc', icon: '🗡️', reward: 'pedang', rewardIcon: '🗡️' },
  { level: 2, titleKey: 'dashboard.level2_title', subtitleKey: 'dashboard.level2_desc', icon: '🛡️', reward: 'perisai', rewardIcon: '🛡️' },
  { level: 3, titleKey: 'dashboard.level3_title', subtitleKey: 'dashboard.level3_desc', icon: '⚔️', reward: undefined, rewardIcon: '👑' },
] as const

export default function Dashboard() {
  const navigate = useNavigate()
  const completedLevels = useProgress((s) => s.completedLevels)
  const isLevelUnlocked = useProgress((s) => s.isLevelUnlocked)
  const progress = (completedLevels.length / 3) * 100
  const [showTabel, setShowTabel] = useState(false)
  const { t } = useTranslation()
  
  const headerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Playful stagger entrance for level cards
    if (navRef.current) {
      anime({
        targets: navRef.current.children,
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutElastic(1, .8)',
        duration: 1000,
      })
    }
    
    // Header fade down
    if (headerRef.current) {
      anime({
        targets: headerRef.current,
        translateY: [-20, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 600,
      })
    }

    // Animate progress bar width
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ['0%', `${progress}%`],
        easing: 'easeInOutExpo',
        duration: 1200,
        delay: 500
      })
    }
  }, [progress])

  return (
    <>
      <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-6 pb-10 pt-8 bg-paper">
        <header ref={headerRef} className="mb-6 flex items-center justify-between gap-4 opacity-0">
          <div>
            <h1 className="font-display text-[2rem] leading-tight text-text">{t('dashboard.title')}</h1>
            <p className="mt-1 text-[0.95rem] font-medium text-text-2">{t('dashboard.subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={t('dashboard.kamus')}
              onClick={() => setShowTabel(true)}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-border bg-white text-2xl shadow-[0_4px_0_oklch(0.86_0.025_78)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_oklch(0.86_0.025_78)] active:translate-y-1 active:shadow-[0_0px_0_oklch(0.86_0.025_78)]"
            >
              📖
            </button>
            <Link
              to="/settings"
              aria-label={t('app.settings')}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-border bg-white text-2xl shadow-[0_4px_0_oklch(0.86_0.025_78)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_oklch(0.86_0.025_78)] active:translate-y-1 active:shadow-[0_0px_0_oklch(0.86_0.025_78)]"
            >
              ⚙️
            </Link>
            <button
              type="button"
              aria-label={t('app.home')}
              onClick={() => navigate('/')}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-border bg-white text-2xl shadow-[0_4px_0_oklch(0.86_0.025_78)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_oklch(0.86_0.025_78)] active:translate-y-1 active:shadow-[0_0px_0_oklch(0.86_0.025_78)]"
            >
              🏠
            </button>
          </div>
        </header>

        <section className="mb-8 overflow-hidden rounded-[1.5rem] border-2 border-white/60 bg-white/70 p-5 shadow-card backdrop-blur-md" aria-label="Progres">
          <div className="flex items-center justify-between text-[0.95rem]">
            <span className="font-display tracking-wide text-text">{t('dashboard.progress_title')}</span>
            <span className="font-bold text-accent-2">{t('dashboard.progress_complete', { count: completedLevels.length })}</span>
          </div>
          
          {/* Playful chunky progress bar */}
          <div className="relative mt-4 h-5 overflow-hidden rounded-full bg-paper-3 shadow-inner border border-black/5">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-accent to-[oklch(0.50_0.14_25)]"
              style={{ width: '0%' }}
            >
              {/* Candy stripes overlay for fun factor */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 20px)' }} />
            </div>
          </div>
        </section>

        <nav ref={navRef} className="flex flex-1 flex-col gap-4" aria-label="Menu utama">
          <LevelCard
            level={0}
            title={t('dashboard.prolog')}
            subtitle={t('dashboard.prolog_desc')}
            icon="📜"
            onClick={() => navigate('/prolog')}
          />

          <div className="mb-2">
            <LevelCard
              level={0}
              title={t('dashboard.kamus')}
              subtitle={t('dashboard.kamus_desc')}
              icon="📖"
              onClick={() => setShowTabel(true)}
            />
          </div>

          {menu.slice(1).map((m) => (
            <LevelCard
              key={m.level}
              level={m.level}
              title={t(m.titleKey)}
              subtitle={t(m.subtitleKey)}
              icon={m.icon}
              reward={m.reward}
              rewardIcon={m.rewardIcon}
            />
          ))}
        </nav>
      </main>

      <TabelAksara isOpen={showTabel} onClose={() => setShowTabel(false)} />
    </>
  )
}