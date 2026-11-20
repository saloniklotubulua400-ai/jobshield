import { Link } from 'react-router-dom'
import {
  ShieldAlert,
  FileCheck2,
  FileText,
  ListChecks,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function UserDashboardPage() {
  const { user } = useAuth()

  const recentScans = [
    {
      id: 'scn_101',
      type: 'Job Check',
      target: 'Remote Data Entry — WhatsApp Recruiter',
      verdict: 'red_flags',
      label: 'Red Flags Found',
      date: 'Today'
    },
    {
      id: 'scn_102',
      type: 'Offer Audit',
      target: 'Vera Beauty & Fashion College — IT Assistant',
      verdict: 'no_red_flags',
      label: 'No Common Red Flags',
      date: '2 days ago'
    }
  ]

  const quickTools = [
    { icon: <ShieldAlert size={20} />, title: 'Scam Check', path: '/scan' },
    { icon: <FileCheck2 size={20} />, title: 'Offer Review', path: '/offer-review' },
    { icon: <FileText size={20} />, title: 'CV Tailor', path: '/cv-tailor' },
    { icon: <ListChecks size={20} />, title: 'App Tracker', path: '/tracker' },
    { icon: <MessageSquare size={20} />, title: 'Interview Prep', path: '/interview-prep' }
  ]

  return (
    <section className="page-container dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="section-label">JOB SEEKER WORKSPACE</span>
          <h1>Welcome back, {user?.name}</h1>
          <p>Verify opportunities before sharing personal documents or signing contracts.</p>
        </div>

        <div className="plan-pill">
          {user?.plan === 'pass_30d' ? (
            <span>
              <Sparkles size={15} /> 30-Day Pass Active ({user.passDaysRemaining} days left)
            </span>
          ) : (
            <div>
              <strong>
                Free Tier: {user?.scansUsedThisMonth}/{user?.scanLimit} scans used
              </strong>
              <Link to="/pricing" className="upgrade-link">
                Upgrade ($19 Pass)
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* QUICK LAUNCH 5-TOOLKIT BAR */}
      <div className="quick-tools-grid">
        {quickTools.map((tool, idx) => (
          <Link key={idx} to={tool.path} className="quick-tool-card">
            <div className="feature-icon">{tool.icon}</div>
            <strong>{tool.title}</strong>
          </Link>
        ))}
      </div>

      {/* TWO-COLUMN SUMMARY: RECENT SCANS + UPCOMING FOLLOW-UPS */}
      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <h3>Recent Safety Checks</h3>
            <Link to="/scan">New Scan →</Link>
          </div>

          <div className="panel-list">
            {recentScans.map((item) => (
              <div key={item.id} className="panel-row">
                <div>
                  <span className="row-tag">{item.type}</span>
                  <strong>{item.target}</strong>
                  <small>{item.date}</small>
                </div>

                <span
                  className={`status-badge ${
                    item.verdict === 'red_flags' ? 'badge-danger' : 'badge-clear'
                  }`}
                >
                  {item.verdict === 'red_flags' ? (
                    <AlertTriangle size={14} />
                  ) : (
                    <CheckCircle size={14} />
                  )}
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <h3>Active Application Reminders</h3>
            <Link to="/tracker">Open Tracker →</Link>
          </div>

          <div className="panel-list">
            <div className="panel-row">
              <div>
                <strong>IT Assistant — Vera Beauty & Fashion College</strong>
                <small>Status: Acknowledgment received • Follow up in 5 days</small>
              </div>
              <span className="status-badge badge-neutral">Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}