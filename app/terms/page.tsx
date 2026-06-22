export const metadata = { title: 'Terms of Service — PM-Lingo' }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-lingo-navy mb-2">Terms of Service</h1>
      <p className="text-gray-400 text-sm mb-10">Last updated: June 2026</p>
      <div className="prose text-gray-600 space-y-6">
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">1. Acceptance of Terms</h2><p>By accessing and using PM-Lingo, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">2. User Accounts</h2><p>You must create an account to access PM-Lingo courses. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">3. Subscriptions and Payments</h2><p>Subscription fees are billed in advance on a monthly or annual basis. All payments are processed securely through Stripe. Prices are listed in USD unless otherwise stated.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">4. Intellectual Property</h2><p>All content on PM-Lingo, including lessons, audio, and materials, is owned by PM Resources and protected by copyright. You may not reproduce, distribute, or create derivative works without our explicit consent.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">5. Acceptable Use</h2><p>You agree not to use PM-Lingo for any unlawful purpose or in any way that could harm other users or the platform.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">6. Termination</h2><p>We reserve the right to suspend or terminate accounts that violate these terms. You may cancel your subscription at any time.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">7. Contact</h2><p>For questions about these terms, contact us at legal@pm-lingo.com</p></section>
      </div>
    </div>
  )
}
