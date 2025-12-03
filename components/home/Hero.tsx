'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gift } from 'lucide-react';
import styles from '@/styles/components/Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                {/* Left Side - Content (60%) */}
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgeIcon}>✨</span>
                        <span>Recursos que transforman vidas</span>
                    </div>

                    <h1 className={styles.title}>
                        Recursos que edifican tu fe y ministerio
                    </h1>

                    <p className={styles.subtitle}>
                        Descubre una colección cuidadosamente seleccionada de libros digitales,
                        devocionales y recursos teológicos diseñados para profundizar tu caminar
                        con Dios y fortalecer tu ministerio.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/catalogo" className={styles.primaryButton}>
                            <span>Explorar Librería</span>
                            <ArrowRight size={20} />
                        </Link>

                        <Link href="/gratis" className={styles.secondaryButton}>
                            <Gift size={20} />
                            <span>Recursos Gratuitos</span>
                        </Link>
                    </div>
                </div>

                {/* Right Side - Featured Book Visual (40%) */}
                <div className={styles.visual}>
                    <div className={styles.bookDisplay}>
                        {/* Decorative Background Element */}
                        <div className={styles.decorativeCircle}></div>

                        {/* Featured Book */}
                        <div className={styles.featuredBook}>
                            <div className={styles.bookCover}>
                                <Image
                                    src="/images/books/poder-oracion.jpg"
                                    alt="El Poder de la Oración Transformadora"
                                    width={300}
                                    height={450}
                                    className={styles.bookImage}
                                    priority
                                />
                            </div>

                            {/* Book Info Card */}
                            <div className={styles.bookInfo}>
                                <div className={styles.bookBadge}>Más Vendido</div>
                                <h3 className={styles.bookTitle}>El Poder de la Oración Transformadora</h3>
                                <p className={styles.bookAuthor}>Por Juan Pérez</p>
                                <div className={styles.bookPrice}>
                                    <span className={styles.priceAmount}>$12.99</span>
                                    <Link href="/libro/poder-oracion" className={styles.bookCta}>
                                        Ver detalles
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className={styles.floatingElement1}>
                            <div className={styles.floatingCard}>
                                <div className={styles.floatingIcon}>📖</div>
                                <div className={styles.floatingText}>Descarga Instantánea</div>
                            </div>
                        </div>

                        <div className={styles.floatingElement2}>
                            <div className={styles.floatingCard}>
                                <div className={styles.floatingIcon}>⭐</div>
                                <div className={styles.floatingText}>4.9/5 Valoración</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
