import { payoutTiers } from '@/data/pricing'

export const metadata = { title: 'Earnings — PM-Lingo Teacher' }

const mockEarnings = [
  { month: 'June 2026', sessions: 18, gross: 810, teacherShare: 567, status: 'Pending' },
  { month: 'May 2026', sessions: 22, gross: 990, teacherShare: 693, status: 'Paid' },
  { month: 'April 2026', sessions: 19, gross: 855, teacherShare: 598.50, status: 'Paid' },
]

const tierColors: Record<string, string> = {
  bronze: 'bg-amber-50 text-amber-700 border-amber-200',
  silver: 'bg-gray-50 text-gray-600 border-gray-200',
  gold: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  platinum: 'bg-blue-50 text-blue-600 border-blue-200',
  master: 'bg-purple-50 text-purple-600 border-purple-200',
}

export default function TeacherEarningsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-lingo-navy mb-10">Earnings & Payouts</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total Earned', value: '$1,858.50' },
          { label: 'This Month (pending)', value: '$567.00' },
          { label: 'Sessions (all time)', value: '127' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
            <div className="text-2xl font-bold text-lingo-navy">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-lingo-surface rounded-2xl p-6 mb-10">
        <h2 className="font-bold text-lingo-navy mb-6">Payout Tiers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {payoutTiers.map((tier) => (
            <div key={tier.tier} className={`rounded-xl border p-4 text-center ${tier.tier === 'silver' ? tierColors.silver + ' ring-2 ring-lingo-navy' : 'bg-white border-gray-100'}`}>
              <div className="text-lg font-bold text-lingo-navy capitalize">{tier.tier}</div>
              <div className="text-xs text-gray-400 mb-2">{tier.sessionsRequired}</div>
              <div className="text-xl font-bold text-lingo-red">{tier.teacherShare}%</div>
              <div className="text-xs text-gray-400">teacher</div>
              {tier.tier === 'silver' && <div className="text-xs font-semibold text-lingo-navy mt-2">Your tier</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-lingo-navy">Earnings History</h2>
        </div>
        <table className="w-full">
          <thead className="bg-lingo-surface">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sessions</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Share (70%)</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockEarnings.map((row) => (
              <tr key={row.month}>
                <td className="px-6 py-4 text-sm font-medium text-lingo-navy">{row.month}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.sessions}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${row.gross}</td>
                <td className="px-6 py-4 text-sm font-medium text-lingo-navy">${row.teacherShare}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${row.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
