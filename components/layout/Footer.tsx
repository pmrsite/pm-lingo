import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto relative overflow-hidden" style={{ backgroundColor: '#0F766E' }}>
      {/* Decorative Chinese character */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold leading-none"
        aria-hidden="true"
        style={{ fontSize: 240, color: 'rgba(255,255,255,0.06)', fontFamily: "'PingFang SC','Microsoft YaHei','Noto Sans SC',sans-serif" }}
      >
        语
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand + CTA */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xl font-bold text-white">PM-Lingo</span>
              <span className="w-2 h-2 rounded-full bg-lingo-red" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Master real-world Mandarin through mission-based learning, AI tutors, and human coaching.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Start your journey today
            </p>
            <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              14-day free trial · No credit card required
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-lingo-red hover:bg-lingo-red-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              Start Free Trial →
            </Link>
          </div>

          {/* Learn + Teachers */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Learn</h3>
            <ul className="space-y-2.5 mb-8">
              {[
                { href: '/courses/chinese-survival-accelerator', label: 'Mandarin Survival Accelerator' },
                { href: '/pinyin-lab', label: 'Pinyin Lab' },
                { href: '/pricing',   label: 'Pricing' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Teachers</h3>
            <ul className="space-y-2.5">
              <li><Link href="/teachers" className="footer-link text-sm">AI Teachers</Link></li>
              <li><Link href="/teachers" className="footer-link text-sm">Human Teachers</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/about',   label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/terms',   label: 'Terms of Service' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/refund',  label: 'Refund Policy' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 text-center text-sm"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)' }}
        >
          © {new Date().getFullYear()} PM-Lingo · Built by PM Resources
        </div>
      </div>
    </footer>
  )
}
