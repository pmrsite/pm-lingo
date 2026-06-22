'use client'

import { useState } from 'react'
import { aiTeachers } from '@/data/aiTeachers'
import type { AITeacher } from '@/types'

export default function SelectTeachersPage() {
  const [primaryId, setPrimaryId] = useState<string | null>(null)
  const [secondaryId, setSecondaryId] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  function handleSelect(teacher: AITeacher) {
    if (primaryId === teacher.id) {
      setPrimaryId(null)
      return
    }
    if (secondaryId === teacher.id) {
      setSecondaryId(null)
      return
    }
    if (!primaryId) {
      setPrimaryId(teacher.id)
    } else if (!secondaryId) {
      setSecondaryId(teacher.id)
    }
  }

  function getRole(id: string): string | null {
    if (primaryId === id) return 'Primary'
    if (secondaryId === id) return 'Secondary'
    return null
  }

  const canConfirm = !!primaryId && !!secondaryId

  if (confirmed) {
    return (
      <div className="min-h-screen bg-lingo-surface flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-lingo-border p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-lingo-text mb-2">Teachers selected!</h2>
          <p className="text-lingo-muted mb-6">You can change your teachers anytime from your profile settings.</p>
          <a href="/student/dashboard" className="inline-block bg-lingo-red text-white font-semibold px-6 py-3 rounded-lg">
            Go to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lingo-surface px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-lingo-text mb-2">Choose Your AI Teachers</h1>
          <p className="text-lingo-muted max-w-xl mx-auto">
            Select one Primary teacher (your main tutor) and one Secondary teacher (for variety). Click a card to select.
          </p>
        </div>

        {/* Selection summary */}
        <div className="flex gap-4 justify-center mb-8">
          <div className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${primaryId ? 'border-lingo-navy bg-lingo-navy text-white' : 'border-dashed border-lingo-muted text-lingo-muted'}`}>
            Primary: {primaryId ? aiTeachers.find(t => t.id === primaryId)?.name : 'Not selected'}
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${secondaryId ? 'border-lingo-red bg-lingo-red text-white' : 'border-dashed border-lingo-muted text-lingo-muted'}`}>
            Secondary: {secondaryId ? aiTeachers.find(t => t.id === secondaryId)?.name : 'Not selected'}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {aiTeachers.map((teacher) => {
            const role = getRole(teacher.id)
            const isSelected = !!role
            return (
              <button
                key={teacher.id}
                onClick={() => handleSelect(teacher)}
                className={`text-left bg-white rounded-2xl border-2 p-6 transition-all ${
                  role === 'Primary' ? 'border-lingo-navy ring-2 ring-lingo-navy/20' :
                  role === 'Secondary' ? 'border-lingo-red ring-2 ring-lingo-red/20' :
                  'border-lingo-border hover:border-lingo-muted'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 rounded-full bg-lingo-surface flex items-center justify-center text-2xl">
                    {teacher.gender === 'female' ? '👩‍🏫' : '👨‍🏫'}
                  </div>
                  {role && (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${role === 'Primary' ? 'bg-lingo-navy text-white' : 'bg-lingo-red text-white'}`}>
                      {role}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-lingo-text mb-1">{teacher.name}</h3>
                <div className="text-xs text-lingo-red font-semibold mb-2">{teacher.speciality}</div>
                <p className="text-sm text-lingo-muted leading-relaxed">{teacher.personality}</p>
              </button>
            )
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => setConfirmed(true)}
            disabled={!canConfirm}
            className="bg-lingo-red hover:bg-lingo-red-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-xl transition-colors text-lg"
          >
            {canConfirm ? 'Confirm My Teachers' : 'Select Both Primary and Secondary'}
          </button>
        </div>
      </div>
    </div>
  )
}
