import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  useEffect(() => {
    document.title = 'BudgetBasics - Learn Budgeting the Easy Way'
    const greet = () => {
      const hour = new Date().getHours()
      let msg = 'Welcome to BudgetBasics'
      if (hour < 12) msg = 'Good Morning! Welcome to BudgetBasics'
      else if (hour < 17) msg = 'Good Afternoon! Welcome to BudgetBasics'
      else msg = 'Good Evening! Welcome to BudgetBasics'
      const el = document.getElementById('greetLine')
      if (el) el.textContent = msg
    }
    greet()
  }, [])

  return (
    <main>
      <section className="welcome" aria-label="Welcome message">
        <div className="welcome-inner">
          <p className="welcome-line" id="greetLine">
            Welcome to BudgetBasics
          </p>
          <p className="welcome-tag">
            Smart money habits for students, made simple and practical.
          </p>
        </div>
      </section>

      <section className="hero" id="home" aria-labelledby="heroTitle">
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-badge">NextGen BudgetBee</span>
            <h1 id="heroTitle" className="hero-title">
              Learn Budgeting the <span>Easy Way</span>
            </h1>
            <p className="hero-desc">
              Master your money, one step at a time. Simple guides, practical tools, and smart tips,
              designed for students.
            </p>
            <div className="hero-buttons">
              <Link to="/learn" className="btn btn-primary">
                Start Learning
              </Link>
              <Link to="/practice" className="btn btn-outline">
                Try Calculator
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="robot-stage">
              <div className="robot-glow">
                <span className="coin">$</span>
                <span className="coin">₿</span>
                <span className="coin">$</span>
                <span className="coin">₿</span>
                <span className="coin">$</span>
                <span className="coin">₿</span>
              </div>
              <div className="robot-wrap" id="robotWrap">
                <span className="robot-bubble">Assalamualaikum</span>
                <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg" className="robot-svg">
                  <line x1="150" y1="30" x2="150" y2="70" stroke="#1E6B3D" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="150" cy="26" r="8" fill="#EE7B33" />
                  <rect x="75" y="70" width="150" height="105" rx="16" fill="#1C2F22" />
                  <rect x="75" y="70" width="150" height="105" rx="16" fill="none" stroke="#1E6B3D" strokeWidth="3" />
                  <rect x="90" y="85" width="120" height="75" rx="8" fill="#E7F3EA" />
                  <circle cx="125" cy="122" r="8" fill="#1E6B3D" className="robot-eye" />
                  <circle cx="175" cy="122" r="8" fill="#1E6B3D" className="robot-eye" />
                  <path className="robot-mouth" d="M 135 145 Q 150 155 165 145" stroke="#EE7B33" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path className="robot-smile" d="M 126 141 Q 150 168 174 141" stroke="#EE7B33" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <circle className="robot-cheek" cx="108" cy="140" r="6" fill="#EE7B33" />
                  <circle className="robot-cheek" cx="192" cy="140" r="6" fill="#EE7B33" />
                  <rect x="140" y="175" width="20" height="12" fill="#2F6B44" />
                  <rect x="85" y="187" width="130" height="150" rx="18" fill="#5FA777" />
                  <rect x="85" y="187" width="130" height="150" rx="18" fill="none" stroke="#1E6B3D" strokeWidth="3" />
                  <circle cx="150" cy="250" r="28" fill="#E7F3EA" stroke="#1E6B3D" strokeWidth="2" />
                  <text x="150" y="258" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1E6B3D">$</text>
                  <rect x="55" y="200" width="30" height="80" rx="10" fill="#2F6B44" />
                  <g className="robot-arm-right">
                    <g className="robot-arm-wave">
                      <rect x="215" y="200" width="30" height="80" rx="10" fill="#2F6B44" />
                    </g>
                  </g>
                  <rect x="100" y="337" width="35" height="50" rx="8" fill="#1C2F22" />
                  <rect x="165" y="337" width="35" height="50" rx="8" fill="#1C2F22" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Budgeting statistics">
        <div className="stat">
          <strong>50%</strong>
          <span>Needs</span>
        </div>
        <div className="stat">
          <strong>30%</strong>
          <span>Wants</span>
        </div>
        <div className="stat">
          <strong>20%</strong>
          <span>Savings</span>
        </div>
        <div className="stat">
          <strong>100%</strong>
          <span>Control</span>
        </div>
      </section>

      <section className="section" aria-labelledby="tipsTitle">
        <div className="section-header">
          <span className="eyebrow">Quick Tips</span>
          <h2 id="tipsTitle">Featured Budgeting Tips</h2>
          <p>Simple, practical advice to build smart money habits starting today.</p>
        </div>
        <div className="grid">
          <article className="card" tabIndex={0}>
            <div className="card-mark">01</div>
            <h3>Follow the 50-30-20 Rule</h3>
            <p>Split your income: 50% for needs, 30% for wants, and 20% for savings. A simple rule that works.</p>
          </article>
          <article className="card" tabIndex={0}>
            <div className="card-mark">02</div>
            <h3>Set Clear Savings Goals</h3>
            <p>Small goals lead to big achievements. Start with a modest monthly target and stay consistent.</p>
          </article>
          <article className="card" tabIndex={0}>
            <div className="card-mark">03</div>
            <h3>Avoid Impulse Buying</h3>
            <p>Wait 24 hours before any non-essential purchase. Most urges pass within a day.</p>
          </article>
          <article className="card" tabIndex={0}>
            <div className="card-mark">04</div>
            <h3>Track Unused Subscriptions</h3>
            <p>Cancel services you no longer use. Small amounts add up to significant monthly savings.</p>
          </article>
        </div>
      </section>

      <section className="section section-mint" id="learn" aria-labelledby="learnTitle">
        <div className="section-header">
          <span className="eyebrow">Learn</span>
          <h2 id="learnTitle">Master the Basics of Budgeting</h2>
          <p>Beginner-friendly guides to help you understand your money and build smart habits.</p>
        </div>
        <div className="grid">
          <article className="card" tabIndex={0}>
            <div className="card-mark">01</div>
            <h3>Budgeting Basics</h3>
            <p>Income, expenses, needs, wants, and savings, all explained simply.</p>
          </article>
          <article className="card" tabIndex={0}>
            <div className="card-mark">02</div>
            <h3>Needs vs Wants</h3>
            <p>Learn the difference between essential and optional spending.</p>
          </article>
          <article className="card" tabIndex={0}>
            <div className="card-mark">03</div>
            <h3>Savings Goals</h3>
            <p>Plan your goals and estimate how long they will take.</p>
          </article>
          <article className="card" tabIndex={0}>
            <div className="card-mark">04</div>
            <h3>Money Mistakes</h3>
            <p>Common mistakes students make and how to fix them.</p>
          </article>
        </div>
      </section>

      <section className="section" id="practice" aria-labelledby="practiceTitle">
        <div className="section-header">
          <span className="eyebrow">Practice</span>
          <h2 id="practiceTitle">Try Our Smart Calculators</h2>
          <p>Hands-on tools to plan your budget, set savings goals, and track expenses.</p>
        </div>
        <div className="grid grid-3">
          <article className="card" tabIndex={0}>
            <div className="card-mark">01</div>
            <h3>50-30-20 Calculator</h3>
            <p>Enter your income and see how to split it smartly.</p>
          </article>
          <article className="card" tabIndex={0}>
            <div className="card-mark">02</div>
            <h3>Savings Goal Planner</h3>
            <p>Set a goal and see how many months it will take.</p>
          </article>
          <article className="card" tabIndex={0}>
            <div className="card-mark">03</div>
            <h3>Expense Planner</h3>
            <p>Add your expenses and track your spending in real time.</p>
          </article>
        </div>
      </section>

      <section className="cta" aria-labelledby="ctaTitle">
        <h2 id="ctaTitle">
          Ready to take control of your <span>money?</span>
        </h2>
        <p>Join thousands of students learning smart budgeting habits with BudgetBasics.</p>
        <Link to="/learn" className="btn btn-primary">
          Get Started Today
        </Link>
      </section>
    </main>
  )
}
