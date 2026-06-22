import Badge from '@/components/ui/Badge'

export const metadata = { title: 'Users — Admin' }

const users = [
  { id: 1, name: 'Alex Chen', email: 'alex@example.com', role: 'student', joined: '2026-05-10', status: 'active' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'student', joined: '2026-05-15', status: 'active' },
  { id: 3, name: 'Lin Wei', email: 'lin.wei@pm-lingo.com', role: 'teacher', joined: '2026-04-01', status: 'active' },
  { id: 4, name: 'David Kim', email: 'david@example.com', role: 'student', joined: '2026-06-01', status: 'trial' },
  { id: 5, name: 'Priya Patel', email: 'priya@example.com', role: 'student', joined: '2026-06-10', status: 'active' },
]

export default function AdminUsersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-lingo-navy">Users</h1>
        <input type="search" placeholder="Search users..." className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-lingo-red w-64" />
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-lingo-surface">
            <tr>
              {['Name', 'Email', 'Role', 'Joined', 'Status'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-lingo-navy">{u.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                <td className="px-6 py-4"><Badge variant={u.role === 'teacher' ? 'info' : 'default'}>{u.role}</Badge></td>
                <td className="px-6 py-4 text-sm text-gray-500">{u.joined}</td>
                <td className="px-6 py-4"><Badge variant={u.status === 'active' ? 'success' : 'warning'}>{u.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
