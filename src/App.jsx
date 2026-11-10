import { useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

export default function App() {
  const [orderToken, setOrderToken] = useState(0)

  function order() {
    setOrderToken((current) => current + 1)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar onOrder={order} />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Contact orderToken={orderToken} />
      </main>
      <Footer />
    </div>
  )
}
