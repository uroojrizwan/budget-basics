import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TEAM = [
  {
    name: 'Sajida',
    role: 'Team Lead',
    front: 'Project Coordination',
    back: 'Led planning, structure and overall quality of BudgetBasics.',
    quote: 'Small savings today build a big future.',
    img: '/assets/Sajida.webp',
  },
  {
    name: 'Khizra',
    role: 'Content & Learn',
    front: 'Learning Modules',
    back: 'Wrote Budgeting Basics, Needs vs Wants and Savings Goals.',
    quote: 'Teamwork turns ideas into products.',
    img: '/assets/khizra.webp',
  },
  {
    name: 'Ashna',
    role: 'Practice Planning',
    front: 'Practice Tools',
    back: 'Built the 50-30-20 Rule practice, Savings Goal Calculator and Expense Planner.',
    quote: 'A plan turns money into goals.',
    img: '/assets/Ashna.webp',
  },
  {
    name: 'Urooj',
    role: 'Explore Resources',
    front: 'Resources Developer',
    back: 'Worked on the Infographics Gallery and Search, Sort & Filter.',
    quote: 'Learning is easier when you can see it.',
    img: '/assets/urooj.webp',
  },
  {
    name: 'Aleeha',
    role: 'Explore Resources',
    front: 'Resources Developer',
    back: 'Worked on the Infographics Galleries and visual content.',
    quote: 'Good design makes learning simple.',
    img: '/assets/Aleeha.webp',
  },
  {
    name: 'Aqsa',
    role: 'About Us',
    front: 'About Us Developer',
    back: 'Created About Us, Disclaimer, Team Members and Privacy Note.',
    quote: 'Clarity builds trust.',
    img: '/assets/Aqsa.webp',
  },
]

const PRIVACY_POINTS = [
  {
    title: 'What we never collect',
    text: 'No accounts, passwords, bank or card details, and no real money transactions. The site has no login and no database.',
  },
  {
    title: 'Nothing is sent to a server',
    text: 'The calculators, planner, games and chat all run inside your browser. Chat questions are matched against a file on the site and are never sent anywhere.',
  },
  {
    title: 'Forms',
    text: 'The Feedback form only checks your entries in the browser and shows a confirmation. The message is not sent or stored, so use the contact options if you want a reply.',
  },
  {
    title: 'Links to other sites',
    text: 'The contact links open WhatsApp and Instagram in a new tab. Those services follow their own privacy rules, which we do not control.',
  },
  {
    title: 'Your choices',
    text: 'Use the Reset, Clear or Start over buttons in the tools, or clear this site’s data in your browser settings. A private window keeps nothing once it is closed.',
  },
  {
    title: 'Please use sample numbers',
    text: 'The tools are for practice. Do not type real bank details or personal information into any field.',
  },
]

const STORAGE_ROWS = [
  ['Expense Planner', 'Entries you add: date, category, description, amount', 'Session storage', 'Until you close the tab'],
  ['3-6-9 Rule', 'The goal lines you write for the day', 'Local storage', 'For that day; replaced on a new day or when you press Start over'],
  ['7-Day Money Challenge', 'How many days you marked for each habit', 'Local storage', 'Until you reset it or clear browser data'],
  ['Survive the Month', 'Your progress in the game', 'Local storage', 'Until you reset it or clear browser data'],
  ['Theme', 'Light or dark choice', 'Local storage', 'Until you clear browser data'],
  ['Visit counter', 'A number counting visits from this browser', 'Local and session storage', 'Until you clear browser data'],
]

export default function About() {
  // name of the team card that was flipped by tap / keyboard (hover still works too)
  const [flipped, setFlipped] = useState(null)

  const toggleCard = (name) => setFlipped((cur) => (cur === name ? null : name))

  const onCardKey = (e, name) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleCard(name)
    }
  }

  useEffect(() => {
    document.title = 'BudgetBasics – About Us'
  }, [])

  return (
    <main className="page-content">
      <section className="pagehead">
        <h1>About BudgetBasics</h1>
        <p>
          An educational project helping students learn practical budgeting through simple guides,
          tools, and visuals.
        </p>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="eyebrow">Our Mission</span>
          <h2>Why we built this</h2>
        </div>
        <p style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', color: '#5a6b60' }}>
          Many students never learn money management formally. BudgetBasics makes core concepts
          approachable — needs vs wants, the 50-30-20 rule, goal planning, and expense tracking —
          without requiring complex finance knowledge.
        </p>
      </section>

      <section className="section section-mint">
        <div className="section-header">
          <span className="eyebrow">The Team</span>
          <h2>Meet the creators</h2>
          <p>Hover or tap a card to learn more.</p>
        </div>
        <div className="team-grid">
          {TEAM.map((m) => (
            <div
              key={m.name}
              className={`flip-card${flipped === m.name ? ' flipped' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={flipped === m.name}
              onClick={() => toggleCard(m.name)}
              onKeyDown={(e) => onCardKey(e, m.name)}
            >
              <div className="flip-front">
                <div className="avatar">
                  <img
                    src={m.img}
                    alt={m.name}
                    width="104"
                    height="104"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>
                <h3>{m.name}</h3>
                <span className="member-role">{m.front}</span>
                <div className="flip-hint">Hover / tap / Enter to flip</div>
              </div>
              <div className="flip-back">
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
                <p>{m.back}</p>
                <p className="quote">&ldquo;{m.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="disclaimer">
        <div className="section-header">
          <span className="eyebrow">Important</span>
          <h2>Educational Disclaimer</h2>
        </div>
        <p style={{ maxWidth: 720, margin: '0 auto', color: '#5a6b60', lineHeight: 1.7 }}>
          BudgetBasics is an educational project only. Content and tools are for learning purposes
          and do not constitute professional financial, investment, or tax advice. Always consult a
          qualified advisor for real financial decisions.
        </p>
      </section>

      <section className="section section-mint" id="privacy">
        <div className="section-header">
          <span className="eyebrow">Privacy</span>
          <h2>Privacy Note</h2>
          <p>
            BudgetBasics is built to teach, not to collect. Here is what happens to the things you
            type into the site.
          </p>
        </div>

        <div className="privacy-grid">
          {PRIVACY_POINTS.map((item) => (
            <div className="privacy-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="privacy-storage">
          <h3>What is kept in your browser</h3>
          <div className="privacy-table-wrap">
            <table className="privacy-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">What is kept</th>
                  <th scope="col">Where</th>
                  <th scope="col">For how long</th>
                </tr>
              </thead>
              <tbody>
                {STORAGE_ROWS.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="privacy-end">
          If this note changes, the new version will appear here. Questions about it? Visit{' '}
          <Link to="/help#contact">Contact Us</Link>.
        </p>
      </section>
    </main>
  )
}
