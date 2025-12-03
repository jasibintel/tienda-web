// Funciones para interactuar con usuarios y biblioteca en Firestore

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { UserLibraryItem } from '@/lib/types';

const USERS_COLLECTION = 'users';
const LIBRARY_SUBCOLLECTION = 'library';

// Convertir documento a UserLibraryItem
function docToLibraryItem(docSnap: QueryDocumentSnapshot<DocumentData>): UserLibraryItem {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        userId: data.userId,
        bookId: data.bookId,
        title: data.title,
        author: data.author,
        coverUrl: data.coverUrl,
        isFree: data.isFree || false,
        downloadUrls: data.downloadUrls || {},
        acquiredAt: data.acquiredAt?.toDate?.().toISOString() || data.acquiredAt || new Date().toISOString(),
        downloadCount: data.downloadCount || 0,
        lastDownloadedAt: data.lastDownloadedAt?.toDate?.().toISOString() || data.lastDownloadedAt
    } as UserLibraryItem;
}

// Obtener biblioteca de usuario
export async function getUserLibrary(userId: string): Promise<UserLibraryItem[]> {
    try {
        const libraryRef = collection(db, USERS_COLLECTION, userId, LIBRARY_SUBCOLLECTION);
        const q = query(libraryRef, orderBy('acquiredAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToLibraryItem);
    } catch (error) {
        console.error('Error getting user library:', error);
        throw error;
    }
}

// Agregar libro a la biblioteca del usuario
export async function addBookToLibrary(
    userId: string,
    bookData: {
        bookId: string;
        title: string;
        author: string;
        coverUrl: string;
        isFree: boolean;
        downloadUrls: {
            pdf?: string;
            epub?: string;
        };
    }
): Promise<UserLibraryItem> {
    try {
        const libraryRef = collection(db, USERS_COLLECTION, userId, LIBRARY_SUBCOLLECTION);
        
        // Verificar si el libro ya está en la biblioteca
        const existingQuery = query(libraryRef, where('bookId', '==', bookData.bookId));
        const existingDocs = await getDocs(existingQuery);
        
        if (!existingDocs.empty) {
            // El libro ya existe, retornar el existente
            return docToLibraryItem(existingDocs.docs[0]);
        }
        
        // Agregar nuevo libro a la biblioteca
        const docRef = await addDoc(libraryRef, {
            userId,
            ...bookData,
            acquiredAt: serverTimestamp(),
            downloadCount: 0
        });
        
        const newItem = await getDoc(docRef);
        if (!newItem.exists()) {
            throw new Error('Error al agregar libro a la biblioteca');
        }
        
        return docToLibraryItem(newItem as QueryDocumentSnapshot<DocumentData>);
    } catch (error) {
        console.error('Error adding book to library:', error);
        throw error;
    }
}

// Actualizar contador de descargas
export async function updateDownloadCount(userId: string, libraryItemId: string): Promise<void> {
    try {
        const itemRef = doc(db, USERS_COLLECTION, userId, LIBRARY_SUBCOLLECTION, libraryItemId);
        const itemDoc = await getDoc(itemRef);
        
        if (!itemDoc.exists()) {
            throw new Error('Item no encontrado');
        }
        
        const currentCount = itemDoc.data().downloadCount || 0;
        await updateDoc(itemRef, {
            downloadCount: currentCount + 1,
            lastDownloadedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating download count:', error);
        throw error;
    }
}

// Verificar si un libro está en la biblioteca del usuario
export async function isBookInLibrary(userId: string, bookId: string): Promise<boolean> {
    try {
        const libraryRef = collection(db, USERS_COLLECTION, userId, LIBRARY_SUBCOLLECTION);
        const q = query(libraryRef, where('bookId', '==', bookId));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking if book is in library:', error);
        return false;
    }
}

// Obtener información del usuario
export async function getUserData(userId: string) {
    try {
        const userRef = doc(db, USERS_COLLECTION, userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            return null;
        }
        
        return {
            id: userDoc.id,
            ...userDoc.data()
        };
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
}

// Actualizar información del usuario
export async function updateUserData(userId: string, updates: any): Promise<void> {
    try {
        const userRef = doc(db, USERS_COLLECTION, userId);
        await updateDoc(userRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
}

// Filtrar biblioteca
export async function filterUserLibrary(
    userId: string,
    filter: 'all' | 'paid' | 'free'
): Promise<UserLibraryItem[]> {
    const allItems = await getUserLibrary(userId);
    
    if (filter === 'paid') {
        return allItems.filter(item => !item.isFree);
    }
    if (filter === 'free') {
        return allItems.filter(item => item.isFree);
    }
    return allItems;
}

// Ordenar biblioteca
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

