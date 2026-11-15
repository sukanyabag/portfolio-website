import Glass from '../components/Glass.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'

/**
 * hobbies: [{ title, icon, note, items[], more }]
 * Every card has the same three zones so a row lines up:
 *   head (icon, title, note) · items · footer punchline pinned to the bottom.
 */
export default function Hobbies({ hobbies = [] }) {
  return (
    <div className="hobbies">
      {hobbies.map((h, i) => (
        <Reveal key={h.title} delay={i * 0.04}>
          <Glass interactive className="card hobby">
            <Icon name={h.icon} size={96} className="hobby__mark" aria-hidden="true" />

            <div className="hobby__head">
              <span className="hobby__icon">
                <Icon name={h.icon} size={18} />
              </span>
              <h3>{h.title}</h3>
              {h.note && <p className="hobby__note">{h.note}</p>}
            </div>

            {h.items?.length > 0 && (
              <div className="tags hobby__items">
                {h.items.map((it) => (
                  <span key={it} className="tag">{it}</span>
                ))}
              </div>
            )}

            {h.more && <p className="hobby__more">{h.more}</p>}
          </Glass>
        </Reveal>
      ))}
    </div>
  )
}
