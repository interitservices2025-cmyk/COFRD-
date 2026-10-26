import { EventItem, GovernanceMember, MemberOrganization, NewsArticle, PartnerItem } from './types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-carl-mayotte-2026',
    slug: 'spectacle-carl-mayotte-2026',
    title: 'Spectacle communautaire avec Carl Mayotte',
    subtitle: 'Une soirée jazz et fusion électrisante au cœur de la francophonie',
    description: 'Le bassiste virtuose et compositeur Carl Mayotte présente un concert jazz fusion exceptionnel avec son quintet.',
    longDescription: 'Révélation Radio-Canada Jazz et récipiendaire d’un prix Félix, Carl Mayotte s’est imposé comme l’un des plus grands jeunes bassistes et compositeurs au pays. Accompagné de musiciens d’exception, il transforme la musique jazz-fusion en un voyage virtuose, énergique et communicatif. Un événement phare de la Saison Culturelle du COFRD à ne pas manquer !',
    artist: 'Carl Mayotte Quintet',
    dateStart: '2026-11-20T20:00:00',
    dateEnd: '2026-11-20T22:30:00',
    locationName: 'Amicale de Whitby',
    address: '711 Dundas St W',
    city: 'Whitby, ON',
    postalCode: 'L1N 2N6',
    category: 'Spectacle',
    isFree: false,
    priceMin: 25,
    priceCategories: [
      { name: 'Admission Générale', price: 25, description: 'Billet régulier' },
      { name: 'Membres COFRD & Aînés', price: 20, description: 'Tarif réduit membres et 65+' },
      { name: 'Étudiants & Jeunesse', price: 15, description: 'Sur présentation de carte étudiante' },
    ],
    capacity: 120,
    reservedCount: 42,
    registrationDeadline: '2026-11-20T18:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'published',
    notes: 'Service de bar sans alcool et collation offert par le COFRD.'
  },
  {
    id: 'evt-melissa-ouimet-2026',
    slug: 'spectacle-melissa-ouimet-2026',
    title: 'Spectacle communautaire avec Melissa Ouimet',
    subtitle: 'Rock et pop francophone puissante pour la Semaine de la francophonie',
    description: 'La flamboyante auteure-compositrice franco-ontarienne Melissa Ouimet enflamme la scène de Durham.',
    longDescription: 'Originaire de St-Albert en Ontario, Melissa Ouimet est une figure incontournable du rock francophone canadien. Avec sa voix puissante et son énergie scénique contagieuse, elle propose un répertoire vibrant qui rassemble toute la communauté.',
    artist: 'Melissa Ouimet',
    dateStart: '2026-12-05T20:00:00',
    dateEnd: '2026-12-05T22:00:00',
    locationName: 'ÉSC Saint-Charles-Garnier — Salle Olga Lambert',
    address: '4101 Baldwin St S',
    city: 'Whitby, ON',
    postalCode: 'L1R 2W6',
    category: 'Spectacle',
    isFree: true,
    capacity: 250,
    reservedCount: 185,
    registrationDeadline: '2026-12-05T17:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'published',
    notes: 'Activité gratuite avec réservation obligatoire.'
  },
  {
    id: 'evt-semaine-francophonie-bts-2026',
    slug: 'semaine-francophonie-groupe-bts-2026',
    title: 'Semaine de la Francophonie avec le Groupe BTS',
    subtitle: 'Grande journée culturelle, musique et partage culinaire',
    description: 'Célébrons ensemble la vitalité et la diversité de notre communauté avec animations et musiques du monde.',
    longDescription: 'Une journée complète dédiée au rayonnement francophone avec kiosques culturels, prestations d’artistes locaux et spectacle principal du groupe BTS. Des activités pour toute la famille, enfants, jeunes et aînés.',
    artist: 'Groupe BTS & Artistes invités',
    dateStart: '2027-03-27T13:00:00',
    dateEnd: '2027-03-27T19:00:00',
    locationName: 'ÉSC Saint-Charles-Garnier — Salle Olga Lambert',
    address: '4101 Baldwin St S',
    city: 'Whitby, ON',
    postalCode: 'L1R 2W6',
    category: 'Célébration',
    isFree: true,
    capacity: 300,
    reservedCount: 140,
    registrationDeadline: '2027-03-27T12:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    status: 'published'
  },
  {
    id: 'evt-camp-artistique-2026',
    slug: 'camp-artistique-jeunesse-2026',
    title: 'Camp artistique de la relâche pour les jeunes',
    subtitle: 'Théâtre, musique, arts visuels et création en français',
    description: 'Une semaine d’immersion artistique animée par des professionnels pour les élèves de 7 à 14 ans.',
    longDescription: 'Offrez à vos enfants une expérience inoubliable pour développer leur créativité en français ! Au programme : ateliers d’improvisation théâtrale, initiation musicale, dessin et création d’un spectacle de fin de camp.',
    dateStart: '2027-03-15T10:00:00',
    dateEnd: '2027-03-19T15:00:00',
    locationName: 'Paroisse Assomption de Notre-Dame',
    address: '384 Hillside Ave',
    city: 'Oshawa, ON',
    postalCode: 'L1H 5Y8',
    category: 'Jeunesse',
    isFree: false,
    priceMin: 50,
    priceCategories: [
      { name: 'Inscription semaine complète', price: 50, description: 'Matériel et collation inclus' }
    ],
    capacity: 35,
    reservedCount: 28,
    registrationDeadline: '2027-03-10T23:59:00',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    status: 'published'
  },
  {
    id: 'evt-fiesta-st-pierre-2026',
    slug: 'fiesta-2026-avec-les-st-pierre',
    title: 'Fiesta 2026 avec les St Pierre',
    subtitle: 'Grande fête estivale de clôture de la saison culturelle',
    description: 'Concerts en plein air, musique folklorique et moderne, barbecue communautaire et jeux pour tous.',
    longDescription: 'La Fiesta annuelle du COFRD célèbre la fin de l’année scolaire et la Saint-Jean-Baptiste avec une programmation festive exceptionnelle en collaboration avec le groupe folklorique et dynamique Les St Pierre.',
    artist: 'Les St Pierre',
    dateStart: '2027-06-25T11:00:00',
    dateEnd: '2027-06-26T19:00:00',
    locationName: 'Paroisse Assomption de Notre-Dame',
    address: '384 Hillside Ave',
    city: 'Oshawa, ON',
    postalCode: 'L1H 5Y8',
    category: 'Célébration',
    isFree: true,
    capacity: 400,
    reservedCount: 75,
    registrationDeadline: '2027-06-25T10:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    status: 'published'
  },
  {
    id: 'evt-brunch-litteraire-2026',
    slug: 'brunch-litteraire-durham-2026',
    title: 'Brunch Littéraire du COFRD',
    subtitle: 'Rencontre intime avec les autrices et auteurs francophones de l’Ontario',
    description: 'Échangez autour de lectures inspirantes, de café et de viennoiseries lors de notre brunch littéraire.',
    longDescription: 'À l’occasion de la sortie des récits « Vivre sa francophonie dans la région de Durham », venez entendre les témoignages poignants et inspirants de personnes immigrantes francophones qui façonnent notre communauté.',
    dateStart: '2026-11-14T10:00:00',
    dateEnd: '2026-11-14T12:30:00',
    locationName: 'École Ronald-Marion',
    address: '2235 Brock Rd',
    city: 'Pickering, ON',
    postalCode: 'L1V 2P8',
    category: 'Littérature',
    isFree: true,
    capacity: 60,
    reservedCount: 45,
    registrationDeadline: '2026-11-14T09:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    status: 'published'
  },
  {
    id: 'evt-spectacle-katia-2026',
    slug: 'spectacle-katia-2026',
    title: 'Spectacle communautaire avec Katia',
    subtitle: 'Musiques acoustiques, voix envoûtante et sensibilité francophone',
    description: 'Une soirée intimiste et poétique au St. Francis Centre for Community, Arts and Culture.',
    longDescription: 'Katia séduit les publics par des mélodies sensibles et des textes profonds, naviguant entre chanson à texte et pop folk acoustique.',
    artist: 'Katia',
    dateStart: '2027-01-23T16:00:00',
    dateEnd: '2027-01-23T20:00:00',
    locationName: 'St. Francis Centre for Community, Arts and Culture',
    address: '78 Church St S',
    city: 'Ajax, ON',
    postalCode: 'L1S 6B3',
    category: 'Spectacle',
    isFree: false,
    priceMin: 15,
    priceCategories: [
      { name: 'Entrée standard', price: 15, description: 'Place assise' }
    ],
    capacity: 100,
    reservedCount: 65,
    registrationDeadline: '2027-01-23T15:00:00',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    status: 'published'
  }
];

