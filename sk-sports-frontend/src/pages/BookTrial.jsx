import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiCheck, FiChevronLeft, FiChevronRight, FiX, FiCalendar, FiInfo } from 'react-icons/fi'
import { FaWhatsapp, FaQuoteLeft } from 'react-icons/fa'
import usePageTitle from '../hooks/usePageTitle'
import PageHero from '../components/common/PageHero'
import Accordion from '../components/common/Accordion'
import { classes } from '../data/classes'
import { scheduleSlots, formatTime, toMinutes } from '../data/schedule'
import { faqs, testimonials, trialSteps } from '../data/content'
import { site, whatsappLink } from '../data/siteConfig'
import { bookTrial, errorText } from '../services/api'
import { isValidEmail, isValidPhone, required } from '../services/validators'
import './BookTrial.css'

const STEPS = ['Student Details', 'Choose Class', 'Pick Date & Time', 'Confirm']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Suggest a class from the student's age
function suggestClass(age) {
  const a = Number(age)
  if (!a) return ''
  if (a <= 7) return 'little-dragons'
  if (a <= 12) return 'junior-warriors'
  if (a <= 17) return 'teens'
  return 'adults'
}

const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString()
const pad = (n) => String(n).padStart(2, '0')
const dateLabel = (d) => d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })

