import { useCallback, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Point } from '../../engine/geometry'
import { STARTER_QUESTIONS, SANDANGAN_QUESTIONS, PASANGAN_QUESTIONS } from '../../data/aksara'
import { useProgress } from '../../state/progress'
import { rasterMatch } from '../../engine/raster'
import { fireConfetti } from '../../engine/confetti'
import PracticeCanvas, { type StrokeFeedback } from './PracticeCanvas'
import { BackButton } from './BackButton'
import { Button } from './Button'
import SuccessParticles from './SuccessParticles'
import { useWakeLock } from '../../hooks/useWakeLock'
import { useTranslation } from 'react-i18next'

const SETS = { '1': STARTER_QUESTIONS, '2': SANDANGAN_QUESTIONS, '3': PASANGAN_QUESTIONS } as const
export default function Practice() {
  useWakeLock()

  const { level } = useParams<'level'>()
  const navigate = useNavigate()
  const completeLevel = useProgress((s) => s.completeLevel)
  const { t } = useTranslation()

  const levelNum = (level ?? '1') as keyof typeof SETS
  const TYPE_LABEL = { '1': t('practice.base'), '2': t('practice.sandangan'), '3': t('practice.pasangan') } as Record<string, string>
  const questions = SETS[levelNum] ?? STARTER_QUESTIONS

  const sessionId = `practice_${levelNum}`
  const [qIndex, setQIndex] = useState(() => {
    const state = useProgress.getState()
    const saved = state.savedSessions?.[sessionId] || 0
    return saved < questions.length ? saved : 0
  })

  useEffect(() => {
    useProgress.getState().saveSession(sessionId, qIndex)
  }, [qIndex, sessionId])

  const [strokes, setStrokes] = useState<Point[][]>([])
  const [feedback, setFeedback] = useState<StrokeFeedback | null>(null)
  
  const glyph = questions[qIndex % questions.length]

  const handleDone = () => {
    useProgress.getState().clearSession(sessionId)
    if (levelNum === '3') {
      const p = useProgress.getState().completedPhases
      if (!p.includes('3_1')) useProgress.getState().completePhase('3_1')
      
      const newP = useProgress.getState().completedPhases
      if (newP.includes('3_2')) {
        completeLevel(3, '3')
        navigate('/level/3/done', { replace: true })
      } else {
        navigate('/level/3', { replace: true })
      }
    } else {
      completeLevel(Number(levelNum), levelNum === '1' ? 'pedang' : levelNum === '2' ? 'perisai' : undefined)
      navigate(`/level/${levelNum}/done`)
    }
  }

  const handleNext = () => {
    if (qIndex + 1 >= questions.length) {
      handleDone()
    } else {
      setQIndex((v) => v + 1)
      setStrokes([])
      setFeedback(null)
    }
  }

  const passed = feedback?.status === 'pass'

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && passed) {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [passed, qIndex])

  const handleStroke = useCallback(
    (raw: Point[]) => {
      const all = [...strokes, raw]
      setStrokes(all)
      const m = rasterMatch(all, glyph.contour)
      setFeedback({ ...m, points: all.flat() })
      
      import('../../engine/audio').then(a => {
        if (m.status === 'pass') {
          a.playQuestionDone()
          fireConfetti()
        }
        else if (m.status === 'warn') a.playStrokeError()
        else if (m.status === 'retry') a.playStrokeError()
        else a.playStrokeSuccess() // Sub-stroke valid
      })
    },
    [strokes, glyph],
  )

  const handleClear = useCallback(() => {
    setStrokes([])
    setFeedback(null)
  }, [])

  const statusStyle =
    feedback?.status === 'pass'
      ? 'bg-accent-2/20 text-[oklch(0.35_0.09_130)] border-accent-2/40'
      : feedback?.status === 'warn'
        ? 'bg-warn/20 text-[oklch(0.4_0.08_60)] border-warn/40'
        : feedback?.status === 'retry'
          ? 'bg-error/15 text-[oklch(0.4_0.12_27)] border-error/40'
          : 'border-transparent text-text-2'

  return (
    <main className="mx-auto flex h-full w-full max-w-3xl flex-col px-5 pb-5 pt-6 overflow-hidden">
      <header className="mb-5 shrink-0 flex items-center justify-between">
        <BackButton to="/menu" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-paper border border-border px-4 py-1.5 text-xs font-bold text-text-2 shadow-sm">
          {levelNum === '3' ? `${t('practice.phase')} 1/2 - ` : ''}{t('practice.question')} {qIndex + 1}/{questions.length}
        </span>
        </div>
      </header>

      <div className="mb-4 h-2 shrink-0 overflow-hidden rounded-full bg-paper-3 relative">
        <div
          className="absolute inset-0 origin-left bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 will-change-transform transform-gpu"
          style={{ transform: `scaleX(${((qIndex + (passed ? 1 : 0)) / questions.length)})` }}
        />
      </div>

      <section className="mb-4 shrink-0 overflow-hidden rounded-[1.75rem] border-2 border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-paper-2 to-paper-3 shadow-inner border border-border">
            <span
              className="text-text drop-shadow-sm"
              style={{ fontFamily: 'var(--font-javanese)', fontSize: '3.5rem', lineHeight: 1 }}
              aria-hidden="true"
            >
              {glyph.unicode}
            </span>
          </div>
          <div className="flex flex-col items-start pr-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-widest text-accent-deep">
                {t('practice.draw')}
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-text-2">
                {TYPE_LABEL[levelNum]}
              </span>
            </div>
            <h1 className="font-display text-[1.75rem] font-bold leading-tight text-text capitalize">{glyph.label}</h1>
            <p className="mt-1 text-sm font-medium leading-snug text-text-2">{t(`aksara_hints.${glyph.id}`, { defaultValue: glyph.hint })}</p>
          </div>
        </div>
      </section>

      <div className="relative flex-1 min-h-0 w-full mb-4">
        <PracticeCanvas
          glyph={glyph}
          strokeIdx={0}
          feedback={feedback}
          showArrows={levelNum === '1'}
          onStroke={handleStroke}
          onClear={handleClear}
        />
        <SuccessParticles show={passed} />
      </div>

      <div
        aria-live="polite"
        role="status"
        className={`shrink-0 flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition-all duration-300 ${statusStyle} ${
          feedback?.status === 'pass' ? 'animate-pop' : ''
        }`}
      >
        {feedback?.status === 'pass' && (
          <>
            <span aria-hidden="true" className="text-lg">✅</span>
            {t('practice.feedback.pass')}
          </>
        )}
        {feedback?.status === 'warn' && (
          <>
            <span aria-hidden="true" className="text-lg">🟡</span>
            {t('practice.feedback.warn')}
          </>
        )}
        {feedback?.status === 'retry' && (
          <>
            <span aria-hidden="true" className="text-lg">🔄</span>
            {t('practice.feedback.retry')}
          </>
        )}
        {!feedback && (
          <>
            <span aria-hidden="true" className="text-lg">✏️</span>
            {t('practice.feedback.empty')}
          </>
        )}
      </div>

      {passed && (
        <footer className="mt-4 shrink-0">
          <Button variant="reward" className="w-full" onClick={handleNext}>
            {qIndex + 1 >= questions.length ? t('practice.finish') : t('practice.next')}
          </Button>
        </footer>
      )}
    </main>
  )
}