import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/**
 * Where the portfolio data lives.
 * - Default: /portfolio.json (the file in /public). Edit it and refresh.
 * - Override: set VITE_DATA_URL in a .env file to load from anywhere
 *   (a GitHub raw URL, a gist, an API). Then you can update the site
 *   without redeploying it.
 */
export const DATA_URL =
  import.meta.env.VITE_DATA_URL || `${import.meta.env.BASE_URL}portfolio.json`

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [state, setState] = useState({ data: null, error: null, loading: true })

  const load = useCallback(async () => {
    try {
      const res = await fetch(DATA_URL, { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status} while loading ${DATA_URL}`)
      const data = await res.json()
      setState({ data, error: null, loading: false })
    } catch (error) {
      // Keep the last good data on screen if a later edit breaks the JSON.
      setState((s) => ({ ...s, error, loading: false }))
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Dev only: vite.config.js pings us when portfolio.json is saved.
  useEffect(() => {
    if (!import.meta.hot) return
    const onUpdate = () => load()
    import.meta.hot.on('portfolio:update', onUpdate)
    return () => import.meta.hot.off?.('portfolio:update', onUpdate)
  }, [load])

  return (
    <DataContext.Provider value={{ ...state, reload: load }}>{children}</DataContext.Provider>
  )
}

export function usePortfolio() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('usePortfolio must be used inside <DataProvider>')
  return ctx
}
