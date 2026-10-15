import { useState, useEffect } from 'react'
import Reveal from '../components/Reveal'

const STUDENT_SAMPLE = [
  { label: 'Rent / Hostel', amt: 8000, color: '#1e6b3d' },
  { label: 'Food', amt: 5000, color: '#ee7b33' },
  { label: 'Transport', amt: 2000, color: '#8fd9ae' },
  { label: 'Savings', amt: 3000, color: '#155230' },
  { label: 'Wants', amt: 2000, color: '#f5b26b' },
]
const STUDENT_TOTAL = STUDENT_SAMPLE.reduce((s, x) => s + x.amt, 0)

const CLASSIFY_ITEMS = [
  {
    item: 'Monthly rent / hostel fee',
    answer: 'need',
    why: 'You need a safe place to live, and missing rent causes serious problems.',
  },
  {
    item: 'Latest video game release',
    answer: 'want',
    why: 'Games are entertainment — your day-to-day life continues fine without the newest one.',
  },
  {
    item: 'Grocery essentials',
    answer: 'need',
    why: 'Food is required every day, so it comes before any optional spending.',
  },
  {
    item: 'Branded sneakers',
    answer: 'want',
    why: 'Shoes themselves are a need, but the brand is optional — plain shoes do the same job.',
  },
  {
    item: 'Bus fare to college',
    answer: 'need',
    why: 'It gets you to classes or work, which you cannot skip.',
  },
  {
    item: 'Streaming subscription',
    answer: 'want',
    why: 'It is entertainment you can pause or cancel at any time without real harm.',
  },
  {
    item: 'Textbooks for class',
    answer: 'need',
    why: 'They are required for your studies and exams (borrowing or buying used still counts as a need).',
  },
  {
    item: 'Eating out with friends',
    answer: 'want',
    why: 'Meals at home cover the need; eating out is the optional extra.',
  },
]

const MISTAKES = [
  {
    q: 'Impulse buying',
    scenario:
      'Hamza sees a late-night flash sale on sneakers while scrolling and buys them for Rs 6,000 — almost a third of his monthly allowance.',
    a: 'Wait 24 hours before any non-essential purchase. If you still want it tomorrow and it fits your Wants budget, buy it; most impulses fade.',
  },
  {
    q: 'Ignoring small expenses',
    scenario:
      'Ayesha buys a Rs 250 snack and drink on campus every day without noticing. By the end of the month that is Rs 7,500 — more than her transport budget.',
    a: 'Write down every small purchase for one week, then set a weekly limit for snacks and extras so they stop hiding in the background.',
  },
  {
    q: 'Late payments',
    scenario:
      'Bilal forgets to pay his internet bill on time. He is charged a late fee and the connection is cut off just before an online exam.',
    a: 'Put due dates in a phone reminder and pay a few days early. Treat bills as fixed expenses and pay them before spending on wants.',
  },
  {
    q: 'Unused subscriptions',
    scenario:
      'Sara starts a free trial of a streaming app, forgets to cancel and keeps paying Rs 1,000 every month for five months.',
    a: 'List all recurring charges every quarter and cancel what you rarely use. Set a reminder before any free trial ends.',
  },
  {
    q: 'Spending without a plan',
    scenario:
      'Usman receives his Rs 20,000 allowance and spends freely. By the 20th he has Rs 800 left and has to borrow from friends.',
    a: 'Split your income with the 50-30-20 rule on day one and write down every expense for a week. Awareness alone often cuts spending.',
  },
  {
    q: 'No emergency buffer',
    scenario:
      'Hina’s phone screen breaks in the middle of the semester. With no savings she has to ask family to cover the Rs 8,000 repair.',
    a: 'Aim for even a small emergency fund (1–2 months of essentials) before big goals.',
  },
  {
    q: 'Confusing needs and wants',
    scenario:
      'Danish calls new wireless earbuds a “need for studying”, then runs short of money for his monthly bus pass.',
    a: 'Ask: “Would my life stop if I skipped this?” If no, it is likely a want.',
  },
]

