'use client';

import React from 'react';
import IntroSection from '@/components/free/IntroSection';
import FreeBooksGrid from '@/components/free/FreeBooksGrid';
import Button from '@/components/shared/Button';
import { useFreeBooks } from '@/lib/hooks/useBooks';
import { ArrowRight, FolderTree } from 'lucide-react';
import styles from '@/styles/pages/FreeResources.module.css';

export default function FreeResourcesPage() {
    const { books: freeBooks, loading, error } = useFreeBooks();

    return (
        <div className={styles.container}>
            {/* Page Header */}
            <section className={styles.pageHeader}>
                <h1 className={styles.title}>Recursos Gratuitos</h1>
                <p className={styles.subtitle}>
                    Descarga libros y materiales sin costo, creados para edificar tu vida espiritual.
                </p>
            </section>

            {/* Intro Section */}
            <IntroSection
                message="Creemos en bendecir sin esperar nada a cambio. Estos recursos son nuestra manera de sembrar en tu crecimiento espiritual. Cada libro ha sido creado con oración y dedicación para edificar tu fe y equiparte para servir con excelencia."
            />

            {/* Loading State */}
            {loading && (
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p>Cargando libros gratuitos...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
                        Error al cargar libros gratuitos
                    </p>
                    <p style={{ color: '#666', marginTop: '16px' }}>
                        {error}
                    </p>
                    <p style={{ fontSize: '14px', color: '#999', marginTop: '24px' }}>
                        Abre la consola del navegador (F12) para más detalles
                    </p>
                </div>
            )}

            {/* Free Books Grid */}
            {!loading && !error && <FreeBooksGrid books={freeBooks} />}

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>¿Te gustó lo que encontraste?</h2>
                    <p className={styles.ctaDescription}>
                        Descubre nuestra colección completa de libros, devocionales y recursos diseñados para llevar tu ministerio al siguiente nivel.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Button variant="primary" href="/libreria">
                            <ArrowRight size={16} />
                            Explorar toda la librería
                        </Button>
                        <Button variant="secondary" href="/colecciones">
                            <FolderTree size={16} />
                            Ver colecciones
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
