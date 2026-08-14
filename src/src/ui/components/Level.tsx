import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from './BackButton'
import { Button } from './Button'

const levelMeta: Record<string, { title: string; desc: string; icon: string }> = {
  '1': {
    title: 'Level 1 · Pulau Sanjaya',
    icon: '🗡️',
    desc: 'Buka segel dan ambil Pedang Pusaka dengan menulis Aksara Dasar (Nglegena). Dora akan bergabung bersamamu!',
  },
  '2': {
    title: 'Level 2 · Pulau Adi Jaya',
    icon: '🛡️',
    desc: 'Jawab 11 soal menulis Aksara Sandangan untuk mendapat Perisai Sakti. Seorang warga lokal siap menemanimu!',
  },
  '3': {
    title: 'Level 3 · Kerajaan Nusantara',
    icon: '⚔️',
    desc: 'Hadapi Dua Utusan lalu kalahkan Raksasa Hijau dalam ujian menulis terakhir. Taklukkan dan bebaskan kerajaan!',
  },
}

export default function Level() {
  const { id } = useParams<'id'>()
  const navigate = useNavigate()
  const meta = levelMeta[id ?? ''] ?? levelMeta['1']

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 pb-8 pt-6">
      <header className="mb-6">
        <BackButton />
      </header>

      <section className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-8 text-center shadow-card backdrop-blur-sm">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-6 select-none text-[6rem] leading-none text-accent/10"
          style={{ fontFamily: 'var(--font-javanese)' }}
        >
          ꦲ
        </span>

        <div className="flex h-28 w-28 items-center justify-center rounded-[1.75rem] bg-gradient-to-b from-paper-2 to-paper-3 text-6xl shadow-sm">
          {meta.icon}
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-deep">
            Misi
          </span>
          <h2 className="font-display text-2xl text-text">{meta.title}</h2>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-text-2">{meta.desc}</p>
        </div>
      </section>

      <footer className="mt-6 flex flex-col gap-3">
        <Button className="w-full" onClick={() => navigate(`/level/${id}/practice`)}>
          Mulai Misi
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => navigate('/menu')}>
          Kembali ke Menu
        </Button>
      </footer>
    </main>
  )
}