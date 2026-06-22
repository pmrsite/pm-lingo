import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTierFromSessions(completedSessions: number): 'bronze' | 'silver' | 'gold' | 'platinum' | 'master' {
  if (completedSessions >= 500) return 'master'
  if (completedSessions >= 300) return 'platinum'
  if (completedSessions >= 200) return 'gold'
  if (completedSessions >= 100) return 'silver'
  return 'bronze'
}

export function getTeacherShare(tier: string): number {
  const shares: Record<string, number> = {
    bronze: 60, silver: 70, gold: 80, platinum: 85, master: 90,
  }
  return shares[tier] ?? 60
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}
