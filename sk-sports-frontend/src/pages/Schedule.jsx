import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import usePageTitle from '../hooks/usePageTitle'
import PageHero from '../components/common/PageHero'
import CTABanner from '../components/common/CTABanner'
import { classes, classCategories } from '../data/classes'
import {
  days,
  scheduleSlots,
  specialEvents,
  formatTime,
  toMinutes,
  isMorning,
  slotsForDay,
  slotStatus,
} from '../data/schedule'
import { site } from '../data/siteConfig'
import './Schedule.css'

// Colour group for each class category (matches the legend)
const groupOf = (category) => (category === 'Kids' ? 'kids' : category === 'Competition' ? 'comp' : 'teen')
const legend = [
  { group: 'kids', label: 'Kids Programs' },
  { group: 'teen', label: 'Teens & Adults' },
  { group: 'comp', label: 'Competition Team' },
]

const classById = (id) => classes.find((c) => c.id === id)

export default function Schedule() {
  usePageTitle('Schedule')
  const now = new Date()
  const today = now.getDay()

  const [category, setCategory] = useState('All')
  const [time, setTime] = useState('All') // All | Morning | Evening
  const [selectedDay, setSelectedDay] = useState(today)

  // Apply both filters
  const matches = (slot) => {
    const c = classById(slot.classId)
    if (category !== 'All' && c.category !== category) return false
    if (time === 'Morning' && !isMorning(slot)) return false
    if (time === 'Evening' && isMorning(slot)) return false
    return true
  }

  const filtered = useMemo(() => scheduleSlots.filter(matches), [category, time]) // eslint-disable-line react-hooks/exhaustive-deps

  // Rows of the weekly grid = every distinct start time
  const startTimes = useMemo(
    () => [...new Set(filtered.map((s) => s.start))].sort((a, b) => toMinutes(a) - toMinutes(b)),
    [filtered]
  )

  const todaySlots = slotsForDay(today)

  return (
    <>
      <PageHero
        title="Class Schedule"
        subtitle="Find the batch that fits your day."
        image="hero-schedule.webp"
        imageAlt="Taekwondo class in progress"
      />

      {/* ===== Today ===== */}
      <section className="section today-section">
        <div className="container">
          <h2 className="sr-only">Today&apos;s classes</h2>
          <div className="today-strip">
            {todaySlots.length === 0 && <div className="today-card glass">Rest day today: open practice only.</div>}
            {todaySlots.map((s) => {
              const c = classById(s.classId)
              const status = slotStatus(s, now)
              return (
                <div key={s.start} className={`today-card glass status-${status}`}>
                  <span className="today-card-time">{formatTime(s.start)}</span>
                  <span className="today-card-name">
                    {c.name} <small>({c.ages})</small>
                  </span>
                  {status === 'soon' && <span className="badge badge-orange">Starting Soon</span>}
                  {status === 'live' && <span className="badge badge-green">In Progress</span>}
                  {status === 'done' && <span className="badge done-badge">Done</span>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== Filters + timetable ===== */}
      <section className="section timetable-section">
        <div className="container">
          <div className="schedule-filters">
            <div className="pill-row" role="tablist" aria-label="Filter by class type">
              {classCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  className={`pill ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="segmented" role="radiogroup" aria-label="Morning or evening">
              {['All', 'Morning', 'Evening'].map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={time === t}
                  className={time === t ? 'active' : ''}
                  onClick={() => setTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop / tablet: full weekly grid */}
          <div className="week-grid-wrap">
            <div className="week-grid" style={{ '--rows': Math.max(startTimes.length, 1) }}>
              <div className="wg-corner" />
              {days.map((d) => (
                <div key={d.id} className={`wg-day ${d.id === today ? 'today' : ''}`}>
                  {d.name}
                </div>
              ))}

              {startTimes.length === 0 && <div className="wg-empty">No classes match these filters.</div>}

              {startTimes.map((start) => (
                <div key={start} className="wg-row">
                  <div className="wg-time">{formatTime(start)}</div>
                  {days.map((d) => {
                    if (d.id === 0) return null // Sunday handled below
                    const slot = filtered.find((s) => s.day === d.id && s.start === start)
                    if (!slot) return <div key={d.id} className={`wg-cell ${d.id === today ? 'today' : ''}`} />
                    const c = classById(slot.classId)
                    return (
                      <div key={d.id} className={`wg-cell ${d.id === today ? 'today' : ''}`}>
                        <Link to={`/book-trial?class=${c.id}`} className={`wg-class g-${groupOf(c.category)}`}>
                          <strong>{c.name}</strong>
                          <span>
                            {formatTime(slot.start)} – {formatTime(slot.end)}
                          </span>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              ))}

              <div className="wg-rest" style={{ gridRow: `2 / span ${Math.max(startTimes.length, 1)}` }}>
                <strong>Rest Day</strong>
                <span>Open Practice</span>
              </div>
            </div>
          </div>

          {/* Phone: one day at a time */}
          <div className="day-view">
            <div className="pill-row day-pills" role="tablist" aria-label="Choose a day">
              {days.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedDay === d.id}
                  className={`pill ${selectedDay === d.id ? 'active' : ''} ${d.id === today ? 'is-today' : ''}`}
                  onClick={() => setSelectedDay(d.id)}
                >
                  {d.short}
                </button>
              ))}
            </div>
            <ol className="timeline">
              {selectedDay === 0 && (
                <li className="timeline-item">
                  <div className="timeline-card glass rest">
                    <strong>Rest Day / Open Practice</strong>
                  </div>
                </li>
              )}
              {selectedDay !== 0 && filtered.filter((s) => s.day === selectedDay).length === 0 && (
                <li className="timeline-item">
                  <div className="timeline-card glass">No classes match these filters.</div>
                </li>
              )}
              {filtered
                .filter((s) => s.day === selectedDay)
                .sort((a, b) => toMinutes(a.start) - toMinutes(b.start))
                .map((s) => {
                  const c = classById(s.classId)
                  return (
                    <li key={s.start} className="timeline-item">
                      <span className="timeline-time">{formatTime(s.start)}</span>
                      <div className={`timeline-card glass g-${groupOf(c.category)}`}>
                        <strong>{c.name}</strong>
                        <span>
                          {formatTime(s.start)} – {formatTime(s.end)} · {c.ages}
                        </span>
                        <Link to={`/book-trial?class=${c.id}`}>Book Trial →</Link>
                      </div>
                    </li>
                  )
                })}
            </ol>
          </div>

          <ul className="legend">
            {legend.map((l) => (
              <li key={l.group}>
                <i className={`dot g-${l.group}`} aria-hidden="true" /> {l.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Special sessions ===== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Special Sessions</h2>
          <div className="events-grid">
            {specialEvents.map((e) => (
              <article key={e.title} className={`event-card ${e.color}`}>
                <h3>{e.title}</h3>
                <div className="event-row">
                  <div className="event-date">
                    <span>{e.month}</span>
                    <strong>{e.day}</strong>
                  </div>
                  <div className="event-info">
                    <span className="event-time">{e.time}</span>
                    <p>{e.text}</p>
                  </div>
                </div>
                <Link to="/contact" className="btn btn-outline btn-sm">
                  Register
                </Link>
              </article>
            ))}
          </div>

          {site.notice && (
            <div className="notice-bar" role="note">
              <HiOutlineSpeakerphone size={22} aria-hidden="true" />
              <span>{site.notice}</span>
            </div>
          )}
        </div>
      </section>

      <CTABanner eyebrow="Found your batch?" title="Book Your" highlight="Free Trial" text="Pick a batch and try your first class free." />
    </>
  )
}
