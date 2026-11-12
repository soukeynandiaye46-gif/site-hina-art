import { useEffect, useRef } from 'react'
import { formatPrice } from '../data/site'

export default function CartDrawer({ works, onClose, onRemove, onCheckout }) {
  const closeRef = useRef(null)
  const total = works.reduce((sum, work) => sum + work.price, 0)

  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[80] flex justify-end text-white">
      <button
        type="button"
        aria-label="Fermer le panier"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/70"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#111] shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-white/15 px-6 py-6 sm:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">HINA Art</p>
            <h2 id="cart-title" className="mt-1 font-serif text-3xl italic">Votre panier</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="px-2 py-2 text-[10px] uppercase tracking-[0.2em] text-white/65 transition hover:text-white"
          >
            Fermer
          </button>
        </header>

        {works.length ? (
          <ul className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
            {works.map((work) => (
              <li key={work.src} className="flex gap-4 border-b border-white/10 pb-5">
                <img
                  src={work.src}
                  alt={work.alt}
                  className="h-28 w-20 shrink-0 bg-white/5 object-contain"
                />
                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <p className="font-serif text-xl italic">{work.title}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">{work.medium}</p>
                  <p className="mt-3 text-sm">{formatPrice(work.price)}</p>
                  <button
                    type="button"
                    onClick={() => onRemove(work.src)}
                    className="mt-auto pt-3 text-[10px] uppercase tracking-[0.18em] text-white/45 underline underline-offset-4 transition hover:text-white"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 items-center justify-center px-8 text-center">
            <p className="max-w-xs font-serif text-2xl italic text-white/60">
              Votre panier est encore vide.
            </p>
          </div>
        )}

        <footer className="border-t border-white/15 px-6 py-6 sm:px-8">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/55">Total</span>
            <span className="font-serif text-2xl">{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            disabled={!works.length}
            onClick={onCheckout}
            className="mt-6 w-full bg-white px-5 py-4 text-[11px] uppercase tracking-[0.2em] text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35"
          >
            Finaliser la commande
          </button>
        </footer>
      </aside>
    </div>
  )
}
