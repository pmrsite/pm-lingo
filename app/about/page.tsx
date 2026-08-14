import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import WaveDivider from '@/components/ui/WaveDivider'

export const metadata = {
  title: 'About — PM-Lingo',
  description: 'PM-Lingo is built for international learners who need practical Mandarin — not textbook Chinese.',
}

const stats = [
  { num: '50+', label: 'Real-life missions' },
  { num: '4',   label: 'AI teacher personalities' },
  { num: '14',  label: 'Day free trial' },
]

const values = [
  { icon: '🎯', title: 'Situation first',  body: 'We start with the real scenario — ordering food, taking a taxi, meeting a client. Language is the tool, not the lesson.', accent: '#FF6B00' },
  { icon: '🤝', title: 'Cultural fluency', body: 'Every mission includes regional notes covering Mainland China, Taiwan, Malaysia, and international contexts — because context changes meaning.', accent: '#0F766E' },
  { icon: '🤖', title: 'AI as your coach', body: 'Our AI tutor adapts to your pace, corrects your tones, and gives personalised feedback — available 24/7, without judgment.', accent: '#E0006A' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-20 pb-12 px-4" style={{ backgroundColor: '#0F766E' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
                Our Story
              </div>
              <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(34px, 5vw, 54px)', lineHeight: 1.08 }}>
                <span style={{ color: '#FF6B00' }}>Mandarin</span> for the
                <br />
                real world
              </h1>
              <p className="text-white/80 text-xl leading-relaxed">
                PM-Lingo was built for international learners who need practical Mandarin — not academic Chinese.
                Whether you are travelling, working with Chinese colleagues, or building relationships in
                Chinese-speaking communities, we help you communicate with confidence.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center border border-white/30 rounded-2xl p-6 bg-white/10">
                  <div className="text-3xl font-bold mb-1" style={{ color: '#FF6B00' }}>{s.num}</div>
                  <div className="text-sm text-white/80 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="teal-to-white" shape="arch" />

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Our Mission</SectionLabel>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <h2 className="font-bold text-lingo-text" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.2 }}>
              Language learning
              <br />
              <span style={{ color: '#FF6B00' }}>that respects your time</span>
            </h2>
            <p className="text-lingo-body text-lg leading-relaxed pt-2">
              We believe Mandarin should be learned through real-life experience, not textbook repetition.
              Every mission in PM-Lingo is built around a situation you will actually face — with the vocabulary,
              dialogue, and cultural context to handle it confidently.
            </p>
          </div>
        </div>
      </section>

      <WaveDivider variant="white-to-soft-teal" shape="slope" />

      {/* Values */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F0FDFA' }}>
        <div className="max-w-6xl mx-auto">
          <SectionLabel center>How we think</SectionLabel>
          <h2 className="font-bold text-lingo-text text-center mb-12" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.2 }}>Built on three principles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-gray-200 rounded-2xl p-8 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: v.accent }} />
                <div className="text-3xl mb-4 mt-2">{v.icon}</div>
                <h3 className="font-bold text-xl mb-3" style={{ color: v.accent }}>{v.title}</h3>
                <p className="text-lingo-body text-base leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider variant="soft-teal-to-white" shape="valley" />

      {/* Why + Team */}
      <section className="py-20 px-4">
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

      <WaveDivider variant="white-to-orange" shape="arch" />

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#FF6B00' }}>
        <h2 className="text-4xl font-bold text-white mb-4">Start your first mission today</h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">14 days free. No credit card required. Cancel anytime.</p>
        <Link href="/auth/signup" className="inline-block bg-white font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors" style={{ color: '#FF6B00' }}>
          Try free for 14 days →
        </Link>
      </section>

      <WaveDivider variant="orange-to-teal" shape="valley" />
    </div>
  )
}
