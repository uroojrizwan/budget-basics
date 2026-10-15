import { useState, useMemo, useEffect } from 'react'
import Reveal from '../components/Reveal'

// Bigger, illustrative graphics for the gallery cards — each one visually
// explains its topic rather than just marking it with a small line icon.
const GRAPHICS = {
  scale: (
    <svg viewBox="0 0 200 130" className="topic-art" aria-hidden="true">
      <rect x="4" y="18" width="88" height="94" rx="10" fill="#1e6b3d" />
      <text x="48" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fbf9f4">NEED</text>
      <path d="M20 68h56M20 78h40M20 88h48" stroke="#fbf9f4" strokeWidth="4" strokeLinecap="round" opacity=".85" />
      <rect x="108" y="18" width="88" height="94" rx="10" fill="#ee7b33" />
      <text x="152" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">WANT</text>
      <path d="M124 68h56M124 78h30M124 88h44" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".85" />
      <circle cx="100" cy="65" r="17" fill="#fbf9f4" stroke="#1a2b22" strokeWidth="2" />
      <path d="M92 65a8 8 0 0 1 16 0" stroke="#1a2b22" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  ),
  pie: (
    <svg viewBox="0 0 160 130" className="topic-art" aria-hidden="true">
      <circle cx="70" cy="65" r="52" fill="#e0e8e2" />
      <path d="M70 65 L70 13 A52 52 0 0 1 115 91 Z" fill="#1e6b3d" />
      <path d="M70 65 L115 91 A52 52 0 0 1 41 109 Z" fill="#ee7b33" />
      <path d="M70 65 L41 109 A52 52 0 0 1 70 13 Z" fill="#8fd9ae" />
      <circle cx="70" cy="65" r="24" fill="#fbf9f4" />
      <text x="70" y="70" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1a2b22">50/30/20</text>
      <text x="140" y="30" fontSize="11" fontWeight="700" fill="#1e6b3d">Needs</text>
      <text x="140" y="96" fontSize="11" fontWeight="700" fill="#ee7b33">Wants</text>
      <text x="140" y="112" fontSize="11" fontWeight="700" fill="#3f7a53">Savings</text>
    </svg>
  ),
  loop: (
    <svg viewBox="0 0 160 130" className="topic-art" aria-hidden="true">
      <circle cx="80" cy="65" r="50" fill="none" stroke="#e0e8e2" strokeWidth="14" />
      <path d="M80 15a50 50 0 0 1 43 25" fill="none" stroke="#1e6b3d" strokeWidth="14" strokeLinecap="round" />
      <path d="M123 40a50 50 0 0 1 0 50" fill="none" stroke="#ee7b33" strokeWidth="14" strokeLinecap="round" />
      <path d="M123 90a50 50 0 0 1 -86 0" fill="none" stroke="#8fd9ae" strokeWidth="14" strokeLinecap="round" />
      <text x="80" y="60" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e6b3d">PLAN</text>
      <text x="80" y="76" textAnchor="middle" fontSize="9" fontWeight="700" fill="#5a6b60">TRACK · REVIEW</text>
    </svg>
  ),
  seed: (
    <svg viewBox="0 0 160 130" className="topic-art" aria-hidden="true">
      <path d="M20 108 L45 60 L70 90 L95 35 L120 70 L140 20" fill="none" stroke="#1e6b3d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="45" cy="60" r="5" fill="#1e6b3d" />
      <circle cx="70" cy="90" r="5" fill="#ee7b33" />
      <circle cx="95" cy="35" r="5" fill="#1e6b3d" />
      <circle cx="140" cy="20" r="6" fill="#ee7b33" />
      <path d="M20 108h120" stroke="#c8d6ce" strokeWidth="2" />
      <text x="140" y="14" textAnchor="end" fontSize="10" fontWeight="700" fill="#ee7b33">Grows over time</text>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 130 130" className="topic-art" aria-hidden="true">
      <path d="M65 12 L108 28 V64 C108 92 90 110 65 118 C40 110 22 92 22 64 V28 Z" fill="#1e6b3d" />
      <path d="M65 12 L108 28 V64 C108 92 90 110 65 118 Z" fill="#155230" />
      <path d="M46 62 L59 76 L86 46" fill="none" stroke="#fbf9f4" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 130 130" className="topic-art" aria-hidden="true">
      <circle cx="65" cy="65" r="50" fill="#fff3e8" stroke="#ee7b33" strokeWidth="4" />
      <path d="M65 34v31l22 13" fill="none" stroke="#1a2b22" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="65" y="112" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ee7b33">WAIT 24H</text>
    </svg>
  ),
}

