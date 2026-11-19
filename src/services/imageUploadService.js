const MAX_IMAGE_SIZE = 8 * 1024 * 1024

// Local storage currently uses data URLs; replace this function with a Cloudinary
// or Supabase upload and return the resulting public URL when cloud storage is ready.
export function readImageFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    return Promise.reject(new TypeError('Choisissez un fichier image valide.'))
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return Promise.reject(new RangeError('L’image ne doit pas dépasser 8 Mo en mode local.'))
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('La prévisualisation de cette image est indisponible.'))
        return
      }
      resolve(reader.result)
    }
    reader.onerror = () => reject(reader.error || new Error('La lecture de l’image a échoué.'))
    reader.readAsDataURL(file)
  })
}