import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Sermons from './pages/Sermons'
import Live from './pages/Live'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import LoginGate from './components/LoginGate'
import Admin from './pages/Admin'

// ScrollRestoration component to scroll to top or hash on page/hash change
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  
  useEffect(() => {
    if (hash) {
      // Allow component render/mounting to finish
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  
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
          path="/events" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <Events />
            </motion.div>
          } 
        />
        <Route 
          path="/sermons" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <Sermons />
            </motion.div>
          } 
        />
        <Route 
          path="/live" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <Live />
            </motion.div>
          } 
        />
        <Route 
          path="/gallery" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <Gallery />
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
          path="/admin" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="page-wrapper"
            >
              <Admin />
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

// Component to handle layout with conditional Header/Footer based on route
function AppLayout() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const location = useLocation()

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

  const isAdminPage = location.pathname === '/admin'

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <LoginGate>
      <div className="app-container">
        {!isAdminPage && <Header />}

        <AnimatedRoutes />

        {!isAdminPage && <Footer />}

        {/* Scroll Top Button */}
        {!isAdminPage && (
          <a
            href="#"
            className={`scroll-top d-flex align-items-center justify-content-center ${showScrollTop ? 'active' : ''}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <i className="bi bi-arrow-up-short"></i>
          </a>
        )}
      </div>
    </LoginGate>
  )
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  )
}
