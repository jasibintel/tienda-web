// Hook personalizado para manejar la biblioteca del usuario

import { useState, useEffect } from 'react';
import { UserLibraryItem } from '@/lib/types';
import { useAuth } from '@/lib/context/AuthContext';
import {
    getUserLibrary,
    addBookToLibrary,
    updateDownloadCount,
    isBookInLibrary,
    filterUserLibrary,
    sortUserLibrary
} from '@/lib/firebase/users';

export function useUserLibrary() {
    const { user } = useAuth();
    const [libraryItems, setLibraryItems] = useState<UserLibraryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            loadLibrary();
        } else {
            setLibraryItems([]);
            setLoading(false);
        }
    }, [user]);

    const loadLibrary = async () => {
        if (!user) return;
        
        try {
            setLoading(true);
            setError(null);
            const items = await getUserLibrary(user.uid);
            setLibraryItems(items);
        } catch (err: any) {
            setError(err.message || 'Error al cargar la biblioteca');
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (bookData: {
        bookId: string;
        title: string;
        author: string;
        coverUrl: string;
        isFree: boolean;
        downloadUrls: { pdf?: string; epub?: string };
    }) => {
        if (!user) throw new Error('Usuario no autenticado');
        
        try {
            const newItem = await addBookToLibrary(user.uid, bookData);
            setLibraryItems(prev => [newItem, ...prev]);
            return newItem;
        } catch (err: any) {
            throw new Error(err.message || 'Error al agregar libro a la biblioteca');
        }
    };

    const recordDownload = async (libraryItemId: string) => {
        if (!user) return;
        
        try {
            await updateDownloadCount(user.uid, libraryItemId);
            setLibraryItems(prev =>
                prev.map(item =>
                    item.id === libraryItemId
                        ? {
                              ...item,
                              downloadCount: (item.downloadCount || 0) + 1,
                              lastDownloadedAt: new Date().toISOString()
                          }
                        : item
                )
            );
        } catch (err: any) {
            console.error('Error recording download:', err);
        }
    };

    const checkBookInLibrary = async (bookId: string): Promise<boolean> => {
        if (!user) return false;
        return await isBookInLibrary(user.uid, bookId);
    };

    return {
        libraryItems,
        loading,
        error,
        addBook,
        recordDownload,
        checkBookInLibrary,
        refetch: loadLibrary
    };
}

export function useFilteredUserLibrary(
    filter: 'all' | 'paid' | 'free' = 'all',
    sortBy: 'recent' | 'title-asc' | 'title-desc' | 'author' = 'recent'
) {
    const { user } = useAuth();
    const [filteredItems, setFilteredItems] = useState<UserLibraryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            loadFilteredLibrary();
        } else {
            setFilteredItems([]);
            setLoading(false);
        }
    }, [user, filter, sortBy]);

    const loadFilteredLibrary = async () => {
        if (!user) return;
        
        try {
            setLoading(true);
            setError(null);
            let items = await filterUserLibrary(user.uid, filter);
            items = sortUserLibrary(items, sortBy);
            setFilteredItems(items);
        } catch (err: any) {
            setError(err.message || 'Error al cargar la biblioteca');
        } finally {
            setLoading(false);
        }
    };

    return { filteredItems, loading, error, refetch: loadFilteredLibrary };
}

