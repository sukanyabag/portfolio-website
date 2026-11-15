import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Glass from '../components/Glass.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'

const PREVIEW = 2

export function Logo({ src, name }) {
  return (
    <span className="logo">
      {src ? <img src={src} alt="" /> : <span>{(name || '?').trim().charAt(0)}</span>}
    </span>
  )
}

function Job({ job, delay }) {
  const [open, setOpen] = useState(false)
  const highlights = job.highlights || []
  const shown = open ? highlights : highlights.slice(0, PREVIEW)
  const isCurrent = /present|now|current/i.test(job.end || '')

  return (
    <Reveal delay={delay} className="timeline__item">
      <span className={`timeline__dot${isCurrent ? ' is-current' : ''}`} />
      <Glass interactive className="card job">
        <div className="job__head">
          <Logo src={job.logo} name={job.company} />
          <div className="job__title">
            <h3>{job.role}</h3>
            <p>
              {job.href ? (
                <a href={job.href} target="_blank" rel="noreferrer">
                  {job.company} <Icon name="arrow" size={13} />
                </a>
              ) : (
                job.company
              )}
              {job.location && <span className="muted"> · {job.location}</span>}
            </p>
          </div>
          <span className="date">
            {job.start} — {job.end}
          </span>
        </div>

        {highlights.length > 0 && (
          <ul className="job__list">
            <AnimatePresence initial={false}>
              {shown.map((h) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {h}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        <div className="job__foot">
          {job.tags?.length > 0 && (
            <div className="tags">
              {job.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          )}
          {highlights.length > PREVIEW && (
            <button className="link-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? 'Less' : `${highlights.length - PREVIEW} more`}
              <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }} />
            </button>
          )}
        </div>
      </Glass>
    </Reveal>
  )
}

export default function Experience({ experience = [] }) {
  return (
    <div className="timeline">
      {experience.map((job, i) => (
        <Job key={`${job.company}-${job.role}`} job={job} delay={i * 0.06} />
      ))}
    </div>
  )
}
