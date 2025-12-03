// ============================================
// Mock User Library Data - De Gloria en Gloria
// ============================================

import { UserLibraryItem } from './types';

// Mock user library (books acquired by user)
export const mockUserLibrary: UserLibraryItem[] = [
    {
        id: 'ul-1',
        userId: 'mock-user-1',
        bookId: '1',
        title: 'El Poder de la Oración Transformadora',
        author: 'Dr. Samuel Martínez',
        coverUrl: '/images/book-placeholder.svg',
        isFree: false,
        downloadUrls: {
            pdf: '/downloads/oracion-transformadora.pdf',
            epub: '/downloads/oracion-transformadora.epub'
        },
        acquiredAt: '2024-11-15T10:30:00Z',
        downloadCount: 3,
        lastDownloadedAt: '2024-11-20T14:22:00Z'
    },
    {
        id: 'ul-2',
        userId: 'mock-user-1',
        bookId: '2',
        title: 'Liderazgo con Propósito',
        author: 'Pastor Carlos Gómez',
        coverUrl: '/images/book-placeholder.svg',
        isFree: false,
        downloadUrls: {
            pdf: '/downloads/liderazgo-proposito.pdf',
            epub: '/downloads/liderazgo-proposito.epub'
        },
        acquiredAt: '2024-10-28T16:45:00Z',
        downloadCount: 2
    },
    {
        id: 'ul-3',
        userId: 'mock-user-1',
        bookId: '7',
        title: '30 Días de Devocionales Poderosos',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrls: {
            pdf: '/downloads/30-dias-devocionales.pdf'
        },
        acquiredAt: '2024-12-01T09:15:00Z',
        downloadCount: 1,
        lastDownloadedAt: '2024-12-01T09:16:00Z'
    },
    {
        id: 'ul-4',
        userId: 'mock-user-1',
        bookId: '3',
        title: 'La Familia según el Corazón de Dios',
        author: 'Dra. María Rodríguez',
        coverUrl: '/images/book-placeholder.svg',
        isFree: false,
        downloadUrls: {
            pdf: '/downloads/familia-corazon-dios.pdf',
            epub: '/downloads/familia-corazon-dios.epub'
        },
        acquiredAt: '2024-09-12T11:20:00Z',
        downloadCount: 5,
        lastDownloadedAt: '2024-11-18T20:10:00Z'
    },
    {
        id: 'ul-5',
        userId: 'mock-user-1',
        bookId: '8',
        title: 'Guía de Estudio Bíblico',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrls: {
            pdf: '/downloads/guia-estudio-biblico.pdf'
        },
        acquiredAt: '2024-11-25T14:30:00Z',
        downloadCount: 2
    },
    {
        id: 'ul-6',
        userId: 'mock-user-1',
        bookId: '4',
        title: 'Predicando con Poder',
        author: 'Rev. Juan Pérez',
        coverUrl: '/images/book-placeholder.svg',
        isFree: false,
        downloadUrls: {
            pdf: '/downloads/predicando-poder.pdf'
        },
        acquiredAt: '2024-08-05T13:45:00Z',
        downloadCount: 4
    },
    {
        id: 'ul-7',
        userId: 'mock-user-1',
        bookId: '9',
        title: 'Oraciones que Transforman',
        author: 'Equipo De Gloria en Gloria',
        coverUrl: '/images/book-placeholder.svg',
        isFree: true,
        downloadUrls: {
            pdf: '/downloads/oraciones-transforman.pdf'
        },
        acquiredAt: '2024-11-30T08:00:00Z',
        downloadCount: 1
    },
    {
        id: 'ul-8',
        userId: 'mock-user-1',
        bookId: '5',
        title: 'Finanzas con Sabiduría',
        author: 'Lic. Ana Torres',
        coverUrl: '/images/book-placeholder.svg',
        isFree: false,
        downloadUrls: {
            pdf: '/downloads/finanzas-sabiduria.pdf',
            epub: '/downloads/finanzas-sabiduria.epub'
        },
        acquiredAt: '2024-07-20T17:30:00Z',
        downloadCount: 6,
        lastDownloadedAt: '2024-11-10T12:45:00Z'
    }
];

// Mock authentication state
export interface MockAuthState {
    isAuthenticated: boolean;
    userId?: string;
}

// Helper functions for user library
export function getUserLibrary(userId: string): UserLibraryItem[] {
    return mockUserLibrary.filter(item => item.userId === userId);
}

export function filterUserLibrary(
    items: UserLibraryItem[],
    filter: 'all' | 'paid' | 'free'
): UserLibraryItem[] {
    if (filter === 'paid') {
        return items.filter(item => !item.isFree);
    }
    if (filter === 'free') {
        return items.filter(item => item.isFree);
    }
    return items;
}

export function sortUserLibrary(
    items: UserLibraryItem[],
    sortBy: 'recent' | 'title-asc' | 'title-desc' | 'author'
): UserLibraryItem[] {
    const sorted = [...items];

    switch (sortBy) {
        case 'recent':
            return sorted.sort((a, b) =>
                new Date(b.acquiredAt).getTime() - new Date(a.acquiredAt).getTime()
            );
        case 'title-asc':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'title-desc':
            return sorted.sort((a, b) => b.title.localeCompare(a.title));
        case 'author':
            return sorted.sort((a, b) => a.author.localeCompare(b.author));
        default:
            return sorted;
    }
}
