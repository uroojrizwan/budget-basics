import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'
import Ticker from './Ticker'
import BackToTop from './BackToTop'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Ticker />
      <Outlet />
      <Footer />
      <Chatbot />
      <BackToTop />
    </>
  )
}
