import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const { pathname, hash } = useLocation()

  const scrollTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

  const jumpTo = (path, id) => (e) => {
    if (pathname === path && hash === `#${id}`) {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Link to="/" className="footer-logo" aria-label="BudgetBasics Home" onClick={goTop}>
              <img
                src="/logo.jpeg"
                alt="BudgetBasics Logo"
                className="footer-logo-img"
                width="126"
                height="42"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p>
              An educational platform helping students learn budgeting fundamentals through simple
              guides, interactive tools, and visual learning.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li>
                <Link to="/" onClick={goTop}>Home</Link>
              </li>
              <li>
                <Link to="/learn" onClick={goTop}>Learn</Link>
              </li>
              <li>
                <Link to="/practice" onClick={goTop}>Practice</Link>
              </li>
              <li>
                <Link to="/infographics" onClick={goTop}>Explore</Link>
              </li>
              <li>
                <Link to="/help" onClick={goTop}>Help</Link>
              </li>
              <li>
                <Link to="/about" onClick={goTop}>About Us</Link>
              </li>
              <li>
                <Link to="/feedback" onClick={goTop}>Feedback</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/sitemap" onClick={goTop}>Sitemap</Link>
              </li>
              <li>
                <Link to="/feedback" onClick={goTop}>Feedback</Link>
              </li>
              <li>
                <Link to="/help#contact" onClick={jumpTo('/help', 'contact')}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={goTop}>About Us</Link>
              </li>
              <li>
                <Link to="/about#disclaimer" onClick={jumpTo('/about', 'disclaimer')}>
                  Educational Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/about#privacy" onClick={jumpTo('/about', 'privacy')}>
                  Privacy Note
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>
            &copy; 2026 <strong>BudgetBasics</strong> - Educational Project. No real financial
            advice.
          </p>
          <a href="#top" className="back-to-top" onClick={scrollTop}>
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  )
}
