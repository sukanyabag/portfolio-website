import { useCallback, useEffect, useState } from 'react'

const KEY = 'portfolio-theme'

function readStored() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

/** Light/dark mode plus accent colours coming from portfolio.json → theme. */
export function useTheme(theme) {
  const [mode, setMode] = useState(() => readStored() || document.documentElement.dataset.theme || 'dark')

  // First load with no saved choice: respect the JSON default.
  useEffect(() => {
    if (!readStored() && theme?.defaultMode) setMode(theme.defaultMode)
  }, [theme?.defaultMode])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  useEffect(() => {
    const root = document.documentElement.style
    if (theme?.accent) root.setProperty('--accent', theme.accent)
    if (theme?.accent2) root.setProperty('--accent-2', theme.accent2)
    if (theme?.accent3) root.setProperty('--accent-3', theme.accent3)
  }, [theme?.accent, theme?.accent2, theme?.accent3])

  const toggle = useCallback(() => {
    setMode((m) => {
      const next = m === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* storage blocked: fine, choice just won't persist */
      }
      return next
    })
  }, [])

  return { mode, toggle }
}
