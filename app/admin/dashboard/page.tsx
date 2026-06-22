import Link from 'next/link'

export const metadata = { title: 'Admin Dashboard — PM-Lingo' }

const stats = [
  { label: 'Total Users', value: 248, change: '+12 this week' },
  { label: 'Active Students', value: 201, change: '+8 this week' },
  { label: 'Teachers', value: 7, change: '+1 this week' },
  { label: 'Revenue (Month)', value: '$4,820', change: '+$340 vs last month' },
  { label: 'Bookings (Month)', value: 89, change: '+11 vs last month' },
  { label: 'Missions Completed', value: 1240, change: '+98 this week' },
]

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-lingo-navy">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Platform overview — mock data</p>
        </div>
        <span className="bg-lingo-red/10 text-lingo-red text-xs font-semibold px-3 py-1.5 rounded-full">Admin</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="text-2xl font-bold text-lingo-navy">{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
            <div className="text-xs text-green-600 mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { href: '/admin/users', label: 'Manage Users', icon: '👥' },
          { href: '/admin/courses', label: 'Manage Courses', icon: '📚' },
          { href: '/admin/teachers', label: 'Manage Teachers', icon: '👨‍🏫' },
          { href: '/admin/bookings', label: 'All Bookings', icon: '📅' },
        ].map((l) => (
          <Link key={l.href} href={l.href} className="bg-lingo-surface hover:bg-gray-100 border border-gray-100 rounded-2xl p-6 text-center transition-colors">
            <div className="text-3xl mb-2">{l.icon}</div>
            <div className="text-sm font-semibold text-lingo-navy">{l.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
