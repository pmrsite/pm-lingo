import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-lingo-red hover:bg-lingo-red-dark text-white': variant === 'primary',
          'bg-lingo-navy hover:bg-lingo-navy/90 text-white': variant === 'secondary',
          'border-2 border-lingo-navy text-lingo-navy hover:bg-lingo-navy hover:text-white': variant === 'outline',
          'text-gray-600 hover:text-lingo-navy hover:bg-gray-100': variant === 'ghost',
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
