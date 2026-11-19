import { useState } from 'react'
import { formatPrice } from '../data/site'
import { useArtContext } from '../context/ArtContext'
import Lightbox from './Lightbox'
import SectionHeader from './SectionHeader'

export default function Gallery({ cart, onAddToCart, onOpenCart }) {
  const { artworks } = useArtContext()
  const galleryWorks = artworks
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader title="Gallery" />
      <div className="mx-auto max-w-7xl">
        <p className="mx-auto max-w-sm text-center text-sm font-light leading-relaxed text-black/65">
          Une sélection de l’atelier. Cliquez une image pour l’ouvrir en grand et parcourir les œuvres.
        </p>

        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {galleryWorks.map((work, index) => (
            <li
              key={work.src}
              className={`lg:col-span-2 ${index === 6 ? 'lg:col-start-2' : ''}`}
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group block w-full cursor-pointer text-left transition-all duration-500 hover:shadow-xl"
              >
                <span className="relative block overflow-hidden bg-[#ececec]">
                  <img
                    src={work.src}
                    alt={work.alt}
                    className="aspect-[4/5] w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {work.status !== 'Disponible' && (
                    <span className="absolute left-3 top-3 bg-black/75 px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-white">
                      {work.status}
                    </span>
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/15 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  >
                    <span className="flex translate-y-2 flex-col text-white transition-transform duration-500 group-hover:translate-y-0">
                      <span className="font-serif text-xl italic">{work.title}</span>
                      <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/75">
                        {formatPrice(work.price)}
                      </span>
                      <span className="mt-4 text-[10px] uppercase tracking-[0.2em]">
                        DÉCOUVRIR L’ŒUVRE →
                      </span>
                    </span>
                  </span>
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-serif text-xl italic text-black">{work.title}</span>
                  <span className="text-right text-[10px] uppercase tracking-[0.16em] text-black/45">
                    {formatPrice(work.price)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active !== null && (
        <Lightbox
          works={galleryWorks}
          index={active}
          onClose={() => setActive(null)}
          onChange={setActive}
          cart={cart}
          onAddToCart={onAddToCart}
          onOpenCart={() => {
            setActive(null)
            onOpenCart()
          }}
        />
      )}
    </section>
  )
}
