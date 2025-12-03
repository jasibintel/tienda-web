// Funciones para interactuar con la colección de libros en Firestore

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    QueryDocumentSnapshot,
    DocumentData,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './config';
import { Book } from '@/lib/types';

const BOOKS_COLLECTION = 'books';

// Convertir documento de Firestore a Book
function docToBook(docSnap: QueryDocumentSnapshot<DocumentData>): Book {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        ...data,
        // Asegurar que los campos opcionales estén presentes
        price: data.price || undefined,
        isFree: data.isFree || false,
        featured: data.featured || false,
        formats: data.formats || ['PDF'],
        isActive: data.isActive !== undefined ? data.isActive : true
    } as Book;
}

// Obtener todos los libros
export async function getAllBooks(): Promise<Book[]> {
    try {
        // Primero intentar con orderBy, si falla por falta de índice, usar solo where
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true)
        );
        
        try {
            // Intentar agregar orderBy
            q = query(q, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(docToBook);
        } catch (orderByError: any) {
            // Si falla por falta de índice, obtener sin orderBy y ordenar en el cliente
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                const books = querySnapshot.docs.map(docToBook);
                // Ordenar por createdAt en el cliente
                return books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error getting books:', error);
        // Si hay un error, intentar obtener todos los libros sin filtro
        try {
            const q = query(collection(db, BOOKS_COLLECTION));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs
                .map(docToBook)
                .filter(book => book.isActive !== false);
        } catch (fallbackError) {
            console.error('Error en fallback:', fallbackError);
            throw error;
        }
    }
}

// Obtener libro por ID
export async function getBookById(id: string): Promise<Book | null> {
    try {
        const docRef = doc(db, BOOKS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            return null;
        }
        
        return docToBook(docSnap as QueryDocumentSnapshot<DocumentData>);
    } catch (error) {
        console.error('Error getting book:', error);
        throw error;
    }
}

// Obtener libros destacados
export async function getFeaturedBooks(limitCount: number = 6): Promise<Book[]> {
    try {
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('featured', '==', true)
        );
        
        try {
            q = query(q, orderBy('createdAt', 'desc'), limit(limitCount));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(docToBook);
        } catch (orderByError: any) {
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy en featured books, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                const books = querySnapshot.docs.map(docToBook);
                const sorted = books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
                return sorted.slice(0, limitCount);
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error getting featured books:', error);
        // Fallback: obtener todos y filtrar en el cliente
        try {
            const q = query(collection(db, BOOKS_COLLECTION));
            const querySnapshot = await getDocs(q);
            const allBooks = querySnapshot.docs.map(docToBook);
            return allBooks
                .filter(book => book.isActive !== false && book.featured === true)
                .sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                })
                .slice(0, limitCount);
        } catch (fallbackError) {
            throw error;
        }
    }
}

// Obtener libros gratuitos
export async function getFreeBooks(): Promise<Book[]> {
    try {
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('isFree', '==', true)
        );
        
        try {
            q = query(q, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(docToBook);
        } catch (orderByError: any) {
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy en free books, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                const books = querySnapshot.docs.map(docToBook);
                return books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error getting free books:', error);
        // Fallback: obtener todos y filtrar en el cliente
        try {
            const q = query(collection(db, BOOKS_COLLECTION));
            const querySnapshot = await getDocs(q);
            const allBooks = querySnapshot.docs.map(docToBook);
            return allBooks
                .filter(book => book.isActive !== false && book.isFree === true)
                .sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
        } catch (fallbackError) {
            throw error;
        }
    }
}

// Buscar libros por categoría
export async function getBooksByCategory(category: string): Promise<Book[]> {
    try {
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('category', '==', category)
        );
        
        try {
            q = query(q, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(docToBook);
        } catch (orderByError: any) {
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy en category books, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                const books = querySnapshot.docs.map(docToBook);
                return books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error getting books by category:', error);
        throw error;
    }
}

// Buscar libros por público objetivo
export async function getBooksByAudience(audience: string): Promise<Book[]> {
    try {
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('audience', '==', audience),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToBook);
    } catch (error) {
        console.error('Error getting books by audience:', error);
        throw error;
    }
}

// Buscar libros (por título o autor)
export async function searchBooks(searchTerm: string): Promise<Book[]> {
    try {
        // Firestore no soporta búsqueda full-text nativa
        // Obtener todos los libros activos y filtrar en el cliente
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true)
        );
        const querySnapshot = await getDocs(q);
        const allBooks = querySnapshot.docs.map(docToBook);
        
        const term = searchTerm.toLowerCase();
        return allBooks.filter(book => 
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term) ||
            book.subtitle?.toLowerCase().includes(term)
        );
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
}

