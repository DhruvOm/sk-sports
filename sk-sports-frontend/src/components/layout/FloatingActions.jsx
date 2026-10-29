import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { site, whatsappLink } from '../../data/siteConfig'
import './layout.css'

// Floating WhatsApp button (all screens) +
// sticky "Call / Book Free Trial" bar (phones only).
export default function FloatingActions() {
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </a>

      <div className="mobile-bar">
        <a href={`tel:${site.phoneLink}`} className="btn btn-outline">
          <FiPhone size={18} /> Call
        </a>
        <Link to="/book-trial" className="btn btn-primary">
          Book Free Trial
        </Link>
      </div>
    </>
  )
}
