// ============================================
// Mock Data - De Gloria en Gloria
// ============================================

import { Book, Testimonial } from './types';

// Featured Books
export const featuredBooks: Book[] = [
    {
        id: '1',
        title: 'El Poder de la Oración Transformadora',
        subtitle: 'Descubre cómo la oración profunda puede revolucionar tu vida espiritual y ministerio',
        author: 'Dr. Samuel Martínez',
        coverUrl: '/images/book-placeholder.svg',
        price: 35000,
        isFree: false,
        featured: true,
        description: 'Un recurso práctico y profundo que te guiará paso a paso en el desarrollo de una vida de oración poderosa y efectiva.',
        category: 'devocionales',
        audience: 'adultos',
        formats: ['PDF', 'EPUB'],
        descriptionLong: 'La oración es el fundamento de toda vida cristiana vibrante y efectiva. Sin embargo, muchos creyentes luchan por desarrollar una vida de oración consistente y poderosa. Este libro nace de años de experiencia pastoral y enseñanza bíblica, diseñado específicamente para ayudarte a transformar tu tiempo con Dios.\n\nA través de estas páginas, descubrirás principios bíblicos probados que han transformado la vida de oración de miles de creyentes alrededor del mundo. No se trata de fórmulas mágicas ni de técnicas superficiales, sino de fundamentos sólidos basados en la Palabra de Dios y la guía del Espíritu Santo.\n\nEl Dr. Samuel Martínez combina enseñanza teológica profunda con aplicaciones prácticas que puedes implementar inmediatamente. Cada capítulo incluye ejercicios de reflexión, modelos de oración y testimonios reales de transformación.\n\nEste recurso es ideal tanto para nuevos creyentes que desean establecer una base sólida de oración, como para cristianos maduros que buscan profundizar y renovar su comunión con Dios.',
        learningPoints: [
            'Establecer una rutina de oración diaria consistente y significativa',
            'Comprender los diferentes tipos de oración y cuándo usar cada uno',
            'Superar las distracciones y obstáculos comunes en la vida de oración',
            'Orar con fe y confianza basándote en las promesas de Dios',
            'Interceder efectivamente por tu familia, iglesia y nación',
            'Discernir la voz de Dios y recibir dirección clara en tus decisiones',
            'Experimentar el poder transformador de la oración en tu vida diaria',
            'Enseñar a otros a desarrollar una vida de oración poderosa'
        ],
        targetAudience: [
            {
                icon: 'person',
                title: 'Nuevos Creyentes',
                description: 'Si eres nuevo en la fe y deseas establecer fundamentos sólidos en tu vida de oración desde el principio.'
            },
            {
                icon: 'users',
                title: 'Líderes y Pastores',
                description: 'Para quienes desean profundizar su vida de oración y enseñar a otros a orar con poder y efectividad.'
            },
            {
                icon: 'book',
                title: 'Cristianos Maduros',
                description: 'Si buscas renovar tu pasión por la oración y llevar tu comunión con Dios a un nivel más profundo.'
            },
            {
                icon: 'home',
                title: 'Grupos de Estudio',
                description: 'Ideal para grupos pequeños, células o estudios bíblicos que deseen crecer juntos en la oración.'
            }
        ],
        pages: 248,
        fileSize: {
            pdf: '5.2 MB',
            epub: '2.8 MB'
        },
        language: 'Español',
        publishedDate: 'Diciembre 2024',
        isbn: '978-958-12345-1-0',
        publisher: 'De Gloria en Gloria'
    },
    {
        id: '2',
        title: 'Liderazgo con Propósito',
        author: 'Pastor Carlos Gómez',
        coverUrl: '/images/book-placeholder.svg',
        price: 42000,
        isFree: false,
        featured: true,
        description: 'Principios bíblicos para un liderazgo efectivo y transformador.',
        category: 'maestros',
        audience: 'adultos',
        formats: ['PDF']
    },
    {
        id: '3',
        title: 'La Familia según el Corazón de Dios',
        author: 'María Rodríguez',
        coverUrl: '/images/book-placeholder.svg',
        price: 28000,
        isFree: false,
        featured: true,
        description: 'Construye una familia sólida basada en principios bíblicos.',
        category: 'familias',
        audience: 'familias',
        formats: ['PDF', 'EPUB']
    },
    {
        id: '4',
        title: 'Predicando con Poder',
        author: 'Rev. Juan Pérez',
        coverUrl: '/images/book-placeholder.svg',
        price: 38000,
        isFree: false,
        featured: true,
        description: 'Herramientas prácticas para predicar con unción y claridad.',
        category: 'predicaciones',
        audience: 'adultos',
        formats: ['PDF']
    },
    {
        id: '5',
        title: 'Adoración que Agrada a Dios',
        author: 'Ana López',
        coverUrl: '/images/book-placeholder.svg',
        price: 25000,
        isFree: false,
        featured: true,
        description: 'Descubre el verdadero significado de la adoración bíblica.',
        category: 'devocionales',
        audience: 'todos',
        formats: ['PDF', 'EPUB']
    },
    {
        id: '6',
        title: 'El Discipulado Efectivo',
        author: 'Pastor David Torres',
        coverUrl: '/images/book-placeholder.svg',
        price: 32000,
        isFree: false,
        featured: true,
        description: 'Estrategias para formar discípulos comprometidos con Cristo.',
        category: 'maestros',
        audience: 'adultos',
        formats: ['PDF']
    }
];

