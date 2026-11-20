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
    src: '/images/image2.jpeg',
    title: 'Le chemin clair',
    medium: 'Paysage',
    alt: 'Composition abstraite avec des bandes blanches, noires, ocre et rouges',
    description: 'Une promenade silencieuse où le vert des collines accompagne le mouvement paisible du troupeau.',
    price: 180000,
  },
  {
    src: '/images/image3.jpeg',
    title: 'Nuit ouverte',
    medium: 'Acrylique',
    alt: 'Figure assise aux formes stylisées sur un fond rouge, bleu et blanc',
    description: 'Des éclats chauds traversent un bleu profond, comme les dernières lumières d’une ville à la nuit tombée.',
    price: 220000,
  },
  {
    src: '/images/image4.jpeg',
    title: 'Veine pourpre',
    medium: 'Encre fluide',
    alt: 'Silhouette aux bras ouverts sur un fond coloré bleu, vert et orange',
    description: 'Des encres en mouvement dessinent des courants imprévisibles entre transparence et intensité.',
    price: 160000,
  },
  {
    src: '/images/image5.jpeg',
    title: 'Le lac haut',
    medium: 'Aquarelle',
    alt: 'Figure stylisée aux tons clairs sur un fond bleu, jaune et vert',
    description: 'Au bord d’un lac d’altitude, une présence discrète révèle la quiétude d’un paysage préservé.',
    price: 195000,
  },
  {
    src: '/images/image6.jpeg',
    title: 'Salle blanche',
    medium: 'Espace',
    alt: 'Silhouette assise aux motifs colorés sur un fond orange',
    description: 'Un espace ouvert où la lumière relie les œuvres et invite à prendre le temps de les regarder.',
    price: 250000,
  },
  {
    src: '/images/hina-acceuil-1.jpeg',
    title: 'Or et bitume',
    medium: 'Mixte',
    alt: 'Visages stylisés sur un fond rouge et orange',
    description: 'L’or lumineux et le noir profond se rencontrent dans une composition organique, libre et contrastée.',
    price: 210000,
  },
  {
    src: '/images/hina-acceuil-2.jpeg',
    title: 'Deux silences',
    medium: 'Dessin',
    alt: 'Portrait peint d’une femme portant un turban sur un fond jaune',
    description: 'Deux oiseaux se répondent dans un dessin délicat, suspendus au calme d’une branche fleurie.',
    price: 145000,
  },
  {
    src: '/images/hina-acceuil-3.jpeg',
    title: 'Le geste',
    medium: 'Atelier',
    alt: 'Main noire portant un globe au-dessus d’une ville, sur un fond rouge et bleu',
    description: 'La trace des pinceaux et la chaleur des pigments racontent l’énergie du travail en atelier.',
    price: 175000,
  },
]

export function formatPrice(price) {
  return `${new Intl.NumberFormat('fr-FR').format(price)} FCFA`
}

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
]
