// Shared keyword matcher used by the floating chat popup and the Help page.

const FALLBACK =
  "I'm not sure about that. Try asking about needs, wants, saving, or the 50-30-20 rule."

// Does the question contain this keyword as a word?
//  - short keys ("hi", "hey") must match a whole word, so "which" or "they" don't trigger them
//  - longer keys match at the start of a word, so "overspend" still matches "overspending"
function hasKeyword(question, key) {
  const k = key.toLowerCase().trim()
  if (!k) return false
  const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = k.length <= 3 ? `\\b${escaped}\\b` : `\\b${escaped}`
  return new RegExp(pattern).test(question)
}

export function findReply(text, data) {
  const q = text.toLowerCase().trim()
  if (!q) return 'Please type a question about budgeting.'

  // When several answers match, the one with the longest (most specific) keyword wins.
  let best = null
  let bestLength = 0
  for (const item of data) {
    for (const key of item.keys || []) {
      if (key.length > bestLength && hasKeyword(q, key)) {
        best = item
        bestLength = key.length
      }
    }
  }
  return best ? best.reply : FALLBACK
}
