import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PricingPage() {
  return (
    <section className="page-container">
      <div className="section-heading">
        <span className="section-label">SIMPLE PRICING</span>
        <h1>Pay for your job hunt, not forever.</h1>
        <p>No sticky subscriptions after you get hired.</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>Free Plan</h3>
          <h2>$0</h2>
          <p>3 scam or offer checks per month</p>
          <ul>
            <li><CheckCircle size={16} /> Recruiter & job post red-flag scan</li>
            <li><CheckCircle size={16} /> Client-side privacy redaction</li>
          </ul>
          <Link to="/scan" className="secondary-btn">Start Free</Link>
        </div>

        <div className="feature-card">
          <h3>30-Day Job Hunt Pass</h3>
          <h2>$19 <span>one-time</span></h2>
          <p>Full access to all 5 tools for 30 days</p>
          <ul>
            <li><CheckCircle size={16} /> Unlimited scam & offer letter audits</li>
            <li><CheckCircle size={16} /> Honest CV & cover letter tailoring</li>
            <li><CheckCircle size={16} /> Application tracker & interview prep</li>
          </ul>
          <Link to="/scan" className="primary-btn">Get 30-Day Pass</Link>
        </div>
      </div>
    </section>
  )
}