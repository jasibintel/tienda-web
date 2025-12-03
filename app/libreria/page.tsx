'use client';

import React, { useState, useEffect, useMemo } from 'react';
import CatalogHero from '@/components/catalog/CatalogHero';
import FilterBar from '@/components/catalog/FilterBar';
import BooksGrid from '@/components/catalog/BooksGrid';
import { useBooks, useFilteredBooks } from '@/lib/hooks/useBooks';
import { filterBooks, FilterOptions } from '@/lib/filterUtils';
import { Book } from '@/lib/types';

const BOOKS_PER_PAGE = 24;

export default function CatalogPage() {
    // Cargar libros desde Firestore
    const { books: allBooksFromFirestore, loading: booksLoading, error: booksError } = useBooks();
    
    // All books (memoized to prevent recalculation)
    const allBooks = useMemo(() => allBooksFromFirestore || [], [allBooksFromFirestore]);

    // Filter state
    const [filters, setFilters] = useState<FilterOptions>({
        category: 'all',
        audience: 'all',
        type: 'all',
        searchQuery: ''
    });

    // Filtered books
    const [filteredBooks, setFilteredBooks] = useState<Book[]>(allBooks);

    // Pagination state
    const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isClient, setIsClient] = useState(false);

    // Set isClient flag after component mounts
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Apply filters whenever filters change
    useEffect(() => {
        const filtered = filterBooks(allBooks, filters);
        setFilteredBooks(filtered);
        setCurrentPage(1);
        setDisplayedBooks(filtered.slice(0, BOOKS_PER_PAGE));
    }, [filters, allBooks]);

    // Load more books
    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        const startIndex = currentPage * BOOKS_PER_PAGE;
        const endIndex = startIndex + BOOKS_PER_PAGE;
        const moreBooks = filteredBooks.slice(startIndex, endIndex);

        setDisplayedBooks([...displayedBooks, ...moreBooks]);
        setCurrentPage(nextPage);
    };

    // Clear filters
    const handleClearFilters = () => {
        setFilters({
            category: 'all',
            audience: 'all',
            type: 'all',
            searchQuery: ''
        });
    };

    // Check if there are more books to load (only on client to avoid hydration mismatch)
    const hasMore = isClient && displayedBooks.length < filteredBooks.length && filteredBooks.length > BOOKS_PER_PAGE;

    // Mostrar loading state
    if (booksLoading && allBooks.length === 0) {
        return (
            <>
                <CatalogHero />
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p>Cargando libros...</p>
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '16px' }}>
                        Si esto tarda mucho, verifica la consola del navegador (F12) para ver errores.
                    </p>
                </div>
            </>
        );
    }

    // Mostrar error state
    if (booksError) {
        return (
            <>
                <CatalogHero />
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
                        Error al cargar libros
                    </p>
                    <p style={{ color: '#666', marginTop: '16px' }}>
                        {booksError}
                    </p>
                    <p style={{ fontSize: '14px', color: '#999', marginTop: '24px' }}>
                        Verifica:
                        <br />• Que las variables de entorno de Firebase estén configuradas en Vercel
                        <br />• Que las reglas de Firestore permitan lectura pública
                        <br />• Abre la consola del navegador (F12) para más detalles
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '24px',
                            padding: '12px 24px',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Reintentar
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <CatalogHero />

            <FilterBar
                searchQuery={filters.searchQuery}
                category={filters.category}
                audience={filters.audience}
                type={filters.type}
                onSearchChange={(value) => setFilters({ ...filters, searchQuery: value })}
                onCategoryChange={(value) => setFilters({ ...filters, category: value })}
                onAudienceChange={(value) => setFilters({ ...filters, audience: value })}
                onTypeChange={(value) => setFilters({ ...filters, type: value })}
                onApplyFilters={() => { }} // Filters apply automatically
                onClearFilters={handleClearFilters}
                resultCount={displayedBooks.length}
                totalCount={filteredBooks.length}
            />

            <BooksGrid
                books={displayedBooks}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                isClient={isClient}
            />
        </>
    );
}
