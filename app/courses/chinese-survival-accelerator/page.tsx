import Link from 'next/link'
import { missions } from '@/data/missions'

export const metadata = {
  title: 'Chinese Survival Accelerator — PM-Lingo',
  description: 'Master practical Mandarin Chinese through 50 real-world missions. From greetings to business conversations.',
}

export default function CoursePage() {
  const whatYouLearn = [
    'Greet locals confidently at any time of day',
    'Introduce yourself in any social or professional setting',
    'Navigate to restrooms, hotels, and transportation',
    'Order food and drinks at any restaurant or hawker stall',
    'Take taxis and get around independently',
    'Handle basic shopping and bargaining',
    'Make small talk and build real connections',
    'Read menus, signs, and basic text',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-lingo-navy text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-lingo-red/20 border border-lingo-red/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-lingo-red">Beginner to Intermediate</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Chinese Survival Accelerator</h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            50 mission-based lessons covering every real-world situation you will encounter in China, Taiwan, Malaysia, or any Chinese-speaking community. No textbooks. No rote memorisation. Just practical Chinese that works.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-10">
            <span>🎯 50 missions (5 available now)</span>
            <span>⏱ ~20–30 min per mission</span>
            <span>🤖 AI tutor included</span>
            <span>📄 PDF downloads</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/signup" className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors text-center">
              Start Free — Missions 1–3 Free
            </Link>
            <Link href="/student/mission/greetings" className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-lg transition-colors text-center">
              Preview Mission 1
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 px-4 bg-lingo-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-lingo-text mb-8">What you will learn</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {whatYouLearn.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-lingo-red mt-0.5 flex-shrink-0">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission List */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-lingo-text mb-8">Course curriculum</h2>
          <div className="space-y-4">
            {missions.map((mission) => (
              <div key={mission.id} className="bg-white border border-lingo-border rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-lingo-red/30 w-10 text-center">
                    {String(mission.number).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-bold text-lingo-text">{mission.title}</h3>
                    <p className="text-sm text-lingo-muted">{mission.subtitle} · {mission.estimatedMinutes} min · +{mission.xpReward} XP</p>
                  </div>
                </div>
                <Link
                  href={`/student/mission/${mission.slug}`}
                  className="bg-lingo-navy text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-lingo-navy/80 transition-colors"
                >
                  Start
                </Link>
              </div>
            ))}
            <div className="bg-lingo-surface border border-dashed border-lingo-border rounded-xl p-6 text-center">
              <p className="text-lingo-muted font-medium">+ 45 more missions coming soon</p>
              <p className="text-sm text-lingo-muted mt-1">New missions released monthly. Annual subscribers get early access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="py-16 px-4 bg-lingo-navy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start learning today</h2>
          <p className="text-gray-300 mb-8">Missions 1–3 are completely free. No credit card required.</p>
          <Link href="/auth/signup" className="inline-block bg-lingo-red hover:bg-lingo-red-dark text-white font-bold px-10 py-4 rounded-lg text-lg transition-colors">
            Enroll Free
          </Link>
        </div>
      </section>
    </div>
  )
}
