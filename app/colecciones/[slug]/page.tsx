import React from 'react';
import { notFound } from 'next/navigation';
import { getCollectionBySlug } from '@/lib/mockCollections';
import { mockAdminBooks } from '@/lib/mockAdminData';
import BookCard from '@/components/shared/BookCard';
import Button from '@/components/shared/Button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import styles from '@/styles/pages/CollectionDetail.module.css';

interface CollectionDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
    const { slug } = await params;
    const collection = getCollectionBySlug(slug);

    if (!collection) {
        notFound();
    }

    // Get books for this collection
    const collectionBooks = mockAdminBooks.filter(book =>
        collection.books.includes(book.id)
    );

    return (
        <div className={styles.container}>
            {/* Hero Banner */}
            <section className={styles.hero}>
                <div className={styles.heroBanner}>
                    <Image
                        src={collection.bannerUrl}
                        alt={collection.name}
                        fill
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay}>
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>{collection.name}</h1>
                            <p className={styles.heroSubtitle}>
                                Colección de {collection.books.length} {collection.books.length === 1 ? 'libro' : 'libros'}
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
                        <Button variant="primary" href="/catalogo">
                            Ir al catálogo
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
