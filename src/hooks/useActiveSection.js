import { useEffect, useState } from 'react'

/** Returns the id of the section currently in the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState('home')
  const key = ids.join('|')

  useEffect(() => {
    const els = ['home', ...ids].map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}
