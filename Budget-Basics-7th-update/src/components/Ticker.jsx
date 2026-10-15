const TIPS = [
  'Track every rupee for a week — awareness is the first budgeting win.',
  '"Do not save what is left after spending; spend what is left after saving." — Warren Buffett',
  'Small, regular savings beat rare large ones. Automate it if you can.',
  'Before a non-essential buy, wait 24 hours. Most urges fade.',
  'A budget is just a plan for your money made before you spend it.',
  'Review your subscriptions every few months — cancel what you do not use.',
  '"Beware of little expenses; a small leak will sink a great ship." — Benjamin Franklin',
  'Aim for a small emergency fund before chasing bigger financial goals.',
  'Needs first, wants second, savings always — even if it is a small amount.',
]

export default function Ticker() {
  const items = [...TIPS, ...TIPS] // duplicated for a seamless scroll loop

  return (
    <div className="ticker" role="marquee" aria-label="Financial tips">
      <span className="ticker-label">TIPS</span>
      <div className="ticker-track">
        <ul className="ticker-list">
          {items.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
