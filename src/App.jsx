import { useEffect, useMemo, useState } from 'react'
import Markdown from 'react-markdown'
import { usePortfolio, DATA_URL } from './data/DataContext.jsx'
import { useTheme } from './hooks/useTheme.js'
import { useActiveSection } from './hooks/useActiveSection.js'
import Background from './components/Background.jsx'
import Nav from './components/Nav.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import Section from './components/Section.jsx'
import Glass from './components/Glass.jsx'
import Reveal from './components/Reveal.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Experience from './sections/Experience.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Contact from './sections/Contact.jsx'
import Hobbies from './sections/Hobbies.jsx'
import { Certifications, Education, Entries, Publications } from './sections/Lists.jsx'

/**
 * Section id (from portfolio.json → sections[]) → component.
 * Add an entry here to support a new kind of section.
 */
const REGISTRY = {
  about: (d) => <About profile={d.profile} />,
  experience: (d) => <Experience experience={d.experience} />,
  projects: (d) => <Projects projects={d.projects} />,
  skills: (d) => <Skills skills={d.skills} />,
  education: (d) => <Education education={d.education} />,
  publications: (d) => <Publications publications={d.publications} />,
  patents: (d) => <Publications publications={d.patents} icon="scroll" />,
  honors: (d) => <Entries items={d.honors} icon="trophy" />,
  community: (d) => <Entries items={d.community} icon="heart" />,
  certifications: (d) => <Certifications certifications={d.certifications} />,
  hobbies: (d) => <Hobbies hobbies={d.hobbies} />,
  contact: (d) => <Contact contact={d.contact} />,
}

/** Any section with "type": "markdown" and a "content" string renders as free text. */
function MarkdownSection({ content }) {
  return (
    <Reveal>
      <Glass interactive className="card prose">
        <Markdown>{content || ''}</Markdown>
      </Glass>
    </Reveal>
  )
}

const DEFAULT_SECTIONS = Object.keys(REGISTRY).map((id) => ({
  id,
  title: id[0].toUpperCase() + id.slice(1),
  nav: ['about', 'experience', 'projects', 'contact'].includes(id),
}))

export default function App() {
  const { data, error, loading } = usePortfolio()
  const { mode, toggle } = useTheme(data?.theme)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const sections = useMemo(() => {
    if (!data) return []
    return (data.sections || DEFAULT_SECTIONS).filter(
      (s) => s.visible !== false && (s.type === 'markdown' || REGISTRY[s.id]),
    )
  }, [data])

  const navItems = sections.filter((s) => s.nav)
  const active = useActiveSection(navItems.map((s) => s.id))

  useEffect(() => {
    if (!data?.meta) return
    if (data.meta.title) document.title = data.meta.title
    if (data.meta.description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }
      tag.content = data.meta.description
    }
  }, [data?.meta])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!data) {
    return (
      <>
        <Background />
        <main className="state">
          {loading ? (
            <div className="loader glass" aria-label="Loading" />
          ) : (
            <Glass className="card state__card">
              <h1>Couldn't load portfolio data</h1>
              <p className="muted">
                Tried <code>{DATA_URL}</code>
              </p>
              <pre>{String(error?.message || error)}</pre>
            </Glass>
          )}
        </main>
      </>
    )
  }

  return (
    <>
      <Background />
      <Nav
        items={navItems}
        active={active}
        mode={mode}
        onToggleTheme={toggle}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      {error && (
        <div className="toast glass" role="status">
          portfolio.json has an error, showing the last good version: {error.message}
        </div>
      )}

      <main className="container">
        <Hero profile={data.profile} stats={data.stats} contact={data.contact} />

        {sections.map((s, i) => (
          <Section key={s.id} id={s.id} index={i + 1} title={s.title} kicker={s.kicker}>
            {s.type === 'markdown' ? <MarkdownSection content={s.content} /> : REGISTRY[s.id](data)}
          </Section>
        ))}

        <footer className="footer">
          <span>
            © {new Date().getFullYear()} {data.profile?.name}
          </span>
          {data.meta?.updated && <span className="muted">Updated {data.meta.updated}</span>}
          <button className="link-btn" onClick={() => setPaletteOpen(true)}>
            Press <kbd>⌘K</kbd> to explore
          </button>
        </footer>
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        data={data}
        sections={sections}
        onToggleTheme={toggle}
      />
    </>
  )
}