const QUIZ = [
  {
    q: 'In the 50-30-20 rule, what does 20% go toward?',
    options: ['Needs', 'Wants', 'Savings', 'Entertainment'],
    answer: 2,
  },
  {
    q: 'Which is typically a NEED?',
    options: ['New headphones', 'Monthly rent', 'Movie tickets', 'Designer shoes'],
    answer: 1,
  },
  {
    q: 'Best first step when starting a budget?',
    options: [
      'Buy expensive tools',
      'Track income and expenses',
      'Ignore small purchases',
      'Take a loan',
    ],
    answer: 1,
  },
]

function randomIndex(exclude) {
  let i = Math.floor(Math.random() * CLASSIFY_ITEMS.length)
  if (CLASSIFY_ITEMS.length > 1) {
    while (i === exclude) i = Math.floor(Math.random() * CLASSIFY_ITEMS.length)
  }
  return i
}

export default function Learn() {
  const [openMistake, setOpenMistake] = useState(null)
  const [quizResults, setQuizResults] = useState({})
  const [classifyIndex, setClassifyIndex] = useState(0)
  const [classifyResult, setClassifyResult] = useState(null)
  const [classifyScore, setClassifyScore] = useState({ correct: 0, total: 0 })

  useEffect(() => {
    document.title = 'BudgetBasics - Learn'
  }, [])

  const checkAnswer = (qi, oi) => {
    setQuizResults((r) => ({ ...r, [qi]: oi === QUIZ[qi].answer }))
  }

  const current = CLASSIFY_ITEMS[classifyIndex]

  const classify = (choice) => {
    const correct = choice === current.answer
    setClassifyResult(correct ? 'right' : 'wrong')
    setClassifyScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
  }

  const nextClassify = () => {
    setClassifyIndex((i) => randomIndex(i))
    setClassifyResult(null)
  }

  return (
    <main className="page-content">
      <section className="budget-hero" id="learn">
        <div className="hero-content">
          <div className="hero-text">
            <p className="section-tag">BUDGETING BASICS</p>
            <h1>
              Make your money <span>work for you.</span>
            </h1>
            <p>
              Learn the basics of budgeting, understand your spending and build simple saving habits
              for everyday life.
            </p>
            <a href="#module1" className="start-button">
              Start Learning
            </a>
          </div>
          <div className="learn-flip-card" tabIndex={0} aria-label="Flip card">
            <div className="learn-flip-inner">
              <div className="learn-flip-front">
                <div className="flip-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E6B3D" strokeWidth="1.8">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3>Smart Money</h3>
                <p>Every strong budget starts with understanding where your money goes.</p>
                <span className="learn-flip-hint">Hover to flip</span>
              </div>
              <div className="learn-flip-back">
                <div className="flip-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#EE7B33" strokeWidth="1.8">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3>Trust & Partnership</h3>
                <p>Good financial habits grow through trust, guidance, and consistency.</p>
                <span className="learn-flip-hint">BudgetBasics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-section" id="module1">
        <p className="section-tag">START HERE</p>
        <h2>What is Budgeting?</h2>
        <p>
          Budgeting is a simple plan for how you will use your money. It helps you keep track of
          your income, control your expenses and save for goals that matter to you.
        </p>
      </section>

      {/* Module 1 — Budgeting Basics */}
      <section className="learning-module">
        <div className="module-heading">
          <div>
            <span className="module-number">MODULE 01</span>
            <h2>Budgeting Basics</h2>
          </div>
          <p>The four building blocks every budget is made of.</p>
        </div>
        <div className="learn-cards">
          <Reveal as="div" className="learn-card" delay={0}>
            <div className="card-number">1</div>
            <h3>Income</h3>
            <p>Any money coming in — allowance, part-time pay, scholarships, or gifts. This is your starting point.</p>
          </Reveal>
          <Reveal as="div" className="learn-card" delay={90}>
            <div className="card-number">2</div>
            <h3>Fixed Expenses</h3>
            <p>Costs that stay roughly the same each month, like rent, transport pass, or a phone plan.</p>
          </Reveal>
          <Reveal as="div" className="learn-card" delay={180}>
            <div className="card-number">3</div>
            <h3>Variable Expenses</h3>
            <p>Costs that change month to month — food, entertainment, shopping. Easiest place to cut back.</p>
          </Reveal>
        </div>
        <div className="example-box student-sample">
          <span>SAMPLE STUDENT BUDGET · Rs 20,000 / month</span>
          <div className="student-sample-bar" role="img" aria-label="Student sample budget breakdown">
            {STUDENT_SAMPLE.map((s) => (
              <div
                key={s.label}
                style={{ width: `${(s.amt / STUDENT_TOTAL) * 100}%`, background: s.color }}
                title={`${s.label}: Rs ${s.amt.toLocaleString('en-PK')}`}
              />
            ))}
          </div>
          <div className="student-sample-legend">
            {STUDENT_SAMPLE.map((s) => (
              <span key={s.label}>
                <i style={{ background: s.color }} />
                {s.label} — Rs {s.amt.toLocaleString('en-PK')}
              </span>
            ))}
          </div>
          <p>Every rupee of the allowance is accounted for — nothing left unplanned.</p>
        </div>
        <div className="tip-box">
          <span>WHY IT MATTERS</span>
          <p>A budget is simply income minus expenses, planned in advance instead of figured out after the money is gone.</p>
        </div>
      </section>

      {/* Module 2 — Needs vs Wants */}
      <section className="learning-module">
        <div className="module-heading">
          <div>
            <span className="module-number">MODULE 02</span>
            <h2>Needs vs Wants</h2>
          </div>
          <p>The single most useful question in budgeting: is this essential right now?</p>
        </div>
        <div className="comparison-cards">
          <div className="comparison-card needs">
            <h3>Needs</h3>
            <p>Essential for daily life — skipping these causes real problems.</p>
            <ul>
              <li>Rent or hostel fees</li>
              <li>Food and groceries</li>
              <li>Transport to college/work</li>
              <li>Books and school supplies</li>
              <li>Utilities and phone credit</li>
            </ul>
          </div>
          <div className="comparison-card wants">
            <h3>Wants</h3>
            <p>Optional extras that improve life but can wait or be skipped.</p>
            <ul>
              <li>Games and streaming subscriptions</li>
              <li>Branded clothing and gadgets</li>
              <li>Eating out and snacks</li>
              <li>Movie tickets and concerts</li>
              <li>Impulse online purchases</li>
            </ul>
          </div>
        </div>
        <div className="decision-guide">
          <h3>Decision guide: should I buy it now?</h3>
          <div className="dg-start">Is it essential right now?</div>
          <div className="dg-branches">
            <div className="dg-branch dg-yes">
              <strong>YES — prioritize</strong>
              <span>Pay for it first, from your Needs budget.</span>
            </div>
            <div className="dg-branch dg-no">
              <strong>NO — it can wait</strong>
              <span>Pause for 24 hours, then check if it still fits your Wants budget.</span>
            </div>
          </div>
        </div>
        <div className="classify-box">
          <h3>Try it: Need or Want?</h3>
          <p className="classify-score">
            Score: {classifyScore.correct}/{classifyScore.total}
          </p>
          <div className="classify-item">{current.item}</div>
          {classifyResult === null ? (
            <div className="classify-buttons">
              <button type="button" onClick={() => classify('need')}>
                It's a Need
              </button>
              <button type="button" className="want" onClick={() => classify('want')}>
                It's a Want
              </button>
            </div>
          ) : (
            <>
              <div className={`classify-feedback ${classifyResult}`}>
                {classifyResult === 'right'
                  ? 'Correct! '
                  : `Not quite — this is usually a ${current.answer}. `}
                {current.why}
              </div>
              <button type="button" className="classify-next" onClick={nextClassify}>
                Try another item →
              </button>
            </>
          )}
        </div>
      </section>

      {/* Module 3 — 50-30-20 Rule */}
      <section className="learning-module">
        <div className="module-heading">
          <div>
            <span className="module-number">MODULE 03</span>
            <h2>The 50-30-20 Rule</h2>
          </div>
          <p>A simple guideline for splitting any income into three buckets.</p>
        </div>
        <div className="main-goal-card">
          <div className="goal-visual">50/30/20</div>
          <div className="goal-content">
            <h3>How the split works</h3>
            <p>
              Roughly 50% of income goes to needs, 30% to wants, and 20% to savings. It is a
              starting guideline, not a strict rule — adjust the percentages to fit your own
              situation.
            </p>
            <div className="goal-example">
              <span>EXAMPLE ON RS 20,000</span>
              <strong>Needs Rs 10,000 · Wants Rs 6,000 · Savings Rs 4,000</strong>
            </div>
          </div>
        </div>
        <div className="tip-box">
          <span>TRY IT YOURSELF</span>
          <p>Head to the Practice page to enter your own income and see your personal 50-30-20 split calculated instantly.</p>
        </div>
      </section>

      {/* Module 4 — Savings Goals */}
      <section className="learning-module">
        <div className="module-heading">
          <div>
            <span className="module-number">MODULE 04</span>
            <h2>Savings Goals</h2>
          </div>
          <p>Turning "I should save more" into a plan with numbers.</p>
        </div>
        <div className="goal-cards">
          <div className="goal-card">
            <h3>Set a target</h3>
            <p>Pick a clear goal and amount — a laptop, an emergency fund, or a trip.</p>
            <div className="small-example">e.g. New laptop — Rs 60,000</div>
          </div>
          <div className="goal-card">
            <h3>Plan the timeline</h3>
            <p>Divide the target by what you can realistically save each month.</p>
            <div className="small-example">Rs 60,000 ÷ Rs 5,000/month ≈ 12 months</div>
          </div>
        </div>
        <div className="example-box">
          <span>KEY PRINCIPLE</span>
          <p>Small, consistent monthly deposits beat rare large ones — automating a fixed amount each month removes the temptation to skip it.</p>
        </div>
      </section>

      <section className="section section-mint">
        <div className="section-header">
          <span className="eyebrow">Avoid These</span>
          <h2>Common Money Mistakes</h2>
          <p>Click each item to see how to fix it.</p>
        </div>
        <div className="mistakes-list">
          {MISTAKES.map((m, i) => (
            <Reveal
              as="div"
              key={i}
              delay={i * 70}
              className={`mistake-item${openMistake === i ? ' open' : ''}`}
            >
              <button
                type="button"
                className="mistake-btn"
                aria-expanded={openMistake === i}
                aria-controls={`mistake-panel-${i}`}
                onClick={() => setOpenMistake(openMistake === i ? null : i)}
              >
                {m.q}
                <span aria-hidden="true">{openMistake === i ? '−' : '+'}</span>
              </button>
              {openMistake === i && (
                <div className="mistake-body" id={`mistake-panel-${i}`}>
                  <div className="mistake-scenario">
                    <strong>Scenario:</strong> {m.scenario}
                  </div>
                  <div className="mistake-fix">
                    <strong>What to do:</strong> {m.a}
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="eyebrow">Quick Check</span>
          <h2>Test Your Knowledge</h2>
        </div>
        <div className="quiz-list">
          {QUIZ.map((item, qi) => (
            <div key={qi} className="quiz-card">
              <h3>
                {qi + 1}. {item.q}
              </h3>
              <div className="answer-buttons">
                {item.options.map((opt, oi) => {
                  const result = quizResults[qi]
                  let cls = 'answer-button'
                  if (result !== undefined) {
                    if (oi === item.answer) cls += ' correct'
                    else if (result === false && quizResults[qi] !== undefined) cls += ' wrong'
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      className={cls}
                      onClick={() => checkAnswer(qi, oi)}
                      disabled={result !== undefined}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {quizResults[qi] === true && <p className="quiz-feedback good">Correct!</p>}
              {quizResults[qi] === false && (
                <p className="quiz-feedback bad">Not quite — try reviewing the modules above.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
