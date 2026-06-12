import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    
    // Update dob in YYYY-MM-DD format for matching the credentials
    if (value.length === 8) {
      const d = value.slice(0, 2)
      const m = value.slice(2, 4)
      const y = value.slice(4, 8)
      setDob(`${y}-${m}-${d}`)
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
    <div className="login-gate-wrapper">
      {/* Background glowing spheres */}
      <div className="ambient-background">
        <div className="glow-sphere glow-sphere-1"></div>
        <div className="glow-sphere glow-sphere-2"></div>
      </div>

      {/* Rotating Holy Cross Outline Background */}
      <svg className="sacred-cross-bg" viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="goldCrossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bf953f" />
            <stop offset="30%" stopColor="#fcf6ba" />
            <stop offset="70%" stopColor="#b38728" />
            <stop offset="100%" stopColor="#aa771c" />
          </linearGradient>
        </defs>
        <path
          d="M50,15 L50,85 M35,38 L65,38"
          stroke="url(#goldCrossGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      <motion.div
        className="login-card-container"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="login-card-glow"></div>
        <div className="login-card">
          <div className="login-header text-center">
            <motion.div
              className="logo-icon-wrapper"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <i className="bi bi-shield-lock lock-icon"></i>
            </motion.div>
            <h2 className="login-title">ZPF Ministries</h2>
          </div>

          {/* Tamil Bible Verse */}
          <div className="login-verse-container">
            <i className="bi bi-quote quote-icon-left"></i>
            <p className="tamil-verse-text">"கர்த்தருடைய ஆலயத்திற்குப் போவோம் வாருங்கள் என்று எனக்கு அவர்கள் சொன்னபோது மகிழ்ச்சியாயிருந்தேன்."</p>
            <p className="verse-ref">சங்கீதம் 122:1</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-form mt-3">
            {/* Step 1: DOB text input */}
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

            {/* Step 2: Passcode input */}
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

            {/* Error Message */}
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
          </form>
        </div>
      </motion.div>
    </div>
  )
}
