import Badge from '@/components/ui/Badge'

export const metadata = { title: 'Bookings — Admin' }

const bookings = [
  { id: 1, student: 'Alex Chen', teacher: 'Lin Wei', date: '2026-06-23', time: '10:00', duration: 60, status: 'confirmed', amount: 45 },
  { id: 2, student: 'Maria Santos', teacher: 'Lin Wei', date: '2026-06-23', time: '14:00', duration: 30, status: 'confirmed', amount: 22.50 },
  { id: 3, student: 'David Kim', teacher: 'Jun Park', date: '2026-06-24', time: '09:00', duration: 90, status: 'pending', amount: 67.50 },
  { id: 4, student: 'Priya Patel', teacher: 'Mei Zhang', date: '2026-06-20', time: '15:00', duration: 60, status: 'completed', amount: 45 },
]

const statusVariant = { confirmed: 'success', pending: 'warning', completed: 'default', cancelled: 'error' } as const

export default function AdminBookingsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-lingo-navy mb-8">Bookings</h1>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-lingo-surface">
            <tr>
              {['Student', 'Teacher', 'Date', 'Duration', 'Amount', 'Status'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-lingo-navy">{b.student}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.teacher}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{b.date} {b.time}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{b.duration} min</td>
                <td className="px-6 py-4 text-sm font-medium text-lingo-navy">${b.amount}</td>
                <td className="px-6 py-4"><Badge variant={statusVariant[b.status as keyof typeof statusVariant]}>{b.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
