import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function About() {
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

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  return (
    <main className="main">
      {/* Custom Header banner */}
      <div 
        style={{ 
          position: 'relative', 
          padding: '140px 0 70px', 
          backgroundImage: 'linear-gradient(180deg, rgba(6,7,10,0.5), rgba(6,7,10,0.95)), url(/assets/img/events/showcase-9.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          borderBottom: '1px solid var(--border-gold-light)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="gold-gradient-text"
            style={{ fontSize: '3rem', textTransform: 'uppercase', marginBottom: '10px' }}
          >
            About Us
          </motion.h1>
          <div style={{ color: 'var(--text-cosmic)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            <Link to="/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 10px', opacity: 0.5 }}>/</span>
            <span style={{ color: '#fff' }}>About</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-5 align-items-center">
            
            {/* Left Content column */}
            <motion.div 
              className="col-lg-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeInUp} style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: '#fff', marginBottom: '20px' }}>
                Transforming Lives Through <span className="gold-gradient-text">Faith</span>
              </motion.h3>
              <motion.p className="lead" variants={fadeInUp} style={{ fontSize: '1.15rem', color: 'var(--text-cream)', marginBottom: '20px' }}>
                Zion Pentecostal Fellowship (ZPF Ministries) is dedicated to sharing the love of Jesus Christ, 
                teaching the pure word of God, and fostering a warm, spirit-filled community.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-cosmic)', marginBottom: '25px' }}>
                Our mission is to help people grow in their spiritual walk, find encouragement through fellowship, 
                and discover their purpose. Whether you are seeking answers about faith or looking for a home church, 
                ZPF Ministries welcomes you with open arms.
              </motion.p>

              <motion.div className="quote-section" variants={zoomIn}>
                <blockquote>
                  <p>
                    "என் தேவன் தம்முடைய ஐசுவரியத்தின்படி உங்கள் குறைவையெல்லாம் கிறிஸ்து இயேசுவுக்குள் மகிமையிலே நிறைவாக்குவார்."
                  </p>
                  <cite>— பிலிப்பியர் 4:19</cite>
                </blockquote>
              </motion.div>

              <motion.div className="cta-buttons mt-4" variants={fadeInUp}>
                <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>Join Our Service</Link>
                <Link to="/contact" className="btn-secondary">Get in Touch</Link>
              </motion.div>
            </motion.div>

            {/* Right Stats column */}
            <div className="col-lg-6">
              <motion.div 
                className="stats-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                {/* Stat 1 */}
                <motion.div 
                  className="stat-card" 
                  variants={fadeInUp}
                  whileHover={{ y: -5, borderColor: 'rgba(229,193,88,0.5)', boxShadow: 'var(--gold-glow)' }}
                >
                  <div className="stat-icon">
                    <i className="bi bi-calendar-event"></i>
                  </div>
                  <div className="stat-content">
                    <h4>Weekly Services</h4>
                    <p>Join us every Friday for spirit-filled praise and worship</p>
                  </div>
                </motion.div>

                {/* Stat 2 */}
                <motion.div 
                  className="stat-card" 
                  variants={fadeInUp}
                  whileHover={{ y: -5, borderColor: 'rgba(229,193,88,0.5)', boxShadow: 'var(--gold-glow)' }}
                >
                  <div className="stat-icon">
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="stat-content">
                    <h4>Fellowship</h4>
                    <p>Connecting families in prayer groups and house fellowships</p>
                  </div>
                </motion.div>

                {/* Stat 3 */}
                <motion.div 
                  className="stat-card" 
                  variants={fadeInUp}
                  whileHover={{ y: -5, borderColor: 'rgba(229,193,88,0.5)', boxShadow: 'var(--gold-glow)' }}
                >
                  <div className="stat-icon">
                    <i className="bi bi-mic"></i>
                  </div>
                  <div className="stat-content">
                    <h4>Youth & Kids</h4>
                    <p>Nurturing the younger generation in biblical values and faith</p>
                  </div>
                </motion.div>

                {/* Stat 4 */}
                <motion.div 
                  className="stat-card" 
                  variants={fadeInUp}
                  whileHover={{ y: -5, borderColor: 'rgba(229,193,88,0.5)', boxShadow: 'var(--gold-glow)' }}
                >
                  <div className="stat-icon">
                    <i className="bi bi-heart"></i>
                  </div>
                  <div className="stat-content">
                    <h4>Outreach</h4>
                    <p>Sharing Christ's love through local community support</p>
                  </div>
                </motion.div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
