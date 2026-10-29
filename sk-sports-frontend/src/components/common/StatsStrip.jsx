import { stats } from '../../data/content'
import './common.css'

// Row of big glowing numbers (students, medals, black belts, years).
export default function StatsStrip() {
  return (
    <div className="stats-strip">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <span className={`stat-value ${s.color}`}>{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
