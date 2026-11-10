import { useEffect, useState } from 'react'
import { heroSlides } from '../data/site'
import { IconArrow } from './Icons'

const INTERVAL = 6000

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || reduced) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, INTERVAL)
    return () => window.clearInterval(timer)
  }, [paused, reduced, index])

  function go(next) {
    setIndex((next + heroSlides.length) % heroSlides.length)
  }

  function discover(event) {
    event.preventDefault()
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function onTouchStart(event) {
    event.currentTarget.dataset.touchX = String(event.touches[0].clientX)
  }

  function onTouchEnd(event) {
    const start = Number(event.currentTarget.dataset.touchX)
    const delta = event.changedTouches[0].clientX - start
    if (delta > 48) go(index - 1)
    if (delta < -48) go(index + 1)
  }

  return (
    <section
      id="accueil"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carrousel"
      aria-label="Sélection HINA Art"
    >
      {heroSlides.map((slide, slideIndex) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover ${
            reduced ? '' : 'transition-opacity duration-1000 ease-in-out'
          } ${slideIndex === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/35" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.42em] text-white/80">Atelier contemporain</p>
        <h1 className="mt-6 font-serif text-6xl font-medium leading-none tracking-[0.08em] sm:text-7xl md:text-8xl">
          HINA <span className="italic tracking-normal">Art</span>
        </h1>
        <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/90 sm:text-lg">
          Des créations originales, composées pour habiter la lumière et le silence d’un lieu.
        </p>
        <a
          href="#gallery"
          onClick={discover}
          className="mt-10 border border-white px-8 py-3.5 text-[12px] uppercase tracking-[0.22em] transition duration-300 hover:bg-white hover:text-black"
        >
          Découvrir nos créations
        </a>
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/50 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-black sm:left-8"
        aria-label="Image précédente"
      >
        <IconArrow direction="left" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/50 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-black sm:right-8"
        aria-label="Image suivante"
      >
        <IconArrow direction="right" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Afficher l’image ${slideIndex + 1}`}
            aria-current={slideIndex === index ? 'true' : undefined}
            onClick={() => go(slideIndex)}
            className={`h-px transition-all duration-300 ${
              slideIndex === index ? 'w-10 bg-white' : 'w-6 bg-white/45 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
