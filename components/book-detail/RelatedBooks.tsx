'use client';

import React from 'react';
import BookCard from '../shared/BookCard';
import { Book } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '@/styles/components/RelatedBooks.module.css';

interface RelatedBooksProps {
    books: Book[];
}

export default function RelatedBooks({ books }: RelatedBooksProps) {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 260; // card width + gap
            const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    if (books.length === 0) {
        return null;
    }

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Libros Relacionados</h2>
                <p className={styles.subtitle}>También te puede interesar</p>

                <div className={styles.carouselWrapper}>
                    <button
                        className={`${styles.navButton} ${styles.navButtonLeft}`}
                        onClick={() => scroll('left')}
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className={styles.carousel} ref={scrollRef}>
                        {books.map((book) => (
                            <div key={book.id} className={styles.cardWrapper}>
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>

                    <button
                        className={`${styles.navButton} ${styles.navButtonRight}`}
                        onClick={() => scroll('right')}
                        aria-label="Siguiente"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
