import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from './BackButton'
import anime from 'animejs'

const slides = [
  {
    title: 'Aksara Jawa',
    icon: '📜',
    body: 'Aksara Jawa adalah sistem tulisan turunan dari aksara Brahmi yang dipakai masyarakat Jawa sejak abad ke-9.',
  },
  {
    title: 'Leluhur Hanacaraka',
    icon: '✒️',
    body: 'Huruf-hurufnya dikenal lewat cerita Ajisaka — kisah yang melahirkan urutan ha, na, ca, ra, ka.',
  },
  {
    title: 'Tiga Jenis Huruf',
    icon: '🗂️',
    body: 'Kita akan belajar Aksara Dasar (Nglegena), Sandangan penanda vokal, dan Pasangan untuk konsonan mati.',
  },
]

export default function Prolog() {
  const navigate = useNavigate()
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

  const handleNext = () => {

    if (!isDone) setI((v) => v + 1)
    else navigate('/menu')
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-10 pt-8 bg-paper">
      <header className="mb-6 flex items-center justify-between">
        <BackButton />
        <span className="rounded-full bg-paper-2 border border-border px-4 py-1.5 text-xs font-bold text-text-2 shadow-sm">
          {Math.min(i + 1, slides.length)} / {slides.length}
        </span>
      </header>

      <section 
        ref={slideRef}
        className="relative flex flex-1 flex-col items-center justify-center gap-8 overflow-hidden rounded-[2.5rem] border-[3px] border-white/80 bg-white/70 p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-6 select-none text-[8rem] leading-none text-accent/5 opacity-50"
          style={{ fontFamily: 'var(--font-javanese)' }}
        >
          ꦲ
        </span>

        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-[2rem] bg-accent/20 blur-md opacity-60" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] bg-gradient-to-br from-paper to-paper-2 text-6xl shadow-[0_6px_0_oklch(0.86_0.025_78)] border-4 border-white">
            <span className="drop-shadow-sm">{s.icon}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-display text-[2rem] leading-tight text-text">{s.title}</h2>
          <p className="max-w-[15rem] text-[1.05rem] font-medium leading-relaxed text-text-2">{s.body}</p>
        </div>
      </section>

      <footer className="mt-8 flex flex-col gap-6">
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
          {!isDone ? 'Lanjut' : 'Mulai Petualangan! ➡️'}
        </button>
      </footer>
    </main>
  )
}