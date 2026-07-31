import Link from 'next/link'
import { missions } from '@/data/missions'
import { pricingPlans } from '@/data/pricing'

// ── Wave divider components ────────────────────────────────────────────────
function WaveBottom({ fill }: { fill: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 80 }}
      >
        <path
          d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section
        className="relative text-white pt-28 pb-36 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(140deg, #0F766E 0%, #0c6560 50%, #145E57 100%)' }}
      >
        {/* Decorative glowing blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-16 -right-16 w-[520px] h-[520px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(100,196,185,0.20) 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(100,196,185,0.14) 0%, transparent 65%)' }}
          />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-lingo-secondary animate-pulse" />
            <span className="text-sm font-medium text-white/90 tracking-wide">Mission-Based Chinese Learning</span>
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-[1.05] tracking-tight mb-6 text-white"
            style={{ fontSize: 'clamp(38px, 6vw, 68px)' }}
          >
            Speak Chinese<br />
            <span className="text-lingo-secondary">with Confidence.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn practical Mandarin through real-world missions, AI guidance,
            and live human coaching — designed for busy adults.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signup"
              className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-black/25"
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

          <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
            14-day free trial · Missions 1–3 free · No credit card required
          </p>

          {/* Glassmorphism stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
            {[
              { value: '50',     label: 'Real-Life Missions' },
              { value: '4',      label: 'AI Teachers' },
              { value: '14-Day', label: 'Free Trial' },
              { value: '100%',   label: 'Practical Mandarin' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 text-center"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.16)',
                }}
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.58)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave → #FAFAF8 */}
        <WaveBottom fill="#FAFAF8" />
      </section>

      {/* ── Value Pillars ──────────────────────────────────────────── */}
      <section className="relative pt-16 pb-36 px-4 overflow-hidden" style={{ background: '#FAFAF8' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>
              A smarter way to learn Mandarin
            </h2>
            <p className="text-lingo-muted text-lg max-w-xl mx-auto leading-relaxed">
              Structured missions, AI practice, and real human coaching — in one complete system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: '🎯',
                bg: '#F0FDFA',
                title: 'Mission-Based Learning',
                description:
                  'Every mission is a real-world scenario — greetings, ordering food, taking a taxi. You learn exactly what you need, nothing more.',
              },
              {
                icon: '🤖',
                bg: '#ECFDF5',
                title: 'AI Tutor Practice',
                description:
                  'Practise with four distinct AI teachers, each with a unique personality. Get instant feedback, 24/7, without judgment.',
              },
              {
                icon: '👩‍🏫',
                bg: '#FFF8E1',
                title: 'Human Teacher Sessions',
                description:
                  'Book live sessions with certified coaches to fix pronunciation, practise conversation, and build the confidence AI alone cannot give.',
              },
            ].map((p) => (
              <div key={p.title} className="flex flex-col items-start">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shrink-0"
                  style={{ background: p.bg }}
                >
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-lingo-text mb-3">{p.title}</h3>
                <p className="text-lingo-muted leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave → white */}
        <WaveBottom fill="#FFFFFF" />
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="relative pt-16 pb-36 px-4 overflow-hidden bg-white">
        {/* Decorative right blob */}
        <div
          className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle, rgba(100,196,185,0.07) 0%, transparent 65%)',
            transform: 'translate(35%, -25%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>
              How it works
            </h2>
            <p className="text-lingo-muted text-lg">Three steps to real Mandarin confidence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Gradient connecting line — desktop only */}
            <div
              className="hidden md:block absolute top-5 h-px pointer-events-none"
              aria-hidden="true"
              style={{
                left: 'calc(16.67% + 24px)',
                right: 'calc(16.67% + 24px)',
                background: 'linear-gradient(90deg, #0F766E, #64C4B9, #0F766E)',
              }}
            />

            {[
              {
                step: '1',
                title: 'Choose a mission',
                description:
                  'Pick a real-world scenario that matches your goal — from basic greetings to business meetings.',
              },
              {
                step: '2',
                title: 'Learn and practise',
                description:
                  'Study vocabulary, practise with AI tutors, and get instant feedback on every response.',
              },
              {
                step: '3',
                title: 'Build confidence',
                description:
                  'Book a live session with a certified teacher to speak real Mandarin with confidence.',
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-6 shrink-0 relative z-10"
                  style={{ background: 'linear-gradient(135deg, #0F766E 0%, #64C4B9 100%)' }}
                >
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-lingo-text mb-3">{s.title}</h3>
                <p className="text-lingo-muted leading-relaxed text-sm max-w-[220px]">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave → #FAFAF8 */}
        <WaveBottom fill="#FAFAF8" />
      </section>

      {/* ── Mission Preview ────────────────────────────────────────── */}
      <section className="relative pt-16 pb-36 px-4 overflow-hidden" style={{ background: '#FAFAF8' }}>
        {/* Subtle radial dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgba(15,118,110,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>
              Your first 5 missions
            </h2>
            <p className="text-lingo-muted text-lg">From zero to functional Mandarin — in real situations</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {missions.map((mission) => (
              <Link
                key={mission.id}
                href={`/student/mission/${mission.slug}`}
                className="bg-white rounded-2xl border border-lingo-border p-6 hover:border-lingo-border-hover hover:shadow-md transition-all group relative overflow-hidden"
              >
                {/* Top gradient accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, #0F766E, #64C4B9)' }}
                />
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl font-bold tabular-nums" style={{ color: 'rgba(107,114,128,0.35)' }}>
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
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl"
                style={{ background: '#F0FDFA' }}
              >
                🚀
              </div>
              <p className="text-lingo-heading-2 font-semibold text-sm mb-1">45 more missions coming</p>
              <p className="text-lingo-disabled text-xs leading-relaxed max-w-[160px]">
                New missions monthly. Annual members get early access.
              </p>
            </div>
          </div>
        </div>

        {/* Wave → white */}
        <WaveBottom fill="#FFFFFF" />
      </section>

      {/* ── Pricing Teaser ────────────────────────────────────────── */}
      <section className="relative pt-16 pb-36 px-4 overflow-hidden bg-white">
        {/* Decorative left blob */}
        <div
          className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle, rgba(15,118,110,0.07) 0%, transparent 65%)',
            transform: 'translate(-35%, 35%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}>
              Simple, honest pricing
            </h2>
            <p className="text-lingo-muted text-lg">Start free. Upgrade when you are ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-7 border relative ${
                  plan.highlighted ? 'border-transparent text-white' : 'bg-lingo-surface border-lingo-border'
                }`}
                style={plan.highlighted ? { background: 'linear-gradient(140deg, #0F766E 0%, #145E57 100%)' } : {}}
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
                    <li
                      key={f}
                      className={`text-sm flex items-start gap-2 ${plan.highlighted ? 'text-white/80' : 'text-lingo-body'}`}
                    >
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
            <Link
              href="/pricing"
              className="text-lingo-navy hover:text-lingo-secondary text-sm font-medium transition-colors"
            >
              See full pricing details →
            </Link>
          </div>
        </div>

        {/* Wave → orange CTA */}
        <WaveBottom fill="#FF6B00" />
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden" style={{ background: '#FF6B00' }}>
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 right-[12%] w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-[8%] w-64 h-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)' }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to speak real Chinese?</h2>
          <p className="text-white/80 mb-8 text-lg">Start your free 14-day trial — no credit card required.</p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white text-lingo-red font-bold px-8 py-3.5 rounded-xl text-base hover:bg-gray-50 transition-colors shadow-lg shadow-black/10"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

    </div>
  )
}
