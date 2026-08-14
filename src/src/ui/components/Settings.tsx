import { useTranslation } from 'react-i18next'
import { Shell } from './Shell'
import { BackButton } from './BackButton'

export default function Settings() {
  const { t, i18n } = useTranslation()

  return (
    <Shell
      title={
        <div className="flex items-center gap-3">
          <BackButton to="/menu" />
          <h1 className="font-display text-3xl leading-none text-text">{t('settings.title')}</h1>
        </div>
      }
    >
      <div className="mt-4 flex flex-col gap-4 rounded-3xl border-2 border-white/50 bg-white/40 p-6 shadow-sm backdrop-blur-md">
        <h2 className="font-bold text-text">{t('settings.language')}</h2>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => i18n.changeLanguage('id')}
            className={`flex items-center justify-between rounded-2xl border-2 p-4 font-semibold transition-all ${
              i18n.resolvedLanguage === 'id'
                ? 'border-accent bg-accent/10 text-accent-deep'
                : 'border-white/50 bg-white/60 text-text-2 hover:bg-white/80'
            }`}
          >
            🇮🇩 {t('settings.language_id')}
            {i18n.resolvedLanguage === 'id' && <span className="text-accent-deep">✓</span>}
          </button>
          
          <button
            onClick={() => i18n.changeLanguage('en')}
            className={`flex items-center justify-between rounded-2xl border-2 p-4 font-semibold transition-all ${
              i18n.resolvedLanguage === 'en'
                ? 'border-accent bg-accent/10 text-accent-deep'
                : 'border-white/50 bg-white/60 text-text-2 hover:bg-white/80'
            }`}
          >
            🇬🇧 {t('settings.language_en')}
            {i18n.resolvedLanguage === 'en' && <span className="text-accent-deep">✓</span>}
          </button>
        </div>
      </div>
    </Shell>
  )
}
