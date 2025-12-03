// ============================================
// Mock Admin Data - De Gloria en Gloria
// ============================================

import { Book } from './types';

// Extended book data for admin (includes all fields)
export const mockAdminBooks: Book[] = [
    {
        id: '1',
        title: 'El Poder de la Oración Transformadora',
        subtitle: 'Descubre cómo la oración profunda puede cambiar tu vida',
        author: 'Dr. Samuel Martínez',
        coverUrl: '/images/book-placeholder.svg',
        price: 35000,
        isFree: false,
        featured: true,
        downloadUrl: '/downloads/oracion-transformadora.pdf',
        description: 'Un libro profundo sobre el poder de la oración en la vida cristiana.',
        descriptionLong: 'Este libro te guiará a través de un viaje transformador...',
        learningPoints: [
            'Cómo desarrollar una vida de oración constante',
            'Principios bíblicos para orar con poder',
            'Testimonios reales de oraciones respondidas'
        ],
        targetAudience: [
            {
                icon: 'Users',
                title: 'Líderes cristianos',
                description: 'Pastores y líderes que desean profundizar su vida de oración'
            }
        ],
        category: 'devocionales',
        audience: 'adultos',
        formats: ['PDF', 'EPUB'],
        pages: 248,
        fileSize: { pdf: '2.5 MB', epub: '1.8 MB' },
        language: 'Español',
        publishedDate: '2024-01-15',
        isbn: '978-3-16-148410-0',
        publisher: 'Editorial De Gloria en Gloria',
        isActive: true,
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z',
        createdBy: 'admin-uid-1'
    },
    {
        id: '2',
        title: 'Liderazgo con Propósito',
        author: 'Pastor Carlos Gómez',
        coverUrl: '/images/book-placeholder.svg',
        price: 42000,
        isFree: false,
        featured: true,
        description: 'Principios de liderazgo cristiano efectivo.',
        category: 'maestros',
        audience: 'adultos',
        formats: ['PDF', 'EPUB'],
        isActive: true,
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z',
        createdBy: 'admin-uid-1'
    },
    {
        id: '3',
        title: 'La Familia según el Corazón de Dios',
        author: 'Dra. María Rodríguez',
        coverUrl: '/images/book-placeholder.svg',
        price: 38000,
        isFree: false,
        featured: false,
        description: 'Construyendo familias sólidas en Cristo.',
        category: 'familias',
        audience: 'familias',
        formats: ['PDF', 'EPUB'],
        isActive: true,
        createdAt: '2024-03-01T10:00:00Z',
        updatedAt: '2024-03-01T10:00:00Z',
        createdBy: 'admin-uid-1'
    },
    // Add more books as needed
];

// Categories
export interface CategoryAdmin {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description?: string;
    isActive: boolean;
    order: number;
    bookCount: number;
    createdAt: string;
}

export const mockAdminCategories: CategoryAdmin[] = [
    {
        id: 'cat-1',
        name: 'Para Maestros',
        slug: 'maestros',
        icon: 'GraduationCap',
        description: 'Recursos para maestros y educadores cristianos',
        isActive: true,
        order: 1,
        bookCount: 12,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'cat-2',
        name: 'Devocionales',
        slug: 'devocionales',
        icon: 'Heart',
        description: 'Libros devocionales para crecimiento espiritual',
        isActive: true,
        order: 2,
        bookCount: 18,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'cat-3',
        name: 'Para Familias',
        slug: 'familias',
        icon: 'Home',
        description: 'Recursos para fortalecer la familia cristiana',
        isActive: true,
        order: 3,
        bookCount: 8,
        createdAt: '2024-01-01T00:00:00Z'
    },
];

// Testimonials
export interface TestimonialAdmin {
    id: string;
    quote: string;
    authorName: string;
    authorLocation: string;
    order: number;
    isActive: boolean;
    createdAt: string;
}

export const mockAdminTestimonials: TestimonialAdmin[] = [
    {
        id: 'test-1',
        quote: 'Este libro cambió completamente mi perspectiva sobre la oración. Ahora tengo una relación más profunda con Dios.',
        authorName: 'María González',
        authorLocation: 'Bogotá, Colombia',
        order: 1,
        isActive: true,
        createdAt: '2024-01-15T00:00:00Z'
    },
    {
        id: 'test-2',
        quote: 'Los recursos de De Gloria en Gloria han sido fundamentales en mi ministerio. Altamente recomendados.',
        authorName: 'Pastor Juan Ramírez',
        authorLocation: 'Medellín, Colombia',
        order: 2,
        isActive: true,
        createdAt: '2024-02-01T00:00:00Z'
    },
];

// Users
export interface UserAdmin {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    role: 'user' | 'admin';
    createdAt: string;
}

export const mockAdminUsers: UserAdmin[] = [
    {
        uid: 'user-1',
        email: 'juan.diaz@email.com',
        displayName: 'Juan Díaz',
        role: 'user',
        createdAt: '2024-11-15T00:00:00Z'
    },
    {
        uid: 'user-2',
        email: 'maria.lopez@email.com',
        displayName: 'María López',
        role: 'user',
        createdAt: '2024-11-20T00:00:00Z'
    },
    {
        uid: 'admin-uid-1',
        email: 'jairo@deglorialibros.com',
        displayName: 'Jairo Sierra',
        role: 'admin',
        createdAt: '2024-01-01T00:00:00Z'
    },
];

// Helper functions for CRUD operations
export function createBook(book: Partial<Book>): Book {
    const newBook: Book = {
        id: `book-${Date.now()}`,
        title: book.title || '',
        author: book.author || '',
        coverUrl: book.coverUrl || '/images/book-placeholder.svg',
        price: book.price,
        isFree: book.isFree || false,
        featured: book.featured || false,
        description: book.description || '',
        category: book.category || 'devocionales',
        audience: book.audience || 'adultos',
        formats: book.formats || ['PDF'],
        isActive: book.isActive !== undefined ? book.isActive : true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin-uid-1',
        ...book
    };
    mockAdminBooks.push(newBook);
    return newBook;
}

export function updateBook(id: string, updates: Partial<Book>): Book | null {
    const index = mockAdminBooks.findIndex(b => b.id === id);
    if (index === -1) return null;

    mockAdminBooks[index] = {
        ...mockAdminBooks[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    return mockAdminBooks[index];
}

export function deleteBook(id: string): boolean {
    const index = mockAdminBooks.findIndex(b => b.id === id);
    if (index === -1) return false;

    mockAdminBooks.splice(index, 1);
    return true;
}

export function toggleBookActive(id: string): Book | null {
    const book = mockAdminBooks.find(b => b.id === id);
    if (!book) return null;

    book.isActive = !book.isActive;
    book.updatedAt = new Date().toISOString();
    return book;
}
