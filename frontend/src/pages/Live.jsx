import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Live() {
  const prayerPoints = [
    {
      num: '01',
      title: 'Spiritual Revival',
      desc: 'Pray for a deep outpouring of the Holy Spirit upon Zion Prayer Fellowship, local churches, and Chennai.'
    },
    {
      num: '02',
      title: 'Our Pastors & Servants',
      desc: 'Pray for wisdom, health, protection, and fresh spiritual anointing upon Bro. Perinba Dhas, Bro. Muhil, and the deacons.'
    },
    {
      num: '03',
      title: 'Kids & Youth Ministries',
      desc: 'Pray for the Kids Bible School, teens, and young adults to grow in biblical truth and stands firm in faith.'
    },
    {
      num: '04',
      title: 'Ongoing Church Construction',
      desc: 'Pray for the funding, logistics, and safety of workers involved in ongoing rural and branch church buildings.'
    },
    {
      num: '05',
      title: 'Outreach & Missions',
      desc: 'Pray for evangelists in mission fields, Jericho prayer drives, and outreach visits to industrial zones.'
    },
    {
      num: '06',
      title: 'Families & Social Care',
      desc: 'Intercede for widows, orphans, blind evangelists, sick people, and families facing financial hardships.'
    }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <main className="main redesign-mode">
      
      {/* Banner */}
      <div className="about-banner">
        <div className="container">
          <h1>Live Broadcast</h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span style={{ margin: '0 8px', color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>Live</span>
          </div>
        </div>
      </div>

      {/* Live Video Player Stream */}
      <section className="redesign-section light-bg">
        <div className="container">
          <div className="row gy-5">
            
            {/* Live Video Embed */}
            <div className="col-lg-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #eaeaea', boxShadow: '0 15px 40px rgba(0,0,0,0.08)' }}>
                  <div className="ratio ratio-16x9">
                    {/* Placeholder live stream or latest broadcast video link */}
                    <iframe
                      src="https://www.youtube.com/embed/live_stream?channel=ZPF_MINISTRIES_PLACEHOLDER"
                      title="ZPF Ministries Live Broadcast"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div style={{ padding: '24px', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                      <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', marginRight: '10px' }}>
                        ● Live
                      </span>
                      <h3 style={{ display: 'inline-block', fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
                        Zion Prayer Fellowship Sunday Service
                      </h3>
                    </div>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ background: '#ef4444', color: '#fff', padding: '10px 20px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', borderRadius: '4px', textDecoration: 'none' }}>
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Timetable/Brief details */}
            <div className="col-lg-4">
              <div className="campus-card" style={{ padding: '30px', height: '100%' }}>
                <i className="bi bi-broadcast-pin" style={{ fontSize: '2.5rem', color: '#ef4444', marginBottom: '15px' }}></i>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111', marginBottom: '15px' }}>Broadcast Schedule</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
                  If the live stream is currently offline, you can catch up with our regularly scheduled weekly broadcasts:
                </p>
                <div style={{ marginTop: '20px' }}>
                  <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.95rem' }}>Sunday Morning Service</strong>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>9:00 AM — 12:30 PM (Weekly)</span>
                  </div>
                  <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.95rem' }}>Friday Covenant Blessing</strong>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>10:00 AM — 1:00 PM (Weekly)</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#111', fontSize: '0.95rem' }}>Tuesday Open Gate Prayer</strong>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>5:00 AM — 6:00 AM (Online Only)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 13. PRAYER POINTS SECTION */}
      <section className="redesign-section gray-bg">
        <div className="container">
          <div className="redesign-section-header">
            <h2>Regular Prayer Points</h2>
            <p>Join us in daily intercession and prayer for these key ministry areas.</p>
          </div>

          <div className="row g-4">
            {prayerPoints.map((point, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <motion.div
                  className="campus-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'flex-start', padding: '25px' }}
                >
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: '#2563eb',
                    background: '#eff6ff',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    lineHeight: 1
                  }}>
                    {point.num}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '8px' }}>
                      {point.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', margin: 0 }}>
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
