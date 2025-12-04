// Funciones para interactuar con categorías en Firestore

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { Category } from '@/lib/types';

const CATEGORIES_COLLECTION = 'categories';

// Categorías hardcodeadas como fallback
const FALLBACK_CATEGORIES: Category[] = [
    { id: 'devocionales', name: 'Devocionales', icon: '📖', slug: 'devocionales' },
    { id: 'maestros', name: 'Para Maestros', icon: '👨‍🏫', slug: 'maestros' },
    { id: 'familias', name: 'Para Familias', icon: '👨‍👩‍👧‍👦', slug: 'familias' },
    { id: 'jovenes', name: 'Para Jóvenes', icon: '👥', slug: 'jovenes' },
    { id: 'ninos', name: 'Para Niños', icon: '🧒', slug: 'ninos' },
    { id: 'liderazgo', name: 'Liderazgo', icon: '👔', slug: 'liderazgo' },
    { id: 'predicaciones', name: 'Predicaciones', icon: '📢', slug: 'predicaciones' }
];

// Convertir documento a Category
function docToCategory(docSnap: QueryDocumentSnapshot<DocumentData>): Category {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        name: data.name || docSnap.id,
        icon: data.icon || '📚',
        slug: data.slug || docSnap.id,
        bookCount: data.bookCount || 0
    } as Category;
}

// Obtener todas las categorías activas
export async function getAllCategories(): Promise<Category[]> {
    try {
        if (!db) {
            console.warn('⚠️ Firestore no está inicializado, usando categorías por defecto');
            return FALLBACK_CATEGORIES;
        }

        const q = query(
            collection(db, CATEGORIES_COLLECTION),
            where('isActive', '==', true),
            orderBy('order', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            console.warn('⚠️ No se encontraron categorías en Firestore, usando categorías por defecto');
            return FALLBACK_CATEGORIES;
        }
        
        const categories = querySnapshot.docs.map(docToCategory);
        console.log(`✅ ${categories.length} categorías cargadas desde Firestore`);
        return categories;
    } catch (error: any) {
        // Si hay error (colección no existe, índice faltante, etc.), usar fallback
        console.warn('⚠️ Error al obtener categorías desde Firestore, usando categorías por defecto:', error.message);
        return FALLBACK_CATEGORIES;
    }
}

// Obtener categoría por ID
export async function getCategoryById(id: string): Promise<Category | null> {
    try {
        if (!db) {
            // Buscar en fallback
            return FALLBACK_CATEGORIES.find(cat => cat.id === id) || null;
        }

        const docRef = doc(db, CATEGORIES_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            // Buscar en fallback
            return FALLBACK_CATEGORIES.find(cat => cat.id === id) || null;
        }
        
        return docToCategory(docSnap as QueryDocumentSnapshot<DocumentData>);
    } catch (error) {
        console.warn('⚠️ Error al obtener categoría por ID, buscando en fallback:', error);
        return FALLBACK_CATEGORIES.find(cat => cat.id === id) || null;
    }
}

// Obtener categoría por slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
        if (!db) {
            // Buscar en fallback
            return FALLBACK_CATEGORIES.find(cat => cat.slug === slug) || null;
        }

        const q = query(
            collection(db, CATEGORIES_COLLECTION),
            where('slug', '==', slug),
            where('isActive', '==', true),
            limit(1)
        );
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            // Buscar en fallback
            return FALLBACK_CATEGORIES.find(cat => cat.slug === slug) || null;
        }
        
        return docToCategory(querySnapshot.docs[0]);
    } catch (error) {
        console.warn('⚠️ Error al obtener categoría por slug, buscando en fallback:', error);
        return FALLBACK_CATEGORIES.find(cat => cat.slug === slug) || null;
    }
}

