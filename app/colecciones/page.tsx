import React from 'react';
import CollectionsGrid from '@/components/collections/CollectionsGrid';
import Button from '@/components/shared/Button';
import { getActiveCollections } from '@/lib/mockCollections';
import styles from '@/styles/pages/Collections.module.css';

export default function CollectionsPage() {
    const collections = getActiveCollections();

    return (
        <div className={styles.main}>
            {/* Page Header */}
            <section className={styles.pageHeader}>
                <h1 className={styles.title}>Colecciones</h1>
                <p className={styles.subtitle}>
                    Explora series y conjuntos temáticos creados para tu crecimiento espiritual
                </p>
            </section>

            {/* Collections Grid */}
            <CollectionsGrid collections={collections} />

            {/* CTAs */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaGrid}>
                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>¿No encuentras lo que buscas?</h2>
                        <p className={styles.ctaDescription}>
                            Explora nuestro catálogo completo con todos los libros disponibles
                        </p>
                        <Button variant="primary" href="/catalogo">
                            Ver catálogo completo
                        </Button>
                    </div>

                    <div className={styles.ctaCard}>
                        <h2 className={styles.ctaTitle}>Descarga libros gratuitos</h2>
                        <p className={styles.ctaDescription}>
                            Accede a nuestra selección de recursos gratuitos para tu crecimiento espiritual
                        </p>
                        <Button variant="secondary" href="/catalogo?filter=free">
                            Ver libros gratuitos
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
