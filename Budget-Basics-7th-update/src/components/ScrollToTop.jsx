import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lastPath = useRef(pathname)

  useEffect(() => {
    const samePage = lastPath.current === pathname
    lastPath.current = pathname

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' })

    const id = hash.slice(1)
    let tries = 0
    const jump = () => {
      const target = document.getElementById(id)
      if (!target) return false
      target.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant' })
      return true
    }

    if (jump()) return
    const timer = setInterval(() => {
      tries += 1
      if (jump() || tries >= 40) clearInterval(timer)
    }, 50)
    return () => clearInterval(timer)
  }, [pathname, hash])

  return null
}
