import Badge from '@/components/ui/Badge'

export const metadata = { title: 'Bookings — PM-Lingo Teacher' }

const bookings = [
  { id: 1, student: 'Alex Chen', date: '2026-06-23', time: '10:00', duration: 60, status: 'confirmed' as const },
  { id: 2, student: 'Maria Santos', date: '2026-06-23', time: '14:00', duration: 30, status: 'confirmed' as const },
  { id: 3, student: 'David Kim', date: '2026-06-24', time: '09:00', duration: 90, status: 'pending' as const },
  { id: 4, student: 'Priya Patel', date: '2026-06-20', time: '15:00', duration: 60, status: 'completed' as const },
  { id: 5, student: 'Tom Nakamura', date: '2026-06-19', time: '11:00', duration: 30, status: 'completed' as const },
]

const statusVariant = { confirmed: 'success', pending: 'warning', completed: 'default', cancelled: 'error' } as const

export default function TeacherBookingsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-lingo-navy mb-10">Bookings</h1>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-lingo-surface">
            <tr>
              {['Student', 'Date', 'Time', 'Duration', 'Status', 'Action'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-lingo-navy">{b.student}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.time}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.duration} min</td>
                <td className="px-6 py-4">
                  <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
                </td>
                <td className="px-6 py-4">
                  {b.status === 'confirmed' && (
                    <button className="text-xs bg-green-50 text-green-700 font-medium px-3 py-1.5 rounded-lg">Join Zoom</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
