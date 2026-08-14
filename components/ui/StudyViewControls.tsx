'use client'
import type { LanguagePreferences } from '@/hooks/useLanguagePreferences'

interface Props {
  prefs: LanguagePreferences
  onToggle: (key: keyof LanguagePreferences) => void
  onReset: () => void
}

const TOGGLES: { key: keyof LanguagePreferences; label: string }[] = [
  { key: 'showChinese', label: 'Chinese' },
  { key: 'showPinyin', label: 'Pinyin' },
  { key: 'showEnglish', label: 'English' },
]

export default function StudyViewControls({ prefs, onToggle, onReset }: Props) {
  const isDefault = prefs.showChinese && prefs.showPinyin && prefs.showEnglish

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-semibold text-lingo-muted uppercase tracking-wider select-none">
        Study View
      </span>
      <div className="flex gap-2 flex-wrap">
        {TOGGLES.map(({ key, label }) => {
          const active = prefs[key]
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggle(key)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingo-teal focus-visible:ring-offset-1
                ${active
                  ? 'bg-lingo-teal-soft border-lingo-teal text-lingo-teal'
                  : 'bg-white border-lingo-border text-lingo-muted hover:border-lingo-border-hover hover:text-lingo-body'
                }`}
            >
              {/* Text indicator so state is never colour-only */}
              <span className="text-sm leading-none" aria-hidden="true">{active ? '✓' : '○'}</span>
              {label}
            </button>
          )
        })}
      </div>
      {!isDefault && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-lingo-muted hover:text-lingo-body transition-colors underline underline-offset-2"
        >
          Show all
        </button>
      )}
    </div>
  )
}
