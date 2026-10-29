import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaInstagram, FaYoutube, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import logo from '../../assets/logo.webp'
import { navLinks, site, whatsappLink } from '../../data/siteConfig'
import './layout.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={logo} alt={site.name} width="160" height="88" loading="lazy" />
          <p>
            Taekwondo classes for kids, teens & adults in {site.city}. Discipline. Power. Confidence.
          </p>
          <div className="footer-socials">
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href={site.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube size={18} />
            </a>
            <a href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF size={16} />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="footer-title">Contact Info</h3>
          <ul className="footer-list">
            <li>
              <FiMapPin aria-hidden="true" /> {site.address}
            </li>
            <li>
              <FiPhone aria-hidden="true" /> <a href={`tel:${site.phoneLink}`}>{site.phone}</a>
            </li>
            <li>
              <FiMail aria-hidden="true" /> <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Timings</h3>
          <ul className="footer-list plain">
            {site.hours.map((h) => (
              <li key={h.label}>
                <span>{h.label}:</span>{' '}
                <span className={h.open ? '' : 'text-orange'}>{h.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list plain footer-links">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/book-trial">Book Free Trial</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {year} {site.fullName}, {site.city}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
