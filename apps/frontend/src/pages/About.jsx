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

  return (
    <main className="main redesign-mode">
      
      {/* 1. ABOUT HERO BANNER */}
      <div className="about-banner">
        <div className="container">
          <h1>About Us</h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="mx-2" style={{ margin: '0 8px', color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>About</span>
          </div>
        </div>
      </div>

      {/* 2. WHO WE ARE & FOUNDER */}
      <section className="redesign-section light-bg">
        <div className="container">
          <div className="row align-items-center gy-5">
            
            {/* History Details */}
            <div className="col-lg-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeInUp} style={{ fontSize: '2.4rem', marginBottom: '20px' }}>
                  Who Are We?
                </motion.h2>
                <motion.p className="lead" variants={fadeInUp} style={{ fontSize: '1.15rem', color: '#555', marginBottom: '20px', lineHeight: '1.7' }}>
                  Zion Prayer Fellowship (ZPF Ministries) is a spirit-filled sanctuary dedicated to sharing the gospel, fostering spiritual maturity, and serving the community since its inception.
                </motion.p>
                <motion.div variants={fadeInUp} style={{ background: '#f8f9fa', borderLeft: '4px solid #2563eb', padding: '20px', marginBottom: '20px', borderRadius: '0 8px 8px 0' }}>
                  <h4 style={{ fontWeight: 800, color: '#1a1a1a', marginBottom: '5px' }}>Starting Year</h4>
                  <p style={{ color: '#555', margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>July 2002</p>
                </motion.div>
                <motion.p variants={fadeInUp} style={{ color: '#666', lineHeight: '1.6' }}>
                  For over two decades, we have remained committed to preaching the unadulterated word of God, raising foundational generations in truth, and ministering to families throughout Chennai.
                </motion.p>
              </motion.div>
            </div>

            {/* Founder Card */}
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="pastor-family-card">
                  <img 
                    src="/assets/img/founder_family.png" 
                    alt="Founder Bro. Perinba Dhas and Family" 
                    className="pastor-family-card-img"
                  />
                  <div className="pastor-family-card-body">
                    <h3 className="pastor-family-card-title">Bro. Perinba Dhas</h3>
                    <p className="pastor-family-card-role">Our Founder & Senior Pastor</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHAT WE BELIEVE */}
      <section className="redesign-section gray-bg">
        <div className="container">
          <div className="redesign-section-header">
            <h2>What We Believe?</h2>
            <p>Our statement of faith underpins all our ministries, teachings, and spiritual growth initiatives.</p>
          </div>

          <div className="belief-grid">
            {/* Card 1 */}
            <div className="belief-card">
              <i className="bi bi-shield-check belief-card-icon"></i>
              <h3 className="belief-card-title">The Holy Trinity</h3>
              <p className="belief-card-text">
                We believe in one God, eternally existing in three distinct persons: Father, Son, and Holy Spirit.
              </p>
            </div>

            {/* Card 2 */}
            <div className="belief-card">
              <i className="bi bi-book belief-card-icon"></i>
              <h3 className="belief-card-title">Holy Scripture</h3>
              <p className="belief-card-text">
                We believe the Bible is the inspired, infallible, and authoritative Word of God, our supreme guide in faith and life.
              </p>
            </div>

            {/* Card 3 */}
            <div className="belief-card">
              <i className="bi bi-heart-pulse belief-card-icon"></i>
              <h3 className="belief-card-title">Salvation</h3>
              <p className="belief-card-text">
                Salvation is received through faith alone in Jesus Christ, who died for our sins and was raised for our justification.
              </p>
            </div>

            {/* Card 4 */}
            <div className="belief-card">
              <i className="bi bi-droplet-half belief-card-icon"></i>
              <h3 className="belief-card-title">Water Baptism</h3>
              <p className="belief-card-text">
                We practice baptism by immersion in water in the name of the Father, Son, and Holy Spirit as a public testimony of faith.
              </p>
            </div>

            {/* Card 5 */}
            <div className="belief-card">
              <i className="bi bi-fire belief-card-icon"></i>
              <h3 className="belief-card-title">Holy Spirit Baptism</h3>
              <p className="belief-card-text">
                We believe in the baptism of the Holy Spirit with the evidence of speaking in tongues, empowering believers for life and service.
              </p>
            </div>

            {/* Card 6 */}
            <div className="belief-card">
              <i className="bi bi-sunrise belief-card-icon"></i>
              <h3 className="belief-card-title">Second Coming</h3>
              <p className="belief-card-text">
                We anticipate the glorious, visible return of our Lord Jesus Christ to establish His kingdom and judge the living and the dead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SERVANTS */}
      <section className="redesign-section light-bg">
        <div className="container">
          <div className="redesign-section-header">
            <h2>Our Servants</h2>
            <p>Meet the leaders, teachers, and coordinators who serve dedicatedly to build Zion Prayer Fellowship.</p>
          </div>

          {/* Current Pastor */}
          <div className="row align-items-center gy-5" style={{ marginBottom: '60px' }}>
            <div className="col-lg-6 order-lg-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="pastor-family-card">
                  <img 
                    src="/assets/img/muhil_family.png" 
                    alt="Pastor Bro. Muhil and Family" 
                    className="pastor-family-card-img"
                  />
                  <div className="pastor-family-card-body">
                    <h3 className="pastor-family-card-title">Bro. Muhil</h3>
                    <p className="pastor-family-card-role">Our Pastor</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-6 order-lg-1">
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>Pastoral Leadership</h3>
              <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '15px' }}>
                Pastor Bro. Muhil leads our weekly services, coordinates support team units, and preaches the Gospel with passion and spirit-led guidance.
              </p>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Dedicated to shepherding the congregation, teaching biblical foundation classes, and encouraging members to grow in their personal prayer lives.
              </p>
            </div>
          </div>

          {/* Elders & Kids Bible School Teachers */}
          <div className="row g-4" style={{ marginBottom: '60px' }}>
            {/* Elders Panel */}
            <div className="col-md-6">
              <h3 className="servants-subheading">Elders</h3>
              <div className="row g-3">
                {[
                  { name: 'Bro. Alwyn', image: '/assets/img/servants/elder_alwyn.png', role: 'Church Elder' },
                  { name: 'Bro. Asir', image: '/assets/img/servants/elder_asir.png', role: 'Church Elder' },
                  { name: 'Bro. Simon', image: '/assets/img/servants/elder_simon.png', role: 'Church Elder' }
                ].map((elder, idx) => (
                  <div className="col-sm-6" key={idx}>
                    <div className="servant-profile-card">
                      <div className="servant-profile-img-wrapper">
                        <img src={elder.image} alt={elder.name} className="servant-profile-img" />
                        <div className="servant-profile-overlay">
                          <div className="servant-profile-name">{elder.name}</div>
                        </div>
                      </div>
                      <div className="servant-profile-role">{elder.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teachers Panel */}
            <div className="col-md-6">
              <h3 className="servants-subheading">Kids Bible School Teachers</h3>
              <div className="row g-3">
                {[
                  { name: 'Bro. Prabu', image: '/assets/img/servants/teacher_prabu.png', role: 'Sunday School Teacher' },
                  { name: 'Sis. Jancy', image: '/assets/img/servants/teacher_jancy.png', role: 'Sunday School Teacher' },
                  { name: 'Sis. Nithya', image: '/assets/img/person/person-f-6.webp', role: 'Sunday School Teacher' },
                  { name: 'Sis. Helen', image: '/assets/img/person/person-f-10.webp', role: 'Sunday School Teacher' },
                  { name: 'Sis. Shobha', image: '/assets/img/person/person-f-12.webp', role: 'Sunday School Teacher' }
                ].map((teacher, idx) => (
                  <div className="col-sm-6" key={idx}>
                    <div className="servant-profile-card">
                      <div className="servant-profile-img-wrapper">
                        <img src={teacher.image} alt={teacher.name} className="servant-profile-img" />
                        <div className="servant-profile-overlay">
                          <div className="servant-profile-name">{teacher.name}</div>
                        </div>
                      </div>
                      <div className="servant-profile-role">{teacher.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deacons (Tamil & English services) */}
          <div style={{ marginBottom: '60px' }}>
            <h3 className="servants-subheading">Service Deacons</h3>
            
            <div className="row gy-4">
              {/* Tamil Service Deacons */}
              <div className="col-lg-6">
                <h4 style={{ fontWeight: 800, color: '#111', marginBottom: '15px' }}>Tamil Service Deacons</h4>
                <div className="servants-table-container">
                  <table className="servants-table">
                    <thead>
                      <tr>
                        <th>Worship Ministry</th>
                        <th>Psalms & Short Sermons</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="servant-list-tags">
                            {[
                              { name: 'Bro. James', image: '/assets/img/events/speaker-1.webp' },
                              { name: 'Bro. Vinu', image: '/assets/img/events/speaker-2.webp' },
                              { name: 'Bro. Moses', image: '/assets/img/events/speaker-3.webp' },
                              { name: 'Bro. Prabu', image: '/assets/img/events/speaker-4.webp' },
                              { name: 'Bro. Raja Mohan', image: '/assets/img/events/speaker-5.webp' }
                            ].map((deacon, i) => (
                              <span className="servant-list-tag blue-tag" key={i}>
                                <img src={deacon.image} alt={deacon.name} className="servant-tag-img" />
                                {deacon.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="servant-list-tags">
                            {[
                              { name: 'Bro. John Peter', image: '/assets/img/events/speaker-6.webp' },
                              { name: 'Bro. Vigil', image: '/assets/img/events/speaker-7.webp' },
                              { name: 'Bro. Gilbert', image: '/assets/img/events/speaker-8.webp' },
                              { name: 'Bro. Philip', image: '/assets/img/events/speaker-9.webp' }
                            ].map((deacon, i) => (
                              <span className="servant-list-tag orange-tag" key={i}>
                                <img src={deacon.image} alt={deacon.name} className="servant-tag-img" />
                                {deacon.name}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* English Service Deacons */}
              <div className="col-lg-6">
                <h4 style={{ fontWeight: 800, color: '#111', marginBottom: '15px' }}>English Service Deacons</h4>
                <div className="servants-table-container">
                  <table className="servants-table">
                    <thead>
                      <tr>
                        <th>Family Worship</th>
                        <th>Sermons</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="servant-list-tags">
                            {[
                              { name: 'Deacon Families', image: '/assets/img/person/person-f-10.webp' }
                            ].map((deacon, i) => (
                              <span className="servant-list-tag blue-tag" key={i}>
                                <img src={deacon.image} alt={deacon.name} className="servant-tag-img" />
                                {deacon.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="servant-list-tags">
                            {[
                              { name: 'Bro. Prabu', image: '/assets/img/events/speaker-4.webp' },
                              { name: 'Bro. Jeremiah', image: '/assets/img/events/speaker-10.webp' },
                              { name: 'Bro. Joseph Mani', image: '/assets/img/events/speaker-11.webp' }
                            ].map((deacon, i) => (
                              <span className="servant-list-tag orange-tag" key={i}>
                                <img src={deacon.image} alt={deacon.name} className="servant-tag-img" />
                                {deacon.name}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Support Ministries */}
          <div>
            <h3 className="servants-subheading">Support Ministries Deacons</h3>
            <div className="servants-table-container">
              <table className="servants-table">
                <thead>
                  <tr>
                    <th>Ministry Area</th>
                    <th>Appointed Deacons / Support Staff</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Media Team</strong></td>
                    <td>
                      <div className="servant-list-tags">
                        {[
                          'Bro. Gilbert',
                          'Bro. Pon Christopher',
                          'Bro. Immanuel',
                          'Bro. Milton'
                        ].map((name, i) => (
                          <span className="servant-list-tag" key={i}>
                            {name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Food Ministry</strong></td>
                    <td>
                      <div className="servant-list-tags">
                        {[
                          'Bro. James & Team'
                        ].map((name, i) => (
                          <span className="servant-list-tag" key={i}>
                            {name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Cleaning Team</strong></td>
                    <td>
                      <div className="servant-list-tags">
                        {[
                          'Bro. Gilbert',
                          'Bro. Pon Christopher',
                          'Bro. Dhinesh',
                          'Bro. Immanuel'
                        ].map((name, i) => (
                          <span className="servant-list-tag" key={i}>
                            {name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Maintenance Team</strong></td>
                    <td>
                      <div className="servant-list-tags">
                        {[
                          'Bro. Gilbert',
                          'Bro. Arul Prabu',
                          'Bro. Joshua',
                          'Bro. Moses',
                          'Bro. Simon',
                          'Bro. Ravivarma'
                        ].map((name, i) => (
                          <span className="servant-list-tag" key={i}>
                            {name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Transport Team</strong></td>
                    <td>
                      <div className="servant-list-tags">
                        {[
                          'All Brothers'
                        ].map((name, i) => (
                          <span className="servant-list-tag" key={i}>
                            {name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 5. MINISTRIES & EQUIPPING */}
      <section className="redesign-section gray-bg">
        <div className="container">
          <div className="redesign-section-header">
            <h2>Our Ministries</h2>
            <p>Zion Prayer Fellowship actively runs fellowships, education clubs, equipping courses, and missionary support programs.</p>
          </div>

          <div className="row g-4" style={{ marginBottom: '60px' }}>
            {/* Deborah Fellowship */}
            <div className="col-md-6">
              <div className="campus-card" style={{ padding: '35px' }}>
                <i className="bi bi-gender-female" style={{ fontSize: '2.5rem', color: '#a855f7', marginBottom: '15px' }}></i>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px' }}>Deborah Fellowship</h3>
                <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6', margin: 0 }}>
                  A monthly gathering for women focusing on intercessory prayers for families, missions, and spiritual mentorship. Every First Wednesday from 8:00 PM – 9:30 PM.
                </p>
              </div>
            </div>

            {/* Kids Bible School */}
            <div className="col-md-6">
              <div className="campus-card" style={{ padding: '35px' }}>
                <i className="bi bi-book-half" style={{ fontSize: '2.5rem', color: '#eab308', marginBottom: '15px' }}></i>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px' }}>Kids Bible School</h3>
                <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.6', margin: 0 }}>
                  Providing sound biblical education, memorization, and activities to anchor children's faith early. Led by our dedicated teaching staff.
                </p>
              </div>
            </div>
          </div>

          {/* Equipping & Edifying */}
          <div style={{ marginBottom: '60px' }}>
            <h3 className="servants-subheading" style={{ borderBottomColor: '#2563eb' }}>Equipping & Edifying</h3>
            <div className="row gy-4">
              <div className="col-lg-6">
                <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1rem', marginBottom: '20px' }}>
                  We are committed to training, raising, and releasing believers to fulfill their spiritual callings in the church and outreach fields. Our edification path includes:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  {[
                    'Partaking in All Fellowships',
                    'Engaging in Support Ministries',
                    'Preaching & Serving',
                    'Accredited Theological Studies (M.Div)',
                    'Bible Knowledge Tests',
                    'Visiting Active Mission Fields',
                    'Outreach Ministry & Industrial Visits',
                    'Christian Leadership Training (Haggai)',
                    'Short-term Missionary Training (GVS)',
                    'Spiritual Mentorship Training'
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#444' }}>
                      <i className="bi bi-check-circle-fill" style={{ color: '#2563eb' }}></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo placeholder or prayer drive display */}
              <div className="col-lg-6">
                <div className="all-ministries-card" style={{ backgroundImage: `url('/assets/img/bible_club_banner.png')`, height: '100%', minHeight: '260px' }}>
                  <div className="all-ministries-overlay" style={{ background: 'rgba(37, 99, 235, 0.75)' }}></div>
                  <div className="all-ministries-content" style={{ padding: '30px' }}>
                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>Jericho Prayer Drives</h4>
                    <p style={{ fontSize: '0.9rem', color: '#fff', opacity: 0.9 }}>
                      Driving prayers through cities, invoking blessings, and praising God in industrial areas and outreach pathways.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Zion Ministries Outreach Support */}
          <div>
            <h3 className="servants-subheading" style={{ borderBottomColor: '#f97316' }}>Zion Ministries (Outreach Support)</h3>
            <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '25px' }}>
              Zion Prayer Fellowship acts as a missionary channel, funding construction, medical support, and education projects:
            </p>

            <div className="row g-4">
              {[
                { title: 'Church Construction', desc: 'Constructed new houses of worship and currently supporting ongoing building projects in rural zones.', icon: 'bi-bank' },
                { title: 'Churches Supported', desc: 'Providing financial and spiritual backing to local churches, evangelists, and pastors.', icon: 'bi-heart-fill' },
                { title: 'Kids & Orphan Education', desc: 'Funding basic education, classroom support, and study fees for orphans and children in need.', icon: 'bi-mortarboard' },
                { title: 'Bible College Students', desc: 'Supporting students studying theology to become future ministers of the Gospel.', icon: 'bi-backpack' },
                { title: 'Social Care Ministries', desc: 'Providing widow support, aiding blind evangelists, and funding treatments for sick people.', icon: 'bi-bandaid' }
              ].map((item, idx) => (
                <div className="col-lg-4 col-md-6" key={idx}>
                  <div className="campus-card" style={{ height: '100%', padding: '24px' }}>
                    <i className={`bi ${item.icon}`} style={{ fontSize: '1.8rem', color: '#f97316', marginBottom: '10px' }}></i>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}

