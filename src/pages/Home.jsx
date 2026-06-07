import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2
    const factor = 12
    const rx = -(y / (box.height / 2)) * factor
    const ry = (x / (box.width / 2)) * factor
    card.style.setProperty('--rx', `${rx}deg`)
    card.style.setProperty('--ry', `${ry}deg`)
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <main className="main">
      {/* Creative Bespoke Hero Section */}
      <section id="hero" className="hero">
        <div className="background-overlay"></div>
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left side text details */}
            <div className="col-lg-7">
              <div className="hero-text text-start">
                <motion.span 
                  className="gold-gradient-text mb-3 d-inline-block"
                  style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 600 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  WELCOME TO ZPF MINISTRIES
                </motion.span>
                
                <motion.h1 
                  className="hero-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ marginBottom: '25px', textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
                >
                  என் <span className="gold-gradient-text">ஆவியானவர்</span> உங்கள் நடுவில் நிலைகொண்டிருப்பார்.
                </motion.h1>
                
                <motion.p 
                  className="hero-subtitle mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ color: 'var(--text-cosmic)', fontSize: '1.25rem', fontStyle: 'italic' }}
                >
                  "Fear not, for my Spirit remains among you." — (Haggai 2:5)
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="cta-buttons"
                >
                  <Link to="/about" className="btn-primary">Learn Our Mission</Link>
                  <Link to="/contact" className="btn-secondary">Join Services</Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator-wrapper"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <i className="bi bi-chevron-down" style={{ fontSize: '1.8rem', color: '#bf953f' }}></i>
        </motion.div>
      </section>

      {/* Pastors Section */}
      <section id="featured-speakers" className="featured-speakers section">
        <div className="container">
          <motion.div 
            className="section-title text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="gold-gradient-text" style={{ fontSize: '2.5rem' }}>Pastors</h2>
            <div style={{ width: '45px', height: '2px', background: 'var(--gold-metallic)', margin: '0 auto 15px' }}></div>
            <p>Our leaders who guide us in spiritual growth, truth, and community service.</p>
          </motion.div>

          <motion.div 
            className="row gy-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            style={{ marginTop: '30px' }}
          >
            {/* Pastor 1 */}
            <div className="col-lg-6 tilt-card-wrapper">
              <motion.div 
                className="speaker-card featured"
                variants={fadeInUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <div className="speaker-image h-100">
                      <img src="/assets/img/pastor.png" alt="Pastor Perinba Dhas" />
                    </div>
                  </div>
                  <div className="col-md-7 d-flex align-items-center">
                    <div className="speaker-content p-4 ps-md-4 pe-md-4">
                      <h3 className="speaker-name">Pastor. Perinba Dhas</h3>
                      <p className="speaker-bio">Leading our ministry with dedication and wisdom, teaching the path of righteousness and spiritual life.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Pastor 2 */}
            <div className="col-lg-6 tilt-card-wrapper">
              <motion.div 
                className="speaker-card featured"
                variants={fadeInUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="row g-0 h-100">
                  <div className="col-md-5">
                    <div className="speaker-image h-100">
                      <img src="/assets/img/pastor2.png" alt="Pastor Muhil" />
                    </div>
                  </div>
                  <div className="col-md-7 d-flex align-items-center">
                    <div className="speaker-content p-4 ps-md-4 pe-md-4">
                      <h3 className="speaker-name">Pastor. Muhil</h3>
                      <p className="speaker-bio">Spreading the Gospel with passion and reaching out to the hearts of the congregation and youth.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="testimonials" className="testimonials section pb-0">
        <motion.div 
          className="container section-title text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="gold-gradient-text" style={{ fontSize: '2.5rem' }}>YouTube Feed</h2>
          <div style={{ width: '45px', height: '2px', background: 'var(--gold-metallic)', margin: '0 auto 15px' }}></div>
        </motion.div>
      </section>

      <section id="videos" className="videos section pt-0">
        <div className="container">
          <motion.div 
            className="row gy-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {/* Video 1 */}
            <div className="col-lg-4 col-md-6">
              <motion.div className="video-box" variants={fadeInUp}>
                <h4 className="video-title">Friday Worship Service</h4>
                <p className="video-desc">Watch our powerful Friday worship and message.</p>
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.youtube.com/embed/seFPZUvjjjQ" 
                    title="Friday Worship Service"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </div>

            {/* Video 2 */}
            <div className="col-lg-4 col-md-6">
              <motion.div className="video-box" variants={fadeInUp}>
                <h4 className="video-title">Special Prayer Meeting</h4>
                <p className="video-desc">Join us in a special live prayer session.</p>
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.youtube.com/embed/9jwZmBheCIY" 
                    title="Special Prayer Meeting"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </div>

            {/* Video 3 */}
            <div className="col-lg-4 col-md-6">
              <motion.div className="video-box" variants={fadeInUp}>
                <h4 className="video-title">Youth Fellowship Program</h4>
                <p className="video-desc">Highlights from our recent youth fellowship gathering.</p>
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.youtube.com/embed/c3jWhjjqdaQ" 
                    title="Youth Fellowship Program"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>
    </main>
  )
}
