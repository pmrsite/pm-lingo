import Link from 'next/link'
import { missions } from '@/data/missions'
import { pricingPlans } from '@/data/pricing'
import { aiTeachers } from '@/data/aiTeachers'
import SectionLabel from '@/components/ui/SectionLabel'
import StatsCounter from '@/components/ui/StatsCounter'

type BubbleVariant = 'teal' | 'orange' | 'gold' | 'white'
const bubbleStyles: Record<BubbleVariant, { bg: string; text: string; sub: string; border?: string }> = {
  teal:   { bg: '#0F766E', text: '#fff',    sub: 'rgba(255,255,255,0.7)' },
  orange: { bg: '#FF6B00', text: '#fff',    sub: 'rgba(255,255,255,0.8)' },
  gold:   { bg: '#FFF8E1', text: '#B7791F', sub: '#B7791F', border: '#F6C453' },
  white:  { bg: '#fff',    text: '#111827', sub: '#6B7280', border: '#E5E7EB' },
}

function ChineseBubble({
  hanzi, pinyin, english, variant = 'teal', style, animClass,
}: {
  hanzi: string; pinyin: string; english: string;
  variant?: BubbleVariant; style?: React.CSSProperties; animClass?: string
}) {
  const s = bubbleStyles[variant]
  return (
    <div
      className={`absolute rounded-2xl px-4 py-3 shadow-md ${animClass ?? ''}`}
      style={{ background: s.bg, border: s.border ? `1px solid ${s.border}` : 'none', ...style }}
    >
      <div className="text-xl font-bold" style={{ color: s.text }}>{hanzi}</div>
      <div className="text-xs mt-0.5" style={{ color: s.sub }}>{pinyin} · {english}</div>
    </div>
  )
}

const teacherAccents: Record<string, { accent: string; textColor: string; emoji: string }> = {
  mei: { accent: '#0F766E', textColor: '#0F766E', emoji: '🧘' },
  lin: { accent: '#E0006A', textColor: '#C2005C', emoji: '✨' },
  jun: { accent: '#0C4A45', textColor: '#0C4A45', emoji: '📚' },
  kai: { accent: '#FF6B00', textColor: '#E85D04', emoji: '🎯' },
}

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Marketing Manager',
    quote: 'I ordered food entirely in Mandarin on my KL business trip. The AI practice gave me the confidence to actually try.',
    initial: 'S',
    color: '#0F766E',
  },
  {
    name: 'David C.',
    role: 'Software Engineer',
    quote: 'Mission 7 — Taking a Taxi — literally saved me on my first day in Shenzhen. That real-world focus is what sets PM-Lingo apart.',
    initial: 'D',
    color: '#FF6B00',
  },
  {
    name: 'Priya M.',
    role: 'HR Director',
    quote: 'My team uses PM-Lingo before client meetings in China. The business Mandarin missions are practical and straight to the point.',
    initial: 'P',
    color: '#0C4A45',
  },
]

const upcomingSessions = [
  { month: 'AUG', day: '5',  title: 'Live Pronunciation Clinic',            teacher: 'with Teacher Mei', color: '#0F766E' },
  { month: 'AUG', day: '12', title: 'Conversational Practice: Ordering Food', teacher: 'with Teacher Lin', color: '#FF6B00' },
  { month: 'AUG', day: '19', title: 'Business Mandarin: Introductions',       teacher: 'with Teacher Jun', color: '#0C4A45' },
]

