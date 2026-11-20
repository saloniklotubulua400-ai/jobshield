import { useState } from 'react'

export default function TrackerPage() {
  const [apps, setApps] = useState([
    { id: 1, company: 'Example Corp', role: 'IT Assistant', status: 'Applied', followUp: 'In 5 days' }
  ])
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  function addApplication(e) {
    e.preventDefault()
    if (!company.trim() || !role.trim()) return
    setApps([
      ...apps,
      { id: Date.now(), company, role, status: 'Applied', followUp: 'In 7 days' }
    ])
    setCompany('')
    setRole('')
  }

  return (
    <section className="page-container">
      <div className="section-heading">
        <span className="section-label">STEP 4 • APPLICATION TRACKER</span>
        <h1>Track every application and follow-up.</h1>
      </div>

      <form className="inline-form" onSubmit={addApplication}>
        <input
          type="text"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role title"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit" className="primary-btn">Add Role</button>
      </form>

      <div className="tracker-list">
        {apps.map((item) => (
          <div key={item.id} className="tracker-item">
            <div>
              <strong>{item.role}</strong> — {item.company}
            </div>
            <span>{item.status} • Follow up: {item.followUp}</span>
          </div>
        ))}
      </div>
    </section>
  )
}