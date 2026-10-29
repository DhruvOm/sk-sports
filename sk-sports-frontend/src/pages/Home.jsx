import { Link } from 'react-router-dom'
import { FaWhatsapp, FaQuoteLeft } from 'react-icons/fa'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import usePageTitle from '../hooks/usePageTitle'
import Photo from '../components/common/Photo'
import Icon from '../components/common/Icon'
import BeltIcon from '../components/common/BeltIcon'
import ClassCard from '../components/common/ClassCard'
import EnquiryForm from '../components/common/EnquiryForm'
import MapEmbed from '../components/common/MapEmbed'
import StatsStrip from '../components/common/StatsStrip'
import { classes, whyTrain, fees } from '../data/classes'
import { belts } from '../data/belts'
import { slotsForDay, formatTime, days } from '../data/schedule'
import { instructors, galleryItems, testimonials } from '../data/content'
import { whatsappLink, site } from '../data/siteConfig'
import './Home.css'

// One featured class per category for the home page
const featured = ['little-dragons', 'teens', 'adults', 'competition'].map((id) => classes.find((c) => c.id === id))

export default function Home() {
  usePageTitle()
  const today = new Date().getDay()
  const todaySlots = slotsForDay(today)
  const todayName = days.find((d) => d.id === today).name

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-hero-media">
          <Photo src="hero-home.webp" alt="Taekwondo athlete performing a flying kick" />
          <div className="streaks" aria-hidden="true" />
        </div>

        <div className="container home-hero-inner">
          <div className="home-hero-text">
            <span className="hero-eyebrow">Taekwondo Academy · {site.city}</span>
            <h1>
              Discipline.
              <br />
              Power.
              <br />
              <span className="text-orange">Confidence.</span>
            </h1>
            <p>Taekwondo classes for kids, teens &amp; adults.</p>
            <div className="hero-actions">
              <Link to="/book-trial" className="btn btn-primary">
                Book Free Trial
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-outline hero-wa">
                <FaWhatsapp size={22} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          <aside className="why-train" aria-labelledby="why-title">
            <h2 id="why-title">Why Train With Us</h2>
            <div className="why-grid">
              {whyTrain.map((w, i) => (
                <div key={w.title} className={`why-card ${i % 2 ? 'blue' : 'orange'}`}>
                  <div className="why-card-inner">
                    <Icon name={w.icon} size={34} />
                    <h3>{w.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ===== FEATURED CLASSES ===== */}
      <section className="section grid-bg">
        <div className="container">
          <h2 className="section-title center">Featured Classes</h2>
          <p className="section-sub center">Programs for every age, skill level and goal.</p>
          <div className="featured-grid">
            {featured.map((c) => (
              <ClassCard key={c.id} item={c} variant="compact" />
            ))}
          </div>
          <div className="center-action">
            <Link to="/classes" className="btn btn-outline">
              View All Classes <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BELT JOURNEY TEASER ===== */}
      <section className="section belt-teaser">
        <div className="container">
          <h2 className="section-title">
            The Belt <span className="text-orange">Journey</span>
          </h2>
          <p className="section-sub">From white belt to black belt, every step is a new skill and a new level of confidence.</p>
          <div className="belt-row">
            {belts.map((b, i) => (
              <Link key={b.id} to={`/belt-progress?belt=${b.id}`} className="belt-row-item">
                <BeltIcon color={b.color} size={110} glow />
                <span>{b.name}</span>
                {i < belts.length - 1 && <i className="belt-connector" aria-hidden="true" />}
              </Link>
            ))}
          </div>
          <Link to="/belt-progress" className="btn btn-outline">
            See Belt Requirements <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* ===== TODAY'S CLASSES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <h2 className="section-title">Today&apos;s Classes</h2>
              <p className="section-sub">{todayName}&apos;s batches at {site.name}.</p>
            </div>
            <Link to="/schedule" className="btn btn-outline">
              Full Schedule <FiArrowRight />
            </Link>
          </div>
          {todaySlots.length === 0 ? (
            <div className="glass today-empty">Rest day today: open practice only. See you tomorrow!</div>
          ) : (
            <div className="today-list">
              {todaySlots.map((s) => {
                const c = classes.find((x) => x.id === s.classId)
                return (
                  <div key={`${s.day}-${s.start}`} className="today-item glass" style={{ '--belt': `var(--belt-${c.belt})` }}>
                    <span className="today-time">{formatTime(s.start)}</span>
                    <div>
                      <strong>{c.name}</strong>
                      <span>{c.ages}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== TRAINERS ===== */}
      <section className="section grid-bg">
        <div className="container">
          <h2 className="section-title center">Meet Your Trainers</h2>
          <p className="section-sub center">Experienced, patient and passionate about Taekwondo.</p>
          <div className="trainers-grid">
            {instructors.map((t, i) => (
              <article key={t.id} className={`trainer-card glass ${i === 0 ? 'glass-glow-blue' : ''}`}>
                <div className="trainer-photo">
                  <Photo src={t.image} alt={t.name} />
                </div>
                <div className="trainer-info">
                  <span className="trainer-role">{t.role}</span>
                  <h3>{t.name}</h3>
                  <p className="trainer-rank">{t.rank}</p>
                  <ul>
                    <li>
                      <FiCheck aria-hidden="true" /> {t.experience}
                    </li>
                    {t.achievements.slice(0, 2).map((a) => (
                      <li key={a}>
                        <FiCheck aria-hidden="true" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section stats-section">
        <div className="container">
          <StatsStrip />
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <h2 className="section-title">From the Dojang</h2>
              <p className="section-sub">Training, gradings and tournament moments.</p>
            </div>
            <Link to="/gallery" className="btn btn-outline">
              View Gallery <FiArrowRight />
            </Link>
          </div>
          <div className="home-gallery">
            {galleryItems.slice(0, 6).map((g) => (
              <Link to="/gallery" key={g.image} className="home-gallery-item">
                <Photo src={g.image} alt={g.title} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section grid-bg">
        <div className="container">
          <h2 className="section-title center">What Parents Say</h2>
          <p className="section-sub center">Real words from our SK Sports family.</p>
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <figure key={i} className="testimonial glass">
                <FaQuoteLeft className="text-orange" size={26} aria-hidden="true" />
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEES ===== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title center">Fees &amp; Plans</h2>
          <p className="section-sub center">Simple, transparent plans. Your first class is always free.</p>
          <div className="fees-grid">
            {fees.map((f) => (
              <article key={f.name} className={`fee-card glass ${f.highlight ? 'highlight' : ''}`}>
                {f.highlight && <span className="badge badge-orange">Most Popular</span>}
                <h3>{f.name}</h3>
                <p className="fee-price">
                  {f.price} <span>{f.period}</span>
                </p>
                <ul>
                  {f.features.map((x) => (
                    <li key={x}>
                      <FiCheck aria-hidden="true" /> {x}
                    </li>
                  ))}
                </ul>
                <Link to="/book-trial" className={`btn ${f.highlight ? 'btn-primary' : 'btn-outline'} btn-block`}>
                  Start with a Free Trial
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENQUIRY + MAP ===== */}
      <section className="section grid-bg" id="enquiry">
        <div className="container enquiry-grid">
          <div className="glass enquiry-panel glass-glow-orange">
            <h2 className="section-title">
              Your First Class Is <span className="text-orange">Free</span>
            </h2>
            <p className="section-sub">Leave your details and we&apos;ll call you to fix a trial batch.</p>
            <EnquiryForm compact />
          </div>
          <MapEmbed />
        </div>
      </section>
    </>
  )
}
