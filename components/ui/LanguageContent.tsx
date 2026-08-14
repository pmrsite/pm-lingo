import type { MultilingualText } from '@/types'
import type { LanguagePreferences } from '@/hooks/useLanguagePreferences'

interface Props {
  content: MultilingualText
  prefs: LanguagePreferences
  // Font-size classes for each layer — caller controls hierarchy
  chineseClassName?: string
  pinyinClassName?: string
  englishClassName?: string
  // Whether to show 简/繁 script labels when both are active and differ
  showScriptLabels?: boolean
}

/**
 * Renders a multilingual title/label block respecting Study View preferences.
 * Use for mission titles, curriculum cards, and any structured {s/t/p/en} content.
 * For inline mixed-text explanations use ExplanationRenderer instead.
 */
export default function LanguageContent({
  content,
  prefs,
  chineseClassName = 'font-chinese text-xl font-bold',
  pinyinClassName = 'font-pinyin text-base font-medium',
  englishClassName = 'text-base font-semibold',
  showScriptLabels = true,
}: Props) {
  const { showSimplified, showTraditional, showPinyin, showEnglish } = prefs
  const { simplified, traditional, pinyin, english } = content

  const hasDiff = traditional !== simplified
  const bothActive = showSimplified && showTraditional

  return (
    <div className="flex flex-col gap-0.5">
      {/* Chinese character layer */}
      {bothActive && hasDiff ? (
        // Both scripts active and they differ — show each with 简/繁 label
        <>
          <div className="flex items-baseline gap-1.5">
            {showScriptLabels && (
              <span className="text-[10px] font-semibold text-lingo-muted select-none w-4 shrink-0" aria-label="Simplified Chinese">
                简
              </span>
            )}
            <span className={chineseClassName}>{simplified}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            {showScriptLabels && (
              <span className="text-[10px] font-semibold text-lingo-muted select-none w-4 shrink-0" aria-label="Traditional Chinese">
                繁
              </span>
            )}
            <span className={chineseClassName}>{traditional}</span>
          </div>
        </>
      ) : bothActive && !hasDiff ? (
        // Both active but identical — show once, no label needed
        <span className={chineseClassName}>{simplified}</span>
      ) : showSimplified ? (
        <span className={chineseClassName}>{simplified}</span>
      ) : showTraditional ? (
        <span className={chineseClassName}>{traditional}</span>
      ) : null}

      {/* Pinyin layer */}
      {showPinyin && (
        <span className={pinyinClassName}>{pinyin}</span>
      )}

      {/* English layer */}
      {showEnglish && (
        <span className={englishClassName}>{english}</span>
      )}
    </div>
  )
}
