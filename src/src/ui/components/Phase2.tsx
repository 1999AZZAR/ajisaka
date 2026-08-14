import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../state/progress'
import { Button } from './Button'
import SuccessParticles from './SuccessParticles'
import { useTranslation } from 'react-i18next'
import { playClick, playTypeSuccess, playTypeError } from '../../engine/audio'
import { fireConfetti } from '../../engine/confetti'

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

const QUESTIONS = [
  // Menu 1: Dasar
  { word: 'bata', target: 'ꦧꦠ', menu: 'Menu 1: Dasar' },
  { word: 'mata', target: 'ꦩꦠ', menu: 'Menu 1: Dasar' },
  { word: 'saka', target: 'ꦱꦏ', menu: 'Menu 1: Dasar' },
  { word: 'cara', target: 'ꦕꦫ', menu: 'Menu 1: Dasar' },
  { word: 'naga', target: 'ꦤꦒ', menu: 'Menu 1: Dasar' },
  // Menu 2: Sandangan
  { word: 'buku', target: 'ꦧꦸꦏꦸ', menu: 'Menu 2: Sandangan' },
  { word: 'pari', target: 'ꦥꦫꦶ', menu: 'Menu 2: Sandangan' },
  { word: 'soto', target: 'ꦱꦺꦴꦠꦺꦴ', menu: 'Menu 2: Sandangan' },
  { word: 'lali', target: 'ꦭꦭꦶ', menu: 'Menu 2: Sandangan' },
  { word: 'sepi', target: 'ꦱꦼꦥꦶ', menu: 'Menu 2: Sandangan' },
  // Menu 3: Pasangan
  { word: 'sabtu', target: 'ꦱꦧ꧀ꦠꦸ', menu: 'Menu 3: Pasangan' },
  { word: 'mandi', target: 'ꦩꦤ꧀ꦢꦶ', menu: 'Menu 3: Pasangan' },
  { word: 'bantu', target: 'ꦧꦤ꧀ꦠꦸ', menu: 'Menu 3: Pasangan' },
  { word: 'pintu', target: 'ꦥꦶꦤ꧀ꦠꦸ', menu: 'Menu 3: Pasangan' },
  { word: 'lampu', target: 'ꦭꦩ꧀ꦥꦸ', menu: 'Menu 3: Pasangan' }
]

export default function Phase2() {
  const [qIndex, setQIndex] = useState(0)
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const completeLevel = useProgress((s) => s.completeLevel)
  const { t } = useTranslation()

  const currentQ = QUESTIONS[qIndex]
  const isCorrect = input === currentQ.target
  const isTypo = input.length > 0 && !currentQ.target.startsWith(input)

  const handleKeyPress = (char: string) => {
    const nextVal = input + char
    setInput(nextVal)
    if (!currentQ.target.startsWith(nextVal)) {
      playTypeError()
    } else if (nextVal === currentQ.target) {
      playTypeSuccess()
      fireConfetti()
    } else {
      playClick()
    }
  }

  const handleBackspace = () => {
    playClick()
    setInput(prev => prev.slice(0, -1))
  }

  const handleFinish = () => {
    const p = useProgress.getState().completedPhases
    if (!p.includes('3_2')) useProgress.getState().completePhase('3_2')
    
    const newP = useProgress.getState().completedPhases
    if (newP.includes('3_1')) {
      completeLevel(3, '3')
      navigate('/level/3/done', { replace: true })
    } else {
      navigate('/level/3', { replace: true })
    }
  }

  const handleNext = () => {
    if (qIndex + 1 >= QUESTIONS.length) {
      handleFinish()
    } else {
      setQIndex(v => v + 1)
      setInput('')
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && isCorrect) {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isCorrect, qIndex])

  return (
    <main className="mx-auto flex h-full w-full max-w-3xl flex-col px-4 pb-4 pt-6 overflow-hidden">
      <header className="mb-4 shrink-0 flex items-center justify-between">
        <h1 className="font-display text-xl text-text">{currentQ.menu}</h1>
        <span className="rounded-full bg-paper border border-border px-4 py-1.5 text-xs font-bold text-text-2 shadow-sm">
          {t('practice.phase')} 2/2 - {t('practice.question')} {qIndex + 1}/{QUESTIONS.length}
        </span>
      </header>

      <div className="mb-4 h-2 shrink-0 overflow-hidden rounded-full bg-paper-3">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-500"
          style={{ width: `${((qIndex + (isCorrect ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <section className="mb-4 shrink-0 flex flex-col items-center justify-center rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card backdrop-blur-sm">
        <span className="text-sm font-bold uppercase tracking-widest text-accent-deep mb-2">{t('practice.write_word')}</span>
        <h2 className="font-display text-4xl text-text mb-6">{currentQ.word}</h2>
        
        <div className={`w-full flex flex-col items-center justify-center rounded-2xl px-4 h-[140px] sm:h-[160px] shrink-0 relative transition-all ${
          isTypo ? 'bg-warn/10 border-2 border-warn/50 animate-shake' : 'bg-paper-2 border-2 border-border'
        }`}>
          <span className={`font-javanese text-5xl sm:text-6xl leading-normal whitespace-nowrap overflow-x-auto max-w-full px-4 no-scrollbar transition-colors ${
            isTypo ? 'text-warn' : 'text-text'
          }`}>{input || ' '}</span>
          {!input && <span className="absolute text-text-2 opacity-50 font-medium pointer-events-none">{t('practice.type_here')}</span>}
        </div>
      </section>

      <div className="relative flex-1 min-h-0 w-full mb-4 bg-white/50 rounded-3xl p-4 shadow-inner border border-white/40 overflow-y-auto">
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
          {KEYBOARD.map((k) => (
            <button
              key={k.id}
              onClick={() => handleKeyPress(k.char)}
              disabled={isCorrect || isTypo}
              className="flex flex-col items-center justify-center aspect-square rounded-xl bg-white border border-border shadow-sm active:scale-95 active:shadow-none transition-all disabled:opacity-50"
            >
              <span className="font-javanese text-2xl mb-1 text-text">{k.char}</span>
              <span className="text-[10px] font-bold text-text-2 uppercase">{k.label}</span>
            </button>
          ))}
          <button
            onClick={handleBackspace}
            disabled={isCorrect || !input}
            className="flex flex-col items-center justify-center rounded-xl bg-warn/10 border border-warn/20 text-warn shadow-sm active:scale-95 transition-all disabled:opacity-50 col-span-2"
          >
            <span className="text-xl mb-1">⌫</span>
            <span className="text-[10px] font-bold uppercase">{t('practice.clear')}</span>
          </button>
        </div>
        <SuccessParticles show={isCorrect} />
      </div>

      {isCorrect && (
        <footer className="mt-2 shrink-0 animate-pop">
          <Button variant="reward" className="w-full" onClick={handleNext}>
            {qIndex + 1 >= QUESTIONS.length ? t('practice.finish') : t('practice.next')}
          </Button>
        </footer>
      )}
    </main>
  )
}
