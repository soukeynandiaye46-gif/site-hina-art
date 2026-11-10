export default function About() {
  return (
    <section id="a-propos" className="bg-[#f4f4f4] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <figure className="relative">
          <img
            src="/images/about.jpg"
            alt="Pinceaux couverts de pigments, posés sur une table d’atelier"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <figcaption className="mt-4 text-[11px] uppercase tracking-[0.28em] text-black/45">
            L’atelier — matière et geste
          </figcaption>
        </figure>

        <div className="max-w-xl lg:py-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-black/45">01 — La maison</p>
          <h2 className="mt-5 font-serif text-5xl font-medium leading-[1.05] text-black sm:text-6xl">
            À propos de HINA Art
          </h2>
          <div className="mt-8 space-y-5 text-[15px] font-light leading-relaxed text-black/75">
            <p>
              HINA Art est une maison de création dédiée aux pièces pensées pour durer.
              Nous travaillons la couleur, la matière et le calme des surfaces afin que
              chaque œuvre trouve sa place sans jamais encombrer le regard.
            </p>
            <p>
              La vision est simple : des créations contemporaines, précises et intimes,
              capables de tenir dans un intérieur comme dans le temps. Rien n’est produit
              pour remplir un mur. Chaque format répond à une lumière, à une distance,
              à une manière d’habiter.
            </p>
            <p>
              La passion de l’atelier tient dans l’attention longue. Observer, revenir,
              laisser sécher, reprendre. Le savoir-faire se lit dans le choix des
              pigments, la tenue des couches et les finitions réalisées à la main.
              Les commandes sur mesure — dimensions, cadre, palette — se discutent
              directement, sans intermédiaire.
            </p>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-black/40">Pièces</dt>
              <dd className="mt-2 font-serif text-3xl">Uniques</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-black/40">Geste</dt>
              <dd className="mt-2 font-serif text-3xl">À la main</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-black/40">Commande</dt>
              <dd className="mt-2 font-serif text-3xl">Sur mesure</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
