import React from 'react';
import styles from '@/styles/components/library/PageHeader.module.css';

export default function PageHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Mi Biblioteca</h1>
                <p className={styles.subtitle}>
                    Accede a todos los libros que has adquirido o descargado gratuitamente
                </p>
            </div>
        </header>
    );
}
