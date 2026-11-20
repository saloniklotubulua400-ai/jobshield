import { Link } from 'react-router-dom'
import { ShieldAlert, FileCheck2, FileText, ListChecks, MessageSquare } from 'lucide-react'

export default function ToolkitOverview() {
  const tools = [
    {
      icon: <ShieldAlert />,
      title: '1. Is This Job Real?',
      description: 'Detect advance fees, fake cheques, chat-only interviews, and mismatched domains.',
      path: '/scan'
    },
    {
      icon: <FileCheck2 />,
      title: '2. Offer Letter Review',
      description: 'Flag unpaid trials, equipment fees, vague pay terms, and unusual non-competes.',
      path: '/offer-review'
    },
    {
      icon: <FileText />,
      title: '3. Honest CV Tailoring',
      description: 'Align your CV and cover letter to a verified post without inventing experience.',
      path: '/cv-tailor'
    },
    {
      icon: <ListChecks />,
      title: '4. Application Tracker',
      description: 'Log your applications and get timely reminders on when to follow up.',
      path: '/tracker'
    },
    {
      icon: <MessageSquare />,
      title: '5. Interview Prep',
      description: 'Practice role-specific questions and get structured feedback on your answers.',
      path: '/interview-prep'
    }
  ]

  return (
    <section className="features-section">
      <div className="section-heading">
        <span className="section-label">THE FULL PATH</span>
        <h2>Five tools. One login.</h2>
        <p>Start with safety, then manage your entire search in one place.</p>
      </div>

      <div className="features-grid">
        {tools.map((tool, index) => (
          <Link to={tool.path} className="feature-card" key={index}>
            <div className="feature-icon">{tool.icon}</div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}