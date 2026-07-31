import Link from 'next/link'
import { pricingPlans } from '@/data/pricing'
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
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-20 pb-12 px-4 text-center border-b border-gray-100">
        <SectionLabel center>Pricing</SectionLabel>
        <h1 className="font-bold text-lingo-text mb-4" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 1.08 }}>Simple, honest pricing</h1>
        <p className="text-lingo-body text-xl max-w-2xl mx-auto">
          No hidden fees. No complicated tiers. Start free and upgrade when you are ready.
        </p>
      </section>

      {/* Plans */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 border flex flex-col ${
                  plan.highlighted ? 'scale-105 shadow-xl' : 'shadow-sm'
                }`}
                style={
                  plan.highlighted
                    ? { background: '#0F766E', borderColor: '#0F766E' }
                    : { background: '#fff', borderColor: '#E5E7EB' }
                }
              >
                {plan.highlighted && (
                  <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 self-start" style={{ background: '#F6C453', color: '#5C4300' }}>
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
                      <span className={`mt-0.5 flex-shrink-0 font-bold ${plan.highlighted ? 'text-white' : 'text-lingo-navy'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center font-bold px-6 py-3 rounded-xl transition-colors min-h-[44px] flex items-center justify-center ${
                    plan.highlighted
                      ? 'bg-lingo-red hover:bg-lingo-red-dark text-white'
                      : 'border-2 border-lingo-navy text-lingo-navy hover:bg-gray-50'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionLabel center>Questions</SectionLabel>
          <h2 className="font-bold text-lingo-text text-center mb-12" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.2 }}>Frequently asked questions</h2>
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

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#FF6B00' }}>
        <h2 className="text-4xl font-bold text-white mb-4">Still have questions?</h2>
        <p className="text-white/80 text-lg mb-6 max-w-xl mx-auto">Our team is happy to help. Reach out and we will get back to you within one business day.</p>
        <Link href="/contact" className="inline-block bg-white text-lingo-red font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
          Contact us →
        </Link>
      </section>
    </div>
  )
}
