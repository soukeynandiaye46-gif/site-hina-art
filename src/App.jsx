import { useCallback, useEffect, useState } from 'react'
import About from './components/About'
import CartDrawer from './components/CartDrawer'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import { formatPrice, galleryWorks } from './data/site'

const CART_STORAGE_KEY = 'hina-art-cart'

function readCart() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')
    if (!Array.isArray(saved)) throw new TypeError('Le panier enregistré doit être une liste.')
    const validSources = new Set(galleryWorks.map((work) => work.src))
    return [...new Set(saved.filter((src) => typeof src === 'string' && validSources.has(src)))]
  } catch (error) {
    console.error('Impossible de lire le panier enregistré.', error)
    return []
  }
}

export default function App() {
  const [orderToken, setOrderToken] = useState(0)
  const [cart, setCart] = useState(readCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [orderMessage, setOrderMessage] = useState('')
  const closeCart = useCallback(() => setCartOpen(false), [])
  const openCart = useCallback(() => setCartOpen(true), [])

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const cartWorks = galleryWorks.filter((work) => cart.includes(work.src))

  function order(message = '') {
    setOrderMessage(message)
    setOrderToken((current) => current + 1)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function checkout() {
    const total = cartWorks.reduce((sum, work) => sum + work.price, 0)
    setCartOpen(false)
    order(
      [
        'Bonjour, je souhaite commander les œuvres suivantes :',
        ...cartWorks.map((work) => `- ${work.title} — ${formatPrice(work.price)}`),
        '',
        `Montant total : ${formatPrice(total)}`,
      ].join('\n'),
    )
  }

  return (
    <div className="min-h-screen bg-[#141414] text-black">
      <Navbar
        onOrder={order}
        cartCount={cart.length}
        onOpenCart={openCart}
      />
      <main>
        <Hero />
        <About />
        <Gallery
          cart={cart}
          onAddToCart={(src) => setCart((current) => (
            current.includes(src) ? current : [...current, src]
          ))}
          onOpenCart={openCart}
        />
        <Contact orderToken={orderToken} orderMessage={orderMessage} />
      </main>
      <Footer />
      {cartOpen && (
        <CartDrawer
          works={cartWorks}
          onClose={closeCart}
          onRemove={(src) => setCart((current) => current.filter((item) => item !== src))}
          onCheckout={checkout}
        />
      )}
    </div>
  )
}
