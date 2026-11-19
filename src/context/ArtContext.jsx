import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  initialArtworks,
  initialHeroSlides,
  initialInquiries,
  initialOrders,
} from '../data/mockArtData'

const STORAGE_KEY = 'hina-art-admin-data'
const ArtContext = createContext(null)

function readStoredData() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const saved = JSON.parse(raw)
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) {
      throw new TypeError('Les données HINA Art enregistrées sont invalides.')
    }
    return saved
  } catch (error) {
    console.error('Impossible de lire les données locales HINA Art.', error)
    return {}
  }
}

function savedArray(data, key, fallback) {
  return Array.isArray(data[key]) ? data[key] : fallback
}

export function ArtProvider({ children }) {
  const [storedData] = useState(readStoredData)
  const [artworks, setArtworks] = useState(() => savedArray(storedData, 'artworks', initialArtworks))
  const [heroSlides, setHeroSlides] = useState(() => savedArray(storedData, 'heroSlides', initialHeroSlides))
  const [orders, setOrders] = useState(() => savedArray(storedData, 'orders', initialOrders))
  const [inquiries, setInquiries] = useState(() => savedArray(storedData, 'inquiries', initialInquiries))
  const [persistenceError, setPersistenceError] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ artworks, heroSlides, orders, inquiries }),
      )
      setPersistenceError('')
    } catch (error) {
      console.error('Impossible de sauvegarder les données locales HINA Art.', error)
      setPersistenceError('La sauvegarde locale a échoué. Les images volumineuses peuvent dépasser la capacité du navigateur.')
    }
  }, [artworks, heroSlides, orders, inquiries])

  const value = useMemo(() => ({
    artworks,
    heroSlides,
    orders,
    inquiries,
    persistenceError,
    addArtwork: (artwork) => setArtworks((current) => [
      ...current,
      { ...artwork, id: `hina-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
    ]),
    updateArtwork: (id, changes) => setArtworks((current) => (
      current.map((artwork) => (artwork.id === id ? { ...artwork, ...changes } : artwork))
    )),
    deleteArtwork: (id) => setArtworks((current) => current.filter((artwork) => artwork.id !== id)),
    updateHeroSlide: (index, changes) => setHeroSlides((current) => (
      current.map((slide, slideIndex) => (slideIndex === index ? { ...slide, ...changes } : slide))
    )),
    updateOrder: (id, changes) => setOrders((current) => (
      current.map((order) => (order.id === id ? { ...order, ...changes } : order))
    )),
    updateInquiry: (id, changes) => setInquiries((current) => (
      current.map((inquiry) => (inquiry.id === id ? { ...inquiry, ...changes } : inquiry))
    )),
  }), [artworks, heroSlides, orders, inquiries, persistenceError])

  return <ArtContext.Provider value={value}>{children}</ArtContext.Provider>
}

export function useArtContext() {
  const context = useContext(ArtContext)
  if (!context) throw new Error('useArtContext doit être utilisé dans ArtProvider.')
  return context
}