import Link from 'next/link'
import { payoutTiers } from '@/data/pricing'

export const metadata = { title: 'Teacher Dashboard — PM-Lingo' }

const mockTeacher = {
  name: 'Lin Wei',
  completedSessions: 127,
  tier: 'silver',
  totalEarnings: 4580,
  rating: 4.9,
  upcomingBookings: [
    { student: 'Alex Chen', date: '2026-06-23', time: '10:00', duration: 60 },
    { student: 'Maria Santos', date: '2026-06-23', time: '14:00', duration: 30 },
    { student: 'David Kim', date: '2026-06-24', time: '09:00', duration: 90 },
  ],
}

const tierColors: Record<string, string> = {
  bronze: 'text-amber-700 bg-amber-50',
  silver: 'text-gray-600 bg-gray-100',
  gold: 'text-yellow-600 bg-yellow-50',
  platinum: 'text-blue-600 bg-blue-50',
  master: 'text-purple-600 bg-purple-50',
}

export default function TeacherDashboardPage() {
  const currentTier = payoutTiers.find((t) => t.tier === mockTeacher.tier)
  const nextTier = payoutTiers[payoutTiers.findIndex((t) => t.tier === mockTeacher.tier) + 1]

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-lingo-navy">Welcome, {mockTeacher.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full capitalize ${tierColors[mockTeacher.tier]}`}>
            {mockTeacher.tier} Tier
          </span>
          <span className="text-sm text-gray-500">⭐ {mockTeacher.rating} rating</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Completed Sessions', value: mockTeacher.completedSessions },
          { label: 'Total Earnings', value: `$${mockTeacher.totalEarnings}` },
          { label: 'Teacher Share', value: `${currentTier?.teacherShare}%` },
          { label: 'Rating', value: `${mockTeacher.rating}/5` },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-lingo-navy">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lingo-navy">Upcoming Bookings</h2>
              <Link href="/teacher/bookings" className="text-sm text-lingo-red hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {mockTeacher.upcomingBookings.map((b, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-10 h-10 bg-lingo-navy text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {b.student[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-lingo-navy">{b.student}</div>
                    <div className="text-xs text-gray-400">{b.date} at {b.time} · {b.duration} min</div>
                  </div>
                  <button className="text-xs bg-green-50 text-green-700 font-medium px-3 py-1.5 rounded-lg">
                    Join Zoom
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-lingo-navy text-white rounded-2xl p-6">
            <h2 className="font-bold mb-4">Tier Progress</h2>
            <div className="text-3xl font-bold mb-1">{mockTeacher.completedSessions}</div>
            <div className="text-gray-400 text-xs mb-4">sessions completed</div>
            {nextTier && (
              <>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span className="capitalize">{mockTeacher.tier}</span>
                  <span className="capitalize">{nextTier.tier}</span>
                </div>
                <div className="bg-white/20 rounded-full h-2">
                  <div className="bg-lingo-red h-2 rounded-full" style={{ width: '27%' }} />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {nextTier.tier === 'gold' ? 73 : '—'} more sessions to {nextTier.tier} tier ({nextTier.teacherShare}% share)
                </p>
              </>
            )}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lingo-navy mb-4">Quick links</h2>
            <div className="space-y-2">
              {[
                { href: '/teacher/profile', label: 'Edit profile' },
                { href: '/teacher/bookings', label: 'All bookings' },
                { href: '/teacher/earnings', label: 'Earnings & payouts' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-gray-600 hover:text-lingo-red transition-colors py-1">
                  → {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
