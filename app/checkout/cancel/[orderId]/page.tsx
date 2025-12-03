'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import Button from '@/components/shared/Button';
import styles from '@/styles/pages/CheckoutResult.module.css';

export default function CheckoutCancelPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.orderId as string;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    <AlertCircle size={64} className={styles.warningIcon} />
                </div>

                <h1 className={styles.title}>Pago cancelado</h1>
                <p className={styles.message}>
                    No se realizó ningún cargo a tu cuenta.
                </p>

                <div className={styles.orderInfo}>
                    <p className={styles.orderLabel}>Número de orden:</p>
                    <p className={styles.orderId}>{orderId}</p>
                </div>

                <p className={styles.instructions}>
                    Puedes reintentar el pago cuando estés listo.
                </p>

                <div className={styles.actions}>
                    <Button variant="primary" onClick={() => router.push(`/checkout/${orderId}`)}>
                        Reintentar pago
                    </Button>
                    <Button variant="secondary" href="/libreria">
                        Volver al catálogo
                    </Button>
                </div>
            </div>
        </main>
    );
}
