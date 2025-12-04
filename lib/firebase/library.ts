// Funciones para gestionar la biblioteca del usuario en Firestore
// Modelo: users/{userId}/library/{bookId}

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    query,
    orderBy,
    serverTimestamp,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { LibraryEntry } from '@/lib/types';
import { getBookById } from './books';
import { Book } from '@/lib/types';

const USERS_COLLECTION = 'users';
const LIBRARY_SUBCOLLECTION = 'library';

// Convertir documento a LibraryEntry
function docToLibraryEntry(docSnap: QueryDocumentSnapshot<DocumentData>): LibraryEntry {
    const data = docSnap.data();
    return {
        bookId: docSnap.id, // The document ID is the bookId
        grantedAt: data.grantedAt?.toDate?.().toISOString() || data.grantedAt || new Date().toISOString(),
        source: data.source || 'manual',
        orderId: data.orderId || null
    } as LibraryEntry;
}

// Otorgar libros a un usuario
export async function grantBooksToUser(
    userId: string,
    bookIds: string[],
    orderId?: string
): Promise<void> {
    try {
        if (!userId || !bookIds || bookIds.length === 0) {
            throw new Error('userId y bookIds son requeridos');
        }

        const libraryRef = collection(db, USERS_COLLECTION, userId, LIBRARY_SUBCOLLECTION);
        
        // Para cada bookId, crear o actualizar el documento
        const promises = bookIds.map(async (bookId) => {
            const bookDocRef = doc(libraryRef, bookId);
            
            // Verificar si ya existe
            const existingDoc = await getDoc(bookDocRef);
            
            if (existingDoc.exists()) {
                // Actualizar solo si no tiene orderId (para no sobrescribir órdenes anteriores)
                if (!existingDoc.data().orderId && orderId) {
                    await setDoc(bookDocRef, {
                        grantedAt: serverTimestamp(),
                        source: 'order',
                        orderId: orderId
                    }, { merge: true });
                }
            } else {
                // Crear nuevo documento
                await setDoc(bookDocRef, {
                    bookId,
                    grantedAt: serverTimestamp(),
                    source: orderId ? 'order' : 'manual',
                    orderId: orderId || null
                });
            }
        });

        await Promise.all(promises);
    } catch (error) {
        console.error('Error granting books to user:', error);
        throw error;
    }
}

// Obtener biblioteca del usuario (solo LibraryEntry)
export async function getUserLibrary(userId: string): Promise<LibraryEntry[]> {
    try {
        if (!userId) {
            throw new Error('userId es requerido');
        }

        const libraryRef = collection(db, USERS_COLLECTION, userId, LIBRARY_SUBCOLLECTION);
        const q = query(libraryRef, orderBy('grantedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(docToLibraryEntry);
    } catch (error) {
        console.error('Error getting user library:', error);
        throw error;
    }
}

// Obtener biblioteca del usuario con datos completos de libros (join con books collection)
export async function getUserLibraryWithBooks(userId: string): Promise<Array<LibraryEntry & { book: Book | null }>> {
    try {
        const libraryEntries = await getUserLibrary(userId);
        
        // Obtener datos de cada libro
        const libraryWithBooks = await Promise.all(
            libraryEntries.map(async (entry) => {
                try {
                    const book = await getBookById(entry.bookId);
                    return {
                        ...entry,
                        book
                    };
                } catch (error) {
                    console.error(`Error getting book ${entry.bookId}:`, error);
                    return {
                        ...entry,
                        book: null
                    };
                }
            })
        );

        return libraryWithBooks;
    } catch (error) {
        console.error('Error getting user library with books:', error);
        throw error;
    }
}

