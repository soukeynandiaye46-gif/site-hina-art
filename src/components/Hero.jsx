import { useEffect, useState } from 'react'
import { useArtContext } from '../context/ArtContext'
import { IconArrow } from './Icons'

const SLIDE_INTERVAL = 3500

export default function Hero() {
  const { heroSlides } = useArtContext()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (heroSlides.length < 2) return undefined

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, SLIDE_INTERVAL)

    return () => window.clearInterval(timer)
  }, [heroSlides.length])

  function go(direction) {
    setIndex((current) => (current + direction + heroSlides.length) % heroSlides.length)
  }

  function discover(event) {
    event.preventDefault()
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="accueil"
      className="bg-white px-4 pt-[4.75rem] text-white"
      aria-roledescription="carrousel"
      aria-label="Présentation HINA Art"
    >
      <div className="relative mx-auto mt-8 h-[550px] max-w-7xl overflow-hidden bg-neutral-900 md:h-[600px]">
        {heroSlides.map((slide, slideIndex) => (
          <div
            key={slide.src}
            aria-hidden={slideIndex !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              slideIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.src}
              alt=""
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-50"
            />
            <img
              src={slide.src}
              alt={slide.alt}
              className="relative z-10 mx-auto h-full w-auto max-w-full object-contain"
            />
          </div>
        ))}

        <div className="absolute inset-0 z-20 bg-black/30" />

        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 py-12 text-center">
          <h1 className="font-serif text-6xl leading-none md:text-7xl lg:text-8xl">
            HINA <span className="italic">Art</span>
          </h1>
          <p className="mt-5 font-serif text-3xl italic md:text-4xl">Présence</p>
          <p className="mt-3 max-w-lg text-lg leading-relaxed md:text-xl">
            Figures et couleurs, dans le calme de l’atelier.
          </p>
          <a
            href="#gallery"
            onClick={discover}
            className="mt-10 inline-block border border-white px-10 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-white hover:text-neutral-900"
          >
            Découvrir nos créations
          </a>
        </div>

        {heroSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/50 bg-black/30 text-white transition hover:bg-black/60"
              aria-label="Image précédente"
            >
              <IconArrow direction="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/50 bg-black/30 text-white transition hover:bg-black/60"
              aria-label="Image suivante"
            >
              <IconArrow direction="right" />
            </button>

            <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3">
              {heroSlides.map((slide, slideIndex) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Afficher l’image ${slideIndex + 1}`}
                  aria-current={slideIndex === index ? 'true' : undefined}
                  onClick={() => setIndex(slideIndex)}
                  className={`h-1 rounded-full transition-all ${
                    slideIndex === index ? 'w-8 bg-white' : 'w-3 bg-white/55 hover:bg-white/85'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