// Free Books
export const freeBooks: Book[] = [
    {
        id: '7',
        title: '30 Días de Devocionales Poderosos',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrl: '/downloads/30-dias-devocionales.pdf',
        description: 'Un mes de reflexiones profundas para fortalecer tu fe.',
        category: 'devocionales',
        audience: 'todos',
        formats: ['PDF']
    },
    {
        id: '8',
        title: 'Guía de Estudio Bíblico',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrl: '/downloads/guia-estudio-biblico.pdf',
        description: 'Herramientas para estudiar la Palabra con profundidad.',
        category: 'maestros',
        audience: 'adultos',
        formats: ['PDF']
    },
    {
        id: '9',
        title: 'Oraciones que Transforman',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrl: '/downloads/oraciones-transforman.pdf',
        description: 'Modelos de oración basados en la Escritura.',
        category: 'devocionales',
        audience: 'todos',
        formats: ['PDF']
    },
    {
        id: '10',
        title: 'Versículos para Memorizar',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrl: '/downloads/versiculos-memorizar.pdf',
        description: 'Selección de versículos clave para tu crecimiento espiritual.',
        category: 'devocionales',
        audience: 'todos',
        formats: ['PDF']
    },
    {
        id: '11',
        title: 'Introducción a la Teología',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrl: '/downloads/intro-teologia.pdf',
        description: 'Fundamentos teológicos explicados de manera clara.',
        category: 'maestros',
        audience: 'adultos',
        formats: ['PDF', 'EPUB']
    },
    {
        id: '12',
        title: 'El Plan de Salvación',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrl: '/downloads/plan-salvacion.pdf',
        description: 'Comparte el evangelio de manera clara y efectiva.',
        category: 'predicaciones',
        audience: 'todos',
        formats: ['PDF']
    }
];

// Testimonials
export const testimonials: Testimonial[] = [
    {
        id: '1',
        quote: 'Estos recursos han sido de gran bendición para mi ministerio. La profundidad bíblica y la claridad con la que están escritos me han ayudado a crecer y a servir mejor a mi congregación.',
        authorName: 'Pastor Carlos Méndez',
        authorLocation: 'Bogotá',
        order: 1,
        isActive: true
    },
    {
        id: '2',
        quote: 'Como madre, encontré en estos devocionales el alimento espiritual que necesitaba. Ahora puedo guiar a mi familia con mayor sabiduría y amor.',
        authorName: 'María Rodríguez',
        authorLocation: 'Medellín',
        order: 2,
        isActive: true
    },
    {
        id: '3',
        quote: 'Los libros gratuitos me abrieron las puertas a un conocimiento que no sabía que necesitaba. Gracias por bendecir a tantas personas.',
        authorName: 'Juan Pérez',
        authorLocation: 'Cali',
        order: 3,
        isActive: true
    },
    {
        id: '4',
        quote: 'La calidad del contenido es excepcional. Cada libro está lleno de sabiduría práctica y fundamento bíblico sólido.',
        authorName: 'Ana López',
        authorLocation: 'Barranquilla',
        order: 4,
        isActive: true
    },
    {
        id: '5',
        quote: 'He recomendado estos recursos a toda mi iglesia. Son herramientas invaluables para el crecimiento espiritual.',
        authorName: 'Pastor David Torres',
        authorLocation: 'Cartagena',
        order: 5,
        isActive: true
    },
    {
        id: '6',
        quote: 'Como maestro de escuela dominical, estos libros me han equipado para enseñar con mayor profundidad y claridad.',
        authorName: 'Roberto Sánchez',
        authorLocation: 'Bucaramanga',
        order: 6,
        isActive: true
    }
];

// Helper function to get all books
export function getAllBooks(): Book[] {
    return [...featuredBooks, ...freeBooks];
}

// Helper function to get free books
export function getFreeBooks(): Book[] {
    return getAllBooks().filter(book => book.isFree);
}

