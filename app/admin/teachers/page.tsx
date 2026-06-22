import Badge from '@/components/ui/Badge'
import { payoutTiers } from '@/data/pricing'

export const metadata = { title: 'Teachers — Admin' }

const teachers = [
  { id: 1, name: 'Lin Wei', email: 'lin@pm-lingo.com', sessions: 127, tier: 'silver', status: 'active', earnings: 4580 },
  { id: 2, name: 'Jun Park', email: 'jun@pm-lingo.com', sessions: 43, tier: 'bronze', status: 'active', earnings: 1290 },
  { id: 3, name: 'Mei Zhang', email: 'mei@pm-lingo.com', sessions: 215, tier: 'gold', status: 'active', earnings: 12400 },
]

export default function AdminTeachersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-lingo-navy mb-8">Teachers</h1>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-lingo-surface">
            <tr>
              {['Name', 'Sessions', 'Tier', 'Earnings', 'Status'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teachers.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-lingo-navy">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{t.sessions}</td>
                <td className="px-6 py-4"><Badge variant="info" className="capitalize">{t.tier}</Badge></td>
                <td className="px-6 py-4 text-sm font-medium text-lingo-navy">${t.earnings}</td>
                <td className="px-6 py-4"><Badge variant="success">{t.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <h2 className="font-bold text-lingo-navy mb-4">Payout Tier Reference</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {payoutTiers.map((tier) => (
            <div key={tier.tier} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
              <div className="font-bold text-lingo-navy capitalize text-sm">{tier.tier}</div>
              <div className="text-xs text-gray-400 mt-0.5 mb-2">{tier.sessionsRequired}</div>
              <div className="text-lg font-bold text-lingo-red">{tier.teacherShare}%</div>
              <div className="text-xs text-gray-400">teacher share</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
