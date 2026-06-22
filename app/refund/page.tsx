export const metadata = { title: 'Refund Policy — PM-Lingo' }

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-lingo-navy mb-2">Refund Policy</h1>
      <p className="text-gray-400 text-sm mb-10">Last updated: June 2026</p>
      <div className="prose text-gray-600 space-y-6">
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">14-Day Free Trial</h2><p>All new accounts include a 14-day free trial. No charge is made during this period and you can cancel at any time.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">Monthly Subscriptions</h2><p>Monthly subscribers may cancel at any time. Your access continues until the end of the current billing period. No partial refunds are provided for unused days in a monthly period.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">Annual Subscriptions</h2><p>Annual subscribers may request a full refund within 30 days of purchase if they have not completed more than 3 missions. After 30 days, no refunds are provided.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">Teacher Sessions</h2><p>Booked teacher sessions may be cancelled up to 24 hours before the session start time for a full refund. Cancellations within 24 hours are non-refundable.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">How to Request a Refund</h2><p>Contact us at billing@pm-lingo.com with your account email and reason for refund. We will process eligible refunds within 5–10 business days.</p></section>
      </div>
    </div>
  )
}
