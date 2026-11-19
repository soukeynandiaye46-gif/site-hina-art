import { useArtContext } from '../../context/ArtContext'
import { formatAdminPrice, Icon, PageHeading } from '../../components/admin/AdminPrimitives'

const chartPoints = '0,96 38,81 75,88 113,53 150,67 188,39 226,48 263,20 301,29 338,18 376,24 414,7'

export default function DashboardOverview({ onNavigate }) {
  const { artworks, orders, inquiries } = useArtContext()
  const revenue = orders.reduce((total, order) => total + Number(order.amount || 0), 0)
  const pendingOrders = orders.filter((order) => order.status !== 'Livrée').length
  const available = artworks.filter((artwork) => artwork.status === 'Disponible').length
  const sold = artworks.filter((artwork) => artwork.status === 'Vendue').length
  const unread = inquiries.filter((inquiry) => !inquiry.read).length
  const cards = [
    { label: 'Chiffre d’affaires', value: formatAdminPrice(revenue), note: 'Commandes enregistrées', icon: 'trend' },
    { label: 'Œuvres en galerie', value: `${available} disponibles`, note: `${sold} vendue${sold > 1 ? 's' : ''} au catalogue`, icon: 'artwork' },
    { label: 'À expédier', value: String(pendingOrders).padStart(2, '0'), note: 'Commandes en cours', icon: 'orders' },
    { label: 'Demandes atelier', value: String(unread).padStart(2, '0'), note: 'Nouveaux messages', icon: 'inbox' },
  ]

  return (
    <>
      <PageHeading eyebrow="Atelier · activité en direct" title="Vue d’ensemble" description="Un regard calme sur l’activité récente de votre atelier." />
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicateurs clés">
        {cards.map((card) => (
          <article key={card.label} className="border border-[#E5E5E0] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.19em] text-[#666660]">{card.label}</p>
              <Icon name={card.icon} className="h-4 w-4 text-[#C5A059]" />
            </div>
            <p className="mt-6 font-serif text-[1.65rem] leading-tight text-[#111111]">{card.value}</p>
            <p className="mt-2 text-[11px] text-[#666660]">{card.note}</p>
          </article>
        ))}
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="border border-[#E5E5E0] bg-white p-5 sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#666660]">Évolution des ventes</p>
              <h2 className="mt-2 font-serif text-2xl">Une année à l’atelier</h2>
            </div>
            <span className="border border-[#E5E5E0] px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-[#666660]">2025</span>
          </div>
          <div className="mt-8">
            <svg viewBox="0 0 414 120" className="h-48 w-full overflow-visible" role="img" aria-label="Graphique des ventes mensuelles en progression">
              <defs>
                <linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity=".22" />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[25, 55, 85, 115].map((y) => <line key={y} x1="0" x2="414" y1={y} y2={y} stroke="#E5E5E0" strokeDasharray="3 5" />)}
              <polygon points={`0,120 ${chartPoints} 414,120`} fill="url(#salesFill)" />
              <polyline points={chartPoints} fill="none" stroke="#C5A059" strokeWidth="1.7" vectorEffect="non-scaling-stroke" />
              <circle cx="414" cy="7" r="3" fill="#C5A059" />
            </svg>
            <div className="mt-2 flex justify-between text-[9px] uppercase tracking-[0.12em] text-[#666660]">
              {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'].map((month) => <span key={month}>{month}</span>)}
            </div>
          </div>
          <p className="mt-6 text-[10px] text-[#666660]">Visualisation illustrative — les données de vente seront reliées au système de commande.</p>
        </section>

        <section className="border border-[#E5E5E0] bg-white p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#666660]">À garder à l’œil</p>
              <h2 className="mt-2 font-serif text-2xl">Activité récente</h2>
            </div>
            <button type="button" onClick={() => onNavigate('/admin/orders')} className="text-[9px] uppercase tracking-[0.12em] text-[#C5A059] hover:brightness-110">Tout voir →</button>
          </div>
          <ul className="mt-5 divide-y divide-[#E5E5E0]">
            {orders.slice(0, 3).map((order) => (
              <li key={order.id} className="flex gap-3 py-4">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C5A059]/30 bg-[#C5A059]/[0.08] text-[#C5A059]">
                  <Icon name="orders" className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs text-[#111111]">{order.customer} <span className="text-[#666660]">a acquis</span> {order.artwork}</p>
                  <p className="mt-1 text-[10px] text-[#666660]">{order.id} · {formatAdminPrice(order.amount)}</p>
                </div>
              </li>
            ))}
            {inquiries.slice(0, 2).map((inquiry) => (
              <li key={inquiry.id} className="flex gap-3 py-4">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5E5E0] text-[#666660]">
                  <Icon name="inbox" className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs text-[#111111]">{inquiry.name} <span className="text-[#666660]">·</span> {inquiry.subject}</p>
                  <p className="mt-1 text-[10px] text-[#666660]">{inquiry.type} · {inquiry.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}