import { useState, useRef, useEffect } from 'react'
import { LIBRARY, type AksaraType, type AksaraGlyph } from '../../data/aksara'
import { useTranslation } from 'react-i18next'

const EXAMPLES: Record<string, { jv: string, la: string, id: string, en: string, desc?: string }> = {
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

  // Sandangan (PURE: Emphasizes the sandangan)
  'wulu': { jv: 'ꦱꦶꦗꦶ', la: 'siji', id: 'satu', en: 'one', desc: 'vokal i' },
  'suku': { jv: 'ꦧꦸꦏꦸ', la: 'buku', id: 'buku', en: 'book', desc: 'vokal u' },
  'pepet': { jv: 'ꦱꦼꦒ', la: 'sega', id: 'nasi', en: 'rice', desc: 'vokal ê' },
  'taling': { jv: 'ꦭꦺꦭꦺ', la: 'lélé', id: 'ikan lele', en: 'catfish', desc: 'vokal é/è' },
  'tarung': { jv: 'ꦱꦺꦴꦠꦺꦴ', la: 'soto', id: 'soto', en: 'soto', desc: 'vokal o' },
  'cecak': { jv: 'ꦏꦕꦁ', la: 'kacang', id: 'kacang', en: 'peanut', desc: 'konsonan ng mati' },
  'layar': { jv: 'ꦥꦱꦂ', la: 'pasar', id: 'pasar', en: 'market', desc: 'konsonan r mati' },
  'wignyan': { jv: 'ꦒꦗꦃ', la: 'gajah', id: 'gajah', en: 'elephant', desc: 'konsonan h mati' },

  // Sandangan and Punctuation Extensions
  'pangkon': { jv: 'ꦧꦥꦏ꧀', la: 'bapak', id: 'bapak', en: 'father', desc: 'paten / pemati huruf' },
  'pada lingsa': { jv: 'ꦧꦸꦏꦸ꧈', la: 'buku,', id: 'buku,', en: 'book,', desc: 'tanda koma (,)' },
  'pada lungsi': { jv: 'ꦧꦸꦏꦸ꧉', la: 'buku.', id: 'buku.', en: 'book.', desc: 'tanda titik (.)' },
  'pada pangkat': { jv: '꧇꧑꧇', la: ':1:', id: ':1:', en: ':1:', desc: 'titik dua / pengapit angka' },
  'pada adeg-adeg': { jv: '꧋ꦧꦸꦏꦸ', la: 'Buku', id: 'Buku', en: 'Book', desc: 'pembuka kalimat / paragraf' },
  'cakra': { jv: 'ꦏꦿꦠꦺꦴꦤ꧀', la: 'kraton', id: 'kraton', en: 'palace', desc: 'sisipan ...ra' },
  'cakra keret': { jv: 'ꦏꦽꦠꦼꦏ꧀', la: 'kretek', id: 'kretek', en: 'bridge', desc: 'sisipan ...rê' },
  'cakra la': { jv: 'ꦏ꧀ꦭꦱ', la: 'klasa', id: 'klasa', en: 'mat', desc: 'sisipan ...la' },
  'cakra wa': { jv: 'ꦏ꧀ꦮꦶꦠꦤ꧀ꦱꦶ', la: 'kwitansi', id: 'kwitansi', en: 'receipt', desc: 'sisipan ...wa' },
  'pengkal': { jv: 'ꦏꦾꦲꦶ', la: 'kyai', id: 'kyai', en: 'cleric', desc: 'sisipan ...ya' },
  'pa ceret': { jv: 'ꦉꦧꦺꦴ', la: 'rebo', id: 'Rabu', en: 'Wednesday', desc: 'suku kata rê' },
  'nga lelet': { jv: 'ꦊꦩꦃ', la: 'lemah', id: 'tanah', en: 'soil', desc: 'suku kata lê' },

  // Rekan
  'kha': { jv: 'ꦏ꦳ꦠꦩ꧀', la: 'khatam', id: 'khatam', en: 'finished' },
  'dza': { jv: 'ꦢ꦳ꦶꦏꦶꦂ', la: 'dzikir', id: 'dzikir', en: 'dhikr' },
  'fa': { jv: 'ꦥ꦳ꦲꦩ꧀', la: 'faham', id: 'paham', en: 'understand' },
  'za': { jv: 'ꦗ꦳ꦩꦤ꧀', la: 'zaman', id: 'zaman', en: 'era' },
  'gha': { jv: 'ꦒ꦳ꦲꦶꦧ꧀', la: 'ghaib', id: 'gaib', en: 'unseen' },

  // Murda
  'na.murda': { jv: 'ꦟꦸꦃ', la: 'Nuh', id: 'Nuh', en: 'Noah' },
  'ka.murda': { jv: 'ꦑꦢꦶꦗꦃ', la: 'Khadijah', id: 'Khadijah', en: 'Khadijah' },
  'ta.murda': { jv: 'ꦡꦩꦿꦶꦤ꧀', la: 'Thamrin', id: 'Thamrin', en: 'Thamrin' },
  'sa.murda': { jv: 'ꦯꦸꦏꦸꦂ', la: 'Syukur', id: 'Syukur', en: 'Syukur' },
  'pa.murda': { jv: 'ꦦꦭꦺꦱ꧀ꦠꦶꦤ', la: 'Palestina', id: 'Palestina', en: 'Palestine' },
  'nya.murda': { jv: 'ꦘꦲꦶ', la: 'Nyai', id: 'Nyai', en: 'Nyai' },
  'ga.murda': { jv: 'ꦓꦤꦶ', la: 'Ghani', id: 'Ghani', en: 'Ghani' },

  // Swara
  'A': { jv: 'ꦄꦒꦸꦱ꧀', la: 'Agus', id: 'Agus', en: 'Agus' },
  'I': { jv: 'ꦆꦧꦿꦲꦶꦩ꧀', la: 'Ibrahim', id: 'Ibrahim', en: 'Ibrahim' },
  'U': { jv: 'ꦈꦩꦂ', la: 'Umar', id: 'Umar', en: 'Umar' },
  'E': { jv: 'ꦌꦫꦺꦴꦥ', la: 'Eropa', id: 'Eropa', en: 'Europe' },
  'O': { jv: 'ꦎꦱ꧀ꦩꦤ꧀', la: 'Osman', id: 'Osman', en: 'Osman' },

  // Angka
  '1': { jv: '꧑', la: '1', id: 'satu', en: 'one' },
  '2': { jv: '꧒', la: '2', id: 'dua', en: 'two' },
  '3': { jv: '꧓', la: '3', id: 'tiga', en: 'three' },
  '4': { jv: '꧔', la: '4', id: 'empat', en: 'four' },
  '5': { jv: '꧕', la: '5', id: 'lima', en: 'five' },
  '6': { jv: '꧖', la: '6', id: 'enam', en: 'six' },
  '7': { jv: '꧗', la: '7', id: 'tujuh', en: 'seven' },
  '8': { jv: '꧘', la: '8', id: 'delapan', en: 'eight' },
  '9': { jv: '꧙', la: '9', id: 'sembilan', en: 'nine' },
  '0': { jv: '꧐', la: '0', id: 'nol', en: 'zero' },
}

