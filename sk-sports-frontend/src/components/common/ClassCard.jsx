import { Link } from 'react-router-dom'
import { FiClock, FiCalendar, FiBarChart2 } from 'react-icons/fi'
import Photo from './Photo'
import './ClassCard.css'

const beltColor = (belt) => `var(--belt-${belt})`

// Card for one class/program.
// variant="full"    -> photo + details + buttons (Classes page)
// variant="compact" -> title + belt strip + text (Home page)
export default function ClassCard({ item, variant = 'full', onDetails }) {
  if (variant === 'compact') {
    return (
      <article className="class-card-compact glass" style={{ '--belt': beltColor(item.belt) }}>
        <h3>{item.category}</h3>
        <div className="belt-strip" aria-hidden="true" />
        <h4>
          {item.name} <span>({item.ages})</span>
        </h4>
        <p>{item.short}</p>
        <Link to={`/book-trial?class=${item.id}`} className="card-link">
          Book a trial →
        </Link>
      </article>
    )
  }

  return (
    <article className="class-card glass" style={{ '--belt': beltColor(item.belt) }}>
      <div className="class-card-media">
        <Photo src={item.image} alt={`${item.name} Taekwondo class`} />
      </div>
      <div className="class-card-body">
        <h3>
          {item.name}
          <span>({item.ages})</span>
        </h3>
        <div className="belt-strip" aria-hidden="true" />
        <p>{item.short}</p>
        <div className="class-chips">
          <span className="chip">
            <FiClock aria-hidden="true" /> {item.duration}
          </span>
          <span className="chip">
            <FiCalendar aria-hidden="true" /> {item.days}
          </span>
          <span className="chip">
            <FiBarChart2 aria-hidden="true" /> {item.level}
          </span>
        </div>
        <div className="class-actions">
          {onDetails && (
            <button type="button" className="btn btn-outline btn-sm" onClick={() => onDetails(item)}>
              View Details
            </button>
          )}
          <Link to={`/book-trial?class=${item.id}`} className="btn btn-primary btn-sm">
            Book Trial
          </Link>
        </div>
      </div>
    </article>
  )
}
