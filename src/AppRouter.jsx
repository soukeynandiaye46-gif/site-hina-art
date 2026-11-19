import { useCallback, useEffect, useState } from 'react'
import About from './components/About'
import CartDrawer from './components/CartDrawer'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { useArtContext } from './context/ArtContext'
import AdminLogin from './pages/admin/AdminLogin'
import { formatPrice } from './data/site'

const CART_STORAGE_KEY = 'hina-art-cart'

function readCart(artworks) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')
    if (!Array.isArray(saved)) throw new TypeError('Le panier enregistré doit être une liste.')
    const validSources = new Set(artworks.filter((work) => work.status === 'Disponible').map((work) => work.src))
    return [...new Set(saved.filter((src) => typeof src === 'string' && validSources.has(src)))]
  } catch (error) {
    console.error('Impossible de lire le panier enregistré.', error)
    return []
  }
}

function PublicSite() {
  const { artworks } = useArtContext()
  const [orderToken, setOrderToken] = useState(0)
  const [cart, setCart] = useState(() => readCart(artworks))
  const [cartOpen, setCartOpen] = useState(false)
  const [orderMessage, setOrderMessage] = useState('')
  const closeCart = useCallback(() => setCartOpen(false), [])
  const openCart = useCallback(() => setCartOpen(true), [])
  const availableWorks = artworks.filter((work) => work.status === 'Disponible')

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const cartWorks = availableWorks.filter((work) => cart.includes(work.src))

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
      <Navbar onOrder={order} cartCount={cartWorks.length} onOpenCart={openCart} />
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

export default function AppRouter() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }))

  useEffect(() => {
    function syncPath() {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
      })
    }
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  const navigate = useCallback((path) => {
    const target = new URL(path, window.location.origin)
    const targetPath = `${target.pathname}${target.search}${target.hash}`
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (targetPath !== currentPath) window.history.pushState({}, '', targetPath)
    setLocation({ pathname: target.pathname, search: target.search })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  if (location.pathname === '/admin/login') {
    const next = new URLSearchParams(location.search).get('next')
    const returnTo = next === '/admin' || next?.startsWith('/admin/') ? next : '/admin'
    return <AdminLogin onNavigate={navigate} returnTo={returnTo} />
  }

  if (location.pathname === '/admin' || location.pathname.startsWith('/admin/')) {
    const attemptedPath = `${location.pathname}${location.search}`
    return (
      <ProtectedRoute onUnauthenticated={() => (
        navigate(`/admin/login?next=${encodeURIComponent(attemptedPath)}`)
      )}>
        <AdminLayout pathname={location.pathname} onNavigate={navigate} />
      </ProtectedRoute>
    )
  }
  return <PublicSite />
}