'use client'

import Link from 'next/link'
import type { Mission } from '@/types'
import { useLanguagePreferences } from '@/hooks/useLanguagePreferences'
import StudyViewControls from '@/components/ui/StudyViewControls'
import LanguageContent from '@/components/ui/LanguageContent'

interface Props {
  missions: Mission[]
  completedSlugs?: string[]
  showStudyView?: boolean
}

export default function CourseCurriculum({ missions, completedSlugs, showStudyView = true }: Props) {
  const { prefs, toggle, resetAll } = useLanguagePreferences()
  const isStudentView = completedSlugs !== undefined
  const completed = completedSlugs?.length ?? 0

  return (
    <div>
      {showStudyView && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-lingo-muted">Study View:</span>
          <StudyViewControls prefs={prefs} onToggle={toggle} onReset={resetAll} />
        </div>
      )}

      <div className="space-y-3">
        {missions.map((mission) => {
          const isDone = completedSlugs?.includes(mission.slug) ?? false
          const isCurrent = isStudentView && mission.number === completed + 1
          const isLocked = isStudentView && mission.number > completed + 1

          const stars = isDone ? '★★★' : '☆☆☆'

          if (isStudentView) {
            return (
              <div
                key={mission.id}
                className={`bg-white rounded-xl border p-5 flex items-center gap-4 ${
                  isDone ? 'border-green-200' :
                  isCurrent ? 'border-lingo-red ring-2 ring-lingo-red/20' :
                  'border-lingo-border opacity-60'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                  isDone ? 'bg-green-100 text-green-600' :
                  isCurrent ? 'bg-lingo-red text-white' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {isDone ? '✓' : mission.number}
                </div>

                <div className="flex-1 min-w-0">
                  <LanguageContent
                    content={mission.multilingualTitle}
                    prefs={prefs}
                    chineseClassName="font-chinese text-base font-bold text-lingo-text"
                    pinyinClassName="font-pinyin text-sm text-lingo-muted"
                    englishClassName="text-base font-bold text-lingo-text"
                  />
                  <div className="text-xs text-lingo-muted mt-0.5">
                    {mission.estimatedMinutes} min · +{mission.gamification.xpReward} XP · <span className="text-yellow-500">{stars}</span>
                  </div>
                </div>

                {isDone ? (
                  <Link href={`/student/mission/${mission.slug}`} className="text-sm font-semibold text-green-600 hover:underline shrink-0">
                    Review
                  </Link>
                ) : isCurrent ? (
                  <Link href={`/student/mission/${mission.slug}`} className="bg-lingo-red text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-lingo-red-dark transition-colors shrink-0">
                    Start
                  </Link>
                ) : (
                  <span className="text-gray-400 text-sm shrink-0">🔒 Locked</span>
                )}
              </div>
            )
          }

          // Public course page
          return (
            <div
              key={mission.id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:border-lingo-teal hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-5 min-w-0">
                <span className="text-2xl font-bold tabular-nums w-10 text-center shrink-0" style={{ color: '#FF6B00' }}>
                  {String(mission.number).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <LanguageContent
                    content={mission.multilingualTitle}
                    prefs={prefs}
                    chineseClassName="font-chinese text-base font-bold text-lingo-text"
                    pinyinClassName="font-pinyin text-sm text-lingo-muted"
                    englishClassName="text-base font-bold text-lingo-text"
                  />
                  <p className="text-sm text-lingo-muted mt-0.5">{mission.estimatedMinutes} min · +{mission.gamification.xpReward} XP</p>
                </div>
              </div>
              <Link
                href={`/student/mission/${mission.slug}`}
                className="bg-lingo-teal hover:bg-lingo-teal-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors shrink-0 ml-4"
              >
                Start
              </Link>
            </div>
          )
        })}

        {!isStudentView && (
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-6 text-center">
            <p className="text-lingo-heading-2 font-semibold">+ 45 more missions coming soon</p>
            <p className="text-sm text-lingo-muted mt-1">New missions released monthly. Annual subscribers get early access.</p>
          </div>
        )}
      </div>
    </div>
  )
}
