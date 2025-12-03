// Hook personalizado para manejar libros desde Firestore

import { useState, useEffect } from 'react';
import { Book } from '@/lib/types';
import {
    getAllBooks,
    getBookById,
    getFeaturedBooks,
    getFreeBooks,
    getBooksByCategory,
    filterBooks,
    BookFilters
} from '@/lib/firebase/books';

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('🔄 Cargando libros desde Firestore...');
            
            // Agregar timeout para evitar que se quede colgado
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout: La query tardó más de 30 segundos')), 30000);
            });
            
            const booksPromise = getAllBooks();
            const allBooks = await Promise.race([booksPromise, timeoutPromise]) as any;
            
            console.log(`✅ ${allBooks.length} libros cargados exitosamente`);
            setBooks(allBooks);
        } catch (err: any) {
            console.error('❌ Error al cargar libros:', err);
            const errorMessage = err.message || 'Error al cargar libros';
            setError(errorMessage);
            // Si hay error, establecer array vacío para evitar estado de carga infinito
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    return { books, loading, error, refetch: loadBooks };
}

export function useBook(id: string) {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadBook();
        }
    }, [id]);

    const loadBook = async () => {
        try {
            setLoading(true);
            setError(null);
            const bookData = await getBookById(id);
            setBook(bookData);
        } catch (err: any) {
            setError(err.message || 'Error al cargar el libro');
        } finally {
            setLoading(false);
        }
    };

    return { book, loading, error, refetch: loadBook };
}

export function useFeaturedBooks(limitCount: number = 6) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFeaturedBooks();
    }, [limitCount]);

    const loadFeaturedBooks = async () => {
        try {
            setLoading(true);
            setError(null);
            const featured = await getFeaturedBooks(limitCount);
            setBooks(featured);
        } catch (err: any) {
            setError(err.message || 'Error al cargar libros destacados');
        } finally {
            setLoading(false);
        }
    };

    return { books, loading, error, refetch: loadFeaturedBooks };
}

export function useFreeBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFreeBooks();
    }, []);

    const loadFreeBooks = async () => {
        try {
            setLoading(true);
            setError(null);
            const free = await getFreeBooks();
            setBooks(free);
        } catch (err: any) {
            setError(err.message || 'Error al cargar libros gratuitos');
        } finally {
            setLoading(false);
        }
    };

    return { books, loading, error, refetch: loadFreeBooks };
}

export function useFilteredBooks(filters: BookFilters) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadFilteredBooks();
    }, [JSON.stringify(filters)]);

    const loadFilteredBooks = async () => {
        try {
            setLoading(true);
            setError(null);
            const filtered = await filterBooks(filters);
            setBooks(filtered);
        } catch (err: any) {
            setError(err.message || 'Error al filtrar libros');
        } finally {
            setLoading(false);
        }
    };

    return { books, loading, error, refetch: loadFilteredBooks };
}

