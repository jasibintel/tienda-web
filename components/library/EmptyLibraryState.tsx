'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../shared/Button';
import { BookOpen } from 'lucide-react';
import styles from '@/styles/components/library/EmptyLibraryState.module.css';

export default function EmptyLibraryState() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    <BookOpen size={64} className={styles.icon} strokeWidth={1} />
                </div>

                <h2 className={styles.title}>Aún no tienes libros en tu biblioteca</h2>

                <p className={styles.description}>
                    Permítenos acompañarte en tu crecimiento espiritual.
                    Descubre recursos que fortalecerán tu fe, profundizarán tu conocimiento
                    de la Palabra y te equiparán para servir con excelencia.
                </p>

                <Link href="/libreria" className={styles.buttonLink}>
                    <Button variant="primary">
                        Explorar librería
                    </Button>
                </Link>

                <p className={styles.footerMessage}>
                    Comienza con nuestros recursos gratuitos y construye tu biblioteca espiritual.
                </p>
            </div>
        </section>
    );
}
