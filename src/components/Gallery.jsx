import { useState } from 'react'
import { galleryWorks } from '../data/site'
import Lightbox from './Lightbox'

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">02 — Les pièces</p>
            <h2 className="mt-4 font-serif text-5xl font-medium leading-none text-black sm:text-6xl">Gallery</h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-black/65">
            Huit regards sur l’atelier. Cliquez une image pour l’ouvrir en grand et parcourir la sélection.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-serif text-xl italic text-black">{work.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-black/40">{work.medium}</span>
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
        />
      )}
    </section>
  )
}
