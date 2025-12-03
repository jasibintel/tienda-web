'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Button from '@/components/shared/Button';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import styles from '@/styles/pages/Login.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const { register, loginWithGoogle } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await register(email, password, name);
            router.push('/mi-biblioteca');
        } catch (err: any) {
            setError(err.message || 'Error al crear la cuenta');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            await loginWithGoogle();
            router.push('/mi-biblioteca');
        } catch (err: any) {
            setError(err.message || 'Error al registrarse con Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Crear Cuenta</h1>
                <p className={styles.subtitle}>Únete a nuestra comunidad de lectores</p>

                {error && (
                    <div className={styles.errorMessage}>
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form className={styles.form} onSubmit={handleRegister}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            <User size={18} />
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={styles.input}
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            <Mail size={18} />
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>
                            <Lock size={18} />
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            disabled={loading}
                        />
                    </div>

                    <Button
                        variant="primary"
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </Button>
                </form>

                <div className={styles.divider}>
                    <span>o</span>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className={styles.googleButton}
                >
                    <svg className={styles.googleIcon} viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar con Google
                </button>

                <div className={styles.footer}>
                    <p>¿Ya tienes una cuenta? <Link href="/auth/login" className={styles.link}>Inicia sesión</Link></p>
                </div>
            </div>
        </main>
    );
}
