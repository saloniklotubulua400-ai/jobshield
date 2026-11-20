import { useState } from 'react'
import { analyzeSubmission } from '../services/scanService'
import VerdictCard from './VerdictCard'

export default function ScannerWorkspace({ defaultMode = 'job' }) {
  const [scanMode, setScanMode] = useState(defaultMode)
  const [inputText, setInputText] = useState('')
  const [anonymize, setAnonymize] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    if (!inputText.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await analyzeSubmission({
        mode: scanMode,
        content: inputText,
        anonymize
      })
      setResult(data)
    } catch (err) {
      setError(err.message || 'Unable to complete scan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="scanner-workspace">
      <div className="mode-toggle">
        <button
          type="button"
          className={scanMode === 'job' ? 'active' : ''}
          onClick={() => {
            setScanMode('job')
            setResult(null)
          }}
        >
          1. Is This Job Real?
        </button>
        <button
          type="button"
          className={scanMode === 'offer' ? 'active' : ''}
          onClick={() => {
            setScanMode('offer')
            setResult(null)
          }}
        >
          2. Offer Letter Review
        </button>
      </div>

      <form onSubmit={handleSubmit} className="scanner-form">
        <textarea
          rows={7}
          placeholder={
            scanMode === 'job'
              ? 'Paste the recruiter email, WhatsApp/Telegram message, or job post...'
              : 'Paste the offer letter, unpaid trial terms, or employment contract...'
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="scanner-controls">
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={anonymize}
              onChange={(e) => setAnonymize(e.target.checked)}
            />
            Strip emails & phone numbers in browser before sending
          </label>

          <button type="submit" className="primary-btn" disabled={loading || !inputText.trim()}>
            {loading ? 'Analyzing...' : 'Run Safety Check'}
          </button>
        </div>
      </form>

      {error && <div className="error-banner">{error}</div>}
      {result && <VerdictCard result={result} />}
    </div>
  )
}