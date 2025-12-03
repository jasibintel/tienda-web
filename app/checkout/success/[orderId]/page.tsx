'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/shared/Button';
import styles from '@/styles/pages/CheckoutResult.module.css';

export default function CheckoutSuccessPage() {
    const params = useParams();
    const orderId = params.orderId as string;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    <CheckCircle size={64} className={styles.successIcon} />
                </div>

                <h1 className={styles.title}>¡Pago completado!</h1>
                <p className={styles.message}>
                    Tu compra ha sido procesada exitosamente.
                </p>

                <div className={styles.orderInfo}>
                    <p className={styles.orderLabel}>Número de orden:</p>
                    <p className={styles.orderId}>{orderId}</p>
                </div>

                <p className={styles.instructions}>
                    Revisa tu correo electrónico para acceder a tus libros. También los encontrarás en tu biblioteca personal.
                </p>

                <div className={styles.actions}>
                    <Button variant="primary" href="/mi-biblioteca">
                        Ir a Mi Biblioteca
                    </Button>
                    <Button variant="secondary" href="/libreria">
                        Seguir comprando
                    </Button>
                </div>
            </div>
        </main>
    );
}
