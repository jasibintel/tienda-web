import React from 'react';
import { formatCurrency } from '@/lib/mockOrders';
import styles from '@/styles/components/checkout/TotalSection.module.css';

interface TotalSectionProps {
    subtotal: number;
    tax: number;
    total: number;
}

export default function TotalSection({ subtotal, tax, total }: TotalSectionProps) {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Resumen de pago</h2>

            <div className={styles.breakdown}>
                <div className={styles.row}>
                    <span className={styles.label}>Subtotal</span>
                    <span className={styles.value}>{formatCurrency(subtotal)}</span>
                </div>

                <div className={styles.row}>
                    <span className={styles.label}>IVA (19%)</span>
                    <span className={styles.value}>{formatCurrency(tax)}</span>
                </div>

                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total</span>
                    <span className={styles.totalValue}>{formatCurrency(total)}</span>
                </div>
            </div>

            <p className={styles.note}>
                Este es un producto digital. Recibirás tu libro en tu correo y en tu Biblioteca.
            </p>
        </div>
    );
}
