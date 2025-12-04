'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCollectionBySlug } from '@/lib/hooks/useCollections';
import { useBooks } from '@/lib/hooks/useBooks';
import BookCard from '@/components/shared/BookCard';
import Button from '@/components/shared/Button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import styles from '@/styles/pages/CollectionDetail.module.css';

export default function CollectionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const { collection, loading: collectionLoading, error: collectionError } = useCollectionBySlug(slug);
    const { books: allBooks, loading: booksLoading } = useBooks();
    const [collectionBooks, setCollectionBooks] = useState<any[]>([]);

    // Filtrar libros de la colección cuando ambos datos estén disponibles
    useEffect(() => {
        if (collection && allBooks.length > 0) {
            const filtered = allBooks.filter(book =>
                collection.books.includes(book.id)
            );
            setCollectionBooks(filtered);
        }
    }, [collection, allBooks]);

    // Loading state
    if (collectionLoading || booksLoading) {
        return (
            <div className={styles.container}>
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p>Cargando colección...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (collectionError || !collection) {
        return (
            <div className={styles.container}>
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
                        Colección no encontrada
                    </p>
                    <p style={{ color: '#666', marginTop: '16px' }}>
                        {collectionError || 'La colección que buscas no existe o no está disponible.'}
                    </p>
                    <div style={{ marginTop: '24px' }}>
                        <Button variant="secondary" href="/colecciones">
                            <ArrowLeft size={16} />
                            Volver a colecciones
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Hero Banner */}
            <section className={styles.hero}>
                <div className={styles.heroBanner}>
                    {collection.bannerUrl && (
                        <Image
                            src={collection.bannerUrl}
                            alt={collection.name}
                            fill
                            className={styles.heroImage}
                            priority
                        />
                    )}
                    <div className={styles.heroOverlay}>
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>{collection.name}</h1>
                            <p className={styles.heroSubtitle}>
                                Colección de {collectionBooks.length} {collectionBooks.length === 1 ? 'libro' : 'libros'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back Button */}
            <div className={styles.backButton}>
                <Button variant="secondary" href="/colecciones">
                    <ArrowLeft size={16} />
                    Volver a colecciones
                </Button>
            </div>

            {/* Description */}
            <section className={styles.description}>
                <div className={styles.descriptionContent}>
                    <p className={styles.descriptionText}>{collection.descriptionLong}</p>

                    {collection.hasReadingOrder && (
                        <div className={styles.readingOrderNote}>
                            <strong>📖 Orden de lectura sugerido:</strong> Te recomendamos leer estos libros en el orden presentado para una mejor experiencia de aprendizaje.
                        </div>
                    )}
                </div>
            </section>

            {/* Books Grid */}
            <section className={styles.booksSection}>
                <h2 className={styles.booksTitle}>Libros de esta colección</h2>
                {collectionBooks.length === 0 ? (
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <p style={{ color: '#666', fontSize: '16px' }}>
                            Esta colección aún no tiene libros asignados.
                        </p>
                        <p style={{ color: '#999', fontSize: '14px', marginTop: '8px' }}>
                            Los libros se mostrarán aquí cuando se agreguen a la colección.
                        </p>
                    </div>
                ) : (
                    <div className={styles.booksGrid}>
                        {collectionBooks.map((book, index) => (
                            <div key={book.id} className={styles.bookWrapper}>
                                {collection.hasReadingOrder && (
                                    <div className={styles.bookOrder}>
                                        <span className={styles.orderNumber}>{index + 1}</span>
                                        <span className={styles.orderLabel}>
                                            Libro {index + 1} de {collectionBooks.length}
                                        </span>
                                    </div>
                                )}
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* CTAs */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaGrid}>
                    <div className={styles.ctaCard}>
                        <h3 className={styles.ctaTitle}>Explorar más colecciones</h3>
                        <p className={styles.ctaDescription}>
                            Descubre otras series y conjuntos temáticos
                        </p>
                        <Button variant="secondary" href="/colecciones">
                            Ver todas las colecciones
                        </Button>
                    </div>

                    <div className={styles.ctaCard}>
                        <h3 className={styles.ctaTitle}>Ver catálogo completo</h3>
                        <p className={styles.ctaDescription}>
                            Explora todos nuestros libros disponibles
                        </p>
                        <Button variant="primary" href="/libreria">
                            Ir al catálogo
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
