import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'
import usePageTitle from '../hooks/usePageTitle'
import PageHero from '../components/common/PageHero'
import ClassCard from '../components/common/ClassCard'
import Photo from '../components/common/Photo'
import Icon from '../components/common/Icon'
import BeltIcon from '../components/common/BeltIcon'
import Accordion from '../components/common/Accordion'
import CTABanner from '../components/common/CTABanner'
import { classes, classCategories } from '../data/classes'
import { belts } from '../data/belts'
import { days, slotsForDay, formatTime } from '../data/schedule'
import { faqs } from '../data/content'
import './Classes.css'

const benefits = [
  { icon: 'fitness', label: 'Fitness' },
  { icon: 'selfcontrol', label: 'Focus' },
  { icon: 'spirit', label: 'Confidence' },
  { icon: 'courtesy', label: 'Discipline' },
]

export default function Classes() {
  usePageTitle('Classes')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(classes[1])
  const [day, setDay] = useState(new Date().getDay() || 1)
  const detailRef = useRef(null)

  const visible = filter === 'All' ? classes : classes.filter((c) => c.category === filter)

  const showDetails = (item) => {
    setSelected(item)
    detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <PageHero
        title="Our Classes"
        subtitle="Programs for every age, skill level, and goal."
        image="hero-classes.webp"
        imageAlt="Students training Taekwondo kicks in the dojang"
      >
        <div className="pill-row hero-pills" role="tablist" aria-label="Filter classes">
          {classCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              className={`pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </PageHero>

      {/* ===== Programs ===== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Programs &amp; Classes</h2>
          <div className="classes-grid">
            {visible.map((c) => (
              <ClassCard key={c.id} item={c} onDetails={showDetails} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Selected class details ===== */}
      <section className="section grid-bg class-detail-section" ref={detailRef}>
        <div className="container class-detail glass" style={{ '--belt': `var(--belt-${selected.belt})` }}>
          <div className="class-detail-media">
            <Photo src={selected.image} alt={selected.name} />
          </div>
          <div className="class-detail-body">
            <span className="badge badge-orange">Featured Class</span>
            <h2>
              {selected.name} <span>({selected.ages})</span>
            </h2>
            <p className="class-detail-text">{selected.short}</p>
            <h3>What You&apos;ll Learn</h3>
            <ul className="learn-list">
              {selected.learn.map((l) => (
                <li key={l}>
                  <FiCheckCircle aria-hidden="true" /> {l}
                </li>
              ))}
            </ul>
            <div className="benefits">
              {benefits.map((b) => (
                <div key={b.label} className="benefit">
                  <Icon name={b.icon} size={22} />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
            <Link to={`/book-trial?class=${selected.id}`} className="btn btn-primary">
              Book a Free Trial for {selected.name}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Belt progression ===== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Interactive Belt Progression</h2>
          <p className="section-sub">Tap a belt to see what students learn at each level.</p>
          <div className="belt-track">
            {belts.map((b) => (
              <Link key={b.id} to={`/belt-progress?belt=${b.id}`} className="belt-track-item">
                <BeltIcon color={b.color} size={120} glow />
                <span>{b.name.replace(' Belt', '')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Timetable preview ===== */}
      <section className="section grid-bg">
        <div className="container">
          <div className="section-head-row">
            <h2 className="section-title">Weekly Timetable</h2>
            <Link to="/schedule" className="btn btn-outline">
              Full Schedule <FiArrowRight />
            </Link>
          </div>
          <div className="pill-row" role="tablist" aria-label="Choose a day">
            {days.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={day === d.id}
                className={`pill ${day === d.id ? 'active' : ''}`}
                onClick={() => setDay(d.id)}
              >
                {d.short}
              </button>
            ))}
          </div>
          <div className="mini-timetable">
            {slotsForDay(day).length === 0 && <div className="glass mini-slot">Rest day: open practice only.</div>}
            {slotsForDay(day).map((s) => {
              const c = classes.find((x) => x.id === s.classId)
              return (
                <div key={s.start} className="glass mini-slot" style={{ '--belt': `var(--belt-${c.belt})` }}>
                  <span className="mini-time">
                    {formatTime(s.start)} – {formatTime(s.end)}
                  </span>
                  <strong>{c.name}</strong>
                  <span className="mini-ages">{c.ages}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section">
        <div className="container narrow">
          <h2 className="section-title center">Questions</h2>
          <p className="section-sub center">Everything parents usually ask before the first class.</p>
          <Accordion items={faqs.classes} defaultOpen={0} />
        </div>
      </section>

      <CTABanner eyebrow="Not sure which class fits?" title="Book a" highlight="Free Trial" text="Our trainers will help you choose the right batch." />
    </>
  )
}
