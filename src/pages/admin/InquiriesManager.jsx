import { useMemo, useState } from 'react'
import { useArtContext } from '../../context/ArtContext'
import { Icon, PageHeading } from '../../components/admin/AdminPrimitives'

export default function InquiriesManager() {
  const { inquiries, updateInquiry } = useArtContext()
  const [selectedId, setSelectedId] = useState(inquiries[0]?.id || null)
  const [filter, setFilter] = useState('Tous')
  const selected = inquiries.find((inquiry) => inquiry.id === selectedId)
  const filtered = useMemo(() => inquiries.filter((inquiry) => (
    filter === 'Non lus' ? !inquiry.read : true
  )), [inquiries, filter])

  function select(inquiry) {
    setSelectedId(inquiry.id)
    if (!inquiry.read) updateInquiry(inquiry.id, { read: true })
  }

  return (
    <>
      <PageHeading eyebrow="Correspondance" title="Messages & demandes" description="Chaque projet commence par une conversation. Retrouvez ici les messages adressés à l’atelier." />
      <section className="grid min-h-[560px] overflow-hidden border border-[#E5E5E0] bg-white lg:grid-cols-[320px_1fr]" aria-label="Boîte de réception">
        <div className="border-b border-[#E5E5E0] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-[#E5E5E0] px-5 py-4">
            <p className="text-[9px] uppercase tracking-[0.18em] text-[#666660]">Boîte de réception</p>
            <button type="button" onClick={() => setFilter(filter === 'Tous' ? 'Non lus' : 'Tous')} className={`text-[9px] uppercase tracking-[0.13em] ${filter === 'Non lus' ? 'text-[#C5A059]' : 'text-[#666660]'}`}>{filter}</button>
          </div>
          <ul className="max-h-[36rem] divide-y divide-[#E5E5E0] overflow-y-auto lg:max-h-[620px]">
            {filtered.map((inquiry) => (
              <li key={inquiry.id}>
                <button type="button" onClick={() => select(inquiry)} className={`w-full px-5 py-4 text-left transition hover:bg-black/[0.03] ${selectedId === inquiry.id ? 'bg-[#F5F5F2]' : ''}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-xs ${inquiry.read ? 'text-[#666660]' : 'font-medium text-[#111111]'}`}>{inquiry.name}</span>
                    <span className="shrink-0 text-[9px] text-[#666660]">{inquiry.date}</span>
                  </div>
                  <p className="mt-1 truncate text-[11px] text-[#333333]">{inquiry.subject}</p>
                  <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-[#666660]">{inquiry.message}</p>
                  <span className="mt-3 inline-block border border-[#E5E5E0] px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-[#666660]">{inquiry.type}</span>
                </button>
              </li>
            ))}
            {!filtered.length && <li className="px-5 py-12 text-center text-xs text-[#666660]">Aucun message non lu.</li>}
          </ul>
        </div>

        <div className="flex min-h-[420px] flex-col">
          {selected ? (
            <>
              <header className="border-b border-[#E5E5E0] px-6 py-5 sm:px-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#C5A059]">{selected.type} · {selected.date}</p>
                    <h2 className="mt-2 font-serif text-2xl text-[#111111]">{selected.subject}</h2>
                  </div>
                  <button type="button" onClick={() => updateInquiry(selected.id, { read: !selected.read })} className="text-[9px] uppercase tracking-[0.12em] text-[#666660] hover:text-[#C5A059]">
                    {selected.read ? 'Marquer non lu' : 'Marquer comme lu'}
                  </button>
                </div>
              </header>
              <div className="flex-1 px-6 py-7 sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C5A059]/35 font-serif text-lg text-[#C5A059]">{selected.name.charAt(0)}</span>
                  <div>
                    <p className="text-xs text-[#111111]">{selected.name}</p>
                    <a href={`mailto:${selected.email}`} className="mt-1 text-[10px] text-[#666660] hover:text-[#C5A059]">{selected.email}</a>
                  </div>
                </div>
                <p className="mt-8 max-w-2xl whitespace-pre-line text-sm leading-7 text-[#333333]">{selected.message}</p>
              </div>
              <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E5E0] px-6 py-4 sm:px-8">
                <p className="text-[9px] uppercase tracking-[0.14em] text-[#666660]">Réponse depuis votre messagerie</p>
                <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`} className="inline-flex items-center gap-2 border border-[#C5A059]/60 px-4 py-3 text-[9px] uppercase tracking-[0.14em] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#111111]">
                  Répondre <Icon name="arrow" className="h-3.5 w-3.5" />
                </a>
              </footer>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center px-8 text-center text-xs text-[#666660]">Sélectionnez un message pour le lire.</div>
          )}
        </div>
      </section>
    </>
  )
}