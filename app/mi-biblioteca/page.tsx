'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/library/PageHeader';
import NotAuthenticatedState from '@/components/library/NotAuthenticatedState';
import EmptyLibraryState from '@/components/library/EmptyLibraryState';
import LibraryFilters from '@/components/library/LibraryFilters';
import LibraryCard from '@/components/library/LibraryCard';
import { getUserLibraryWithBooks } from '@/lib/firebase/library';
import { checkBookHasResources } from '@/lib/firebase/bookResources';
import { useAuth } from '@/lib/context/AuthContext';
import { Book } from '@/lib/types';
import Image from 'next/image';
import { Download } from 'lucide-react';
import styles from '@/styles/pages/Library.module.css';

interface LibraryItemWithBook {
    bookId: string;
    grantedAt: string;
    source: 'order' | 'manual';
    orderId: string | null;
    book: Book | null;
    hasResources?: boolean;
}

export default function LibraryPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [libraryItems, setLibraryItems] = useState<LibraryItemWithBook[]>([]);
    const [filteredItems, setFilteredItems] = useState<LibraryItemWithBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter & Sort State
    const [activeFilter, setActiveFilter] = useState<'all' | 'paid' | 'free'>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'title-asc' | 'title-desc' | 'author'>('recent');

    // Load library items from Firestore
    useEffect(() => {
        const loadLibrary = async () => {
            if (!user) {
                setLibraryItems([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const libraryWithBooks = await getUserLibraryWithBooks(user.uid);
                
                // Verificar recursos para cada libro
                const itemsWithResources = await Promise.all(
                    libraryWithBooks.map(async (entry) => {
                        const hasResources = entry.book ? await checkBookHasResources(entry.bookId) : false;
                        return {
                            bookId: entry.bookId,
                            grantedAt: entry.grantedAt,
                            source: entry.source,
                            orderId: entry.orderId,
                            book: entry.book,
                            hasResources
                        };
                    })
                );
                
                setLibraryItems(itemsWithResources);
            } catch (err: any) {
                console.error('Error loading library:', err);
                setError(err.message || 'Error al cargar la biblioteca');
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            loadLibrary();
        }
    }, [user, authLoading]);

    // Apply filters and sort
    useEffect(() => {
        let result = libraryItems.filter(item => {
            if (!item.book) return false;
            if (activeFilter === 'paid') return !item.book.isFree;
            if (activeFilter === 'free') return item.book.isFree;
            return true;
        });

        // Sort
        result = [...result].sort((a, b) => {
            if (!a.book || !b.book) return 0;
            
            switch (sortBy) {
                case 'recent':
                    return new Date(b.grantedAt).getTime() - new Date(a.grantedAt).getTime();
                case 'title-asc':
                    return a.book.title.localeCompare(b.book.title);
                case 'title-desc':
                    return b.book.title.localeCompare(a.book.title);
                case 'author':
                    return a.book.author.localeCompare(b.book.author);
                default:
                    return 0;
            }
        });

        setFilteredItems(result);
    }, [libraryItems, activeFilter, sortBy]);

    // Handlers
    const handleDownload = (item: LibraryItemWithBook, format: 'pdf' | 'epub') => {
        if (!item.book) return;
        
        // Por ahora, usar downloadUrl si existe
        if (item.book.downloadUrl) {
            window.open(item.book.downloadUrl, '_blank');
        } else {
            alert(`Descargando ${item.book.title} en formato ${format.toUpperCase()}...`);
            console.log(`Downloading book ${item.bookId} format ${format}`);
        }
    };

    // Convert LibraryItemWithBook to UserLibraryItem format for LibraryCard
    const convertToUserLibraryItem = (item: LibraryItemWithBook) => {
        if (!item.book) return null;
        
        return {
            id: item.bookId,
            userId: user?.uid || '',
            bookId: item.bookId,
            title: item.book.title,
            author: item.book.author,
            coverUrl: item.book.coverUrl,
            isFree: item.book.isFree,
            downloadUrls: {
                pdf: item.book.downloadUrl,
                epub: item.book.downloadUrl
            },
            acquiredAt: item.grantedAt,
            downloadCount: 0,
            lastDownloadedAt: undefined,
            hasResources: item.hasResources || false
        };
    };

    if (authLoading || loading) {
        return (
            <main className={styles.main}>
                <PageHeader />
                <div className={styles.content}>
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <p>Cargando tu biblioteca...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className={styles.main}>
                <PageHeader />
                <div className={styles.content}>
                    <NotAuthenticatedState onLoginClick={() => router.push('/auth/login')} />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles.main}>
                <PageHeader />
                <div className={styles.content}>
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
                            Error al cargar la biblioteca
                        </p>
                        <p style={{ color: '#666', marginTop: '16px' }}>{error}</p>
                    </div>
                </div>
            </main>
        );
    }

    const validItems = filteredItems
        .map(convertToUserLibraryItem)
        .filter((item): item is NonNullable<typeof item> => item !== null);

    return (
        <main className={styles.main}>
            <PageHeader />

            <div className={styles.content}>
                {validItems.length === 0 ? (
                    <EmptyLibraryState />
                ) : (
                    <>
                        <LibraryFilters
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            count={validItems.length}
                        />

                        <div className={styles.gridContainer}>
                            <div className={styles.grid}>
                                {validItems.map((item) => {
                                    const originalItem = filteredItems.find(i => i.bookId === item.bookId);
                                    return (
                                        <LibraryCard
                                            key={item.id}
                                            item={item}
                                            hasResources={originalItem?.hasResources || false}
                                            onDownload={(item, format) => {
                                                if (originalItem) {
                                                    handleDownload(originalItem, format);
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
