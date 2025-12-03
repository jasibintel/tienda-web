'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import styles from '@/styles/components/EmptyCart.module.css';

export default function EmptyCart() {
    return (
        <div className={styles.emptyCart}>
            <div className={styles.iconContainer}>
                <ShoppingBag size={80} className={styles.icon} />
            </div>

            <h2 className={styles.title}>Tu carrito está vacío</h2>

            <p className={styles.description}>
                Aún no has agregado ningún libro a tu carrito. Explora nuestra librería y encuentra recursos que edificarán tu fe.
            </p>

            <div className={styles.actions}>
                <Link href="/libreria" className={styles.primaryButton}>
                    <span>Explorar Librería</span>
                    <ArrowRight size={20} />
                </Link>
                <Link href="/gratis" className={styles.secondaryButton}>
                    Recursos Gratuitos
                </Link>
            </div>
        </div>
    );
}
