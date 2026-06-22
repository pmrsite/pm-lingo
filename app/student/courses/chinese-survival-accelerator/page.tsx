import Link from 'next/link'
import { missions } from '@/data/missions'

export const metadata = {
  title: 'Chinese Survival Accelerator — My Course — PM-Lingo',
}

const completedSlugs = ['greetings', 'self-introduction']

export default function StudentCoursePage() {
  const completed = completedSlugs.length
  const total = missions.length
  const percent = Math.round((completed / total) * 100)

  return (
    <div className="min-h-screen bg-lingo-surface px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/student/dashboard" className="text-sm text-lingo-muted hover:text-lingo-navy">← Back to Dashboard</Link>
        </div>

        <div className="bg-white rounded-2xl border border-lingo-border p-8 mb-6">
          <h1 className="text-2xl font-bold text-lingo-text mb-1">Chinese Survival Accelerator</h1>
          <p className="text-lingo-muted text-sm mb-6">{completed} of {total} missions complete</p>

          {/* Progress bar */}
          <div className="w-full bg-lingo-surface rounded-full h-3 mb-2">
            <div className="bg-lingo-red rounded-full h-3 transition-all" style={{ width: `${percent}%` }} />
          </div>
          <div className="text-right text-sm font-semibold text-lingo-red">{percent}% complete</div>
        </div>

        {/* Mission list */}
        <div className="space-y-3">
          {missions.map((mission) => {
            const isDone = completedSlugs.includes(mission.slug)
            const isCurrent = mission.number === completed + 1
            const isLocked = mission.number > completed + 1

            return (
              <div
                key={mission.id}
                className={`bg-white rounded-xl border p-5 flex items-center gap-4 ${isDone ? 'border-green-200' : isCurrent ? 'border-lingo-red ring-2 ring-lingo-red/20' : 'border-lingo-border opacity-60'}`}
              >
                {/* Status icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${isDone ? 'bg-green-100 text-green-600' : isCurrent ? 'bg-lingo-red text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {isDone ? '✓' : mission.number}
                </div>

                <div className="flex-1">
                  <div className="font-bold text-lingo-text">{mission.title}</div>
                  <div className="text-sm text-lingo-muted">{mission.subtitle} · {mission.estimatedMinutes} min · +{mission.xpReward} XP</div>
                </div>

                {isDone ? (
                  <Link href={`/student/mission/${mission.slug}`} className="text-sm font-semibold text-green-600 hover:underline">
                    Review
                  </Link>
                ) : isCurrent ? (
                  <Link href={`/student/mission/${mission.slug}`} className="bg-lingo-red text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-lingo-red-dark transition-colors">
                    Start
                  </Link>
                ) : (
                  <span className="text-gray-400 text-sm">🔒 Locked</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
