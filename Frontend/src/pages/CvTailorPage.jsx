import { useState } from 'react'

export default function CvTailorPage() {
  const [cvText, setCvText] = useState('')
  const [jobPost, setJobPost] = useState('')

  return (
    <section className="page-container">
      <div className="section-heading">
        <span className="section-label">STEP 3 • HONEST CV TAILORING</span>
        <h1>Tailor your CV without fabricating experience.</h1>
        <p>Highlight your real skills that match the job post clearly and accurately.</p>
      </div>

      <form className="two-col-form" onSubmit={(e) => e.preventDefault()}>
        <textarea
          rows={8}
          placeholder="Paste your current CV..."
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
        />
        <textarea
          rows={8}
          placeholder="Paste the verified job description..."
          value={jobPost}
          onChange={(e) => setJobPost(e.target.value)}
        />
        <button type="submit" className="primary-btn">
          Tailor CV & Cover Letter
        </button>
      </form>
    </section>
  )
}