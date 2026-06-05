import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [isMobileActive, setIsMobileActive] = useState(false)

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

  return (
    <header id="header" className="header">
      <Link to="/" className="logo d-flex align-items-center" onClick={closeMobileNav}>
        <img 
          src="/assets/img/zpf_logo.png" 
          alt="ZPF Ministries Logo" 
          style={{ maxHeight: '40px' }} 
        />
      </Link>

      <nav className="navmenu">
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''} 
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
              to="/contact" 
              className={({ isActive }) => isActive ? 'active' : ''} 
              onClick={closeMobileNav}
            >
              Contact
            </NavLink>
          </li>
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
