import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginAsDemo } = useAuth()
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    // Temporary routing until connected to POST /api/auth/login
    const isAdmin = email.toLowerCase().includes('admin')
    loginAsDemo(isAdmin ? 'admin' : 'user')
    navigate(isAdmin ? '/admin' : '/dashboard')
  }

  return (
    <section className="page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-icon">
            <ShieldCheck size={24} />
          </div>
          <h1>Sign in to JobShield</h1>
          <p>Access your saved scans, offer audits, CV tools, and tracker.</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <label>
            Email Address
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="primary-btn full-width">
            <Lock size={16} /> Log In
          </button>
        </form>

        <div className="demo-switch">
          <span>Quick Preview:</span>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              loginAsDemo('user')
              navigate('/dashboard')
            }}
          >
            Enter User Dashboard
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              loginAsDemo('admin')
              navigate('/admin')
            }}
          >
            Enter Admin Dashboard
          </button>
        </div>
      </div>
    </section>
  )
}