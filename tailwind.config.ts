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
        'lingo-navy': '#1a1a2e',
        'lingo-red': '#e94560',
        'lingo-red-dark': '#c73652',
        'lingo-surface': '#f8f9fa',
        'lingo-border': '#e5e7eb',
        'lingo-muted': '#6b7280',
        'lingo-text': '#0f0f23',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
