import { scrubPII } from '../utils/piiScrubber'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function analyzeSubmission({ mode, content, anonymize }) {
  const payloadText = anonymize ? scrubPII(content) : content
  const endpoint = mode === 'offer' ? '/api/scan/offer' : '/api/scan/job'

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: payloadText })
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Scan failed. Confirm the backend server is running.')
  }

  return response.json()
}