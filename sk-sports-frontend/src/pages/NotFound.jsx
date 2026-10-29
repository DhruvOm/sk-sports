import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page Not Found')
  return (
    <section className="section" style={{ paddingTop: 180, textAlign: 'center', minHeight: '70vh' }}>
      <div className="container">
        <h1 className="section-title" style={{ fontSize: 'clamp(4rem, 15vw, 8rem)' }}>
          4<span className="text-orange">0</span>4
        </h1>
        <p className="section-sub center">This page took a spinning kick and disappeared.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  )
}
