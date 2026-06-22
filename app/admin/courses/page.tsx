import { missions } from '@/data/missions'
import Badge from '@/components/ui/Badge'

export const metadata = { title: 'Courses — Admin' }

export default function AdminCoursesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-lingo-navy mb-8">Courses</h1>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lingo-navy">Chinese Survival Accelerator</h2>
            <p className="text-sm text-gray-500 mt-0.5">5 of 50 missions published · Beginner</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
        <div className="divide-y divide-gray-100">
          {missions.map((m) => (
            <div key={m.id} className="flex items-center gap-4 px-6 py-4">
              <span className="w-8 h-8 bg-lingo-navy text-white text-sm font-bold rounded-lg flex items-center justify-center flex-shrink-0">{m.number}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-lingo-navy">{m.title}</div>
                <div className="text-xs text-gray-400">{m.vocabulary.length} vocab · {m.quiz.length} quiz questions · {m.estimatedMinutes} min</div>
              </div>
              <span className="text-xs text-gray-400">{m.xpReward} XP</span>
              <Badge variant="success">Published</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
