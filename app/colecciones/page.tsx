'use client';

import React from 'react';
import CollectionsGrid from '@/components/collections/CollectionsGrid';
import Button from '@/components/shared/Button';
import { useCollections } from '@/lib/hooks/useCollections';
import styles from '@/styles/pages/Collections.module.css';

export default function CollectionsPage() {
    const { collections, loading, error } = useCollections();

    return (
        <div className={styles.main}>
            {/* Page Header */}
            <section className={styles.pageHeader}>
                <h1 className={styles.title}>Colecciones</h1>
                <p className={styles.subtitle}>
                    Explora series y conjuntos temáticos creados para tu crecimiento espiritual
                </p>
            </section>

            {/* Loading State */}
            {loading && (
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p>Cargando colecciones...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
                        Error al cargar colecciones
                    </p>
                    <p style={{ color: '#666', marginTop: '16px' }}>
                        {error}
                    </p>
                    <p style={{ fontSize: '14px', color: '#999', marginTop: '24px' }}>
                        Abre la consola del navegador (F12) para más detalles
                    </p>
                </div>
            )}

            {/* Collections Grid */}
            {!loading && !error && <CollectionsGrid collections={collections} />}

            {/* CTAs */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaGrid}>
                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>¿No encuentras lo que buscas?</h2>
                        <p className={styles.ctaDescription}>
                            Explora nuestro catálogo completo con todos los libros disponibles
                        </p>
                        <Button variant="primary" href="/libreria">
                            Ver catálogo completo
                        </Button>
                    </div>

                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>Descarga libros gratuitos</h2>
                        <p className={styles.ctaDescription}>
                            Accede a nuestra selección de recursos gratuitos para tu crecimiento espiritual
                        </p>
                        <Button variant="secondary" href="/gratis">
                            Ver libros gratuitos
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
