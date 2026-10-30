import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa'
import usePageTitle from '../hooks/usePageTitle'
import PageHero from '../components/common/PageHero'
import EnquiryForm from '../components/common/EnquiryForm'
import MapEmbed from '../components/common/MapEmbed'
import Accordion from '../components/common/Accordion'
import { site, whatsappLink } from '../data/siteConfig'
import { faqs } from '../data/content'
import './Contact.css'

// Is the academy open right now? (always checks Indian time)
function isOpenNow() {
  const india = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const day = india.getDay()
  const mins = india.getHours() * 60 + india.getMinutes()
  const rule = site.hours.find((h) => h.days.includes(day))
  if (!rule || !rule.open) return false
  const toMin = (t) => Number(t.split(':')[0]) * 60 + Number(t.split(':')[1])
  return mins >= toMin(rule.open) && mins < toMin(rule.close)
}

export default function Contact() {
  usePageTitle('Contact')
  const open = isOpenNow()

  const quick = [
    { icon: FiPhone, title: 'Call Us', text: site.phone, href: `tel:${site.phoneLink}`, color: 'orange' },
    { icon: FaWhatsapp, title: 'WhatsApp', text: 'Chat Now', href: whatsappLink(), color: 'green', external: true },
    { icon: FiMail, title: 'Email Us', text: site.email, href: `mailto:${site.email}`, color: 'orange' },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      text: `${site.city}, ${site.state}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
      color: 'blue',
      external: true,
    },
  ]

  const socials = [
    { icon: FaInstagram, name: 'Instagram', handle: site.socialHandles.instagram, href: site.socials.instagram, cls: 'insta' },
    { icon: FaYoutube, name: 'YouTube', handle: site.socialHandles.youtube, href: site.socials.youtube, cls: 'yt' },
    { icon: FaFacebookF, name: 'Facebook', handle: site.socialHandles.facebook, href: site.socials.facebook, cls: 'fb' },
  ]

  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="Questions? Ready to start? We're here to help."
        image="hero-contact.webp"
        imageAlt="Students lined up in the dojang"
      />

      {/* ===== Quick contact cards ===== */}
      <section className="section quick-section">
        <div className="container quick-grid">
          {quick.map((q) => (
            <a
              key={q.title}
              href={q.href}
              className={`quick-card glass ${q.color}`}
              {...(q.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <q.icon size={34} aria-hidden="true" />
              <h2>{q.title}</h2>
              <span>{q.text}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ===== Form + map ===== */}
      <section className="section contact-main">
        <div className="container contact-grid">
          <div className="glass glass-glow-blue contact-form-panel">
            <h2 className="section-title">Send an Enquiry</h2>
            <p className="section-sub">Fill in the form and our team will call you back.</p>
            <EnquiryForm />
          </div>
          <MapEmbed />
        </div>
      </section>

      {/* ===== Hours ===== */}
      <section className="section grid-bg">
        <div className="container narrow">
          <div className="hours-head">
            <h2 className="section-title">Office &amp; Training Hours</h2>
            <span className={`open-badge ${open ? 'open' : 'closed'}`}>{open ? 'Open Now' : 'Closed Now'}</span>
          </div>
          <table className="hours-table glass">
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Timing</th>
              </tr>
            </thead>
            <tbody>
              {site.hours.map((h) => (
                <tr key={h.label}>
                  <td>{h.label}</td>
                  <td className={h.open ? '' : 'text-orange'}>{h.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== Free trial strip ===== */}
      <section className="trial-strip">
        <div className="container">
          <Link to="/book-trial">
            Your first class is <span className="text-orange">free</span>: just walk in or book online
          </Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section">
        <div className="container narrow">
          <h2 className="section-title center">FAQs</h2>
          <Accordion items={faqs.contact} />
        </div>
      </section>

      {/* ===== Socials ===== */}
      <section className="section socials-section">
        <div className="container social-grid">
          {socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className={`social-card glass ${s.cls}`}>
              <s.icon size={40} aria-hidden="true" />
              <div>
                <strong>{s.name}</strong>
                <span>{s.handle}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
