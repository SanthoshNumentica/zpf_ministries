import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import LoginGate from './components/LoginGate'

// ScrollRestoration component to scroll to top on page change
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

// Wrapper to animate page transitions
function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <Home />
            </motion.div>
          } 
        />
        <Route 
          path="/about" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <About />
            </motion.div>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <Contact />
            </motion.div>
          } 
        />
        <Route 
          path="*" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <Home />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Scroll listener for top button and header scrolling class
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true)
        document.body.classList.add('scrolled')
      } else {
        setShowScrollTop(false)
        document.body.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Router>
      <ScrollToTop />
      
      <LoginGate>
        <div className="app-container">
          <Header />
          
          <AnimatedRoutes />

          <Footer />

          {/* Scroll Top Button */}
          <a 
            href="#" 
            className={`scroll-top d-flex align-items-center justify-content-center ${showScrollTop ? 'active' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <i className="bi bi-arrow-up-short"></i>
          </a>
        </div>
      </LoginGate>
    </Router>
  )
}
