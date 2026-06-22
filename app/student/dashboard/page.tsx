import Link from 'next/link'

export const metadata = {
  title: 'Student Dashboard — PM-Lingo',
}

const mockStudent = {
  name: 'Sarah Chen',
  completedMissions: 2,
  totalMissions: 5,
  xp: 220,
  streak: 5,
  currentMission: { title: 'Finding a Toilet', slug: 'finding-a-toilet', number: 3 },
}

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-lingo-surface">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lingo-text">Welcome back, {mockStudent.name} 👋</h1>
          <p className="text-lingo-muted mt-1">Keep up the momentum — you are on a {mockStudent.streak}-day streak!</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-lingo-border p-5 text-center">
            <div className="text-3xl font-bold text-lingo-navy">{mockStudent.completedMissions}</div>
            <div className="text-sm text-lingo-muted mt-1">Missions Completed</div>
          </div>
          <div className="bg-white rounded-xl border border-lingo-border p-5 text-center">
            <div className="text-3xl font-bold text-lingo-red">{mockStudent.xp}</div>
            <div className="text-sm text-lingo-muted mt-1">XP Earned</div>
          </div>
          <div className="bg-white rounded-xl border border-lingo-border p-5 text-center">
            <div className="text-3xl font-bold text-yellow-500">{mockStudent.streak}</div>
            <div className="text-sm text-lingo-muted mt-1">Day Streak 🔥</div>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="bg-lingo-navy text-white rounded-2xl p-8 mb-8">
          <div className="text-sm text-gray-400 mb-1">Continue where you left off</div>
          <h2 className="text-2xl font-bold mb-2">Mission {mockStudent.currentMission.number}: {mockStudent.currentMission.title}</h2>
          <p className="text-gray-300 mb-6">You have completed {mockStudent.completedMissions} of {mockStudent.totalMissions} available missions. Keep going!</p>

          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-6">
            <div
              className="bg-lingo-red rounded-full h-2 transition-all"
              style={{ width: `${(mockStudent.completedMissions / mockStudent.totalMissions) * 100}%` }}
            />
          </div>

          <Link
            href={`/student/mission/${mockStudent.currentMission.slug}`}
            className="inline-block bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Continue Mission {mockStudent.currentMission.number} →
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: 'My Course', desc: 'View all missions and progress', href: '/student/courses/chinese-survival-accelerator', icon: '📚' },
            { title: 'Progress', desc: 'Detailed stats and XP history', href: '/student/progress', icon: '📈' },
            { title: 'Book a Teacher', desc: 'Schedule a live practice session', href: '/student/book-teacher', icon: '👩‍🏫' },
          ].map((link) => (
            <Link key={link.title} href={link.href} className="bg-white rounded-xl border border-lingo-border p-5 hover:shadow-md transition-shadow group">
              <div className="text-2xl mb-3">{link.icon}</div>
              <div className="font-bold text-lingo-text group-hover:text-lingo-red transition-colors">{link.title}</div>
              <div className="text-sm text-lingo-muted mt-1">{link.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
