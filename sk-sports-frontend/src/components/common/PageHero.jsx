import Photo from './Photo'
import './common.css'

// The banner at the top of each inner page:
// big italic title on the left, angled photo with light streaks on the right.
export default function PageHero({ title, highlight, subtitle, image, imageAlt, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero-media">
        <Photo src={image} alt={imageAlt || title} />
        <div className="streaks" aria-hidden="true" />
      </div>
      <div className="container page-hero-content">
        <h1 className="page-hero-title">
          {title} {highlight && <span className="text-orange">{highlight}</span>}
        </h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
