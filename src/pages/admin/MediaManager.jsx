import { useArtContext } from '../../context/ArtContext'
import ImageUploader from '../../components/admin/ImageUploader'
import { PageHeading } from '../../components/admin/AdminPrimitives'

export default function MediaManager() {
  const { heroSlides, updateHeroSlide } = useArtContext()

  return (
    <>
      <PageHeading eyebrow="Identité visuelle" title="Médias & apparence du site" description="Remplacez les images du carrousel d’accueil et ajustez leurs textes. Chaque changement est enregistré localement." />
      <section>
        <div className="mb-5">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059]">Page d’accueil</p>
          <h2 className="mt-1 font-serif text-2xl">Carrousel principal</h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-3">
          {heroSlides.map((slide, index) => (
            <article key={`hero-slide-${index}`} className="border border-[#E5E5E0] bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#666660]">Visuel 0{index + 1}</p>
                <span className="text-[9px] uppercase tracking-[0.13em] text-[#666660]">Accueil</span>
              </div>
              <ImageUploader
                value={slide.src}
                onChange={(src) => updateHeroSlide(index, { src })}
                label={`Image du carrousel ${index + 1}`}
                aspect="aspect-[16/10]"
              />
              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-[9px] uppercase tracking-[0.17em] text-[#666660]">Titre éditorial</span>
                  <input value={slide.title || ''} onChange={(event) => updateHeroSlide(index, { title: event.target.value })} className="w-full border border-[#E5E5E0] bg-white px-3 py-3 font-serif text-lg text-[#111111] focus:border-[#C5A059] focus:outline-none" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[9px] uppercase tracking-[0.17em] text-[#666660]">Texte associé</span>
                  <textarea rows="3" value={slide.caption || ''} onChange={(event) => updateHeroSlide(index, { caption: event.target.value })} className="w-full resize-y border border-[#E5E5E0] bg-white px-3 py-3 text-xs leading-5 text-[#333333] focus:border-[#C5A059] focus:outline-none" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[9px] uppercase tracking-[0.17em] text-[#666660]">Texte alternatif</span>
                  <input value={slide.alt || ''} onChange={(event) => updateHeroSlide(index, { alt: event.target.value })} className="w-full border border-[#E5E5E0] bg-white px-3 py-3 text-xs text-[#333333] focus:border-[#C5A059] focus:outline-none" />
                </label>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 border-l border-[#C5A059]/60 pl-4 text-xs leading-5 text-[#666660]">
          Les fichiers locaux sont stockés en Base64 dans le navigateur (limite de 8 Mo par image). Pour une mise en ligne, branchez Cloudinary ou Supabase Storage dans <code className="text-[#C5A059]">src/services/imageUploadService.js</code>.
        </p>
      </section>
    </>
  )
}