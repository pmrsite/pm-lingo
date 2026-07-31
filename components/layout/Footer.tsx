import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ backgroundColor: '#145E57' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xl font-bold text-white">PM-Lingo</span>
              <span className="w-2 h-2 rounded-full bg-lingo-secondary" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#E5E7EB' }}>
              Master real-world Chinese through mission-based learning,
              AI tutors, and human coaches.
            </p>
          </div>

          {/* Learn column */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Learn</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/courses/chinese-survival-accelerator', label: 'Chinese Survival Accelerator' },
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
          style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            color: '#CBD5E1',
          }}
        >
          © {new Date().getFullYear()} PM-Lingo · Built by PM Resources
        </div>
      </div>
    </footer>
  )
}
