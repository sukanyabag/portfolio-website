import Glass from '../components/Glass.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Skills({ skills = [] }) {
  // Also accept a flat list: "skills": ["Python", "React"]
  const groups = typeof skills[0] === 'string' ? [{ category: '', items: skills }] : skills

  return (
    <div className="skills">
      {groups.map((g, i) => (
        <Reveal key={g.category || i} delay={i * 0.05}>
          <Glass interactive className="card skill-group">
            {g.category && <p className="eyebrow">{g.category}</p>}
            <div className="tags tags--lg">
              {g.items.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </Glass>
        </Reveal>
      ))}
    </div>
  )
}
