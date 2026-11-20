import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand-col">
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon">
              <ShieldCheck size={24} />
            </span>
            <span>Job<span>Shield</span></span>
          </Link>
          <p>
            Built to help job seekers verify opportunities and understand contracts
            before committing—with client-side privacy redaction and clear risk checks.
          </p>
        </div>

        <div className="footer-links-col">
          <h4>Safety & Audits</h4>
          <Link to="/scan">Is This Job Real?</Link>
          <Link to="/offer-review">Offer Letter Review</Link>
          <Link to="/pricing">Pricing & 30-Day Pass</Link>
        </div>

        <div className="footer-links-col">
          <h4>Job Hunt Workspace</h4>
          <Link to="/cv-tailor">Honest CV Tailor</Link>
          <Link to="/tracker">Application Tracker</Link>
          <Link to="/interview-prep">Interview Prep</Link>
        </div>

        <div className="footer-links-col">
          <h4>Trust & Access</h4>
          <Link to="/dashboard">User Dashboard</Link>
          <Link to="/login">Sign In</Link>
          <span className="footer-note">
            Automated risk indicators only—not legal or employment advice.
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} JobShield. All rights reserved.</span>
        <span>Privacy-first job search protection</span>
      </div>
    </footer>
  )
}