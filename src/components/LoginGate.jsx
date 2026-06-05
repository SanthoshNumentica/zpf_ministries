import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoginGate({ children }) {
  const [dob, setDob] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('zpf_logged_in') === 'true'
  })

  // Handle keypad taps
  const handleKeyPress = (num) => {
    setError('')
    if (password.length < 10) {
      setPassword((prev) => prev + num)
    }
  }

  const handleDelete = () => {
    setError('')
    setPassword((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    setError('')
    setPassword('')
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setError('')

    const correctDob = '1995-08-15'
    const correctPassword = '7777'

    if (dob === correctDob && password === correctPassword) {
      localStorage.setItem('zpf_logged_in', 'true')
      setIsAuthenticated(true)
    } else {
      setError('Access Denied. Check DOB or Passcode.')
      // Reset passcode on error to let user re-try
      setPassword('')
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  // Display dots (at least 4, expanding if more characters typed)
  const numDots = Math.max(4, password.length)
  const dotsArray = Array.from({ length: numDots })

  const keypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

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
            <p className="login-subtitle">Enter credentials to enter the sanctuary</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-form mt-4">
            {/* Step 1: DOB picker */}
            <div className="form-group mb-4">
              <label className="form-label">Date of Birth</label>
              <div className="input-group-custom">
                <i className="bi bi-calendar3 input-icon"></i>
                <input 
                  type="date" 
                  className="form-control-custom"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Step 2: Passcode secure dot display */}
            <div className="form-group mb-4 text-center">
              <label className="form-label d-block mb-3">Security Passcode</label>
              <div className="passcode-dots-container d-flex justify-content-center gap-3">
                {dotsArray.map((_, index) => {
                  const isFilled = index < password.length
                  return (
                    <motion.div
                      key={index}
                      className={`passcode-dot ${isFilled ? 'filled' : ''}`}
                      animate={isFilled ? { scale: [1, 1.2, 1], shadow: '0 0 10px #e5c158' } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )
                })}
              </div>
            </div>

            {/* Step 3: Interactive numeric dialer */}
            <div className="keypad-container mb-4">
              <div className="keypad-grid">
                {keypadNumbers.map((num) => (
                  <motion.button
                    key={num}
                    type="button"
                    className="keypad-btn"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(229, 193, 88, 0.15)' }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleKeyPress(num)}
                  >
                    {num}
                  </motion.button>
                ))}
                
                {/* Clear button */}
                <motion.button
                  type="button"
                  className="keypad-btn control"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={handleClear}
                >
                  C
                </motion.button>
                
                {/* Zero */}
                <motion.button
                  type="button"
                  className="keypad-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleKeyPress('0')}
                >
                  0
                </motion.button>
                
                {/* Delete button */}
                <motion.button
                  type="button"
                  className="keypad-btn control"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={handleDelete}
                  aria-label="Delete last digit"
                >
                  <i className="bi bi-backspace"></i>
                </motion.button>
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

          <div className="credential-hint mt-4 text-center">
            <p className="hint-title">🔑 Access Code Hint</p>
            <p className="hint-detail">DOB: <code>1995-08-15</code> | Pin: <code>7777</code></p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
