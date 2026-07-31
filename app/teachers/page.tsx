import { aiTeachers } from '@/data/aiTeachers'
import Link from 'next/link'
import Wave from '@/components/ui/Wave'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata = { title: 'Teachers — PM-Lingo' }

const teacherAccents: Record<string, { bg: string; accent: string; textColor: string; emoji: string }> = {
  mei: { bg: '#F1ECFA', accent: '#DDD4F4', textColor: '#6B4FB5', emoji: '🧘' },
  lin: { bg: '#FFF5C7', accent: '#FFD24A', textColor: '#8A6415', emoji: '✨' },
  jun: { bg: '#E8FAF7', accent: '#18C7B5', textColor: '#0B625C', emoji: '📚' },
  kai: { bg: '#FBE8F4', accent: '#C21883', textColor: '#A91470', emoji: '🎯' },
}

export default function TeachersPage() {
  return (
    <div className="flex flex-col">

      {/* Page Header */}
      <section className="bg-white pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <SectionLabel center>Your Teachers</SectionLabel>
          <h1 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.08 }}>
            Meet your AI teachers
          </h1>
          <p className="text-lingo-body text-xl max-w-xl mx-auto">
            Each AI teacher has a unique personality and teaching style. You will choose two —
            a primary coach and a practice partner.
          </p>
        </div>
      </section>

      <Wave from="#FFFFFF" to="#FCFBF8" />

      {/* AI Teachers Grid */}
      <section className="py-20 px-4" style={{ background: '#FCFBF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiTeachers.map((t) => {
              const a = teacherAccents[t.id] ?? teacherAccents.mei
              return (
                <div
                  key={t.id}
                  className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: a.accent }}
                >
                  <div className="h-1.5" style={{ background: a.accent }} />
                  <div className="p-8">
                    <div className="flex items-start gap-5 mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                        style={{ background: a.bg }}
                      >
                        {a.emoji}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-0.5" style={{ color: a.textColor }}>{t.name}</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-lingo-muted capitalize">{t.gender}</span>
                          <span className="text-lingo-border">·</span>
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
                          <h3
                            className="text-xs font-semibold uppercase tracking-wider mb-1"
                            style={{ color: a.textColor, opacity: 0.75 }}
                          >
                            {row.label}
                          </h3>
                          <p className="text-sm text-lingo-body leading-relaxed">{row.value}</p>
                        </div>
                      ))}

                      <button
                        className="w-full text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-2"
                        style={{ background: a.bg, color: a.textColor }}
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

      <Wave from="#FCFBF8" to="#F1ECFA" />

      {/* Human Teachers Coming Soon */}
      <section className="py-20 px-4" style={{ background: '#F1ECFA' }}>
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel center>Human Coaches</SectionLabel>
          <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', lineHeight: 1.2 }}>
            Human teachers — coming soon
          </h2>
          <p className="text-lingo-body text-lg mb-8 leading-relaxed">
            Book 1-on-1 sessions with certified Chinese teachers for real conversation practice,
            pronunciation coaching, and accountability.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="rounded-2xl px-5 py-3 text-sm font-medium" style={{ background: '#DDD4F4', color: '#6B4FB5' }}>📅 Live scheduling</div>
            <div className="rounded-2xl px-5 py-3 text-sm font-medium" style={{ background: '#FFF5C7', color: '#8A6415' }}>🎤 Pronunciation coaching</div>
            <div className="rounded-2xl px-5 py-3 text-sm font-medium" style={{ background: '#E8FAF7', color: '#0B625C' }}>✅ Progress tracking</div>
          </div>
        </div>
      </section>

      <Wave from="#F1ECFA" to="#C21883" />

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: '#C21883' }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Start learning with your AI teacher today</h2>
          <p className="text-white/80 mb-8">14-day free trial. No credit card required.</p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white font-bold px-8 py-3.5 rounded-xl text-base hover:bg-lingo-magenta-soft transition-colors"
            style={{ color: '#C21883', boxShadow: '0 6px 24px rgba(0,0,0,0.12)' }}
          >
            Join the waitlist
          </Link>
        </div>
      </section>

    </div>
  )
}