// Filtrar libros (múltiples criterios)
export interface BookFilters {
    category?: string;
    audience?: string;
    isFree?: boolean;
    featured?: boolean;
    searchQuery?: string;
}

export async function filterBooks(filters: BookFilters): Promise<Book[]> {
    try {
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true)
        );

        // Aplicar filtros
        if (filters.category && filters.category !== 'all') {
            q = query(q, where('category', '==', filters.category));
        }
        if (filters.audience && filters.audience !== 'all') {
            q = query(q, where('audience', '==', filters.audience));
        }
        if (filters.isFree !== undefined) {
            q = query(q, where('isFree', '==', filters.isFree));
        }
        if (filters.featured !== undefined) {
            q = query(q, where('featured', '==', filters.featured));
        }

        // Intentar agregar orderBy, si falla ordenar en el cliente
        try {
            q = query(q, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            let books = querySnapshot.docs.map(docToBook);

            // Filtrar por búsqueda de texto si existe
            if (filters.searchQuery) {
                const term = filters.searchQuery.toLowerCase();
                books = books.filter(book => 
                    book.title.toLowerCase().includes(term) ||
                    book.author.toLowerCase().includes(term) ||
                    book.subtitle?.toLowerCase().includes(term)
                );
            }

            return books;
        } catch (orderByError: any) {
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy en filterBooks, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                let books = querySnapshot.docs.map(docToBook);
                
                // Ordenar en el cliente
                books = books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });

                // Filtrar por búsqueda de texto si existe
                if (filters.searchQuery) {
                    const term = filters.searchQuery.toLowerCase();
                    books = books.filter(book => 
                        book.title.toLowerCase().includes(term) ||
                        book.author.toLowerCase().includes(term) ||
                        book.subtitle?.toLowerCase().includes(term)
                    );
                }

                return books;
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error filtering books:', error);
        // Fallback: obtener todos y filtrar en el cliente
        try {
            const q = query(collection(db, BOOKS_COLLECTION));
            const querySnapshot = await getDocs(q);
            let books = querySnapshot.docs
                .map(docToBook)
                .filter(book => book.isActive !== false);

            // Aplicar filtros en el cliente
            if (filters.category && filters.category !== 'all') {
                books = books.filter(book => book.category === filters.category);
            }
            if (filters.audience && filters.audience !== 'all') {
                books = books.filter(book => book.audience === filters.audience);
            }
            if (filters.isFree !== undefined) {
                books = books.filter(book => book.isFree === filters.isFree);
            }
            if (filters.featured !== undefined) {
                books = books.filter(book => book.featured === filters.featured);
            }
            if (filters.searchQuery) {
                const term = filters.searchQuery.toLowerCase();
                books = books.filter(book => 
                    book.title.toLowerCase().includes(term) ||
                    book.author.toLowerCase().includes(term) ||
                    book.subtitle?.toLowerCase().includes(term)
                );
            }

            // Ordenar por fecha
            books = books.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });

            return books;
        } catch (fallbackError) {
            throw error;
        }
    }
}

// Crear libro (solo admin)
export async function createBook(bookData: Omit<Book, 'id'>): Promise<Book> {
    try {
        const docRef = await addDoc(collection(db, BOOKS_COLLECTION), {
            ...bookData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        const newBook = await getBookById(docRef.id);
        if (!newBook) {
            throw new Error('Error al crear el libro');
        }
        return newBook;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
}

// Actualizar libro (solo admin)
export async function updateBook(id: string, updates: Partial<Book>): Promise<Book> {
    try {
        const bookRef = doc(db, BOOKS_COLLECTION, id);
        await updateDoc(bookRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        
        const updatedBook = await getBookById(id);
        if (!updatedBook) {
            throw new Error('Error al actualizar el libro');
        }
        return updatedBook;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
}

// Eliminar libro (solo admin) - Soft delete marcando isActive como false
export async function deleteBook(id: string): Promise<void> {
    try {
        const bookRef = doc(db, BOOKS_COLLECTION, id);
        await updateDoc(bookRef, {
            isActive: false,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

