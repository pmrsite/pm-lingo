import type { ExplainContent } from '@/types'
import type { LanguagePreferences } from '@/hooks/useLanguagePreferences'

interface Props {
  segments: ExplainContent
  prefs: LanguagePreferences
}

export default function ExplanationRenderer({ segments, prefs }: Props) {
  const { showSimplified, showTraditional, showPinyin } = prefs

  return (
    <p className="text-base text-lingo-body leading-relaxed">
      {segments.map((seg, i) => {
        if (typeof seg === 'string') {
          return <span key={i}>{seg}</span>
        }

        const { s, t, p } = seg
        const hasDiff = t !== s

        let chineseText: string | null = null
        if (showSimplified && showTraditional && hasDiff) {
          chineseText = `${s}／${t}`
        } else if (showSimplified) {
          chineseText = s
        } else if (showTraditional) {
          chineseText = t
        }

        if (chineseText && showPinyin) {
          return (
            <span key={i}>
              <span className="font-chinese font-medium">{chineseText}</span>
              <span className="font-pinyin text-sm text-lingo-muted"> ({p})</span>
            </span>
          )
        }
        if (chineseText) {
          return <span key={i} className="font-chinese font-medium">{chineseText}</span>
        }
        if (showPinyin) {
          return <span key={i} className="font-pinyin font-medium">{p}</span>
        }
        // Fallback: always show simplified so explanations remain readable
        return <span key={i} className="font-chinese font-medium">{s}</span>
      })}
    </p>
  )
}
