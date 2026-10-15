import { useState, useEffect } from 'react'
import Reveal from '../components/Reveal'
import SurviveMonth from '../components/SurviveMonth'
import RuleThreeSixNine from '../components/RuleThreeSixNine'

function fmt(n) {
  return 'Rs ' + Math.round(Number(n)).toLocaleString('en-PK')
}

function isNumber(v) {
  const s = String(v).trim().replace(/,/g, '')
  if (s === '') return false
  if (!/^\d+(\.\d+)?$/.test(s)) return false
  const n = Number(s)
  return !isNaN(n) && n >= 0
}

function safeParse(key, fallback, store = localStorage) {
  try {
    const raw = store.getItem(key)
    if (raw == null) return fallback
    const v = JSON.parse(raw)
    return v == null ? fallback : v
  } catch {
    return fallback
  }
}

const CATS = ['Food', 'Transport', 'Education', 'Entertainment', 'Shopping', 'Utilities', 'Miscellaneous']

// Older sessions used the names 'Bills' and 'Other'
const LEGACY_CATS = { Bills: 'Utilities', Other: 'Miscellaneous' }

// Expense entries are demo data: they live in sessionStorage, so they disappear
// when the tab is closed (the SRS asks for temporary, current-session data).
function loadExpenses() {
  const saved = safeParse('bb_expenses', [], sessionStorage)
  if (!Array.isArray(saved)) return []
  return saved.map((e) => ({ ...e, cat: LEGACY_CATS[e.cat] || e.cat }))
}

const CHALLENGE_TASKS = [
  {
    id: 'track',
    title: 'Track every expense',
    mistake: 'Spending without tracking',
    desc: 'Write down every single expense, no matter how small. Awareness alone often cuts impulse spending.',
  },
  {
    id: 'nospend',
    title: 'Have one no-spend day',
    mistake: 'Spending on autopilot',
    desc: 'Pick a day and spend nothing beyond fixed bills. It resets your habits and shows what you can skip.',
  },
  {
    id: 'subscriptions',
    title: 'Review your subscriptions',
    mistake: 'Ignoring recurring charges',
    desc: 'List every subscription you pay for and cancel at least one you rarely use.',
  },
  {
    id: 'emergency',
    title: 'Set aside emergency cash',
    mistake: 'No emergency buffer',
    desc: 'Move even a small, fixed amount into a separate space you will not casually spend from.',
  },
  {
    id: 'wait24',
    title: 'Use the 24-hour rule',
    mistake: 'Impulse buying',
    desc: 'Before any non-essential purchase, wait 24 hours. If you still want it, decide then.',
  },
  {
    id: 'plan',
    title: 'Plan tomorrow\u2019s spending',
    mistake: 'Confusing needs and wants',
    desc: 'Each evening, jot down what you actually need to spend on the next day before you spend it.',
  },
]

function loadChallenge() {
  return safeParse(
    'bb_challenge',
    Object.fromEntries(CHALLENGE_TASKS.map((t) => [t.id, 0]))
  )
}

