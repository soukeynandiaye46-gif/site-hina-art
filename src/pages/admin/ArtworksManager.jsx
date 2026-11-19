import { useMemo, useState } from 'react'
import { useArtContext } from '../../context/ArtContext'
import ImageUploader from '../../components/admin/ImageUploader'
import { formatAdminPrice, Icon, PageHeading, StatusBadge } from '../../components/admin/AdminPrimitives'

const statuses = ['Disponible', 'Réservée', 'Vendue']
const blankArtwork = {
  title: '',
  year: new Date().getFullYear(),
  description: '',
  dimensions: '',
  technique: '',
  medium: '',
  price: '',
  src: '',
  alt: '',
  status: 'Disponible',
}

function Field({ label, name, value, onChange, type = 'text', required = false, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.17em] text-[#666660]">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-[#E5E5E0] bg-white px-3 py-3 text-sm text-[#111111] placeholder:text-[#666660] focus:border-[#C5A059] focus:outline-none"
        {...props}
      />
    </label>
  )
}

export default function ArtworksManager() {
  const { artworks, addArtwork, updateArtwork, deleteArtwork } = useArtContext()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Toutes')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blankArtwork)
  const [formError, setFormError] = useState('')
  const filtered = useMemo(() => artworks.filter((artwork) => {
    const matchesText = `${artwork.title} ${artwork.technique} ${artwork.medium}`.toLowerCase().includes(query.toLowerCase())
    return matchesText && (statusFilter === 'Toutes' || artwork.status === statusFilter)
  }), [artworks, query, statusFilter])

  function openEditor(artwork = null) {
    setEditing(artwork || false)
    setForm(artwork ? { ...blankArtwork, ...artwork } : blankArtwork)
    setFormError('')
  }

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function saveArtwork(event) {
    event.preventDefault()
    const clean = {
      ...form,
      price: Number(form.price),
      year: Number(form.year),
      medium: form.technique,
      alt: form.alt || form.title,
    }
    if (!clean.src) {
      setFormError('Ajoutez un visuel avant d’enregistrer cette œuvre.')
      return
    }
    if (!Number.isFinite(clean.price) || clean.price <= 0) {
      setFormError('Indiquez un prix supérieur à zéro.')
      return
    }
    if (editing) updateArtwork(editing.id, clean)
    else addArtwork(clean)
    setEditing(null)
  }

  return (
    <>
      <PageHeading
        eyebrow="Collection"
        title="Catalogue des œuvres"
        description="Les modifications apportées ici sont immédiatement visibles dans la galerie publique."
      >
        <button type="button" onClick={() => openEditor()} className="inline-flex items-center gap-2 bg-[#C5A059] px-4 py-3 text-[10px] uppercase tracking-[0.14em] text-[#111111] transition hover:brightness-95">
          <Icon name="plus" className="h-4 w-4" /> Nouvelle œuvre
        </button>
      </PageHeading>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666660]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une œuvre…" className="w-full border border-[#E5E5E0] bg-white py-3 pl-10 pr-4 text-xs text-[#111111] placeholder:text-[#666660] focus:border-[#C5A059] focus:outline-none" />
        </label>
        <div className="flex flex-wrap gap-1 border-b border-[#E5E5E0]">
          {['Toutes', ...statuses].map((status) => (
            <button key={status} type="button" onClick={() => setStatusFilter(status)} className={`border-b-2 px-3 py-2.5 text-[9px] uppercase tracking-[0.14em] transition ${statusFilter === status ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-[#666660] hover:text-[#111111]'}`}>
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden border border-[#E5E5E0] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[790px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E5E5E0] text-[9px] uppercase tracking-[0.16em] text-[#666660]">
                <th className="px-5 py-4 font-normal">Œuvre</th>
                <th className="px-4 py-4 font-normal">Technique & dimensions</th>
                <th className="px-4 py-4 font-normal">Prix</th>
                <th className="px-4 py-4 font-normal">Statut</th>
                <th className="px-5 py-4 text-right font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E0]">
              {filtered.map((artwork) => (
                <tr key={artwork.id} className="group hover:bg-black/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={artwork.src} alt="" className="h-14 w-11 rounded-sm bg-[#F5F5F2] object-cover" />
                      <div>
                        <p className="font-serif text-lg text-[#111111]">{artwork.title}</p>
                        <p className="mt-1 text-[10px] text-[#666660]">{artwork.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-[250px] px-4 py-4 text-xs leading-5 text-[#666660]">
                    {artwork.technique || artwork.medium}<br />{artwork.dimensions}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-xs text-[#111111]">{formatAdminPrice(artwork.price)}</td>
                  <td className="px-4 py-4"><StatusBadge>{artwork.status}</StatusBadge></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => openEditor(artwork)} aria-label={`Modifier ${artwork.title}`} className="p-2 text-[#666660] hover:text-[#C5A059]"><Icon name="edit" className="h-4 w-4" /></button>
                      <select value={artwork.status} onChange={(event) => updateArtwork(artwork.id, { status: event.target.value })} aria-label={`Changer le statut de ${artwork.title}`} className="max-w-28 border border-[#E5E5E0] bg-white px-2 py-2 text-[9px] text-[#333333] focus:border-[#C5A059] focus:outline-none">
                        {statuses.map((status) => <option key={status}>{status}</option>)}
                      </select>
                      <button type="button" onClick={() => {
                        if (window.confirm(`Supprimer « ${artwork.title} » du catalogue ?`)) deleteArtwork(artwork.id)
                      }} aria-label={`Supprimer ${artwork.title}`} className="p-2 text-[#666660] hover:text-rose-700"><Icon name="trash" className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan="5" className="px-5 py-14 text-center text-sm text-[#666660]">Aucune œuvre ne correspond à cette recherche.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="border-t border-[#E5E5E0] px-5 py-3 text-[10px] text-[#666660]">{filtered.length} œuvre{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''}</div>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/70" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setEditing(null)
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="artwork-form-title" className="h-full w-full max-w-2xl overflow-y-auto border-l border-[#E5E5E0] bg-white shadow-2xl">
            <form onSubmit={saveArtwork}>
              <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5E5E0] bg-white/95 px-6 py-5 backdrop-blur sm:px-8">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059]">{editing === false ? 'Nouvelle pièce' : 'Édition'}</p>
                  <h2 id="artwork-form-title" className="mt-1 font-serif text-2xl text-[#111111]">{editing ? 'Modifier l’œuvre' : 'Ajouter une œuvre'}</h2>
                </div>
                <button type="button" onClick={() => setEditing(null)} aria-label="Fermer" className="text-[#666660] hover:text-[#111111]"><Icon name="close" /></button>
              </header>
              <div className="space-y-5 px-6 py-6 sm:px-8">
                <ImageUploader value={form.src} onChange={(src) => setForm((current) => ({ ...current, src }))} label="Image de l’œuvre" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Titre" name="title" value={form.title} onChange={updateForm} required />
                  <Field label="Année" name="year" type="number" value={form.year} onChange={updateForm} required />
                  <Field label="Technique" name="technique" value={form.technique} onChange={updateForm} placeholder="Huile et acrylique sur toile" required />
                  <Field label="Dimensions" name="dimensions" value={form.dimensions} onChange={updateForm} placeholder="100 × 80 cm" required />
                  <Field label="Prix (FCFA)" name="price" type="number" min="1" value={form.price} onChange={updateForm} required />
                  <label className="block">
                    <span className="mb-2 block text-[10px] uppercase tracking-[0.17em] text-[#666660]">Statut</span>
                    <select name="status" value={form.status} onChange={updateForm} className="w-full border border-[#E5E5E0] bg-white px-3 py-3 text-sm text-[#111111] focus:border-[#C5A059] focus:outline-none">
                      {statuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.17em] text-[#666660]">Description poétique</span>
                  <textarea name="description" rows="4" value={form.description} onChange={updateForm} className="w-full resize-y border border-[#E5E5E0] bg-white px-3 py-3 text-sm leading-6 text-[#111111] focus:border-[#C5A059] focus:outline-none" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.17em] text-[#666660]">Texte alternatif</span>
                  <input name="alt" value={form.alt} onChange={updateForm} className="w-full border border-[#E5E5E0] bg-white px-3 py-3 text-sm text-[#111111] focus:border-[#C5A059] focus:outline-none" />
                </label>
                {formError && <p role="alert" className="text-xs text-rose-700">{formError}</p>}
              </div>
              <footer className="sticky bottom-0 flex justify-end gap-3 border-t border-[#E5E5E0] bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
                <button type="button" onClick={() => setEditing(null)} className="border border-[#E5E5E0] px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-[#666660] hover:text-[#111111]">Annuler</button>
                <button type="submit" className="bg-[#C5A059] px-5 py-3 text-[9px] uppercase tracking-[0.16em] text-[#111111] hover:brightness-95">Enregistrer l’œuvre</button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </>
  )
}