import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappLink } from '../../data/siteConfig'
import './common.css'

// Orange "First class is free" banner used at the bottom of pages.
export default function CTABanner({
  eyebrow = 'Become part of our family',
  title = 'Your First Class Is',
  highlight = 'Free',
  text = 'No commitment. Just come, train and feel the difference.',
}) {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-text">
            <span className="cta-eyebrow">{eyebrow}</span>
            <h2>
              {title} <span className="text-orange">{highlight}</span>
            </h2>
            <p>{text}</p>
          </div>
          <div className="cta-actions">
            <Link to="/book-trial" className="btn btn-primary">
              Book Free Trial
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <FaWhatsapp size={20} /> WhatsApp Us
            </a>
          </div>
          <div className="cta-chevrons" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
