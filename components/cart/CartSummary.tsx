'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/components/CartSummary.module.css';

interface CartSummaryProps {
    subtotal: number;
    total: number;
    itemCount: number;
    onCheckout?: () => void;
    loading?: boolean;
}

export default function CartSummary({ subtotal, total, itemCount, onCheckout, loading = false }: CartSummaryProps) {
    return (
        <div className={styles.summary}>
            <h2 className={styles.title}>Resumen del Pedido</h2>

            <div className={styles.details}>
                <div className={styles.row}>
                    <span className={styles.label}>Subtotal ({itemCount} {itemCount === 1 ? 'libro' : 'libros'})</span>
                    <span className={styles.value}>${subtotal.toLocaleString('es-CO')} COP</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>Envío</span>
                    <span className={styles.value}>Digital - Gratis</span>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total</span>
                    <span className={styles.totalValue}>${total.toLocaleString('es-CO')} COP</span>
                </div>
            </div>

            <button
                onClick={onCheckout}
                disabled={loading || !onCheckout}
                className={styles.checkoutButton}
            >
                <span>{loading ? 'Procesando...' : 'Proceder al Pago'}</span>
                {!loading && <ArrowRight size={20} />}
            </button>

            <p className={styles.note}>
                Los libros digitales se enviarán a tu correo electrónico inmediatamente después del pago.
            </p>
        </div>
    );
}
