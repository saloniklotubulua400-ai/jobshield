import ScannerWorkspace from '../components/ScannerWorkspace'

export default function OfferReviewPage() {
  return (
    <section className="page-container">
      <div className="section-heading">
        <span className="section-label">STEP 2 • CONTRACT & OFFER AUDIT</span>
        <h1>Review your offer letter before you sign.</h1>
        <p>
          Spot unpaid trials, equipment purchase schemes, unclear compensation, and restrictive clauses in plain language.
        </p>
      </div>
      <ScannerWorkspace defaultMode="offer" />
    </section>
  )
}