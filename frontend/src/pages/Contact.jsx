import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setStatus('success')
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again later.')
      setStatus('error')
    }
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
    <main className="main redesign-mode">
      {/* 1. CONTACT HERO BANNER */}
      <div className="about-banner">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="mx-2" style={{ margin: '0 8px', color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>Contact</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          
          {/* Contact Info Boxes */}
          <motion.div 
            className="row gy-4 mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {/* Location Box */}
            <div className="col-lg-4">
              <motion.div 
                className="contact-info-box" 
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: 'rgba(229,193,88,0.5)', boxShadow: 'var(--gold-glow)' }}
              >
                <div className="icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="info-content">
                  <h4>Our Location</h4>
                  <p>Chennai, Tamil Nadu, India</p>
                </div>
              </motion.div>
            </div>

            {/* Email Box */}
            <div className="col-lg-4">
              <motion.div 
                className="contact-info-box" 
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: 'rgba(229,193,88,0.5)', boxShadow: 'var(--gold-glow)' }}
              >
                <div className="icon-box">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="info-content">
                  <h4>Email Address</h4>
                  <p>zpfministries@gmail.com</p>
                  <p>info@zpfministries.org</p>
                </div>
              </motion.div>
            </div>

            {/* Timings Box */}
            <div className="col-lg-4">
              <motion.div 
                className="contact-info-box" 
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: 'rgba(229,193,88,0.5)', boxShadow: 'var(--gold-glow)' }}
              >
                <div className="icon-box">
                  <i className="bi bi-headset"></i>
                </div>
                <div className="info-content">
                  <h4>Church Service Timing</h4>
                  <p>Friday Morning: 9:00 AM - 12:30 PM</p>
                  <p>Friday Evening: 6:00 PM - 8:30 PM</p>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>

        {/* Google Maps (Full Width) */}
        <motion.div 
          className="map-section container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          style={{ padding: '0 15px', marginBottom: '60px' }}
        >
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #eaeaea', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.88653927238!2d80.06892543329971!3d12.981146747209673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x82a477911094864e!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" 
              height="450" 
              style={{ border: 0, display: 'block' }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ZPF Ministries Location Map"
            ></iframe>
          </div>
        </motion.div>

        {/* Contact Form Section (Overlapping) */}
        <div className="container form-container-overlap">
          <div className="row justify-content-center">
            <div className="col-lg-10" style={{ padding: '0 15px' }}>
              <motion.div 
                className="contact-form-wrapper"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
              >
                <h2 className="text-center mb-5 gold-gradient-text" style={{ display: 'block', width: '100%' }}>Get in Touch</h2>

                <form onSubmit={handleSubmit} className="php-email-form">
                  <div className="row g-4">
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <i className="bi bi-person"></i>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="name" 
                            placeholder="Your Name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <i className="bi bi-envelope"></i>
                          <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            placeholder="Email Address" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <i className="bi bi-text-left"></i>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="subject" 
                            placeholder="Subject" 
                            value={formData.subject}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <div className="input-with-icon">
                          <i className="bi bi-chat-dots message-icon"></i>
                          <textarea 
                            className="form-control" 
                            name="message" 
                            placeholder="Write Message..." 
                            style={{ height: '180px' }} 
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <AnimatePresence>
                        {status === 'loading' && (
                          <motion.div 
                            className="loading d-block"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            Sending Message...
                          </motion.div>
                        )}
                        {status === 'error' && (
                          <motion.div 
                            className="error-message d-block"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            {errorMessage}
                          </motion.div>
                        )}
                        {status === 'success' && (
                          <motion.div 
                            className="sent-message d-block"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            Your message has been sent. Thank you!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="col-12 text-center mt-4">
                      <motion.button 
                        type="submit" 
                        className="btn btn-primary btn-submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        SEND MESSAGE
                      </motion.button>
                    </div>

                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}
