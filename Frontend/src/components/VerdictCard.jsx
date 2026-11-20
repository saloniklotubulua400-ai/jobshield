import { AlertTriangle, CheckCircle, HelpCircle, ExternalLink } from 'lucide-react'

export default function VerdictCard({ result }) {
  // Expected shape from backend:
  // { verdict: 'red_flags' | 'needs_verification' | 'no_red_flags', summary: string, reasons: string[], verifySteps: string[] }
  const verdict = result?.verdict || 'needs_verification'

  const badgeConfig = {
    red_flags: {
      label: 'Red Flags Found',
      icon: <AlertTriangle size={22} />,
      className: 'verdict-danger'
    },
    needs_verification: {
      label: 'Needs Verification',
      icon: <HelpCircle size={22} />,
      className: 'verdict-warning'
    },
    no_red_flags: {
      label: 'No Common Red Flags Found',
      icon: <CheckCircle size={22} />,
      className: 'verdict-clear'
    }
  }

  const current = badgeConfig[verdict] || badgeConfig.needs_verification

  return (
    <div className={`verdict-card ${current.className}`}>
      <div className="verdict-header">
        {current.icon}
        <h3>{current.label}</h3>
      </div>

      {result.summary && <p className="verdict-summary">{result.summary}</p>}

      {result.reasons?.length > 0 && (
        <div className="verdict-section">
          <h4>Findings</h4>
          <ul>
            {result.reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {result.verifySteps?.length > 0 && (
        <div className="verdict-section">
          <h4>Recommended Verification Steps</h4>
          <ul>
            {result.verifySteps.map((step, idx) => (
              <li key={idx}>
                <ExternalLink size={14} /> {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="verdict-disclaimer">
        Note: Automated checks detect known scam patterns and contract red flags, not guarantees.
        Always verify the employer via their official website before sharing sensitive documents.
      </p>
    </div>
  )
}