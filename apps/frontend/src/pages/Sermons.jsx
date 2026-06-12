import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SpotlightCard from '../components/bits/SpotlightCard'

export default function Sermons() {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('sermons')
  const [selectedVideo, setSelectedVideo] = useState(null)

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tab = params.get('tab')
    if (tab && ['sermons', 'songs', 'covers'].includes(tab)) {
      setActiveSection(tab)
    } else if (location.hash === '#songs') {
      setActiveSection('songs')
    } else if (location.hash === '#covers') {
      setActiveSection('covers')
    } else if (location.hash === '#sermons') {
      setActiveSection('sermons')
    }
  }, [location])

  const sermonCategories = [
    {
      title: 'Friday Tamil Sermons',
      desc: 'Powerful covenant blessings and spirit-filled exhortations delivered in Tamil.',
      icon: 'bi-translate'
    },
    {
      title: 'Friday English Sermons',
      desc: 'Weekly messages designed to strengthen and guide English-speaking congregation members.',
      icon: 'bi-chat-left-text'
    },
    {
      title: 'Psalm Exhortations',
      desc: 'Short, inspiring insights directly from the Book of Psalms to start your day in prayer.',
      icon: 'bi-music-note-beamed'
    },
    {
      title: 'Short Messages',
      desc: 'Quick devotions and faith highlights to build your daily spiritual walk.',
      icon: 'bi-lightning-fill'
    },
    {
      title: 'Bible Studies',
      desc: 'Deep theology, character studies, and scripture analysis for dedicated believers.',
      icon: 'bi-book'
    }
  ]

  const defaultZionSongs = [
    { id: 'ahIVNoJZR2k', title: 'Gospel Song on John 3:16' },
    { id: 'Oi7MXSJbhi4', title: 'HE is my everything ' },
    { id: 'LmegPb_8LY8', title: 'Way Maker - Miracle Worker' },
    { id: 'gjWVYjgsbvo', title: 'Siluvaiandai Vaa Maganae (Communion/Good Friday)' },
    { id: 'G8HSX2oNkOk', title: 'Gethsemanae Poongavinil (Good Friday)' },
    { id: '1rXDQYK7eyk', title: 'Dayavulla Devan' },
    { id: '7j3ZrHhGMgk', title: 'Samuvel Pol' }
  ]

  const [zionSongsList, setZionSongsList] = React.useState(defaultZionSongs)

  React.useEffect(() => {
    const fetchSongs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
        const res = await fetch(`${apiUrl}/content/zion_songs`)
        if (res.ok) {
          const data = await res.json()
          if (data && Array.isArray(data)) {
            setZionSongsList(data)
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic zion songs:', err)
      }
    }
    fetchSongs()
  }, [])

  const defaultCasualCovers = [
    { id: 'TGjOdhv1Nhw', title: 'Take My Life' },
    { id: 'Mre7sMP4x8s', title: 'Naan Vaalvathu' },
    { id: 'nj8tjql_4_Y', title: 'Bless the LORD oh my Soul' },
    { id: '1E7fi6_eqp8', title: 'Chinna Manusanukkulla' },
    { id: 't1ve4SPQxU4', title: 'He is my Everything' },
    { id: 's1vUKbApxdw', title: 'Unga Naamam Uyaranum' },
    { id: 'TiPelJY81eQ', title: 'Unga Kirubai' },
    { id: 'Jvk8HFrBrQU', title: 'Aadaram Neerthanaiyya' },
    { id: 'PLDeUIFs_FU', title: 'Saranadaivaen' },
    { id: '-BbX46j22V8', title: 'Alangara Vasalalae' },
    { id: '3wkXygdy7CQ', title: 'Vaanathilum Intha Boomiyilum' },
    { id: 'WcQ9zZ-9irI', title: 'Um Vasanam En Kangalai' },
    { id: 'OY1kHI-RNac', title: 'Aathumamae En Ullamae' },
    { id: 'QqFkV7mOw9I', title: 'Ennai Alithavarae' },
    { id: 'MYghky75U_Q', title: 'Yehovayeerae' },
    { id: 'fVvbm4wDAQM', title: 'Unga Naamam Uyaranum (Alt)' },
    { id: 'C5RPPkk3-Ns', title: 'Maatrumae Ennai Maatrumae' }
  ]

  const [casualCoversList, setCasualCoversList] = useState(defaultCasualCovers)

  React.useEffect(() => {
    const fetchCovers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
        const res = await fetch(`${apiUrl}/content/casual_covers`)
        if (res.ok) {
          const data = await res.json()
          if (data && Array.isArray(data)) {
            setCasualCoversList(data)
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic casual covers:', err)
      }
    }
    fetchCovers()
  }, [])

  const getYoutubeThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <main className="main redesign-mode">

      {/* Page Header */}
      <div className="about-banner">
        <div className="container">
          <h1>Sermons & Songs</h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span style={{ margin: '0 8px', color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>Sermons</span>
          </div>
        </div>
      </div>

      {/* Video Filter Navigation */}
      <section className="redesign-section light-bg pb-0">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', borderBottom: '1px solid #eaeaea', paddingBottom: '20px' }}>
            <button
              onClick={() => setActiveSection('sermons')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: activeSection === 'sermons' ? '#2563eb' : '#666',
                borderBottom: activeSection === 'sermons' ? '3px solid #2563eb' : '3px solid transparent',
                paddingBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Sermons
            </button>
            <button
              onClick={() => setActiveSection('songs')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: activeSection === 'songs' ? '#2563eb' : '#666',
                borderBottom: activeSection === 'songs' ? '3px solid #2563eb' : '3px solid transparent',
                paddingBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Zion Songs
            </button>
            <button
              onClick={() => setActiveSection('covers')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: activeSection === 'covers' ? '#2563eb' : '#666',
                borderBottom: activeSection === 'covers' ? '3px solid #2563eb' : '3px solid transparent',
                paddingBottom: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Casual Covers
            </button>
          </div>
        </div>
      </section>

      {/* Content Render */}
      <section className="redesign-section light-bg">
        <div className="container">

          {/* TAB 1: SERMONS */}
          {activeSection === 'sermons' && (
            <div>
              <div className="redesign-section-header">
                <h2>Our Sermon Library</h2>
                <p>Listen to weekly spiritual teachings, Bible studies, and short video messages.</p>
              </div>
              <div className="row g-4 justify-content-center">
                {sermonCategories.map((sermon, idx) => (
                  <div className="col-lg-4 col-md-6" key={idx}>
                    <motion.div
                      className="campus-card"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeInUp}
                    >
                      <i className={`bi ${sermon.icon} campus-card-icon`} style={{ color: '#2563eb' }}></i>
                      <h3 className="campus-card-title">{sermon.title}</h3>
                      <p className="campus-card-desc">{sermon.desc}</p>
                      <Link to="/contact" className="campus-card-btn" style={{ marginTop: 'auto' }}>
                        Browse Sermons <i className="bi bi-arrow-right"></i>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* TAB 2: ZION SONGS */}
          {activeSection === 'songs' && (
            <div>
              <div className="redesign-section-header">
                <h2>Zion Original Songs</h2>
                <p>Enjoy gospel tracks, language translations, and spiritual worship songs recorded by our teams.</p>
              </div>
              <div className="row g-4">
                {zionSongsList.map((song, idx) => {
                  const coverImg = song.cover || (song.id ? `https://img.youtube.com/vi/${song.id}/hqdefault.jpg` : '/assets/img/all_ministries.png');
                  const categoryLabel = song.category || 'worship';
                  const descText = song.desc || 'Watch the gospel video highlight and worship song.';

                  return (
                    <div className="col-lg-4 col-md-6" key={idx}>
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        style={{ height: '100%' }}
                      >
                        <SpotlightCard className="feature-card" spotlightColor="rgba(37, 99, 235, 0.08)" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <div className="feature-card-img" style={{ backgroundImage: `url(${coverImg})` }}></div>
                          <div className="feature-card-body" style={{ background: '#ffffff', border: '1px solid #eaeaea', borderTop: 'none', color: '#333', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '10px' }}>
                              <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                                {categoryLabel}
                              </span>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '10px' }}>
                              {song.title}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', marginBottom: '20px' }}>
                              {descText}
                            </p>
                            <div style={{ marginTop: 'auto' }}>
                              <button
                                onClick={() => setSelectedVideo(song.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '10px',
                                  background: '#2563eb',
                                  border: 'none',
                                  padding: '12px 20px',
                                  borderRadius: '30px',
                                  width: '100%',
                                  cursor: 'pointer',
                                  fontSize: '0.9rem',
                                  fontWeight: 700,
                                  color: '#fff',
                                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1.5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                              >
                                <i className="bi bi-play-fill" style={{ fontSize: '1.2rem' }}></i>
                                <span>Watch Video</span>
                              </button>
                            </div>
                          </div>
                        </SpotlightCard>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CASUAL COVERS */}
          {activeSection === 'covers' && (
            <div>
              <div className="redesign-section-header">
                <h2>Casual Worship Covers</h2>
                <p>Listen to acoustic recordings, praise covers, and fellowship jam sessions.</p>
              </div>
              <div className="row g-4">
                {casualCoversList.map((cover, idx) => {
                  const coverImg = cover.cover || (cover.id ? `https://img.youtube.com/vi/${cover.id}/hqdefault.jpg` : '/assets/img/all_ministries.png');
                  const categoryLabel = cover.category || 'worship';
                  const descText = cover.desc || 'Watch the gospel video highlight and worship song.';

                  return (
                    <div className="col-lg-4 col-md-6" key={idx}>
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        style={{ height: '100%' }}
                      >
                        <SpotlightCard className="feature-card" spotlightColor="rgba(37, 99, 235, 0.08)" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <div className="feature-card-img" style={{ backgroundImage: `url(${coverImg})` }}></div>
                          <div className="feature-card-body" style={{ background: '#ffffff', border: '1px solid #eaeaea', borderTop: 'none', color: '#333', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '10px' }}>
                              <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                                {categoryLabel}
                              </span>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '10px' }}>
                              {cover.title}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', marginBottom: '20px' }}>
                              {descText}
                            </p>
                            <div style={{ marginTop: 'auto' }}>
                              <button
                                onClick={() => setSelectedVideo(cover.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '10px',
                                  background: '#2563eb',
                                  border: 'none',
                                  padding: '12px 20px',
                                  borderRadius: '30px',
                                  width: '100%',
                                  cursor: 'pointer',
                                  fontSize: '0.9rem',
                                  fontWeight: 700,
                                  color: '#fff',
                                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1.5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                              >
                                <i className="bi bi-play-fill" style={{ fontSize: '1.2rem' }}></i>
                                <span>Watch Video</span>
                              </button>
                            </div>
                          </div>
                        </SpotlightCard>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* LIGHTBOX MODAL FOR YOUTUBE VIDEOS */}
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
