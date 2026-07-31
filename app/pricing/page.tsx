import Link from 'next/link'
import { pricingPlans } from '@/data/pricing'
import Wave from '@/components/ui/Wave'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata = {
  title: 'Pricing — PM-Lingo',
  description: 'Simple, honest pricing for Chinese language learning. Start free, upgrade anytime.',
}

const faqs = [
  { q: 'What is included in the free trial?', a: 'You get full access to Missions 1–3, limited AI tutor sessions, and 3 quiz attempts per mission for 14 days. No credit card required.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Monthly subscribers can cancel at any time and retain access until the end of their billing period. Annual subscribers can request a refund within 30 days.' },
  { q: 'How are teacher sessions priced?', a: "Teacher sessions are priced separately based on duration (30, 60, or 90 minutes) and the teacher's tier. Annual plan includes 2 free sessions." },
  { q: 'What happens when new missions are released?', a: 'All paying subscribers get immediate access to new missions as they are released. Annual subscribers get early access before public release.' },
  { q: 'Is there a student or group discount?', a: 'Yes. Contact us at hello@pm-lingo.com for group pricing for schools, companies, or cohorts of 5 or more learners.' },
  { q: 'Can I switch between monthly and annual?', a: 'Yes. You can upgrade from monthly to annual at any time and we will prorate the difference.' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-white pt-20 pb-4 px-4 text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0F766E 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <SectionLabel center>Pricing</SectionLabel>
        <h1 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 1.08 }}>Simple, honest pricing</h1>
        <p className="text-lingo-body text-xl max-w-2xl mx-auto">
          No hidden fees. No complicated tiers. Start free and upgrade when you are ready.
        </p>
      </section>

      <Wave from="#FFFFFF" to="#FCFBF8" />

      {/* Plans */}
      <section className="py-16 px-4" style={{ backgroundColor: '#FCFBF8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 border flex flex-col ${
                  plan.highlighted
                    ? 'text-white ring-4 ring-lingo-aqua/20 scale-105 shadow-2xl'
                    : 'bg-white border-lingo-border shadow-sm'
                }`}
                style={
                  plan.highlighted
                    ? { background: 'linear-gradient(140deg, #0F766E 0%, #0B625C 100%)', borderColor: 'transparent' }
                    : {}
                }
              >
                {plan.highlighted && (
                  <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 self-start" style={{ background: '#FFD24A', color: '#5C3200' }}>
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
                <p className={`text-base mb-6 ${plan.highlighted ? 'text-white/65' : 'text-lingo-muted'}`}>{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-base flex items-start gap-2 ${plan.highlighted ? 'text-white/80' : 'text-lingo-body'}`}>
                      <span className={`mt-0.5 flex-shrink-0 font-bold ${plan.highlighted ? 'text-lingo-aqua' : 'text-lingo-success'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center font-bold px-6 py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-center ${
                    plan.highlighted
                      ? 'bg-lingo-magenta hover:bg-lingo-magenta-dark text-white'
                      : 'border-2 border-lingo-navy text-lingo-navy hover:bg-lingo-aqua-soft'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#FCFBF8" to="#F1ECFA" />

      {/* FAQ */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F1ECFA' }}>
        <div className="max-w-4xl mx-auto">
          <SectionLabel center>Questions</SectionLabel>
          <h2 className="font-bold text-lingo-text text-center mb-12" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.2 }}>Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-lingo-border p-6 shadow-sm">
                <h3 className="font-bold text-lingo-text text-lg mb-2">{faq.q}</h3>
                <p className="text-lingo-body leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave from="#F1ECFA" to="#C21883" />

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#C21883' }}>
        <h2 className="text-4xl font-bold text-white mb-4">Still have questions?</h2>
        <p className="text-white/80 text-lg mb-6 max-w-xl mx-auto">Our team is happy to help. Reach out and we will get back to you within one business day.</p>
        <Link href="/contact" className="inline-block bg-white font-bold px-8 py-3 rounded-xl hover:bg-lingo-magenta-soft transition-colors" style={{ color: '#C21883' }}>
          Contact us →
        </Link>
      </section>
    </div>
  )
}
