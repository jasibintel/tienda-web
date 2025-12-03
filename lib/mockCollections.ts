// ============================================
// Mock Collections Data - De Gloria en Gloria
// ============================================

import { Collection } from './types';

export const mockCollections: Collection[] = [
    {
        id: 'fundamentos-fe',
        name: 'Serie: Fundamentos de la Fe',
        slug: 'fundamentos-fe',
        descriptionShort: 'Colección diseñada para guiarte paso a paso en el conocimiento profundo de la Palabra.',
        descriptionLong: 'Esta serie de 5 libros te llevará desde los conceptos básicos de la fe cristiana hasta una comprensión profunda de la doctrina bíblica. Cada libro está diseñado para construir sobre el anterior, creando una base sólida para tu crecimiento espiritual.',
        bannerUrl: '/images/book-placeholder.svg', // Placeholder
        books: ['1', '2', '3', '4', '5'], // IDs de libros
        order: 1,
        isActive: true,
        hasReadingOrder: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'poder-oracion',
        name: 'Trilogía: El Poder de la Oración',
        slug: 'poder-oracion',
        descriptionShort: 'Descubre los secretos de una vida de oración transformadora a través de estos tres libros complementarios.',
        descriptionLong: 'Esta trilogía te guiará en un viaje profundo hacia una vida de oración poderosa y efectiva. Desde los fundamentos hasta las prácticas avanzadas, aprenderás a comunicarte con Dios de manera transformadora.',
        bannerUrl: '/images/book-placeholder.svg',
        books: ['1', '6', '7'], // IDs de libros
        order: 2,
        isActive: true,
        hasReadingOrder: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'liderazgo-cristiano',
        name: 'Colección: Liderazgo Cristiano',
        slug: 'liderazgo-cristiano',
        descriptionShort: 'Recursos esenciales para pastores, líderes y maestros que desean impactar su comunidad.',
        descriptionLong: 'Una colección completa de recursos para el desarrollo de líderes cristianos efectivos. Incluye principios bíblicos, estrategias prácticas y testimonios inspiradores de líderes que han transformado sus comunidades.',
        bannerUrl: '/images/book-placeholder.svg',
        books: ['2', '8', '9', '10', '11', '12', '13'], // 7 libros
        order: 3,
        isActive: true,
        hasReadingOrder: false,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'devocionales-ano',
        name: 'Serie: Devocionales para el Año',
        slug: 'devocionales-ano',
        descriptionShort: 'Un viaje espiritual de 12 meses con devocionales diseñados para cada temporada del año.',
        descriptionLong: 'Doce libros devocionales, uno para cada mes del año, diseñados para acompañarte en tu crecimiento espiritual a lo largo de las diferentes temporadas. Cada libro contiene reflexiones diarias, versículos clave y aplicaciones prácticas.',
        bannerUrl: '/images/book-placeholder.svg',
        books: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], // 12 libros
        order: 4,
        isActive: true,
        hasReadingOrder: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'maestros-escuela-dominical',
        name: 'Colección: Para Maestros de Escuela Dominical',
        slug: 'maestros-escuela-dominical',
        descriptionShort: 'Herramientas prácticas y recursos pedagógicos para enseñar la Palabra con excelencia.',
        descriptionLong: 'Recursos especializados para maestros de escuela dominical que desean llevar sus clases al siguiente nivel. Incluye metodologías de enseñanza, actividades creativas, lecciones preparadas y consejos prácticos para mantener la atención de los estudiantes.',
        bannerUrl: '/images/book-placeholder.svg',
        books: ['14', '15', '16', '17', '18', '19'], // 6 libros
        order: 5,
        isActive: true,
        hasReadingOrder: false,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    }
];

// Helper functions
export function getActiveCollections(): Collection[] {
    return mockCollections
        .filter(c => c.isActive)
        .sort((a, b) => a.order - b.order);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
    return mockCollections.find(c => c.slug === slug && c.isActive);
}

export function getCollectionById(id: string): Collection | undefined {
    return mockCollections.find(c => c.id === id);
}
