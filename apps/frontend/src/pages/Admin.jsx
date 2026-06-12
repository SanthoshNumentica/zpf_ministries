import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ShinyText from '../components/bits/ShinyText'
import SpotlightCard from '../components/bits/SpotlightCard'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('zpf_admin_token') || '')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUser, setNewUser] = useState({ name: '', dob: '', passcode: '' })
  const [editUser, setEditUser] = useState({ name: '', dob: '', passcode: '' })

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null) // { type, id, name }

  // Toggleable passcode visibility state
  const [visiblePasscodes, setVisiblePasscodes] = useState({}) // { [userId]: boolean }

  const togglePasscodeVisibility = (userId) => {
    setVisiblePasscodes(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  // Collapsible Dropdowns State
  const [openDropdowns, setOpenDropdowns] = useState({
    about: false,
    ministries: false,
    sermons: false,
    live: false
  })

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Content Manager Pagination State
  const [contentPage, setContentPage] = useState(1)
  const itemsPerContentPage = 10


  // Website Content Management States
  const [activeTab, setActiveTab] = useState('registry')
  const [selectedContentKey, setSelectedContentKey] = useState('zion_songs')
  const [contentData, setContentData] = useState([])
  const [contentLoading, setContentLoading] = useState(false)
  const [contentSuccess, setContentSuccess] = useState('')

  // Add Item States
  const [newSong, setNewSong] = useState({ id: '', title: '' })
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    schedule: '',
    timing: '',
    locationType: '',
    category: 'services',
    icon: '',
    color: 'blue',
    note: ''
  })
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    category: 'church',
    asc: '',
    cover: '/assets/img/all_ministries.png',
    details: '',
    videos: ''
  })

  // Fetch website content
  const fetchContentData = async (key) => {
    setContentLoading(true)
    setError('')
    setContentSuccess('')
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/content/${key}`)
      if (res.ok) {
        const data = await res.json()
        if (data && Array.isArray(data)) {
          setContentData(data)
        } else {
          setContentData([])
        }
      } else {
        setError('Failed to fetch website content.')
      }
    } catch (err) {
      setError('Connection error. Ensure backend is running.')
    } finally {
      setContentLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'content') {
      fetchContentData(selectedContentKey)
    }
    setContentPage(1)
  }, [activeTab, selectedContentKey])

  // Save Website Content
  const handleSaveContent = async () => {
    setContentLoading(true)
    setError('')
    setContentSuccess('')
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/admin/content/${selectedContentKey}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ value: contentData }),
      })

      if (res.ok) {
        setContentSuccess('Website content updated successfully!')
      } else {
        const data = await res.json()
        setError(data.message || 'Failed to save content.')
      }
    } catch (err) {
      setError('Connection error. Ensure backend is running.')
    } finally {
      setContentLoading(false)
    }
  }

  const handleAddSong = (e) => {
    e.preventDefault()
    if (!newSong.id || !newSong.title) {
      alert('Please fill out both YouTube ID and Song Title.')
      return
    }
    setContentData([...contentData, { ...newSong }])
    setNewSong({ id: '', title: '' })
  }

  const handleDeleteSong = (songId) => {
    const song = contentData.find(s => s.id === songId)
    requestDelete('song', songId, song ? song.title : 'this song')
  }

  const handleAddMeeting = (e) => {
    e.preventDefault()
    if (!newMeeting.title || !newMeeting.schedule || !newMeeting.timing) {
      alert('Please fill out Title, Schedule, and Timing fields.')
      return
    }
    setContentData([...contentData, { ...newMeeting }])
    setNewMeeting({
      title: '',
      schedule: '',
      timing: '',
      locationType: '',
      category: 'services',
      icon: '',
      color: 'blue',
      note: ''
    })
  }

  const handleDeleteMeeting = (index) => {
    const meeting = contentData[index]
    requestDelete('meeting', index, meeting ? meeting.title : 'this meeting')
  }

  const handleAddAlbum = (e) => {
    e.preventDefault()
    if (!newAlbum.title || !newAlbum.asc) {
      alert('Please fill out both Album Title and Description.')
      return
    }

    // Parse details list
    const detailsArr = newAlbum.details
      ? newAlbum.details.split(',').map(d => d.trim()).filter(Boolean)
      : undefined

    // Parse videos list
    const videosArr = newAlbum.videos
      ? newAlbum.videos.split('\n').map(v => {
        const parts = v.split(':')
        if (parts.length >= 2) {
          return { id: parts[0].trim(), title: parts.slice(1).join(':').trim() }
        }
        return null
      }).filter(Boolean)
      : undefined

    const parsedAlbum = {
      title: newAlbum.title,
      category: newAlbum.category,
      desc: newAlbum.asc,
      cover: newAlbum.cover || '/assets/img/all_ministries.png'
    }
    if (detailsArr && detailsArr.length > 0) {
      parsedAlbum.details = detailsArr
    }
    if (videosArr && videosArr.length > 0) {
      parsedAlbum.videos = videosArr
    }

    setContentData([...contentData, parsedAlbum])
    setNewAlbum({
      title: '',
      category: 'church',
      desc: '',
      cover: '/assets/img/all_ministries.png',
      details: '',
      videos: ''
    })
  }

  const handleDeleteAlbum = (index) => {
    const album = contentData[index]
    requestDelete('album', index, album ? album.title : 'this album')
  }

  // Fetch users list when authenticated
  useEffect(() => {
    if (adminToken) {
      fetchUsers()
    }
  }, [adminToken])

  // Filter and sort users when data changes
  useEffect(() => {
    let filtered = users.filter(user =>
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.dob.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.passcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
    )

    filtered.sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]

      if (sortField === 'createdAt') {
        aVal = new Date(aVal)
        bVal = new Date(bVal)
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [users, searchTerm, sortField, sortOrder])

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        // Token might have expired
        handleLogout()
        setError('Session expired. Please log in again.')
      }
    } catch (err) {
      setError('Failed to fetch user list. Ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        await fetchUsers()
        setShowAddModal(false)
        setNewUser({ name: '', dob: '', passcode: '' })
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to add user')
      }
    } catch (err) {
      setError('Failed to add user. Ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify(editUser),
      })

      if (response.ok) {
        await fetchUsers()
        setShowEditModal(false)
        setSelectedUser(null)
        setEditUser({ name: '', dob: '', passcode: '' })
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update user')
      }
    } catch (err) {
      setError('Failed to update user. Ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const requestDelete = (type, id, name) => {
    setDeleteTarget({ type, id, name })
    setShowDeleteConfirm(true)
  }

  const executeDelete = async () => {
    if (!deleteTarget) return
    const { type, id } = deleteTarget
    setShowDeleteConfirm(false)
    setDeleteTarget(null)

    if (type === 'user') {
      await handleDeleteUserReal(id)
    } else if (type === 'song') {
      setContentData(prev => prev.filter(s => s.id !== id))
    } else if (type === 'album') {
      setContentData(prev => prev.filter((_, idx) => idx !== id))
    } else if (type === 'meeting') {
      setContentData(prev => prev.filter((_, idx) => idx !== id))
    }
  }

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId)
    requestDelete('user', userId, user ? `${user.name} (DOB: ${user.dob})` : 'this user')
  }

  const handleDeleteUserReal = async (userId) => {
    setLoading(true)
    setError('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      })

      if (response.ok) {
        await fetchUsers()
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to delete user')
      }
    } catch (err) {
      setError('Failed to delete user. Ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setEditUser({ name: user.name || '', dob: user.dob, passcode: user.passcode })
    setShowEditModal(true)
  }

  const handleSort = (field) => {
    setSortField(field)
    setSortOrder('asc')
  }

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const paginatedContent = contentData.slice(
    (contentPage - 1) * itemsPerContentPage,
    contentPage * itemsPerContentPage
  )

  const totalContentPages = Math.ceil(contentData.length / itemsPerContentPage)

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.token) {
        sessionStorage.setItem('zpf_admin_token', data.token)
        setAdminToken(data.token)
      } else {
        setError(data.message || 'Access Denied. Check credentials.')
      }
    } catch (err) {
      setError('Connection error. Ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('zpf_admin_token')
    setAdminToken('')
    setUsers([])
  }

  if (!adminToken) {
    return (
      <div className="login-split-container">
        {/* Left side: Very Big Logo with animation */}
        <div className="login-split-left" style={{ background: 'radial-gradient(circle at center, rgba(43, 67, 182, 0.15) 0%, rgba(5, 6, 9, 1) 70%)' }}>
          <div className="ambient-background">
            <div className="glow-sphere glow-sphere-1"></div>
            <div className="glow-sphere glow-sphere-2"></div>
          </div>
          <div className="giant-cross-glow" style={{ background: 'radial-gradient(circle, rgba(43, 67, 182, 0.18) 0%, rgba(43, 67, 182, 0) 70%)' }}></div>
          <motion.div
            className="giant-cross-wrapper"
            style={{ position: 'relative', display: 'inline-block', filter: 'drop-shadow(0 0 35px rgba(43, 67, 182, 0.35))' }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 1.5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
          >
            {/* Left Dove facing the Cross */}
            <motion.div
              className="dove-left"
              animate={{
                y: [0, -6, 0],
                x: [0, 4, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.2
              }}
            >
              <svg viewBox="0 0 512 512" width="100%" height="100%">
                <path
                  d="M496 64c13.2 0 20.7 15.1 12.8 25.6L480 128 480 304c0 79.5-64.5 144-144 144l-112 0-46.3 46.3c-10.4 10.4-26.5 12.4-39.1 4.8L41.5 440.9c-17-10.2-15-35.5 3.4-42.9L160 352C23.8 311.1 7.5 169.8 22 95.7 25.6 77.9 45.3 71.4 61.3 80.2L320 224 320 144c0-44.2 35.8-80 80-80l96 0zm-96 56a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM182.5-9.6c12.4-13.7 33.3-8.9 42.5 7.1l56.4 98.3c-5.8 14.4-9.2 30.1-9.4 46.5L138.1 68c10.1-31.6 27-58.4 44.4-77.6z"
                  fill="url(#adminGiantCrossGrad)"
                />
              </svg>
            </motion.div>

            <svg width="220" height="220" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="adminGiantCrossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2b43b6" />
                  <stop offset="50%" stopColor="#4d65df" />
                  <stop offset="100%" stopColor="#1e339a" />
                </linearGradient>
              </defs>
              <path
                d="M12,2 L12,22 M7,8 L17,8"
                stroke="url(#adminGiantCrossGrad)"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Right Dove facing the Cross (flipped horizontally) */}
            <motion.div
              className="dove-right"
              style={{ scaleX: -1 }}
              animate={{
                y: [0, -6, 0],
                x: [0, -4, 0],
                rotate: [0, -1, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.8
              }}
            >
              <svg viewBox="0 0 512 512" width="100%" height="100%">
                <path
                  d="M496 64c13.2 0 20.7 15.1 12.8 25.6L480 128 480 304c0 79.5-64.5 144-144 144l-112 0-46.3 46.3c-10.4 10.4-26.5 12.4-39.1 4.8L41.5 440.9c-17-10.2-15-35.5 3.4-42.9L160 352C23.8 311.1 7.5 169.8 22 95.7 25.6 77.9 45.3 71.4 61.3 80.2L320 224 320 144c0-44.2 35.8-80 80-80l96 0zm-96 56a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM182.5-9.6c12.4-13.7 33.3-8.9 42.5 7.1l56.4 98.3c-5.8 14.4-9.2 30.1-9.4 46.5L138.1 68c10.1-31.6 27-58.4 44.4-77.6z"
                  fill="url(#adminGiantCrossGrad)"
                />
              </svg>
            </motion.div>
          </motion.div>
          
          {/* Admin Branding */}
          <h1 style={{ marginTop: '24px', fontSize: '2.4rem', fontWeight: 800, letterSpacing: '2px', textAlign: 'center' }}>
            <ShinyText text="ADMIN ACCESS" speed={6} />
          </h1>
          <p className="text-cosmic" style={{ fontSize: '1.05rem', marginTop: '10px', opacity: 0.8, letterSpacing: '1px' }}>
            ZPF MINISTRIES DASHBOARD
          </p>

          {/* Decorative Divider */}
          <div style={{ width: '40px', height: '1px', background: 'rgba(43, 67, 182, 0.4)', marginTop: '24px', marginBottom: '24px' }}></div>

          {/* Left Side Bible Verse */}
          <div className="login-left-verse-container" style={{ maxWidth: '440px', textAlign: 'center', padding: '0 20px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.6', margin: '0 0 10px 0' }}>
              "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."
            </p>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#4d65df', margin: '0 0 8px 0', lineHeight: '1.6' }}>
              "நீங்கள் என்ன செய்தாலும், அதை மனுஷர்களுக்கென்று செய்யாமல், கர்த்தருக்கென்றே மனப்பூர்வமாய்ச் செய்யுங்கள்."
            </p>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Colossians / கொலோசெயர் 3:23
            </span>
          </div>
        </div>

        {/* Right side: Login Card Form */}
        <div className="login-split-right">
          <motion.div
            className="login-card-container"
            style={{ width: '100%', maxWidth: '440px' }}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="login-card-glow"></div>
            <SpotlightCard className="login-card" spotlightColor="rgba(43, 67, 182, 0.16)">
              <div className="login-header text-center mb-3">
                <h2 className="login-title">
                  Sign In
                </h2>
                <p className="text-cosmic" style={{ fontSize: '0.85rem', marginTop: '5px' }}>
                  Enter administrative credentials
                </p>
              </div>

              {/* Tamil Bible Verse */}
              <div className="login-verse-container">
                <i className="bi bi-quote quote-icon-left"></i>
                <p className="tamil-verse-text">"கர்த்தருடைய ஆலயத்திற்குப் போவோம் வாருங்கள் என்று எனக்கு அவர்கள் சொன்னபோது மகிழ்ச்சியாயிருந்தேன்."</p>
                <p className="verse-ref">சங்கீதம் 122:1</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="login-form mt-3">
                <div className="form-group mb-4">
                  <label className="form-label">Email Address</label>
                  <div className="input-group-custom">
                    <i className="bi bi-envelope input-icon"></i>
                    <input
                      type="email"
                      className="form-control-custom"
                      placeholder="admin@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Password</label>
                  <div className="input-group-custom">
                    <i className="bi bi-key input-icon"></i>
                    <input
                      type="password"
                      className="form-control-custom"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="login-error-alert mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-login-submit"
                  disabled={loading}
                >
                  {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
                </button>
                <div className="text-center mt-3">
                  <Link to="/" className="user-redirect-link">
                    Are you a User? Login here
                  </Link>
                </div>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-fullscreen-container">
      <div className="admin-layout-wrapper">
        {/* Left Sidebar Navigation */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <Link to="/" className="admin-sidebar-brand">
              <img src="/assets/img/zpf_logo.png" alt="ZPF Logo" className="admin-sidebar-logo" />
              <span className="admin-sidebar-brand-name">ZPF ADMIN</span>
            </Link>
          </div>

          <div className="admin-sidebar-nav">
            {/* Admin Controls */}
            <div className="sidebar-group-title">Admin Controls</div>
            <ul className="sidebar-menu">
              <li>
                <button
                  onClick={() => setActiveTab('registry')}
                  className={`sidebar-link ${activeTab === 'registry' ? 'active' : ''}`}
                >
                  <i className="bi bi-people-fill"></i>
                  <span>User Registry</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`sidebar-link ${activeTab === 'content' ? 'active' : ''}`}
                >
                  <i className="bi bi-pencil-square"></i>
                  <span>Content Manager</span>
                </button>
              </li>
            </ul>

            {/* Website Links */}
            <div className="sidebar-group-title">Website Links</div>
            <ul className="sidebar-menu">
              <li>
                <Link to="/" className="sidebar-link">
                  <i className="bi bi-house-door-fill"></i>
                  <span>Home</span>
                </Link>
              </li>

              {/* About Dropdown */}
              <li className="sidebar-dropdown">
                <button
                  onClick={() => toggleDropdown('about')}
                  className={`sidebar-link sidebar-dropdown-trigger ${openDropdowns.about ? 'open' : ''}`}
                >
                  <i className="bi bi-info-circle-fill"></i>
                  <span style={{ flex: 1 }}>About</span>
                  <i className="bi bi-chevron-down dropdown-chevron"></i>
                </button>
                {openDropdowns.about && (
                  <ul className="sidebar-submenu">
                    <li><Link to="/about">About ZPF</Link></li>
                    <li><Link to="/about#what-we-believe">What We Believe</Link></li>
                    <li><Link to="/about#servants">Servants</Link></li>
                  </ul>
                )}
              </li>

              <li>
                <Link to="/events" className="sidebar-link">
                  <i className="bi bi-calendar-event-fill"></i>
                  <span>Meetings</span>
                </Link>
              </li>

              {/* Ministries Dropdown */}
              <li className="sidebar-dropdown">
                <button
                  onClick={() => toggleDropdown('ministries')}
                  className={`sidebar-link sidebar-dropdown-trigger ${openDropdowns.ministries ? 'open' : ''}`}
                >
                  <i className="bi bi-grid-fill"></i>
                  <span style={{ flex: 1 }}>Ministries</span>
                  <i className="bi bi-chevron-down dropdown-chevron"></i>
                </button>
                {openDropdowns.ministries && (
                  <ul className="sidebar-submenu">
                    <li><Link to="/about#zion-ministries">Zion Ministries</Link></li>
                    <li><Link to="/about#deborah-fellowship">Deborah Fellowship</Link></li>
                    <li><Link to="/about#kids-bible-school">Kids Bible School</Link></li>
                    <li><Link to="/about#edifying-one-another">Edifying One Another</Link></li>
                  </ul>
                )}
              </li>

              {/* Sermons & Songs Dropdown */}
              <li className="sidebar-dropdown">
                <button
                  onClick={() => toggleDropdown('sermons')}
                  className={`sidebar-link sidebar-dropdown-trigger ${openDropdowns.sermons ? 'open' : ''}`}
                >
                  <i className="bi bi-music-note-beamed"></i>
                  <span style={{ flex: 1 }}>Sermons & Songs</span>
                  <i className="bi bi-chevron-down dropdown-chevron"></i>
                </button>
                {openDropdowns.sermons && (
                  <ul className="sidebar-submenu">
                    <li><Link to="/sermons?tab=sermons">Sermons</Link></li>
                    <li><Link to="/sermons?tab=songs">Zion Songs</Link></li>
                    <li><Link to="/sermons?tab=covers">Casual Covers</Link></li>
                  </ul>
                )}
              </li>

              {/* Live Dropdown */}
              <li className="sidebar-dropdown">
                <button
                  onClick={() => toggleDropdown('live')}
                  className={`sidebar-link sidebar-dropdown-trigger ${openDropdowns.live ? 'open' : ''}`}
                >
                  <i className="bi bi-broadcast-pin"></i>
                  <span style={{ flex: 1 }}>Live</span>
                  <i className="bi bi-chevron-down dropdown-chevron"></i>
                </button>
                {openDropdowns.live && (
                  <ul className="sidebar-submenu">
                    <li><Link to="/live">Live Broadcast</Link></li>
                    <li><Link to="/live#prayer-points">Prayer Points</Link></li>
                  </ul>
                )}
              </li>

              <li>
                <Link to="/gallery" className="sidebar-link">
                  <i className="bi bi-images"></i>
                  <span>Gallery</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="admin-sidebar-footer">
            <div className="admin-profile-info">
              <i className="bi bi-person-circle profile-avatar"></i>
              <div className="profile-text">
                <span className="profile-name">Administrator</span>
                <span className="profile-role">Super Admin</span>
              </div>
            </div>
            <button onClick={handleLogout} className="sidebar-logout-btn">
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content Panel */}
        <main className="admin-main-content">
          {/* Top white header bar matching the dashboard image */}
          <div className="admin-content-top-header">
            <div className="top-header-left">
              <i className="bi bi-list top-header-hamburger"></i>
              <div className="top-header-search">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Quick Search ..." />
              </div>
            </div>
            <div className="top-header-right">
              <div className="top-header-notification">
                <i className="bi bi-bell"></i>
                <span className="notification-badge"></span>
              </div>
              <div className="top-header-profile">
                <div className="profile-avatar-initials">AD</div>
                <span className="profile-avatar-name">Administrator</span>
              </div>
            </div>
          </div>

          <div className="admin-inner-container">
            <div className="admin-page-title-row">
              <div>
                <h2>
                  {activeTab === 'registry' ? 'Sanctuary Registry' : 'Website Content Manager'}
                </h2>
                <p>
                  {activeTab === 'registry'
                    ? 'Manage database users and review active credentials'
                    : 'Dynamically update Zion Original Songs and Weekly Services'}
                </p>
              </div>
              <div className="d-flex gap-3">
                {activeTab === 'registry' && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary"
                  >
                    <i className="bi bi-person-plus-fill me-1"></i> Add User
                  </button>
                )}
              </div>
            </div>

            <div className="admin-content-body">
              {error && (
                <div className="error-message mb-4" style={{ padding: '12px', borderRadius: '8px', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }}>
                  <i className="bi bi-exclamation-octagon me-2"></i> {error}
                </div>
              )}

              {activeTab === 'registry' && (
                <>
                  <div className="stats-row mb-4">
                    <div className="stat-card p-3 d-flex align-items-center gap-3" style={{ maxWidth: '300px', textAlign: 'left' }}>
                      <div className="stat-icon" style={{ background: 'var(--gold-metallic)', color: '#1a1a1a', width: '40px', height: '40px', fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                        <i className="bi bi-people-fill"></i>
                      </div>
                      <div className="stat-content">
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '1.4rem' }}>{users.length}</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem' }}>Total Registered Users</p>
                      </div>
                    </div>
                  </div>

                  <div className="registry-table-wrapper card-panel" style={{ padding: '24px' }}>
                    {/* Search Bar */}
                    <div className="mb-4">
                      <div className="input-group-custom" style={{ maxWidth: '400px' }}>
                        <i className="bi bi-search input-icon"></i>
                        <input
                          type="text"
                          className="form-control-custom"
                          placeholder="Search by ID, DOB, or Passcode..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {loading && users.length === 0 ? (
                      <div className="loading py-5 text-center">
                        <p className="mt-3">Loading sanctuary registry records...</p>
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="bi bi-folder2-open" style={{ fontSize: '3rem', color: 'rgba(191, 149, 63, 0.3)' }}></i>
                        <p className="text-cosmic mt-3">
                          {searchTerm ? 'No users found matching your search.' : 'No sanctuary users found in the database.'}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="admin-table">
                            <thead>
                              <tr>
                                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                  Sl.NO {sortField === 'id' && <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>}
                                </th>
                                <th>Name</th>
                                <th>Date of Birth (DOB)</th>
                                <th>Security Passcode</th>
                                <th>Created At</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedUsers.map((user) => (
                                <tr key={user.id}>
                                  <td><code>{user.id}</code></td>
                                  <td><span style={{ fontWeight: 600 }}>{user.name || 'N/A'}</span></td>
                                  <td>
                                    <span className="user-dob">
                                      <i className="bi bi-calendar3 me-2" style={{ color: 'var(--accent-gold)' }}></i>
                                      {user.dob}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="user-passcode d-flex align-items-center gap-2">
                                      <i className="bi bi-shield-lock-fill" style={{ color: '#2b43b6', opacity: 0.8 }}></i>
                                      <code>{visiblePasscodes[user.id] ? user.passcode : '••••'}</code>
                                      <button
                                        type="button"
                                        onClick={() => togglePasscodeVisibility(user.id)}
                                        style={{
                                          background: 'transparent',
                                          border: 'none',
                                          padding: 0,
                                          cursor: 'pointer',
                                          color: '#718096',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          fontSize: '0.95rem'
                                        }}
                                        title={visiblePasscodes[user.id] ? "Hide Passcode" : "Show Passcode"}
                                      >
                                        <i className={`bi bi-eye${visiblePasscodes[user.id] ? '-slash' : ''}`}></i>
                                      </button>
                                    </span>
                                  </td>
                                  <td>
                                    <span className="user-created">
                                      {new Date(user.createdAt).toLocaleString()}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="d-flex gap-2">
                                      <button
                                        onClick={() => openEditModal(user)}
                                        className="btn-secondary"
                                        style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                                        type="button"
                                        title="Edit User"
                                      >
                                        <i className="bi bi-pencil-square"></i>
                                      </button>
                                      <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="btn-secondary"
                                        style={{ padding: '6px 10px', fontSize: '0.85rem', color: '#e74c3c', borderColor: 'rgba(231, 76, 60, 0.2)', background: 'rgba(231, 76, 60, 0.02)' }}
                                        type="button"
                                        title="Delete User"
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
                            <div className="text-cosmic" style={{ fontSize: '0.9rem' }}>
                              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
                            </div>
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                className="btn-secondary py-1 px-3"
                                disabled={currentPage === 1}
                                type="button"
                              >
                                <i className="bi bi-chevron-left"></i> Previous
                              </button>
                              <span className="d-flex align-items-center px-3 text-cosmic">
                                Page {currentPage} of {totalPages}
                              </span>
                              <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                className="btn-secondary py-1 px-3"
                                disabled={currentPage === totalPages}
                                type="button"
                              >
                                Next <i className="bi bi-chevron-right"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'content' && (
                <div className="content-manager-wrapper card-panel" style={{ padding: '24px' }}>
                  {/* Select Content Key dropdown */}
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 pb-3 border-bottom" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                    <div style={{ minWidth: '300px' }}>
                      <label className="form-label">Select Content to Manage</label>
                      <select
                        className="form-control-custom"
                        style={{
                          border: '1px solid rgba(191, 149, 63, 0.2)',
                          borderRadius: '8px',
                          padding: '12px 15px',
                          width: '100%',
                          fontSize: '1rem',
                          cursor: 'pointer'
                        }}
                        value={selectedContentKey}
                        onChange={(e) => setSelectedContentKey(e.target.value)}
                      >
                        <option value="zion_songs">Zion Original Songs (Sermons Tab)</option>
                        <option value="casual_covers">Casual Worship Covers (Sermons Tab)</option>
                        <option value="service_hours">Weekly Service Timings (Meetings Page)</option>
                        <option value="gallery_albums">Our Gallery Albums (Gallery Page)</option>
                      </select>
                    </div>

                    <div className="d-flex gap-2 pt-4">
                      <button
                        onClick={handleSaveContent}
                        className="btn-primary py-2 px-4"
                        disabled={contentLoading}
                        type="button"
                      >
                        <i className="bi bi-cloud-arrow-up-fill me-1"></i> Save Changes to Database
                      </button>
                    </div>
                  </div>

                  {contentSuccess && (
                    <div className="sent-message mb-4" style={{ padding: '12px', borderRadius: '8px', background: 'rgba(46, 204, 113, 0.1)', color: '#27ae60' }}>
                      <i className="bi bi-check-circle-fill me-2"></i> {contentSuccess}
                    </div>
                  )}

                  {contentLoading && contentData.length === 0 ? (
                    <div className="loading py-5 text-center">
                      <p className="mt-3">Loading website content...</p>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {/* Left Column: Form to Add/Edit */}
                      <div className="col-lg-4">
                        <div className="card-panel" style={{ padding: '20px' }}>
                          <h3 style={{ fontSize: '1.2rem', color: '#b38728', marginBottom: '15px', fontWeight: 700 }}>
                            Add New Item
                          </h3>

                          {selectedContentKey === 'zion_songs' || selectedContentKey === 'casual_covers' ? (
                            <form onSubmit={handleAddSong}>
                              <div className="form-group mb-3">
                                <label className="form-label">YouTube Video ID</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. ahIVNoJZR2k"
                                  value={newSong.id}
                                  onChange={(e) => setNewSong({ ...newSong, id: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px' }}
                                />
                                <small className="text-cosmic" style={{ fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                                  The string of characters at the end of the video link (e.g. watch?v=<b>ahIVNoJZR2k</b>)
                                </small>
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Song Title</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. Gospel Song on John 3:16"
                                  value={newSong.title}
                                  onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <button type="submit" className="btn-primary w-100 py-2">
                                <i className="bi bi-plus-circle me-1"></i> Add Song to List
                              </button>
                            </form>
                          ) : selectedContentKey === 'gallery_albums' ? (
                            <form onSubmit={handleAddAlbum}>
                              <div className="form-group mb-3">
                                <label className="form-label">Album Title</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. Christmas Carol Service"
                                  value={newAlbum.title}
                                  onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Category</label>
                                <select
                                  className="form-control-custom"
                                  style={{
                                    border: '1px solid rgba(191, 149, 63, 0.2)',
                                    borderRadius: '8px',
                                    padding: '12px 15px',
                                    width: '100%',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                  }}
                                  value={newAlbum.category}
                                  onChange={(e) => setNewAlbum({ ...newAlbum, category: e.target.value })}
                                >
                                  <option value="church">Church Events</option>
                                  <option value="fellowship">Fellowships</option>
                                  <option value="youth">Kids & Youth</option>
                                  <option value="trips">ZPF Tours</option>
                                </select>
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                  className="form-control-custom"
                                  placeholder="e.g. Annual celebration and carols."
                                  value={newAlbum.asc}
                                  onChange={(e) => setNewAlbum({ ...newAlbum, asc: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px', minHeight: '80px', border: '1px solid rgba(191, 149, 63, 0.2)', borderRadius: '8px' }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Cover Image</label>
                                <div className="d-flex gap-2 align-items-center">
                                  <input
                                    type="text"
                                    className="form-control-custom"
                                    placeholder="e.g. /assets/img/all_ministries.png"
                                    value={newAlbum.cover}
                                    onChange={(e) => setNewAlbum({ ...newAlbum, cover: e.target.value })}
                                    required
                                    style={{ paddingLeft: '15px', flex: 1 }}
                                  />
                                  <label
                                    className="btn-secondary"
                                    style={{
                                      padding: '10px 15px',
                                      borderRadius: '8px',
                                      fontSize: '0.9rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                      margin: 0,
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '5px',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    <i className="bi bi-upload"></i> Upload
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files[0]
                                        if (file) {
                                          if (file.size > 2 * 1024 * 1024) {
                                            alert('File size exceeds 2MB limit. Please upload a smaller image.')
                                            return
                                          }
                                          const reader = new FileReader()
                                          reader.onloadend = () => {
                                            setNewAlbum({ ...newAlbum, cover: reader.result })
                                          }
                                          reader.readAsDataURL(file)
                                        }
                                      }}
                                      style={{ display: 'none' }}
                                    />
                                  </label>
                                </div>
                                {newAlbum.cover && (
                                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img
                                      src={newAlbum.cover}
                                      alt="Upload Preview"
                                      style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.05)' }}
                                    />
                                    {newAlbum.cover.startsWith('data:') && (
                                      <button
                                        type="button"
                                        onClick={() => setNewAlbum({ ...newAlbum, cover: '/assets/img/all_ministries.png' })}
                                        className="btn-sm"
                                        style={{ padding: '2px 8px', fontSize: '0.75rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                      >
                                        Remove Upload
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Sub-Items / Highlights (Optional, comma separated)</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. Carol Service, Nativity Skit"
                                  value={newAlbum.details}
                                  onChange={(e) => setNewAlbum({ ...newAlbum, details: e.target.value })}
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Video Highlights (Optional, YouTubeID:Title, one per line)</label>
                                <textarea
                                  className="form-control-custom"
                                  placeholder="e.g. dlOAth52Uc0:Carol 2025&#10;NK-efiHI1n0:Christmas Highlights"
                                  value={newAlbum.videos}
                                  onChange={(e) => setNewAlbum({ ...newAlbum, videos: e.target.value })}
                                  style={{ paddingLeft: '15px', minHeight: '80px', border: '1px solid rgba(191, 149, 63, 0.2)', borderRadius: '8px' }}
                                />
                              </div>
                              <button type="submit" className="btn-primary w-100 py-2">
                                <i className="bi bi-plus-circle me-1"></i> Add Album to List
                              </button>
                            </form>
                          ) : (
                            <form onSubmit={handleAddMeeting}>
                              <div className="form-group mb-3">
                                <label className="form-label">Service/Meeting Title</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. Regular Tamil Service"
                                  value={newMeeting.title}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Schedule</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. Every Friday"
                                  value={newMeeting.schedule}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, schedule: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Timing</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. 10:00 AM - 1:00 PM"
                                  value={newMeeting.timing}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, timing: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Location Type</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. Offline & Online or Online Only"
                                  value={newMeeting.locationType}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, locationType: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Category</label>
                                <select
                                  className="form-control-custom"
                                  style={{
                                    border: '1px solid rgba(191, 149, 63, 0.2)',
                                    borderRadius: '8px',
                                    padding: '12px 15px',
                                    width: '100%',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                  }}
                                  value={newMeeting.category}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, category: e.target.value })}
                                >
                                  <option value="services">Weekly Services</option>
                                  <option value="prayer">Prayer & Study</option>
                                  <option value="fellowship">Fellowships</option>
                                  <option value="seasonal">Special & Seasonal</option>
                                </select>
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Bootstrap Icon Class</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. bi-bookmark-star"
                                  value={newMeeting.icon}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, icon: e.target.value })}
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Icon Color Theme</label>
                                <select
                                  className="form-control-custom"
                                  style={{
                                    border: '1px solid rgba(191, 149, 63, 0.2)',
                                    borderRadius: '8px',
                                    padding: '12px 15px',
                                    width: '100%',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                  }}
                                  value={newMeeting.color}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, color: e.target.value })}
                                >
                                  <option value="blue">Blue</option>
                                  <option value="orange">Orange</option>
                                  <option value="purple">Purple</option>
                                  <option value="green">Green</option>
                                </select>
                              </div>
                              <div className="form-group mb-3">
                                <label className="form-label">Extra Note (Optional)</label>
                                <input
                                  type="text"
                                  className="form-control-custom"
                                  placeholder="e.g. Communion blessing service"
                                  value={newMeeting.note}
                                  onChange={(e) => setNewMeeting({ ...newMeeting, note: e.target.value })}
                                  style={{ paddingLeft: '15px' }}
                                />
                              </div>
                              <button type="submit" className="btn-primary w-100 py-2">
                                <i className="bi bi-plus-circle me-1"></i> Add Meeting to List
                              </button>
                            </form>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Existing List with Deletion */}
                      <div className="col-lg-8">
                        <div className="card-panel" style={{ padding: '20px' }}>
                          <h3 style={{ fontSize: '1.2rem', color: '#b38728', marginBottom: '15px', fontWeight: 700 }}>
                            Current Items List
                          </h3>

                          {contentData.length === 0 ? (
                            <div className="text-center py-5">
                              <i className="bi bi-folder-x" style={{ fontSize: '2.5rem', color: 'rgba(191, 149, 63, 0.3)' }}></i>
                              <p className="text-cosmic mt-3">No items in this list. Use the form to add some.</p>
                            </div>
                          ) : (selectedContentKey === 'zion_songs' || selectedContentKey === 'casual_covers') ? (
                            <>
                              <div className="table-responsive">
                                <table className="admin-table">
                                  <thead>
                                    <tr>
                                      <th>Thumbnail</th>
                                      <th>YouTube ID / Title</th>
                                      <th style={{ width: '80px' }}>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {paginatedContent.map((song, idx) => (
                                      <tr key={idx}>
                                        <td style={{ width: '120px' }}>
                                          <img
                                            src={`https://img.youtube.com/vi/${song.id}/hqdefault.jpg`}
                                            alt={song.title}
                                            style={{ width: '100px', height: 'auto', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.05)' }}
                                          />
                                        </td>
                                        <td>
                                          <div style={{ fontWeight: 600 }}>{song.title}</div>
                                          <code style={{ fontSize: '0.8rem', opacity: 0.8 }}>ID: {song.id}</code>
                                        </td>
                                        <td>
                                          <button
                                            onClick={() => handleDeleteSong(song.id)}
                                            className="btn-secondary"
                                            style={{ padding: '6px 10px', fontSize: '0.85rem', color: '#e74c3c', borderColor: 'rgba(231, 76, 60, 0.2)', background: 'rgba(231, 76, 60, 0.02)' }}
                                            type="button"
                                            title="Delete Song"
                                          >
                                            <i className="bi bi-trash"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {/* Content Pagination */}
                              {totalContentPages > 1 && (
                                <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
                                  <div className="text-cosmic" style={{ fontSize: '0.9rem' }}>
                                    Showing {((contentPage - 1) * itemsPerContentPage) + 1} to {Math.min(contentPage * itemsPerContentPage, contentData.length)} of {contentData.length} items
                                  </div>
                                  <div className="d-flex gap-2">
                                    <button
                                      onClick={() => setContentPage(prev => Math.max(1, prev - 1))}
                                      className="btn-secondary py-1 px-3"
                                      disabled={contentPage === 1}
                                      type="button"
                                    >
                                      <i className="bi bi-chevron-left"></i> Previous
                                    </button>
                                    <span className="d-flex align-items-center px-3 text-cosmic">
                                      Page {contentPage} of {totalContentPages}
                                    </span>
                                    <button
                                      onClick={() => setContentPage(prev => Math.min(totalContentPages, prev + 1))}
                                      className="btn-secondary py-1 px-3"
                                      disabled={contentPage === totalContentPages}
                                      type="button"
                                    >
                                      Next <i className="bi bi-chevron-right"></i>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : selectedContentKey === 'gallery_albums' ? (
                            <>
                              <div className="table-responsive">
                                <table className="admin-table">
                                  <thead>
                                    <tr>
                                      <th>Cover</th>
                                      <th>Title / Category</th>
                                      <th>Description / Highlights</th>
                                      <th style={{ width: '80px' }}>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {paginatedContent.map((album, idx) => (
                                      <tr key={idx}>
                                        <td style={{ width: '120px' }}>
                                          <img
                                            src={album.cover || (album.id ? `https://img.youtube.com/vi/${album.id}/hqdefault.jpg` : '/assets/img/all_ministries.png')}
                                            alt={album.title}
                                            style={{ width: '100px', height: 'auto', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.05)' }}
                                          />
                                        </td>
                                        <td>
                                          <div style={{ fontWeight: 600 }}>{album.title}</div>
                                          <span
                                            style={{
                                              fontSize: '0.75rem',
                                              padding: '2px 8px',
                                              borderRadius: '10px',
                                              background: 'rgba(0, 0, 0, 0.03)',
                                              color: '#b38728',
                                              textTransform: 'uppercase'
                                            }}
                                          >
                                            {album.category || 'worship'}
                                          </span>
                                        </td>
                                        <td>
                                          <p style={{ margin: 0, fontSize: '0.85rem', color: '#4a5568' }}>{album.asc || 'YouTube Video Highlight'}</p>
                                          {album.details && (
                                            <div style={{ fontSize: '0.75rem', color: '#d35400', marginTop: '4px' }}>
                                              Highlights: {album.details.join(', ')}
                                            </div>
                                          )}
                                          {album.videos && (
                                            <div style={{ fontSize: '0.75rem', color: '#2980b9', marginTop: '4px' }}>
                                              Videos: {album.videos.map(v => v.title).join(', ')}
                                            </div>
                                          )}
                                          {!album.videos && album.id && (
                                            <div style={{ fontSize: '0.75rem', color: '#2980b9', marginTop: '4px' }}>
                                              YouTube ID: <code>{album.id}</code>
                                            </div>
                                          )}
                                        </td>
                                        <td>
                                          <button
                                            onClick={() => handleDeleteAlbum((contentPage - 1) * itemsPerContentPage + idx)}
                                            className="btn-secondary"
                                            style={{ padding: '6px 10px', fontSize: '0.85rem', color: '#e74c3c', borderColor: 'rgba(231, 76, 60, 0.2)', background: 'rgba(231, 76, 60, 0.02)' }}
                                            type="button"
                                            title="Delete Album"
                                          >
                                            <i className="bi bi-trash"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {/* Content Pagination */}
                              {totalContentPages > 1 && (
                                <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
                                  <div className="text-cosmic" style={{ fontSize: '0.9rem' }}>
                                    Showing {((contentPage - 1) * itemsPerContentPage) + 1} to {Math.min(contentPage * itemsPerContentPage, contentData.length)} of {contentData.length} albums
                                  </div>
                                  <div className="d-flex gap-2">
                                    <button
                                      onClick={() => setContentPage(prev => Math.max(1, prev - 1))}
                                      className="btn-secondary py-1 px-3"
                                      disabled={contentPage === 1}
                                      type="button"
                                    >
                                      <i className="bi bi-chevron-left"></i> Previous
                                    </button>
                                    <span className="d-flex align-items-center px-3 text-cosmic">
                                      Page {contentPage} of {totalContentPages}
                                    </span>
                                    <button
                                      onClick={() => setContentPage(prev => Math.min(totalContentPages, prev + 1))}
                                      className="btn-secondary py-1 px-3"
                                      disabled={contentPage === totalContentPages}
                                      type="button"
                                    >
                                      Next <i className="bi bi-chevron-right"></i>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="table-responsive">
                                <table className="admin-table">
                                  <thead>
                                    <tr>
                                      <th>Icon / Title</th>
                                      <th>Schedule / Timing</th>
                                      <th>Location / Category</th>
                                      <th style={{ width: '80px' }}>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {paginatedContent.map((meeting, idx) => (
                                      <tr key={idx}>
                                        <td>
                                          <div className="d-flex align-items-center gap-2">
                                            <i
                                              className={`bi ${meeting.icon || 'bi-calendar'}`}
                                              style={{
                                                color: meeting.color === 'blue' ? '#2563eb' :
                                                  meeting.color === 'orange' ? '#d97706' :
                                                    meeting.color === 'purple' ? '#9333ea' : '#16a34a',
                                                fontSize: '1.2rem'
                                              }}
                                            ></i>
                                            <div>
                                              <span style={{ fontWeight: 600 }}>{meeting.title}</span>
                                              {meeting.note && (
                                                <div style={{ fontSize: '0.75rem', color: '#d97706' }}>{meeting.note}</div>
                                              )}
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div>{meeting.schedule}</div>
                                          <div className="text-cosmic" style={{ fontSize: '0.85rem' }}>{meeting.timing}</div>
                                        </td>
                                        <td>
                                          <div>{meeting.locationType}</div>
                                          <span
                                            style={{
                                              fontSize: '0.75rem',
                                              padding: '2px 8px',
                                              borderRadius: '10px',
                                              background: 'rgba(0, 0, 0, 0.03)',
                                              color: '#b38728'
                                            }}
                                          >
                                            {meeting.category}
                                          </span>
                                        </td>
                                        <td>
                                          <button
                                            onClick={() => handleDeleteMeeting((contentPage - 1) * itemsPerContentPage + idx)}
                                            className="btn-secondary"
                                            style={{ padding: '6px 10px', fontSize: '0.85rem', color: '#e74c3c', borderColor: 'rgba(231, 76, 60, 0.2)', background: 'rgba(231, 76, 60, 0.02)' }}
                                            type="button"
                                            title="Delete Meeting"
                                          >
                                            <i className="bi bi-trash"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {/* Content Pagination */}
                              {totalContentPages > 1 && (
                                <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
                                  <div className="text-cosmic" style={{ fontSize: '0.9rem' }}>
                                    Showing {((contentPage - 1) * itemsPerContentPage) + 1} to {Math.min(contentPage * itemsPerContentPage, contentData.length)} of {contentData.length} services
                                  </div>
                                  <div className="d-flex gap-2">
                                    <button
                                      onClick={() => setContentPage(prev => Math.max(1, prev - 1))}
                                      className="btn-secondary py-1 px-3"
                                      disabled={contentPage === 1}
                                      type="button"
                                    >
                                      <i className="bi bi-chevron-left"></i> Previous
                                    </button>
                                    <span className="d-flex align-items-center px-3 text-cosmic">
                                      Page {contentPage} of {totalContentPages}
                                    </span>
                                    <button
                                      onClick={() => setContentPage(prev => Math.min(totalContentPages, prev + 1))}
                                      className="btn-secondary py-1 px-3"
                                      disabled={contentPage === totalContentPages}
                                      type="button"
                                    >
                                      Next <i className="bi bi-chevron-right"></i>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Add User Modal */}
              <AnimatePresence>
                {showAddModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                    onClick={() => setShowAddModal(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="modal-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="modal-header">
                        <h3>Add New User</h3>
                        <button onClick={() => setShowAddModal(false)} className="btn-close">
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                      <form onSubmit={handleAddUser} className="modal-body">
                        <div className="form-group mb-3">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-control-custom"
                            placeholder="e.g. Alwyn"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Date of Birth (DD-MM-YYYY)</label>
                          <input
                            type="text"
                            className="form-control-custom"
                            placeholder="15-08-1995"
                            value={newUser.dob}
                            onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
                            required
                            pattern="\d{2}-\d{2}-\d{4}"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Passcode</label>
                          <input
                            type="text"
                            className="form-control-custom"
                            placeholder="7777"
                            value={newUser.passcode}
                            onChange={(e) => setNewUser({ ...newUser, passcode: e.target.value })}
                            required
                          />
                        </div>
                        <div className="modal-footer">
                          <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">
                            Cancel
                          </button>
                          <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Adding...' : 'Add User'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Edit User Modal */}
              <AnimatePresence>
                {showEditModal && selectedUser && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                    onClick={() => setShowEditModal(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="modal-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="modal-header">
                        <h3>Edit User #{selectedUser.id}</h3>
                        <button onClick={() => setShowEditModal(false)} className="btn-close">
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                      <form onSubmit={handleEditUser} className="modal-body">
                        <div className="form-group mb-3">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-control-custom"
                            placeholder="e.g. Alwyn"
                            value={editUser.name}
                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Date of Birth (DD-MM-YYYY)</label>
                          <input
                            type="text"
                            className="form-control-custom"
                            placeholder="15-08-1995"
                            value={editUser.dob}
                            onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
                            required
                            pattern="\d{2}-\d{2}-\d{4}"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label">Passcode</label>
                          <input
                            type="text"
                            className="form-control-custom"
                            placeholder="7777"
                            value={editUser.passcode}
                            onChange={(e) => setEditUser({ ...editUser, passcode: e.target.value })}
                            required
                          />
                        </div>
                        <div className="modal-footer">
                          <button type="button" onClick={() => setShowEditModal(false)} className="btn-secondary">
                            Cancel
                          </button>
                          <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Updating...' : 'Update User'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Delete Confirmation Modal */}
              <AnimatePresence>
                {showDeleteConfirm && deleteTarget && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="modal-content"
                      style={{ maxWidth: '400px' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: '10px' }}>
                        <h3 style={{ color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                          <i className="bi bi-exclamation-triangle-fill"></i> Confirm Delete
                        </h3>
                        <button onClick={() => setShowDeleteConfirm(false)} className="btn-close">
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                      <div className="modal-body" style={{ paddingTop: '10px', paddingBottom: '20px' }}>
                        <p style={{ margin: 0, color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.5' }}>
                          Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
                        </p>
                      </div>
                      <div className="modal-footer" style={{ borderTop: 'none', paddingTop: '10px', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(false)}
                          className="btn-secondary"
                          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={executeDelete}
                          className="btn-danger"
                          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
