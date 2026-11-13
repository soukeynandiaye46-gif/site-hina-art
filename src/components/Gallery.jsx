import { useState } from 'react'
import { formatPrice, galleryWorks } from '../data/site'
import Lightbox from './Lightbox'
import SectionHeader from './SectionHeader'

export default function Gallery({ cart, onAddToCart, onOpenCart }) {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeader title="Gallery" />
      <div className="mx-auto max-w-7xl">
        <p className="mx-auto max-w-sm text-center text-sm font-light leading-relaxed text-black/65">
          Huit regards sur l’atelier. Cliquez une image pour l’ouvrir en grand et parcourir la sélection.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryWorks.map((work, index) => (
            <li key={work.src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group block w-full text-left"
              >
                <span className="block overflow-hidden bg-[#ececec]">
                  <img
                    src={work.src}
                    alt={work.alt}
                    className="aspect-[4/5] w-full object-contain transition-opacity duration-700 ease-out group-hover:opacity-90"
                  />
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
