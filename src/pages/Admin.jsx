import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Admin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('zpf_admin_token') || '')
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch users list when authenticated
  useEffect(() => {
    if (adminToken) {
      fetchUsers()
    }
  }, [adminToken])

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('http://localhost:3000/admin/users', {
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/auth/admin/login', {
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
                <div>
                  <h1 className="gold-gradient-text admin-header-title">Sanctuary Registry</h1>
                  <p className="text-cosmic">Manage database users and review active credentials</p>
                </div>
                <div className="d-flex gap-3">
                  <button onClick={fetchUsers} className="btn-secondary py-2 px-3" disabled={loading}>
                    <i className="bi bi-arrow-clockwise me-1"></i> Refresh
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
                    <h4 style={{ margin: 0 }}>{users.length}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Total Registered Users</p>
                  </div>
                </div>
              </div>

              <div className="registry-table-wrapper card-panel">
                {loading && users.length === 0 ? (
                  <div className="loading py-5">
                    <p className="mt-3">Loading sanctuary registry records...</p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-folder2-open" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)' }}></i>
                    <p className="text-cosmic mt-3">No sanctuary users found in the database.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Date of Birth (DOB)</th>
                          <th>Security Passcode</th>
                          <th>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
