import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BackButton } from './BackButton'
import { playClick } from '../../engine/audio'

const KEYBOARD = [
  { id: 'ha', label: 'ha', char: 'ꦲ' },
  { id: 'na', label: 'na', char: 'ꦤ' },
  { id: 'ca', label: 'ca', char: 'ꦕ' },
  { id: 'ra', label: 'ra', char: 'ꦫ' },
  { id: 'ka', label: 'ka', char: 'ꦏ' },
  { id: 'da', label: 'da', char: 'ꦢ' },
  { id: 'ta', label: 'ta', char: 'ꦠ' },
  { id: 'sa', label: 'sa', char: 'ꦱ' },
  { id: 'wa', label: 'wa', char: 'ꦮ' },
  { id: 'la', label: 'la', char: 'ꦭ' },
  { id: 'pa', label: 'pa', char: 'ꦥ' },
  { id: 'dha', label: 'dha', char: 'ꦝ' },
  { id: 'ja', label: 'ja', char: 'ꦗ' },
  { id: 'ya', label: 'ya', char: 'ꦪ' },
  { id: 'nya', label: 'nya', char: 'ꦚ' },
  { id: 'ma', label: 'ma', char: 'ꦩ' },
  { id: 'ga', label: 'ga', char: 'ꦒ' },
  { id: 'ba', label: 'ba', char: 'ꦧ' },
  { id: 'tha', label: 'tha', char: 'ꦛ' },
  { id: 'nga', label: 'nga', char: 'ꦔ' },
  // Sandangan & Pasangan
  { id: 'wulu', label: '+i', char: 'ꦶ' },
  { id: 'suku', label: '+u', char: 'ꦸ' },
  { id: 'pepet', label: '+e', char: 'ꦼ' },
  { id: 'taling', label: '+è', char: 'ꦺ' },
  { id: 'tarung', label: '+o', char: 'ꦺꦴ' },
  { id: 'cecak', label: '+ng', char: 'ꦁ' },
  { id: 'layar', label: '+r', char: 'ꦂ' },
  { id: 'pangkon', label: 'mati', char: '꧀' }
]

const NgleGenaToLatin: Record<string, string> = {
  'ꦲ': 'ha', 'ꦤ': 'na', 'ꦕ': 'ca', 'ꦫ': 'ra', 'ꦏ': 'ka',
  'ꦢ': 'da', 'ꦠ': 'ta', 'ꦱ': 'sa', 'ꦮ': 'wa', 'ꦭ': 'la',
  'ꦥ': 'pa', 'ꦝ': 'dha', 'ꦗ': 'ja', 'ꦪ': 'ya', 'ꦚ': 'nya',
  'ꦩ': 'ma', 'ꦒ': 'ga', 'ꦧ': 'ba', 'ꦛ': 'tha', 'ꦔ': 'nga'
};

function transliterate(chars: string[]): string {
  let result = '';
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (NgleGenaToLatin[c]) {
      result += NgleGenaToLatin[c];
    } else if (c === 'ꦶ') { // wulu
      if (result.endsWith('a')) result = result.slice(0, -1) + 'i';
    } else if (c === 'ꦸ') { // suku
      if (result.endsWith('a')) result = result.slice(0, -1) + 'u';
    } else if (c === 'ꦼ') { // pepet
      if (result.endsWith('a')) result = result.slice(0, -1) + 'e';
    } else if (c === 'ꦺ') { // taling
      if (result.endsWith('a')) result = result.slice(0, -1) + 'è';
    } else if (c === 'ꦺꦴ') { // taling tarung
      if (result.endsWith('a')) result = result.slice(0, -1) + 'o';
    } else if (c === 'ꦁ') { // cecak
      result += 'ng';
    } else if (c === 'ꦂ') { // layar
      result += 'r';
    } else if (c === '꧀') { // pangkon
      if (result.endsWith('a')) result = result.slice(0, -1);
    } else if (c === 'SPACE') {
      result += ' ';
    }
  }
  return result;
}

export default function FreeType() {
  const [input, setInput] = useState<string[]>([])
  const { t } = useTranslation()

  const handleKeyPress = (char: string) => {
    playClick()
    setInput(prev => [...prev, char])
  }

  const handleBackspace = () => {
    playClick()
    setInput(prev => prev.slice(0, -1))
  }

  const handleSpace = () => {
    playClick()
    setInput(prev => [...prev, 'SPACE'])
  }

  const renderedJavanese = input.map(c => c === 'SPACE' ? ' ' : c).join('')
  const transliteratedLatin = transliterate(input)

  return (
    <main className="mx-auto flex h-full w-full max-w-3xl flex-col px-4 pb-4 pt-6 overflow-hidden">
      <header className="mb-4 shrink-0 flex items-center gap-4">
        <BackButton />
        <h1 className="font-display text-2xl text-text">{t('dashboard.freetype_title')}</h1>
      </header>

      <section className="mb-4 shrink-0 flex flex-col items-center justify-center rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card backdrop-blur-sm">
        <div className="w-full flex flex-col items-center justify-center rounded-2xl px-4 h-[120px] sm:h-[140px] shrink-0 relative bg-paper-2 border-2 border-border mb-4">
          <span className="font-javanese text-4xl sm:text-5xl leading-normal whitespace-nowrap overflow-x-auto max-w-full px-4 no-scrollbar text-text">
            {renderedJavanese || ' '}
          </span>
          {!renderedJavanese && <span className="absolute text-text-2 opacity-50 font-medium pointer-events-none">{t('practice.type_here')}</span>}
        </div>
        
        <div className="w-full flex flex-col items-center justify-center rounded-2xl px-4 py-4 min-h-[60px] relative bg-paper border border-border shadow-inner">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-deep absolute -top-3 bg-white px-2 rounded-full border border-border">{t('freetype.read_as')}</span>
          <span className="font-display text-2xl text-text tracking-wide text-center break-words max-w-full">
            {transliteratedLatin || '-'}
          </span>
        </div>
      </section>

      <div className="relative flex-1 min-h-0 w-full bg-white/50 rounded-3xl p-4 shadow-inner border border-white/40 overflow-y-auto">
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
          {KEYBOARD.map((k) => (
            <button
              key={k.id}
              onClick={() => handleKeyPress(k.char)}
              className="flex flex-col items-center justify-center aspect-square rounded-xl bg-white border border-border shadow-sm active:scale-95 active:shadow-none transition-all"
            >
              <span className="font-javanese text-2xl mb-1 text-text">{k.char}</span>
              <span className="text-[10px] font-bold text-text-2 uppercase">{k.label}</span>
            </button>
          ))}
          <button
            onClick={handleSpace}
            className="flex flex-col items-center justify-center rounded-xl bg-paper-2 border border-border shadow-sm active:scale-95 transition-all col-span-3"
          >
            <span className="text-sm font-bold uppercase">{t('freetype.space')}</span>
          </button>
          <button
            onClick={handleBackspace}
            disabled={input.length === 0}
            className="flex flex-col items-center justify-center rounded-xl bg-warn/10 border border-warn/20 text-warn shadow-sm active:scale-95 transition-all disabled:opacity-50 col-span-2"
          >
            <span className="text-xl mb-1">⌫</span>
            <span className="text-[10px] font-bold uppercase">{t('practice.clear')}</span>
          </button>
        </div>
      </div>
    </main>
  )
}
