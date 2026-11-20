import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="trust-badge">
          <ShieldCheck size={16} />
          Verify Before You Trust. Understand Before You Sign.
        </div>

        <h1>
          One Toolkit for Job Seekers.
          <br />
          <span>From Scam Check to Signed Offer.</span>
        </h1>

        <p className="hero-description">
          Spot fake recruiter messages, audit risky offer letters, tailor your CV honestly,
          and track every application in one privacy-first workspace.
        </p>

        <div className="hero-buttons">
          <Link to="/scan" className="primary-btn">
            Check a Job Post <ArrowRight size={18} />
          </Link>
          <Link to="/offer-review" className="secondary-btn">
            Audit an Offer Letter
          </Link>
        </div>

        <div className="hero-trust">
          <CheckCircle size={17} />
          3 free scans per month • Client-side privacy redaction
        </div>
      </div>
    </section>
  )
}