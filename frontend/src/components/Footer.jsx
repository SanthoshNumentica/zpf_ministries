import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="footer" className="footer redesign-footer">
      <div className="container">
        <div className="redesign-footer-row">
          
          {/* Left Column: Social Media */}
          <div className="redesign-footer-socials">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="redesign-footer-social-icon" aria-label="YouTube">
              <i className="bi bi-youtube"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="redesign-footer-social-icon" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="redesign-footer-social-icon" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="redesign-footer-social-icon" aria-label="Twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>

          {/* Center Column: Logo & Name */}
          <div className="redesign-footer-logo">
            <img 
              src="/assets/img/zpf_logo.png" 
              alt="ZPF Ministries Logo" 
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div>ZPF Ministries, Chennai</div>
          </div>

          {/* Right Column: Contact Details */}
          <div className="redesign-footer-contact">
            <div>
              <i className="bi bi-telephone"></i>
              <span>+91 90000 00000</span>
            </div>
            <div>
              <i className="bi bi-envelope"></i>
              <span>info@zpfministries.org</span>
            </div>
            <div>
              <i className="bi bi-geo-alt"></i>
              <span>Chennai, Tamil Nadu, India</span>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="redesign-footer-bottom">
          <p>© {new Date().getFullYear()} <strong>ZPF Ministries</strong>. All Rights Reserved.</p>
          <div className="credits" style={{ marginTop: '5px', fontSize: '0.75rem' }}>
            Designed by <a href="https://santhoshs.co.in/" target="_blank" rel="noopener noreferrer">Santhosh</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

