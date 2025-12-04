// Hook personalizado para manejar colecciones desde Firestore

import { useState, useEffect } from 'react';
import { Collection } from '@/lib/types';
import {
    getActiveCollections,
    getCollectionBySlug,
    getCollectionById
} from '@/lib/firebase/collections';

export function useCollections() {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCollections();
    }, []);

    const loadCollections = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('🔄 Cargando colecciones desde Firestore...');
            
            const activeCollections = await getActiveCollections();
            
            console.log(`✅ ${activeCollections.length} colecciones cargadas exitosamente`);
            setCollections(activeCollections);
        } catch (err: any) {
            console.error('❌ Error al cargar colecciones:', err);
            const errorMessage = err.message || 'Error al cargar colecciones';
            setError(errorMessage);
            // Si hay error, establecer array vacío para evitar estado de carga infinito
            setCollections([]);
        } finally {
            setLoading(false);
        }
    };

    return { collections, loading, error, refetch: loadCollections };
}

export function useCollectionBySlug(slug: string) {
    const [collection, setCollection] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            loadCollection();
        }
    }, [slug]);

    const loadCollection = async () => {
        try {
            setLoading(true);
            setError(null);
            const collectionData = await getCollectionBySlug(slug);
            setCollection(collectionData);
        } catch (err: any) {
            console.error('Error al cargar colección:', err);
            setError(err.message || 'Error al cargar la colección');
        } finally {
            setLoading(false);
        }
    };

    return { collection, loading, error, refetch: loadCollection };
}

export function useCollectionById(id: string) {
    const [collection, setCollection] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadCollection();
        }
    }, [id]);

    const loadCollection = async () => {
        try {
            setLoading(true);
            setError(null);
            const collectionData = await getCollectionById(id);
            setCollection(collectionData);
        } catch (err: any) {
            console.error('Error al cargar colección:', err);
            setError(err.message || 'Error al cargar la colección');
        } finally {
            setLoading(false);
        }
    };

    return { collection, loading, error, refetch: loadCollection };
}

