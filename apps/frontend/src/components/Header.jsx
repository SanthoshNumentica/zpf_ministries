import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Header() {
  const [isMobileActive, setIsMobileActive] = useState(false)
  const location = useLocation()

  const toggleMobileNav = () => {
    setIsMobileActive(!isMobileActive)
  }

  const closeMobileNav = () => {
    setIsMobileActive(false)
  }

  // Handle body scrolling lock when mobile nav is open
  useEffect(() => {
    if (isMobileActive) {
      document.body.classList.add('mobile-nav-active')
    } else {
      document.body.classList.remove('mobile-nav-active')
    }
    return () => {
      document.body.classList.remove('mobile-nav-active')
    }
  }, [isMobileActive])

  const handleNavClick = () => {
    closeMobileNav()
  }

  return (
    <header id="header" className="header redesign-header">
      <Link to="/" className="logo d-flex align-items-center" onClick={closeMobileNav}>
        <img
          src="/assets/img/zpf_logo.png"
          alt="ZPF Ministries Logo"
        />
      </Link>
      <nav className="navmenu align-items-center">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive && location.hash === '' ? 'active' : ''}
              onClick={closeMobileNav}
            >
              Home
            </NavLink>
          </li>
          {/* ABOUT DROPDOWN */}
          <li className="dropdown">
            <Link
              to="/about"
              className={location.pathname === '/about' && location.hash === '' ? 'active' : ''}
              onClick={closeMobileNav}
            >
              <span>About</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
            </Link>
            <ul>
              <li><Link to="/about" onClick={closeMobileNav}>About ZPF</Link></li>
              <li><Link to="/about#what-we-believe" onClick={closeMobileNav}>What We Believe</Link></li>
              <li><Link to="/about#servants" onClick={closeMobileNav}>Servants</Link></li>
            </ul>
          </li>

          {/* MEETINGS LINK */}
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={closeMobileNav}
            >
              Meetings
            </NavLink>
          </li>

          {/* MINISTRIES DROPDOWN */}
          <li className="dropdown">
            <a
              href="#"
              className={(location.pathname === '/about' && (location.hash === '#zion-ministries' || location.hash === '#deborah-fellowship' || location.hash === '#kids-bible-school' || location.hash === '#edifying-one-another')) ? 'active' : ''}
              onClick={(e) => e.preventDefault()}
            >
              <span>Ministries</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
            </a>
            <ul>
              <li><Link to="/about#zion-ministries" onClick={closeMobileNav}>Zion Ministries</Link></li>
              <li><Link to="/about#deborah-fellowship" onClick={closeMobileNav}>Deborah Fellowship</Link></li>
              <li><Link to="/about#kids-bible-school" onClick={closeMobileNav}>Kids Bible School</Link></li>
              <li><Link to="/about#edifying-one-another" onClick={closeMobileNav}>Edifying One Another</Link></li>
            </ul>
          </li>

          {/* SERMONS & SONGS DROPDOWN */}
          <li className="dropdown">
            <Link
              to="/sermons"
              className={location.pathname === '/sermons' ? 'active' : ''}
              onClick={closeMobileNav}
            >
              <span>Sermons & Songs</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
            </Link>
            <ul>
              <li><Link to="/sermons?tab=sermons" onClick={closeMobileNav}>Sermons</Link></li>
              <li><Link to="/sermons?tab=songs" onClick={closeMobileNav}>Zion Songs</Link></li>
              <li><Link to="/sermons?tab=covers" onClick={closeMobileNav}>Casual Covers</Link></li>
            </ul>
          </li>

          {/* LIVE DROPDOWN */}
          <li className="dropdown">
            <Link
              to="/live"
              className={location.pathname === '/live' ? 'active' : ''}
              onClick={closeMobileNav}
            >
              <span>Live</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
            </Link>
            <ul>
              <li><Link to="/live" onClick={closeMobileNav}>Live Broadcast</Link></li>
              <li><Link to="/live#prayer-points" onClick={closeMobileNav}>Prayer Points</Link></li>
            </ul>
          </li>

          {/* GALLERY LINK */}
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={closeMobileNav}
            >
              Gallery
            </NavLink>
          </li>
          {sessionStorage.getItem('zpf_logged_in') === 'true' && (
            <li className="mobile-only-logout">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  sessionStorage.removeItem('zpf_logged_in')
                  window.location.reload()
                }}
                style={{ color: '#e74c3c', fontWeight: 'bold' }}
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>

      {sessionStorage.getItem('zpf_logged_in') === 'true' && (
        <div className="desktop-only-logout">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              sessionStorage.removeItem('zpf_logged_in')
              window.location.reload()
            }}
            className="header-logout-btn"
          >
            Logout
          </a>
        </div>
      )}

      <i
        className={`mobile-nav-toggle bi ${isMobileActive ? 'bi-x' : 'bi-list'}`}
        onClick={toggleMobileNav}
        aria-label="Toggle navigation menu"
      ></i>
    </header>
  )
}