export interface TabelAksaraProps {
  isOpen: boolean
  onClose: () => void
}

export default function TabelAksara({ isOpen, onClose }: TabelAksaraProps) {
  const [activeTab, setActiveTab] = useState<AksaraType>('nglegena')
  const [selected, setSelected] = useState<AksaraGlyph | null>(null)
  const { t, i18n } = useTranslation()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Auto focus the modal itself or the first element
    setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector('button')
      if (closeBtn) closeBtn.focus()
    }, 10)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const TABS: { id: AksaraType; label: string }[] = [
    { id: 'nglegena', label: t('kamus_modal.nglegena') || 'Nglegena' },
    { id: 'sandangan', label: t('kamus_modal.sandangan') || 'Sandangan' },
    { id: 'angka', label: t('kamus_modal.angka') || 'Angka' },
    { id: 'murda', label: t('kamus_modal.murda') || 'Murda' },
    { id: 'swara', label: t('kamus_modal.swara') || 'Swara' },
    { id: 'rekan', label: t('kamus_modal.rekan') || 'Rekan' },
  ]

  const items = LIBRARY[activeTab]

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-paper/95 backdrop-blur-sm sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kamus-title"
      ref={modalRef}
    >
      <div className="flex h-full w-full flex-col bg-paper sm:h-[85vh] sm:max-w-3xl sm:rounded-3xl sm:border-2 sm:border-border sm:shadow-2xl">
        <header className="flex items-center justify-between p-6 pb-2">
          <div>
            <h1 id="kamus-title" className="font-display text-2xl text-text">{t('kamus_modal.title')}</h1>
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
                  {glyph.id.replace('.pas', '').replace('.ns', '').replace('.murda', '')}
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
            <div className="flex flex-col items-center">
              <h2 className="font-display text-2xl text-text capitalize">
                {selected.id.replace('.pas', '').replace('.ns', '').replace('.murda', '')}
              </h2>
              {(EXAMPLES[selected.id]?.desc || selected.hint) && (
                <p className="text-sm font-medium text-text-2 mt-1">
                  ({EXAMPLES[selected.id]?.desc || selected.hint})
                </p>
              )}
            </div>
            
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white w-full py-8 px-4 shadow-inner border border-border">
              <span className="text-6xl text-accent leading-tight" style={{ fontFamily: 'var(--font-javanese)' }}>
                {EXAMPLES[selected.id]?.jv || selected.unicode}
              </span>
            </div>
            
            <div className="flex flex-col gap-1 text-center bg-paper-2 px-6 py-4 rounded-xl border border-border w-full">
              <span className="font-display text-lg text-accent-deep tracking-wide">
                "{EXAMPLES[selected.id]?.la || selected.id.replace('.murda', '')}"
              </span>
              <span className="text-sm font-medium text-text-2">
                {t('kamus_modal.meaning')} {i18n.resolvedLanguage === 'en' ? (EXAMPLES[selected.id]?.en || '...') : (EXAMPLES[selected.id]?.id || '...')}
              </span>
            </div>

            <p className="text-sm font-medium text-text-2 px-2">
              {selected.type === 'nglegena' && t('kamus_modal.desc_nglegena')}
              {selected.type === 'pasangan' && t('kamus_modal.desc_pasangan')}
              {selected.type === 'sandangan' && t('kamus_modal.desc_sandangan')}
              {selected.type === 'rekan' && t('kamus_modal.desc_rekan')}
              {selected.type === 'murda' && t('kamus_modal.desc_murda')}
              {selected.type === 'swara' && t('kamus_modal.desc_swara')}
              {selected.type === 'angka' && t('kamus_modal.desc_angka')}
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
