import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Feedback() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.title = 'BudgetBasics - Feedback'
  }, [])

  const goodName = (v) => /^[A-Za-z\s]{2,40}$/.test(v.trim())
  const goodMail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
  const goodComment = (v) => v.trim().length >= 10 && v.trim().length <= 500

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!goodName(name)) err.name = 'Enter a valid name (letters only, 2–40 characters).'
    if (!goodMail(email)) err.email = 'Enter a valid email address.'
    if (!goodComment(comment)) err.comment = 'Comment must be 10–500 characters.'
    if (rating < 1) err.rating = 'Please select a star rating.'
    setErrors(err)
    if (Object.keys(err).length) return
    setSent(true)
  }

  return (
    <main className="page-content">
      <section className="pagehead">
        <p className="small">Feedback</p>
        <h1>Share Your Thoughts</h1>
        <p>Help us improve BudgetBasics with your honest feedback.</p>
      </section>

      <section className="box">
        {sent ? (
          <div className="thanks show" role="status">
            <div className="thanks-icon" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </div>
            <h3>Thank you!</h3>
            <p>Your feedback has been recorded for this session. We appreciate your time.</p>
            <div className="thanks-actions">
              <Link to="/learn" className="btn btn-outline">
                Keep Learning
              </Link>
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <form className="feedback" onSubmit={submit} noValidate>
            <label htmlFor="fb-name">Name</label>
            <input
              id="fb-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'bad' : ''}
            />
            <span className="err">{errors.name}</span>

            <label htmlFor="fb-email">Email</label>
            <input
              id="fb-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'bad' : ''}
            />
            <span className="err">{errors.email}</span>

            <label>Rating</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={rating >= n ? 'on' : ''}
                  onClick={() => setRating(n)}
                  aria-label={`${n} stars`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="err">{errors.rating}</span>

            <label htmlFor="fb-comment">Comment</label>
            <textarea
              id="fb-comment"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={errors.comment ? 'bad' : ''}
            />
            <span className="err">{errors.comment}</span>

            <button type="submit" className="send">
              Submit Feedback
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
