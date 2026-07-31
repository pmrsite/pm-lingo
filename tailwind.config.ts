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
        // ─── Primary Brand: PM Teal ───────────────────────────────
        'lingo-navy':          '#0F766E', // primary brand, nav, hero, footer base
        'lingo-navy-dark':     '#145E57', // footer background
        'lingo-navy-light':    '#157A73', // hero gradient end

        // ─── Secondary Brand: Aqua Teal ──────────────────────────
        'lingo-secondary':     '#64C4B9', // hover, icons, AI, progress, highlights
        'lingo-secondary-hover': '#F0FDFA', // secondary button hover bg

        // ─── CTA: PM Orange ──────────────────────────────────────
        'lingo-red':           '#FF6B00', // primary CTA buttons (kept as lingo-red for compat)
        'lingo-red-dark':      '#E85D04', // CTA hover
        'lingo-red-light':     '#FF8C38', // CTA light variant

        // ─── Achievement: PM Gold ────────────────────────────────
        'lingo-gold':          '#F6C453', // XP, badges, achievements, leaderboard
        'lingo-gold-bg':       '#FFF8E1', // XP badge background
        'lingo-gold-text':     '#B7791F', // XP badge text

        // ─── Status ──────────────────────────────────────────────
        'lingo-success':       '#22C55E', // correct answer, completed
        'lingo-warning':       '#F59E0B', // reminder, trial ending
        'lingo-error':         '#EF4444', // incorrect, error, failed

        // ─── Backgrounds ─────────────────────────────────────────
        'lingo-surface':       '#FAFAF8', // main warm-white background
        'lingo-card':          '#FFFFFF', // card background
        'lingo-bg-alt':        '#F5F7F8', // alternate sections, FAQ, stats

        // ─── Typography ──────────────────────────────────────────
        'lingo-text':          '#111827', // H1 H2 H3, primary headings
        'lingo-heading-2':     '#1F2937', // small titles, card headings
        'lingo-body':          '#4B5563', // paragraph body text
        'lingo-muted':         '#6B7280', // descriptions, labels, captions
        'lingo-disabled':      '#9CA3AF', // disabled text

        // ─── Borders ─────────────────────────────────────────────
        'lingo-border':        '#E5E7EB', // default border
        'lingo-border-hover':  '#CBD5E1', // hover border
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Hero gradient: PM Teal top → slightly lighter bottom
        'lingo-hero': 'linear-gradient(180deg, #0F766E 0%, #157A73 100%)',
        // Progress fill gradient
        'lingo-progress': 'linear-gradient(90deg, #0F766E 0%, #64C4B9 100%)',
      },
    },
  },
  plugins: [],
}
export default config
