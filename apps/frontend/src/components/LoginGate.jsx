import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ShinyText from './bits/ShinyText'
import SpotlightCard from './bits/SpotlightCard'

export default function LoginGate({ children }) {
  const [dob, setDob] = useState('')
  const [dobInput, setDobInput] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('zpf_logged_in') === 'true'
  })

  // Format DOB input as DD - MM - YYYY as the user types
  const handleDobInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, '') // remove non-digits
    if (value.length > 8) value = value.slice(0, 8) // max 8 digits (DDMMYYYY)
    
    let formatted = ''
    if (value.length > 0) {
      formatted += value.slice(0, 2)
    }
    if (value.length > 2) {
      formatted += ' - ' + value.slice(2, 4)
    }
    if (value.length > 4) {
      formatted += ' - ' + value.slice(4, 8)
    }
    
    setDobInput(formatted)
    
    // Update dob in DD-MM-YYYY format for matching the credentials
    if (value.length === 8) {
      const d = value.slice(0, 2)
      const m = value.slice(2, 4)
      const y = value.slice(4, 8)
      setDob(`${d}-${m}-${y}`)
    } else {
      setDob('')
    }
  }

  // Handle password input from keyboard
  const handlePasswordChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Only allow numbers
    if (value.length <= 10) {
      setError('')
      setPassword(value)
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!dob) {
      setError('Please enter a valid Date of Birth (DD - MM - YYYY).')
      return
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dob, passcode: password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        sessionStorage.setItem('zpf_logged_in', 'true')
        setIsAuthenticated(true)
      } else {
        setError(data.message || 'Access Denied. Check DOB or Passcode.')
        setPassword('')
      }
    } catch (err) {
      setError('Connection error. Please ensure the backend server is running.')
      setPassword('')
    }
  }

  const isAdminPath = window.location.pathname === '/admin'
  if (isAuthenticated || isAdminPath) {
    return <>{children}</>
  }


  return (
    <div className="login-split-container">
      {/* Left side: Very Big Logo with animation */}
      <div className="login-split-left">
        <div className="ambient-background">
          <div className="glow-sphere glow-sphere-1"></div>
          <div className="glow-sphere glow-sphere-2"></div>
        </div>
        <div className="giant-cross-glow"></div>
        <motion.div
          className="giant-cross-wrapper"
          style={{ position: 'relative', display: 'inline-block' }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 1.5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut"
          }}
        >
          {/* Left Dove facing the Cross */}
          <motion.div
            className="dove-left"
            animate={{
              y: [0, -6, 0],
              x: [0, 4, 0],
              rotate: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            <svg viewBox="0 0 512 512" width="100%" height="100%">
              <path
                d="M496 64c13.2 0 20.7 15.1 12.8 25.6L480 128 480 304c0 79.5-64.5 144-144 144l-112 0-46.3 46.3c-10.4 10.4-26.5 12.4-39.1 4.8L41.5 440.9c-17-10.2-15-35.5 3.4-42.9L160 352C23.8 311.1 7.5 169.8 22 95.7 25.6 77.9 45.3 71.4 61.3 80.2L320 224 320 144c0-44.2 35.8-80 80-80l96 0zm-96 56a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM182.5-9.6c12.4-13.7 33.3-8.9 42.5 7.1l56.4 98.3c-5.8 14.4-9.2 30.1-9.4 46.5L138.1 68c10.1-31.6 27-58.4 44.4-77.6z"
                fill="url(#giantCrossGrad)"
              />
            </svg>
          </motion.div>

          <svg width="220" height="220" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="giantCrossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bf953f" />
                <stop offset="30%" stopColor="#fcf6ba" />
                <stop offset="70%" stopColor="#b38728" />
                <stop offset="100%" stopColor="#aa771c" />
              </linearGradient>
            </defs>
            <path
              d="M12,2 L12,22 M7,8 L17,8"
              stroke="url(#giantCrossGrad)"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Right Dove facing the Cross (flipped horizontally) */}
          <motion.div
            className="dove-right"
            style={{ scaleX: -1 }}
            animate={{
              y: [0, -6, 0],
              x: [0, -4, 0],
              rotate: [0, -1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 0.8
            }}
          >
            <svg viewBox="0 0 512 512" width="100%" height="100%">
              <path
                d="M496 64c13.2 0 20.7 15.1 12.8 25.6L480 128 480 304c0 79.5-64.5 144-144 144l-112 0-46.3 46.3c-10.4 10.4-26.5 12.4-39.1 4.8L41.5 440.9c-17-10.2-15-35.5 3.4-42.9L160 352C23.8 311.1 7.5 169.8 22 95.7 25.6 77.9 45.3 71.4 61.3 80.2L320 224 320 144c0-44.2 35.8-80 80-80l96 0zm-96 56a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM182.5-9.6c12.4-13.7 33.3-8.9 42.5 7.1l56.4 98.3c-5.8 14.4-9.2 30.1-9.4 46.5L138.1 68c10.1-31.6 27-58.4 44.4-77.6z"
                fill="url(#giantCrossGrad)"
              />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Ministry Branding */}
        <h1 style={{ marginTop: '24px', fontSize: '2.4rem', fontWeight: 800, letterSpacing: '2px', textAlign: 'center' }}>
          <ShinyText text="ZPF MINISTRIES" speed={6} />
        </h1>
        <p className="text-cosmic" style={{ fontSize: '1.05rem', marginTop: '10px', opacity: 0.8, letterSpacing: '1px' }}>
          TAMIL CHRISTIAN CHURCH
        </p>

        {/* Decorative Divider */}
        <div style={{ width: '40px', height: '1px', background: 'rgba(191, 149, 63, 0.3)', marginTop: '24px', marginBottom: '24px' }}></div>

        {/* Left Side Bible Verse */}
        <div className="login-left-verse-container" style={{ maxWidth: '440px', textAlign: 'center', padding: '0 20px' }}>
          <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.6', margin: '0 0 10px 0' }}>
            "One thing I ask from the Lord, this only do I seek: that I may dwell in the house of the Lord all the days of my life..."
          </p>
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#bf953f', margin: '0 0 8px 0', lineHeight: '1.6' }}>
            "நான் கர்த்தரிடத்தில் ஒன்றைக் கேட்டேன், அதையே நாடுவேன்; நான் என் ஜீவனுள்ள நாளெல்லாம் கர்த்தருடைய ஆலயத்தில் தங்கியிருப்பதையே நாடுவேன்."
          </p>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Psalm / சங்கீதம் 27:4
          </span>
        </div>
      </div>

      {/* Right side: Login Card Form */}
      <div className="login-split-right">
        <motion.div
          className="login-card-container"
          style={{ width: '100%', maxWidth: '440px' }}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="login-card-glow"></div>
          <SpotlightCard className="login-card" spotlightColor="rgba(191, 149, 63, 0.16)">
            <div className="login-header text-center mb-3">
              <h2 className="login-title">
                Sign In
              </h2>
              <p className="text-cosmic" style={{ fontSize: '0.85rem', marginTop: '5px' }}>
                Enter your details to enter the sanctuary
              </p>
            </div>

            {/* Tamil Bible Verse */}
            <div className="login-verse-container">
              <i className="bi bi-quote quote-icon-left"></i>
              <p className="tamil-verse-text">"கர்த்தருடைய ஆலயத்திற்குப் போவோம் வாருங்கள் என்று எனக்கு அவர்கள் சொன்னபோது மகிழ்ச்சியாயிருந்தேன்."</p>
              <p className="verse-ref">சங்கீதம் 122:1</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="login-form mt-3">
              {/* DOB input */}
              <div className="form-group mb-4">
                <label className="form-label">Date of Birth</label>
                <div className="input-group-custom">
                  <i className="bi bi-calendar3 input-icon"></i>
                  <input
                    type="text"
                    className="form-control-custom"
                    placeholder="DD - MM - YYYY"
                    value={dobInput}
                    onChange={handleDobInputChange}
                    required
                  />
                </div>
              </div>

              {/* Passcode input */}
              <div className="form-group mb-4">
                <label className="form-label">Security Passcode</label>
                <div className="input-group-custom">
                  <i className="bi bi-key input-icon"></i>
                  <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="form-control-custom"
                    placeholder="Enter numbers only"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="login-error-alert"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                className="btn-login-submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={password.length === 0}
              >
                ENTER SANCTUARY
              </motion.button>
              <div className="text-center mt-3">
                <Link to="/admin" className="admin-redirect-link">
                  Are you an Admin? Login here
                </Link>
              </div>
            </form>
          </SpotlightCard>
        </motion.div>
      </div>
    </div>
  )
}
