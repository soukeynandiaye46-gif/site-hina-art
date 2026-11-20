import { useEffect, useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { useArtContext } from './context/ArtContext'
import AdminLogin from './pages/admin/AdminLogin'

const CART_STORAGE_KEY = 'hina-art-cart'

function readCart(artworks) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')
    if (!Array.isArray(saved)) throw new TypeError('Le panier enregistré doit être une liste.')
    const validSources = new Set(artworks.filter((work) => work.status === 'Disponible').map((work) => work.src))
    const quantities = new Map()
    saved.forEach((item) => {
      const src = typeof item === 'string' ? item : item?.src
      const quantity = typeof item === 'string' ? 1 : Number(item?.quantity)
      if (typeof src !== 'string' || !validSources.has(src) || !Number.isSafeInteger(quantity) || quantity < 1) return
      quantities.set(src, Math.min(99, (quantities.get(src) || 0) + quantity))
    })
    return [...quantities].map(([src, quantity]) => ({ src, quantity }))
  } catch (error) {
    console.error('Impossible de lire le panier enregistré.', error)
    return []
  }
}

function PublicSite({ isCartPage, onNavigate }) {
  const { artworks } = useArtContext()
  const [cart, setCart] = useState(() => readCart(artworks))
  const availableWorks = artworks.filter((work) => work.status === 'Disponible')

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const cartWorks = cart.flatMap((item) => {
    const work = availableWorks.find((availableWork) => availableWork.src === item.src)
    return work ? [{ ...work, quantity: item.quantity }] : []
  })
  const cartCount = cartWorks.reduce((sum, work) => sum + work.quantity, 0)

  return (
    <div className="min-h-screen bg-[#141414] text-black">
      <Navbar cartCount={cartCount} isCartPage={isCartPage} onNavigate={onNavigate} />
      {isCartPage ? (
        <CartPage
          works={cartWorks}
          onRemove={(src) => setCart((current) => current.filter((item) => item.src !== src))}
          onQuantityChange={(src, quantity) => setCart((current) => current.map((item) => (
            item.src === src
              ? { ...item, quantity: Math.min(99, Math.max(1, Math.floor(quantity))) }
              : item
          )))}
          onContinueShopping={() => onNavigate('/#gallery')}
          onOrderComplete={() => setCart([])}
        />
      ) : (
        <main>
          <Hero />
          <About />
          <Gallery
            cart={cart}
            onAddToCart={(src) => setCart((current) => (
              current.some((item) => item.src === src)
                ? current
                : [...current, { src, quantity: 1 }]
            ))}
            onOpenCart={() => onNavigate('/panier')}
          />
          <Contact />
        </main>
      )}
      <Footer isCartPage={isCartPage} onNavigate={onNavigate} />
    </div>
  )
}

export default function AppRouter() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }))

  useEffect(() => {
    function syncPath() {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      })
    }
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  useEffect(() => {
    if (!location.hash) return undefined
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.hash, location.pathname])

  function navigate(path) {
    const target = new URL(path, window.location.origin)
    const targetPath = `${target.pathname}${target.search}${target.hash}`
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (targetPath !== currentPath) window.history.pushState({}, '', targetPath)
    setLocation({ pathname: target.pathname, search: target.search, hash: target.hash })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

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
  return (
    <PublicSite
      isCartPage={location.pathname === '/panier'}
      onNavigate={navigate}
    />
  )
}