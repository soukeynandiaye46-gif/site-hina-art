import { contactDetails, navLinks, socials } from '../data/site'
import { SocialIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="bg-black px-5 pb-10 pt-16 text-white sm:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-12 border-t border-white/15 pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-4xl">
            HINA <span className="italic">Art</span>
          </p>
          <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-white/65">
            Maison de création. Pièces uniques et commandes sur mesure, pensées pour des
            intérieurs qui préfèrent la justesse au bruit.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Navigation</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="text-sm text-white/75 transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Suivre</p>
          <ul className="mt-5 flex gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center border border-white/25 transition hover:bg-white hover:text-black"
                >
                  <SocialIcon label={social.label} />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${contactDetails.email}`}
            className="mt-6 block text-sm text-white/70 transition hover:text-white"
          >
            {contactDetails.email}
          </a>
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-[1440px] text-[11px] uppercase tracking-[0.18em] text-white/40">
        © 2026 HINA Art. Tous droits réservés.
      </p>
    </footer>
  )
}
