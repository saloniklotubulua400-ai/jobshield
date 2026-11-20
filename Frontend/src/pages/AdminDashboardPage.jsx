import { useState } from 'react'
import {
  ShieldAlert,
  Users,
  CreditCard,
  Activity,
  Ban,
  CheckCircle2
} from 'lucide-react'

export default function AdminDashboardPage() {
  const [recentLogs, setRecentLogs] = useState([
    {
      id: 'log_901',
      userEmail: 'alex@example.com',
      endpoint: '/api/scan/job',
      domainChecked: 'quick-hire-tasks.xyz',
      verdict: 'Red Flags Found',
      latencyMs: 640,
      flagged: false
    },
    {
      id: 'log_902',
      userEmail: 'brian.k@example.com',
      endpoint: '/api/scan/offer',
      domainChecked: 'verabeautycollege.com',
      verdict: 'No Common Red Flags',
      latencyMs: 510,
      flagged: false
    },
    {
      id: 'log_903',
      userEmail: 'spammer99@temp-mail.org',
      endpoint: '/api/scan/job',
      domainChecked: 'n/a',
      verdict: 'Rate Limit Triggered',
      latencyMs: 42,
      flagged: true
    }
  ])

  function toggleFlag(id) {
    setRecentLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, flagged: !log.flagged } : log))
    )
  }

  return (
    <section className="page-container dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="section-label">ADMIN OPERATIONS</span>
          <h1>JobShield Control Center</h1>
          <p>Monitor scan accuracy, 30-day pass conversions, API latency, and abuse limits.</p>
        </div>
        <span className="status-badge badge-clear">
          <Activity size={15} /> Backend API: Online (Port 5000)
        </span>
      </div>

      {/* KPI METRICS */}
      <div className="admin-kpi-grid">
        <div className="kpi-card">
          <div className="feature-icon"><Users size={22} /></div>
          <span>Registered Seekers</span>
          <h2>1,248</h2>
          <small>+64 this week</small>
        </div>

        <div className="kpi-card">
          <div className="feature-icon"><ShieldAlert size={22} /></div>
          <span>Scans Run (30d)</span>
          <h2>4,892</h2>
          <small>38% flagged high-risk</small>
        </div>

        <div className="kpi-card">
          <div className="feature-icon"><CreditCard size={22} /></div>
          <span>Active 30-Day Passes</span>
          <h2>142</h2>
          <small>$2,698 gross (30d)</small>
        </div>

        <div className="kpi-card">
          <div className="feature-icon"><Activity size={22} /></div>
          <span>Avg Scan Latency</span>
          <h2>580 ms</h2>
          <small>DNS + Rules + AI</small>
        </div>
      </div>

      {/* SCAN AUDIT & MODERATION TABLE */}
      <div className="dashboard-panel">
        <div className="panel-header">
          <h3>Live Scan & Domain Audit Stream (Metadata Only — No Raw PII)</h3>
        </div>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Endpoint</th>
                <th>Extracted Domain</th>
                <th>Verdict</th>
                <th>Latency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.userEmail}</td>
                  <td><code>{log.endpoint}</code></td>
                  <td>{log.domainChecked}</td>
                  <td>{log.verdict}</td>
                  <td>{log.latencyMs} ms</td>
                  <td>
                    <button
                      type="button"
                      className={`table-btn ${log.flagged ? 'btn-unblock' : 'btn-block'}`}
                      onClick={() => toggleFlag(log.id)}
                    >
                      {log.flagged ? (
                        <>
                          <CheckCircle2 size={14} /> Unblock
                        </>
                      ) : (
                        <>
                          <Ban size={14} /> Suspend
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}