import { useState } from 'react'
import { LIBRARY, type AksaraType, type AksaraGlyph } from '../../data/aksara'

const TABS: { id: AksaraType; label: string }[] = [
  { id: 'nglegena', label: 'Aksara Dasar' },
  { id: 'pasangan', label: 'Pasangan' },
  { id: 'sandangan', label: 'Sandangan' },
]

const EXAMPLES: Record<string, { jv: string, la: string, id: string }> = {
  // Nglegena
  'ha': { jv: 'ꦲꦤ', la: 'hana', id: 'ada' },
  'na': { jv: 'ꦤꦩ', la: 'nama', id: 'nama' },
  'ca': { jv: 'ꦕꦫ', la: 'cara', id: 'cara' },
  'ra': { jv: 'ꦫꦱ', la: 'rasa', id: 'rasa' },
  'ka': { jv: 'ꦏꦕ', la: 'kaca', id: 'kaca' },
  'da': { jv: 'ꦢꦢꦶ', la: 'dadi', id: 'jadi' },
  'ta': { jv: 'ꦠꦩꦸ', la: 'tamu', id: 'tamu' },
  'sa': { jv: 'ꦱꦥꦶ', la: 'sapi', id: 'sapi' },
  'wa': { jv: 'ꦮꦭꦶ', la: 'wali', id: 'wali' },
  'la': { jv: 'ꦭꦭꦶ', la: 'lali', id: 'lupa' },
  'pa': { jv: 'ꦥꦢ', la: 'pada', id: 'sama' },
  'dha': { jv: 'ꦝꦝ', la: 'dhadha', id: 'dada' },
  'ja': { jv: 'ꦗꦒꦺꦴ', la: 'jago', id: 'jago' },
  'ya': { jv: 'ꦪꦺꦤ꧀', la: 'yèn', id: 'jika' },
  'nya': { jv: 'ꦚꦚꦶ', la: 'nyanyi', id: 'nyanyi' },
  'ma': { jv: 'ꦩꦠ', la: 'mata', id: 'mata' },
  'ga': { jv: 'ꦒꦗꦃ', la: 'gajah', id: 'gajah' },
  'ba': { jv: 'ꦧꦥꦏ꧀', la: 'bapak', id: 'bapak' },
  'tha': { jv: 'ꦛꦸꦛꦸꦏ꧀', la: 'thuthuk', id: 'pukul' },
  'nga': { jv: 'ꦔꦼꦭꦸ', la: 'ngelu', id: 'pusing' },

  // Pasangan (all use "anak [kata]" -> ꦲꦤꦏ꧀ + pasangan)
  'ha.pas': { jv: 'ꦲꦤꦏ꧀ꦲꦪꦸ', la: 'anak hayu', id: 'anak cantik' },
  'na.pas': { jv: 'ꦲꦤꦏ꧀ꦤꦏꦭ꧀', la: 'anak nakal', id: 'anak nakal' },
  'ca.pas': { jv: 'ꦲꦤꦏ꧀ꦕꦕꦶꦁ', la: 'anak cacing', id: 'anak cacing' },
  'ra.pas': { jv: 'ꦲꦤꦏ꧀ꦫꦗ', la: 'anak raja', id: 'anak raja' },
  'ka.pas': { jv: 'ꦲꦤꦏ꧀ꦏꦸ', la: 'anakku', id: 'anakku' },
  'da.pas': { jv: 'ꦲꦤꦏ꧀ꦢꦺꦱ', la: 'anak désa', id: 'anak desa' },
  'ta.pas': { jv: 'ꦲꦤꦏ꧀ꦠꦩꦸ', la: 'anak tamu', id: 'anak tamu' },
  'sa.pas': { jv: 'ꦲꦤꦏ꧀ꦱꦥꦶ', la: 'anak sapi', id: 'anak sapi' },
  'wa.pas': { jv: 'ꦲꦤꦏ꧀ꦮꦭꦶ', la: 'anak wali', id: 'anak wali' },
  'la.pas': { jv: 'ꦲꦤꦏ꧀ꦭꦭꦶ', la: 'anak lali', id: 'anak lupa' },
  'pa.pas': { jv: 'ꦲꦤꦏ꧀ꦥꦶꦤ꧀ꦠꦼꦂ', la: 'anak pinter', id: 'anak pintar' },
  'dha.pas': { jv: 'ꦲꦤꦏ꧀ꦝꦺꦴꦏ꧀ꦠꦼꦂ', la: 'anak dhokter', id: 'anak dokter' },
  'ja.pas': { jv: 'ꦲꦤꦏ꧀ꦗꦫꦤ꧀', la: 'anak jaran', id: 'anak kuda' },
  'ya.pas': { jv: 'ꦲꦤꦏ꧀ꦪꦸꦪꦸ', la: 'anak yuyu', id: 'anak kepiting' },
  'nya.pas': { jv: 'ꦲꦤꦏ꧀ꦚꦩꦸꦏ꧀', la: 'anak nyamuk', id: 'anak nyamuk' },
  'ma.pas': { jv: 'ꦲꦤꦏ꧀ꦩꦤꦸꦏ꧀', la: 'anak manuk', id: 'anak burung' },
  'ga.pas': { jv: 'ꦲꦤꦏ꧀ꦒꦗꦃ', la: 'anak gajah', id: 'anak gajah' },
  'ba.pas': { jv: 'ꦲꦤꦏ꧀ꦧꦥꦏ꧀', la: 'anak bapak', id: 'anak bapak' },
  'tha.pas': { jv: 'ꦲꦤꦏ꧀ꦛꦸꦛꦸꦏ꧀', la: 'anak thuthuk', id: 'anak pukul' },
  'nga.pas': { jv: 'ꦲꦤꦏ꧀ꦔꦼꦭꦸ', la: 'anak ngelu', id: 'anak pusing' },

  // Sandangan
  'wulu': { jv: 'ꦱꦶꦗꦶ', la: 'siji', id: 'satu' },
  'suku': { jv: 'ꦧꦸꦏꦸ', la: 'buku', id: 'buku' },
  'pepet': { jv: 'ꦱꦼꦒ', la: 'sega', id: 'nasi' },
  'taling': { jv: 'ꦭꦺꦭꦺ', la: 'lélé', id: 'ikan lele' },
  'tarung': { jv: 'ꦱꦺꦴꦠꦺꦴ', la: 'soto', id: 'soto' },
  'cecak': { jv: 'ꦏꦸꦕꦶꦁ', la: 'kucing', id: 'kucing' },
  'layar': { jv: 'ꦥꦱꦂ', la: 'pasar', id: 'pasar' },
  'wignyan': { jv: 'ꦒꦗꦃ', la: 'gajah', id: 'gajah' }
}

