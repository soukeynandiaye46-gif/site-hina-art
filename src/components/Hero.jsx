import { useEffect, useState } from 'react'
import { useArtContext } from '../context/ArtContext'
import { IconArrow } from './Icons'

const INTERVAL = 3500

export default function Hero() {
  const { heroSlides } = useArtContext()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [zoomedIndex, setZoomedIndex] = useState(-1)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reduced) return undefined
    const frame = window.requestAnimationFrame(() => setZoomedIndex(index))
    return () => window.cancelAnimationFrame(frame)
  }, [index, reduced])

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
      className="relative h-[calc(78vh_+_7.75rem)] w-full overflow-hidden bg-[#F5F5F5] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carrousel"
      aria-label="Sélection HINA Art"
    >
      <div className="absolute inset-x-0 bottom-0 top-[4.75rem] z-10">
        {heroSlides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            aria-hidden={slideIndex !== index}
            className={`absolute inset-0 flex items-center justify-center ${
              reduced ? '' : 'transition-opacity duration-600 ease-in-out'
            } ${slideIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative my-6 h-[78vh] w-[94%] overflow-hidden shadow-2xl">
              <img
                src={slide.src}
                alt={slide.alt}
                className={`h-full w-full object-cover object-center transition-transform duration-[4000ms] ease-linear ${
                  slideIndex === index && zoomedIndex === slideIndex && !reduced
                    ? 'scale-105'
                    : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 z-10 bg-black/35" />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => go(index - 1)}
          className="absolute left-[3%] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/35 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/55"
          aria-label="Image précédente"
        >
          <IconArrow direction="left" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="absolute right-[3%] top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 bg-black/35 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/55"
          aria-label="Image suivante"
        >
          <IconArrow direction="right" />
        </button>

        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
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
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[4.75rem] z-20 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="relative flex flex-col items-center px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.42em] text-white/80">Atelier contemporain</p>
          <h1 className="mt-6 font-serif text-6xl font-medium leading-none tracking-[0.08em] sm:text-7xl md:text-8xl">
            HINA <span className="italic tracking-normal">Art</span>
          </h1>
          <p className="mt-5 font-serif text-2xl italic text-white/95">
            {heroSlides[index]?.title}
          </p>
          <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-white/80 sm:text-base">
            {heroSlides[index]?.caption}
          </p>
          <a
            href="#gallery"
            onClick={discover}
            className="mt-10 border border-white px-8 py-3.5 text-[12px] uppercase tracking-[0.22em] transition duration-300 hover:bg-white hover:text-black"
          >
            Découvrir nos créations
          </a>
        </div>
      </div>
    </section>
  )
}
