export default function SectionLabel({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 mb-4 ${center ? 'justify-center' : ''}`}>
      <span className="w-6 h-0.5 rounded-full inline-block bg-lingo-teal" />
      <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#0F766E' }}>{children}</span>
      {center && <span className="w-6 h-0.5 rounded-full inline-block bg-lingo-teal" />}
    </div>
  )
}
