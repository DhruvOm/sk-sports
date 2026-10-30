import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiAlertTriangle, FiCheck, FiClock } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import usePageTitle from '../hooks/usePageTitle'
import PageHero from '../components/common/PageHero'
import BeltIcon from '../components/common/BeltIcon'
import { belts, requirementGroups } from '../data/belts'
import { site, whatsappLink } from '../data/siteConfig'
import './BeltProgress.css'

export default function BeltProgress() {
  usePageTitle('Belt Progress')
  // Open a specific belt from links like /belt-progress?belt=green
  const { search } = useLocation()
  const initial = new URLSearchParams(search).get('belt')
  const [activeId, setActiveId] = useState(belts.some((b) => b.id === initial) ? initial : 'white')

  const index = belts.findIndex((b) => b.id === activeId)
  const belt = belts[index]

  return (
    <>
      <PageHero
        title="The Belt Journey"
        subtitle="The path to Black Belt is a journey of continuous improvement. Track your progression and master each tier."
        image="hero-belt-progress.webp"
        imageAlt="Taekwondo athlete kicking a pad"
      />

      {/* ===== Belt selector ===== */}
      <section className="section belt-select-section">
        <div className="container">
          <div className="belt-selector" role="tablist" aria-label="Choose a belt">
            {belts.map((b) => (
              <button
                key={b.id}
                type="button"
                role="tab"
                aria-selected={b.id === activeId}
                className={`belt-tab glass ${b.id === activeId ? 'active' : ''}`}
                onClick={() => setActiveId(b.id)}
              >
                <BeltIcon color={b.color} size={110} glow={b.id === activeId} />
                <span>{b.name}</span>
              </button>
            ))}
          </div>

          {/* progress line */}
          <div className="belt-progress" aria-label={`Belt ${index + 1} of ${belts.length}`}>
            <div className="belt-progress-track">
              <div className="belt-progress-fill" style={{ width: `${(index / (belts.length - 1)) * 100}%` }} />
              {belts.map((b, i) => (
                <span
                  key={b.id}
                  className={`belt-dot ${i <= index ? 'done' : ''}`}
                  style={{ left: `${(i / (belts.length - 1)) * 100}%`, '--dot': b.color }}
                />
              ))}
            </div>
            <span className="belt-progress-label">
              Belt {index + 1} of {belts.length}
            </span>
          </div>
        </div>
      </section>

      {/* ===== Requirements ===== */}
      <section className="section grid-bg requirements-section">
        <div className="container">
          <div className="req-head">
            <div>
              <h2 className="section-title">
                {belt.name} <span className="text-orange">Requirements</span>
              </h2>
              <p className="section-sub">
                {belt.meaning} · <FiClock aria-hidden="true" className="inline-icon" /> Typical time: {belt.duration}
              </p>
            </div>
          </div>

          <div className="req-grid">
            {requirementGroups.map((g) => {
              const value = belt.requirements[g.key]
              const list = Array.isArray(value) ? value : [value]
              return (
                <article key={`${belt.id}-${g.key}`} className="req-card glass">
                  <h3>{g.title}</h3>
                  <ul>
                    {list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              )
            })}

            <article key={`${belt.id}-ready`} className="req-card readiness glass glass-glow-orange">
              <h3>Grading Checklist</h3>
              <ul className="check-list">
                {belt.readiness.map((r) => (
                  <li key={r}>
                    <FiCheck aria-hidden="true" /> {r}
                  </li>
                ))}
              </ul>
              <p className="readiness-note">Your trainer confirms when you are ready to grade.</p>
            </article>
          </div>

          <p className="syllabus-note">
            Syllabus shown is a general guide. Your trainer may adjust requirements for each student.
          </p>
        </div>
      </section>

      {/* ===== Grading banner ===== */}
      <section className="section">
        <div className="container">
          <div className="grading-banner">
            <FiAlertTriangle className="grading-icon" size={46} aria-hidden="true" />
            <div className="grading-text">
              <h2>Questions about the next grading test?</h2>
              <p>Next academy testing day: {site.nextGrading}.</p>
            </div>
            <div className="grading-actions">
              <Link to="/schedule" className="btn btn-primary">
                View Schedule
              </Link>
              <a
                href={whatsappLink('Hi! I have a question about the next belt grading test.')}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <FaWhatsapp size={18} /> Ask Master
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
