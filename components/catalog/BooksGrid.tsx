'use client';

import React from 'react';
import BookCard from '../shared/BookCard';
import { Book } from '@/lib/types';
import { BookOpen } from 'lucide-react';
import Button from '../shared/Button';
import styles from '@/styles/components/BooksGrid.module.css';

interface BooksGridProps {
    books: Book[];
    onLoadMore?: () => void;
    hasMore?: boolean;
    isClient?: boolean;
}

export default function BooksGrid({ books, onLoadMore, hasMore, isClient = false }: BooksGridProps) {
    // Empty state
    if (books.length === 0) {
        return (
            <div className={styles.emptyState}>
                <BookOpen className={styles.emptyIcon} size={80} />
                <h3 className={styles.emptyTitle}>
                    No encontramos libros que coincidan con tu búsqueda
                </h3>
                <p className={styles.emptyDescription}>
                    Intenta ajustar los filtros o buscar con otras palabras clave.
                </p>
                <Button variant="secondary" href="/libreria">
                    Ver todos los libros
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.gridWrapper}>
            <div className={styles.grid}>
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>

            {/* Load More Button - only render on client */}
            {isClient && hasMore && onLoadMore && (
                <div className={styles.loadMoreContainer}>
                    <Button variant="secondary" onClick={onLoadMore}>
                        Cargar más libros
                    </Button>
                </div>
            )}

            {/* End message - only render on client */}
            {isClient && !hasMore && books.length > 0 && (
                <div className={styles.endMessage}>
                    Has visto todos los libros disponibles
                </div>
            )}
        </div>
    );
}
