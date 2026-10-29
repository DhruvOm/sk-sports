import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { classes } from '../../data/classes'
import { sendEnquiry, errorText } from '../../services/api'
import { isValidEmail, isValidPhone, required } from '../../services/validators'

const emptyForm = { name: '', phone: '', email: '', age: '', classId: '', batch: 'Evening', message: '' }

// Enquiry form. compact = short version for the Home page.
export default function EnquiryForm({ compact = false }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('') // idle | sending | sent | error

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((err) => ({ ...err, [name]: '' }))
  }

  const validate = () => {
    const err = {
      name: required(form.name, 'Name'),
      phone: required(form.phone, 'Phone') || (isValidPhone(form.phone) ? '' : 'Enter a valid 10-digit mobile number'),
    }
    if (form.email && !isValidEmail(form.email)) err.email = 'Enter a valid email'
    if (form.age && (form.age < 3 || form.age > 80)) err.age = 'Enter a valid age'
    Object.keys(err).forEach((k) => !err[k] && delete err[k])
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
        try {
      await sendEnquiry(form)
      setStatus('sent')
      setForm(emptyForm)
    } catch (err) {
      setErrorMsg(errorText(err))
      setStatus('error')
    }
  }

  const fieldClass = (name) => `field ${errors[name] ? 'has-error' : ''}`

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid two">
        <div className={fieldClass('name')}>
          <label htmlFor="enq-name">Full Name *</label>
          <input id="enq-name" name="name" value={form.name} onChange={update} placeholder="Your name" autoComplete="name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className={fieldClass('phone')}>
          <label htmlFor="enq-phone">Phone Number *</label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={update}
            placeholder="98765 43210"
            autoComplete="tel"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {!compact && (
          <div className={`${fieldClass('email')} full`}>
            <label htmlFor="enq-email">Email Address</label>
            <input id="enq-email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        )}

        <div className={fieldClass('age')}>
          <label htmlFor="enq-age">Student Age</label>
          <input id="enq-age" name="age" type="number" min="3" max="80" value={form.age} onChange={update} placeholder="e.g. 9" />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div className="field">
          <label htmlFor="enq-class">Interested Class</label>
          <select id="enq-class" name="classId" value={form.classId} onChange={update}>
            <option value="">Not sure yet</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.ages})
              </option>
            ))}
          </select>
        </div>

        <div className="field full">
          <span className="label-like">Preferred Batch</span>
          <div className="radio-row" role="radiogroup" aria-label="Preferred batch">
            {['Morning', 'Evening'].map((b) => (
              <label key={b}>
                <input type="radio" name="batch" value={b} checked={form.batch === b} onChange={update} /> {b}
              </label>
            ))}
          </div>
        </div>

        {!compact && (
          <div className="field full">
            <label htmlFor="enq-message">Your Message</label>
            <textarea id="enq-message" name="message" value={form.message} onChange={update} placeholder="Any questions for us?" />
          </div>
        )}
      </div>

      <div className="enquiry-submit">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
        </button>
        {status === 'sent' && (
          <div className="toast" role="status">
            <FiCheckCircle size={22} />
            <div>
              <strong>Success!</strong>
              <br />
              Thanks, we&apos;ll call you soon.
            </div>
          </div>
        )}
                {status === 'error' && (
          <p className="error" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    </form>
  )
}
