import { Link, useParams } from 'react-router-dom'
import { Button } from './Button'
import { BackButton } from './BackButton'
import { useProgress, isLevelUnlocked } from '../../state/progress'
import { useTranslation } from 'react-i18next'
import { playStartGame } from '../../engine/audio'

const levelMeta: Record<string, { titleKey: string; subtitleKey: string; icon: string }> = {
  '1': { titleKey: 'dashboard.level1_title', subtitleKey: 'dashboard.level1_desc', icon: '🏝️' },
  '2': { titleKey: 'dashboard.level2_title', subtitleKey: 'dashboard.level2_desc', icon: '⛰️' },
  '3': { titleKey: 'dashboard.level3_title', subtitleKey: 'dashboard.level3_desc', icon: '👹' },
}

export default function Level() {
  const { level } = useParams<{ level: string }>()
  const id = level ? parseInt(level, 10) : 1
  const completedLevels = useProgress((s) => s.completedLevels)
  const completedPhases = useProgress((s) => s.completedPhases)
  const isUnlocked = isLevelUnlocked(id, completedLevels)
  const isCompleted = completedLevels.includes(id)
  const { t } = useTranslation()

  const meta = levelMeta[level ?? ''] ?? levelMeta['1']

  return (
    <main className="mx-auto flex h-full overflow-hidden w-full max-w-3xl flex-col px-5 pb-8 pt-6">
      <header className="shrink-0 mb-6">
        <BackButton />
      </header>

      <section className="flex flex-1 min-h-0 overflow-y-auto flex-col items-center pb-4">
        <div className="relative mt-auto mb-6 flex shrink-0 h-40 w-40 items-center justify-center rounded-[2.5rem] border-4 border-white bg-gradient-to-br from-paper-2 to-paper-3 text-7xl shadow-card ring-4 ring-black/5">
          {meta.icon}
          {isCompleted && (
            <div className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent-2 text-2xl shadow-md ring-4 ring-white">
              ⭐
            </div>
          )}
        </div>

        <div className="flex flex-col shrink-0 items-center text-center mb-auto">
          <span
            className={`mb-3 rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest ${
              isCompleted
                ? 'bg-accent-2/15 text-[oklch(0.4_0.09_110)] border border-accent-2/20'
                : isUnlocked
                ? 'bg-accent/10 text-accent-deep border border-accent/20'
                : 'bg-paper-3 text-text-2 border border-border'
            }`}
          >
            {isCompleted ? t('level.completed') : isUnlocked ? `Level ${id}` : t('level.locked')}
          </span>
          <h1 className="font-display text-4xl text-text">{t(meta.titleKey)}</h1>
          <p className="mt-2 text-lg font-medium text-text-2">{t(meta.subtitleKey)}</p>
          <div className="mt-6 rounded-2xl bg-white/40 p-4 border border-white/50 shadow-sm backdrop-blur-sm">
            <p className="text-[0.95rem] leading-relaxed text-text-2">{t(`level.story${id}`)}</p>
          </div>
        </div>
      </section>

      <footer className="shrink-0 mt-4 flex flex-col gap-3">
        {id === 3 ? (
          <div className="grid grid-cols-2 gap-3">
            <Link to={`/level/3/practice`} className={!isUnlocked ? 'pointer-events-none opacity-50' : ''}>
              <Button className="w-full py-4 text-sm" disabled={!isUnlocked} onClick={playStartGame}>
                {t('level.play_phase1')} {completedPhases.includes('3_1') ? '✅' : ''}
              </Button>
            </Link>
            <Link to={`/level/3/phase2`} className={!isUnlocked ? 'pointer-events-none opacity-50' : ''}>
              <Button className="w-full py-4 text-sm" disabled={!isUnlocked} onClick={playStartGame}>
                {t('level.play_phase2')} {completedPhases.includes('3_2') ? '✅' : ''}
              </Button>
            </Link>
          </div>
        ) : (
          <Link to={`/level/${id}/practice`} className={!isUnlocked ? 'pointer-events-none opacity-50' : ''}>
            <Button className="w-full py-4 text-lg" disabled={!isUnlocked} onClick={playStartGame}>
              {t('level.play')}
            </Button>
          </Link>
        )}
      </footer>
    </main>
  )
}