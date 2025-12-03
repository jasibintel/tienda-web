import React from 'react';
import { Book } from '@/lib/types';
import FreeBookCard from './FreeBookCard';
import { Gift } from 'lucide-react';
import Button from '../shared/Button';
import styles from '@/styles/components/FreeBooksGrid.module.css';

interface FreeBooksGridProps {
    books: Book[];
}

export default function FreeBooksGrid({ books }: FreeBooksGridProps) {
    // Empty state
    if (books.length === 0) {
        return (
            <div className={styles.emptyState}>
                <Gift size={48} className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>Próximamente nuevos recursos</h3>
                <p className={styles.emptyDescription}>
                    Estamos preparando contenido gratuito para bendecirte. Vuelve pronto.
                </p>
                <Button variant="primary" href="/catalogo">
                    Explorar catálogo completo
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {books.map(book => (
                <FreeBookCard key={book.id} book={book} />
            ))}
        </div>
    );
}
