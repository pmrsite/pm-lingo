import Link from 'next/link'
import { missions } from '@/data/missions'
import WaveDivider from '@/components/ui/WaveDivider'
import CourseCurriculum from '@/components/ui/CourseCurriculum'

export const metadata = {
  title: 'Mandarin Survival Accelerator — PM-Lingo',
  description: 'Master practical Mandarin through 50 real-world missions. From greetings to business conversations.',
}

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

export default function CoursePage() {
  return (
    <div className="flex flex-col">

      {/* ── Teal Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0F766E' }} className="pt-20 pb-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <span className="text-sm font-semibold text-white">Beginner to Intermediate</span>
          </div>
          <h1 className="font-bold text-white mb-5" style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.05 }}>
            <span style={{ color: '#FF6B00' }}>Mandarin</span> Survival Accelerator
          </h1>
          <p className="text-xl mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 680 }}>
            50 mission-based lessons covering every real-world situation you will encounter in China, Taiwan, Malaysia,
            or any Mandarin-speaking community. No textbooks. Just practical Mandarin that works.
          </p>
          <div className="flex flex-wrap gap-5 text-sm mb-10" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <span>🎯 50 missions (5 available now)</span>
            <span>⏱ 20–30 min per mission</span>
            <span>🤖 AI tutor included</span>
            <span>📄 PDF downloads</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/signup"
              className="bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-8 py-4 rounded-xl transition-colors text-center min-h-[52px] inline-flex items-center justify-center"
            >
              Start Free — Missions 1–3 Free
            </Link>
            <Link
              href="/student/mission/greetings"
              className="font-semibold px-8 py-4 rounded-xl transition-colors text-center min-h-[52px] inline-flex items-center justify-center"
              style={{ border: '2px solid rgba(255,255,255,0.5)', color: '#fff' }}
            >
              Preview Mission 1
            </Link>
          </div>
        </div>
      </section>

      {/* Wave: teal → white */}
      <WaveDivider variant="teal-to-white" shape="arch" />

      {/* ── What You Will Learn ────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-lingo-text mb-10" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.2 }}>What you will learn</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {whatYouLearn.map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-lingo-teal transition-colors">
                <span className="mt-0.5 flex-shrink-0 font-bold text-lingo-teal">✓</span>
                <span className="text-lingo-body text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: white → soft-teal */}
      <WaveDivider variant="white-to-soft-teal" shape="slope" />

      {/* ── Course Curriculum ─────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: '#F0FDFA' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-lingo-text mb-10" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.2 }}>Course curriculum</h2>
          <CourseCurriculum missions={missions} />
        </div>
      </section>

      {/* Wave: soft-teal → white */}
      <WaveDivider variant="soft-teal-to-white" shape="valley" />

      {/* ── Trust badges ───────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-lingo-muted">
            {['✓ Cancel anytime', '✓ Works on all devices', '✓ 14-day free trial', '✓ No credit card required'].map((b) => (
              <span key={b} className="flex items-center gap-1.5 font-medium">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: white → orange */}
      <WaveDivider variant="white-to-orange" shape="arch" />

      {/* ── Enrol CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: '#FF6B00' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start learning today</h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.85)' }}>Missions 1–3 are completely free. No credit card required.</p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white font-bold px-10 py-4 rounded-xl text-lg transition-colors hover:bg-gray-50"
            style={{ color: '#FF6B00' }}
          >
            Enrol Free
          </Link>
        </div>
      </section>

      {/* Wave: orange → teal (into footer) */}
      <WaveDivider variant="orange-to-teal" shape="valley" />

    </div>
  )
}