export const GOVERNANCE_MEMBERS: GovernanceMember[] = [
  {
    id: 'gov-1',
    name: 'Mme Wilhelmine Babua',
    role: 'Présidente du Conseil d’Administration',
    category: 'ca',
    bio: 'Engagée de longue date pour les droits et l’épanouissement des francophones en Ontario.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-2',
    name: 'Mme Hélène Boudreau',
    role: 'Vice-Présidente',
    category: 'ca',
    bio: 'Spécialiste de la concertation communautaire et des partenariats régionaux.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-3',
    name: 'Mme Monique Agbodjalou',
    role: 'Trésorière',
    category: 'ca',
    bio: 'Experte en gestion financière rigoureuse pour les organismes sans but lucratif.',
    imageUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-4',
    name: 'M. Pierre Djungandeke',
    role: 'Secrétaire',
    category: 'ca',
    bio: 'Veille à la gouvernance saine et à la conformité institutionnelle du conseil.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-5',
    name: 'Mme Vera Ngo Baniny',
    role: 'Administratrice',
    category: 'ca',
    bio: 'Porte-voix active des familles et des nouveaux arrivants francophones.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-6',
    name: 'Mme Maryem Chajar, BA',
    role: 'Administratrice',
    category: 'ca',
    bio: 'Spécialiste en éducation et en intégration culturelle intergénérationnelle.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-7',
    name: 'Mme Blaise Nengo Buata',
    role: 'Administratrice',
    category: 'ca',
    bio: 'Dévouée au développement des services d’inclusion sociale et professionnelle.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-8',
    name: 'M. Alexis Maquin',
    role: 'Administrateur',
    category: 'ca',
    bio: 'Apporte son expertise en stratégie de communication et valorisation de la jeunesse.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-9',
    name: 'M. Riadh Abidi',
    role: 'Administrateur',
    category: 'ca',
    bio: 'Mobilisateur communautaire pour le développement économique et entrepreneurial francophone.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'gov-10',
    name: 'M. Boluwa Massina',
    role: 'Directeur Général du COFRD',
    category: 'direction',
    bio: 'Direction générale et gestion opérationnelle : coordonne les équipes, déploie les programmes et assure la liaison stratégique avec les bailleurs de fonds.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  }
];

export const MEMBER_ORGANIZATIONS: MemberOrganization[] = [
  { id: 'm1', name: "Association des femmes canadiennes-françaises d'Oshawa", affiliationDate: 'Mai 1981', category: 'communautaire' },
  { id: 'm2', name: 'Conseil scolaire Viamonde (anciennement CCFL du Conseil de Durham)', affiliationDate: 'Juin 1981 / 2011', category: 'scolaire' },
  { id: 'm3', name: "Conseil d'école de Corpus-Christi", affiliationDate: 'Avril 1982 / 1997', category: 'scolaire' },
  { id: 'm4', name: 'Association des enseignants et des enseignantes franco-ontariens (A.E.F.O.)', affiliationDate: 'Avril 1982 / 1998', category: 'communautaire' },
  { id: 'm5', name: 'Paroisse Assomption-de-Notre-Dame', affiliationDate: 'Septembre 1983', category: 'communautaire' },
  { id: 'm6', name: 'Chevaliers de Colomb, Conseil Notre-Dame 8549', affiliationDate: 'Mai 1986', category: 'communautaire' },
  { id: 'm7', name: "Conseil d'école de Notre-Dame-de-la-Jeunesse", affiliationDate: 'Février 1986 / 1997', category: 'scolaire' },
  { id: 'm8', name: 'Conseil scolaire catholique MonAvenir (anciennement CSDC Centre-Sud)', affiliationDate: 'Novembre 1988 / 2017', category: 'scolaire' },
  { id: 'm9', name: "Conseil d'école de Saint-Charles-Garnier", affiliationDate: 'Mai 1989 / 1997', category: 'scolaire' },
  { id: 'm10', name: 'Le Conseil de services de garde « Les Lucioles Inc »', affiliationDate: 'Mai 1991', category: 'service' },
  { id: 'm11', name: "Conseil d'école Antonine-Maillet", affiliationDate: 'Mai 1998', category: 'scolaire' },
  { id: 'm12', name: "L'Assemblée des communautés francophones de l'Ontario (ACFO) Durham-Peterborough", affiliationDate: 'Mai 2001 / 2007', category: 'communautaire' },
  { id: 'm13', name: 'Caisse Desjardins Ontario (anciennement Caisse Les Voyageurs)', affiliationDate: 'Mai 2002 / 2021', category: 'service' },
  { id: 'm14', name: 'Mouvement Cursillo', affiliationDate: 'Mai 2003', category: 'communautaire' },
  { id: 'm15', name: 'Club Optimiste francophone de Durham', affiliationDate: 'Mai 2005', category: 'communautaire' },
  { id: 'm16', name: "Conseil d'école Jean-Paul II", affiliationDate: 'Juin 2007', category: 'scolaire' },
  { id: 'm17', name: "L'Association des élèves du secondaire de notre district (AESD)", affiliationDate: 'Septembre 2008', category: 'scolaire' },
  { id: 'm18', name: 'Le théâtre communautaire « Le Trait d’Union »', affiliationDate: 'Septembre 2008', category: 'communautaire' },
  { id: 'm19', name: "Conseil d'école Mgr Jamot", affiliationDate: 'Septembre 2011', category: 'scolaire' },
  { id: 'm20', name: 'Catholic Family Services of Durham', affiliationDate: 'Septembre 2013', category: 'service' },
  { id: 'm21', name: "Conseil d'école Ronald-Marion", affiliationDate: 'Septembre 2014', category: 'scolaire' },
  { id: 'm22', name: 'People of Motherland – Un monde de culture', affiliationDate: 'Septembre 2015', category: 'communautaire' },
  { id: 'm23', name: 'FEÉSO Unité 64', affiliationDate: 'Septembre 2015', category: 'communautaire' },
  { id: 'm24', name: "Conseil d'école Viola-Léger", affiliationDate: 'Septembre 2019', category: 'scolaire' },
  { id: 'm25', name: "Société d'Alzheimer de la région de Durham", affiliationDate: 'Septembre 2019', category: 'service' },
  { id: 'm26', name: "Les éditions Terre d'accueil", affiliationDate: 'Septembre 2020', category: 'communautaire' },
  { id: 'm27', name: "Association Familles de l'est", affiliationDate: 'Septembre 2023', category: 'communautaire' },
  { id: 'm28', name: 'Mboart', affiliationDate: 'Septembre 2025', category: 'communautaire' },
  { id: 'm29', name: 'ACIRT', affiliationDate: 'Septembre 2025', category: 'communautaire' }
];

export const AFFILIATED_SCHOOLS = [
  { name: 'École catholique Corpus-Christi', year: '1963', city: 'Oshawa' },
  { name: 'École catholique Notre-Dame de la Jeunesse', year: '1986', city: 'Ajax' },
  { name: 'École secondaire catholique Saint-Charles-Garnier', year: '1987', city: 'Whitby' },
  { name: 'École publique Antonine-Maillet', year: '1997', city: 'Oshawa' },
  { name: 'École catholique Monseigneur-Jamot', year: '2001', city: 'Peterborough' },
  { name: 'École catholique Jean-Paul II', year: '2005', city: 'Whitby' },
  { name: 'École Ronald-Marion', year: '2013', city: 'Pickering' },
  { name: 'École Viola-Léger', year: '2018', city: 'Bowmanville' }
];

export const OFFICIAL_PARTNERS: PartnerItem[] = [
  { id: 'p1', name: 'Gouvernement de l’Ontario', category: 'gouvernemental', logoUrl: '/partners/ontario.png' },
  { id: 'p2', name: 'Ministère de la Justice du Canada', category: 'gouvernemental', logoUrl: '/partners/justice-canada.svg' },
  { id: 'p3', name: 'Patrimoine Canadien / Canadian Heritage', category: 'gouvernemental', logoUrl: '/partners/patrimoine-canadien.png' },
  { id: 'p4', name: 'IRCC — Immigration, Réfugiés et Citoyenneté Canada', category: 'gouvernemental', logoUrl: '/partners/ircc.svg' },
  { id: 'p5', name: 'Conseil des Arts de l’Ontario', category: 'arts', logoUrl: '/partners/conseil-des-arts-ontario.png' },
  { id: 'p6', name: 'Caisse Desjardins Ontario', category: 'financier', logoUrl: '/partners/desjardins.png' },
  { id: 'p7', name: 'Emploi Ontario', category: 'gouvernemental', logoUrl: '/partners/emploi-ontario.svg' },
  { id: 'p8', name: 'Conseil scolaire catholique MonAvenir', category: 'scolaire', logoUrl: '/partners/monavenir.png' },
  { id: 'p9', name: 'Conseil scolaire Viamonde', category: 'scolaire', logoUrl: '/partners/viamonde.png' },
  { id: 'p10', name: 'Collège La Cité', category: 'scolaire', logoUrl: '/partners/la-cite.png' }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'art-livre-numerique',
    slug: 'livre-numerique-vivre-sa-francophonie-durham',
    title: 'Parution du livre : Vivre sa francophonie dans la région de Durham',
    excerpt: 'Fruit d’ateliers d’écriture stimulants, ce recueil documente les parcours inspirants de quatre femmes immigrantes francophones.',
    content: `Le COFRD célèbre la francophonie sous toutes ses couleurs à l’occasion de la Semaine de la francophonie. Le projet "Vivre sa francophonie dans la Région de Durham" vise à renforcer l’inclusion, la fierté identitaire et la vitalité francophone dans la région de Durham.

Fruit d’ateliers d’écriture offerts aux nouveaux arrivants francophones, ce recueil documente avec authenticité le parcours courageux de quatre femmes immigrantes francophones jusqu’à notre belle région de Durham. 

Le livre numérique est accessible gratuitement au format PDF pour l'ensemble des membres et du public.`,
    date: '2026-03-20',
    category: 'Culture & Communauté',
    author: 'Direction Générale COFRD',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    published: true
  },
  {
    id: 'art-lancement-saison-culturelle',
    slug: 'succes-lancement-saison-culturelle-abel-maxwell',
    title: 'Un lancement historique pour la Saison Culturelle et les 50 ans du drapeau franco-ontarien',
    excerpt: 'Plus de 250 membres de la communauté réunis pour chanter et célébrer notre fierté avec Abel Maxwell.',
    content: `C’est devant une salle comble à l’École secondaire catholique Saint-Charles-Garnier que s’est tenu le lancement officiel de notre nouvelle saison artistique et culturelle. 

Coïncidant avec le 50e anniversaire du drapeau franco-ontarien, la soirée a vibré au rythme des créations de l'artiste Abel Maxwell. Le COFRD remercie chaleureusement ses partenaires financiers et bénévoles sans qui une telle fête n'aurait été possible.`,
    date: '2025-10-02',
    category: 'Événements',
    author: 'Équipe Culturelle COFRD',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    published: true
  },
  {
    id: 'art-soutien-juridique-racise',
    slug: 'renforcement-programme-justice-civile',
    title: 'Nouveaux ateliers juridiques gratuits pour les personnes racisées et nouveaux arrivants',
    excerpt: 'Des séances d’information animées par des avocats et notaires pour mieux comprendre ses droits et le système judiciaire canadien.',
    content: `Le Programme de soutien juridique pour la communauté francophone racisée de Durham étend ses services ! En plus des consultations individuelles sur rendez-vous, une série de 6 ateliers communautaires abordera des thèmes essentiels :
- Les droits et obligations du locataire
- Le droit de la famille et la garde d'enfants
- Les démarches de médiation et de résolution amiable des conflits
- La sécurité au travail et le droit d'emploi.

Contactez directement notre coordonnatrice Mme Adele Mbelle Nkelle pour réserver votre place.`,
    date: '2026-01-15',
    category: 'Justice & Droits',
    author: 'Pôle Juridique COFRD',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    published: true
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'res-101',
    reservationCode: 'COFRD-2026-89AF1',
    eventId: 'evt-carl-mayotte-2026',
    eventTitle: 'Spectacle communautaire avec Carl Mayotte',
    eventDate: '2026-04-24T20:00:00',
    fullName: 'Jean-Luc Tremblay',
    email: 'jl.tremblay@example.ca',
    phone: '(905) 555-0143',
    ticketCount: 2,
    categoryName: 'Admission Générale',
    unitPrice: 25,
    totalAmount: 50,
    isPaid: true,
    paymentMethod: 'stripe' as const,
    paymentReference: 'ch_3N89q4LkdIwHuV12',
    status: 'confirmed' as const,
    createdAt: '2026-04-10T14:32:00',
    notes: 'Placement proche scène'
  },
  {
    id: 'res-102',
    reservationCode: 'COFRD-2026-B32C9',
    eventId: 'evt-melissa-ouimet-2026',
    eventTitle: 'Spectacle communautaire avec Melissa Ouimet',
    eventDate: '2026-03-21T20:00:00',
    fullName: 'Fatoumata Diallo',
    email: 'fatou.diallo@example.com',
    phone: '(289) 555-8912',
    ticketCount: 3,
    categoryName: 'Gratuit',
    unitPrice: 0,
    totalAmount: 0,
    isPaid: true,
    paymentMethod: 'free' as const,
    status: 'confirmed' as const,
    createdAt: '2026-03-05T09:15:00'
  }
];
