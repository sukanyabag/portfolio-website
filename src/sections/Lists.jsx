import Glass from '../components/Glass.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { Logo } from './Experience.jsx'

export function Education({ education = [] }) {
  return (
    <div className="stack">
      {education.map((e, i) => (
        <Reveal key={e.school + e.degree} delay={i * 0.05}>
          <Glass interactive className="card row">
            <Logo src={e.logo} name={e.school} />
            <div className="row__main">
              <h3>
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noreferrer">
                    {e.school}
                  </a>
                ) : (
                  e.school
                )}
              </h3>
              <p className="muted">{e.degree}</p>
              {e.details && <p className="row__details">{e.details}</p>}
            </div>
            <span className="date">
              {e.start} — {e.end}
            </span>
          </Glass>
        </Reveal>
      ))}
    </div>
  )
}

export function Publications({ publications = [], icon = 'book' }) {
  return (
    <div className="stack">
      {publications.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.05}>
          <Glass
            as={p.url ? 'a' : 'div'}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            interactive
            className="card row row--link"
          >
            <span className="logo">
              <Icon name={icon} size={18} />
            </span>
            <div className="row__main">
              <h3>{p.title}</h3>
              <p className="muted">
                {p.venue}
                {p.authors && <> · {p.authors}</>}
              </p>
            </div>
            <span className="date">{p.date}</span>
            {p.url && <Icon name="arrow" size={16} className="row__arrow" />}
          </Glass>
        </Reveal>
      ))}
    </div>
  )
}

/** Generic list for honors, volunteering, talks…: { title, org, date, description, url } */
export function Entries({ items = [], icon = 'award' }) {
  return (
    <div className="entries">
      {items.map((e, i) => (
        <Reveal key={e.title} delay={i * 0.05} className={e.featured ? 'entry--featured' : undefined}>
          <Glass
            as={e.url ? 'a' : 'div'}
            href={e.url || undefined}
            target="_blank"
            rel="noreferrer"
            interactive
            className="card entry"
          >
            <div className="entry__top">
              <Icon name={e.icon || icon} size={18} className="cert__icon" />
              {e.date && <span className="date">{e.date}</span>}
            </div>
            <h3>{e.title}</h3>
            {e.org && <p className="entry__org">{e.org}</p>}
            {e.description && <p className="muted entry__desc">{e.description}</p>}
            {e.url && e.featured && (
              <span className="entry__cta">
                Visit {e.title} <Icon name="arrow" size={14} />
              </span>
            )}
          </Glass>
        </Reveal>
      ))}
    </div>
  )
}

export function Certifications({ certifications = [] }) {
  return (
    <div className="certs">
      {certifications.map((c, i) => (
        <Reveal key={c.name} delay={i * 0.05}>
          <Glass
            as={c.url ? 'a' : 'div'}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            interactive
            className="card cert"
          >
            <Icon name="award" size={20} className="cert__icon" />
            <h3>{c.name}</h3>
            <p className="muted">
              {c.issuer}
              {c.date && <> · {c.date}</>}
            </p>
          </Glass>
        </Reveal>
      ))}
    </div>
  )
}
