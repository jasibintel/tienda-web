import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/CatalogHero.module.css';

export default function CatalogHero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <nav className={styles.breadcrumbs}>
                    <Link href="/" className={styles.breadcrumbLink}>Inicio</Link>
                    <span className={styles.breadcrumbSeparator}>&gt;</span>
                    <span className={styles.breadcrumbCurrent}>Librería</span>
                </nav>

                <h1 className={styles.title}>Explora Nuestra Librería</h1>
                <p className={styles.subtitle}>
                    Encuentra el recurso perfecto para tu crecimiento espiritual. Usa los filtros para refinar tu búsqueda.
                </p>
            </div>
        </section>
    );
}
