import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="footer" className="footer position-relative dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          
          {/* Left Side */}
          <div className="col-lg-5 col-md-6 footer-about">
            <Link to="/" className="logo d-flex align-items-center">
              <span className="sitename">ZPF Ministries</span>
            </Link>
            <p className="mt-3">
              Proclaiming the Word of God with faith, love, and hope. 
              Join us in worship and spiritual growth.
            </p>
            <div className="footer-contact pt-3">
              <p><strong>Location:</strong> Chennai, Tamil Nadu</p>
              <p><strong>Email:</strong> info@zpfministries.org</p>
            </div>
          </div>

          {/* Right Side - Bible Verse */}
          <div className="col-lg-7 col-md-6 d-flex align-items-center">
            <div className="bible-verse text-md-end text-center w-100">
              <h3 className="verse-text">
                கர்த்தர் என் மேய்ப்பராயிருக்கிறார்; நான் தாழ்ச்சியடையேன்.
              </h3>
              <p className="verse-ref">— சங்கீதம் 23:1</p>
            </div>
          </div>

        </div>
      </div>

      <div className="container text-center mt-4">
        <p>© <strong>ZPF Ministries</strong> | All Rights Reserved</p>
        <div className="credits">
          Designed by <a href="https://santhoshs.co.in/" target="_blank" rel="noopener noreferrer">Santhosh</a>
        </div>
      </div>
    </footer>
  )
}
