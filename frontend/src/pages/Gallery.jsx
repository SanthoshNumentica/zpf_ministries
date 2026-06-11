import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState(null)

  const categories = [
    { id: 'all', label: 'All Albums' },
    { id: 'church', label: 'Church Events' },
    { id: 'fellowship', label: 'Fellowships' },
    { id: 'youth', label: 'Kids & Youth' },
    { id: 'trips', label: 'ZPF Tours' }
  ]

  const albums = [
    // Christmas Programs
    {
      title: 'Christmas Programs',
      category: 'church',
      desc: 'Annual Christmas Carol services, nativity skits, and celebrations.',
      videos: [
        { id: 'dlOAth52Uc0', title: '2025 Christmas Carol Service' },
        { id: 'NK-efiHI1n0', title: '2024 Christmas Carol Service Highlights' },
        { id: 'Tk-mEPobeL8', title: '2022 Christmas Carol Service Highlights' }
      ],
      cover: '/assets/img/all_ministries.png'
    },
    // Cottage Prayers
    {
      title: 'Cottage Prayers',
      category: 'church',
      desc: 'House blessings and prayer fellowships in Abqaiq and Jubail.',
      details: ['Abqaiq Cottage Prayers', 'Jubail Cottage Prayers'],
      cover: '/assets/img/care_cells_card.png'
    },
    // Baptism
    {
      title: 'Baptism Services',
      category: 'church',
      desc: 'Testimonies and water baptism services.',
      videos: [
        { id: '5T0Jr8QEd50', title: 'ZPF Baptism Service (March 2025)' }
      ],
      cover: '/assets/img/hero_worship.png'
    },
    // Bible Class
    {
      title: 'Bible Class Sessions',
      category: 'youth',
      desc: 'Regular Sunday school teachings and children\'s scripture class.',
      details: ['Sunday Bible Class', 'Annual Exams'],
      cover: '/assets/img/kids_ministry.png'
    },
    // Fellowship with Other Churches
    {
      title: 'Fellowship with Other Churches',
      category: 'church',
      desc: 'Joint prayer meets with Bethel Church, Grace Church, and Gideon Church.',
      details: ['Bethel Church, Jubail', 'Grace Church, Jubail', 'Gideon Church, Alhassa'],
      cover: '/assets/img/worship_singers.png'
    },
    // Guest Pastors
    {
      title: 'Guest Pastors Visit',
      category: 'church',
      desc: 'Sermons and blessings delivered by visiting evangelists and pastors.',
      cover: '/assets/img/sermons_card.png'
    },
    // Farewells
    {
      title: 'Farewell Meetings',
      category: 'church',
      desc: 'Send-offs and blessing prayers for deacons and church families.',
      details: ['Dhas Uncle Farewell', 'Raja Bro Farewell', 'Mary Sis Farewell', 'Victor Bro Farewell'],
      cover: '/assets/img/care_cells_card.png'
    },
    // Festival of Tabernacle
    {
      title: 'Festival of Tabernacles',
      category: 'church',
      desc: 'Annual festival celebrations and thanksgiving praise meetings.',
      cover: '/assets/img/hero_worship.png'
    },
    // Jericho Prayer Drive
    {
      title: 'Jericho Prayer Drive',
      category: 'church',
      desc: 'City-wide prayer drives interceding for local areas and industries.',
      cover: '/assets/img/bible_club_banner.png'
    },
    // Thanksgiving Prayers
    {
      title: 'Thanksgiving Family Prayers',
      category: 'fellowship',
      desc: 'Prayers for family milestones, baby showers, puberty celebrations, and weddings.',
      details: ['Baby Shower', 'Birthdays', 'Puberty Blessings', 'Wedding Days'],
      cover: '/assets/img/sunday_worship.png'
    },
    // Teens & Youth Fellowships
    {
      title: 'Teens & Youth Fellowships',
      category: 'youth',
      desc: 'Praise sessions, career support, and fellowship for teenagers and youth.',
      cover: '/assets/img/teens_ministry.png'
    },
    // ZPF Kids Practice
    {
      title: 'ZPF Kids Song & Choir Practice',
      category: 'youth',
      desc: 'Vocal practices and rehearsals for worship songs.',
      details: ['Choir Practice', 'Carnatic Vocal Practice', 'Western Vocal Practice'],
      cover: '/assets/img/kids_ministry.png'
    },
    // ZPF Kids Instrument Practice
    {
      title: 'ZPF Kids Instrument Practice',
      category: 'youth',
      desc: 'Keyboard, guitar, and drums practice for younger musicians.',
      cover: '/assets/img/young_adults_ministry.png'
    },
    // ZPF Tours
    {
      title: 'ZPF Tours & Trips',
      category: 'trips',
      desc: 'Short excursions and long spiritual retreats with church families.',
      details: [
        'Short Trips: IAU Beach, Fanateer Beach (Jubail), Wonder Hills (Jubail), Alhassa (Yellow Lake)',
        'Long Trips: Tabuk, Abha, Riyadh'
      ],
      cover: '/assets/img/young_adults_ministry.png'
    }
  ]

  const filteredAlbums = activeCategory === 'all'
    ? albums
    : albums.filter(a => a.category === activeCategory)

  const getYoutubeThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <main className="main redesign-mode">
      
      {/* Banner */}
      <div className="about-banner">
        <div className="container">
          <h1>Our Gallery</h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span style={{ margin: '0 8px', color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>Gallery</span>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="redesign-section light-bg">
        <div className="container">
          
          {/* Category Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? '#2563eb' : '#f1f5f9',
                  color: activeCategory === cat.id ? '#fff' : '#475569',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid list of albums */}
          <div className="row g-4">
            {filteredAlbums.map((album, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <motion.div
                  className="feature-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  style={{ height: '100%' }}
                >
                  <div className="feature-card-img" style={{ backgroundImage: `url(${album.cover})` }}></div>
                  <div className="feature-card-body" style={{ background: '#ffffff', border: '1px solid #eaeaea', borderTop: 'none', color: '#333' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                        {album.category}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '10px' }}>
                      {album.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', marginBottom: '20px' }}>
                      {album.desc}
                    </p>

                    {/* Render details if present */}
                    {album.details && (
                      <div style={{ marginBottom: '20px', background: '#f8f9fa', padding: '12px 15px', borderRadius: '8px' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444', marginBottom: '8px', textTransform: 'uppercase' }}>
                          Sub-Items / Highlights:
                        </h4>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '18px', margin: 0, fontSize: '0.8rem', color: '#555' }}>
                          {album.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Render videos if present */}
                    {album.videos && (
                      <div style={{ marginTop: 'auto' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#444', marginBottom: '10px', textTransform: 'uppercase' }}>
                          Video Highlights:
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {album.videos.map((vid, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedVideo(vid.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: '#f1f5f9',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                width: '100%',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#2563eb'
                              }}
                            >
                              <i className="bi bi-play-circle-fill" style={{ fontSize: '1rem', color: '#ef4444' }}></i>
                              <span>{vid.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for YouTube Videos */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="modal-content"
              style={{ maxWidth: '800px', width: '90%', border: 'none', background: '#000' }}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header" style={{ borderBottom: 'none', background: '#111', padding: '10px 20px' }}>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>Watching Video</h3>
                <button className="btn-close" onClick={() => setSelectedVideo(null)} style={{ color: '#fff' }}>
                  <i className="bi bi-x"></i>
                </button>
              </div>
              <div className="modal-body" style={{ padding: 0 }}>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}
