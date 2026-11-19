import { galleryWorks, heroSlides } from './site'

export const initialArtworks = galleryWorks.map((work, index) => ({
  ...work,
  id: `hina-${index + 1}`,
  year: 2024 + (index % 2),
  dimensions: ['100 × 80 cm', '80 × 100 cm', '60 × 80 cm', '90 × 70 cm'][index % 4],
  technique: work.medium,
  status: index === 6 ? 'Réservée' : index === 7 ? 'Vendue' : 'Disponible',
}))

export const initialHeroSlides = heroSlides.map((slide, index) => ({
  ...slide,
  title: ['Présence', 'La lumière intérieure', 'Un monde à tenir'][index],
  caption: [
    'Figures et couleurs, dans le calme de l’atelier.',
    'Une étude de lumière aux tons solaires.',
    'La matière raconte le lien entre les mondes.',
  ][index],
}))

export const initialOrders = [
  {
    id: 'HA-2025-018',
    customer: 'Camille Moreau',
    artwork: initialArtworks[2].title,
    amount: initialArtworks[2].price,
    date: '2025-03-16',
    status: 'Emballage caisse d’art',
  },
  {
    id: 'HA-2025-017',
    customer: 'Élodie Bernard',
    artwork: initialArtworks[5].title,
    amount: initialArtworks[5].price,
    date: '2025-03-13',
    status: 'Expédiée',
  },
  {
    id: 'HA-2025-016',
    customer: 'Nicolas Diallo',
    artwork: initialArtworks[0].title,
    amount: initialArtworks[0].price,
    date: '2025-03-10',
    status: 'Livrée',
  },
]

export const initialInquiries = [
  {
    id: 'message-1',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.com',
    subject: 'Commande sur mesure',
    message: 'Bonjour, je souhaiterais échanger au sujet d’un format vertical pour mon entrée.',
    date: '2025-03-18',
    read: false,
    type: 'Sur mesure',
  },
  {
    id: 'message-2',
    name: 'Thomas Kébé',
    email: 'thomas.kebe@example.com',
    subject: 'Disponibilité de Nuit ouverte',
    message: 'Bonjour, pourriez-vous me confirmer les dimensions et les modalités de livraison ?',
    date: '2025-03-17',
    read: true,
    type: 'Œuvre',
  },
  {
    id: 'message-3',
    name: 'Aïcha Fall',
    email: 'aicha.fall@example.com',
    subject: 'Visite de l’atelier',
    message: 'Je serai à Paris la semaine prochaine et aimerais découvrir votre travail.',
    date: '2025-03-15',
    read: true,
    type: 'Contact',
  },
]
