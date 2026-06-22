import Link from 'next/link'
import { missions } from '@/data/missions'
import { pricingPlans } from '@/data/pricing'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-lingo-navy text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-lingo-red/20 border border-lingo-red/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-lingo-red animate-pulse"></span>
            <span className="text-sm font-medium text-lingo-red">Mission-Based Chinese Learning</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Master Real-World Chinese<br />
            <span className="text-lingo-red">with AI and Human Coaches</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Stop memorising flashcards. Learn the Mandarin you actually need — ordering food, taking taxis, making friends — through 50 practical missions designed for busy adults.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Start Free Trial — No Card Needed
            </Link>
            <Link
              href="/(public)/courses/chinese-survival-accelerator"
              className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Explore the Course
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">14-day free trial · Access missions 1–3 · No credit card required</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-lingo-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lingo-text mb-4">A smarter way to learn Chinese</h2>
            <p className="text-lg text-lingo-muted max-w-2xl mx-auto">We combine structured missions, AI practice, and real human coaching into one complete system.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Mission-Based Learning',
                description: 'Each mission teaches you exactly what you need for a specific real-world situation — greetings, ordering food, taking taxis, and more. No filler, no fluff.',
              },
              {
                icon: '🤖',
                title: 'AI Tutor Practice',
                description: 'Practice with four distinct AI teachers 24/7. Each has a unique personality and teaching style. Practice speaking and get instant feedback without judgment.',
              },
              {
                icon: '👩‍🏫',
                title: 'Human Teacher Sessions',
                description: 'Book live sessions with certified teachers to accelerate your progress. Teachers earn more as they complete more sessions — a true merit-based system.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-8 border border-lingo-border">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-lingo-text mb-3">{feature.title}</h3>
                <p className="text-lingo-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lingo-text mb-4">How it works</h2>
            <p className="text-lg text-lingo-muted">Three simple steps to real Chinese fluency</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose your mission', description: 'Pick a real-world scenario — from basic greetings to business meetings. Each mission has a clear objective and time estimate.' },
              { step: '02', title: 'Learn, practice, review', description: 'Study vocabulary and grammar, practice with AI tutors, complete quizzes, and get instant feedback on every answer.' },
              { step: '03', title: 'Level up with a human teacher', description: 'Book a live session with a certified teacher to practice conversation, fix pronunciation, and build real confidence.' },
            ].map((step) => (
              <div key={step.step} className="flex flex-col items-start">
                <div className="text-5xl font-bold text-lingo-red/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-lingo-text mb-3">{step.title}</h3>
                <p className="text-lingo-muted leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Preview */}
      <section className="py-20 px-4 bg-lingo-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lingo-text mb-4">Your first 5 missions</h2>
            <p className="text-lg text-lingo-muted">From zero to functional Mandarin in real situations</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <Link
                key={mission.id}
                href={`/student/mission/${mission.slug}`}
                className="bg-white rounded-xl border border-lingo-border p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-bold text-lingo-red/30 group-hover:text-lingo-red/50 transition-colors">
                    {String(mission.number).padStart(2, '0')}
                  </span>
                  <span className="bg-lingo-red/10 text-lingo-red text-xs font-semibold px-2.5 py-1 rounded-full">
                    +{mission.xpReward} XP
                  </span>
                </div>
                <h3 className="text-lg font-bold text-lingo-text mb-1">{mission.title}</h3>
                <p className="text-sm text-lingo-muted mb-4">{mission.subtitle}</p>
                <div className="flex items-center gap-3 text-xs text-lingo-muted">
                  <span>⏱ {mission.estimatedMinutes} min</span>
                  <span>·</span>
                  <span>{mission.vocabulary.length} vocab words</span>
                </div>
              </Link>
            ))}
            <div className="bg-lingo-navy rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-3">🚀</div>
              <p className="text-white font-semibold mb-2">45 more missions coming</p>
              <p className="text-gray-400 text-sm">New missions added monthly. Annual plan members get early access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lingo-text mb-4">Simple, honest pricing</h2>
            <p className="text-lg text-lingo-muted">Start free. Upgrade when you are ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-xl p-6 border ${plan.highlighted ? 'bg-lingo-navy border-lingo-navy text-white ring-2 ring-lingo-red' : 'bg-white border-lingo-border'}`}
              >
                {plan.highlighted && (
                  <div className="bg-lingo-red text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">BEST VALUE</div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className={`text-sm ${plan.highlighted ? 'text-gray-400' : 'text-lingo-muted'}`}>/{plan.period}</span>
                  )}
                </div>
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-gray-300' : 'text-lingo-muted'}`}>{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    plan.highlighted
                      ? 'bg-lingo-red hover:bg-lingo-red-dark text-white'
                      : 'border-2 border-lingo-navy text-lingo-navy hover:bg-lingo-navy hover:text-white'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/(public)/pricing" className="text-lingo-red hover:underline text-sm font-medium">
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-lingo-red">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to speak real Chinese?</h2>
          <p className="text-white/80 text-lg mb-8">Join thousands of learners who chose practical over theoretical. Start your free trial today.</p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white text-lingo-red font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            Start Free Trial — No Card Needed
          </Link>
        </div>
      </section>
    </div>
  )
}
