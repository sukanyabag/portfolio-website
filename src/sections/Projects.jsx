import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Glass from '../components/Glass.jsx'
import Icon from '../components/Icon.jsx'

function ProjectCard({ p }) {
  return (
    <Glass interactive className={`card project${p.featured ? ' project--wide' : ''}`}>
      <div className="project__top">
        {p.category && <span className="project__cat">{p.category}</span>}
        {p.period && <span className="date">{p.period}</span>}
      </div>

      <h3 className="project__title">{p.title}</h3>

      {p.image && <img className="project__img" src={p.image} alt="" loading="lazy" />}

      <div className="project__body">
        {p.pitch && <p className="project__pitch">{p.pitch}</p>}

        {p.metrics?.length > 0 && (
          <dl className="metrics">
            {p.metrics.map((m) => (
              <div key={m.label} className="metric">
                <dt>{m.value}</dt>
                <dd>{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {p.description && <p className="project__desc">{p.description}</p>}
      </div>

      <div className="project__foot">
        {p.tags?.length > 0 && (
          <div className="tags">
            {p.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
        {p.links?.length > 0 && (
          <div className="project__links">
            {p.links.map((l) => (
              <a key={l.url + l.label} href={l.url} target="_blank" rel="noreferrer" className="chip-link chip-link--strong">
                <Icon name={l.icon} size={14} /> {l.label} <Icon name="arrow" size={13} />
              </a>
            ))}
          </div>
        )}
      </div>
    </Glass>
  )
}

export default function Projects({ projects = [] }) {
  const [filter, setFilter] = useState('All')

  // Filter chips are built from the tags in the JSON, most-used first.
  const tags = useMemo(() => {
    const count = {}
    projects.forEach((p) => p.tags?.forEach((t) => (count[t] = (count[t] || 0) + 1)))
    return ['All', ...Object.keys(count).sort((a, b) => count[b] - count[a]).slice(0, 7)]
  }, [projects])

  const list = filter === 'All' ? projects : projects.filter((p) => p.tags?.includes(filter))

  return (
    <>
      {tags.length > 2 && (
        <div className="filters" role="tablist" aria-label="Filter projects">
          {tags.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={filter === t}
              className={`filter${filter === t ? ' is-active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {filter === t && <motion.span layoutId="filter-pill" className="filter__pill" />}
              <span>{t}</span>
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="projects">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              layout
              key={p.title}
              className={p.featured ? 'project-cell--wide' : ''}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
