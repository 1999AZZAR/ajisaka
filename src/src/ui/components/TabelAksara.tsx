import { useState } from 'react'
import { LIBRARY, type AksaraType, type AksaraGlyph } from '../../data/aksara'

const TABS: { id: AksaraType; label: string }[] = [
  { id: 'nglegena', label: 'Aksara Dasar' },
  { id: 'pasangan', label: 'Pasangan' },
  { id: 'sandangan', label: 'Sandangan' },
]

export interface TabelAksaraProps {
  isOpen: boolean
  onClose: () => void
}

export default function TabelAksara({ isOpen, onClose }: TabelAksaraProps) {
  const [activeTab, setActiveTab] = useState<AksaraType>('nglegena')
  const [selected, setSelected] = useState<AksaraGlyph | null>(null)

  if (!isOpen) return null

  const items = LIBRARY[activeTab]

  const getExample = (glyph: AksaraGlyph) => {
    if (glyph.type === 'nglegena') return glyph.unicode
    const base = '\uA98F' // 'ka' as base
    if (glyph.type === 'pasangan') return base + glyph.unicode.replace('\u25CC', '')
    if (glyph.type === 'sandangan') return base + glyph.unicode.replace('\u25CC', '')
    return glyph.unicode
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper/95 backdrop-blur-sm sm:items-center sm:justify-center">
      <div className="flex h-full w-full flex-col bg-paper sm:h-[85vh] sm:max-w-md sm:rounded-3xl sm:border-2 sm:border-border sm:shadow-2xl">
        <header className="flex items-center justify-between p-6 pb-2">
          <div>
            <h1 className="font-display text-2xl text-text">Kamus Aksara</h1>
            <p className="text-sm font-medium text-text-2">Tabel referensi Javanese Script</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-border bg-white text-xl shadow-sm transition-all hover:bg-paper-2 active:scale-95"
          >
            ❌
          </button>
        </header>

        <div className="flex gap-2 overflow-x-auto px-6 py-4 scrollbar-hide shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSelected(null)
              }}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-paper-2 text-text-2 hover:bg-paper-3'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {items.map((glyph) => (
              <button
                key={glyph.id}
                onClick={() => setSelected(glyph)}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-border bg-white p-4 shadow-sm transition-transform hover:bg-paper-2 active:scale-95"
              >
                <span className="text-5xl text-accent" style={{ fontFamily: 'var(--font-javanese)' }}>
                  {glyph.unicode}
                </span>
                <span className="font-display text-base text-text capitalize">
                  {glyph.id.replace('.pas', '').replace('.ns', '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Example Modal popup within the modal */}
      {selected && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-[2rem] border-4 border-white bg-paper p-8 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-display text-2xl text-text capitalize">
              {selected.id.replace('.pas', '').replace('.ns', '')}
            </h2>
            <div className="flex items-center justify-center rounded-2xl bg-white p-6 shadow-inner min-w-40 border border-border">
              <span className="text-7xl text-accent" style={{ fontFamily: 'var(--font-javanese)' }}>
                {getExample(selected)}
              </span>
            </div>
            <p className="text-sm font-medium text-text-2">
              {selected.type === 'nglegena' && 'Bentuk aksara dasar.'}
              {selected.type === 'pasangan' && 'Contoh pasangan dirangkai dengan aksara "ka" (ꦏ).'}
              {selected.type === 'sandangan' && 'Contoh sandangan dirangkai dengan aksara "ka" (ꦏ).'}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full rounded-2xl bg-accent px-6 py-4 font-bold text-white shadow-md active:scale-95 transition-transform"
            >
              Tutup Contoh
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
