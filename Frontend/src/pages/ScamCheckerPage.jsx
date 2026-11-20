import ScannerWorkspace from '../components/ScannerWorkspace'

export default function ScamCheckerPage() {
  return (
    <section className="page-container">
      <div className="section-heading">
        <span className="section-label">STEP 1 • SCAM DETECTOR</span>
        <h1>Is this job or recruiter message real?</h1>
        <p>
          Paste the email, message, or job listing below to check for common fraud patterns and domain mismatches.
        </p>
      </div>
      <ScannerWorkspace defaultMode="job" />
    </section>
  )
}