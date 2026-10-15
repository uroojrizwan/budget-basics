import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const formatDate = () =>
  new Date().toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Karachi',
  })

const formatTime = () =>
  new Date().toLocaleTimeString('en-PK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Karachi',
  })

const readVisits = () => parseInt(localStorage.getItem('bb_visits') || '0', 10)

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dateStr, setDateStr] = useState(formatDate)
  const [timeStr, setTimeStr] = useState(formatTime)
  const [visitors, setVisitors] = useState(readVisits)

  // The clock only shows minutes, so refresh right when the minute changes
  // instead of re-rendering the header every second.
  useEffect(() => {
    let timer
    const tick = () => {
      setDateStr(formatDate())
      setTimeStr(formatTime())
      timer = setTimeout(tick, 60000 - (Date.now() % 60000) + 50)
    }
    timer = setTimeout(tick, 60000 - (Date.now() % 60000) + 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let n = readVisits()
    if (!sessionStorage.getItem('bb_counted')) {
      n += 1
      localStorage.setItem('bb_visits', String(n))
      sessionStorage.setItem('bb_counted', 'yes')
    }
    setVisitors(n)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              Visitors: <strong>{visitors.toLocaleString()}</strong>
            </span>
            <span className="top-bar-item">
              <span>{dateStr}</span>
            </span>
          </div>
          <div className="top-bar-right">
            <span className="top-bar-item">
              <span>{timeStr}</span>
            </span>
          </div>
        </div>
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo" aria-label="BudgetBasics Home" onClick={closeMenu}>
          <img src="/logo.jpeg" alt="BudgetBasics Logo" className="logo-img" width="126" height="42" />
        </Link>

        <div className="navbar-actions">
          <ThemeToggle />
          <button
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            Menu
          </button>
        </div>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li>
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/learn" onClick={closeMenu}>
              Learn
            </NavLink>
          </li>
          <li>
            <NavLink to="/practice" onClick={closeMenu}>
              Practice
            </NavLink>
          </li>
          <li>
            <NavLink to="/infographics" onClick={closeMenu}>
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" onClick={closeMenu}>
              Help
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" onClick={closeMenu}>
              Feedback
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