export default function BookTrial() {
  usePageTitle('Book Free Trial')
  const { search } = useLocation()
  const preselected = new URLSearchParams(search).get('class')

  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [serverError, setServerError] = useState('')
  const [form, setForm] = useState({
    studentName: '',
    age: '',
    parentName: '',
    phone: '',
    email: '',
    classId: classes.some((c) => c.id === preselected) ? preselected : '',
    date: null,
    time: '',
    consent: false,
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const isMinor = form.age !== '' && Number(form.age) < 18
  const selectedClass = classes.find((c) => c.id === form.classId)

  // Weekdays + times when the chosen class runs
  const classSlots = useMemo(
    () => scheduleSlots.filter((s) => s.classId === form.classId).sort((a, b) => toMinutes(a.start) - toMinutes(b.start)),
    [form.classId]
  )
  const classDays = new Set(classSlots.map((s) => s.day))
  const timesForDate = form.date ? classSlots.filter((s) => s.day === form.date.getDay()) : []

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: '' }))
  }

  // ---------- Validation per step ----------
  const validateStep = () => {
    const e = {}
    if (step === 0) {
      e.studentName = required(form.studentName, 'Student name')
      e.age = required(form.age, 'Age') || (form.age < 4 || form.age > 80 ? 'Age must be between 4 and 80' : '')
      e.phone = required(form.phone, 'Phone') || (isValidPhone(form.phone) ? '' : 'Enter a valid 10-digit mobile number')
      if (isMinor) e.parentName = required(form.parentName, 'Parent / guardian name')
      if (form.email && !isValidEmail(form.email)) e.email = 'Enter a valid email'
    }
    if (step === 1 && !form.classId) e.classId = 'Please choose a class'
    if (step === 2) {
      if (!form.date) e.date = 'Please pick a date'
      else if (!form.time) e.time = 'Please pick a time'
    }
    if (step === 3 && !form.consent) e.consent = 'Please confirm to continue'
    Object.keys(e).forEach((k) => !e[k] && delete e[k])
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validateStep()) return
    if (step === 0 && !form.classId) set('classId', suggestClass(form.age))
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const back = () => setStep((s) => Math.max(s - 1, 0))

    const submit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return
    setStatus('sending')
    setServerError('')
    try {
      await bookTrial({
        ...form,
        date: `${form.date.getFullYear()}-${pad(form.date.getMonth() + 1)}-${pad(form.date.getDate())}`,
      })
      setStatus('done')
    } catch (err) {
      setServerError(errorText(err))
      setStatus('idle')
    }
  }

  // ---------- Calendar ----------
  const lastBookable = new Date(today)
  lastBookable.setDate(lastBookable.getDate() + 45)

  const calendarDays = useMemo(() => {
    const first = new Date(month)
    const cells = []
    for (let i = 0; i < first.getDay(); i++) cells.push(null)
    const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    for (let d = 1; d <= total; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d))
    return cells
  }, [month])

  const isAvailable = (d) => d >= today && d <= lastBookable && classDays.has(d.getDay())

  const canPrevMonth = month > new Date(today.getFullYear(), today.getMonth(), 1)
  const canNextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1) <= lastBookable

  // ---------- Google Calendar link ----------
  const calendarLink = () => {
    if (!form.date || !form.time) return '#'
    const slot = timesForDate.find((s) => s.start === form.time)
    const ymd = `${form.date.getFullYear()}${pad(form.date.getMonth() + 1)}${pad(form.date.getDate())}`
    const t = (x) => x.replace(':', '') + '00'
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Free Taekwondo Trial – ${selectedClass?.name} (${site.name})`,
      dates: `${ymd}T${t(slot.start)}/${ymd}T${t(slot.end)}`,
      ctz: 'Asia/Kolkata',
      location: site.address,
      details: 'Bring comfortable clothes, a water bottle and a small towel. Arrive 10 minutes early.',
    })
    return `https://calendar.google.com/calendar/render?${params}`
  }

  const fieldClass = (name) => `field ${errors[name] ? 'has-error' : ''}`

  return (
    <>
      <PageHero
        title="Your First Class Is"
        highlight="Free"
        subtitle="No commitment. Just come, train, and feel the difference."
        image="hero-book-trial.jpg"
        imageAlt="Smiling student doing a Taekwondo kick"
      >
        <ul className="trust-badges">
          {['Certified Instructors', 'All Ages Welcome', '100% Free, No Fees'].map((b) => (
            <li key={b}>
              <FiCheck aria-hidden="true" /> {b}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* ===== Booking ===== */}
      <section className="section booking-section">
        <div className="container booking-grid">
          <form className="booking-form glass glass-glow-blue" onSubmit={submit} noValidate>
            {/* Step indicator */}
            <ol className="stepper">
              {STEPS.map((s, i) => (
                <li key={s} className={i === step ? 'current' : i < step ? 'done' : ''}>
                  <span className="step-num">{i < step ? <FiCheck /> : i + 1}</span>
                  <span className="step-label">{s}</span>
                </li>
              ))}
            </ol>

            {/* ---- Step 1: student ---- */}
            {step === 0 && (
              <div className="form-grid two step-body">
                <div className={fieldClass('studentName')}>
                  <label htmlFor="bt-name">Student Name *</label>
                  <input id="bt-name" value={form.studentName} onChange={(e) => set('studentName', e.target.value)} placeholder="Full name" />
                  {errors.studentName && <span className="error">{errors.studentName}</span>}
                </div>
                <div className={fieldClass('age')}>
                  <label htmlFor="bt-age">Student Age *</label>
                  <input
                    id="bt-age"
                    type="number"
                    min="4"
                    max="80"
                    value={form.age}
                    onChange={(e) => set('age', e.target.value)}
                    placeholder="e.g. 9"
                  />
                  {errors.age && <span className="error">{errors.age}</span>}
                </div>
                {isMinor && (
                  <div className={`${fieldClass('parentName')} full`}>
                    <label htmlFor="bt-parent">Parent / Guardian Name *</label>
                    <input id="bt-parent" value={form.parentName} onChange={(e) => set('parentName', e.target.value)} placeholder="Parent or guardian" />
                    {errors.parentName && <span className="error">{errors.parentName}</span>}
                  </div>
                )}
                <div className={fieldClass('phone')}>
                  <label htmlFor="bt-phone">{isMinor ? 'Parent’s Phone *' : 'Phone Number *'}</label>
                  <input
                    id="bt-phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="98765 43210"
                  />
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className={fieldClass('email')}>
                  <label htmlFor="bt-email">Email (optional)</label>
                  <input id="bt-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
              </div>
            )}

            {/* ---- Step 2: class ---- */}
            {step === 1 && (
              <div className="step-body">
                {form.age && <p className="hint">Suggested for age {form.age}: <strong>{classes.find((c) => c.id === suggestClass(form.age))?.name}</strong></p>}
                <div className="class-options" role="radiogroup" aria-label="Choose a class">
                  {classes.map((c) => (
                    <label key={c.id} className={`class-option ${form.classId === c.id ? 'selected' : ''}`} style={{ '--belt': `var(--belt-${c.belt})` }}>
                      <input
                        type="radio"
                        name="classId"
                        value={c.id}
                        checked={form.classId === c.id}
                        onChange={() => {
                          set('classId', c.id)
                          set('date', null)
                          set('time', '')
                        }}
                      />
                      <span className="class-option-name">{c.name}</span>
                      <span className="class-option-meta">
                        {c.ages} · {c.days}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.classId && <span className="error">{errors.classId}</span>}
              </div>
            )}

            {/* ---- Step 3: date & time ---- */}
            {step === 2 && (
              <div className="step-body">
                <div className="selected-class-chip">{selectedClass?.name.toUpperCase()} ({selectedClass?.ages})</div>

                <div className="calendar">
                  <div className="calendar-head">
                    <button type="button" aria-label="Previous month" disabled={!canPrevMonth} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>
                      <FiChevronLeft />
                    </button>
                    <strong>{month.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</strong>
                    <button type="button" aria-label="Next month" disabled={!canNextMonth} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>
                      <FiChevronRight />
                    </button>
                  </div>
                  <div className="calendar-grid">
                    {WEEKDAYS.map((w) => (
                      <span key={w} className="calendar-weekday">
                        {w}
                      </span>
                    ))}
                    {calendarDays.map((d, i) =>
                      d ? (
                        <button
                          key={i}
                          type="button"
                          disabled={!isAvailable(d)}
                          className={`calendar-day ${isAvailable(d) ? 'available' : ''} ${sameDay(d, form.date) ? 'selected' : ''} ${sameDay(d, today) ? 'today' : ''}`}
                          onClick={() => {
                            set('date', d)
                            set('time', '')
                          }}
                          aria-label={dateLabel(d)}
                          aria-pressed={sameDay(d, form.date)}
                        >
                          {d.getDate()}
                        </button>
                      ) : (
                        <span key={i} />
                      )
                    )}
                  </div>
                  <p className="calendar-note">Highlighted dates have a {selectedClass?.name} batch.</p>
                </div>
                {errors.date && <span className="error">{errors.date}</span>}

                {form.date && (
                  <div className="time-slots" role="radiogroup" aria-label="Choose a time">
                    {timesForDate.map((s) => (
                      <button
                        key={s.start}
                        type="button"
                        role="radio"
                        aria-checked={form.time === s.start}
                        className={`pill ${form.time === s.start ? 'active' : ''}`}
                        onClick={() => set('time', s.start)}
                      >
                        {formatTime(s.start)}
                      </button>
                    ))}
                  </div>
                )}
                {errors.time && <span className="error">{errors.time}</span>}
              </div>
            )}

            {/* ---- Step 4: confirm ---- */}
            {step === 3 && (
              <div className="step-body confirm-step">
                <h3>Please check your details</h3>
                <p>
                  Free trial for <strong>{form.studentName}</strong> (age {form.age}) in <strong>{selectedClass?.name}</strong> on{' '}
                  <strong>{dateLabel(form.date)}</strong> at <strong>{formatTime(form.time)}</strong>.
                </p>
                <p>
                  We&apos;ll confirm on <strong>{form.phone}</strong>.
                </p>
                <label className={`consent ${errors.consent ? 'has-error' : ''}`}>
                  <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
                  <span>
                    {isMinor
                      ? 'I am the parent/guardian and agree to SK Sports contacting me about this trial.'
                      : 'I agree to SK Sports contacting me about this trial.'}
                  </span>
                </label>
                {errors.consent && <span className="error">{errors.consent}</span>}
              </div>
            )}

             {serverError && (
              <p className="error" role="alert" style={{ marginTop: 16 }}>
                {serverError}
              </p>
            )}

            {/* Buttons */}
            <div className="step-actions">
              {step > 0 && (
                <button type="button" className="btn btn-outline" onClick={back}>
                  Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button type="button" className="btn btn-primary" onClick={next}>
                  Next Step
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Booking…' : 'Confirm Booking'}
                </button>
              )}
            </div>
          </form>

          {/* ===== Sidebar ===== */}
          <aside className="booking-side">
            <div className="glass summary-card">
              <h2>Booking Summary</h2>
              <dl>
                <dt>Student</dt>
                <dd>{form.studentName || '—'}</dd>
                <dt>Age</dt>
                <dd>{form.age || '—'}</dd>
                <dt>Class</dt>
                <dd>{selectedClass ? `${selectedClass.name} (${selectedClass.ages})` : '—'}</dd>
                <dt>Date</dt>
                <dd>{form.date ? dateLabel(form.date) : '—'}</dd>
                <dt>Time</dt>
                <dd>{form.time ? formatTime(form.time) : '—'}</dd>
                <dt>Location</dt>
                <dd>
                  {site.fullName}, {site.city}
                </dd>
              </dl>
            </div>
            <div className="glass bring-card">
              <h2>What to Bring</h2>
              <ul>
                {['Comfortable clothes', 'Water bottle', 'Small towel', 'Arrive 10 min early'].map((x) => (
                  <li key={x}>
                    <FiCheck aria-hidden="true" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="container">
          <p className="guardian-note">
            <FiInfo aria-hidden="true" /> <strong>Note:</strong> For students under 18, a parent or guardian must be present during the first session.
          </p>
        </div>
      </section>

      {/* ===== What happens ===== */}
      <section className="section grid-bg">
        <div className="container">
          <h2 className="section-title center">What Happens in Your Trial Class</h2>
          <ol className="trial-flow">
            {trialSteps.map((s, i) => (
              <li key={s.title} className={`trial-step ${i % 3 === 0 ? 'orange' : 'blue'}`}>
                <span className="trial-num">{pad(i + 1)}.</span>
                <strong>{s.title}</strong>
                <span>({s.time})</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Testimonials + FAQ ===== */}
      <section className="section">
        <div className="container trust-grid">
          <div>
            <h2 className="section-title">Trust &amp; Testimonials</h2>
            <div className="mini-testimonials">
              {testimonials.slice(0, 2).map((t, i) => (
                <figure key={i} className="glass">
                  <FaQuoteLeft className="text-blue" size={22} aria-hidden="true" />
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>– {t.detail}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-title">Quick Questions</h2>
            <Accordion items={faqs.trial} />
          </div>
        </div>
      </section>

      {/* ===== Success modal ===== */}
      {status === 'done' && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="booked-title">
          <div className="success-modal glass">
            <button type="button" className="modal-close" aria-label="Close" onClick={() => setStatus('idle')}>
              <FiX size={22} />
            </button>
            <div className="success-check">
              <FiCheck size={54} />
            </div>
            <h2 id="booked-title">Trial Booked!</h2>
            <p>
              See you on {dateLabel(form.date)} at {formatTime(form.time)}!
            </p>
            <a href={calendarLink()} target="_blank" rel="noreferrer" className="btn btn-outline btn-block">
              <FiCalendar /> Add to Google Calendar
            </a>
            <a
              href={whatsappLink(
                `Hi! I booked a free trial for ${form.studentName} (${selectedClass?.name}) on ${dateLabel(form.date)} at ${formatTime(form.time)}.`
              )}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-block"
            >
              <FaWhatsapp size={20} /> WhatsApp Us
            </a>
            <Link to="/" className="modal-home">
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
