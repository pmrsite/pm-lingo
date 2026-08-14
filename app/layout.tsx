import type { Metadata } from 'next'
import { Inter, Noto_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Inter — variable font, all weights (400–900) available in one HTTP request.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Noto Sans — Pinyin pronunciation notation.
// latin-ext subset covers tone-marked vowels: ā á ǎ à  ǖ ǘ ǚ ǜ  ě ě ě etc.
const notoSans = Noto_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PM-Lingo — Master Real-World Mandarin',
  description: 'Learn practical Mandarin through real-life missions, practice with AI tutors, and book real teachers.',
  metadataBase: new URL('https://pm-lingo.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        Both .variable classes inject CSS custom properties onto the element:
          --font-inter      used by font-ui / font-pinyin / body CSS
          --font-noto-sans  used by font-pinyin CSS
        The body font-family is set in globals.css so CJK fallbacks are included.
      */}
      <body className={`${inter.variable} ${notoSans.variable} min-h-screen flex flex-col bg-white`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
