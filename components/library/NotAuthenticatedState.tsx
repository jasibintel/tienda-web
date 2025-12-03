'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../shared/Button';
import { Lock } from 'lucide-react';
import styles from '@/styles/components/library/NotAuthenticatedState.module.css';

interface NotAuthenticatedStateProps {
    onLoginClick: () => void;
}

export default function NotAuthenticatedState({ onLoginClick }: NotAuthenticatedStateProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    <Lock size={32} className={styles.icon} />
                </div>

                <h2 className={styles.title}>Inicia sesión para ver tu biblioteca</h2>

                <p className={styles.description}>
                    Accede a todos los libros que has adquirido o descargado.
                    Tus recursos espirituales te están esperando.
                </p>

                <div className={styles.actions}>
                    <Button variant="primary" onClick={onLoginClick} className={styles.loginButton}>
                        Iniciar sesión
                    </Button>

                    <div className={styles.secondaryAction}>
                        <span className={styles.secondaryText}>¿Aún no tienes cuenta?</span>
                        <Link href="/registro" className={styles.link}>
                            Crear cuenta gratis
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
