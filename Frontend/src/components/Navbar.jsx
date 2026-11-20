import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
        <span className="brand-icon">
          <ShieldCheck size={27} />
        </span>
        <span>Job<span>Shield</span></span>
      </Link>

      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? 'nav-links active' : 'nav-links'}>
        <Link to="/scan" onClick={() => setMenuOpen(false)}>Is This Job Real?</Link>
        <Link to="/offer-review" onClick={() => setMenuOpen(false)}>Offer Review</Link>
        <Link to="/cv-tailor" onClick={() => setMenuOpen(false)}>CV Tailor</Link>
        <Link to="/tracker" onClick={() => setMenuOpen(false)}>Tracker</Link>
        <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
        {user && (
          <Link
            to={user.role === 'admin' ? '/admin' : '/dashboard'}
            onClick={() => setMenuOpen(false)}
          >
            {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
          </Link>
        )}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <Link
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              className="login-btn"
            >
              {user.name}
            </Link>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                logout()
                navigate('/')
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Log In</Link>
            <Link to="/scan" className="register-btn">Free Check</Link>
          </>
        )}
      </div>
    </header>
  )
}