import { useState } from 'react'
import { contactDetails, socials } from '../data/site'
import { SocialIcon } from './Icons'
import SectionHeader from './SectionHeader'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const fields = [
  { name: 'name', label: 'Nom complet', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Adresse e-mail', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Numéro de téléphone', type: 'tel', autoComplete: 'tel' },
  { name: 'subject', label: 'Sujet', type: 'text', autoComplete: 'off' },
]

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Indiquez votre nom complet.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Indiquez une adresse e-mail valide.'
  }
  if (values.phone.replace(/\D/g, '').length < 8) {
    errors.phone = 'Indiquez un numéro de téléphone valide.'
  }
  if (values.subject.trim().length < 2) errors.subject = 'Précisez le sujet de votre message.'
  if (values.message.trim().length < 12) {
    errors.message = 'Écrivez quelques mots pour que l’atelier puisse vous répondre.'
  }
  return errors
}

function mailtoHref(values) {
  const subject = encodeURIComponent(`[HINA Art] ${values.subject.trim()}`)
  const body = encodeURIComponent(
    [
      `Nom : ${values.name.trim()}`,
      `Téléphone : ${values.phone.trim()}`,
      `E-mail : ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n'),
  )
  return `mailto:${contactDetails.email}?subject=${subject}&body=${body}`
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [readyHref, setReadyHref] = useState('')

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function submit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = ['name', 'email', 'phone', 'subject', 'message'].find((key) => nextErrors[key])
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      setReadyHref('')
      return
    }

    const href = mailtoHref(values)
    setReadyHref(href)
    window.location.href = href
  }

  return (
    <section id="contact" className="bg-[#141414] px-5 py-24 text-white sm:px-8 sm:py-32">
      <SectionHeader title="Contactez-nous" inverted />
      <p className="max-w-xl mx-auto mb-12 text-sm font-light leading-relaxed text-center text-white/70">
        Une question ou une visite ? Écrivez à l’atelier : le formulaire prépare
        votre message et l’ouvre dans votre messagerie. Rien n’est envoyé automatiquement.
      </p>

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <div>
          {readyHref ? (
            <div className="px-6 py-8 border border-white/20" role="status">
              <p className="font-serif text-3xl italic">Votre message est prêt.</p>
              <p className="max-w-lg mt-4 text-sm font-light leading-relaxed text-white/75">
                Votre application de messagerie s’ouvre avec le texte déjà rédigé. HINA Art
                n’a pas de serveur de réception configuré : le message part uniquement depuis
                votre adresse, lorsque vous l’envoyez.
              </p>
              <a
                href={readyHref}
                className="mt-8 inline-flex border border-white px-6 py-3 text-[11px] uppercase tracking-[0.22em] transition hover:bg-white hover:text-black"
              >
                Ouvrir la messagerie
              </a>
              <button
                type="button"
                onClick={() => setReadyHref('')}
                className="ml-4 text-[11px] uppercase tracking-[0.22em] text-white/60 underline-offset-4 hover:text-white hover:underline"
              >
                Modifier
              </button>
            </div>
          ) : (
            <form className="space-y-7" onSubmit={submit} noValidate>
              {fields.map((field) => (
                <label key={field.name} className="block" htmlFor={field.name}>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">{field.label}</span>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    value={values[field.name]}
                    onChange={update}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                    className="w-full py-3 mt-2 text-base text-white transition bg-transparent border-b outline-none border-white/25 focus:border-white"
                  />
                  {errors[field.name] && (
                    <span id={`${field.name}-error`} className="block mt-2 text-xs text-white/70">
                      {errors[field.name]}
                    </span>
                  )}
                </label>
              ))}

              <label className="block" htmlFor="message">
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">Message</span>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={values.message}
                  onChange={update}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="w-full py-3 mt-2 text-base text-white transition bg-transparent border-b outline-none resize-y border-white/25 focus:border-white"
                />
                {errors.message && (
                  <span id="message-error" className="block mt-2 text-xs text-white/70">
                    {errors.message}
                  </span>
                )}
              </label>

              <button
                type="submit"
                className="bg-white px-8 py-3.5 text-[12px] uppercase tracking-[0.22em] text-black transition hover:bg-white/85"
              >
                Envoyer le message
              </button>
            </form>
          )}
        </div>

        <aside className="flex flex-col justify-between pt-10 border-t border-white/15 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
          <div className="space-y-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Téléphone</p>
              <a href={contactDetails.phoneHref} className="block mt-3 font-serif text-3xl italic transition hover:opacity-70">
                {contactDetails.phone}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">E-mail</p>
              <a
                href={`mailto:${contactDetails.email}`}
                className="block mt-3 font-serif text-3xl italic break-all transition hover:opacity-70"
              >
                {contactDetails.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Atelier</p>
              <a
                href={contactDetails.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="block mt-3 font-serif text-3xl italic leading-snug transition hover:opacity-70"
              >
                {contactDetails.address}
                <br />
                {contactDetails.city}
              </a>
            </div>
          </div>

          <div className="mt-16">
            <ul className="flex gap-3 mt-8">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center transition border h-11 w-11 border-white/25 hover:bg-white hover:text-black"
                  >
                    <SocialIcon label={social.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
