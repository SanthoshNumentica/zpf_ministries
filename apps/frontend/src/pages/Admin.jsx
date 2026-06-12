import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('zpf_admin_token') || '')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUser, setNewUser] = useState({ dob: '', passcode: '' })
  const [editUser, setEditUser] = useState({ dob: '', passcode: '' })

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
    desc: '',
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
    setContentData(contentData.filter(s => s.id !== songId))
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
    setContentData(contentData.filter((_, idx) => idx !== index))
  }

  const handleAddAlbum = (e) => {
    e.preventDefault()
    if (!newAlbum.title || !newAlbum.desc) {
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
      desc: newAlbum.desc,
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
    setContentData(contentData.filter((_, idx) => idx !== index))
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
        setNewUser({ dob: '', passcode: '' })
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
        setEditUser({ dob: '', passcode: '' })
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

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

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
    setEditUser({ dob: user.dob, passcode: user.passcode })
    setShowEditModal(true)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

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

  return (
    <div className="admin-page-container">
      {/* Background celestial animations */}
      <div className="ambient-background">
        <div className="glow-sphere glow-sphere-1"></div>
        <div className="glow-sphere glow-sphere-2"></div>
      </div>

      <div className="container py-5">
        <AnimatePresence mode="wait">
          {!adminToken ? (
            /* Admin Login View */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: '70vh' }}
            >
              <div className="login-card-container">
                <div className="login-card-glow"></div>
                <div className="login-card">
                  <div className="login-header text-center mb-4">
                    <i className="bi bi-shield-lock lock-icon"></i>
                    <h2 className="login-title">Admin Access Portal</h2>
                    <p className="login-subtitle">Provide administrator credentials to proceed</p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="login-form mt-4">
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
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Admin Dashboard View */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="admin-dashboard-panel mt-5"
            >
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div className="d-flex align-items-center gap-4">
                  <img src="/assets/img/zpf_logo.png" alt="ZPF Logo" style={{ height: '60px', width: 'auto' }} />
                  <div>
                    <h1 className="gold-gradient-text admin-header-title">
                      {activeTab === 'registry' ? 'Sanctuary Registry' : 'Website Content Manager'}
                    </h1>
                    <p className="text-cosmic">
                      {activeTab === 'registry' 
                        ? 'Manage database users and review active credentials' 
                        : 'Dynamically update Zion Original Songs and Weekly Services'}
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  {activeTab === 'registry' && (
                    <button onClick={() => setShowAddModal(true)} className="btn-primary py-2 px-4" style={{ background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', color: '#fff' }}>
                      <i className="bi bi-person-plus-fill me-1"></i> Add User
                    </button>
                  )}
                  <button onClick={handleLogout} className="btn-primary py-2 px-4" style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', color: '#fff' }}>
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="d-flex gap-3 mb-4 border-bottom pb-3" style={{ borderColor: 'rgba(229, 193, 88, 0.15)' }}>
                <button
                  onClick={() => setActiveTab('registry')}
                  className="btn-secondary py-2 px-4"
                  style={{
                    background: activeTab === 'registry' ? 'var(--gold-metallic)' : 'transparent',
                    color: activeTab === 'registry' ? '#050609' : 'var(--accent-gold)',
                    border: '2px solid #bf953f',
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="bi bi-people-fill me-2"></i> User Registry
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className="btn-secondary py-2 px-4"
                  style={{
                    background: activeTab === 'content' ? 'var(--gold-metallic)' : 'transparent',
                    color: activeTab === 'content' ? '#050609' : 'var(--accent-gold)',
                    border: '2px solid #bf953f',
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="bi bi-pencil-square me-2"></i> Content Manager
                </button>
              </div>

              {error && (
                <div className="error-message mb-4">
                  <i className="bi bi-exclamation-octagon me-2"></i> {error}
                </div>
              )}

              {activeTab === 'registry' && (
                <>
                  <div className="stats-row mb-4">
                    <div className="stat-card p-3 d-flex align-items-center gap-3" style={{ maxWidth: '300px', textAlign: 'left' }}>
                      <div className="stat-icon" style={{ background: 'var(--gold-metallic)', width: '40px', height: '40px', fontSize: '1.1rem', margin: 0 }}>
                        <i className="bi bi-people-fill"></i>
                      </div>
                      <div className="stat-content">
                        <h4 style={{ margin: 10 }}>{users.length}</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem' }}>Total Registered Users</p>
                      </div>
                    </div>
                  </div>

                  <div className="registry-table-wrapper card-panel">
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
                      <div className="loading py-5">
                        <p className="mt-3">Loading sanctuary registry records...</p>
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="bi bi-folder2-open" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}></i>
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
                                  ID {sortField === 'id' && <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>}
                                </th>
                                <th onClick={() => handleSort('dob')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                  Date of Birth (DOB) {sortField === 'dob' && <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>}
                                </th>
                                <th onClick={() => handleSort('passcode')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                  Security Passcode {sortField === 'passcode' && <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>}
                                </th>
                                <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                  Created At {sortField === 'createdAt' && <i className={`bi bi-arrow-${sortOrder === 'asc' ? 'up' : 'down'} ms-1`}></i>}
                                </th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paginatedUsers.map((user) => (
                                <tr key={user.id}>
                                  <td><code>#{user.id}</code></td>
                                  <td>
                                    <span className="user-dob">
                                      <i className="bi bi-calendar3 me-2" style={{ color: 'var(--accent-gold)' }}></i>
                                      {user.dob}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="user-passcode">
                                      <i className="bi bi-shield-lock-fill me-2" style={{ color: 'var(--accent-gold)' }}></i>
                                      <code>{user.passcode}</code>
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
                                        className="btn-sm btn-primary"
                                        style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                                        type="button"
                                        title="Edit User"
                                      >
                                        <i className="bi bi-pencil-square"></i>
                                      </button>
                                      <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="btn-sm btn-primary"
                                        style={{ padding: '4px 8px', fontSize: '0.8rem', background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' }}
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
                <div className="content-manager-wrapper card-panel">
                  {/* Select Content Key dropdown */}
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 pb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div style={{ minWidth: '300px' }}>
                      <label className="form-label">Select Content to Manage</label>
                      <select
                        className="form-control-custom"
                        style={{
                          background: '#06070ad9',
                          color: '#fff',
                          border: '1px solid rgba(229, 193, 88, 0.15)',
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
                        style={{
                          background: 'var(--gold-metallic)',
                          color: '#050609',
                          fontWeight: 700
                        }}
                        disabled={contentLoading}
                        type="button"
                      >
                        <i className="bi bi-cloud-arrow-up-fill me-1"></i> Save Changes to Database
                      </button>
                    </div>
                  </div>

                  {contentSuccess && (
                    <div className="sent-message mb-4" style={{ padding: '12px', borderRadius: '8px' }}>
                      <i className="bi bi-check-circle-fill me-2"></i> {contentSuccess}
                    </div>
                  )}

                  {contentLoading && contentData.length === 0 ? (
                    <div className="loading py-5">
                      <p className="mt-3">Loading website content...</p>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {/* Left Column: Form to Add/Edit */}
                      <div className="col-lg-4">
                        <div
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(229, 193, 88, 0.1)',
                            borderRadius: '12px',
                            padding: '20px'
                          }}
                        >
                          <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '15px' }}>
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
                                <small style={{ color: 'var(--text-cosmic)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
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
                                    background: '#06070ad9',
                                    color: '#fff',
                                    border: '1px solid rgba(229, 193, 88, 0.15)',
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
                                  value={newAlbum.desc}
                                  onChange={(e) => setNewAlbum({ ...newAlbum, desc: e.target.value })}
                                  required
                                  style={{ paddingLeft: '15px', minHeight: '80px', color: '#fff', background: '#06070ad9', border: '1px solid rgba(229,193,88,0.15)', borderRadius: '8px' }}
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
                                      style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}
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
                                  style={{ paddingLeft: '15px', minHeight: '80px', color: '#fff', background: '#06070ad9', border: '1px solid rgba(229,193,88,0.15)', borderRadius: '8px' }}
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
                                    background: '#06070ad9',
                                    color: '#fff',
                                    border: '1px solid rgba(229, 193, 88, 0.15)',
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
                                    background: '#06070ad9',
                                    color: '#fff',
                                    border: '1px solid rgba(229, 193, 88, 0.15)',
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
                        <div
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(229, 193, 88, 0.1)',
                            borderRadius: '12px',
                            padding: '20px'
                          }}
                        >
                          <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '15px' }}>
                            Current Items List
                          </h3>

                          {contentData.length === 0 ? (
                            <div className="text-center py-5">
                              <i className="bi bi-folder-x" style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.2)' }}></i>
                              <p className="text-cosmic mt-3">No items in this list. Use the form to add some.</p>
                            </div>
                          ) : (selectedContentKey === 'zion_songs' || selectedContentKey === 'casual_covers') ? (
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
                                  {contentData.map((song, idx) => (
                                    <tr key={idx}>
                                      <td style={{ width: '120px' }}>
                                        <img
                                          src={`https://img.youtube.com/vi/${song.id}/hqdefault.jpg`}
                                          alt={song.title}
                                          style={{ width: '100px', height: 'auto', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}
                                        />
                                      </td>
                                      <td>
                                        <div style={{ fontWeight: 600, color: '#fff' }}>{song.title}</div>
                                        <code style={{ fontSize: '0.8rem', opacity: 0.8 }}>ID: {song.id}</code>
                                      </td>
                                      <td>
                                        <button
                                          onClick={() => handleDeleteSong(song.id)}
                                          className="btn-sm btn-primary"
                                          style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', color: '#fff' }}
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
                          ) : selectedContentKey === 'gallery_albums' ? (
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
                                  {contentData.map((album, idx) => (
                                    <tr key={idx}>
                                      <td style={{ width: '120px' }}>
                                        <img
                                          src={album.cover || '/assets/img/all_ministries.png'}
                                          alt={album.title}
                                          style={{ width: '100px', height: 'auto', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}
                                        />
                                      </td>
                                      <td>
                                        <div style={{ fontWeight: 600, color: '#fff' }}>{album.title}</div>
                                        <span
                                          style={{
                                            fontSize: '0.75rem',
                                            padding: '2px 8px',
                                            borderRadius: '10px',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'var(--accent-gold)',
                                            textTransform: 'uppercase'
                                          }}
                                        >
                                          {album.category}
                                        </span>
                                      </td>
                                      <td>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#ccc' }}>{album.desc}</p>
                                        {album.details && (
                                          <div style={{ fontSize: '0.75rem', color: '#e67e22', marginTop: '4px' }}>
                                            Highlights: {album.details.join(', ')}
                                          </div>
                                        )}
                                        {album.videos && (
                                          <div style={{ fontSize: '0.75rem', color: '#3498db', marginTop: '4px' }}>
                                            Videos: {album.videos.map(v => v.title).join(', ')}
                                          </div>
                                        )}
                                      </td>
                                      <td>
                                        <button
                                          onClick={() => handleDeleteAlbum(idx)}
                                          className="btn-sm btn-primary"
                                          style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', color: '#fff' }}
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
                          ) : (
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
                                  {contentData.map((meeting, idx) => (
                                    <tr key={idx}>
                                      <td>
                                        <div className="d-flex align-items-center gap-2">
                                          <i
                                            className={`bi ${meeting.icon || 'bi-calendar'}`}
                                            style={{
                                              color: meeting.color === 'blue' ? '#2563eb' : 
                                                     meeting.color === 'orange' ? '#f97316' : 
                                                     meeting.color === 'purple' ? '#a855f7' : '#22c55e',
                                              fontSize: '1.2rem'
                                            }}
                                          ></i>
                                          <div>
                                            <span style={{ fontWeight: 600, color: '#fff' }}>{meeting.title}</span>
                                            {meeting.note && (
                                              <div style={{ fontSize: '0.75rem', color: '#e67e22' }}>{meeting.note}</div>
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <div>{meeting.schedule}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-cosmic)' }}>{meeting.timing}</div>
                                      </td>
                                      <td>
                                        <div>{meeting.locationType}</div>
                                        <span
                                          style={{
                                            fontSize: '0.75rem',
                                            padding: '2px 8px',
                                            borderRadius: '10px',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'var(--accent-gold)'
                                          }}
                                        >
                                          {meeting.category}
                                        </span>
                                      </td>
                                      <td>
                                        <button
                                          onClick={() => handleDeleteMeeting(idx)}
                                          className="btn-sm btn-primary"
                                          style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', color: '#fff' }}
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
                          <label className="form-label">Date of Birth (YYYY-MM-DD)</label>
                          <input
                            type="text"
                            className="form-control-custom"
                            placeholder="1995-08-15"
                            value={newUser.dob}
                            onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
                            required
                            pattern="\d{4}-\d{2}-\d{2}"
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
                          <label className="form-label">Date of Birth (YYYY-MM-DD)</label>
                          <input
                            type="text"
                            className="form-control-custom"
                            placeholder="1995-08-15"
                            value={editUser.dob}
                            onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
                            required
                            pattern="\d{4}-\d{2}-\d{2}"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
