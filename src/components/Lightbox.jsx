import { useEffect, useRef } from 'react'
import { IconArrow } from './Icons'
import { formatPrice } from '../data/site'

export default function Lightbox({ works, index, onClose, onChange, cart, onAddToCart, onOpenCart }) {
  const closeRef = useRef(null)
  const work = works[index]

  useEffect(() => {
    closeRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(event) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((index + 1) % works.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + works.length) % works.length)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [index, onChange, onClose, works.length])

  if (!work) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/95 px-4 py-8 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 text-[12px] uppercase tracking-[0.22em] text-white/80 transition hover:text-white"
      >
        Fermer
      </button>

      <button
        type="button"
        aria-label="Œuvre précédente"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index - 1 + works.length) % works.length)
        }}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 transition hover:bg-white hover:text-black sm:left-6"
      >
        <IconArrow direction="left" />
      </button>

      <figure className="flex w-full max-w-5xl flex-col items-center py-8" onClick={(event) => event.stopPropagation()}>
        <img src={work.src} alt={work.alt} className="max-h-[52vh] w-auto max-w-full object-contain sm:max-h-[65vh]" />
        <figcaption className="mt-5 flex w-full max-w-3xl flex-col gap-5 px-2 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <p className="font-serif text-2xl italic">{work.title}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/55">{work.medium}</p>
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-white/75">{work.description}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <p className="font-serif text-xl">{formatPrice(work.price)}</p>
            {work.status !== 'Disponible' ? (
              <p className="border border-white/25 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-white/65">
                {work.status === 'Vendue' ? 'Œuvre vendue' : 'Œuvre réservée'}
              </p>
            ) : cart.some((item) => item.src === work.src) ? (
              <button
                type="button"
                onClick={onOpenCart}
                className="border border-white/40 px-5 py-3 text-[10px] uppercase tracking-[0.18em] transition hover:bg-white hover:text-black"
              >
                Déjà dans le panier ✓
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onAddToCart(work.src)}
                className="bg-white px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-black transition hover:bg-white/80"
              >
                Ajouter au panier
              </button>
            )}
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
              {String(index + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
            </p>
          </div>
        </figcaption>
      </figure>

      <button
        type="button"
        aria-label="Œuvre suivante"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index + 1) % works.length)
        }}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 transition hover:bg-white hover:text-black sm:right-6"
      >
        <IconArrow direction="right" />
      </button>
    </div>
  )
}
