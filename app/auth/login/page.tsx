'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import styles from '@/styles/pages/Login.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Redirect to library or home
            router.push('/mi-biblioteca');
        }, 1000);
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <p className={styles.subtitle}>Bienvenido de nuevo a De Gloria en Gloria</p>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button variant="primary" type="submit" className={styles.submitButton}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>¿No tienes una cuenta? <Link href="/registro" className={styles.link}>Regístrate gratis</Link></p>
                    <Link href="/recuperar-password" className={styles.forgotLink}>¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </main>
    );
}
