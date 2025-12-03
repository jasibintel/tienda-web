'use client';

import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/library/PageHeader';
import NotAuthenticatedState from '@/components/library/NotAuthenticatedState';
import EmptyLibraryState from '@/components/library/EmptyLibraryState';
import LibraryFilters from '@/components/library/LibraryFilters';
import LibraryCard from '@/components/library/LibraryCard';
import {
    mockUserLibrary,
    getUserLibrary,
    filterUserLibrary,
    sortUserLibrary
} from '@/lib/mockUserLibrary';
import { UserLibraryItem } from '@/lib/types';
import styles from '@/styles/pages/Library.module.css';

// Mock Auth Hook (simulated)
const useMockAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ uid: string } | null>(null);

    const login = () => {
        setIsAuthenticated(true);
        setUser({ uid: 'mock-user-1' });
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return { isAuthenticated, user, login, logout };
};

export default function LibraryPage() {
    const { isAuthenticated, user, login, logout } = useMockAuth();
    const [libraryItems, setLibraryItems] = useState<UserLibraryItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<UserLibraryItem[]>([]);

    // Filter & Sort State
    const [activeFilter, setActiveFilter] = useState<'all' | 'paid' | 'free'>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'title-asc' | 'title-desc' | 'author'>('recent');

    // Load library items when authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            const items = getUserLibrary(user.uid);
            setLibraryItems(items);
        } else {
            setLibraryItems([]);
        }
    }, [isAuthenticated, user]);

    // Apply filters and sort
    useEffect(() => {
        let result = filterUserLibrary(libraryItems, activeFilter);
        result = sortUserLibrary(result, sortBy);
        setFilteredItems(result);
    }, [libraryItems, activeFilter, sortBy]);

    // Handlers
    const handleDownload = (item: UserLibraryItem, format: 'pdf' | 'epub') => {
        // Mock download logic
        alert(`Descargando ${item.title} en formato ${format.toUpperCase()}...`);
        console.log(`Downloading book ${item.bookId} format ${format}`);
    };

    // Dev toggle for testing empty state
    const toggleEmptyState = () => {
        if (libraryItems.length > 0) {
            setLibraryItems([]);
        } else if (user) {
            setLibraryItems(getUserLibrary(user.uid));
        }
    };

    return (
        <main className={styles.main}>
            <PageHeader />

            {/* Dev Controls (Hidden in production, visible for demo) */}
            <div className={styles.devControls}>
                <button onClick={isAuthenticated ? logout : login} className={styles.devButton}>
                    {isAuthenticated ? 'Simular Logout' : 'Simular Login'}
                </button>
                {isAuthenticated && (
                    <button onClick={toggleEmptyState} className={styles.devButton}>
                        {libraryItems.length > 0 ? 'Simular Sin Libros' : 'Simular Con Libros'}
                    </button>
                )}
            </div>

            <div className={styles.content}>
                {!isAuthenticated ? (
                    <NotAuthenticatedState onLoginClick={login} />
                ) : libraryItems.length === 0 ? (
                    <EmptyLibraryState />
                ) : (
                    <>
                        <LibraryFilters
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                            count={filteredItems.length}
                        />

                        <div className={styles.gridContainer}>
                            <div className={styles.grid}>
                                {filteredItems.map((item) => (
                                    <LibraryCard
                                        key={item.id}
                                        item={item}
                                        onDownload={handleDownload}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
