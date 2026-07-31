import Link from 'next/link'
import { missions } from '@/data/missions'
import { pricingPlans } from '@/data/pricing'
import { aiTeachers } from '@/data/aiTeachers'
import Wave from '@/components/ui/Wave'
import SectionLabel from '@/components/ui/SectionLabel'

type BubbleVariant = 'teal' | 'aqua' | 'gold' | 'white'
const bubbleStyles: Record<BubbleVariant, { bg: string; text: string; sub: string; border?: string }> = {
  teal:  { bg: '#0F766E', text: '#fff',    sub: 'rgba(255,255,255,0.65)' },
  aqua:  { bg: '#64C4B9', text: '#fff',    sub: 'rgba(255,255,255,0.75)' },
  gold:  { bg: '#FFF8E1', text: '#B7791F', sub: '#B7791F' },
  white: { bg: '#fff',    text: '#111827', sub: '#6B7280', border: '#E5E7EB' },
}

function ChineseBubble({
  hanzi, pinyin, english, variant = 'teal', style,
}: {
  hanzi: string; pinyin: string; english: string;
  variant?: BubbleVariant; style?: React.CSSProperties
}) {
  const s = bubbleStyles[variant]
  return (
    <div
      className="absolute rounded-2xl px-4 py-3 shadow-lg"
      style={{ background: s.bg, border: s.border ? `1px solid ${s.border}` : 'none', ...style }}
    >
      <div className="text-xl font-bold" style={{ color: s.text }}>{hanzi}</div>
      <div className="text-xs mt-0.5" style={{ color: s.sub }}>{pinyin} · {english}</div>
    </div>
  )
}

