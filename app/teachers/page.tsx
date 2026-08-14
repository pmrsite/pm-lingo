import { aiTeachers } from '@/data/aiTeachers'
import Link from 'next/link'
import WaveDivider from '@/components/ui/WaveDivider'

export const metadata = { title: 'Teachers — PM-Lingo' }

const teacherAccents: Record<string, { accent: string; textColor: string; emoji: string; softBg: string }> = {
  mei: { accent: '#0F766E', textColor: '#0F766E', emoji: '🧘', softBg: '#F0FDFA' },
  lin: { accent: '#E0006A', textColor: '#C2005C', emoji: '✨',       softBg: '#FDF2F8' },
  jun: { accent: '#2B2E63', textColor: '#2B2E63', emoji: '📚', softBg: '#EEEEF8' },
  kai: { accent: '#FF6B00', textColor: '#E85D04', emoji: '🎯', softBg: '#FFF4EC' },
}

export default function TeachersPage() {
  return (
    <div className="flex flex-col">

      {/* ── Soft-teal Hero ──────────────────────────────────────── */}
      <section style={{ background: '#F0FDFA' }} className="pt-16 pb-10 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="w-6 h-0.5 rounded-full inline-block bg-lingo-teal" />
            <span className="text-sm font-bold uppercase tracking-widest text-lingo-teal">Your Teachers</span>
            <span className="w-6 h-0.5 rounded-full inline-block bg-lingo-teal" />
          </div>
          <h1 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.08 }}>Meet your AI teachers</h1>
          <p className="text-lingo-body text-xl max-w-xl mx-auto">
            Each AI teacher has a unique personality and teaching style. You will choose two —
            a primary coach and a practice partner.
          </p>
        </div>
      </section>

      {/* Wave: soft-teal → white */}
      <WaveDivider variant="soft-teal-to-white" shape="valley" />

      {/* ── AI Teachers Grid ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiTeachers.map((t) => {
              const a = teacherAccents[t.id] ?? teacherAccents.mei
              return (
                <div key={t.id} className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="h-1.5" style={{ background: a.accent }} />
                  <div className="p-8">
                    <div className="flex items-start gap-5 mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                        style={{ background: a.softBg }}
                      >
                        {a.emoji}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-0.5" style={{ color: a.textColor }}>{t.name}</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-lingo-muted capitalize">{t.gender}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-sm font-semibold" style={{ color: a.textColor }}>{t.speciality}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: 'Personality',    value: t.personality },
                        { label: 'Teaching Style', value: t.teachingStyle },
                        { label: 'Voice Style',    value: t.voiceStyle },
                      ].map((row) => (
                        <div key={row.label}>
                          <h3 className="text-xs font-semibold uppercase tracking-wider mb-1 text-lingo-muted">{row.label}</h3>
                          <p className="text-sm text-lingo-body leading-relaxed">{row.value}</p>
                        </div>
                      ))}

                      <button
                        className="w-full text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-200 text-lingo-muted hover:border-lingo-teal hover:text-lingo-teal transition-colors mt-2"
                        disabled
                      >
                        🎤 Voice demo coming soon
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wave: white → soft-teal */}
      <WaveDivider variant="white-to-soft-teal" shape="slope" />

      {/* ── Human Teachers ─────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: '#F0FDFA' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="w-6 h-0.5 rounded-full inline-block bg-lingo-teal" />
            <span className="text-sm font-bold uppercase tracking-widest text-lingo-teal">Human Coaches</span>
            <span className="w-6 h-0.5 rounded-full inline-block bg-lingo-teal" />
          </div>
          <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', lineHeight: 1.2 }}>Human teachers — coming soon</h2>
          <p className="text-lingo-body text-lg mb-8 leading-relaxed">
            Book 1-on-1 sessions with certified Mandarin teachers for real conversation practice,
            pronunciation coaching, and accountability.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['📅 Live scheduling', '🎤 Pronunciation coaching', '✅ Progress tracking', '💬 Personalised feedback'].map((b) => (
              <div key={b} className="rounded-xl px-5 py-3 text-sm font-medium bg-white border border-lingo-border text-lingo-body">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: soft-teal → white */}
      <WaveDivider variant="soft-teal-to-white" shape="arch" />

      {/* Wave: white → orange */}
      <WaveDivider variant="white-to-orange" shape="arch" />

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: '#FF6B00' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Start learning with your AI teacher today</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>14-day free trial. No credit card required.</p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
            style={{ color: '#FF6B00' }}
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Wave: orange → teal (into footer) */}
      <WaveDivider variant="orange-to-teal" shape="valley" />

    </div>
  )
}
