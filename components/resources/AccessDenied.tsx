'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../shared/Button';
import { Lock, BookOpen } from 'lucide-react';
import styles from '@/styles/components/resources/AccessDenied.module.css';

interface AccessDeniedProps {
    bookTitle?: string;
}

export default function AccessDenied({ bookTitle }: AccessDeniedProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    <Lock size={48} className={styles.icon} />
                </div>

                <h2 className={styles.title}>Contenido exclusivo</h2>

                <p className={styles.description}>
                    {bookTitle 
                        ? `El contenido extra de "${bookTitle}" solo está disponible para quienes han adquirido este libro.`
                        : 'Este contenido extra solo está disponible para quienes han adquirido el libro.'}
                </p>

                <p className={styles.subDescription}>
                    Si ya compraste este libro, asegúrate de haber iniciado sesión con la cuenta correcta.
                </p>

                <div className={styles.actions}>
                    <Button variant="primary" href="/libreria" className={styles.button}>
                        <BookOpen size={18} />
                        Explorar librería
                    </Button>
                    <Button variant="secondary" href="/mi-biblioteca" className={styles.button}>
                        Ver mi biblioteca
                    </Button>
                </div>
            </div>
        </section>
    );
}

