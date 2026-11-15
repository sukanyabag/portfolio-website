import Reveal from '../components/Reveal.jsx'
import Glass from '../components/Glass.jsx'
import Icon from '../components/Icon.jsx'
import { mailLink } from '../lib/mail.js'

export default function Hero({ profile = {}, stats = [], contact = {} }) {
  const [first, ...rest] = (profile.name || '').split(' ')
  const last = rest.join(' ')

  return (
    <header id="home" className="hero">
      <div className="hero__main">
        {profile.available !== false && profile.availabilityText && (
          <Reveal>
            <span className="pill glass">
              <span className="pill__dot" />
              {profile.availabilityText}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          {profile.greeting && <p className="hero__greeting">{profile.greeting}</p>}
          <h1 className="hero__name">
            <span>{first}</span> {last && <em>{last}</em>}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          {profile.role && <p className="hero__role">{profile.role}</p>}
          {profile.previousRole && <p className="hero__prev">{profile.previousRole}</p>}
          {profile.tagline && <p className="hero__tagline">{profile.tagline}</p>}
        </Reveal>

        <Reveal delay={0.18} className="hero__actions">
          {contact.email && (
            <a className="btn btn--primary" {...mailLink(contact)}>
              <Icon name="mail" size={16} /> Get in touch
            </a>
          )}
          {profile.resumeUrl && (
            <a className="btn glass" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              <Icon name="resume" size={16} /> Résumé
            </a>
          )}
          {profile.location && (
            <a
              className="hero__loc"
              href={profile.locationLink || undefined}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="map" size={15} /> {profile.location}
            </a>
          )}
        </Reveal>

        {contact.socials?.length > 0 && (
          <Reveal delay={0.24} className="hero__socials">
            {contact.socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="icon-btn glass" aria-label={s.name} title={s.name}>
                <Icon name={s.icon} size={17} />
              </a>
            ))}
          </Reveal>
        )}
      </div>

      <Reveal delay={0.1} className="hero__aside">
        <div className="orb">
          <div className="orb__ring" />
          <Glass className="orb__glass">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                style={profile.avatarZoom ? { transform: `scale(${profile.avatarZoom})` } : undefined}
              />
            ) : (
              <span className="orb__initials">{profile.initials}</span>
            )}
          </Glass>
        </div>
      </Reveal>

      {stats.length > 0 && (
        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.25 + i * 0.05}>
              <Glass interactive className="stat">
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </Glass>
            </Reveal>
          ))}
        </div>
      )}
    </header>
  )
}
