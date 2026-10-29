import { FiNavigation } from 'react-icons/fi'
import { site } from '../../data/siteConfig'
import './common.css'

// Google Map (no API key needed) with an address card on top.
export default function MapEmbed() {
  const q = encodeURIComponent(site.mapQuery)
  return (
    <div className="map-embed glass">
      <iframe
        title={`${site.fullName} location map`}
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="map-card glass">
        <h3>{site.fullName}</h3>
        <p>{site.address}</p>
        <a
          className="btn btn-blue btn-sm"
          href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
          target="_blank"
          rel="noreferrer"
        >
          <FiNavigation size={16} /> Get Directions
        </a>
      </div>
    </div>
  )
}
