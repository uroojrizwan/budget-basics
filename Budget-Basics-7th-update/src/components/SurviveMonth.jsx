import { useState, useEffect } from 'react'
import Reveal from './Reveal'

function fmt(n) {
  return 'Rs ' + Math.round(n).toLocaleString('en-PK')
}

function safeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    const v = JSON.parse(raw)
    return v == null ? fallback : v
  } catch {
    return fallback
  }
}

const SCENARIOS = [
  { category: 'Food', title: 'Your weekly groceries are running low.', options: [
    { label: 'Shop smart at the local bazaar', money: -500 },
    { label: 'Order everything online for convenience', money: -1100 },
    { label: 'Buy just the basics, skip the snacks', money: -350, savings: 100 },
  ]},
  { category: 'Food', title: 'You are craving fast food tonight.', options: [
    { label: 'Order a burger meal', money: -450 },
    { label: 'Cook a simple meal at home', money: -150, savings: 150 },
    { label: 'Skip dinner to save the money', money: 0 },
  ]},
  { category: 'Food', title: 'A friend suggests trying a new restaurant.', options: [
    { label: 'Go all out, it is a special treat', money: -900 },
    { label: 'Go along but order something light', money: -400 },
    { label: 'Suggest cooking together at home instead', money: -200 },
  ]},
  { category: 'Food', title: 'Your fridge is empty and it is a busy week.', options: [
    { label: 'Meal prep for the whole week', money: -800, savings: 150 },
    { label: 'Order food every single day this week', money: -1800 },
  ]},

  { category: 'Transport', title: 'You need to get across town for class.', options: [
    { label: 'Take a rickshaw', money: -250 },
    { label: 'Take the bus', money: -80 },
    { label: 'Walk, it is not too far', money: 0 },
  ]},
  { category: 'Transport', title: 'It is raining and you are running late.', options: [
    { label: 'Book a ride-hailing car', money: -450 },
    { label: 'Wait it out and take the bus anyway', money: -100 },
  ]},
  { category: 'Transport', title: 'Your petrol tank is almost empty.', options: [
    { label: 'Fill up the whole tank', money: -2000 },
    { label: 'Add just a little for now', money: -800 },
  ]},
  { category: 'Transport', title: 'Friends invite you on a weekend trip out of town.', options: [
    { label: 'Go along, split fuel and food costs', money: -1500 },
    { label: 'Skip it, set the money aside instead', money: -200, emergency: 200 },
  ]},

  { category: 'Shopping', title: 'There is a big sale at your favorite store.', options: [
    { label: 'Treat yourself, sales do not come often', money: -2000 },
    { label: 'Buy just one thing you actually need', money: -600 },
    { label: 'Skip it and walk away', money: 0, savings: 100 },
  ]},
  { category: 'Shopping', title: 'You saw a great pair of shoes online.', options: [
    { label: 'Buy them now before they sell out', money: -2500 },
    { label: 'Add them to your wishlist for later', money: 0 },
  ]},
  { category: 'Shopping', title: 'Your phone case is cracked.', options: [
    { label: 'Buy a new one', money: -500 },
    { label: 'Tape it up, save the rest for emergencies', money: -100, emergency: 100 },
  ]},
  { category: 'Shopping', title: 'Textbooks are needed for the new semester.', options: [
    { label: 'Buy them brand new', money: -1800 },
    { label: 'Buy secondhand copies instead', money: -700 },
  ]},

  { category: 'Friends', title: 'It is a close friend\u2019s birthday.', options: [
    { label: 'Buy a nice gift and treat them to lunch', money: -1200 },
    { label: 'Get a small gift and a card', money: -350 },
    { label: 'Just send a warm message', money: 0 },
  ]},
  { category: 'Friends', title: 'Friends are planning a movie night out.', options: [
    { label: 'Join in, tickets and snacks included', money: -700 },
    { label: 'Suggest a movie night at home instead', money: -150 },
  ]},
  { category: 'Friends', title: 'A friend asks to borrow some money.', options: [
    { label: 'Lend them a small amount', money: -500 },
    { label: 'Politely say you cannot this time', money: 0 },
  ]},
  { category: 'Friends', title: 'Your group wants to plan a trip next month.', options: [
    { label: 'Start setting aside money now', money: -300, savings: 300 },
    { label: 'Decide closer to the date', money: 0 },
  ]},

  { category: 'Emergency', title: 'Your phone screen cracks and needs repair.', options: [
    { label: 'Pay from your emergency fund', useEmergency: true, cost: 1500 },
    { label: 'Pay for the repair out of pocket', money: -1500 },
  ]},
  { category: 'Emergency', title: 'You catch a cold and need medicine.', options: [
    { label: 'Use your emergency fund', useEmergency: true, cost: 600 },
    { label: 'Pay cash for the medicine', money: -600 },
  ]},
  { category: 'Emergency', title: 'An unexpected bike repair is needed.', options: [
    { label: 'Cover it using your emergency fund', useEmergency: true, cost: 2200 },
    { label: 'Pay for the repair directly', money: -2200 },
  ]},
  { category: 'Emergency', title: 'A sudden fee is due for an exam.', options: [
    { label: 'Use your emergency fund', useEmergency: true, cost: 1000 },
    { label: 'Pay the fee out of pocket', money: -1000 },
  ]},
]

