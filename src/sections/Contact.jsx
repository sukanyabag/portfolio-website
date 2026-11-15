import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import Glass from '../components/Glass.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { mailLink } from '../lib/mail.js'

export default function Contact({ contact = {} }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked; the mailto link still works */
    }
  }

  return (
    <Reveal>
      <Glass interactive className="card contact">
        <div className="contact__glow" aria-hidden="true" />
        {contact.title && <h3 className="contact__title">{contact.title}</h3>}
        {contact.text && <p className="muted contact__text">{contact.text}</p>}

        {contact.email && (
          <div className="contact__email">
            <a className="btn btn--primary" {...mailLink(contact)}>
              <Icon name="mail" size={16} /> {contact.email}
            </a>
            <button className="icon-btn glass" onClick={copy} aria-label="Copy email address" title="Copy">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        )}
        {contact.phone && (
          <a className="contact__phone muted" href={`tel:${contact.phone}`}>
            <Icon name="phone" size={14} /> {contact.phone}
          </a>
        )}

        {contact.socials?.length > 0 && (
          <div className="contact__socials">
            {contact.socials.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="chip-link">
                <Icon name={s.icon} size={15} /> {s.name}
              </a>
            ))}
          </div>
        )}
      </Glass>
    </Reveal>
  )
}
