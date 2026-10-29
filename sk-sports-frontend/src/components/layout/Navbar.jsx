import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import logo from '../../assets/logo.webp'
import { navLinks, site, whatsappLink } from '../../data/siteConfig'
import './layout.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu when the page changes
  useEffect(() => setMenuOpen(false), [pathname])

  // Make the navbar more solid after scrolling a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Stop the page behind the mobile menu from scrolling
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [menuOpen])

  return (
    <header className={`navbar-wrap ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="nav-logo" aria-label={`${site.fullName} home`}>
          <img src={logo} alt={site.name} width="150" height="82" />
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/book-trial" className="btn btn-primary nav-cta">
          Book Free Trial
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </nav>

      {/* Mobile / tablet menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} hidden={!menuOpen}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-actions">
          <Link to="/book-trial" className="btn btn-primary btn-block">
            Book Free Trial
          </Link>
          <div className="mobile-menu-row">
            <a href={`tel:${site.phoneLink}`} className="btn btn-outline">
              <FiPhone size={18} /> Call
            </a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <FaWhatsapp size={20} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
