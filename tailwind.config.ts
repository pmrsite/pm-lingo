import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary — deep teal (navbars, headers, key UI)
        'lingo-navy':      '#0F766E',
        'lingo-navy-dark': '#0a5a54',
        'lingo-navy-light':'#14948b',
        // Secondary — soft teal (accents, badges, highlights)
        'lingo-secondary': '#64C4B9',
        // Accent — orange (CTAs, hover states, important buttons)
        'lingo-red':       '#F97316',
        'lingo-red-dark':  '#EA6C0A',
        'lingo-red-light': '#fb9a52',
        // Surface / Background
        'lingo-surface':   '#FAFAF8',
        'lingo-border':    '#e5e7eb',
        // Typography
        'lingo-text':      '#111827',
        'lingo-muted':     '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