const teacherAccents: Record<string, { bg: string; accent: string; textColor: string; emoji: string }> = {
  mei: { bg: '#F0FDFA', accent: '#64C4B9', textColor: '#0F766E', emoji: '🧘' },
  lin: { bg: '#FFF8E1', accent: '#F6C453', textColor: '#B7791F', emoji: '✨' },
  jun: { bg: '#ECFDF5', accent: '#0F766E', textColor: '#145E57', emoji: '📚' },
  kai: { bg: '#FFF3E0', accent: '#FF6B00', textColor: '#E85D04', emoji: '🎯' },
}

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-14 sm:pt-20 pb-8 px-4 overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full pointer-events-none"
          aria-hidden="true"
          style={{ width: '55%', background: 'radial-gradient(ellipse 80% 90% at 80% 50%, #E8FAF8 0%, transparent 75%)' }}
        />
        <div className="absolute top-8 left-8 w-3 h-3 rounded-full pointer-events-none" style={{ background: '#64C4B9', opacity: 0.5 }} aria-hidden="true" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
              style={{ background: '#F0FDFA', border: '1px solid rgba(100,196,185,0.35)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lingo-navy" />
              <span className="text-sm font-medium text-lingo-navy tracking-wide">Mission-Based Chinese Learning</span>
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
                style={{ boxShadow: '0 6px 20px rgba(255,107,0,0.25)' }}
              >
                Start Free Trial
              </Link>
              <Link
                href="/courses/chinese-survival-accelerator"
                className="border border-lingo-border text-lingo-heading-2 hover:border-lingo-border-hover font-medium px-8 py-3.5 rounded-xl transition-all min-h-[48px] inline-flex items-center"
              >
                Explore the Course
              </Link>
            </div>

            <p className="mt-5 text-sm text-lingo-disabled">14-day free trial · Missions 1–3 free · No credit card required</p>
          </div>

          <div className="relative flex items-center justify-center" style={{ minHeight: 380 }}>
            <div className="rounded-full" style={{ width: 260, height: 260, background: 'linear-gradient(135deg, #E0F7F5 0%, #F0FDFA 100%)' }} />
            <div className="absolute flex flex-col items-center text-center">
              <span className="font-bold" style={{ fontSize: 72, lineHeight: 1, color: '#0F766E' }}>普</span>
              <span className="text-xs text-lingo-muted mt-2 font-medium tracking-wider uppercase">Mandarin Chinese</span>
            </div>
            <ChineseBubble hanzi="你好！" pinyin="Nǐ hǎo" english="Hello" variant="teal" style={{ top: 24, left: 0 }} />
            <ChineseBubble hanzi="谢谢" pinyin="Xièxie" english="Thank you" variant="aqua" style={{ top: 48, right: -8 }} />
            <ChineseBubble hanzi="再见" pinyin="Zàijiàn" english="Goodbye" variant="white" style={{ bottom: 56, left: -8 }} />
            <ChineseBubble hanzi="对不起" pinyin="Duìbu qǐ" english="Sorry" variant="gold" style={{ bottom: 24, right: 0 }} />
            <div className="absolute w-4 h-4 rounded-full" style={{ background: '#64C4B9', opacity: 0.4, top: 8, right: '35%' }} aria-hidden="true" />
            <div className="absolute w-3 h-3 rounded-full" style={{ background: '#F6C453', opacity: 0.6, bottom: 12, left: '35%' }} aria-hidden="true" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-14 relative z-10">
          <div className="rounded-2xl p-5" style={{ background: '#FAFAF8', border: '1px solid #E5E7EB' }}>
            <div className="flex flex-wrap justify-around gap-6">
              {[
                { value: '50',     label: 'Real-Life Missions' },
                { value: '4',      label: 'AI Teacher Personalities' },
                { value: '14-Day', label: 'Free Trial' },
                { value: '100%',   label: 'Practical Mandarin' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-2xl font-bold" style={{ color: '#0F766E' }}>{stat.value}</span>
                  <span className="text-xs text-lingo-muted mt-0.5 uppercase tracking-wide">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Wave from="#FFFFFF" to="#FAFAF8" />

      {/* ── Value Pillars ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: '#FAFAF8' }}>
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

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: '🎯', bg: '#F0FDFA', title: 'Mission-Based Learning', description: 'Every mission is a real-world scenario — greetings, ordering food, taking a taxi. No filler, no fluff.' },
              { icon: '🤖', bg: '#ECFDF5', title: 'AI Tutor Practice',      description: 'Practise with four distinct AI teachers, each with a unique personality. Get instant feedback, 24/7.' },
              { icon: '👩‍🏫', bg: '#FFF8E1', title: 'Human Teacher Sessions', description: 'Book live sessions with certified coaches to fix pronunciation and build the confidence AI alone cannot give.' },
            ].map((p) => (
              <div key={p.title}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shrink-0" style={{ background: p.bg }}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-lingo-text mb-3">{p.title}</h3>
                <p className="text-lingo-body text-base leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#FAFAF8" to="#E8FAF8" />

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: '#E8FAF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel center>The Method</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>
              How it works
            </h2>
            <p className="text-lingo-body text-lg">Three steps to real Mandarin confidence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
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
              { step: '1', title: 'Choose a mission',  description: 'Pick a real-world scenario that matches your goal — from greetings to business meetings.' },
              { step: '2', title: 'Learn and practise', description: 'Study vocabulary, practise with AI tutors, and get instant feedback on every response.' },
              { step: '3', title: 'Build confidence',  description: 'Book a live session with a certified teacher to speak real Mandarin with confidence.' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-6 shrink-0 relative z-10"
                  style={{ background: 'linear-gradient(135deg, #0F766E 0%, #64C4B9 100%)' }}
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

      <Wave from="#E8FAF8" to="#FAFAF8" flip />

      {/* ── AI Teachers ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ background: '#FAFAF8' }}>
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
                <div
                  key={t.id}
                  className="rounded-2xl overflow-hidden border"
                  style={{ background: a.bg, borderColor: a.accent }}
                >
                  <div className="h-1.5" style={{ background: a.accent }} />
                  <div className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                      style={{ background: a.accent }}
                    >
                      {a.emoji}
                    </div>
                    <h3 className="font-bold mb-0.5" style={{ color: a.textColor, fontSize: 17 }}>{t.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: a.textColor, opacity: 0.7 }}>{t.speciality}</p>
                    <p className="text-sm leading-relaxed text-lingo-body">{t.personality}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/teachers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-lingo-navy hover:text-lingo-secondary transition-colors"
            >
              Meet all teachers →
            </Link>
          </div>
        </div>
      </section>

      <Wave from="#FAFAF8" to="#FAFAF8" />

      {/* ── Mission Preview ─────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ background: '#FAFAF8' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgba(15,118,110,0.1) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)',
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel center>Get Started</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>
              Your first 5 missions
            </h2>
            <p className="text-lingo-body text-lg">From zero to functional Mandarin — in real situations</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {missions.map((mission) => (
              <Link
                key={mission.id}
                href={`/student/mission/${mission.slug}`}
                className="bg-white rounded-2xl border border-lingo-border p-6 hover:border-lingo-border-hover hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, #0F766E, #64C4B9)' }} />
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl font-bold tabular-nums" style={{ color: 'rgba(107,114,128,0.30)' }}>{String(mission.number).padStart(2, '0')}</span>
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

            <div className="rounded-2xl border-2 border-dashed border-lingo-border p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl" style={{ background: '#F0FDFA' }}>🚀</div>
              <p className="text-lingo-heading-2 font-semibold text-sm mb-1">45 more missions coming</p>
              <p className="text-lingo-disabled text-xs leading-relaxed" style={{ maxWidth: 160 }}>New missions monthly. Annual members get early access.</p>
            </div>
          </div>
        </div>
      </section>

      <Wave from="#FAFAF8" to="#FFFFFF" />

      {/* ── Pricing Teaser ─────────────────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-white">
        <div
          className="absolute left-0 bottom-0 pointer-events-none"
          aria-hidden="true"
          style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(15,118,110,0.07) 0%, transparent 65%)', transform: 'translate(-35%, 35%)' }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel center>Pricing</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>Simple, honest pricing</h2>
            <p className="text-lingo-body text-lg">Start free. Upgrade when you are ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-2xl p-7 border relative"
                style={
                  plan.highlighted
                    ? { background: 'linear-gradient(140deg, #0F766E 0%, #145E57 100%)', borderColor: 'transparent' }
                    : { background: '#FAFAF8', borderColor: '#E5E7EB' }
                }
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm" style={{ background: '#F6C453', color: '#5C4300' }}>BEST VALUE</span>
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                  {plan.price > 0 && <span className={`text-sm ${plan.highlighted ? 'text-white/55' : 'text-lingo-muted'}`}>/{plan.period}</span>}
                </div>
                <p className={`text-sm mb-5 leading-relaxed ${plan.highlighted ? 'text-white/65' : 'text-lingo-muted'}`}>{plan.description}</p>
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
                  className={`block text-center font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm min-h-[44px] flex items-center justify-center ${
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
            <Link href="/pricing" className="text-lingo-navy hover:text-lingo-secondary text-sm font-medium transition-colors">See full pricing details →</Link>
          </div>
        </div>
      </section>

      <Wave from="#FFFFFF" to="#FF6B00" />

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ background: '#FF6B00' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-[12%] w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 65%)' }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-3">Ready to speak real Mandarin?</h2>
          <p className="text-white/80 mb-8 text-lg">Start your free 14-day trial — no credit card required.</p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white text-lingo-red font-bold px-8 py-3.5 rounded-xl text-base hover:bg-gray-50 transition-colors"
            style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.12)' }}
          >
            Start Free Trial
          </Link>
        </div>
      </section>

    </div>
  )
}
