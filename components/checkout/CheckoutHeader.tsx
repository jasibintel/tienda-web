import React from 'react';
import styles from '@/styles/components/checkout/CheckoutHeader.module.css';

export default function CheckoutHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>Finaliza tu compra</h1>
                <p className={styles.subtitle}>Revisa tu pedido antes de continuar</p>
            </div>
        </header>
    );
}
