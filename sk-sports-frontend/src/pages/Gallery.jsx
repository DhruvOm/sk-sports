import { useCallback, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX, FiPlay } from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa'
import usePageTitle from '../hooks/usePageTitle'
import PageHero from '../components/common/PageHero'
import Photo from '../components/common/Photo'
import StatsStrip from '../components/common/StatsStrip'
import { galleryCategories, galleryFeatured, galleryItems, videos } from '../data/content'
import { site } from '../data/siteConfig'
import './Gallery.css'

const PAGE_SIZE = 8

export default function Gallery() {
  usePageTitle('Gallery')
  const [filter, setFilter] = useState('All')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [slide, setSlide] = useState(0)
  const [lightbox, setLightbox] = useState(null) // index in "items" or null

  const items = filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter)
  const shown = items.slice(0, visibleCount)

  // Auto-play the featured slider
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % galleryFeatured.length), 6000)
    return () => clearInterval(id)
  }, [])

  const changeFilter = (cat) => {
    setFilter(cat)
    setVisibleCount(PAGE_SIZE)
  }

  const move = useCallback(
    (step) => setLightbox((i) => (i === null ? null : (i + step + items.length) % items.length)),
    [items.length]
  )

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, move])

  const current = galleryFeatured[slide]

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Moments of sweat, strength and pride."
        image="hero-gallery.jpg"
        imageAlt="Taekwondo flying kick"
      />

      {/* ===== Featured slider ===== */}
      <section className="section featured-section">
        <div className="container">
          <div className="featured-slider glass">
            <Photo key={current.image} src={current.image} alt={current.title} className="featured-img" />
            <span className="featured-date">{current.date}</span>
            <h2 className="featured-title">{current.title}</h2>
            <button
              type="button"
              className="slider-arrow left"
              aria-label="Previous"
              onClick={() => setSlide((s) => (s - 1 + galleryFeatured.length) % galleryFeatured.length)}
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              type="button"
              className="slider-arrow right"
              aria-label="Next"
              onClick={() => setSlide((s) => (s + 1) % galleryFeatured.length)}
            >
              <FiChevronRight size={24} />
            </button>
          </div>
          <div className="slider-dots">
            {galleryFeatured.map((f, i) => (
              <button
                key={f.image}
                type="button"
                aria-label={`Show ${f.title}`}
                className={i === slide ? 'active' : ''}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Grid ===== */}
      <section className="section gallery-section">
        <div className="container">
          <div className="pill-row" role="tablist" aria-label="Filter photos">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                className={`pill ${filter === cat ? 'active' : ''}`}
                onClick={() => changeFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="masonry">
            {shown.map((g, i) => (
              <button
                key={g.image}
                type="button"
                className={`masonry-item ${g.shape}`}
                onClick={() => setLightbox(i)}
                aria-label={`Open photo: ${g.title}`}
              >
                <Photo src={g.image} alt={g.title} />
                <span className="masonry-caption">
                  <strong>{g.title}</strong>
                  <small>{g.category}</small>
                </span>
              </button>
            ))}
          </div>

          {visibleCount < items.length && (
            <div className="center-row">
              <button type="button" className="btn btn-blue load-more" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== Videos ===== */}
      <section className="section grid-bg">
        <div className="container">
          <h2 className="section-title">Videos From The Dojang</h2>
          <div className="video-row">
            {videos.map((v) => {
              const Wrapper = v.url ? 'a' : 'div'
              return (
                <Wrapper
                  key={v.title}
                  className="video-card glass"
                  {...(v.url ? { href: v.url, target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <Photo src={v.image} alt={v.title} showLabel={false} />
                  <span className="play-btn" aria-hidden="true">
                    <FiPlay size={26} />
                  </span>
                  <span className="video-title">{v.title}</span>
                </Wrapper>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="section stats-band">
        <div className="container">
          <StatsStrip />
        </div>
      </section>

      {/* ===== Instagram ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head-row insta-head">
            <h2 className="section-title">Follow Our Journey</h2>
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="insta-btn">
              <FaInstagram size={22} /> {site.socialHandles.instagram}
            </a>
          </div>
          <div className="insta-grid">
            {galleryItems.slice(0, 6).map((g) => (
              <a key={g.image} href={site.socials.instagram} target="_blank" rel="noreferrer" className="insta-item">
                <Photo src={g.image} alt={g.title} showLabel={false} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Lightbox ===== */}
      {lightbox !== null && items[lightbox] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[lightbox].title} onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setLightbox(null)}>
              Close <FiX size={18} />
            </button>
            <div className="lightbox-img">
              <Photo src={items[lightbox].image} alt={items[lightbox].title} />
            </div>
            <div className="lightbox-caption">
              <strong>{items[lightbox].title}</strong>
              <span>
                {lightbox + 1} / {items.length}
              </span>
            </div>
            <button type="button" className="slider-arrow left" aria-label="Previous photo" onClick={() => move(-1)}>
              <FiChevronLeft size={24} />
            </button>
            <button type="button" className="slider-arrow right" aria-label="Next photo" onClick={() => move(1)}>
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
