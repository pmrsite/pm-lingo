import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'lingo-h1':      ['56px', { lineHeight: '1.05', fontWeight: '700' }],
        'lingo-h2':      ['42px', { lineHeight: '1.15', fontWeight: '700' }],
        'lingo-h3':      ['30px', { lineHeight: '1.3',  fontWeight: '600' }],
        'lingo-h4':      ['22px', { lineHeight: '1.4',  fontWeight: '600' }],
        'lingo-base':    ['18px', { lineHeight: '1.7',  fontWeight: '400' }],
        'lingo-sm':      ['16px', { lineHeight: '1.6',  fontWeight: '400' }],
        'lingo-caption': ['14px', { lineHeight: '1.5',  fontWeight: '400' }],
      },
      colors: {
        // ── Primary Brand: Teal ───────────────────────────────────
        'lingo-teal':          '#0F766E',
        'lingo-teal-dark':     '#0C4A45',
        'lingo-teal-soft':     '#F0FDFA',
        'lingo-teal-50':       '#F0FDFA',   // explicit hover surface alias
        'lingo-secondary':     '#64C4B9',
        'lingo-secondary-hover': '#F0FDFA',

        // ── Primary Action: Orange ────────────────────────────────
        // lingo-orange* are the canonical semantic names;
        // lingo-red* kept as aliases so existing code does not break.
        'lingo-orange':        '#FF6B00',
        'lingo-orange-dark':   '#E85D04',
        'lingo-orange-light':  '#FF8C38',
        'lingo-red':           '#FF6B00',   // legacy alias — prefer lingo-orange
        'lingo-red-dark':      '#E85D04',   // legacy alias
        'lingo-red-light':     '#FF8C38',   // legacy alias

        // ── Supporting: Navy ──────────────────────────────────────
        'lingo-navy':          '#2B2E63',
        'lingo-navy-dark':     '#1E2147',
        'lingo-navy-light':    '#3B3F8C',

        // ── Accent: Pink ──────────────────────────────────────────
        'lingo-pink':          '#E0006A',
        'lingo-pink-dark':     '#C2005C',
        'lingo-pink-soft':     '#FFE5F0',

        // ── Energy: Yellow / Gold ─────────────────────────────────
        'lingo-yellow':        '#FFD24A',
        'lingo-yellow-soft':   '#FFF5C7',
        'lingo-gold':          '#F6C453',
        'lingo-gold-bg':       '#FFF8E1',
        'lingo-gold-text':     '#8A6415',

        // ── Soft section surfaces ─────────────────────────────────
        'lingo-surface-teal':   '#F0FDFA',  // Soft Teal surface
        'lingo-surface-orange': '#FFF4EC',  // Soft Orange surface
        'lingo-soft-orange':    '#FFF4EC',  // corrected from #FFF7ED
        'lingo-soft-pink':      '#FDF2F8',
        'lingo-soft-lavender':  '#F5F3FF',
        'lingo-soft-aqua':      '#E6F7F5',

        // ── Semantic status colours ───────────────────────────────
        // These are separate from brand colours — do not use brand
        // colours (teal/orange/navy/pink) for system states.
        'lingo-success':       '#22C55E',
        'lingo-success-soft':  '#ECFDF5',
        'lingo-warning':       '#F59E0B',
        'lingo-error':         '#EF4444',

        // ── Backgrounds ───────────────────────────────────────────
        'lingo-surface':       '#FCFBF8',
        'lingo-card':          '#FFFFFF',
        'lingo-bg-alt':        '#F5F7F8',

        // ── Typography ────────────────────────────────────────────
        'lingo-text':          '#111827',
        'lingo-heading-2':     '#252525',
        'lingo-body':          '#596273',
        'lingo-muted':         '#70798A',
        'lingo-disabled':      '#9AA1AE',

        // ── Borders ───────────────────────────────────────────────
        'lingo-border':        '#E7E5EA',
        'lingo-border-hover':  '#D1CDD8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'lingo-hero':     'linear-gradient(160deg, #0F766E 0%, #0C4A45 55%, #0A3D38 100%)',
        'lingo-progress': 'linear-gradient(90deg, #FF6B00 0%, #0F766E 100%)',
      },
      borderRadius: {
        'lingo-sm': '8px',
        'lingo-md': '12px',
        'lingo-lg': '16px',
        'lingo-xl': '20px',
      },
    },
  },
  plugins: [],
}

export default config
