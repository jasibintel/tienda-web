'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useFeaturedBooks } from '@/lib/hooks/useBooks';
import styles from '@/styles/components/FeaturedBooks.module.css';

export default function FeaturedBooks() {
    const { books, loading } = useFeaturedBooks(6);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Section Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <span className={styles.label}>Selección Curada</span>
                        <h2 className={styles.title}>Libros que Transforman Vidas</h2>
                        <p className={styles.description}>
                            Cada libro ha sido cuidadosamente seleccionado por su profundidad teológica
                            y su capacidad para edificar tu fe.
                        </p>
                    </div>
                    <Link href="/catalogo" className={styles.viewAll}>
                        <span>Ver todos los libros</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Masonry Grid */}
                {loading ? (
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <p>Cargando libros destacados...</p>
                    </div>
                ) : books.length === 0 ? (
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <p>No hay libros destacados disponibles</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {books.slice(0, 6).map((book, index) => (
                            <Link
                                key={book.id}
                                href={`/libreria/${book.id}`}
                                className={`${styles.card} ${index === 0 ? styles.cardFeatured : ''}`}
                            >
                                <div className={styles.cardImage}>
                                    <Image
                                        src={book.coverUrl || '/images/book-placeholder.svg'}
                                        alt={book.title}
                                        width={index === 0 ? 400 : 300}
                                        height={index === 0 ? 600 : 450}
                                        className={styles.bookCover}
                                        unoptimized
                                    />
                                    <div className={styles.cardOverlay}>
                                        <span className={styles.viewDetails}>Ver detalles</span>
                                    </div>
                                </div>

                                <div className={styles.cardContent}>
                                    <span className={styles.category}>{book.category}</span>
                                    <h3 className={styles.bookTitle}>{book.title}</h3>
                                    <p className={styles.author}>{book.author}</p>
                                    <div className={styles.priceRow}>
                                        <span className={styles.price}>
                                            {book.isFree ? 'Gratis' : `$${book.price?.toLocaleString('es-CO')} COP`}
                                        </span>
                                        <span className={styles.format}>Digital</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
