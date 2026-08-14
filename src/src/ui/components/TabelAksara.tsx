import { useState } from 'react'
import { LIBRARY, type AksaraType, type AksaraGlyph } from '../../data/aksara'
import { useTranslation } from 'react-i18next'

const EXAMPLES: Record<string, { jv: string, la: string, id: string, en: string }> = {
  // Nglegena (PURE: Only characters with inherent 'a' vowel, no sandangan, no pasangan, no pangkon)
  'ha': { jv: 'ꦲꦤ', la: 'hana', id: 'ada', en: 'there is' },
  'na': { jv: 'ꦤꦩ', la: 'nama', id: 'nama', en: 'name' },
  'ca': { jv: 'ꦕꦫ', la: 'cara', id: 'cara', en: 'way/method' },
  'ra': { jv: 'ꦫꦱ', la: 'rasa', id: 'rasa', en: 'feeling' },
  'ka': { jv: 'ꦏꦕ', la: 'kaca', id: 'kaca', en: 'glass/mirror' },
  'da': { jv: 'ꦢꦮ', la: 'dawa', id: 'panjang', en: 'long' },
  'ta': { jv: 'ꦠꦠ', la: 'tata', id: 'atur', en: 'arrange' },
  'sa': { jv: 'ꦱꦥ', la: 'sapa', id: 'siapa', en: 'who' },
  'wa': { jv: 'ꦮꦕ', la: 'waca', id: 'baca', en: 'read' },
  'la': { jv: 'ꦭꦮ', la: 'lawa', id: 'kelelawar', en: 'bat' },
  'pa': { jv: 'ꦥꦝ', la: 'padha', id: 'sama', en: 'same' },
  'dha': { jv: 'ꦝꦝ', la: 'dhadha', id: 'dada', en: 'chest' },
  'ja': { jv: 'ꦗꦒ', la: 'jaga', id: 'jaga', en: 'guard' },
  'ya': { jv: 'ꦧꦪ', la: 'baya', id: 'buaya', en: 'crocodile' },
  'nya': { jv: 'ꦚꦥ', la: 'nyapa', id: 'menyapa', en: 'greet' },
  'ma': { jv: 'ꦩꦕ', la: 'maca', id: 'membaca', en: 'reading' },
  'ga': { jv: 'ꦤꦒ', la: 'naga', id: 'naga', en: 'dragon' },
  'ba': { jv: 'ꦧꦭ', la: 'bala', id: 'pasukan', en: 'troops' },
  'tha': { jv: 'ꦧꦛꦫ', la: 'bathara', id: 'dewa', en: 'god' },
  'nga': { jv: 'ꦔꦔ', la: 'nganga', id: 'menganga', en: 'agape' },

  // Pasangan (PURE: Uses "mangan [kata]" (ꦩꦔꦤ꧀...) or "anak [kata]" (ꦲꦤꦏ꧀...) without any sandangan at all)
  'ha.pas': { jv: 'ꦩꦔꦤ꧀ꦲꦥ', la: 'mangan apa', id: 'makan apa', en: 'eat what' },
  'na.pas': { jv: 'ꦲꦤꦏ꧀ꦤꦒ', la: 'anak naga', id: 'anak naga', en: 'dragon child' },
  'ca.pas': { jv: 'ꦲꦤꦏ꧀ꦕꦫ', la: 'anak cara', id: 'anak cara', en: 'child method' },
  'ra.pas': { jv: 'ꦲꦤꦏ꧀ꦫꦗ', la: 'anak raja', id: 'anak raja', en: 'royal child' },
  'ka.pas': { jv: 'ꦲꦤꦏ꧀ꦏꦕ', la: 'anak kaca', id: 'anak kaca', en: 'mirror child' },
  'da.pas': { jv: 'ꦲꦤꦏ꧀ꦢꦮ', la: 'anak dawa', id: 'anak panjang', en: 'tall child' },
  'ta.pas': { jv: 'ꦲꦤꦏ꧀ꦠꦠ', la: 'anak tata', id: 'anak tata', en: 'polite child' },
  'sa.pas': { jv: 'ꦲꦤꦏ꧀ꦱꦥ', la: 'anak sapa', id: 'anak siapa', en: 'whose child' },
  'wa.pas': { jv: 'ꦲꦤꦏ꧀ꦮꦕ', la: 'anak waca', id: 'anak baca', en: 'child reads' },
  'la.pas': { jv: 'ꦲꦤꦏ꧀ꦭꦮ', la: 'anak lawa', id: 'anak kelelawar', en: 'bat child' },
  'pa.pas': { jv: 'ꦲꦤꦏ꧀ꦥꦝ', la: 'anak padha', id: 'anak sama', en: 'same child' },
  'dha.pas': { jv: 'ꦲꦤꦏ꧀ꦝꦝ', la: 'anak dhadha', id: 'anak dada', en: 'chest child' },
  'ja.pas': { jv: 'ꦲꦤꦏ꧀ꦗꦒ', la: 'anak jaga', id: 'anak jaga', en: 'guard child' },
  'ya.pas': { jv: 'ꦲꦤꦏ꧀ꦪꦪ', la: 'anak yaya', id: 'anak yaya', en: 'yaya child' },
  'nya.pas': { jv: 'ꦲꦤꦏ꧀ꦚꦥ', la: 'anak nyapa', id: 'anak sapa', en: 'greeting child' },
  'ma.pas': { jv: 'ꦲꦤꦏ꧀ꦩꦕ', la: 'anak maca', id: 'anak baca', en: 'reading child' },
  'ga.pas': { jv: 'ꦲꦤꦏ꧀ꦒꦒ', la: 'anak gaga', id: 'anak gaga', en: 'gaga child' },
  'ba.pas': { jv: 'ꦲꦤꦏ꧀ꦧꦭ', la: 'anak bala', id: 'anak pasukan', en: 'troop child' },
  'tha.pas': { jv: 'ꦲꦤꦏ꧀ꦛꦛ', la: 'anak thatha', id: 'anak thatha', en: 'thatha child' },
  'nga.pas': { jv: 'ꦲꦤꦏ꧀ꦔꦔ', la: 'anak nganga', id: 'anak menganga', en: 'agape child' },

  // Sandangan (PURE: Emphasizes the sandangan)
  'wulu': { jv: 'ꦱꦶꦗꦶ', la: 'siji', id: 'satu', en: 'one' },
  'suku': { jv: 'ꦧꦸꦏꦸ', la: 'buku', id: 'buku', en: 'book' },
  'pepet': { jv: 'ꦱꦼꦒ', la: 'sega', id: 'nasi', en: 'rice' },
  'taling': { jv: 'ꦭꦺꦭꦺ', la: 'lélé', id: 'ikan lele', en: 'catfish' },
  'tarung': { jv: 'ꦱꦺꦴꦠꦺꦴ', la: 'soto', id: 'soto', en: 'soto' },
  'cecak': { jv: 'ꦏꦕꦁ', la: 'kacang', id: 'kacang', en: 'peanut' },
  'layar': { jv: 'ꦥꦱꦂ', la: 'pasar', id: 'pasar', en: 'market' },
  'wignyan': { jv: 'ꦒꦗꦃ', la: 'gajah', id: 'gajah', en: 'elephant' }
}

