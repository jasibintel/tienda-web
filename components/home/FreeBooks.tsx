'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Download, ArrowRight } from 'lucide-react';
import { useFreeBooks } from '@/lib/hooks/useBooks';
import styles from '@/styles/components/FreeBooks.module.css';

export default function FreeBooks() {
    const { books: freeBooks, loading } = useFreeBooks();
    
    // Mostrar solo los primeros 3 libros gratuitos
    const displayedBooks = freeBooks.slice(0, 3);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Header */}
                    <div className={styles.header}>
                        <span className={styles.badge}>100% Gratuito</span>
                        <h2 className={styles.title}>Recursos Premium Sin Costo</h2>
                        <p className={styles.description}>
                            Contenido exclusivo para fortalecer tu fe. Sin tarjetas, sin compromisos.
                        </p>
                    </div>

                    {/* Resources Grid */}
                    {loading ? (
                        <div style={{ padding: '48px', textAlign: 'center' }}>
                            <p>Cargando libros gratuitos...</p>
                        </div>
                    ) : displayedBooks.length === 0 ? (
                        <div style={{ padding: '48px', textAlign: 'center' }}>
                            <p>No hay libros gratuitos disponibles</p>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {displayedBooks.map((book) => (
                                <Link key={book.id} href={`/libreria/${book.id}`} className={styles.card}>
                                    <div className={styles.cardImage}>
                                        <Image
                                            src={book.coverUrl || '/images/book-placeholder.svg'}
                                            alt={book.title}
                                            width={200}
                                            height={300}
                                            className={styles.bookCover}
                                            unoptimized
                                        />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{book.title}</h3>
                                        <p className={styles.cardDescription}>
                                            {book.description?.substring(0, 100)}...
                                        </p>
                                        <div className={styles.cardFooter}>
                                            <span className={styles.downloads}>Gratis</span>
                                            <span className={styles.downloadButton}>
                                                <Download size={16} />
                                                <span>Ver libro</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* CTA */}
                    <div className={styles.cta}>
                        <Link href="/gratis" className={styles.ctaButton}>
                            <span>Ver todos los recursos gratuitos</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
