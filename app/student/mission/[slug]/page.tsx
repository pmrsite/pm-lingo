'use client'
import { useState, use } from 'react'
import { missions } from '@/data/missions'
import { notFound } from 'next/navigation'
import type { QuizQuestion, QuizAnswers } from '@/types'
import { useLanguagePreferences } from '@/hooks/useLanguagePreferences'
import StudyViewControls from '@/components/ui/StudyViewControls'
import GrammarAccordion from '@/components/ui/GrammarAccordion'

type Tab = 'learn' | 'practice' | 'review' | 'assess'
type MandarinMode = 'simplified' | 'traditional' | 'pinyin'

// ── Helpers ─────────────────────────────────────────────────────────────────

function chineseColHeader(showSimplified: boolean, showTraditional: boolean): string {
  if (showSimplified && showTraditional) return 'Chinese'
  if (showSimplified) return 'Simplified'
  return 'Traditional'
}

// Derive which Mandarin answer modes are currently active from learner prefs
function getActiveMandarin(prefs: ReturnType<typeof useLanguagePreferences>['prefs']): MandarinMode[] {
  const modes: MandarinMode[] = []
  if (prefs.showSimplified) modes.push('simplified')
  if (prefs.showTraditional) modes.push('traditional')
  if (prefs.showPinyin) modes.push('pinyin')
  return modes
}

// Conservative normalisation for answer comparison
function normalise(s: string): string {
  return s.trim().normalize('NFC').replace(/\s+/g, ' ').toLowerCase()
}

// Check a fill-blank answer against the enabled Mandarin modes
function checkFillBlank(
  userAnswer: string,
  q: QuizQuestion,
  modes: MandarinMode[]
): boolean {
  const n = normalise(userAnswer)
  if (!n) return false
  if (q.answers) {
    for (const mode of modes) {
      const accepted = (q.answers[mode as keyof QuizAnswers] ?? []) as string[]
      if (accepted.some((a) => normalise(a) === n)) return true
    }
    return false
  }
  // Fallback for questions without structured answers
  const fallback = Array.isArray(q.answer) ? q.answer[0] : q.answer
  return normalise(fallback) === n
}

// Dynamic placeholder text based on active modes
function getPlaceholder(modes: MandarinMode[]): string {
  if (modes.length === 0) return 'Type your answer...'
  if (modes.length === 1) {
    if (modes[0] === 'simplified') return 'Type your answer in Simplified Chinese...'
    if (modes[0] === 'traditional') return 'Type your answer in Traditional Chinese...'
    return 'Type your answer in Pinyin...'
  }
  const labels = modes.map((m) =>
    m === 'simplified' ? 'Simplified' : m === 'traditional' ? 'Traditional' : 'Pinyin'
  )
  return `Type your answer in ${labels.join(', ')}...`
}

// Reference answer to show on wrong submission
function getReferenceAnswer(q: QuizQuestion): string {
  if (q.answers?.simplified?.[0]) return q.answers.simplified[0]
  if (q.answers?.traditional?.[0]) return q.answers.traditional[0]
  if (q.answers?.pinyin?.[0]) return q.answers.pinyin[0]
  return Array.isArray(q.answer) ? q.answer[0] : q.answer
}

// ── Component ────────────────────────────────────────────────────────────────

