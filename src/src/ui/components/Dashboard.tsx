import { useNavigate } from 'react-router-dom'
import { LevelCard } from './LevelCard'
import { useProgress } from '../../state/progress'
import { useEffect, useRef } from 'react'
import anime from 'animejs'

const menu = [
  { level: 0, title: 'Prolog', subtitle: 'Mengenal asal-usul Aksara Jawa', icon: '📜', route: '/prolog', reward: undefined, rewardIcon: undefined },
  { level: 1, title: 'Level 1 · Pemula', subtitle: 'Misi di Pulau Sanjaya', icon: '🗡️', reward: 'pedang', rewardIcon: '🗡️' },
  { level: 2, title: 'Level 2 · Mahir', subtitle: 'Misi di Pulau Adi Jaya', icon: '🛡️', reward: 'perisai', rewardIcon: '🛡️' },
  { level: 3, title: 'Level 3 · Master', subtitle: 'Pertempuran di Kerajaan Nusantara', icon: '⚔️', reward: undefined, rewardIcon: '👑' },
] as const

export default function Dashboard() {
  const navigate = useNavigate()
  const completedLevels = useProgress((s) => s.completedLevels)
  const progress = (completedLevels.length / 3) * 100
  
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
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-10 pt-8 bg-paper">
      <header ref={headerRef} className="mb-6 flex items-center justify-between gap-4 opacity-0">
        <div>
          <h1 className="font-display text-[2rem] leading-tight text-text">Peta Pulau</h1>
          <p className="mt-1 text-[0.95rem] font-medium text-text-2">Pilih petualanganmu hari ini!</p>
        </div>
        <button
          type="button"
          aria-label="Kembali ke rumah"
          onClick={() => navigate('/')}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-border bg-white text-2xl shadow-[0_4px_0_oklch(0.86_0.025_78)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_oklch(0.86_0.025_78)] active:translate-y-1 active:shadow-[0_0px_0_oklch(0.86_0.025_78)]"
        >
          🏠
        </button>
      </header>

      <section className="mb-8 overflow-hidden rounded-[1.5rem] border-2 border-white/60 bg-white/70 p-5 shadow-card backdrop-blur-md" aria-label="Progres">
        <div className="flex items-center justify-between text-[0.95rem]">
          <span className="font-display tracking-wide text-text">Jalur Petualangan</span>
          <span className="font-bold text-accent-2">{completedLevels.length}/3 Selesai</span>
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
          level={1}
          title="Prolog"
          subtitle="Mengenal asal-usul Aksara Jawa"
          icon="📜"
          onClick={() => navigate('/prolog')}
        />
        {menu.slice(1).map((m) => (
          <LevelCard
            key={m.level}
            level={m.level}
            title={m.title}
            subtitle={m.subtitle}
            icon={m.icon}
            reward={m.reward}
            rewardIcon={m.rewardIcon}
          />
        ))}
      </nav>
    </main>
  )
}