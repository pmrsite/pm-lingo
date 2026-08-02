import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'light' | 'pink'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]',
        {
          'bg-lingo-red hover:bg-lingo-red-dark text-white': variant === 'primary',
          'bg-lingo-navy hover:bg-lingo-navy-dark text-white': variant === 'secondary',
          'border-2 border-lingo-navy text-lingo-navy hover:bg-blue-50': variant === 'outline',
          'text-lingo-muted hover:text-lingo-navy hover:bg-lingo-surface': variant === 'ghost',
          'bg-white text-lingo-red hover:bg-orange-50': variant === 'light',
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
