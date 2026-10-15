import { useState, useEffect } from 'react'
import Reveal from './Reveal'

const STORE = 'bb_369'
const EXAMPLE = 'I spend money wisely and only on what I need.'

const ROUNDS = [
  { key: 'r3', time: '3 PM', count: 3 },
  { key: 'r6', time: '6 PM', count: 6 },
  { key: 'r9', time: '9 PM', count: 9 },
]

const STEPS = [
  { number: '3', when: 'In the morning', text: 'Write your focus, for example "I am an active person who exercises daily".' },
  { number: '6', when: 'In the afternoon', text: 'Write it again to stay accountable during a busy day.' },
  { number: '9', when: 'At night', text: 'Write it once more before bed so the goal stays with you.' },
]

const today = () => new Date().toLocaleDateString('en-CA')
const emptyDay = () => ({ day: today(), lines: { r3: [], r6: [], r9: [] } })
const emptyDrafts = () => ({ r3: '', r6: '', r9: '' })

function loadDay() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE))
    if (saved && saved.day === today() && saved.lines) return saved
  } catch {
    return emptyDay()
  }
  return emptyDay()
}

export default function RuleThreeSixNine() {
  const [data, setData] = useState(loadDay)
  const [drafts, setDrafts] = useState(emptyDrafts)
  const [problem, setProblem] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(data))
    } catch {
      return
    }
  }, [data])

  const written = (round) => data.lines[round.key].length
  const finished = (round) => written(round) >= round.count
  const isOpen = (index) => index === 0 || finished(ROUNDS[index - 1])
  const allDone = ROUNDS.every(finished)
  const totalWritten = ROUNDS.reduce((sum, r) => sum + written(r), 0)
  const totalNeeded = ROUNDS.reduce((sum, r) => sum + r.count, 0)

  const writeLine = (round, event) => {
    event.preventDefault()
    const text = drafts[round.key].trim()
    if (text.length < 5) {
      setProblem(round.key)
      return
    }
    setProblem('')
    setData((d) => ({ ...d, lines: { ...d.lines, [round.key]: [...d.lines[round.key], text] } }))
    setDrafts((d) => ({ ...d, [round.key]: '' }))
  }

  const startOver = () => {
    setData(emptyDay())
    setDrafts(emptyDrafts())
    setProblem('')
  }

  return (
    <div className="r369">
      <div className="r369-intro">
        <h3>The 3-6-9 Rule for spending habits</h3>
        <p>
          Inspired by Nikola Tesla, who is said to have been fascinated by the numbers 3, 6 and 9.
          The idea is gentle: write one goal down in three rounds through the day so it stays in
          your mind.
        </p>
      </div>

      <h4 className="r369-subtitle">How the 3-6-9 rule applies to habits</h4>
      <p className="r369-lead">
        You do not perform the habit again and again. You write your goal down so your brain keeps
        thinking about it.
      </p>
      <div className="r369-steps">
        {STEPS.map((step) => (
          <div className="r369-step" key={step.number}>
            <span className="r369-number">{step.number}</span>
            <h5>{step.when}</h5>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
      <p className="r369-caution">
        This works as a mental reminder. Writing alone will not build a habit unless you also take
        real action.
      </p>

      <div className="r369-activity">
        <h4 className="r369-subtitle">Your activity: write a goal about spending less</h4>
        <p className="r369-lead">
          Today we follow the clock: 3 times at 3 PM, 6 times at 6 PM and 9 times at 9 PM. Use your
          own words each time, for example: <em>{EXAMPLE}</em>
        </p>

        <div className="r369-rounds">
          {ROUNDS.map((round, index) => {
            const count = Math.min(written(round), round.count)
            const open = isOpen(index)
            const done = finished(round)
            const inputId = `r369-input-${round.key}`
            return (
              <Reveal
                as="div"
                key={round.key}
                delay={index * 80}
                className={`r369-card${done ? ' done' : ''}${open ? '' : ' waiting'}`}
              >
                <div className="r369-head">
                  <span className="r369-big">{round.count}</span>
                  <span className="r369-time">{round.time}</span>
                </div>
                <h5>Write it {round.count} times</h5>
                <div className="r369-dots" aria-hidden="true">
                  {Array.from({ length: round.count }, (_, n) => (
                    <span key={n} className={n < count ? 'on' : ''} />
                  ))}
                </div>
                <p className="r369-count">
                  {count} of {round.count} written
                </p>

                {data.lines[round.key].length > 0 && (
                  <ol className="r369-lines">
                    {data.lines[round.key].map((line, n) => (
                      <li key={n}>{line}</li>
                    ))}
                  </ol>
                )}

                {done && <p className="r369-finish">Round complete</p>}

                {!done && open && (
                  <form className="r369-form" onSubmit={(e) => writeLine(round, e)} noValidate>
                    <label htmlFor={inputId}>Write your goal</label>
                    <input
                      id={inputId}
                      type="text"
                      maxLength={100}
                      autoComplete="off"
                      placeholder={EXAMPLE}
                      value={drafts[round.key]}
                      onChange={(e) => setDrafts((d) => ({ ...d, [round.key]: e.target.value }))}
                      aria-invalid={problem === round.key}
                      aria-describedby={problem === round.key ? `${inputId}-error` : undefined}
                    />
                    {problem === round.key && (
                      <p className="r369-error" id={`${inputId}-error`} role="alert">
                        Write your goal in a few words first.
                      </p>
                    )}
                    <button type="submit" className="pp-btn small">
                      Write it down
                    </button>
                  </form>
                )}

                {!open && (
                  <p className="r369-wait">Finish the {ROUNDS[index - 1].time} round first.</p>
                )}
              </Reveal>
            )
          })}
        </div>

        <p className="r369-status" role="status">
          {allDone
            ? 'All three rounds are done. Now make it real: choose one small purchase to skip today.'
            : `${totalWritten} of ${totalNeeded} lines written today.`}
        </p>

        {totalWritten > 0 && (
          <div className="r369-actions">
            <button type="button" className="pp-btn outline small" onClick={startOver}>
              Start over
            </button>
          </div>
        )}

        <p className="r369-note">A mindset exercise for learning. It is not financial advice.</p>
      </div>
    </div>
  )
}
