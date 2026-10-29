import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Classes from './pages/Classes'
import Schedule from './pages/Schedule'
import Gallery from './pages/Gallery'
import BeltProgress from './pages/BeltProgress'
import About from './pages/About'
import Contact from './pages/Contact'
import BookTrial from './pages/BookTrial'
import NotFound from './pages/NotFound'

// Each URL shows one page component.
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/belt-progress" element={<BeltProgress />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-trial" element={<BookTrial />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
