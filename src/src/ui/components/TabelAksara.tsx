import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LIBRARY, type AksaraType } from '../../data/aksara'

const TABS: { id: AksaraType; label: string }[] = [
  { id: 'nglegena', label: 'Aksara Dasar' },
  { id: 'pasangan', label: 'Pasangan' },
  { id: 'sandangan', label: 'Sandangan' },
]

export default function TabelAksara() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AksaraType>('nglegena')

  const items = LIBRARY[activeTab]

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-paper px-6 pb-10 pt-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] leading-tight text-text">Kamus Aksara</h1>
          <p className="mt-1 text-[0.95rem] font-medium text-text-2">Tabel referensi Javanese Script</p>
        </div>
        <button
          type="button"
          aria-label="Kembali"
          onClick={() => navigate(-1)}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-border bg-white text-2xl shadow-[0_4px_0_oklch(0.86_0.025_78)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_oklch(0.86_0.025_78)] active:translate-y-1 active:shadow-[0_0px_0_oklch(0.86_0.025_78)]"
        >
          🔙
        </button>
      </header>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              activeTab === tab.id
                ? 'bg-accent text-white shadow-md'
                : 'bg-paper-2 text-text-2 hover:bg-paper-3'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((glyph) => (
          <div
            key={glyph.id}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-border bg-white p-4 shadow-sm"
          >
            <span
              className="text-6xl text-accent drop-shadow-sm"
              style={{ fontFamily: 'var(--font-javanese)' }}
            >
              {glyph.unicode}
            </span>
            <div className="text-center">
              <span className="block font-display text-lg text-text capitalize">
                {glyph.id.replace('.pas', '').replace('.ns', '')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
