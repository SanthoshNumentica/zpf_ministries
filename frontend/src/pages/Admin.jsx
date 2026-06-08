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
                    <h1 className="gold-gradient-text admin-header-title">Sanctuary Registry</h1>
                    <p className="text-cosmic">Manage database users and review active credentials</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <button onClick={() => setShowAddModal(true)} className="btn-primary py-2 px-4" style={{ background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', color: '#fff' }}>
                    <i className="bi bi-person-plus-fill me-1"></i> Add User
                  </button>
                  <button onClick={handleLogout} className="btn-primary py-2 px-4" style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', color: '#fff' }}>
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <i className="bi bi-exclamation-octagon me-2"></i> {error}
                </div>
              )}

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
                                    title="Edit User"
                                  >
                                    <i className="bi bi-pencil-square"></i>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="btn-sm btn-primary"
                                    style={{ padding: '4px 8px', fontSize: '0.8rem', background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' }}
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
                          >
                            Next <i className="bi bi-chevron-right"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

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
