import { useNavigate } from 'react-router-dom'
import { isLevelUnlocked, useProgress } from '../../state/progress'
import { useTranslation } from 'react-i18next'

interface LevelCardProps {
  level: number
  title: string
  subtitle: string
  icon: string
  reward?: string
  rewardIcon?: string
  onClick?: () => void
}

export function LevelCard({ level, title, subtitle, icon, reward, rewardIcon = '🏆', onClick }: LevelCardProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const completedLevels = useProgress((s) => s.completedLevels)
  const rewards = useProgress((s) => s.rewards)
  const unlocked = level <= 1 || isLevelUnlocked(level, completedLevels)
  const completed = level > 0 && completedLevels.includes(level)
  const hasReward = reward ? rewards.includes(reward) : false

  const handleClick = () => {
    if (!unlocked) return
    if (onClick) {
      onClick()
    } else {
      navigate(`/level/${level}`)
    }
  }

  return (
    <button
      type="button"
      aria-label={`${title}${unlocked ? '' : ` ${t('dashboard.locked')}`}`}
      disabled={!onClick && !unlocked}
      onClick={handleClick}
      className={`group relative flex w-full min-h-[5.5rem] items-center gap-4 rounded-[1.5rem] border-2 px-5 py-4 text-left transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-focus focus-visible:ring-offset-2 ${
        unlocked
          ? 'border-white/80 bg-white shadow-[0_6px_0_oklch(0.86_0.025_78)] hover:-translate-y-1 hover:shadow-[0_8px_0_oklch(0.86_0.025_78),0_10px_20px_rgba(0,0,0,0.05)] active:translate-y-[6px] active:shadow-[0_0px_0_oklch(0.86_0.025_78),0_0px_0_rgba(0,0,0,0)] cursor-pointer'
          : 'border-transparent bg-paper-2 opacity-60 grayscale-[40%] cursor-not-allowed'
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] text-3xl shadow-sm border-2 border-white/50 ${
          completed ? 'bg-gradient-to-br from-accent-2 to-[oklch(0.65_0.13_80)] text-white' : 'bg-paper-3'
        } ${unlocked && !completed ? 'bg-gradient-to-br from-white to-paper-3' : ''}`}
      >
        {icon}
      </span>

      <span className="flex-1">
        <span className="flex items-center gap-2">
          <span className="font-display text-[1.2rem] text-text">{title}</span>
          {completed && (
            <span className="rounded-full bg-accent-2/20 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-widest text-[oklch(0.4_0.09_110)] border border-accent-2/30">
              {t('dashboard.completed')}
            </span>
          )}
        </span>
        <span className="mt-1 block text-[0.9rem] font-medium text-text-2">{subtitle}</span>
      </span>

      <span aria-hidden="true" className="shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-paper-2 text-xl shadow-sm border border-border">
        {!unlocked ? '🔒' : hasReward ? rewardIcon : completed ? '🌟' : '➡️'}
      </span>
      
      {/* Decorative dot for visual interest if completed */}
      {completed && (
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent-2 shadow-sm animate-pulse" />
      )}
    </button>
  )
}