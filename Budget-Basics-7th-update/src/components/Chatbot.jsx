import { useState, useEffect, useRef } from 'react'
import { findReply } from '../utils/chatbotReply'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [, setBotData] = useState([])
  const [messages, setMessages] = useState([
    {
      side: 'bot',
      text: 'Hello! Ask me about needs, wants, saving, or budgeting rules.',
    },
  ])
  const [input, setInput] = useState('')
  const logRef = useRef(null)

  const dataPromise = useRef(null)

  // Load the answers lazily - no need to download them until someone opens the chat.
  const loadData = () => {
    if (!dataPromise.current) {
      dataPromise.current = fetch('/chatbot-data.json')
        .then((r) => r.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : []
          setBotData(list)
          return list
        })
        .catch(() => [])
    }
    return dataPromise.current
  }

  useEffect(() => {
    if (open) loadData()
  }, [open])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [messages, open])

  const send = (text) => {
    const t = (text ?? input).trim()
    if (!t) return
    setMessages((m) => [...m, { side: 'user', text: t }])
    setInput('')
    // wait for the answers to be available (instant after the first load)
    Promise.all([loadData(), new Promise((r) => setTimeout(r, 300))]).then(([data]) => {
      setMessages((m) => [...m, { side: 'bot', text: findReply(t, data) }])
    })
  }

  const askChip = (q) => {
    setOpen(true)
    send(q)
  }

  return (
    <>
      <div className={`ai-popup${open ? ' open' : ''}`} id="aiPopup" aria-hidden={!open}>
        <div className="ai-popup-header">
          <span className="ai-popup-title">Budget Assistant</span>
          <button
            className="ai-popup-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            &times;
          </button>
        </div>

        <div className="ai-popup-log" id="aiChatlog" ref={logRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`ai-msg ${msg.side}`}>
              <span className="ai-who">{msg.side === 'bot' ? 'B²' : 'You'}</span>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="ai-popup-chips">
          <button type="button" onClick={() => askChip('What is a need?')}>
            What is a need?
          </button>
          <button type="button" onClick={() => askChip('How much should I save?')}>
            How much to save?
          </button>
          <button type="button" onClick={() => askChip('How do I avoid overspending?')}>
            Avoid overspending?
          </button>
          <button type="button" onClick={() => askChip('What is the 50-30-20 rule?')}>
            50-30-20 rule?
          </button>
        </div>

        <div className="ai-popup-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') send()
            }}
          />
          <button type="button" onClick={() => send()}>
            Ask
          </button>
        </div>
        <p className="ai-popup-note">
          Basic educational information only. Not professional financial advice.
        </p>
      </div>

      <button
        className="help-float"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI chat"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </button>
    </>
  )
}