export interface TabelAksaraProps {
  isOpen: boolean
  onClose: () => void
}

export default function TabelAksara({ isOpen, onClose }: TabelAksaraProps) {
  const [activeTab, setActiveTab] = useState<AksaraType>('nglegena')
  const [selected, setSelected] = useState<AksaraGlyph | null>(null)

  if (!isOpen) return null

  const items = LIBRARY[activeTab]

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
            
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white w-full py-8 px-4 shadow-inner border border-border">
              <span className="text-6xl text-accent leading-tight" style={{ fontFamily: 'var(--font-javanese)' }}>
                {EXAMPLES[selected.id]?.jv || selected.unicode}
              </span>
            </div>
            
            <div className="flex flex-col gap-1 text-center bg-paper-2 px-6 py-4 rounded-xl border border-border w-full">
              <span className="font-display text-lg text-accent-deep tracking-wide">
                "{EXAMPLES[selected.id]?.la || selected.id}"
              </span>
              <span className="text-sm font-medium text-text-2">
                Arti: {EXAMPLES[selected.id]?.id || '...'}
              </span>
            </div>

            <p className="text-sm font-medium text-text-2 px-2">
              {selected.type === 'nglegena' && 'Penggunaan aksara dalam kata.'}
              {selected.type === 'pasangan' && 'Pasangan menyambung suku kata mati (contoh: "anak...").'}
              {selected.type === 'sandangan' && 'Sandangan memberikan bunyi vokal atau akhiran pada aksara dasar.'}
            </p>
            
            <button
              onClick={() => setSelected(null)}
              className="mt-2 w-full rounded-2xl bg-accent px-6 py-4 font-bold text-white shadow-md active:scale-95 transition-transform"
            >
              Tutup Contoh
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
