'use client'
import { useState } from 'react'
import type { GrammarNote } from '@/types'
import type { LanguagePreferences } from '@/hooks/useLanguagePreferences'
import ExplanationRenderer from './ExplanationRenderer'

interface Props {
  notes: GrammarNote[]
  prefs: LanguagePreferences
}

// Render the Chinese portion of the accordion header based on active script prefs
function ChineseHeader({
  note,
  prefs,
  isOpen,
}: {
  note: GrammarNote
  prefs: LanguagePreferences
  isOpen: boolean
}) {
  const showSimplified = prefs.showSimplified
  const showTraditional = prefs.showTraditional

  if (!showSimplified && !showTraditional) return null

  const bothActive = showSimplified && showTraditional
  const hasDiff = note.traditional && note.traditional !== note.simplified

  const textClass = `font-chinese text-xl font-medium ${isOpen ? 'text-white' : 'text-lingo-teal'}`

  if (bothActive && hasDiff) {
    // Stack simplified / traditional with small script labels
    return (
      <div className="flex flex-col gap-0">
        <div className="flex items-baseline gap-1">
          <span className={`text-[9px] font-semibold select-none w-3 ${isOpen ? 'text-white/50' : 'text-lingo-muted'}`}>简</span>
          <span className={textClass}>{note.simplified}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-[9px] font-semibold select-none w-3 ${isOpen ? 'text-white/50' : 'text-lingo-muted'}`}>繁</span>
          <span className={textClass}>
            {note.traditional ?? <em className="text-xs not-italic opacity-60">pending</em>}
          </span>
        </div>
      </div>
    )
  }

  // Single script (simplified only, traditional only, or both identical)
  const text = showSimplified
    ? note.simplified
    : (note.traditional ?? note.simplified)

  return <span className={textClass}>{text}</span>
}

export default function GrammarAccordion({ notes, prefs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <div className="space-y-2">
      {notes.map((note, i) => {
        const isOpen = openIndex === i
        const panelId = `grammar-panel-${i}`
        const headingId = `grammar-heading-${i}`

        return (
          <div
            key={i}
            className={`rounded-xl border overflow-hidden transition-colors ${
              isOpen ? 'border-lingo-teal' : 'border-[#D9E4E2]'
            }`}
          >
            {/* Accordion header — full button */}
            <button
              id={headingId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors min-h-[52px]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingo-teal focus-visible:ring-inset
                ${isOpen
                  ? 'bg-lingo-teal text-white border-l-4 border-l-[#FF6B00]'
                  : 'bg-white hover:bg-[#F0FDFA]'
                }`}
            >
              <div className="flex-1 min-w-0">
                {/* Chinese + Pinyin row */}
                <div className="flex flex-wrap items-end gap-x-3 gap-y-0.5 mb-0.5">
                  <ChineseHeader note={note} prefs={prefs} isOpen={isOpen} />
                  {prefs.showPinyin && (
                    <span className={`font-pinyin text-base font-medium ${
                      isOpen ? 'text-white/80' : 'text-lingo-muted'
                    }`}>
                      {note.pinyin}
                    </span>
                  )}
                </div>
                {/* English grammar title — always shown as instructional UI regardless of showEnglish */}
                <div className={`text-sm font-medium ${isOpen ? 'text-white/70' : 'text-lingo-muted'}`}>
                  {note.title}
                </div>
              </div>

              {/* +/− indicator — not communicated by colour alone */}
              <span
                className={`text-xl leading-none flex-shrink-0 font-light ${
                  isOpen ? 'text-white' : 'text-lingo-teal'
                }`}
                aria-hidden="true"
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {/* Expanded panel */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
            >
              <div className="px-5 py-4 bg-white border-t border-[#D9E4E2]">
                <ExplanationRenderer segments={note.explanation} prefs={prefs} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
