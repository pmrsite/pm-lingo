type WaveVariant =
  | 'white-to-teal'
  | 'teal-to-white'
  | 'white-to-soft-teal'
  | 'soft-teal-to-white'
  | 'white-to-orange'
  | 'orange-to-white'
  | 'orange-to-teal'
  | 'soft-lavender-to-white'
  | 'white-to-soft-lavender'

type WaveShape = 'arch' | 'valley' | 'slope' | 'ripple'

const BG: Record<WaveVariant, [string, string]> = {
  'white-to-teal':          ['#ffffff', '#0F766E'],
  'teal-to-white':          ['#0F766E', '#ffffff'],
  'white-to-soft-teal':     ['#ffffff', '#F0FDFA'],
  'soft-teal-to-white':     ['#F0FDFA', '#ffffff'],
  'white-to-orange':        ['#ffffff', '#FF6B00'],
  'orange-to-white':        ['#FF6B00', '#ffffff'],
  'orange-to-teal':         ['#FF6B00', '#0F766E'],
  'soft-lavender-to-white': ['#F5F3FF', '#ffffff'],
  'white-to-soft-lavender': ['#ffffff', '#F5F3FF'],
}

const PATHS: Record<WaveShape, string> = {
  arch:   'M0,60 C360,0 1080,0 1440,60 L1440,80 L0,80 Z',
  valley: 'M0,20 C360,80 1080,80 1440,20 L1440,80 L0,80 Z',
  slope:  'M0,80 C600,0 900,0 1440,40 L1440,80 L0,80 Z',
  ripple: 'M0,40 C240,80 480,20 720,40 C960,60 1200,10 1440,40 L1440,80 L0,80 Z',
}

export default function WaveDivider({
  variant = 'white-to-teal',
  shape = 'arch',
  flip = false,
}: {
  variant?: WaveVariant
  shape?: WaveShape
  flip?: boolean
}) {
  const [above, below] = BG[variant]
  return (
    <div
      aria-hidden="true"
      style={{ backgroundColor: above, lineHeight: 0, overflow: 'hidden', display: 'block' }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: 'clamp(40px, 5vw, 80px)',
          display: 'block',
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      >
        <path d={PATHS[shape]} fill={below} />
      </svg>
    </div>
  )
}
