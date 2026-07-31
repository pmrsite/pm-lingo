import Link from 'next/link'
import { missions } from '@/data/missions'
import { pricingPlans } from '@/data/pricing'

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="text-white py-28 sm:py-36 px-4"
        style={{ background: 'linear-gradient(160deg, #0F766E 0%, #0d6b64 55%, #145E57 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-lingo-secondary animate-pulse" />
            <span className="text-sm font-medium text-white/90 tracking-wide">Mission-Based Chinese Learning</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(36px,6vw,64px)] font-bold leading-[1.05] tracking-tight mb-5 text-white">
            Speak Chinese<br />
            <span className="text-lingo-secondary">with Confidence.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn practical Mandarin through real-world missions, AI guidance,
            and live human coaching — designed for busy adults.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signup"
              className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-black/20"
            >
              Start Free Trial
            </Link>
            <Link
              href="/courses/chinese-survival-accelerator"
              className="border border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-medium px-8 py-3.5 rounded-xl text-base transition-all"
            >
              Explore the Course
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/45">
            14-day free trial · Missions 1–3 free · No credit card required
          </p>
        </div>
      </section>

      {/* ── Stats Strip ───────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-lingo-card border-b border-lingo-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {[
              { value: '50',     label: 'Real-Life Missions' },
              { value: '4',      label: 'AI Teacher Personalities' },
              { value: '14-Day', label: 'Free Trial' },
              { value: '100%',   label: 'Practical Mandarin' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-lingo-navy">{stat.value}</span>
                <span className="text-xs text-lingo-muted mt-0.5 uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Pillars ─────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 bg-lingo-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(26px,4vw,42px)] font-bold text-lingo-text mb-4">
              A smarter way to learn Mandarin
            </h2>
            <p className="text-lingo-muted text-lg max-w-xl mx-auto leading-relaxed">
              Structured missions, AI practice, and real human coaching — in one complete system.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: '🎯',
                title: 'Mission-Based Learning',
                description:
                  'Every mission is a real-world scenario — greetings, ordering food, taking a taxi. You learn exactly what you need, nothing more.',
              },
              {
                icon: '🤖',
                title: 'AI Tutor Practice',
                description:
                  'Practise with four distinct AI teachers, each with a unique personality. Get instant feedback on every answer, 24/7, without judgment.',
              },
              {
                icon: '👩‍🏫',
                title: 'Human Teacher Sessions',
                description:
                  'Book live sessions with certified coaches. Fix pronunciation, practise real conversation, and build the confidence AI alone cannot give.',
              },
            ].map((p) => (
              <div key={p.title} className="flex flex-col items-start">
                <div className="text-3xl mb-5">{p.icon}</div>
                <h3 className="text-lg font-bold text-lingo-text mb-3">{p.title}</h3>
                <p className="text-lingo-muted leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 bg-lingo-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(26px,4vw,42px)] font-bold text-lingo-text mb-4">How it works</h2>
            <p className="text-lingo-muted text-lg">Three steps to real Mandarin confidence</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                title: 'Choose a mission',
                description:
                  'Pick a real-world scenario that matches your goal — from basic greetings to business meetings. Clear objectives, clear time estimates.',
              },
              {
                step: '2',
                title: 'Learn and practise',
                description:
                  'Study vocabulary and phrases, practise with AI tutors, and complete short exercises. Get instant feedback on every response.',
              },
              {
                step: '3',
                title: 'Build confidence with a coach',
                description:
                  'Book a live session with a certified teacher to practise real conversation, fix pronunciation, and speak with confidence.',
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-start">
                <div className="w-10 h-10 rounded-full bg-lingo-navy flex items-center justify-center text-white text-sm font-bold mb-5 shrink-0">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-lingo-text mb-3">{s.title}</h3>
                <p className="text-lingo-muted leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission Preview ────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 bg-lingo-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(26px,4vw,42px)] font-bold text-lingo-text mb-4">Your first 5 missions</h2>
            <p className="text-lingo-muted text-lg">From zero to functional Mandarin — in real situations</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {missions.map((mission) => (
              <Link
                key={mission.id}
                href={`/student/mission/${mission.slug}`}
                className="bg-lingo-card rounded-2xl border border-lingo-border p-6 hover:border-lingo-border-hover hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl font-bold text-lingo-disabled/60 group-hover:text-lingo-muted/60 transition-colors tabular-nums">
                    {String(mission.number).padStart(2, '0')}
                  </span>
                  <span className="xp-badge">+{mission.xpReward} XP</span>
                </div>
                <h3 className="text-base font-bold text-lingo-text mb-1 leading-snug">{mission.title}</h3>
                <p className="text-sm text-lingo-muted mb-4 leading-relaxed">{mission.subtitle}</p>
                <div className="flex items-center gap-3 text-xs text-lingo-disabled">
                  <span>⏱ {mission.estimatedMinutes} min</span>
                  <span>·</span>
                  <span>{mission.vocabulary.length} words</span>
                </div>
              </Link>
            ))}
            {/* Coming soon */}
            <div className="rounded-2xl border-2 border-dashed border-lingo-border p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
              <div className="w-10 h-10 rounded-full bg-lingo-teal-soft flex items-center justify-center mb-4">
                <span className="text-lg">🚀</span>
              </div>
              <p className="text-lingo-heading-2 font-semibold text-sm mb-1">45 more missions coming</p>
              <p className="text-lingo-disabled text-xs leading-relaxed max-w-[160px]">
                New missions monthly. Annual members get early access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Teaser ────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 bg-lingo-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(26px,4vw,42px)] font-bold text-lingo-text mb-4">Simple, honest pricing</h2>
            <p className="text-lingo-muted text-lg">Start free. Upgrade when you are ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-7 border relative ${
                  plan.highlighted
                    ? 'bg-lingo-navy border-lingo-navy text-white'
                    : 'bg-lingo-surface border-lingo-border'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-lingo-gold text-[#5C4300] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                      BEST VALUE
                    </span>
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className={`text-sm ${plan.highlighted ? 'text-white/55' : 'text-lingo-muted'}`}>
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-5 leading-relaxed ${plan.highlighted ? 'text-white/65' : 'text-lingo-muted'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${plan.highlighted ? 'text-white/80' : 'text-lingo-body'}`}>
                      <span className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-lingo-secondary' : 'text-lingo-success'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm ${
                    plan.highlighted
                      ? 'bg-lingo-red hover:bg-lingo-red-dark text-white'
                      : 'border border-lingo-navy text-lingo-navy hover:bg-lingo-teal-soft'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-lingo-navy hover:text-lingo-secondary text-sm font-medium transition-colors">
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-lingo-red">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to speak real Chinese?</h2>
          <p className="text-white/80 mb-8 text-lg">Start your free 14-day trial — no credit card required.</p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white text-lingo-red font-bold px-8 py-3.5 rounded-xl text-base hover:bg-gray-50 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

    </div>
  )
}
