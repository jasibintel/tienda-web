// Funciones para gestionar recursos extra de libros en Firestore
// Colección: bookResources

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { BookResources, ResourceSection, ResourceVideo } from '@/lib/types';
import { getUserLibrary } from './library';

const BOOK_RESOURCES_COLLECTION = 'bookResources';

// Convertir documento a BookResources
function docToBookResources(docSnap: QueryDocumentSnapshot<DocumentData>): BookResources {
    const data = docSnap.data();
    return {
        bookId: data.bookId || docSnap.id,
        introTitle: data.introTitle || '',
        introText: data.introText || '',
        sections: (data.sections || []).map((section: any) => ({
            id: section.id,
            title: section.title,
            description: section.description,
            order: section.order || 0,
            videos: (section.videos || []).map((video: any) => ({
                id: video.id,
                title: video.title,
                url: video.url,
                description: video.description,
                duration: video.duration,
                order: video.order || 0
            } as ResourceVideo))
        } as ResourceSection)).sort((a: ResourceSection, b: ResourceSection) => a.order - b.order),
        isActive: data.isActive !== undefined ? data.isActive : true,
        createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.().toISOString() || data.updatedAt || new Date().toISOString()
    } as BookResources;
}

// Obtener recursos de un libro
export async function getBookResources(bookId: string): Promise<BookResources | null> {
    try {
        if (!bookId) {
            return null;
        }

        const resourceRef = doc(db, BOOK_RESOURCES_COLLECTION, bookId);
        const resourceDoc = await getDoc(resourceRef);

        if (!resourceDoc.exists()) {
            return null;
        }

        const data = resourceDoc.data();
        
        // Verificar que esté activo
        if (data.isActive === false) {
            return null;
        }

        return docToBookResources(resourceDoc as QueryDocumentSnapshot<DocumentData>);
    } catch (error) {
        console.error('Error getting book resources:', error);
        throw error;
    }
}

// Verificar si un usuario tiene un libro en su biblioteca
export async function checkUserHasBook(userId: string, bookId: string): Promise<boolean> {
    try {
        if (!userId || !bookId) {
            return false;
        }

        const libraryEntries = await getUserLibrary(userId);
        return libraryEntries.some(entry => entry.bookId === bookId);
    } catch (error) {
        console.error('Error checking if user has book:', error);
        return false;
    }
}

// Verificar si un libro tiene recursos disponibles
export async function checkBookHasResources(bookId: string): Promise<boolean> {
    try {
        if (!bookId) {
            return false;
        }

        const resources = await getBookResources(bookId);
        return resources !== null && resources.isActive;
    } catch (error) {
        console.error('Error checking if book has resources:', error);
        return false;
    }
}

// Obtener todos los bookIds que tienen recursos (para optimizar consultas)
export async function getBooksWithResources(): Promise<string[]> {
    try {
        const q = query(
            collection(db, BOOK_RESOURCES_COLLECTION),
            where('isActive', '==', true)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.id);
    } catch (error) {
        console.error('Error getting books with resources:', error);
        return [];
    }
}

