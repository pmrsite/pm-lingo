import Link from 'next/link'
import { missions } from '@/data/missions'
import CourseCurriculum from '@/components/ui/CourseCurriculum'

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
        <CourseCurriculum missions={missions} completedSlugs={completedSlugs} />
      </div>
    </div>
  )
}
