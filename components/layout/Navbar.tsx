'use client'
import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/courses/chinese-survival-accelerator', label: 'Courses' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/pinyin-lab', label: 'Pinyin Lab' },
  { href: '/teachers', label: 'Teachers' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-xl font-bold text-lingo-navy">PM-Lingo</span>
            <span className="w-2 h-2 rounded-full bg-lingo-red" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-lingo-navy transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-lingo-navy transition-colors">
              Log in
            </Link>
            <Link href="/auth/signup" className="bg-lingo-red hover:bg-lingo-red-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
              Start Free Trial
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 space-y-1">
              <span className="block h-0.5 bg-gray-700" />
              <span className="block h-0.5 bg-gray-700" />
              <span className="block h-0.5 bg-gray-700" />
            </div>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block py-2 text-sm font-medium text-gray-700 hover:text-lingo-navy" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2 border-t border-gray-100 mt-2">
              <Link href="/auth/login" className="block py-2 text-sm text-gray-600">Log in</Link>
              <Link href="/auth/signup" className="block bg-lingo-red text-white text-sm font-semibold px-4 py-2 rounded-lg text-center">
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
