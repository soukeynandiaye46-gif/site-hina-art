/**
 * Contenu éditorial et coordonnées de HINA Art.
 * Remplacez les visuels, le téléphone, l'e-mail et les profils sociaux
 * par ceux de la marque avant mise en ligne.
 *
 * WhatsApp : renseignez `number` au format international, chiffres seuls
 * (ex. 33612345678), puis passez `enabled` à true.
 */
export const whatsapp = {
  enabled: false,
  number: '',
  message: 'Bonjour HINA Art, je souhaite passer une commande.',
}

export function whatsappUrl(text = whatsapp.message) {
  if (!whatsapp.enabled || !whatsapp.number) return null
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(text)}`
}

export const contactDetails = {
  phone: '+33 1 86 95 20 14',
  phoneHref: 'tel:+33186952014',
  email: 'atelier@hina-art.fr',
  address: '18 rue Charlot',
  city: '75003 Paris',
  mapsHref: 'https://maps.google.com/?q=18+rue+Charlot+75003+Paris',
}

export const navLinks = [
  { href: '#accueil', id: 'accueil', label: 'Accueil' },
  { href: '#a-propos', id: 'a-propos', label: 'À propos' },
  { href: '#gallery', id: 'gallery', label: 'Gallery' },
  { href: '#contact', id: 'contact', label: 'Contact' },
]

export const heroSlides = [
  {
    src: '/images/hina-accueil-1.jpeg',
    alt: 'Tableau aux visages stylisés sur un fond rouge et orange',
  },
  {
    src: '/images/hina-accueil-2.jpeg',
    alt: 'Portrait peint d’une femme sur fond jaune',
  },
  {
    src: '/images/hina-accueil-3.jpeg',
    alt: 'Main noire portant un globe au-dessus d’une ville sur fond rouge et bleu',
  },
]

export const galleryWorks = [
  {
    src: '/images/gallery-1.jpg',
    title: 'Le chemin clair',
    medium: 'Paysage',
    alt: 'Paysage verdoyant avec un troupeau le long d’un chemin de village',
  },
  {
    src: '/images/gallery-2.jpg',
    title: 'Nuit ouverte',
    medium: 'Acrylique',
    alt: 'Peinture abstraite bleu nuit traversée de traits orange et rouges',
  },
  {
    src: '/images/gallery-3.jpg',
    title: 'Veine pourpre',
    medium: 'Encre fluide',
    alt: 'Composition fluide aux volutes magenta, violettes et blanches',
  },
  {
    src: '/images/gallery-4.jpg',
    title: 'Le lac haut',
    medium: 'Aquarelle',
    alt: 'Paysage de montagne, lac et cerf au premier plan',
  },
  {
    src: '/images/gallery-5.jpg',
    title: 'Salle blanche',
    medium: 'Espace',
    alt: 'Grande salle d’exposition blanche avec des œuvres accrochées',
  },
  {
    src: '/images/gallery-6.jpg',
    title: 'Or et bitume',
    medium: 'Mixte',
    alt: 'Peinture fluide jaune, noire et blanche aux motifs organiques',
  },
  {
    src: '/images/gallery-7.jpg',
    title: 'Deux silences',
    medium: 'Dessin',
    alt: 'Illustration de deux oiseaux posés sur une liane fleurie',
  },
  {
    src: '/images/gallery-8.jpg',
    title: 'Le geste',
    medium: 'Atelier',
    alt: 'Pinceaux chargés de peinture rouge et jaune sur une toile orangée',
  },
]

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
]
