// ============================================
// Filter Utilities - De Gloria en Gloria
// ============================================

import { Book } from './types';

export interface FilterOptions {
    category: string;
    audience: string;
    type: 'all' | 'free' | 'paid';
    searchQuery: string;
}

/**
 * Filter books based on multiple criteria
 */
export function filterBooks(books: Book[], filters: FilterOptions): Book[] {
    return books.filter((book) => {
        // Filter by category
        if (filters.category !== 'all' && book.category !== filters.category) {
            return false;
        }

        // Filter by audience
        if (filters.audience !== 'all' && book.audience !== filters.audience && book.audience !== 'todos') {
            return false;
        }

        // Filter by type (free/paid)
        if (filters.type === 'free' && !book.isFree) {
            return false;
        }
        if (filters.type === 'paid' && book.isFree) {
            return false;
        }

        // Filter by search query
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const titleMatch = book.title.toLowerCase().includes(query);
            const authorMatch = book.author?.toLowerCase().includes(query);
            const descriptionMatch = book.description?.toLowerCase().includes(query);

            if (!titleMatch && !authorMatch && !descriptionMatch) {
                return false;
            }
        }

        return true;
    });
}

/**
 * Paginate books array
 */
export function paginateBooks(books: Book[], page: number, pageSize: number = 24): Book[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return books.slice(startIndex, endIndex);
}

/**
 * Get all books (combines featured and free)
 */
export function getAllBooks(featuredBooks: Book[], freeBooks: Book[]): Book[] {
    return [...featuredBooks, ...freeBooks];
}

/**
 * Category options for dropdown
 */
export const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'maestros', label: 'Para Maestros' },
    { value: 'devocionales', label: 'Devocionales' },
    { value: 'predicaciones', label: 'Predicaciones' },
    { value: 'familias', label: 'Familias' },
    { value: 'ninos', label: 'Niños' },
    { value: 'jovenes', label: 'Jóvenes' }
];

/**
 * Audience options for dropdown
 */
export const audienceOptions = [
    { value: 'all', label: 'Todo público' },
    { value: 'adultos', label: 'Adultos' },
    { value: 'jovenes', label: 'Jóvenes' },
    { value: 'ninos', label: 'Niños' },
    { value: 'familias', label: 'Familias' }
];
