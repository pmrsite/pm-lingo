import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand Typography Scale ────────────────────────────────────────
      fontSize: {
        'lingo-h1':      ['56px', { lineHeight: '1.1', fontWeight: '700' }],
        'lingo-h2':      ['42px', { lineHeight: '1.2', fontWeight: '700' }],
        'lingo-h3':      ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        'lingo-body':    ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'lingo-caption': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      colors: {
        // ─── Primary Brand: PM Teal ───────────────────────────────
        // Responsibility: Brand, identity, trust
        // Never use for: CTA buttons
        'lingo-navy':          '#0F766E',
        'lingo-navy-dark':     '#145E57', // footer background
        'lingo-navy-light':    '#157A73', // hero gradient end

        // ─── Secondary Brand: Aqua Teal ──────────────────────────
        // Responsibility: AI, learning, progress, highlights
        // Never use for: Main headings
        'lingo-secondary':       '#64C4B9',
        'lingo-secondary-hover': '#F0FDFA',

        // ─── CTA: PM Orange ──────────────────────────────────────
        // Responsibility: User actions (CTA only)
        // Never use for: Body text, badges, links
        'lingo-red':       '#FF6B00',
        'lingo-red-dark':  '#E85D04',
        'lingo-red-light': '#FF8C38',

        // ─── Achievement: PM Gold ────────────────────────────────
        // Responsibility: Achievement, XP, certificates
        // Never use for: Buttons
        'lingo-gold':      '#F6C453',
        'lingo-gold-bg':   '#FFF8E1',
        'lingo-gold-text': '#B7791F',

        // ─── Status ──────────────────────────────────────────────
        'lingo-success': '#22C55E', // never use for navigation
        'lingo-warning': '#F59E0B', // never use for branding
        'lingo-error':   '#EF4444', // never use for decorative UI

        // ─── Backgrounds ─────────────────────────────────────────
        'lingo-surface': '#FAFAF8', // main warm-white bg — never use for cards
        'lingo-card':    '#FFFFFF', // cards & content surfaces — never use for hero
        'lingo-bg-alt':  '#F5F7F8', // alternate sections, FAQ, stats

        // ─── Typography ──────────────────────────────────────────
        'lingo-text':      '#111827', // H1 H2 H3 — never use for buttons
        'lingo-heading-2': '#1F2937', // small titles, card headings
        'lingo-body':      '#4B5563', // body text — never use for hero titles
        'lingo-muted':     '#6B7280', // descriptions, labels, captions
        'lingo-disabled':  '#9CA3AF', // disabled text

        // ─── Borders ─────────────────────────────────────────────
        'lingo-border':       '#E5E7EB',
        'lingo-border-hover': '#CBD5E1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'lingo-hero':     'linear-gradient(180deg, #0F766E 0%, #157A73 100%)',
        'lingo-progress': 'linear-gradient(90deg, #0F766E 0%, #64C4B9 100%)',
      },
    },
  },
  plugins: [],
}
export default config
