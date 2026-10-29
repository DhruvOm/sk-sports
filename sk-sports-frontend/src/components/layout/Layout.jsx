import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActions from './FloatingActions'
import ScrollToTop from '../common/ScrollToTop'

// Every page is wrapped in this: navbar on top, footer at the bottom.
export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
    </>
  )
}
