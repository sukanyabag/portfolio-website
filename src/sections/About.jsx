import Markdown from 'react-markdown'
import Glass from '../components/Glass.jsx'
import Reveal from '../components/Reveal.jsx'

export default function About({ profile = {} }) {
  return (
    <div className={`about${profile.now?.length ? '' : ' about--single'}`}>
      <Reveal>
        <Glass interactive className="card prose">
          <Markdown
            components={{ a: (props) => <a {...props} target="_blank" rel="noreferrer" /> }}
          >
            {profile.summary || ''}
          </Markdown>
        </Glass>
      </Reveal>
      {profile.now?.length > 0 && (
        <Reveal delay={0.08}>
          <Glass interactive className="card now">
            <p className="eyebrow">
              <span className="pill__dot" /> Right now
            </p>
            <ul>
              {profile.now.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Glass>
        </Reveal>
      )}
    </div>
  )
}