export default function Practice() {
  useEffect(() => {
    document.title = 'BudgetBasics - Practice'
  }, [])

  const [tab, setTab] = useState('calculators')
  const [challenge, setChallenge] = useState(loadChallenge)

  useEffect(() => {
    localStorage.setItem('bb_challenge', JSON.stringify(challenge))
  }, [challenge])

  const bumpTask = (id) => {
    setChallenge((c) => ({ ...c, [id]: Math.min(7, (c[id] || 0) + 1) }))
  }

  const resetTask = (id) => {
    setChallenge((c) => ({ ...c, [id]: 0 }))
  }

  const setTaskDay = (id, value) => {
    const n = Math.max(0, Math.min(7, Number(value)))
    setChallenge((c) => ({ ...c, [id]: n }))
  }

  // 50-30-20
  const [income, setIncome] = useState('')
  const [incomeErr, setIncomeErr] = useState('')
  const [rule, setRule] = useState(null)

  const calcRule = () => {
    setIncomeErr('')
    setRule(null)
    if (income.trim() === '') return setIncomeErr('Please enter your monthly income.')
    if (!isNumber(income)) return setIncomeErr('Enter a valid number only (digits and one decimal point).')
    const n = Number(String(income).trim().replace(/,/g, ''))
    if (n < 10) return setIncomeErr('Income must be at least Rs. 10.')
    if (n > 100000000) return setIncomeErr('Income seems too high. Please check the amount.')
    setRule({ needs: n * 0.5, wants: n * 0.3, savings: n * 0.2 })
  }

  // Savings goal
  const [sgName, setSgName] = useState('')
  const [sgTarget, setSgTarget] = useState('')
  const [sgCurrent, setSgCurrent] = useState('')
  const [sgMonthly, setSgMonthly] = useState('')
  const [sgErr, setSgErr] = useState('')
  const [sgResult, setSgResult] = useState(null)

  const calcGoal = () => {
    setSgErr('')
    setSgResult(null)
    const name = sgName.trim()
    if (!name) return setSgErr('Please enter a goal name.')
    if (name.length < 2) return setSgErr('Goal name must be at least 2 characters.')
    if (!isNumber(sgTarget) || Number(sgTarget) <= 0) return setSgErr('Enter a valid target amount greater than 0.')
    if (!isNumber(sgCurrent)) return setSgErr('Enter a valid current savings amount (0 or more).')
    if (!isNumber(sgMonthly) || Number(sgMonthly) <= 0) return setSgErr('Enter a valid monthly contribution greater than 0.')
    const target = Number(sgTarget)
    const current = Number(sgCurrent)
    const monthly = Number(sgMonthly)
    if (current > target) return setSgErr('Current savings cannot exceed the target amount.')
    const remaining = target - current
    const months = Math.ceil(remaining / monthly)
    const pct = Math.min(100, Math.round((current / target) * 100))
    let tip = ''
    if (pct >= 100) tip = 'Congratulations! You have already reached this goal.'
    else if (months <= 3) tip = 'Great! You can reach this goal in a few months.'
    else if (months <= 12) tip = 'Stay consistent — you are on track within a year.'
    else tip = 'Consider increasing your monthly contribution to reach the goal sooner.'
    setSgResult({ name, remaining, months, pct, tip })
  }

  // Expense planner
  const [epBudget, setEpBudget] = useState('20000')
  const [epDate, setEpDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [epCat, setEpCat] = useState('Food')
  const [epDesc, setEpDesc] = useState('')
  const [epAmt, setEpAmt] = useState('')
  const [epErr, setEpErr] = useState('')
  const [expenses, setExpenses] = useState(loadExpenses)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    try {
      sessionStorage.setItem('bb_expenses', JSON.stringify(expenses))
      localStorage.removeItem('bb_expenses') // clean up data saved by older versions
    } catch {
      // storage unavailable (private mode) - the planner still works for this visit
    }
  }, [expenses])

  const resetForm = () => {
    setEditId(null)
    setEpDesc('')
    setEpAmt('')
  }

  const addExpense = () => {
    setEpErr('')
    if (!isNumber(epBudget) || Number(epBudget) < 0) return setEpErr('Enter a valid monthly budget.')
    if (!epDate) return setEpErr('Please select a date.')
    if (!epDesc.trim()) return setEpErr('Please enter a description.')
    if (epDesc.trim().length < 2) return setEpErr('Description must be at least 2 characters.')
    if (!isNumber(epAmt) || Number(epAmt) <= 0) return setEpErr('Enter a valid amount greater than 0.')

    if (editId) {
      setExpenses((list) =>
        list.map((e) =>
          e.id === editId ? { ...e, date: epDate, cat: epCat, desc: epDesc.trim(), amt: Number(epAmt) } : e
        )
      )
    } else {
      const item = {
        id: Date.now(),
        date: epDate,
        cat: epCat,
        desc: epDesc.trim(),
        amt: Number(epAmt),
      }
      setExpenses((list) => [item, ...list])
    }
    resetForm()
  }

  const startEdit = (item) => {
    setEditId(item.id)
    setEpDate(item.date)
    setEpCat(item.cat)
    setEpDesc(item.desc)
    setEpAmt(String(item.amt))
    setEpErr('')
  }

  const removeExpense = (id) => {
    setExpenses((list) => list.filter((e) => e.id !== id))
    if (editId === id) resetForm()
  }

  const clearExpenses = () => {
    if (window.confirm('Clear all expenses?')) {
      setExpenses([])
      resetForm()
    }
  }

  const totalSpent = expenses.reduce((s, e) => s + e.amt, 0)
  const budget = isNumber(epBudget) ? Number(epBudget) : 0
  const remaining = budget - totalSpent
  const pctUsed = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0

  return (
    <main className="page-content">
      <section className="pp-section">
        <div className="section-header">
          <span className="eyebrow">Practice</span>
          <h2>Hands-on Budgeting Tools</h2>
          <p>Use these calculators to plan your money, set goals, and track spending.</p>
        </div>

        <div className="pp-tabs" role="tablist" aria-label="Practice sections">
          <button
            type="button"
            role="tab"
            id="tab-calculators"
            aria-selected={tab === 'calculators'}
            aria-controls="panel-calculators"
            className={`pp-tab${tab === 'calculators' ? ' active' : ''}`}
            onClick={() => setTab('calculators')}
          >
            Calculators
          </button>
          <button
            type="button"
            role="tab"
            id="tab-challenge"
            aria-selected={tab === 'challenge'}
            aria-controls="panel-challenge"
            className={`pp-tab${tab === 'challenge' ? ' active' : ''}`}
            onClick={() => setTab('challenge')}
          >
            7-Day Money Challenge
          </button>
          <button
            type="button"
            role="tab"
            id="tab-survive"
            aria-selected={tab === 'survive'}
            aria-controls="panel-survive"
            className={`pp-tab${tab === 'survive' ? ' active' : ''}`}
            onClick={() => setTab('survive')}
          >
            Survive the Month
          </button>
          <button
            type="button"
            role="tab"
            id="tab-369"
            aria-selected={tab === '369'}
            aria-controls="panel-369"
            className={`pp-tab${tab === '369' ? ' active' : ''}`}
            onClick={() => setTab('369')}
          >
            3-6-9 Rule
          </button>
        </div>

        {tab === 'calculators' && (
        <div
          className="pp-grid"
          id="panel-calculators"
          role="tabpanel"
          aria-labelledby="tab-calculators"
        >
          {/* 50-30-20 */}
          <Reveal as="div" className="pp-card" delay={0}>
            <div className="pp-card-head">
              <div className="pp-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div>
                <h3>50-30-20 Calculator</h3>
                <span>Split income into needs, wants & savings</span>
              </div>
            </div>
            <label htmlFor="pp-income">Monthly income (Rs)</label>
            <input
              type="number"
              id="pp-income"
              placeholder="e.g. 50000"
              min="0"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className={incomeErr ? 'bad' : ''}
            />
            <button className="pp-btn" type="button" onClick={calcRule}>
              Calculate Split
            </button>
            {incomeErr && <div className="pp-error">{incomeErr}</div>}
            {rule && (
              <div className="pp-result show">
                <div className="pp-row">
                  Needs (50%) <b>{fmt(rule.needs)}</b>
                </div>
                <div className="pp-row">
                  Wants (30%) <b>{fmt(rule.wants)}</b>
                </div>
                <div className="pp-row">
                  Savings (20%) <b>{fmt(rule.savings)}</b>
                </div>
                <div className="pp-bar">
                  <div className="needs" style={{ width: '50%' }} />
                  <div className="wants" style={{ width: '30%' }} />
                  <div className="savings" style={{ width: '20%' }} />
                </div>
                <div className="pp-legend">
                  <span>
                    <i className="dot" style={{ background: '#FFFFFF' }} />
                    Needs
                  </span>
                  <span>
                    <i className="dot" style={{ background: '#EE7B33' }} />
                    Wants
                  </span>
                  <span>
                    <i className="dot" style={{ background: '#8FD9AE' }} />
                    Savings
                  </span>
                </div>
                <div className="pp-note">
                  <span>
                    This is only a general budgeting guideline — feel free to adjust the percentages to
                    fit your own situation.
                  </span>
                </div>
              </div>
            )}
          </Reveal>

          {/* Savings Goal */}
          <Reveal as="div" className="pp-card" delay={80}>
            <div className="pp-card-head">
              <div className="pp-icon orange">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </div>
              <div>
                <h3>Savings Goal Planner</h3>
                <span>Plan how long it takes to reach a goal</span>
              </div>
            </div>
            <label htmlFor="sg-name">Goal name</label>
            <input
              type="text"
              id="sg-name"
              placeholder="e.g. New Laptop"
              value={sgName}
              onChange={(e) => setSgName(e.target.value)}
            />
            <div className="grid2">
              <div>
                <label htmlFor="sg-target">Target amount</label>
                <input
                  type="number"
                  id="sg-target"
                  min="0"
                  value={sgTarget}
                  onChange={(e) => setSgTarget(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="sg-current">Current savings</label>
                <input
                  type="number"
                  id="sg-current"
                  min="0"
                  value={sgCurrent}
                  onChange={(e) => setSgCurrent(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="sg-monthly">Monthly contribution</label>
            <input
              type="number"
              id="sg-monthly"
              min="0"
              value={sgMonthly}
              onChange={(e) => setSgMonthly(e.target.value)}
            />
            <button className="pp-btn orange" type="button" onClick={calcGoal}>
              Calculate Goal
            </button>
            {sgErr && <div className="pp-error">{sgErr}</div>}
            {sgResult && (
              <div className="pp-result show">
                <div className="pp-row">
                  Goal <b>{sgResult.name}</b>
                </div>
                <div className="pp-row">
                  Remaining amount <b>{fmt(sgResult.remaining)}</b>
                </div>
                <div className="pp-row">
                  Months required <b>{sgResult.months}</b>
                </div>
                <div className="pp-row">
                  Progress <b>{sgResult.pct}%</b>
                </div>
                <div className="pp-progress">
                  <div className="savings" style={{ width: `${sgResult.pct}%` }} />
                </div>
                <div className="pp-tip">{sgResult.tip}</div>
              </div>
            )}
          </Reveal>

          {/* Expense Planner */}
          <Reveal as="div" className="pp-card" delay={160}>
            <div className="pp-card-head">
              <div className="pp-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div>
                <h3>Expense Planner</h3>
                <span>Track spending against your budget</span>
              </div>
            </div>
            <label htmlFor="ep-budget">Monthly budget (Rs)</label>
            <input
              type="number"
              id="ep-budget"
              min="0"
              placeholder="e.g. 20000"
              value={epBudget}
              onChange={(e) => setEpBudget(e.target.value)}
            />
            <div className="grid2">
              <div>
                <label htmlFor="ep-date">Date</label>
                <input
                  type="date"
                  id="ep-date"
                  value={epDate}
                  onChange={(e) => setEpDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="ep-cat">Category</label>
                <select id="ep-cat" value={epCat} onChange={(e) => setEpCat(e.target.value)}>
                  {CATS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid2">
              <div>
                <label htmlFor="ep-desc">Description</label>
                <input
                  type="text"
                  id="ep-desc"
                  placeholder="e.g. Bus pass"
                  value={epDesc}
                  onChange={(e) => setEpDesc(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="ep-amt">Amount</label>
                <input
                  type="number"
                  id="ep-amt"
                  min="0"
                  value={epAmt}
                  onChange={(e) => setEpAmt(e.target.value)}
                />
              </div>
            </div>
            <div className="pp-inline-btns">
              <button className="pp-btn" type="button" onClick={addExpense}>
                {editId ? 'Update Expense' : 'Add Expense'}
              </button>
              {editId && (
                <button className="pp-btn outline" type="button" onClick={resetForm}>
                  Cancel Edit
                </button>
              )}
            </div>
            {epErr && <div className="pp-error">{epErr}</div>}

            <div className="pp-summary">
              <span>
                Total spent: <b>{fmt(totalSpent)}</b>
              </span>
              <span>
                Remaining: <b className={remaining < 0 ? 'over' : ''}>{fmt(remaining)}</b>
              </span>
              <span>
                Used: <b>{pctUsed}%</b>
              </span>
            </div>

            {expenses.length > 0 && (
              <>
                <table id="ep-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((e) => (
                      <tr key={e.id} className={editId === e.id ? 'editing' : ''}>
                        <td>{e.date}</td>
                        <td>{e.cat}</td>
                        <td>{e.desc}</td>
                        <td>{fmt(e.amt)}</td>
                        <td className="actions">
                          <button type="button" className="pp-edit" onClick={() => startEdit(e)} aria-label={`Edit ${e.desc}`}>
                            Edit
                          </button>
                          <button type="button" className="pp-del" onClick={() => removeExpense(e.id)} aria-label={`Remove ${e.desc}`}>
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="pp-btn outline" onClick={clearExpenses}>
                  Clear All
                </button>
              </>
            )}
          </Reveal>
        </div>
        )}

        {tab === 'challenge' && (
          <div
            className="challenge-panel"
            id="panel-challenge"
            role="tabpanel"
            aria-labelledby="tab-challenge"
          >
            <div className="challenge-intro">
              <h3>Fix 6 common money mistakes in a week</h3>
              <p>
                Each card is one daily habit. Mark a day done with <b>+1</b>, drag the range to
                jump to a specific day, or hit <b>Reset</b> to start the week over.
              </p>
            </div>
            <div className="challenge-grid">
              {CHALLENGE_TASKS.map((task, i) => {
                const days = challenge[task.id] || 0
                const done = days >= 7
                return (
                  <Reveal
                    as="div"
                    key={task.id}
                    delay={(i % 3) * 80}
                    className={`challenge-card${done ? ' complete' : ''}`}
                  >
                    <div className="challenge-card-top">
                      <span className="challenge-fixes">Fixes: {task.mistake}</span>
                      {done && <span className="challenge-badge">Week complete</span>}
                    </div>
                    <h4>{task.title}</h4>
                    <p>{task.desc}</p>

                    <div className="challenge-days" aria-hidden="true">
                      {Array.from({ length: 7 }, (_, i) => (
                        <span key={i} className={i < days ? 'day on' : 'day'} />
                      ))}
                    </div>

                    <label htmlFor={`range-${task.id}`} className="challenge-range-label">
                      Day {days} of 7
                    </label>
                    <input
                      id={`range-${task.id}`}
                      type="range"
                      min="0"
                      max="7"
                      step="1"
                      value={days}
                      onChange={(e) => setTaskDay(task.id, e.target.value)}
                      aria-valuetext={`${days} of 7 days completed`}
                    />

                    <div className="challenge-actions">
                      <button
                        type="button"
                        className="pp-btn small"
                        onClick={() => bumpTask(task.id)}
                        disabled={done}
                        aria-label={`Mark another day done for ${task.title}`}
                      >
                        <b className="plus-one">+1</b> Day
                      </button>
                      <button
                        type="button"
                        className="pp-btn outline small"
                        onClick={() => resetTask(task.id)}
                        aria-label={`Reset progress for ${task.title}`}
                      >
                        Reset
                      </button>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        )}

        {tab === 'survive' && (
          <div
            className="survive-panel"
            id="panel-survive"
            role="tabpanel"
            aria-labelledby="tab-survive"
          >
            <div className="challenge-intro">
              <h3>Survive the Month</h3>
              <p>
                You start with Rs. 15,000 for 30 days. Each day brings a real-life choice —
                food, transport, shopping, emergencies, or friends. Choose wisely and see if
                your money lasts the whole month.
              </p>
            </div>
            <SurviveMonth />
          </div>
        )}

        {tab === '369' && (
          <div id="panel-369" role="tabpanel" aria-labelledby="tab-369">
            <RuleThreeSixNine />
          </div>
        )}
      </section>
    </main>
  )
}
