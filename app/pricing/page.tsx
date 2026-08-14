import Link from 'next/link'
import { pricingPlans } from '@/data/pricing'
import WaveDivider from '@/components/ui/WaveDivider'

export const metadata = {
  title: 'Pricing — PM-Lingo',
  description: 'Simple, honest pricing for Mandarin language learning. Start free, upgrade anytime.',
}

const faqs = [
  { q: 'What is included in the free trial?', a: 'You get full access to Missions 1–3, limited AI tutor sessions, and 3 quiz attempts per mission for 14 days. No credit card required.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Monthly subscribers can cancel at any time and retain access until the end of their billing period. Annual subscribers can request a refund within 30 days.' },
  { q: 'How are teacher sessions priced?', a: 'Teacher sessions are priced separately based on duration (30, 60, or 90 minutes) and the teacher’s tier. Annual plan includes 2 free sessions.' },
  { q: 'What happens when new missions are released?', a: 'All paying subscribers get immediate access to new missions as they are released. Annual subscribers get early access before public release.' },
  { q: 'Is there a student or group discount?', a: 'Yes. Contact us at hello@pm-lingo.com for group pricing for schools, companies, or cohorts of 5 or more learners.' },
  { q: 'Can I switch between monthly and annual?', a: 'Yes. You can upgrade from monthly to annual at any time and we will prorate the difference.' },
]

const planAccents = ['#0F766E', '#0F766E', '#FF6B00']

export default function PricingPage() {
  return (
    <div className="flex flex-col">

      {/* ── Teal Hero ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#0F766E' }} className="pt-20 pb-8 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-5 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.7)' }}>PRICING</span>
            <span className="w-5 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
          </div>
          <h1 className="font-bold text-white mb-4" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 1.08 }}>
            Simple, honest pricing.
          </h1>
          <p className="text-xl" style={{ color: 'rgba(255,255,255,0.82)', maxWidth: 460, margin: '0 auto' }}>
            No hidden fees. Start free and upgrade when you’re ready.
          </p>
        </div>
      </section>

      {/* Wave: teal → white — cards overlap slightly */}
      <WaveDivider variant="teal-to-white" shape="arch" />

      {/* ── Plans ───────────────────────────────────────────────────────────── */}
      <section className="px-4 -mt-6 pb-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan, i) => (
              <div
                key={plan.id}
                className="rounded-2xl p-8 border flex flex-col relative overflow-hidden shadow-sm"
                style={
                  plan.highlighted
                    ? { background: '#0F766E', borderColor: '#0F766E', boxShadow: '0 8px 32px rgba(15,118,110,0.25)' }
                    : { background: '#fff', borderColor: '#E5E7EB' }
                }
              >
                {!plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: planAccents[i] }} />
                )}
                {plan.highlighted && (
                  <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 self-start" style={{ background: '#FF6B00', color: '#fff' }}>
                    MOST POPULAR
                  </div>
                )}
                <h2 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>{plan.name}</h2>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-lingo-muted'}`}>/{plan.period}</span>
                  )}
                </div>
                <p className={`text-base mb-6 ${plan.highlighted ? 'text-white/70' : 'text-lingo-muted'}`}>{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-base flex items-start gap-2 ${plan.highlighted ? 'text-white/85' : 'text-lingo-body'}`}>
                      <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: plan.highlighted ? '#fff' : planAccents[i] }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center font-bold px-6 py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-center ${
                    plan.highlighted
                      ? 'bg-lingo-red hover:bg-lingo-red-dark text-white'
                      : 'border-2 border-lingo-teal text-lingo-teal hover:bg-teal-50'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-lingo-muted">
            {['✓ Cancel anytime', '✓ Secure payments', '✓ Works on all devices', '✓ Privacy protected'].map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <span className="text-lingo-teal font-bold">{b.slice(0, 1)}</span>
                <span>{b.slice(2)}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-0.5 rounded-full inline-block bg-lingo-teal" />
              <span className="text-sm font-bold uppercase tracking-widest text-lingo-teal">Questions</span>
              <span className="w-6 h-0.5 rounded-full inline-block bg-lingo-teal" />
            </div>
            <h2 className="font-bold text-lingo-text" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.2 }}>Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-lingo-text text-lg mb-2">{faq.q}</h3>
                <p className="text-lingo-body leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: white → orange */}
      <WaveDivider variant="white-to-orange" shape="arch" />

      {/* ── Conversion CTA ────────────────────────────────────────────────── */}
      <section className="py-20 px-4 text-center" style={{ background: '#FF6B00' }}>
        <h2 className="text-4xl font-bold text-white mb-4">Ready to speak real <span style={{ color: 'rgba(255,255,255,0.92)' }}>Mandarin</span>?</h2>
        <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 480, margin: '0 auto 2rem' }}>
          Start your free 14-day trial — no credit card required.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block bg-white font-bold px-8 py-3.5 rounded-xl text-base hover:bg-gray-50 transition-colors"
          style={{ color: '#FF6B00' }}
        >
          Start Free Trial
        </Link>
      </section>

      {/* Wave: orange → teal (into footer) */}
      <WaveDivider variant="orange-to-teal" shape="valley" />

    </div>
  )
}
