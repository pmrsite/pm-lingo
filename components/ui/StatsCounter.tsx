'use client'
import { useEffect, useRef, useState } from 'react'

interface Stat {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const duration = 1400
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, value])

  return (
    <span ref={ref} className="text-2xl font-bold text-lingo-navy">
      {prefix}{count}{suffix}
    </span>
  )
}

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-wrap justify-around gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center">
          <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          <span className="text-xs text-lingo-muted mt-0.5 uppercase tracking-wide">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
