import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Events() {
  const [activeTab, setActiveTab] = useState('all')

  const categories = [
    { id: 'all', label: 'All Meetings' },
    { id: 'services', label: 'Weekly Services' },
    { id: 'prayer', label: 'Prayer & Study' },
    { id: 'fellowship', label: 'Fellowships' },
    { id: 'seasonal', label: 'Special & Seasonal' }
  ]

  const meetings = [
    // Weekly Services
    {
      title: 'Promise Word Service',
      schedule: 'First Day of Every month',
      timing: '5:00 AM - 6:00 AM',
      locationType: 'Offline & Online',
      category: 'services',
      icon: 'bi-calendar-heart',
      color: 'blue'
    },
    {
      title: 'Promise Word & Communion Service',
      schedule: 'Every First Friday',
      timing: '10:00 AM - 1:00 PM',
      locationType: 'Offline & Online',
      category: 'services',
      icon: 'bi-droplet-fill',
      color: 'blue',
      note: 'Communion blessing service'
    },
    {
      title: 'Regular Tamil Service',
      schedule: 'Every Friday',
      timing: '10:00 AM - 1:00 PM',
      locationType: 'Offline & Online',
      category: 'services',
      icon: 'bi-bookmark-star',
      color: 'blue'
    },
    {
      title: 'Regular English Service',
      schedule: 'Every Friday',
      timing: '8:00 PM – 9:30 PM',
      locationType: 'Offline & Online',
      category: 'services',
      icon: 'bi-translate',
      color: 'blue',
      note: 'Note: Every First Friday is Communion Service'
    },
    // Prayer & Study
    {
      title: 'Bible Study & Intercessory Prayer',
      schedule: 'Every Sunday',
      timing: '8:00 PM – 9:30 PM',
      locationType: 'Online / In-Person',
      category: 'prayer',
      icon: 'bi-journal-text',
      color: 'orange'
    },
    {
      title: 'Open Gate & Revival Prayer',
      schedule: 'Every Tuesday',
      timing: '5:00 AM - 6:00 AM',
      locationType: 'Online Only',
      category: 'prayer',
      icon: 'bi-unlock-fill',
      color: 'orange'
    },
    {
      title: 'Preparatory Prayer',
      schedule: 'Every Thursday (except Last Thursday)',
      timing: '8:00 PM - 9:00 PM',
      locationType: 'Offline & Online',
      category: 'prayer',
      icon: 'bi-shield-plus',
      color: 'orange',
      note: 'Every Last Thursday is Missionary Prayer'
    },
    {
      title: 'Fasting Prayer',
      schedule: 'Last Saturday of Every month',
      timing: '10:00 AM - 1:00 PM',
      locationType: 'Offline & Online',
      category: 'prayer',
      icon: 'bi-hourglass-split',
      color: 'orange'
    },
    // Fellowships
    {
      title: "Women's Fellowship",
      schedule: 'Every First Wednesday',
      timing: '8:00 PM – 9:30 PM',
      locationType: 'Offline & Online',
      category: 'fellowship',
      icon: 'bi-gender-female',
      color: 'purple'
    },
    {
      title: "Men's Fellowship",
      schedule: 'Third Wednesday',
      timing: '8:00 PM – 9:30 PM',
      locationType: 'Offline & Online',
      category: 'fellowship',
      icon: 'bi-gender-male',
      color: 'purple'
    },
    {
      title: 'Youth Fellowship',
      schedule: 'Every Second Saturday',
      timing: '8:00 PM – 9:30 PM',
      locationType: 'Offline & Online',
      category: 'fellowship',
      icon: 'bi-people',
      color: 'purple'
    },
    // Seasonal & Special
    {
      title: 'Quarterly 3 Days Fasting Prayer',
      schedule: 'Every Third Month – Last Three Days',
      timing: '4:00 AM – 6:00 AM',
      locationType: 'Offline & Online',
      category: 'seasonal',
      icon: 'bi-sun',
      color: 'green'
    },
    {
      title: '7 Days Year-End Preparatory Fasting Prayer',
      schedule: '25 Dec – 31 Dec',
      timing: '4:00 AM – 6:00 AM',
      locationType: 'Offline & Online',
      category: 'seasonal',
      icon: 'bi-calendar-range',
      color: 'green'
    }
  ]

  const filteredMeetings = activeTab === 'all' 
    ? meetings 
    : meetings.filter(m => m.category === activeTab)

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <main className="main redesign-mode">
      
      {/* Hero Banner */}
      <div className="about-banner">
        <div className="container">
          <h1>Our Meetings</h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span style={{ margin: '0 8px', color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>Meetings</span>
          </div>
        </div>
      </div>

      {/* Meetings Schedule Section */}
      <section className="redesign-section light-bg">
        <div className="container">
          <div className="redesign-section-header">
            <h2>Regular Service & Prayer Times</h2>
            <p>Join us in fellowship, prayer, and study during our scheduled service hours.</p>
          </div>

          {/* Navigation Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
            {categories.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#222' : '#f1f1f1',
                  color: activeTab === tab.id ? '#fff' : '#333',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid Layout of Filtered Meetings */}
          <div className="row g-4">
            {filteredMeetings.map((meeting, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <motion.div
                  className="campus-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  style={{ position: 'relative' }}
                >
                  {/* Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: meeting.locationType.includes('Online Only') ? '#fee2e2' : '#f1f5f9',
                      color: meeting.locationType.includes('Online Only') ? '#ef4444' : '#475569',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}
                  >
                    {meeting.locationType}
                  </span>

                  <i className={`bi ${meeting.icon} campus-card-icon`} style={{
                    color: meeting.color === 'blue' ? '#2563eb' : 
                           meeting.color === 'orange' ? '#f97316' : 
                           meeting.color === 'purple' ? '#a855f7' : '#22c55e'
                  }}></i>
                  
                  <h3 className="campus-card-title" style={{ fontSize: '1.25rem', marginTop: '10px' }}>
                    {meeting.title}
                  </h3>
                  
                  <p className="campus-card-desc" style={{ marginBottom: '15px' }}>
                    <i className="bi bi-calendar3 me-2" style={{ color: '#888', marginRight: '8px' }}></i>
                    <strong>Schedule:</strong> {meeting.schedule}
                  </p>

                  <div className="campus-card-timings" style={{ borderTop: '1px dashed #eaeaea', paddingTop: '12px', marginTop: 'auto', marginBottom: 0 }}>
                    <i className="bi bi-clock me-2" style={{ color: '#888', marginRight: '8px' }}></i>
                    <strong>Timing:</strong> {meeting.timing}
                    {meeting.note && (
                      <div style={{ fontSize: '0.8rem', color: '#e67e22', marginTop: '8px', fontWeight: 600 }}>
                        <i className="bi bi-exclamation-circle me-1" style={{ marginRight: '4px' }}></i> {meeting.note}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasional Prayers Section */}
      <section className="redesign-section gray-bg">
        <div className="container">
          <div className="redesign-section-header">
            <h2>Occasional Prayers</h2>
            <p>We are here to pray with you and your family for every milestone, thanksgiving, and special occasion.</p>
          </div>

          <div className="row g-4">
            {/* 1. Cottage Prayers */}
            <div className="col-md-6">
              <div className="campus-card" style={{ flexDirection: 'row', gap: '20px', alignItems: 'flex-start', padding: '30px' }}>
                <i className="bi bi-house-heart" style={{ fontSize: '2.5rem', color: '#2563eb' }}></i>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>Cottage Prayers</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    We conduct house blessing and cottage prayers. Contact our pastors to schedule a fellowship gathering at your home.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Thanksgiving Prayers */}
            <div className="col-md-6">
              <div className="campus-card" style={{ flexDirection: 'row', gap: '20px', alignItems: 'flex-start', padding: '30px' }}>
                <i className="bi bi-gift" style={{ fontSize: '2.5rem', color: '#f97316' }}></i>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>Thanksgiving Prayers</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    Celebrate God's faithfulness in birthdays, anniversaries, promotion achievements, and new family beginnings.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Baby Shower Prayers */}
            <div className="col-md-6">
              <div className="campus-card" style={{ flexDirection: 'row', gap: '20px', alignItems: 'flex-start', padding: '30px' }}>
                <i className="bi bi-balloon" style={{ fontSize: '2.5rem', color: '#a855f7' }}></i>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>Baby Shower Prayers</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    Join us in intercession for pregnant mothers, praying for safe delivery and blessing the child for God's glory.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Puberty-Thanksgiving Prayers */}
            <div className="col-md-6">
              <div className="campus-card" style={{ flexDirection: 'row', gap: '20px', alignItems: 'flex-start', padding: '30px' }}>
                <i className="bi bi-star" style={{ fontSize: '2.5rem', color: '#eab308' }}></i>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>Puberty-Thanksgiving Prayers</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', margin: 0 }}>
                    Dedicated prayers for young children transitioning into adulthood, thanking God for growth and blessing their paths.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
