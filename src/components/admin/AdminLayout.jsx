import { useState } from 'react'
import DashboardOverview from '../../pages/admin/DashboardOverview'
import ArtworksManager from '../../pages/admin/ArtworksManager'
import OrdersManager from '../../pages/admin/OrdersManager'
import InquiriesManager from '../../pages/admin/InquiriesManager'
import MediaManager from '../../pages/admin/MediaManager'
import { useArtContext } from '../../context/ArtContext'
import { useAuthContext } from '../../context/AuthContext'
import { Icon } from './AdminPrimitives'

const navigation = [
  { path: '/admin', label: 'Vue d’ensemble', icon: 'dashboard' },
  { path: '/admin/artworks', label: 'Catalogue', icon: 'artwork' },
  { path: '/admin/orders', label: 'Commandes', icon: 'orders' },
  { path: '/admin/inquiries', label: 'Messages', icon: 'inbox' },
  { path: '/admin/media', label: 'Médias & apparence', icon: 'media' },
]

function currentPath(pathname) {
  return pathname === '/admin' ? '/admin' : navigation.find((item) => item.path === pathname)?.path || '/admin'
}

export default function AdminLayout({ pathname, onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const { persistenceError } = useArtContext()
  const { logout } = useAuthContext()
  const activePath = currentPath(pathname)
  const pages = {
    '/admin': <DashboardOverview onNavigate={onNavigate} />,
    '/admin/artworks': <ArtworksManager />,
    '/admin/orders': <OrdersManager />,
    '/admin/inquiries': <InquiriesManager />,
    '/admin/media': <MediaManager />,
  }

  function navigate(event, path) {
    event.preventDefault()
    setDrawerOpen(false)
    onNavigate(path)
  }

  async function signOut() {
    setDrawerOpen(false)
    try {
      await logout()
      onNavigate('/admin/login')
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : 'La déconnexion a échoué.')
    }
  }

  const sidebar = (
    <>
      <div className="flex items-start justify-between border-b border-[#E5E5E0] px-6 pb-7 pt-8">
        <div>
          <a href="/" onClick={(event) => navigate(event, '/')} className="font-serif text-3xl tracking-[0.04em] text-[#111111]">
            HINA <span className="italic">Art</span>
          </a>
          <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-[#666660]">Atelier Admin</p>
        </div>
        <button type="button" className="text-[#666660] lg:hidden" aria-label="Fermer le menu" onClick={() => setDrawerOpen(false)}>
          <Icon name="close" />
        </button>
      </div>
      <nav className="px-3 py-6" aria-label="Administration">
        <p className="px-3 pb-3 text-[9px] uppercase tracking-[0.22em] text-[#666660]">Espace atelier</p>
        <ul className="space-y-1">
          {navigation.map((item) => {
            const active = activePath === item.path
            return (
              <li key={item.path}>
                <a
                  href={item.path}
                  aria-current={active ? 'page' : undefined}
                  onClick={(event) => navigate(event, item.path)}
                  className={`flex items-center gap-3 border-l-2 px-3 py-3 text-xs tracking-[0.04em] transition ${
                    active
                      ? 'border-[#C5A059] bg-[#C5A059]/[0.07] text-[#111111]'
                      : 'border-transparent text-[#666660] hover:bg-black/[0.03] hover:text-[#111111]'
                  }`}
                >
                  <Icon name={item.icon} className={`h-[17px] w-[17px] ${active ? 'text-[#C5A059]' : ''}`} />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="mt-auto border-t border-[#E5E5E0] px-6 py-5">
        <a href="/" onClick={(event) => navigate(event, '/')} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-[#666660] transition hover:text-[#C5A059]">
          <Icon name="external" className="h-4 w-4" />
          Voir la galerie publique
        </a>
        <button type="button" onClick={signOut} className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-[#666660] transition hover:text-[#C5A059]">
          <Icon name="logout" className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[#E5E5E0] bg-white lg:flex">
        {sidebar}
      </aside>
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Fermer le menu" onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-black/70" />
          <aside className="relative flex h-full w-[min(18rem,88vw)] flex-col border-r border-[#E5E5E0] bg-white">
            {sidebar}
          </aside>
        </div>
      )}
      <div className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E5E5E0] bg-white/95 px-5 backdrop-blur sm:px-8 lg:px-10">
          <button type="button" className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-[#666660] lg:hidden" onClick={() => setDrawerOpen(true)}>
            <Icon name="menu" />
            Menu
          </button>
          <p className="hidden text-[10px] uppercase tracking-[0.2em] text-[#666660] lg:block">HINA Art <span className="px-2 text-[#999992]">/</span> Administration</p>
          <a href="/" onClick={(event) => navigate(event, '/')} className="ml-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#666660] hover:text-[#C5A059]">
            Galerie <Icon name="external" className="h-3.5 w-3.5" />
          </a>
        </header>
        <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          {persistenceError && (
            <div className="mb-6 border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900" role="alert">
              {persistenceError}
            </div>
          )}
          {logoutError && (
            <div className="mb-6 border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-5 text-rose-800" role="alert">
              {logoutError}
            </div>
          )}
          {pages[activePath]}
        </main>
      </div>
    </div>
  )
}