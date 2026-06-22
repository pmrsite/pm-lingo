import Link from 'next/link'
import { pricingPlans } from '@/data/pricing'

export const metadata = {
  title: 'Pricing — PM-Lingo',
  description: 'Simple, honest pricing for Chinese language learning. Start free, upgrade anytime.',
}

const faqs = [
  { q: 'What is included in the free trial?', a: 'You get full access to Missions 1–3, limited AI tutor sessions, and 3 quiz attempts per mission for 14 days. No credit card required.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Monthly subscribers can cancel at any time and retain access until the end of their billing period. Annual subscribers can request a refund within 30 days.' },
  { q: 'How are teacher sessions priced?', a: 'Teacher sessions are priced separately based on duration (30, 60, or 90 minutes) and the teacher\'s tier. Annual plan includes 2 free sessions.' },
  { q: 'What happens when new missions are released?', a: 'All paying subscribers get immediate access to new missions as they are released. Annual subscribers get early access before public release.' },
  { q: 'Is there a student or group discount?', a: 'Yes. Contact us at hello@pm-lingo.com for group pricing for schools, companies, or cohorts of 5 or more learners.' },
  { q: 'Can I switch between monthly and annual?', a: 'Yes. You can upgrade from monthly to annual at any time and we will prorate the difference.' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 px-4 text-center bg-lingo-surface">
        <h1 className="text-4xl font-bold text-lingo-text mb-4">Simple, honest pricing</h1>
        <p className="text-xl text-lingo-muted max-w-2xl mx-auto">No hidden fees. No complicated tiers. Start free and upgrade when you are ready.</p>
      </section>

      {/* Plans */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 border flex flex-col ${plan.highlighted ? 'bg-lingo-navy border-lingo-navy text-white ring-4 ring-lingo-red/30 scale-105' : 'bg-white border-lingo-border'}`}
              >
                {plan.highlighted && (
                  <div className="bg-lingo-red text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 self-start">MOST POPULAR</div>
                )}
                <h2 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>{plan.name}</h2>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-lingo-text'}`}>
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className={`text-sm ${plan.highlighted ? 'text-gray-400' : 'text-lingo-muted'}`}>/{plan.period}</span>
                  )}
                </div>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-gray-300' : 'text-lingo-muted'}`}>{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${plan.highlighted ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="text-green-400 mt-0.5 flex-shrink-0 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block text-center font-bold px-6 py-3 rounded-xl transition-colors ${
                    plan.highlighted
                      ? 'bg-lingo-red hover:bg-lingo-red-dark text-white'
                      : 'border-2 border-lingo-navy text-lingo-navy hover:bg-lingo-navy hover:text-white'
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-lingo-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-lingo-text text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-lingo-border p-6">
                <h3 className="font-bold text-lingo-text mb-2">{faq.q}</h3>
                <p className="text-lingo-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 px-4 text-center">
        <p className="text-lingo-muted mb-4">Still have questions?</p>
        <Link href="/(public)/contact" className="text-lingo-red hover:underline font-medium">Contact us →</Link>
      </section>
    </div>
  )
}
