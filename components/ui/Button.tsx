import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * primary   — Orange CTA (Start Free Trial, Enrol, Subscribe)
   * secondary — Teal outline (Explore, Learn More, supporting actions)
   * outline   — Navy outline for analytical/SpeakIQ contexts
   * ghost     — Teal text link (tertiary actions)
   * light     — White bg with orange text (on dark/coloured backgrounds)
   * pink      — Pink bg for achievement/delight moments
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'light' | 'pink'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingo-teal focus-visible:ring-offset-2',
        {
          // Primary: Orange — conversion actions
          'bg-lingo-orange hover:bg-lingo-orange-dark text-white': variant === 'primary',
          // Secondary: Teal outline — supporting / learning actions
          'bg-transparent border-2 border-lingo-teal text-lingo-teal hover:bg-lingo-teal-soft': variant === 'secondary',
          // Outline: Navy — analytical contexts (SpeakIQ, Exam dashboards)
          'border-2 border-lingo-navy text-lingo-navy hover:bg-lingo-bg-alt': variant === 'outline',
          // Ghost: Teal text — tertiary / inline actions
          'text-lingo-teal hover:text-lingo-orange hover:bg-lingo-surface': variant === 'ghost',
          // Light: White bg, orange text — for use on coloured sections
          'bg-white text-lingo-orange hover:bg-lingo-surface-orange': variant === 'light',
          // Pink: achievement badges, delight moments only
          'bg-lingo-pink hover:bg-lingo-pink-dark text-white': variant === 'pink',
        },
        {
          'text-sm px-4 py-2': size === 'sm',
          'text-sm px-5 py-2.5': size === 'md',
          'text-base px-6 py-3': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
