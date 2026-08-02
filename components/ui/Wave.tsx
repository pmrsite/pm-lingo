export default function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  const path = flip
    ? 'M0,0 C360,80 1080,0 1440,80 L1440,0 L0,0 Z'
    : 'M0,80 C360,0 1080,80 1440,0 L1440,80 L0,80 Z'
  return (
    <div style={{ lineHeight: 0, background: from }} aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
        <path d={path} fill={to} />
      </svg>
    </div>
  )
}
