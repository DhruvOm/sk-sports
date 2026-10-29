import { FiTarget, FiEye, FiAward } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'
import usePageTitle from '../hooks/usePageTitle'
import PageHero from '../components/common/PageHero'
import Photo from '../components/common/Photo'
import Icon from '../components/common/Icon'
import StatsStrip from '../components/common/StatsStrip'
import CTABanner from '../components/common/CTABanner'
import { about, instructors, tenets } from '../data/content'
import './About.css'

export default function About() {
  usePageTitle('About Us')
  const [head, ...coaches] = instructors

  return (
    <>
      <PageHero
        title="About Us"
        subtitle="More than kicks: we build character."
        image="hero-about.webp"
        imageAlt="SK Sports team in Taekwondo uniforms"
      />

      {/* ===== Story ===== */}
      <section className="section">
        <div className="container story-grid">
          <div className="story-text">
            <h2 className="section-title">Our Journey</h2>
            {about.story.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <span className="est-badge">Est. {about.established}</span>
          </div>
          <div className="story-collage" aria-hidden="true">
            <div className="collage-main">
              <Photo src="about-story-1.jpg" alt="" />
            </div>
            <div className="collage-side top">
              <Photo src="about-story-2.jpg" alt="" />
            </div>
            <div className="collage-side bottom">
              <Photo src="about-story-3.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="section mv-section">
        <div className="container mv-grid">
          <article className="mv-card glass">
            <span className="mv-icon">
              <FiTarget size={28} />
            </span>
            <h3>Our Mission</h3>
            <p>{about.mission}</p>
          </article>
          <article className="mv-card glass">
            <span className="mv-icon">
              <FiEye size={28} />
            </span>
            <h3>Our Vision</h3>
            <p>{about.vision}</p>
          </article>
        </div>
      </section>

      {/* ===== Head instructor ===== */}
      <section className="section grid-bg">
        <div className="container head-grid">
          <div className="head-photo glass glass-glow-blue">
            <Photo src={head.image} alt={head.name} />
          </div>
          <div className="head-info">
            <span className="head-role">{head.role}</span>
            <h2>{head.name}</h2>
            <p className="head-rank">{head.rank}</p>
            <p className="head-exp">{head.experience}</p>
            <blockquote className="head-quote glass">
              <FaQuoteLeft className="text-orange" size={22} aria-hidden="true" />
              <p>{head.quote}</p>
            </blockquote>
            <ul className="head-achievements">
              {head.achievements.map((a) => (
                <li key={a}>
                  <FiAward aria-hidden="true" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Coaching team ===== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Coaching Team</h2>
          <div className="coach-row">
            {coaches.map((c) => (
              <article key={c.id} className="coach-card glass">
                <div className="coach-photo">
                  <Photo src={c.image} alt={c.name} />
                </div>
                <div className="coach-info">
                  <h3>{c.name}</h3>
                  <span className="coach-rank">{c.rank}</span>
                  <span className="coach-role">{c.role}</span>
                  {c.specialty && <span className="coach-spec">{c.specialty}</span>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Timeline ===== */}
      <section className="section grid-bg">
        <div className="container narrow">
          <h2 className="section-title center">Our Milestones</h2>
          <ol className="milestones">
            {about.timeline.map((m, i) => (
              <li key={i} className="milestone">
                <span className="milestone-year">{m.year}</span>
                <div className="milestone-card glass">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Tenets ===== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title center">The Five Tenets of Taekwondo</h2>
          <p className="section-sub center">The values every SK Sports student trains, on and off the mat.</p>
          <div className="tenets-grid">
            {tenets.map((t) => (
              <article key={t.name} className="tenet glass">
                <Icon name={t.icon} size={40} />
                <h3>{t.name}</h3>
                <p>{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="section about-stats">
        <div className="container">
          <StatsStrip />
        </div>
      </section>

      {/* ===== Affiliations ===== */}
      <section className="section affiliations-section">
        <div className="container">
          <h2 className="sr-only">Affiliations</h2>
          <div className="affiliations">
            {about.affiliations.map((a) => (
              <div key={a} className="affiliation">
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner eyebrow="Become part of our family" title="First Class Is" highlight="Free" />
    </>
  )
}
