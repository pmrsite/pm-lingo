'use client'
import { useState, useEffect } from 'react'

export interface LanguagePreferences {
  showSimplified: boolean
  showTraditional: boolean
  showPinyin: boolean
  showEnglish: boolean
}

const STORAGE_KEY = 'pm-lingo:study-view'
const DEFAULTS: LanguagePreferences = {
  showSimplified: true,
  showTraditional: false,
  showPinyin: true,
  showEnglish: true,
}

export function useLanguagePreferences() {
  const [prefs, setPrefs] = useState<LanguagePreferences>(DEFAULTS)

  // Read from localStorage after mount to avoid hydration mismatch.
  // Migrates from the previous showChinese key if present.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if ('showChinese' in parsed && !('showSimplified' in parsed)) {
          parsed.showSimplified = parsed.showChinese
          parsed.showTraditional = false
          delete parsed.showChinese
        }
        setPrefs({ ...DEFAULTS, ...parsed })
      }
    } catch {}
  }, [])

  function toggle(key: keyof LanguagePreferences) {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      // Prevent all four learning-text layers from being hidden simultaneously
      const visible = [next.showSimplified, next.showTraditional, next.showPinyin, next.showEnglish].filter(Boolean).length
      if (visible === 0) return prev
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
