import { useTranslation } from 'react-i18next'
import { Shell } from './Shell'
import { BackButton } from './BackButton'
import { useProgress } from '../../state/progress'

export default function Settings() {
  const { t, i18n } = useTranslation()
  const { settings, updateSettings } = useProgress()
  const volume = settings.volume ?? 1

  return (
    <Shell
      title={
        <div className="flex items-center gap-3">
          <BackButton to="/menu" />
          <h1 className="font-display text-3xl leading-none text-text">{t('settings.title')}</h1>
        </div>
      }
    >
      <div className="mt-4 flex flex-col gap-6 rounded-3xl border-2 border-white/50 bg-white/40 p-6 shadow-sm backdrop-blur-md">
        
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-text">{t('settings.volume')}</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => updateSettings({ sound: !(settings.sound ?? true) })}
                className="text-2xl hover:scale-110 active:scale-95 transition-transform"
                title="Mute / Unmute"
              >
                {(settings.sound ?? true) ? '🔊' : '🔇'}
              </button>
              <span className="text-sm font-bold text-text-2 w-10 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => updateSettings({ volume: parseFloat(e.target.value), sound: true })}
            className={`w-full h-3 rounded-lg appearance-none cursor-pointer outline-none transition-opacity ${
              (settings.sound ?? true) ? 'bg-white/60 accent-accent' : 'bg-white/30 accent-text-2/50 opacity-50'
            }`}
          />
        </div>

        <hr className="border-white/50" />

        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-text">{t('settings.language')}</h2>
          
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
            onClick={() => i18n.changeLanguage('jv')}
            className={`flex items-center justify-between rounded-2xl border-2 p-4 font-semibold transition-all ${
              i18n.resolvedLanguage === 'jv'
                ? 'border-accent bg-accent/10 text-accent-deep'
                : 'border-white/50 bg-white/60 text-text-2 hover:bg-white/80'
            }`}
          >
            ꦗ {t('settings.language_jv')}
            {i18n.resolvedLanguage === 'jv' && <span className="text-accent-deep">✓</span>}
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
