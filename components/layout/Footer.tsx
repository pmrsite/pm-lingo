import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-lingo-navy text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xl font-bold">PM-Lingo</span>
              <span className="w-2 h-2 rounded-full bg-lingo-red" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Master real-world Chinese through mission-based learning, AI tutors, and human coaches.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Learn</h3>
            <ul className="space-y-2">
              {[
                { href: '/courses/chinese-survival-accelerator', label: 'Chinese Survival Accelerator' },
                { href: '/pinyin-lab', label: 'Smart Pinyin Lab' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/teachers', label: 'Teachers' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/refund', label: 'Refund Policy' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PM-Lingo. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
