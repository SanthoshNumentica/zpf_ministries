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

  // Scroll to section helper for homepage hashes
  const handleNavClick = (sectionId) => {
    closeMobileNav()
    if (location.pathname !== '/') {
      return // standard Link behavior to homepage will trigger scroll on mount
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <header id="header" className="header redesign-header">
      <Link to="/" className="logo d-flex align-items-center" onClick={closeMobileNav}>
        <img 
          src="/assets/img/zpf_logo.png" 
          alt="ZPF Ministries Logo" 
        />
      </Link>

      <nav className="navmenu">
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
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={closeMobileNav}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/events" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={closeMobileNav}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/sermons" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={closeMobileNav}
            >
              Sermons
            </NavLink>
          </li>
          <li>
            <Link 
              to="/#care" 
              onClick={() => handleNavClick('care')}
            >
              Care
            </Link>
          </li>
          <li>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={closeMobileNav}
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/live" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={closeMobileNav}
            >
              Live
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={closeMobileNav}
            >
              Connect
            </NavLink>
          </li>
          {sessionStorage.getItem('zpf_logged_in') === 'true' && (
            <li>
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
      
      <i 
        className={`mobile-nav-toggle bi ${isMobileActive ? 'bi-x' : 'bi-list'}`} 
        onClick={toggleMobileNav}
        aria-label="Toggle navigation menu"
      ></i>
    </header>
  )
}

