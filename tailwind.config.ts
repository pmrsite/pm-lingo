import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Typography Scale ──────────────────────────────────────────────
      // NOTE: lingo-body is a COLOR token — do not add a fontSize key with
      // the same name or text-lingo-body becomes ambiguous in Tailwind.
      fontSize: {
        'lingo-h1':      ['56px', { lineHeight: '1.05', fontWeight: '700' }],
        'lingo-h2':      ['42px', { lineHeight: '1.15', fontWeight: '700' }],
        'lingo-h3':      ['30px', { lineHeight: '1.3',  fontWeight: '600' }],
        'lingo-h4':      ['22px', { lineHeight: '1.4',  fontWeight: '600' }],
        'lingo-base':    ['18px', { lineHeight: '1.7',  fontWeight: '400' }],  // body text size
        'lingo-sm':      ['16px', { lineHeight: '1.6',  fontWeight: '400' }],
        'lingo-caption': ['14px', { lineHeight: '1.5',  fontWeight: '400' }],
      },
      colors: {
        // ── Primary Brand: PM Teal ────────────────────────────────────
        // Use: Logo, brand identity, navigation, trust elements, progress
        // Never: CTA buttons, body text
        'lingo-navy':          '#0F766E',
        'lingo-navy-dark':     '#145E57',  // footer background
        'lingo-navy-light':    '#157A73',  // hero gradient end

        // ── Secondary Brand: Aqua Teal ───────────────────────────────
        // Use: AI elements, learning highlights, hover states, decorative accents
        // Never: Main headings, body text
        'lingo-secondary':       '#64C4B9',
        'lingo-secondary-hover': '#F0FDFA',

        // ── CTA: PM Orange ───────────────────────────────────────────
        // Use: Primary action buttons ONLY (Start Free Trial, Upgrade, Buy)
        // Never: Links, badges, body text, decorative elements
        'lingo-red':       '#FF6B00',
        'lingo-red-dark':  '#E85D04',
        'lingo-red-light': '#FF8C38',

        // ── Achievement: PM Gold ─────────────────────────────────────
        // Use: XP, badges, achievements, certificates, rewards
        // Never: Buttons, navigation, body text
        'lingo-gold':      '#F6C453',
        'lingo-gold-bg':   '#FFF8E1',
        'lingo-gold-text': '#B7791F',

        // ── Status ───────────────────────────────────────────────────
        'lingo-success':      '#22C55E',
        'lingo-success-soft': '#ECFDF5',
        'lingo-warning':      '#F59E0B',
        'lingo-error':        '#EF4444',

        // ── Backgrounds ──────────────────────────────────────────────
        'lingo-surface':   '#FAFAF8',  // warm-white page background
        'lingo-card':      '#FFFFFF',  // cards and elevated panels
        'lingo-bg-alt':    '#F5F7F8',  // alternate section background
        'lingo-teal-soft': '#F0FDFA',  // soft teal panels, recommendation bg

        // ── Typography ───────────────────────────────────────────────
        'lingo-text':      '#111827',  // primary headings H1–H3
        'lingo-heading-2': '#1F2937',  // secondary headings, card titles
        'lingo-body':      '#4B5563',  // body text paragraphs
        'lingo-muted':     '#6B7280',  // descriptions, labels, captions
        'lingo-disabled':  '#9CA3AF',  // disabled states, fine print

        // ── Borders ──────────────────────────────────────────────────
        'lingo-border':       '#E5E7EB',
        'lingo-border-hover': '#CBD5E1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'lingo-hero':     'linear-gradient(160deg, #0F766E 0%, #0d6b64 55%, #145E57 100%)',
        'lingo-progress': 'linear-gradient(90deg, #0F766E 0%, #64C4B9 100%)',
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