const CARDS = [
  {
    id: 1,
    category: 'needs',
    title: 'Needs vs Wants',
    body: 'Needs are essentials for everyday life — food, transport, school supplies. Wants are optional extras you can delay.',
    icon: 'scale',
  },
  {
    id: 2,
    category: 'rules',
    title: '50-30-20 Rule',
    body: 'This simple budgeting guideline divides your income into needs (50%), wants (30%), and savings (20%).',
    icon: 'pie',
  },
  {
    id: 3,
    category: 'habits',
    title: 'Track & Review',
    body: 'A budget works best when you regularly plan your spending, track expenses, and review progress.',
    icon: 'loop',
  },
  {
    id: 4,
    category: 'saving',
    title: 'Start Saving Early',
    body: 'Even small monthly amounts grow over time. Consistency matters more than large one-time deposits.',
    icon: 'seed',
  },
  {
    id: 5,
    category: 'needs',
    title: 'Emergency Fund',
    body: 'Aim for a small buffer covering 1–2 months of essentials before chasing other goals.',
    icon: 'shield',
  },
  {
    id: 6,
    category: 'habits',
    title: 'Avoid Impulse Buys',
    body: 'Wait 24 hours before non-essential purchases. Most urges fade within a day.',
    icon: 'clock',
  },
]

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'needs', label: 'Needs' },
  { key: 'rules', label: 'Rules' },
  { key: 'saving', label: 'Saving' },
  { key: 'habits', label: 'Habits' },
]

export default function Infographics() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    document.title = 'BudgetBasics - Infographics'
  }, [])

  const visible = useMemo(() => {
    let list = CARDS.filter((c) => {
      const matchFilter = filter === 'all' || c.category === filter
      const q = query.trim().toLowerCase()
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.body.toLowerCase().includes(q) ||
        c.category.includes(q)
      return matchFilter && matchSearch
    })
    if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    else if (sort === 'za') list = [...list].sort((a, b) => b.title.localeCompare(a.title))
    else if (sort === 'newest') list = [...list].sort((a, b) => b.id - a.id)
    return list
  }, [query, sort, filter])

  return (
    <main className="page-content">
      <section className="pagehead">
        <p className="small">Explore</p>
        <h1>Infographics Gallery</h1>
        <p>Visual guides to core budgeting ideas. Search, filter, and sort to explore topics.</p>
      </section>

      <section className="gallery-controls">
        <div className="search-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Search topics like needs, saving, rule..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query && (
            <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
              &times;
            </button>
          )}
        </div>
        <div className="sort-wrap">
          <label htmlFor="sortBox" className="sort-label">
            Sort by
          </label>
          <select
            id="sortBox"
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>
      </section>

      <section className="gallery-filter">
        <p className="filter-title">Explore a topic</p>
        <div className="filter-buttons">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="infographic-grid" id="infographicGrid">
        {visible.length === 0 && (
          <p className="no-results" id="noResults">
            No topics match your search. Try a different keyword or filter.
          </p>
        )}
        {visible.map((c, i) => (
          <Reveal
            as="article"
            key={c.id}
            delay={(i % 4) * 70}
            className="infographic-card"
            data-category={c.category}
            data-title={c.title}
          >
            <div className="infographic-visual">{GRAPHICS[c.icon]}</div>
            <div className="infographic-card-content">
              <span className="infographic-tag">{c.category}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </main>
  )
}
