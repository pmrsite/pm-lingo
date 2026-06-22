import { aiTeachers } from '@/data/aiTeachers'

export const metadata = { title: 'Teachers — PM-Lingo' }

export default function TeachersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-lingo-navy mb-4">Meet your AI teachers</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Each AI teacher has a unique personality and teaching style. You will choose 2 — a primary coach and a practice partner.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {aiTeachers.map((t) => (
          <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-lingo-navy to-lingo-red rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {t.name.split(' ')[1][0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-lingo-navy">{t.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500 capitalize">{t.gender}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-sm text-lingo-red font-medium">{t.speciality}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Personality</h3>
                <p className="text-sm text-gray-700">{t.personality}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Teaching Style</h3>
                <p className="text-sm text-gray-700">{t.teachingStyle}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Voice Style</h3>
                <p className="text-sm text-gray-700">{t.voiceStyle}</p>
              </div>
              <button className="w-full bg-lingo-surface hover:bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
                🎤 Voice demo coming soon
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-lingo-navy text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-3">Human teachers — coming soon</h2>
        <p className="text-gray-300 max-w-lg mx-auto mb-6">
          Book 1-on-1 sessions with certified Chinese teachers for real conversation practice, pronunciation coaching, and accountability.
        </p>
        <a href="/auth/signup" className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-block">
          Join the waitlist
        </a>
      </div>
    </div>
  )
}