const homeStats = [
  { value: 50,  suffix: '+',    label: 'Real-Life Missions' },
  { value: 4,   suffix: '',     label: 'AI Teacher Personalities' },
  { value: 14,  suffix: '-Day', label: 'Free Trial' },
  { value: 100, suffix: '%',    label: 'Practical Mandarin' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-14 sm:pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border border-lingo-border">
              <span className="w-1.5 h-1.5 rounded-full bg-lingo-teal" />
              <span className="text-sm font-medium text-lingo-teal tracking-wide">Mission-Based Mandarin Learning</span>
            </div>

            <h1 className="font-bold text-lingo-text mb-5" style={{ fontSize: 'clamp(38px, 5vw, 62px)', lineHeight: 1.05 }}>
              Speak <span style={{ color: '#FF6B00' }}>Mandarin</span><br />
              <span style={{ color: '#0F766E' }}>with Confidence.</span>
            </h1>

            <p className="text-lingo-muted text-xl mb-8 leading-relaxed" style={{ maxWidth: 460 }}>
              Learn practical Mandarin through real-world missions, AI guidance,
              and live human coaching — designed for busy adults.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-colors min-h-[48px] inline-flex items-center"
              >
                Start Free Trial
              </Link>
              <Link
                href="/courses/chinese-survival-accelerator"
                className="border border-lingo-teal text-lingo-teal hover:bg-teal-50 font-medium px-8 py-3.5 rounded-xl transition-all min-h-[48px] inline-flex items-center"
              >
                Explore the Course
              </Link>
            </div>

            <p className="mt-5 text-sm text-lingo-disabled">14-day free trial · Missions 1–3 free · No credit card required</p>
          </div>

          <div className="relative flex items-center justify-center" style={{ minHeight: 380 }}>
            <div className="rounded-full bg-gray-100" style={{ width: 260, height: 260 }} />
            <div className="absolute flex flex-col items-center text-center">
              <span className="font-bold" style={{ fontSize: 72, lineHeight: 1, color: '#0F766E' }}>普</span>
              <span className="text-xs text-lingo-muted mt-2 font-medium tracking-wider uppercase">Mandarin Chinese</span>
            </div>
            <ChineseBubble hanzi="你好！" pinyin="Nǐ hǎo"   english="Hello"      variant="teal"   animClass="bubble-float-1" style={{ top: 24,   left: 0   }} />
            <ChineseBubble hanzi="谢谢"   pinyin="Xièxie"  english="Thank you" variant="orange" animClass="bubble-float-2" style={{ top: 48,   right: -8 }} />
            <ChineseBubble hanzi="再见"   pinyin="Zàijiàn" english="Goodbye"   variant="white"  animClass="bubble-float-3" style={{ bottom: 56, left: -8  }} />
            <ChineseBubble hanzi="对不起" pinyin="Duìbu qǐ" english="Sorry"    variant="gold"   animClass="bubble-float-4" style={{ bottom: 24, right: 0  }} />
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-6xl mx-auto mt-14">
          <div className="rounded-2xl p-5 border border-gray-200">
            <StatsCounter stats={homeStats} />
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── Value Pillars ────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-end">
            <div>
              <SectionLabel>Why PM-Lingo</SectionLabel>
              <h2 className="font-bold text-lingo-text" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>
                A smarter way<br />to learn Mandarin
              </h2>
            </div>
            <p className="text-lingo-body text-xl leading-relaxed self-end">
              Structured missions, AI practice, and real human coaching —
              three elements that work together in one complete system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Mission-Based Learning',  description: 'Every mission is a real-world scenario — greetings, ordering food, taking a taxi. No filler, no fluff.', accent: '#FF6B00' },
              { icon: '🤖', title: 'AI Tutor Practice',        description: 'Practise with four distinct AI teachers, each with a unique personality. Get instant feedback, 24/7.',     accent: '#0F766E' },
              { icon: '👩‍🏫', title: 'Human Teacher Sessions', description: 'Book live sessions with certified coaches to fix pronunciation and build the confidence AI alone cannot give.', accent: '#0C4A45' },
            ].map((p) => (
              <div key={p.title} className="border border-gray-200 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: p.accent }} />
                <div className="text-3xl mb-5 mt-2">{p.icon}</div>
                <h3 className="text-xl font-bold text-lingo-text mb-3">{p.title}</h3>
                <p className="text-lingo-body text-base leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Find Your Level ─────────────────────────────────────────────── */}
      <section style={{ background: '#0F766E' }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#64C4B9' }}>Free Placement Quiz</p>
          <h2 className="font-bold text-white mb-4" style={{ fontSize: 'clamp(24px, 4vw, 38px)', lineHeight: 1.2 }}>
            Not sure where to start?<br />Find your Mandarin level.
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Answer 10 quick questions and we’ll recommend the right mission to begin with.
          </p>
          <Link
            href="/placement-test"
            className="inline-flex items-center gap-2 bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-colors min-h-[48px]"
          >
            Take the Quiz — it’s free
          </Link>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── How It Works ────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel center>The Method</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>How it works</h2>
            <p className="text-lingo-body text-lg">Three steps to real Mandarin confidence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose a mission',   description: 'Pick a real-world scenario that matches your goal — from greetings to business meetings.', color: '#FF6B00' },
              { step: '2', title: 'Learn and practise', description: 'Study vocabulary, practise with AI tutors, and get instant feedback on every response.',   color: '#0F766E' },
              { step: '3', title: 'Build confidence',   description: 'Book a live session with a certified teacher to speak real Mandarin with confidence.',       color: '#0C4A45' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-6 shrink-0 text-lg"
                  style={{ background: s.color }}
                >
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-lingo-text mb-3">{s.title}</h3>
                <p className="text-lingo-body leading-relaxed text-base" style={{ maxWidth: 240 }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── AI Teachers ────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel center>Your AI Teachers</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>
              Four personalities,<br />one goal
            </h2>
            <p className="text-lingo-body text-lg" style={{ maxWidth: 480, margin: '0 auto' }}>
              Choose two AI teachers — a primary coach and a practice partner — each with a distinct style.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTeachers.map((t) => {
              const a = teacherAccents[t.id] ?? teacherAccents.mei
              return (
                <div key={t.id} className="rounded-2xl overflow-hidden border border-gray-200">
                  <div className="h-1.5" style={{ background: a.accent }} />
                  <div className="p-6 bg-white">
                    <div className="text-2xl mb-4">{a.emoji}</div>
                    <h3 className="font-bold mb-0.5" style={{ color: a.textColor, fontSize: 17 }}>{t.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: a.textColor, opacity: 0.7 }}>{t.speciality}</p>
                    <p className="text-sm leading-relaxed text-lingo-body">{t.personality}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/teachers" className="text-sm font-semibold text-lingo-teal hover:text-lingo-red transition-colors">
              Meet all teachers →
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── Upcoming Live Sessions ───────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <SectionLabel>Live Coaching</SectionLabel>
              <h2 className="font-bold text-lingo-text" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.2 }}>Upcoming live sessions</h2>
            </div>
            <Link href="/teachers" className="text-sm font-semibold text-lingo-teal hover:text-lingo-red transition-colors shrink-0">
              View all sessions →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {upcomingSessions.map((s) => (
              <div key={s.title} className="flex gap-4 border border-gray-200 rounded-2xl p-5 hover:border-lingo-teal hover:shadow-sm transition-all">
                <div
                  className="rounded-xl flex flex-col items-center justify-center shrink-0 text-white"
                  style={{ background: s.color, width: 56, height: 56 }}
                >
                  <span className="text-xs font-bold uppercase leading-none">{s.month}</span>
                  <span className="text-xl font-bold leading-tight">{s.day}</span>
                </div>
                <div>
                  <p className="font-semibold text-lingo-text text-sm leading-snug mb-0.5">{s.title}</p>
                  <p className="text-xs text-lingo-muted">{s.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── Mission Preview ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel center>Get Started</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>Your first 5 missions</h2>
            <p className="text-lingo-body text-lg">From zero to functional Mandarin — in real situations</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {missions.map((mission) => (
              <Link
                key={mission.id}
                href={`/student/mission/${mission.slug}`}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-lingo-teal hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-lingo-teal" />
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl font-bold tabular-nums text-gray-200">{String(mission.number).padStart(2, '0')}</span>
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

            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
              <div className="text-2xl mb-3">🚀</div>
              <p className="text-lingo-heading-2 font-semibold text-sm mb-1">45 more missions coming</p>
              <p className="text-lingo-disabled text-xs leading-relaxed" style={{ maxWidth: 160 }}>New missions monthly. Annual members get early access.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel center>What Learners Say</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>
              Real results,<br />real Mandarin
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="border border-gray-200 rounded-2xl p-7 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: t.color }} />
                <div className="flex gap-0.5 mb-5 mt-2">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>
                  ))}
                </div>
                <p className="text-lingo-body text-base leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-lingo-text text-sm leading-none mb-0.5">{t.name}</p>
                    <p className="text-xs text-lingo-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── Pricing Teaser ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel center>Pricing</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>Simple, honest pricing</h2>
            <p className="text-lingo-body text-lg">Start free. Upgrade when you are ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {pricingPlans.map((plan, i) => (
              <div
                key={plan.id}
                className="rounded-2xl p-7 border relative overflow-hidden"
                style={
                  plan.highlighted
                    ? { background: '#0F766E', borderColor: '#0F766E' }
                    : { background: '#fff', borderColor: '#E5E7EB' }
                }
              >
                {!plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: i === 0 ? '#0F766E' : '#FF6B00' }} />
                )}
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap" style={{ background: '#FF6B00', color: '#fff' }}>BEST VALUE</span>
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                  {plan.price > 0 && <span className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-lingo-muted'}`}>/{plan.period}</span>}
                </div>
                <p className={`text-sm mb-5 leading-relaxed ${plan.highlighted ? 'text-white/70' : 'text-lingo-muted'}`}>{plan.description}</p>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${plan.highlighted ? 'text-white/85' : 'text-lingo-body'}`}>
                      <span className="mt-0.5 shrink-0 font-bold" style={{ color: plan.highlighted ? '#fff' : '#0F766E' }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm min-h-[44px] flex items-center justify-center ${
                    plan.highlighted
                      ? 'bg-lingo-red hover:bg-lingo-red-dark text-white'
                      : 'border border-lingo-teal text-lingo-teal hover:bg-teal-50'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing" className="text-lingo-teal hover:text-lingo-red text-sm font-medium transition-colors">See full pricing details →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: '#FF6B00' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-3">Ready to speak real Mandarin?</h2>
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
