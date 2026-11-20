import { useState } from 'react'
import { formatPrice } from '../data/site'

const WHATSAPP_NUMBER = '221770000000'

const initialCustomer = {
  name: '',
  phone: '',
  address: '',
}

export default function CartPage({
  works,
  onRemove,
  onQuantityChange,
  onContinueShopping,
  onOrderComplete,
}) {
  const [deliveryMethod, setDeliveryMethod] = useState('pickup')
  const [customer, setCustomer] = useState(initialCustomer)
  const [confirmationUrl, setConfirmationUrl] = useState('')
  const [submitError, setSubmitError] = useState('')
  const subtotal = works.reduce((sum, work) => sum + work.price * work.quantity, 0)
  const deliveryPending = deliveryMethod === 'delivery'

  function updateCustomer(event) {
    const { name, value } = event.target
    setCustomer((current) => ({ ...current, [name]: value }))
    setConfirmationUrl('')
    setSubmitError('')
  }

  function updateDeliveryMethod(event) {
    setDeliveryMethod(event.target.value)
    setConfirmationUrl('')
    setSubmitError('')
  }

  function confirmOrder(event) {
    event.preventDefault()
    const message = [
      'Bonjour HINA Art, je souhaite confirmer une commande.',
      '',
      `Nom : ${customer.name.trim()}`,
      `Téléphone / WhatsApp : ${customer.phone.trim()}`,
      `Mode de remise : ${deliveryPending ? 'Livraison à Dakar / Sénégal' : 'Retrait à l’atelier'}`,
      ...(deliveryPending ? [`Adresse : ${customer.address.trim()}`] : []),
      '',
      'Œuvres :',
      ...works.map((work) => {
        const details = [work.dimensions, work.technique || work.medium].filter(Boolean).join(' · ')
        return `- ${work.title}${details ? ` (${details})` : ''} × ${work.quantity} — ${formatPrice(work.price)} / pièce — ${formatPrice(work.price * work.quantity)}`
      }),
      '',
      `Sous-total : ${formatPrice(subtotal)}`,
      `Livraison : ${deliveryPending ? 'Frais à confirmer par l’atelier' : 'Retrait à l’atelier'}`,
      `Total : ${formatPrice(subtotal)}${deliveryPending ? ' (hors frais de livraison)' : ''}`,
    ].join('\n')
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    setSubmitError('')
    setConfirmationUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
    onOrderComplete()
  }

  return (
    <main className="min-h-screen bg-white pt-[4.75rem] text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">HINA Art</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Votre panier</h1>

        {works.length === 0 ? (
          <div className="mt-16 border-y border-neutral-200 py-16 text-center">
            {confirmationUrl ? (
              <div role="status">
                <p className="font-serif text-2xl italic text-neutral-700">
                  Votre récapitulatif a été préparé dans WhatsApp.
                </p>
                <p className="mt-3 text-sm text-neutral-600">
                  Envoyez-le depuis WhatsApp pour transmettre votre commande.
                </p>
                <a
                  href={confirmationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-xs uppercase tracking-widest underline underline-offset-4"
                >
                  Ouvrir WhatsApp
                </a>
              </div>
            ) : (
              <p className="font-serif text-2xl italic text-neutral-700">
                Votre panier est vide
              </p>
            )}
            <button
              type="button"
              onClick={onContinueShopping}
              className="mt-8 border border-neutral-900 px-8 py-4 text-xs uppercase tracking-widest transition hover:bg-neutral-900 hover:text-white"
            >
              Retour à la galerie
            </button>
          </div>
        ) : (
          <div className="mt-12 grid gap-16 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
            <section aria-label="Œuvres sélectionnées">
              <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
                {works.map((work) => (
                  <li key={work.src} className="flex gap-5 py-7 sm:gap-8">
                    <img
                      src={work.src}
                      alt={work.alt}
                      className="h-36 w-28 shrink-0 bg-neutral-100 object-contain sm:h-44 sm:w-36"
                    />
                    <div className="flex min-w-0 flex-1 flex-col items-start">
                      <h2 className="font-serif text-2xl italic">{work.title}</h2>
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-neutral-500">
                        {[work.dimensions, work.technique || work.medium].filter(Boolean).join(' · ')}
                      </p>
                      <p className="mt-3 text-sm">{formatPrice(work.price)}</p>
                      <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-4 pt-5">
                        <div className="flex items-center border border-neutral-300">
                          <button
                            type="button"
                            onClick={() => onQuantityChange(work.src, work.quantity - 1)}
                            disabled={work.quantity <= 1}
                            aria-label={`Réduire la quantité de ${work.title}`}
                            className="h-9 w-9 disabled:cursor-not-allowed disabled:text-neutral-300"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-sm" aria-live="polite">
                            {work.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onQuantityChange(work.src, work.quantity + 1)}
                            aria-label={`Augmenter la quantité de ${work.title}`}
                            className="h-9 w-9"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(work.src)}
                          className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 underline underline-offset-4 transition hover:text-neutral-900"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="h-fit border border-neutral-200 p-6 sm:p-8">
              <h2 className="font-serif text-3xl">Récapitulatif</h2>
              <div className="mt-7 space-y-4 border-b border-neutral-200 pb-6 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-neutral-600">Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-neutral-600">Livraison / remise atelier</span>
                  <span className="text-right">
                    {deliveryPending ? 'À confirmer' : 'Gratuite'}
                  </span>
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-5">
                <span className="text-xs uppercase tracking-[0.16em]">
                  {deliveryPending ? 'Total hors livraison' : 'Total'}
                </span>
                <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
              </div>
              {deliveryPending && (
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  Les frais de livraison seront confirmés par l’atelier avant validation finale.
                </p>
              )}

              <form className="mt-8 space-y-5" onSubmit={confirmOrder}>
                <h3 className="font-serif text-2xl">Vos coordonnées</h3>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">Nom complet</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={customer.name}
                    onChange={updateCustomer}
                    className="mt-2 w-full border-b border-neutral-300 bg-transparent py-3 text-sm outline-none focus:border-neutral-900"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">Téléphone / WhatsApp</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={customer.phone}
                    onChange={updateCustomer}
                    className="mt-2 w-full border-b border-neutral-300 bg-transparent py-3 text-sm outline-none focus:border-neutral-900"
                  />
                </label>
                {deliveryPending && (
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">Adresse de livraison</span>
                    <textarea
                      name="address"
                      autoComplete="street-address"
                      rows="2"
                      required
                      value={customer.address}
                      onChange={updateCustomer}
                      className="mt-2 w-full resize-y border-b border-neutral-300 bg-transparent py-3 text-sm outline-none focus:border-neutral-900"
                    />
                  </label>
                )}
                <label className="block">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">Mode de remise</span>
                  <select
                    value={deliveryMethod}
                    onChange={updateDeliveryMethod}
                    className="mt-2 w-full border-b border-neutral-300 bg-white py-3 text-sm outline-none focus:border-neutral-900"
                  >
                    <option value="delivery">Livraison à Dakar / Sénégal</option>
                    <option value="pickup">Retrait à l’atelier</option>
                  </select>
                </label>

                {submitError && (
                  <p role="alert" className="text-sm text-red-700">{submitError}</p>
                )}
                {confirmationUrl && (
                  <p role="status" className="text-sm leading-relaxed text-neutral-600">
                    Votre commande est prête à être envoyée. Confirmez-la dans WhatsApp.{' '}
                    <a
                      href={confirmationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 hover:text-neutral-900"
                    >
                      Ouvrir WhatsApp
                    </a>
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-neutral-900 px-5 py-4 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-neutral-700"
                >
                  Commander via WhatsApp
                </button>
              </form>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
