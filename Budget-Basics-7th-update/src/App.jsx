import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Only the home page ships in the first bundle; the other pages load when visited.
const Learn = lazy(() => import('./pages/Learn'))
const Practice = lazy(() => import('./pages/Practice'))
const Infographics = lazy(() => import('./pages/Infographics'))
const Help = lazy(() => import('./pages/Help'))
const About = lazy(() => import('./pages/About'))
const Feedback = lazy(() => import('./pages/Feedback'))
const Sitemap = lazy(() => import('./pages/Sitemap'))

export default function App() {
  return (
    <Suspense fallback={<main className="page-content" />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="practice" element={<Practice />} />
          <Route path="infographics" element={<Infographics />} />
          <Route path="help" element={<Help />} />
          <Route path="about" element={<About />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="sitemap" element={<Sitemap />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
