import { useState } from 'react'

export default function InterviewPrepPage() {
  const [jobDescription, setJobDescription] = useState('')

  return (
    <section className="page-container">
      <div className="section-heading">
        <span className="section-label">STEP 5 • INTERVIEW PREP</span>
        <h1>Practice likely questions for your target role.</h1>
        <p>Paste the job description to generate role-specific interview questions and answer feedback.</p>
      </div>

      <form className="scanner-form" onSubmit={(e) => e.preventDefault()}>
        <textarea
          rows={6}
          placeholder="Paste the job post here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button type="submit" className="primary-btn">Generate Practice Questions</button>
      </form>
    </section>
  )
}