import Link from 'next/link'
import Wave from '@/components/ui/Wave'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'About — PM-Lingo',
  description: 'PM-Lingo is built for international learners who need practical Chinese — not textbook Chinese.',
}

const stats = [
  { num: '50', label: 'Real-life missions' },
  { num: '4', label: 'AI teacher personalities' },
  { num: '14', label: 'Day free trial' },
]

const values = [
  { icon: '🎯', title: 'Situation first', body: 'We start with the real scenario — ordering food, taking a taxi, meeting a client. Language is the tool, not the lesson.' },
  { icon: '🤝', title: 'Cultural fluency', body: 'Every mission includes regional notes covering Mainland China, Taiwan, Malaysia, and international contexts — because context changes meaning.' },
  { icon: '🤖', title: 'AI as your coach', body: 'Our AI tutor adapts to your pace, corrects your tones, and gives personalised feedback — available 24/7, without judgment.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-white pt-20 pb-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <h1 className="font-bold text-lingo-text mb-6 leading-tight" style={{ fontSize: 'clamp(34px, 5vw, 54px)', lineHeight: 1.08 }}>
                Chinese for the
                <br />
                <span className="text-lingo-navy">real world</span>
              </h1>
              <p className="text-lingo-body text-xl leading-relaxed">
                PM-Lingo was built for international learners who need practical Chinese — not academic Chinese.
                Whether you are travelling, working with Chinese colleagues, or building relationships in
                Chinese-speaking communities, we help you communicate with confidence.
              </p>
            </div>
            <div className="relative hidden md:block">
              <div
                className="absolute inset-0 rounded-3xl"
                style={{ background: 'radial-gradient(circle at 60% 40%, #E8FAF8 0%, #F0FDFA 60%, transparent 100%)' }}
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-3 gap-4 py-8">
                {stats.map((s) => (
                  <div key={s.label} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-lingo-border">
                    <div className="text-3xl font-bold text-lingo-navy mb-1">{s.num}</div>
                    <div className="text-sm text-lingo-body leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile stats */}
      <section className="md:hidden px-4 pb-8">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center bg-lingo-aqua-soft rounded-2xl p-5">
              <div className="text-2xl font-bold text-lingo-navy mb-1">{s.num}</div>
              <div className="text-sm text-lingo-body leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Wave from="#FFFFFF" to="#FCFBF8" />

      {/* Mission */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: '#FCFBF8' }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle, #D1CDD8 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="max-w-6xl mx-auto relative">
          <SectionLabel>Our Mission</SectionLabel>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <h2 className="font-bold text-lingo-text leading-tight" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.2 }}>
              Language learning
              <br />
              <span className="text-lingo-navy">that respects your time</span>
            </h2>
            <p className="text-lingo-body text-lg leading-relaxed pt-2">
              We believe Chinese should be learned through real-life experience, not textbook repetition.
              Every mission in PM-Lingo is built around a situation you will actually face — with the vocabulary,
              dialogue, and cultural context to handle it confidently.
            </p>
          </div>
        </div>
      </section>

      <Wave from="#FCFBF8" to="#E8FAF7" flip />

      {/* Values */}
      <section className="py-20 px-4" style={{ backgroundColor: '#E8FAF7' }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel center>How we think</SectionLabel>
          <h2 className="font-bold text-lingo-text text-center mb-12" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.2 }}>Built on three principles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-8 shadow-sm border border-white">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-lingo-navy text-xl mb-3">{v.title}</h3>
                <p className="text-lingo-body text-base leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#E8FAF7" to="#FCFBF8" />

      {/* Why mission-based + Built by PM Resources */}
      <section className="py-20 px-4" style={{ backgroundColor: '#FCFBF8' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>The Approach</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.25 }}>Why mission-based learning?</h2>
            <p className="text-lingo-body text-lg leading-relaxed">
              Traditional language courses teach grammar rules first and hope students eventually use them.
              PM-Lingo flips this: we start with the situation — ordering food, taking a taxi, finding a
              toilet — and teach you exactly what you need to succeed in that moment. Grammar becomes a
              tool, not an obstacle.
            </p>
          </div>
          <div>
            <SectionLabel>The Team</SectionLabel>
            <h2 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.25 }}>Built by PM Resources</h2>
            <p className="text-lingo-body text-lg leading-relaxed">
              PM-Lingo is developed by PM Resources, a training and education company based in Malaysia.
              With years of experience delivering professional training across Southeast Asia, we understand
              what practical learning looks like. PM-Lingo is our answer to the question: what if language
              learning was as focused and results-driven as professional training?
            </p>
          </div>
        </div>
      </section>

      <Wave from="#FCFBF8" to="#C21883" />

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#C21883' }}>
        <h2 className="text-4xl font-bold text-white mb-4">Start your first mission today</h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">14 days free. No credit card required. Cancel anytime.</p>
        <Link href="/auth/signup" className="inline-block bg-white font-bold px-8 py-3 rounded-xl hover:bg-lingo-magenta-soft transition-colors" style={{ color: '#C21883' }}>
          Try free for 14 days →
        </Link>
      </section>
    </div>
  )
}