export interface TabelAksaraProps {
  isOpen: boolean
  onClose: () => void
}

export default function TabelAksara({ isOpen, onClose }: TabelAksaraProps) {
  const [activeTab, setActiveTab] = useState<AksaraType>('nglegena')
  const [selected, setSelected] = useState<AksaraGlyph | null>(null)
  const { t, i18n } = useTranslation()

  if (!isOpen) return null

  const TABS: { id: AksaraType; label: string }[] = [
    { id: 'nglegena', label: t('kamus_modal.nglegena') },
    { id: 'pasangan', label: t('kamus_modal.pasangan') },
    { id: 'sandangan', label: t('kamus_modal.sandangan') },
  ]

  const items = LIBRARY[activeTab]

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper/95 backdrop-blur-sm sm:items-center sm:justify-center">
      <div className="flex h-full w-full flex-col bg-paper sm:h-[85vh] sm:max-w-3xl sm:rounded-3xl sm:border-2 sm:border-border sm:shadow-2xl">
        <header className="flex items-center justify-between p-6 pb-2">
          <div>
            <h1 className="font-display text-2xl text-text">{t('kamus_modal.title')}</h1>
          </div>
          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-border bg-white text-xl shadow-sm transition-all hover:bg-paper-2 active:scale-95"
            aria-label={t('kamus_modal.close')}
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
                {t('kamus_modal.meaning')} {i18n.resolvedLanguage === 'id' ? (EXAMPLES[selected.id]?.id || '...') : (EXAMPLES[selected.id]?.en || '...')}
              </span>
            </div>

            <p className="text-sm font-medium text-text-2 px-2">
              {selected.type === 'nglegena' && t('kamus_modal.desc_nglegena')}
              {selected.type === 'pasangan' && t('kamus_modal.desc_pasangan')}
              {selected.type === 'sandangan' && t('kamus_modal.desc_sandangan')}
            </p>
            
            <button
              onClick={() => setSelected(null)}
              className="mt-2 w-full rounded-2xl bg-accent px-6 py-4 font-bold text-white shadow-md active:scale-95 transition-transform"
            >
              {t('kamus_modal.close_example')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
