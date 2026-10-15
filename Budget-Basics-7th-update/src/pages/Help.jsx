import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { findReply } from '../utils/chatbotReply'

export default function Help() {
  const [botData, setBotData] = useState([])
  const [messages, setMessages] = useState([
    { side: 'bot', text: 'Hello. Ask me about needs, wants, saving, or budgeting rules.' },
  ])
  const [input, setInput] = useState('')
  const logRef = useRef(null)

  useEffect(() => {
    document.title = 'BudgetBasics - Help'
    fetch('/chatbot-data.json')
      .then((r) => r.json())
      .then((d) => setBotData(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages])

  const send = (text) => {
    const t = (text ?? input).trim()
    if (!t) return
    setMessages((m) => [...m, { side: 'user', text: t }])
    setInput('')
    const reply = findReply(t, botData)
    setTimeout(() => setMessages((m) => [...m, { side: 'bot', text: reply }]), 250)
  }

  return (
    <main className="page-content">
      <section className="pagehead">
        <p className="small">Help</p>
        <h1>Get Help & Connect</h1>
        <p>Ask a budgeting question, send feedback, or reach out to us.</p>
      </section>

      <section className="box" id="chatbot">
        <h2>Ask the Budget Assistant</h2>
        <p className="muted">Get quick answers to basic budgeting questions.</p>
        <div className="chatbox">
          <div className="chatlog" ref={logRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.side}`}>
                <span className="who">{msg.side === 'bot' ? 'B²' : 'You'}</span>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chips">
            <button type="button" onClick={() => send('What is a need?')}>
              What is a need?
            </button>
            <button type="button" onClick={() => send('How much should I save?')}>
              How much to save?
            </button>
            <button type="button" onClick={() => send('How do I avoid overspending?')}>
              Avoid overspending?
            </button>
            <button type="button" onClick={() => send('What is the 50-30-20 rule?')}>
              50-30-20 rule?
            </button>
          </div>
          <div className="chatform">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button type="button" onClick={() => send()}>
              Ask
            </button>
          </div>
          <p className="note">
            This assistant gives basic educational information only. Not professional financial
            advice.
          </p>
        </div>
      </section>

      <section className="box mint" id="contact">
        <h2>Contact Us</h2>
        <p className="muted">
          Have a question, a suggestion or a mistake to report? Reach out through any channel below.
        </p>
        <div className="row">
          <div className="item">
            <span className="num">1</span>
            <h3>Email</h3>
            <p>hello@budgetbasics.com</p>
          </div>
          <div className="item">
            <span className="num">2</span>
            <h3>Phone</h3>
            <a href="https://wa.me/923113268883" target="_blank" rel="noopener noreferrer">
              <p>Chat on WhatsApp</p>
            </a>
          </div>
          <div className="item">
            <span className="num">3</span>
            <h3>Social</h3>
            <a
              href="https://www.instagram.com/budgetbasic6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>@budgetbasic6</p>
            </a>
          </div>
        </div>

        <div className="contact-extra">
          <div className="contact-note">
            <h3>Before you write</h3>
            <ul>
              <li>Tell us which page or tool you were using.</li>
              <li>Describe what you expected and what happened instead.</li>
              <li>Never send bank or card details. We will never ask for them.</li>
            </ul>
          </div>
          <div className="contact-note">
            <h3>Good to know</h3>
            <p>
              BudgetBasics is a student project, so replies may take a little time. The website
              itself does not store your messages. To rate the site, use the{' '}
              <Link to="/feedback">Feedback page</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
