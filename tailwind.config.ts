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
        // ── Primary Brand: PM Teal ────────────────────────────────────
        'lingo-navy':          '#0F766E',
        'lingo-navy-dark':     '#0B625C',
        'lingo-navy-light':    '#157A73',

        // ── Secondary: Aqua ──────────────────────────────────────────
        'lingo-secondary':       '#64C4B9',
        'lingo-secondary-hover': '#F0FDFA',

        // ── CTA: Magenta ─────────────────────────────────────────────
        'lingo-magenta':        '#C21883',
        'lingo-magenta-dark':   '#A91470',
        'lingo-magenta-soft':   '#FBE8F4',

        // ── Legacy orange (alias — minimise use) ─────────────────────
        'lingo-red':       '#FF6B00',
        'lingo-red-dark':  '#E85D04',
        'lingo-red-light': '#FF8C38',

        // ── Energy: Yellow ───────────────────────────────────────────
        'lingo-yellow':      '#FFD24A',
        'lingo-yellow-soft': '#FFF5C7',

        // ── Calm: Lavender ───────────────────────────────────────────
        'lingo-lavender':       '#DDD4F4',
        'lingo-lavender-light': '#F1ECFA',

        // ── AI/Interaction: Aqua ─────────────────────────────────────
        'lingo-aqua':      '#18C7B5',
        'lingo-aqua-soft': '#E8FAF7',

        // ── Achievement: Gold ────────────────────────────────────────
        'lingo-gold':      '#F6C453',
        'lingo-gold-bg':   '#FFF8E1',
        'lingo-gold-text': '#8A6415',

        // ── Status ───────────────────────────────────────────────────
        'lingo-success':      '#22C55E',
        'lingo-success-soft': '#ECFDF5',
        'lingo-warning':      '#F59E0B',
        'lingo-error':        '#EF4444',

        // ── Backgrounds ──────────────────────────────────────────────
        'lingo-surface':   '#FCFBF8',
        'lingo-card':      '#FFFFFF',
        'lingo-bg-alt':    '#F5F7F8',
        'lingo-teal-soft': '#F0FDFA',

        // ── Typography ───────────────────────────────────────────────
        'lingo-text':      '#171717',
        'lingo-heading-2': '#252525',
        'lingo-body':      '#596273',
        'lingo-muted':     '#70798A',
        'lingo-disabled':  '#9AA1AE',

        // ── Borders ──────────────────────────────────────────────────
        'lingo-border':       '#E7E5EA',
        'lingo-border-hover': '#D1CDD8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'lingo-hero':     'linear-gradient(160deg, #0F766E 0%, #0d6b64 55%, #0B625C 100%)',
        'lingo-progress': 'linear-gradient(90deg, #0F766E 0%, #18C7B5 100%)',
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
