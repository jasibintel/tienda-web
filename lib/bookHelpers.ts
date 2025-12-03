// ============================================
// Helper Functions for Book Detail Page
// ============================================

import { Book } from './types';
import { featuredBooks, freeBooks } from './mockData';

/**
 * Get all books (combines featured and free)
 */
export function getAllBooksForDetail(): Book[] {
    return [...featuredBooks, ...freeBooks];
}

/**
 * Get a single book by ID
 */
export function getBookById(id: string): Book | null {
    const allBooks = getAllBooksForDetail();
    return allBooks.find(book => book.id === id) || null;
}

/**
 * Get related books based on category
 * Excludes the current book and returns up to 8 books
 */
export function getRelatedBooks(currentBookId: string, category: string, limit: number = 8): Book[] {
    const allBooks = getAllBooksForDetail();

    return allBooks
        .filter(book =>
            book.id !== currentBookId &&
            book.category === category
        )
        .slice(0, limit);
}
