// Funciones para interactuar con colecciones en Firestore

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { Collection } from '@/lib/types';

const COLLECTIONS_COLLECTION = 'collections';

// Convertir documento a Collection
function docToCollection(docSnap: QueryDocumentSnapshot<DocumentData>): Collection {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        name: data.name,
        slug: data.slug,
        descriptionShort: data.descriptionShort,
        descriptionLong: data.descriptionLong,
        bannerUrl: data.bannerUrl,
        books: data.books || [],
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
        hasReadingOrder: data.hasReadingOrder || false,
        createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.().toISOString() || data.updatedAt || new Date().toISOString()
    } as Collection;
}

// Obtener todas las colecciones activas
export async function getActiveCollections(): Promise<Collection[]> {
    try {
        const q = query(
            collection(db, COLLECTIONS_COLLECTION),
            where('isActive', '==', true),
            orderBy('order', 'asc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToCollection);
    } catch (error) {
        console.error('Error getting collections:', error);
        throw error;
    }
}

// Obtener colección por slug
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
    try {
        const q = query(
            collection(db, COLLECTIONS_COLLECTION),
            where('slug', '==', slug),
            where('isActive', '==', true),
            limit(1)
        );
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return null;
        }
        
        return docToCollection(querySnapshot.docs[0]);
    } catch (error) {
        console.error('Error getting collection by slug:', error);
        throw error;
    }
}

// Obtener colección por ID
export async function getCollectionById(id: string): Promise<Collection | null> {
    try {
        const docRef = doc(db, COLLECTIONS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            return null;
        }
        
        return docToCollection(docSnap as QueryDocumentSnapshot<DocumentData>);
    } catch (error) {
        console.error('Error getting collection:', error);
        throw error;
    }
}

// Crear colección (solo admin)
export async function createCollection(collectionData: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>): Promise<Collection> {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS_COLLECTION), {
            ...collectionData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        const newCollection = await getCollectionById(docRef.id);
        if (!newCollection) {
            throw new Error('Error al crear la colección');
        }
        return newCollection;
    } catch (error) {
        console.error('Error creating collection:', error);
        throw error;
    }
}

// Actualizar colección (solo admin)
export async function updateCollection(id: string, updates: Partial<Collection>): Promise<Collection> {
    try {
        const collectionRef = doc(db, COLLECTIONS_COLLECTION, id);
        await updateDoc(collectionRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        
        const updatedCollection = await getCollectionById(id);
        if (!updatedCollection) {
            throw new Error('Error al actualizar la colección');
        }
        return updatedCollection;
    } catch (error) {
        console.error('Error updating collection:', error);
        throw error;
    }
}

// Eliminar colección (solo admin) - Soft delete
export async function deleteCollection(id: string): Promise<void> {
    try {
        const collectionRef = doc(db, COLLECTIONS_COLLECTION, id);
        await updateDoc(collectionRef, {
            isActive: false,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error deleting collection:', error);
        throw error;
    }
}

// Obtener todas las colecciones (admin)
export async function getAllCollections(): Promise<Collection[]> {
    try {
        const q = query(
            collection(db, COLLECTIONS_COLLECTION),
            orderBy('order', 'asc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToCollection);
    } catch (error) {
        console.error('Error getting all collections:', error);
        throw error;
    }
}

