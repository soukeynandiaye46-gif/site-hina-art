import { useId, useState } from 'react'
import { readImageFile } from '../../services/imageUploadService'

export default function ImageUploader({ value, onChange, label = 'Visuel', aspect = 'aspect-[4/3]' }) {
  const inputId = useId()
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  async function acceptFile(file) {
    if (!file) return
    try {
      const dataUrl = await readImageFile(file)
      onChange(dataUrl)
      setError('')
      setUrl('')
    } catch (readError) {
      setError(readError.message || 'Impossible de charger cette image.')
    }
  }

  function onDrop(event) {
    event.preventDefault()
    void acceptFile(event.dataTransfer.files[0])
  }

  function saveUrl() {
    const nextUrl = url.trim()
    if (!nextUrl) return
    try {
      const parsed = new URL(nextUrl)
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new TypeError()
      onChange(nextUrl)
      setError('')
      setUrl('')
    } catch {
      setError('Saisissez une URL d’image valide (https://…).')
    }
  }

  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#666660]" htmlFor={inputId}>
        {label}
      </label>
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        className={`relative flex ${aspect} items-center justify-center overflow-hidden border border-dashed border-[#E5E5E0] bg-white`}
      >
        {value ? (
          <img src={value} alt={`Aperçu — ${label}`} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <p className="px-5 text-center text-xs leading-5 text-[#666660]">Déposez une image ici ou sélectionnez un fichier</p>
        )}
        <label
          htmlFor={inputId}
          className="absolute bottom-3 right-3 cursor-pointer border border-[#E5E5E0] bg-white/95 px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-[#111111] transition hover:border-[#C5A059] hover:text-[#C5A059]"
        >
          Choisir un fichier
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            void acceptFile(event.target.files[0])
            event.target.value = ''
          }}
        />
      </div>
      <div className="mt-3 flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://…"
          aria-label={`URL de l’image — ${label}`}
          className="min-w-0 flex-1 border border-[#E5E5E0] bg-white px-3 py-2.5 text-xs text-[#111111] placeholder:text-[#666660] focus:border-[#C5A059] focus:outline-none"
        />
        <button type="button" onClick={saveUrl} className="border border-[#E5E5E0] px-3 text-[9px] uppercase tracking-[0.12em] text-[#C5A059] hover:border-[#C5A059]">
          URL
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-rose-700">{error}</p>}
    </div>
  )
}