import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/Breadcrumbs.module.css';

interface BreadcrumbsProps {
    category: string;
    bookTitle: string;
}

export default function Breadcrumbs({ category, bookTitle }: BreadcrumbsProps) {
    const categoryLabels: Record<string, string> = {
        maestros: 'Para Maestros',
        devocionales: 'Devocionales',
        predicaciones: 'Predicaciones',
        familias: 'Familias',
        ninos: 'Niños',
        jovenes: 'Jóvenes'
    };

    return (
        <nav className={styles.breadcrumbs}>
            <Link href="/" className={styles.link}>Inicio</Link>
            <span className={styles.separator}>&gt;</span>
            <Link href="/libreria" className={styles.link}>Librería</Link>
            <span className={styles.separator}>&gt;</span>
            <Link href={`/libreria?category=${category}`} className={styles.link}>
                {categoryLabels[category] || category}
            </Link>
            <span className={styles.separator}>&gt;</span>
            <span className={styles.current}>{bookTitle}</span>
        </nav>
    );
}
