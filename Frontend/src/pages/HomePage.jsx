import Hero from '../components/Hero'
import ScannerWorkspace from '../components/ScannerWorkspace'
import ToolkitOverview from '../components/ToolkitOverview'

const STEPS = [
  {
    title: 'Paste it',
    text: 'Copy the recruiter message, job post, or offer letter into the box. No account needed to run a check.',
  },
  {
    title: 'See the red flags',
    text: 'You get a risk level and a plain-English reason for every warning sign we find.',
  },
  {
    title: 'Verify before you act',
    text: 'Use the checklist to confirm the employer on their official website before you reply, pay, or sign.',
  },
]

const FAQ = [
  {
    q: 'Can JobShield tell me a job is safe?',
    a: 'No. It looks for common warning signs and tells you what it found. Finding none does not prove a job is real, so always confirm the employer yourself.',
  },
  {
    q: 'What does it check for?',
    a: 'Fees to get hired, cheque schemes, task-and-deposit jobs, early requests for ID or bank details, crypto or gift cards, chat-app-only interviews, mismatched email domains, and risky clauses in offer letters.',
  },
  {
    q: 'Is the offer letter review legal advice?',
    a: 'No. Contract rules differ by country. If something worries you, ask a lawyer or your local labour office.',
  },
  {
    q: 'Can it be wrong?',
    a: 'Yes. It can miss new scams and occasionally flag a genuine message. Treat the result as a first check, not a verdict.',
  },
]

export default function HomePage() {
  // Lets you link straight to the offer checker with /?mode=offer
  const mode =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('mode') === 'offer'
      ? 'offer'
      : 'job'

  return (
    <main className="home">
      <Hero />

      <section id="check" className="search-section" aria-labelledby="check-heading">
        <div className="section-heading">
          <span className="section-label">INSTANT CHECK</span>
          <h2 id="check-heading">Paste a suspicious message or offer letter.</h2>
          <p className="home-lede">
            Get a risk level and the exact warning signs in seconds, before you reply, pay, or share documents.
          </p>
        </div>
        <ScannerWorkspace defaultMode={mode} />
      </section>

      <section className="home-section" aria-labelledby="how-heading">
        <div className="section-heading">
          <span className="section-label">HOW IT WORKS</span>
          <h2 id="how-heading">Three steps, under a minute.</h2>
        </div>
        <ol className="home-steps">
          {STEPS.map((step, i) => (
            <li key={step.title} className="home-step">
              <span className="home-step-number" aria-hidden="true">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <ToolkitOverview />

      <section className="home-section home-trust" aria-labelledby="trust-heading">
        <div className="section-heading">
          <span className="section-label">YOUR PRIVACY</span>
          <h2 id="trust-heading">What happens to what you paste.</h2>
        </div>
        <ul className="home-trust-list">
          <li>The basic check runs on our rules and does not save your text.</li>
          <li>The optional AI second opinion is off unless you turn it on. Emails and phone numbers are masked before anything is sent.</li>
          <li>Results are an automatic first check, never a guarantee.</li>
        </ul>
      </section>

      <section className="home-section" aria-labelledby="faq-heading">
        <div className="section-heading">
          <span className="section-label">QUESTIONS</span>
          <h2 id="faq-heading">Good to know before you start.</h2>
        </div>
        <div className="home-faq">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="home-cta" aria-labelledby="cta-heading">
        <h2 id="cta-heading">Got a message you are not sure about?</h2>
        <a className="home-cta-button" href="#check">Check it now</a>
      </section>
    </main>
  )
}