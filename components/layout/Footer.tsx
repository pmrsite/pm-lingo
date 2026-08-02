import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto relative overflow-hidden" style={{ backgroundColor: '#0C4A45' }}>
      {/* Decorative oversized Chinese character */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none font-bold leading-none"
        aria-hidden="true"
        style={{ fontSize: 240, color: 'rgba(255,255,255,0.05)', fontFamily: "'PingFang SC','Microsoft YaHei','Noto Sans SC',sans-serif" }}
      >
        语
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xl font-bold text-white">PM-Lingo</span>
              <span className="w-2 h-2 rounded-full bg-lingo-red" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: '#E5E7EB' }}>
              Master real-world Mandarin through mission-based learning,
              AI tutors, and human coaches.
            </p>
            {/* Newsletter */}
            <div>
              <label htmlFor="footer-email" className="sr-only">Email address for updates</label>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.55)' }}>Get learning tips</p>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 rounded-lg px-3 py-2 text-sm border-0 outline-none"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
                />
                <button
                  type="button"
                  className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors bg-lingo-red hover:bg-lingo-red-dark text-white"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Learn column */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Learn</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/courses/chinese-survival-accelerator', label: 'Mandarin Survival Accelerator' },
                { href: '/pinyin-lab',  label: 'Smart Pinyin Lab' },
                { href: '/pricing',    label: 'Pricing' },
                { href: '/teachers',   label: 'Teachers' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Company</h3>
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

        {/* Divider + copyright */}
        <div
          className="mt-12 pt-6 text-center text-sm"
          style={{ borderTop: '1px solid rgba(255,255,255,0.15)', color: '#E5E7EB' }}
        >
          © {new Date().getFullYear()} PM-Lingo · Built by PM Resources
        </div>
      </div>
    </footer>
  )
}
