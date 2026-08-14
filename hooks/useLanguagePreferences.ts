'use client'
import { useState, useEffect } from 'react'

export interface LanguagePreferences {
  showChinese: boolean
  showPinyin: boolean
  showEnglish: boolean
}

const STORAGE_KEY = 'pm-lingo:study-view'
const DEFAULTS: LanguagePreferences = {
  showChinese: true,
  showPinyin: true,
  showEnglish: true,
}

export function useLanguagePreferences() {
  const [prefs, setPrefs] = useState<LanguagePreferences>(DEFAULTS)

  // Read from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setPrefs(JSON.parse(stored))
    } catch {}
  }, [])

  function toggle(key: keyof LanguagePreferences) {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      // Prevent all three text layers from being hidden simultaneously
      const visibleCount = [next.showChinese, next.showPinyin, next.showEnglish].filter(Boolean).length
      if (visibleCount === 0) return prev
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  function resetAll() {
    setPrefs(DEFAULTS)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS)) } catch {}
  }

  return { prefs, toggle, resetAll }
}
