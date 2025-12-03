'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import styles from '@/styles/pages/Login.module.css'; // Reuse login styles

export default function RegisterPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Crear Cuenta</h1>
                <p className={styles.subtitle}>Únete a nuestra comunidad de lectores</p>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Nombre completo</label>
                        <input type="text" id="name" className={styles.input} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                        <input type="email" id="email" className={styles.input} required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Contraseña</label>
                        <input type="password" id="password" className={styles.input} required />
                    </div>

                    <Button variant="primary" type="submit" className={styles.submitButton}>
                        Registrarse
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>¿Ya tienes una cuenta? <Link href="/auth/login" className={styles.link}>Inicia sesión</Link></p>
                </div>
            </div>
        </main>
    );
}
