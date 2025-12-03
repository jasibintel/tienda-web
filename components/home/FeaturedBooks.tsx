'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/components/FeaturedBooks.module.css';

export default function FeaturedBooks() {
    const books = [
        {
            id: 1,
            title: 'El Poder de la Oración Transformadora',
            author: 'Juan Pérez',
            price: 12.99,
            image: '/images/books/poder-oracion.jpg',
            featured: true,
            category: 'Devocional'
        },
        {
            id: 2,
            title: 'Fundamentos de la Fe Cristiana',
            author: 'María González',
            price: 15.99,
            image: '/images/book-placeholder.svg',
            featured: false,
            category: 'Teología'
        },
        {
            id: 3,
            title: 'Viviendo en el Espíritu',
            author: 'Carlos Ramírez',
            price: 10.99,
            image: '/images/book-placeholder.svg',
            featured: false,
            category: 'Vida Cristiana'
        }
    ];

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
                <div className={styles.grid}>
                    {books.map((book, index) => (
                        <Link
                            key={book.id}
                            href={`/libro/${book.id}`}
                            className={`${styles.card} ${book.featured ? styles.cardFeatured : ''}`}
                        >
                            <div className={styles.cardImage}>
                                <Image
                                    src={book.image}
                                    alt={book.title}
                                    width={book.featured ? 400 : 300}
                                    height={book.featured ? 600 : 450}
                                    className={styles.bookCover}
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
                                    <span className={styles.price}>${book.price}</span>
                                    <span className={styles.format}>Digital</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
