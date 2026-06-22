export const metadata = { title: 'Privacy Policy — PM-Lingo' }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-lingo-navy mb-2">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-10">Last updated: June 2026</p>
      <div className="prose text-gray-600 space-y-6">
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">Information We Collect</h2><p>We collect information you provide directly, such as your name, email address, and payment information. We also collect usage data to improve your learning experience.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">How We Use Your Information</h2><p>We use your information to provide and improve our services, send service communications, process payments, and personalise your learning experience.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">Data Sharing</h2><p>We do not sell your personal data. We share data only with service providers necessary to operate PM-Lingo (e.g. Stripe for payments, Supabase for data storage).</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">Cookies</h2><p>We use cookies and similar technologies to maintain your session, remember preferences, and analyse usage patterns.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">Your Rights</h2><p>You have the right to access, correct, or delete your personal data. Contact us at privacy@pm-lingo.com to exercise these rights.</p></section>
        <section><h2 className="text-xl font-bold text-lingo-navy mb-2">Contact</h2><p>For privacy enquiries: privacy@pm-lingo.com</p></section>
      </div>
    </div>
  )
}
