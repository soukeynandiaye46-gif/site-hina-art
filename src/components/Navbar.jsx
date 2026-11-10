import { useEffect, useState } from 'react'
import { navLinks } from '../data/site'

const sectionIds = navLinks.map((link) => link.id)

export default function Navbar({ onOrder }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('accueil')

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function goTo(id) {
    setOpen(false)
    const node = document.getElementById(id)
    if (id === 'accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    node?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function order() {
    setOpen(false)
    onOrder()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black text-white">
      <div className="relative mx-auto flex h-[4.75rem] max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <a
          href="#accueil"
          onClick={(event) => {
            event.preventDefault()
            goTo('accueil')
          }}
          className="relative z-10 flex items-baseline leading-none"
        >
          <span className="font-serif text-[1.7rem] font-medium tracking-[0.16em]">HINA</span>
          <span className="ml-2 font-serif text-[1.7rem] italic tracking-normal">Art</span>
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  goTo(link.id)
                }}
                className={`relative text-[12px] uppercase tracking-[0.2em] transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:bg-white after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-white after:scale-x-100'
                    : 'text-white/65 after:scale-x-0 hover:text-white hover:after:scale-x-100'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={order}
            className="border border-white px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] transition duration-300 hover:bg-white hover:text-black sm:px-5"
          >
            Commander
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-white transition duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-6 bg-white transition duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-white transition duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-[4.75rem] bg-black transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col justify-between px-8 py-12" aria-label="Navigation mobile">
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault()
                    goTo(link.id)
                  }}
                  className="font-serif text-5xl italic text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={order}
            className="w-full border border-white py-4 text-[12px] uppercase tracking-[0.24em]"
          >
            Commander
          </button>
        </nav>
      </div>
    </header>
  )
}
