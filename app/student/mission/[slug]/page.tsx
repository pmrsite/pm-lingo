'use client'
import { useState, use } from 'react'
import { missions } from '@/data/missions'
import { notFound } from 'next/navigation'

type Tab = 'learn' | 'practice' | 'review' | 'assess'

export default function MissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const mission = missions.find((m) => m.slug === slug)
  if (!mission) notFound()
  const m = mission!

  const [activeTab, setActiveTab] = useState<Tab>('learn')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [activeRegion, setActiveRegion] = useState<string>('mainland')

  const regionLabels: Record<string, string> = {
    mainland: 'Mainland China',
    taiwan: 'Taiwan',
    malaysia: 'Malaysia',
    international: 'International',
  }

  function handleAnswer(qId: string, value: string) {
    if (!submitted) setAnswers((prev) => ({ ...prev, [qId]: value }))
  }

  function calculateScore() {
    let correct = 0
    m.quiz.forEach((q) => {
      const userAnswer = answers[q.id]?.trim().toLowerCase()
      const correctAnswer = Array.isArray(q.answer) ? q.answer[0].toLowerCase() : q.answer.toLowerCase()
      if (userAnswer === correctAnswer) correct++
    })
    return Math.round((correct / m.quiz.length) * 100)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' },
    { id: 'review', label: 'Review' },
    { id: 'assess', label: 'Assess' },
  ]

  const score = submitted ? calculateScore() : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Mission header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <span>Mission {mission.number}</span>
          <span>·</span>
          <span>{mission.estimatedMinutes} min</span>
          <span>·</span>
          <span className="text-lingo-red font-medium">+{mission.xpReward} XP</span>
        </div>
        <h1 className="text-3xl font-bold text-lingo-navy">{mission.title}</h1>
        <p className="text-gray-500 mt-1">{mission.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-lingo-red text-lingo-red'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* LEARN TAB */}
      {activeTab === 'learn' && (
        <div className="space-y-10">
          <div className="bg-lingo-surface rounded-2xl p-6 border border-gray-100">
            <h2 className="font-bold text-lingo-navy mb-2">Mission Objective</h2>
            <p className="text-gray-600">{mission.objective}</p>
          </div>

          <div>
            <h2 className="font-bold text-lingo-navy text-xl mb-4">Vocabulary</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full">
                <thead className="bg-lingo-surface">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chinese</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pinyin</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">English</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Audio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mission.vocabulary.map((v, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-2xl font-medium">{v.chinese}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{v.pinyin}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{v.english}</td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-gray-400 hover:text-lingo-red transition-colors text-lg">🔊</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lingo-navy text-xl mb-4">Dialogue</h2>
            <div className="space-y-3">
              {mission.dialogue.map((line, i) => (
                <div key={i} className={`flex gap-4 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className="w-9 h-9 bg-gradient-to-br from-lingo-navy to-lingo-red rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {line.speaker[0]}
                  </div>
                  <div className={`bg-white border border-gray-100 rounded-2xl px-5 py-4 max-w-md shadow-sm ${i % 2 !== 0 ? 'text-right' : ''}`}>
                    <div className="text-xs text-gray-400 mb-1">{line.speaker}</div>
                    <div className="text-xl font-medium text-lingo-navy mb-1">{line.chinese}</div>
                    <div className="text-sm text-gray-500 font-mono">{line.pinyin}</div>
                    <div className="text-sm text-gray-600 mt-1">{line.english}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lingo-navy text-xl mb-4">Grammar Notes</h2>
            <div className="space-y-3">
              {mission.grammarNotes.map((note, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-6 h-6 bg-lingo-red/10 text-lingo-red text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lingo-navy text-xl mb-4">Regional Notes</h2>
            <div className="flex gap-2 mb-4 flex-wrap">
              {mission.regionalNotes.map((r) => (
                <button
                  key={r.region}
                  onClick={() => setActiveRegion(r.region)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeRegion === r.region ? 'bg-lingo-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {regionLabels[r.region]}
                </button>
              ))}
            </div>
            {mission.regionalNotes.filter((r) => r.region === activeRegion).map((r, i) => (
              <div key={i} className="bg-lingo-surface rounded-xl p-5 border border-gray-100 text-sm text-gray-700">
                {r.note}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-lingo-surface hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors text-sm">
              📄 Download PDF Lesson
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="flex-1 bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Next: Practice →
            </button>
          </div>
        </div>
      )}

      {/* PRACTICE TAB */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {[
            { title: 'Repeat After Me', desc: 'Listen to each phrase and repeat it aloud. Focus on tones.', icon: '🎤', status: 'Coming soon' },
            { title: 'Pronunciation Practice', desc: 'Record yourself and get AI feedback on your pronunciation.', icon: '🎤', status: 'Coming soon' },
            { title: 'AI Roleplay', desc: 'Practice a real conversation with your AI teacher.', icon: '🤖', status: 'Coming soon' },
          ].map((p) => (
            <div key={p.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{p.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lingo-navy">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-3">{p.desc}</p>
                  <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{p.status}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lingo-navy mb-4">Sentence Drills</h3>
            <div className="space-y-3">
              {mission.vocabulary.slice(0, 5).map((v, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-lingo-surface rounded-xl">
                  <div>
                    <span className="text-xl font-medium">{v.chinese}</span>
                    <span className="text-sm text-gray-400 ml-3 font-mono">{v.pinyin}</span>
                  </div>
                  <span className="text-sm text-gray-600">{v.english}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('review')}
            className="w-full bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Next: Take the Quiz →
          </button>
        </div>
      )}

      {/* REVIEW / QUIZ TAB */}
      {activeTab === 'review' && (
        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-lingo-navy text-xl mb-2">Mission Quiz</h2>
            <p className="text-sm text-gray-500">Answer all questions, then submit for your score.</p>
          </div>

          {mission.quiz.map((q, qi) => {
            const userAnswer = answers[q.id]
            const correct = Array.isArray(q.answer) ? q.answer[0] : q.answer
            const isCorrect = submitted && userAnswer?.toLowerCase() === correct.toLowerCase()
            const isWrong = submitted && userAnswer?.toLowerCase() !== correct.toLowerCase()

            return (
              <div key={q.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 bg-lingo-navy text-white text-sm font-bold rounded-lg flex items-center justify-center flex-shrink-0">
                    {qi + 1}
                  </span>
                  <p className="font-medium text-lingo-navy">{q.question}</p>
                </div>

                {q.type === 'multiple-choice' && q.options && (
                  <div className="space-y-2 ml-10">
                    {q.options.map((opt) => {
                      const selected = answers[q.id] === opt
                      const isCorrectOpt = submitted && opt === correct
                      const isWrongSelected = submitted && selected && opt !== correct
                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(q.id, opt)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            isCorrectOpt ? 'border-green-500 bg-green-50 text-green-700' :
                            isWrongSelected ? 'border-red-400 bg-red-50 text-red-700' :
                            selected ? 'border-lingo-red bg-lingo-red/5 text-lingo-navy' :
                            'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                )}

                {q.type === 'fill-blank' && (
                  <div className="ml-10">
                    <input
                      type="text"
                      value={answers[q.id] || ''}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      placeholder="Type your answer in Chinese..."
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                        submitted
                          ? isCorrect ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50'
                          : 'border-gray-200 focus:border-lingo-red'
                      }`}
                    />
                  </div>
                )}

                {submitted && (
                  <div className={`ml-10 mt-3 text-sm px-4 py-2 rounded-xl ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {isCorrect ? '✓ Correct!' : `✗ Correct answer: ${correct}`} — {q.explanation}
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
              <p className="text-gray-300 mb-4">{score! >= 75 ? 'Great work! You are ready to move on.' : 'Keep practicing — review the lesson and try again.'}</p>
              <button
                onClick={() => setActiveTab('assess')}
                className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                View Assessment →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ASSESS TAB */}
      {activeTab === 'assess' && (
        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-lingo-navy text-xl mb-2">Mission Assessment</h2>
            <p className="text-sm text-gray-500">Complete the quiz to unlock your full assessment scores.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Vocabulary', key: 'vocabularyScore' },
              { label: 'Listening', key: 'listeningScore' },
              { label: 'Grammar', key: 'grammarScore' },
              { label: 'Speaking', key: 'speakingConfidenceScore' },
            ].map((s) => {
              const val = submitted && score !== null ? score : 0
              return (
                <div key={s.key} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
                  <div className={`text-3xl font-bold mb-1 ${val > 0 ? 'text-lingo-red' : 'text-gray-300'}`}>{val}%</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              )
            })}
          </div>

          <div className="bg-lingo-surface rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-lingo-navy mb-2">Overall Score</h3>
            <div className={`text-5xl font-bold mb-3 ${submitted ? 'text-lingo-navy' : 'text-gray-200'}`}>
              {submitted ? `${score}%` : '—'}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-lingo-red h-2 rounded-full transition-all" style={{ width: submitted ? `${score}%` : '0%' }} />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lingo-navy mb-3">AI Feedback</h3>
            <p className="text-gray-500 text-sm italic">
              {submitted ? 'AI tutor feedback coming soon. Complete AI integration will provide personalised coaching notes based on your specific errors.' : mission.assessment.aiFeedbackPlaceholder}
            </p>
          </div>

          <div className="bg-lingo-navy text-white rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Recommendation</h3>
            <p className="text-gray-300 text-sm">{mission.assessment.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
