import { motion } from 'framer-motion'
import Icon from './Icon.jsx'

export default function Nav({ items, active, mode, onToggleTheme, onOpenPalette }) {
  const links = [{ id: 'home', title: 'Home', icon: 'home' }, ...items]
  return (
    <nav className="nav glass" aria-label="Sections">
      <ul className="nav__list">
        {links.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={`nav__link${active === it.id ? ' is-active' : ''}`} title={it.title}>
              {active === it.id && (
                <motion.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <Icon name={it.icon} size={16} className="nav__icon" />
              <span className="nav__label">{it.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <span className="nav__divider" />
      <button className="nav__btn" onClick={onOpenPalette} aria-label="Open command menu" title="Command menu (⌘K)">
        <Icon name="command" size={16} />
      </button>
      <button className="nav__btn" onClick={onToggleTheme} aria-label="Toggle colour theme" title="Toggle theme">
        <Icon name={mode === 'dark' ? 'sun' : 'moon'} size={16} />
      </button>
    </nav>
  )
}
