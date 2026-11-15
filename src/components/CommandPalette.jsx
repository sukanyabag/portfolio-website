import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import Icon from './Icon.jsx'

/** ⌘K / Ctrl+K menu. Every entry is built from portfolio.json. */
export default function CommandPalette({ open, onClose, data, sections, onToggleTheme }) {
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const inputRef = useRef(null)

  const items = useMemo(() => {
    const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    const open = (url) => () => window.open(url, '_blank', 'noopener')
    const list = [
      { group: 'Jump to', label: 'Home', icon: 'home', run: go('home') },
      ...sections.map((s) => ({ group: 'Jump to', label: s.title, icon: s.icon, run: go(s.id) })),
      ...(data.projects || [])
        .filter((p) => p.links?.[0]?.url)
        .map((p) => ({ group: 'Projects', label: p.title, hint: p.tags?.slice(0, 2).join(' · '), icon: 'folder', run: open(p.links[0].url) })),
      ...(data.contact?.socials || []).map((s) => ({ group: 'Elsewhere', label: s.name, icon: s.icon, run: open(s.url) })),
      { group: 'Actions', label: 'Toggle light / dark', icon: 'sun', run: onToggleTheme },
    ]
    if (data.contact?.email)
      list.push({
        group: 'Actions',
        label: 'Copy email address',
        hint: data.contact.email,
        icon: 'mail',
        run: () => navigator.clipboard?.writeText(data.contact.email),
      })
    if (data.profile?.resumeUrl)
      list.push({ group: 'Actions', label: 'Open résumé', icon: 'resume', run: open(data.profile.resumeUrl) })
    return list
  }, [data, sections, onToggleTheme])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return items
    return items.filter((it) => `${it.label} ${it.hint || ''} ${it.group}`.toLowerCase().includes(t))
  }, [items, q])

  useEffect(() => {
    if (open) {
      setQ('')
      setI(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => setI(0), [q])

  const run = (it) => {
    onClose()
    setTimeout(() => it.run(), 60)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setI((n) => Math.min(n + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setI((n) => Math.max(n - 1, 0))
    } else if (e.key === 'Enter' && filtered[i]) {
      run(filtered[i])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  let lastGroup = null
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette__backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="palette glass"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="palette__search">
              <Search size={16} />
              <input
                ref={inputRef}
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, projects, links…"
                aria-label="Search"
              />
              <kbd>esc</kbd>
            </div>
            <ul className="palette__list">
              {filtered.length === 0 && <li className="palette__empty">Nothing matches “{q}”.</li>}
              {filtered.map((it, idx) => {
                const header = it.group !== lastGroup ? it.group : null
                lastGroup = it.group
                return (
                  <li key={`${it.group}-${it.label}`}>
                    {header && <div className="palette__group">{header}</div>}
                    <button
                      className={`palette__item${idx === i ? ' is-active' : ''}`}
                      onMouseEnter={() => setI(idx)}
                      onClick={() => run(it)}
                    >
                      <Icon name={it.icon} size={16} />
                      <span>{it.label}</span>
                      {it.hint && <span className="palette__hint">{it.hint}</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
