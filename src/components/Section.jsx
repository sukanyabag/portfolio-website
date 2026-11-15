import Reveal from './Reveal.jsx'

export default function Section({ id, index, title, kicker, children }) {
  return (
    <section id={id} className="section">
      <Reveal className="section__head">
        <span className="section__index">{String(index).padStart(2, '0')}</span>
        <h2 className="section__title">{title}</h2>
        {kicker && <p className="section__kicker">{kicker}</p>}
      </Reveal>
      {children}
    </section>
  )
}
