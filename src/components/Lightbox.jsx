import { useEffect, useRef } from 'react'
import { IconArrow } from './Icons'

export default function Lightbox({ works, index, onClose, onChange }) {
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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 px-4 py-8 text-white"
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

      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
        <img src={work.src} alt={work.alt} className="max-h-[74vh] w-auto max-w-full object-contain" />
        <figcaption className="mt-5 flex w-full max-w-3xl items-baseline justify-between gap-6 px-2 text-left">
          <div>
            <p className="font-serif text-2xl italic">{work.title}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/55">{work.medium}</p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
            {String(index + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
          </p>
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
