import { missions } from '@/data/missions'

export const metadata = { title: 'Progress — PM-Lingo' }

const completedSlugs = ['greetings', 'self-introduction']

export default function ProgressPage() {
  const completed = completedSlugs.length
  const total = missions.length
  const totalXp = missions.filter((m) => completedSlugs.includes(m.slug)).reduce((acc, m) => acc + m.xpReward, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-lingo-navy mb-2">Your Progress</h1>
      <p className="text-gray-500 mb-10">Track your Chinese learning journey.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Missions Done', value: completed },
          { label: 'Total XP', value: totalXp },
          { label: 'Day Streak', value: 5 },
          { label: 'Completion', value: `${Math.round((completed / total) * 100)}%` },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-lingo-navy">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-lingo-navy">Mission Progress</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {missions.map((m) => {
            const done = completedSlugs.includes(m.slug)
            return (
              <div key={m.id} className="flex items-center gap-4 px-6 py-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${done ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                  {done ? '✓' : m.number}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-lingo-navy">{m.title}</div>
                  <div className="text-xs text-gray-400">{m.estimatedMinutes} min · {m.xpReward} XP</div>
                </div>
                <div className={`text-sm font-medium ${done ? 'text-green-600' : 'text-gray-400'}`}>
                  {done ? 'Completed' : 'Not started'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
