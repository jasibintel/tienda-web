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
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToBook);
    } catch (error) {
        console.error('Error getting books:', error);
        throw error;
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
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('featured', '==', true),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToBook);
    } catch (error) {
        console.error('Error getting featured books:', error);
        throw error;
    }
}

// Obtener libros gratuitos
export async function getFreeBooks(): Promise<Book[]> {
    try {
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('isFree', '==', true),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToBook);
    } catch (error) {
        console.error('Error getting free books:', error);
        throw error;
    }
}

// Buscar libros por categoría
export async function getBooksByCategory(category: string): Promise<Book[]> {
    try {
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('category', '==', category),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToBook);
    } catch (error) {
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
    } catch (error) {
        console.error('Error filtering books:', error);
        throw error;
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

