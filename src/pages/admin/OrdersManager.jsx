import { useState } from 'react'
import { useArtContext } from '../../context/ArtContext'
import { formatAdminPrice, PageHeading } from '../../components/admin/AdminPrimitives'

const deliveryStatuses = ['En préparation', 'Emballage caisse d’art', 'Expédiée', 'Livrée']

export default function OrdersManager() {
  const { orders, updateOrder } = useArtContext()
  const [certificate, setCertificate] = useState(null)

  return (
    <>
      <PageHeading eyebrow="Atelier & expédition" title="Commandes" description="Préparez chaque pièce avec soin et suivez son parcours jusqu’à sa destination." />
      <div className="mb-5 flex flex-wrap gap-3">
        {deliveryStatuses.map((status) => (
          <div key={status} className="border border-[#E5E5E0] bg-white px-4 py-3">
            <p className="text-[9px] uppercase tracking-[0.15em] text-[#666660]">{status}</p>
            <p className="mt-1 font-serif text-2xl text-[#111111]">{orders.filter((order) => order.status === status).length.toString().padStart(2, '0')}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto border border-[#E5E5E0] bg-white">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-[#E5E5E0] text-[9px] uppercase tracking-[0.16em] text-[#666660]">
              <th className="px-5 py-4 font-normal">Commande</th>
              <th className="px-4 py-4 font-normal">Collectionneur</th>
              <th className="px-4 py-4 font-normal">Œuvre</th>
              <th className="px-4 py-4 font-normal">Montant</th>
              <th className="px-4 py-4 font-normal">Livraison</th>
              <th className="px-5 py-4 text-right font-normal">Certificat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E0]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-black/[0.02]">
                <td className="whitespace-nowrap px-5 py-5">
                  <p className="text-xs text-[#111111]">{order.id}</p>
                  <p className="mt-1 text-[10px] text-[#666660]">{order.date}</p>
                </td>
                <td className="px-4 py-5 text-xs text-[#333333]">{order.customer}</td>
                <td className="px-4 py-5 font-serif text-base text-[#111111]">{order.artwork}</td>
                <td className="whitespace-nowrap px-4 py-5 text-xs text-[#333333]">{formatAdminPrice(order.amount)}</td>
                <td className="px-4 py-5">
                  <label className="sr-only" htmlFor={`order-status-${order.id}`}>Statut de livraison</label>
                  <select id={`order-status-${order.id}`} value={order.status} onChange={(event) => updateOrder(order.id, { status: event.target.value })} className="max-w-48 border border-[#E5E5E0] bg-white px-2 py-2 text-[10px] text-[#333333] focus:border-[#C5A059] focus:outline-none">
                    {deliveryStatuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </td>
                <td className="px-5 py-5 text-right">
                  <button type="button" onClick={() => setCertificate(order)} className="border border-[#C5A059]/60 px-3 py-2 text-[9px] uppercase tracking-[0.12em] text-[#C5A059] transition hover:bg-[#C5A059] hover:text-[#111111]">
                    Générer Certificat
                  </button>
                </td>
              </tr>
            ))}
            {!orders.length && <tr><td colSpan="6" className="px-5 py-14 text-center text-sm text-[#666660]">Aucune commande enregistrée.</td></tr>}
          </tbody>
        </table>
      </div>

      {certificate && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/80 p-4" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCertificate(null)
        }}>
          <div className="w-full max-w-3xl border border-[#C5A059]/50 bg-[#F5F2EA] p-3 text-[#211F1A] shadow-2xl sm:p-6">
            <article className="certificate-print-surface relative border border-[#C5A059] px-7 py-12 text-center sm:px-16 sm:py-16">
              <p className="font-serif text-3xl tracking-[0.12em]">HINA <span className="italic">Art</span></p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-[#7D715A]">Atelier contemporain · Certificat d’authenticité</p>
              <div className="mx-auto my-9 h-px w-20 bg-[#C5A059]" />
              <h2 className="font-serif text-4xl italic sm:text-5xl">Œuvre originale</h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#514D44]">
                L’atelier HINA Art certifie que cette œuvre est une création originale, réalisée à la main et signée par l’artiste.
              </p>
              <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 border-y border-[#D8D0BF] py-6 text-left">
                <div><dt className="text-[9px] uppercase tracking-[0.18em] text-[#8B806A]">Œuvre</dt><dd className="mt-1 font-serif text-xl">{certificate.artwork}</dd></div>
                <div><dt className="text-[9px] uppercase tracking-[0.18em] text-[#8B806A]">Collectionneur</dt><dd className="mt-1 text-sm">{certificate.customer}</dd></div>
                <div><dt className="text-[9px] uppercase tracking-[0.18em] text-[#8B806A]">Référence</dt><dd className="mt-1 text-sm">{certificate.id}</dd></div>
                <div><dt className="text-[9px] uppercase tracking-[0.18em] text-[#8B806A]">Date d’acquisition</dt><dd className="mt-1 text-sm">{certificate.date}</dd></div>
              </dl>
              <div className="mt-10 font-serif italic text-[#756748]">HINA Art</div>
              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#8B806A]">Signature de l’atelier</p>
            </article>
            <div className="certificate-controls flex justify-end gap-3 px-1 pb-1 pt-4">
              <button type="button" onClick={() => setCertificate(null)} className="border border-[#49463F] px-4 py-3 text-[9px] uppercase tracking-[0.15em]">Fermer</button>
              <button type="button" onClick={() => window.print()} className="bg-[#C5A059] px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-[#171510]">Imprimer le certificat</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}