function randomIndex(exclude) {
  if (SCENARIOS.length <= 1) return 0
  let i
  do {
    i = Math.floor(Math.random() * SCENARIOS.length)
  } while (i === exclude)
  return i
}

function freshGame() {
  return {
    day: 1,
    money: 15000,
    savings: 0,
    emergency: 0,
    scenarioIndex: randomIndex(-1),
    answered: false,
    chosenIndex: null,
    outcome: '',
    status: 'playing',
    overDay: null,
  }
}

export default function SurviveMonth() {
  const [game, setGame] = useState(() => safeParse('bb_survive', null) || freshGame())

  useEffect(() => {
    localStorage.setItem('bb_survive', JSON.stringify(game))
  }, [game])

  const scenario = SCENARIOS[game.scenarioIndex]

  const choose = (i) => {
    if (game.answered || game.status !== 'playing') return
    const opt = scenario.options[i]
    let money = game.money
    let savings = game.savings
    let emergency = game.emergency
    let outcome = ''

    if (opt.useEmergency) {
      if (emergency >= opt.cost) {
        emergency -= opt.cost
        outcome = `Rs ${opt.cost} covered straight from your emergency fund. Smart move.`
      } else {
        const short = opt.cost - emergency
        outcome = emergency > 0
          ? `Your fund covered part of it, but Rs ${short} still came out of your pocket.`
          : `Your emergency fund was empty, so the full Rs ${opt.cost} came out of your pocket.`
        money -= short
        emergency = 0
      }
    } else {
      money += opt.money || 0
      savings += opt.savings || 0
      emergency += opt.emergency || 0
      const bits = []
      bits.push(opt.money < 0 ? `You spent ${fmt(-opt.money)}` : 'It cost you nothing')
      if (opt.savings) bits.push(`Rs ${opt.savings} went into savings`)
      if (opt.emergency) bits.push(`Rs ${opt.emergency} went into your emergency fund`)
      outcome = bits.join(', ') + '.'
    }

    const broke = money < 0
    setGame((g) => ({
      ...g,
      money,
      savings,
      emergency,
      chosenIndex: i,
      answered: true,
      outcome,
      status: broke ? 'over' : 'playing',
      overDay: broke ? g.day : null,
    }))
  }

  const nextDay = () => {
    setGame((g) => {
      const day = g.day + 1
      if (day > 30) return { ...g, status: 'won' }
      return {
        ...g,
        day,
        scenarioIndex: randomIndex(g.scenarioIndex),
        answered: false,
        chosenIndex: null,
        outcome: '',
      }
    })
  }

  const restart = () => setGame(freshGame())

  const progressPct = Math.min(100, Math.round((game.day / 30) * 100))
  const total = game.money + game.savings + game.emergency

  let rating = ''
  if (game.status === 'won') {
    if (total >= 6000) rating = 'Excellent budgeting! You balanced spending and saving really well.'
    else if (total >= 3000) rating = 'Good job \u2014 you stayed in control of your money most of the month.'
    else if (total >= 500) rating = 'You made it through, but it was a close call. A bit more planning would help.'
    else rating = 'You survived, but just barely. Try building better habits next time.'
  }

  return (
    <Reveal as="div" className="survive-wrap">
      <div className="survive-dash">
        <div className="survive-stat">
          <span>Day</span>
          <b>{game.day} / 30</b>
        </div>
        <div className="survive-stat">
          <span>Money Left</span>
          <b className={game.money < 0 ? 'neg' : ''}>{fmt(game.money)}</b>
        </div>
        <div className="survive-stat">
          <span>Savings</span>
          <b>{fmt(game.savings)}</b>
        </div>
        <div className="survive-stat">
          <span>Emergency Fund</span>
          <b>{fmt(game.emergency)}</b>
        </div>
      </div>

      <div className="survive-progress" role="progressbar" aria-valuenow={game.day} aria-valuemin={1} aria-valuemax={30} aria-label="Days survived">
        <div className="survive-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="survive-tools">
        <button type="button" className="pp-btn outline small" onClick={restart}>
          Reset game
        </button>
      </div>

      {game.status === 'playing' && scenario && (
        <div className="survive-card">
          <span className="survive-cat">{scenario.category}</span>
          <h4>{scenario.title}</h4>
          <div className="survive-options">
            {scenario.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                className={`survive-option${game.chosenIndex === i ? ' chosen' : ''}`}
                disabled={game.answered}
                onClick={() => choose(i)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {game.answered && (
            <>
              <div className="survive-outcome" role="status">{game.outcome}</div>
              <button type="button" className="pp-btn" onClick={nextDay}>
                {game.day === 30 ? 'Finish the Month' : 'Next Day'}
              </button>
            </>
          )}
        </div>
      )}

      {game.status === 'won' && (
        <div className="survive-end win">
          <h3>You Survived the Month!</h3>
          <p>{rating}</p>
          <button type="button" className="pp-btn outline" onClick={restart}>
            Play Again
          </button>
        </div>
      )}

      {game.status === 'over' && (
        <div className="survive-end over">
          <h3>Out of Money</h3>
          <p>
            You ran out of cash on Day {game.overDay} of 30. Real budgets need a buffer for the
            unexpected — try again and plan ahead.
          </p>
          <button type="button" className="pp-btn outline" onClick={restart}>
            Try Again
          </button>
        </div>
      )}
    </Reveal>
  )
}
