import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Sitemap() {
  useEffect(() => {
    document.title = 'Sitemap - BudgetBasics'
  }, [])

  return (
    <main className="page-content">
      <section className="pagehead">
        <p className="small">Sitemap</p>
        <h1>Website Structure</h1>
        <p>Complete map of all pages and sections.</p>
      </section>

      <section className="sitemap-box">
        <div className="site-map">
          <div className="map-block">
            <Link to="/" className="map-main">
              Home
            </Link>
            <p>Landing page with hero, tips, and quick links.</p>
          </div>
          <div className="map-block">
            <Link to="/learn" className="map-main">
              Learn
            </Link>
            <ul>
              <li>
                <Link to="/learn">Budgeting Basics</Link>
              </li>
              <li>
                <Link to="/learn">Needs vs Wants</Link>
              </li>
              <li>
                <Link to="/learn">Savings Goals</Link>
              </li>
              <li>
                <Link to="/learn">Money Mistakes</Link>
              </li>
            </ul>
          </div>
          <div className="map-block">
            <Link to="/practice" className="map-main">
              Practice
            </Link>
            <ul>
              <li>
                <Link to="/practice">50-30-20 Calculator</Link>
              </li>
              <li>
                <Link to="/practice">Savings Goal Planner</Link>
              </li>
              <li>
                <Link to="/practice">Expense Planner</Link>
              </li>
            </ul>
          </div>
          <div className="map-block">
            <Link to="/infographics" className="map-main">
              Explore
            </Link>
            <ul>
              <li>
                <Link to="/infographics">Infographics Gallery</Link>
              </li>
              <li>
                <Link to="/infographics">Search & Filter</Link>
              </li>
            </ul>
          </div>
          <div className="map-block">
            <Link to="/help" className="map-main">
              Help
            </Link>
            <ul>
              <li>
                <Link to="/help#chatbot">AI Chatbot</Link>
              </li>
              <li>
                <Link to="/help#contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback</Link>
              </li>
            </ul>
          </div>
          <div className="map-block">
            <span className="map-main">Support</span>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/about#disclaimer">Educational Disclaimer</Link>
              </li>
              <li>
                <Link to="/about#privacy">Privacy Note</Link>
              </li>
              <li>
                <Link to="/sitemap">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