export default function MissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const mission = missions.find((m) => m.slug === slug)
  if (!mission) notFound()
  const m = mission!

  const [activeTab, setActiveTab] = useState<Tab>('learn')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [activeRegion, setActiveRegion] = useState<string>('mainland')
  // Per-question mode override for English-only edge case
  const [questionModeOverrides, setQuestionModeOverrides] = useState<Record<string, MandarinMode>>({})

  const { prefs, toggle, resetAll } = useLanguagePreferences()

  const showChineseCol = prefs.showSimplified || prefs.showTraditional
  const activeMandarin = getActiveMandarin(prefs)

  const regionLabels: Record<string, string> = {
    mainland: 'Mainland China',
    taiwan: 'Taiwan',
    malaysia: 'Malaysia',
    international: 'International',
  }

  function handleAnswer(qId: string, value: string) {
    if (!submitted) setAnswers((prev) => ({ ...prev, [qId]: value }))
  }

  function isQuestionCorrect(q: QuizQuestion): boolean {
    const userAns = answers[q.id] || ''
    if (q.type === 'fill-blank') {
      const override = questionModeOverrides[q.id]
      const modes = override ? [override] : activeMandarin
      return checkFillBlank(userAns, q, modes)
    }
    const primaryAnswer = Array.isArray(q.answer) ? q.answer[0] : q.answer
    return normalise(userAns) === normalise(primaryAnswer)
  }

  function calculateScore() {
    let correct = 0
    m.quiz.forEach((q) => { if (isQuestionCorrect(q)) correct++ })
    return Math.round((correct / m.quiz.length) * 100)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' },
    { id: 'review', label: 'Review' },
    { id: 'assess', label: 'Assess' },
  ]

  const score = submitted ? calculateScore() : null

  // Shared Chinese cell content for vocabulary table
  function VocabChineseCell({ v }: { v: typeof m.vocabulary[0] }) {
    if (prefs.showSimplified && prefs.showTraditional) {
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] font-semibold text-lingo-muted select-none w-4">简</span>
            <span className="font-chinese text-xl font-medium">{v.simplified}</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] font-semibold text-lingo-muted select-none w-4">繁</span>
            <span className="font-chinese text-xl font-medium">
              {v.traditional ?? <em className="text-xs not-italic text-lingo-muted">pending</em>}
            </span>
          </div>
        </div>
      )
    }
    if (prefs.showSimplified) return <span className="font-chinese text-2xl font-medium">{v.simplified}</span>
    return (
      <span className="font-chinese text-2xl font-medium">
        {v.traditional ?? <em className="text-xs not-italic text-lingo-muted">Traditional pending review</em>}
      </span>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Mission header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-lingo-muted mb-3">
          <span>Mission {mission.number}</span>
          <span>·</span>
          <span>{mission.estimatedMinutes} min</span>
          <span>·</span>
          <span className="xp-badge">+{mission.xpReward} XP</span>
        </div>
        <h1 className="text-3xl font-bold text-lingo-navy">{mission.title}</h1>
        <p className="text-lingo-body text-lg mt-1">{mission.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-lingo-border mb-8">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-base font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-lingo-navy text-lingo-navy'
                  : 'border-transparent text-lingo-muted hover:text-lingo-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── LEARN TAB ─────────────────────────────────────────────────────── */}
      {activeTab === 'learn' && (
        <div className="space-y-10">
          <div className="bg-lingo-surface rounded-2xl p-6 border border-lingo-border">
            <h2 className="font-bold text-lingo-navy text-xl mb-2">Mission Objective</h2>
            <p className="text-lingo-body text-lg">{mission.objective}</p>
          </div>

          {/* Vocabulary */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <h2 className="font-bold text-lingo-navy text-xl">Vocabulary</h2>
              <StudyViewControls prefs={prefs} onToggle={toggle} onReset={resetAll} />
            </div>
            <div className="overflow-x-auto rounded-2xl border border-lingo-border">
              <table className="w-full" aria-label="Vocabulary list">
                <thead className="bg-lingo-surface">
                  <tr>
                    {showChineseCol && (
                      <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-lingo-muted uppercase tracking-wider">
                        {chineseColHeader(prefs.showSimplified, prefs.showTraditional)}
                      </th>
                    )}
                    {prefs.showPinyin && (
                      <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-lingo-muted uppercase tracking-wider">
                        Pinyin
                      </th>
                    )}
                    {prefs.showEnglish && (
                      <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-lingo-muted uppercase tracking-wider">
                        English
                      </th>
                    )}
                    <th scope="col" className="px-4 py-3 text-xs font-semibold text-lingo-muted uppercase tracking-wider text-center">
                      Audio
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lingo-border">
                  {mission.vocabulary.map((v, i) => (
                    <tr key={i} className="hover:bg-lingo-teal-soft transition-colors">
                      {showChineseCol && (
                        <td className="px-4 py-3">
                          <VocabChineseCell v={v} />
                        </td>
                      )}
                      {prefs.showPinyin && (
                        <td className="font-pinyin font-medium px-4 py-3 text-base text-lingo-body">{v.pinyin}</td>
                      )}
                      {prefs.showEnglish && (
                        <td className="px-4 py-3 text-base text-lingo-text">{v.english}</td>
                      )}
                      <td className="px-4 py-3 text-center">
                        <button
                          className="text-lingo-muted hover:text-lingo-navy transition-colors text-lg"
                          aria-label={`Play audio for ${v.simplified}`}
                        >
                          🔊
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dialogue */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <h2 className="font-bold text-lingo-navy text-xl">Dialogue</h2>
              <StudyViewControls prefs={prefs} onToggle={toggle} onReset={resetAll} />
            </div>
            <div className="space-y-3">
              {mission.dialogue.map((line, i) => (
                <div key={i} className={`flex gap-4 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className="w-9 h-9 bg-gradient-to-br from-lingo-navy to-lingo-secondary rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {line.speaker[0]}
                  </div>
                  <div className={`bg-white border border-lingo-border rounded-2xl px-5 py-4 max-w-lg shadow-sm ${i % 2 !== 0 ? 'text-right' : ''}`}>
                    <div className="text-xs text-lingo-muted mb-1">{line.speaker}</div>
                    {prefs.showSimplified && prefs.showTraditional ? (
                      <div className="mb-1 space-y-0.5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[10px] font-semibold text-lingo-muted select-none">简</span>
                          <span className="font-chinese text-xl font-medium text-lingo-navy">{line.simplified}</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[10px] font-semibold text-lingo-muted select-none">繁</span>
                          <span className="font-chinese text-xl font-medium text-lingo-navy">
                            {line.traditional ?? <em className="text-xs not-italic text-lingo-muted">pending</em>}
                          </span>
                        </div>
                      </div>
                    ) : prefs.showSimplified ? (
                      <div className="font-chinese text-xl font-medium text-lingo-navy mb-1">{line.simplified}</div>
                    ) : prefs.showTraditional ? (
                      <div className="font-chinese text-xl font-medium text-lingo-navy mb-1">
                        {line.traditional ?? <em className="text-xs not-italic text-lingo-muted">Traditional pending review</em>}
                      </div>
                    ) : null}
                    {prefs.showPinyin && (
                      <div className="font-pinyin font-medium text-base text-lingo-body">{line.pinyin}</div>
                    )}
                    {prefs.showEnglish && (
                      <div className="text-base text-lingo-body mt-1">{line.english}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grammar Notes — accordion */}
          <div>
            <h2 className="font-bold text-lingo-navy text-xl mb-4">Grammar Notes</h2>
            <GrammarAccordion notes={mission.grammarNotes} prefs={prefs} />
          </div>

          {/* Regional Notes */}
          <div>
            <h2 className="font-bold text-lingo-navy text-xl mb-4">Regional Notes</h2>
            <div className="flex gap-2 mb-4 flex-wrap">
              {mission.regionalNotes.map((r) => (
                <button
                  key={r.region}
                  onClick={() => setActiveRegion(r.region)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeRegion === r.region
                      ? 'bg-lingo-navy text-white'
                      : 'bg-lingo-surface text-lingo-body hover:bg-lingo-teal-soft'
                  }`}
                >
                  {regionLabels[r.region]}
                </button>
              ))}
            </div>
            {mission.regionalNotes.filter((r) => r.region === activeRegion).map((r, i) => (
              <div key={i} className="bg-lingo-surface rounded-xl p-5 border border-lingo-border text-base text-lingo-body">
                {r.note}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-lingo-surface hover:bg-lingo-teal-soft border border-lingo-border text-lingo-body font-medium py-3 rounded-xl transition-colors">
              📄 Download PDF Lesson
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="flex-1 bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Next: Practice →
            </button>
          </div>
        </div>
      )}

      {/* ── PRACTICE TAB ──────────────────────────────────────────────────── */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {[
            { title: 'Repeat After Me', desc: 'Listen to each phrase and repeat it aloud. Focus on tones.', icon: '🎤', status: 'Coming soon' },
            { title: 'Pronunciation Practice', desc: 'Record yourself and get AI feedback on your pronunciation.', icon: '🎩', status: 'Coming soon' },
            { title: 'AI Roleplay', desc: 'Practice a real conversation with your AI teacher.', icon: '🤖', status: 'Coming soon' },
          ].map((p) => (
            <div key={p.title} className="bg-white border border-lingo-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{p.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lingo-navy text-lg">{p.title}</h3>
                  <p className="text-base text-lingo-body mt-1 mb-3">{p.desc}</p>
                  <span className="bg-lingo-surface text-lingo-muted text-xs font-medium px-3 py-1 rounded-full border border-lingo-border">{p.status}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white border border-lingo-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <h3 className="font-bold text-lingo-navy text-lg">Sentence Drills</h3>
              <StudyViewControls prefs={prefs} onToggle={toggle} onReset={resetAll} />
            </div>
            <div className="space-y-3">
              {mission.vocabulary.slice(0, 5).map((v, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-3 bg-lingo-surface rounded-xl flex-wrap">
                  <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                    {prefs.showSimplified && prefs.showTraditional ? (
                      <span className="font-chinese text-xl font-medium">
                        {v.simplified}
                        {v.traditional && v.traditional !== v.simplified && (
                          <span className="text-lingo-muted"> / {v.traditional}</span>
                        )}
                      </span>
                    ) : prefs.showSimplified ? (
                      <span className="font-chinese text-xl font-medium">{v.simplified}</span>
                    ) : prefs.showTraditional ? (
                      <span className="font-chinese text-xl font-medium">{v.traditional ?? v.simplified}</span>
                    ) : null}
                    {prefs.showPinyin && (
                      <span className="font-pinyin font-medium text-base text-lingo-muted">{v.pinyin}</span>
                    )}
                  </div>
                  {prefs.showEnglish && (
                    <span className="text-base text-lingo-body shrink-0">{v.english}</span>
                  )}
                  <button
                    className="text-lingo-muted hover:text-lingo-navy transition-colors text-lg shrink-0"
                    aria-label={`Play audio for ${v.simplified}`}
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setActiveTab('review')} className="w-full bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold py-3 rounded-xl transition-colors">
            Next: Take the Quiz →
          </button>
        </div>
      )}

      {/* ── REVIEW / QUIZ TAB ─────────────────────────────────────────────── */}
      {activeTab === 'review' && (
        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-lingo-navy text-2xl mb-2">Mission Quiz</h2>
            <p className="text-base text-lingo-body">Answer all questions, then submit for your score.</p>
          </div>

          {mission.quiz.map((q, qi) => {
            const isMandarin = q.answerLanguage === 'mandarin' || (q.type === 'fill-blank' && !!q.answers)
            const override = questionModeOverrides[q.id]
            const qModes: MandarinMode[] = override ? [override] : activeMandarin
            const needsModePicker = isMandarin && q.type === 'fill-blank' && qModes.length === 0

            const isQCorrect = submitted && isQuestionCorrect(q)
            const isQWrong = submitted && !isQCorrect

            // For MC: determine correct option string
            const primaryAnswer = Array.isArray(q.answer) ? q.answer[0] : q.answer

            return (
              <div key={q.id} className="bg-white border border-lingo-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 bg-lingo-navy text-white text-sm font-bold rounded-lg flex items-center justify-center flex-shrink-0">{qi + 1}</span>
                  <p className="font-medium text-lingo-navy text-base">{q.question}</p>
                </div>

                {/* Multiple-choice */}
                {q.type === 'multiple-choice' && q.options && (
                  <div className="space-y-2 ml-10">
                    {q.options.map((opt) => {
                      const selected = answers[q.id] === opt
                      const isCorrectOpt = submitted && opt === primaryAnswer
                      const isWrongSelected = submitted && selected && opt !== primaryAnswer
                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(q.id, opt)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 text-base font-medium transition-all ${
                            isCorrectOpt
                              ? 'border-lingo-success bg-lingo-success-soft text-lingo-success'
                              : isWrongSelected
                              ? 'border-lingo-error bg-red-50 text-lingo-error'
                              : selected
                              ? 'border-lingo-navy bg-lingo-teal-soft text-lingo-navy'
                              : 'border-lingo-border text-lingo-body hover:border-lingo-border-hover'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Fill-blank — Mandarin input with dynamic answer modes */}
                {q.type === 'fill-blank' && (
                  <div className="ml-10 space-y-3">
                    {/* English-only edge case: no Mandarin mode active → show mode picker */}
                    {needsModePicker ? (
                      <div className="rounded-xl border border-lingo-border bg-lingo-surface p-4">
                        <p className="text-sm text-lingo-muted mb-3">
                          Choose how you would like to answer:
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {(['simplified', 'traditional', 'pinyin'] as MandarinMode[]).map((mode) => {
                            const label = mode === 'simplified' ? 'Simplified' : mode === 'traditional' ? 'Traditional' : 'Pinyin'
                            return (
                              <button
                                key={mode}
                                type="button"
                                onClick={() => setQuestionModeOverrides((prev) => ({ ...prev, [q.id]: mode }))}
                                className="px-4 py-2 rounded-lg text-sm font-semibold border border-lingo-teal text-lingo-teal hover:bg-lingo-teal-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingo-teal"
                              >
                                {label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Answer mode indicator */}
                        {isMandarin && qModes.length > 0 && !submitted && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-lingo-muted">Answer in:</span>
                            {qModes.map((mode) => {
                              const label = mode === 'simplified' ? 'Simplified' : mode === 'traditional' ? 'Traditional' : 'Pinyin'
                              return (
                                <span
                                  key={mode}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-lingo-teal-soft border border-lingo-teal text-lingo-teal"
                                >
                                  {label}
                                </span>
                              )
                            })}
                          </div>
                        )}

                        <input
                          type="text"
                          value={answers[q.id] || ''}
                          onChange={(e) => handleAnswer(q.id, e.target.value)}
                          placeholder={getPlaceholder(qModes)}
                          disabled={submitted}
                          className={`w-full border-2 rounded-xl px-4 py-3 text-base outline-none transition-colors ${
                            submitted
                              ? isQCorrect
                                ? 'border-lingo-success bg-lingo-success-soft'
                                : 'border-lingo-error bg-red-50'
                              : 'border-lingo-border focus:border-lingo-navy'
                          }`}
                        />
                      </>
                    )}
                  </div>
                )}

                {/* Feedback after submit */}
                {submitted && (
                  <div className={`ml-10 mt-3 text-base px-4 py-2 rounded-xl ${
                    isQCorrect ? 'bg-lingo-success-soft text-lingo-success' : 'bg-red-50 text-lingo-error'
                  }`}>
                    {isQCorrect
                      ? '✓ Correct!'
                      : `✗ Correct answer: ${q.type === 'fill-blank' ? getReferenceAnswer(q) : primaryAnswer}`
                    }
                    {' '}— {q.explanation}
                  </div>
                )}
              </div>
            )
          })}

          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < mission.quiz.length}
              className="w-full bg-lingo-red hover:bg-lingo-red-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="bg-lingo-navy text-white rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold mb-2">{score}%</div>
              <p className="text-lingo-secondary text-lg mb-4">
                {score! >= 75 ? 'Great work! You are ready to move on.' : 'Keep practising — review the lesson and try again.'}
              </p>
              <button onClick={() => setActiveTab('assess')} className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
                View Assessment →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── ASSESS TAB ────────────────────────────────────────────────────── */}
      {activeTab === 'assess' && (
        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-lingo-navy text-2xl mb-2">Mission Assessment</h2>
            <p className="text-base text-lingo-body">Complete the quiz to unlock your full assessment scores.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Vocabulary' },
              { label: 'Listening' },
              { label: 'Grammar' },
              { label: 'Speaking' },
            ].map((s) => {
              const val = submitted && score !== null ? score : 0
              const colour = val >= 80 ? 'text-lingo-success' : val >= 60 ? 'text-lingo-warning' : val > 0 ? 'text-lingo-navy' : 'text-lingo-disabled'
              return (
                <div key={s.label} className="bg-white border border-lingo-border rounded-2xl p-5 text-center shadow-sm">
                  <div className={`text-3xl font-bold mb-1 ${colour}`}>{val > 0 ? `${val}%` : '—'}</div>
                  <div className="text-sm text-lingo-muted">{s.label}</div>
                </div>
              )
            })}
          </div>

          <div className="bg-lingo-surface rounded-2xl p-6 border border-lingo-border">
            <h3 className="font-bold text-lingo-navy text-xl mb-2">Overall Score</h3>
            <div className={`text-5xl font-bold mb-3 ${
              submitted
                ? score! >= 80 ? 'text-lingo-success' : score! >= 60 ? 'text-lingo-warning' : 'text-lingo-navy'
                : 'text-lingo-disabled'
            }`}>
              {submitted ? `${score}%` : '—'}
            </div>
            <div className="w-full bg-lingo-border rounded-full h-2 mb-4">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: submitted ? `${score}%` : '0%',
                  background: submitted
                    ? score! >= 80 ? '#22C55E' : score! >= 60 ? '#F59E0B' : '#0F766E'
                    : 'transparent',
                }}
              />
            </div>
          </div>

          <div className="bg-white border border-lingo-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lingo-navy text-xl mb-3">AI Feedback</h3>
            <p className="text-lingo-body text-base italic">
              {submitted
                ? 'AI tutor feedback coming soon. Complete AI integration will provide personalised coaching notes based on your specific errors.'
                : mission.assessment.aiFeedbackPlaceholder}
            </p>
          </div>

          <div className="bg-lingo-navy text-white rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">Recommendation</h3>
            <p className="text-lingo-secondary text-base">{mission.assessment.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
