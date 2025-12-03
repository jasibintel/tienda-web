'use client';

import React from 'react';
import { CreditCard, Smartphone, Lock } from 'lucide-react';
import styles from '@/styles/components/checkout/PaymentMethod.module.css';

interface PaymentMethodProps {
    selectedMethod: 'stripe' | 'wompi' | null;
    onMethodChange: (method: 'stripe' | 'wompi') => void;
}

export default function PaymentMethod({ selectedMethod, onMethodChange }: PaymentMethodProps) {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Método de pago</h2>

            <div className={styles.methods}>
                {/* Stripe */}
                <button
                    className={`${styles.methodCard} ${selectedMethod === 'stripe' ? styles.selected : ''}`}
                    onClick={() => onMethodChange('stripe')}
                >
                    <CreditCard size={32} className={styles.icon} />
                    <div className={styles.methodInfo}>
                        <h3 className={styles.methodName}>Tarjeta de crédito/débito</h3>
                        <p className={styles.methodDescription}>Procesado por Stripe</p>
                        <div className={styles.cardLogos}>
                            <span className={styles.cardBrand}>Visa</span>
                            <span className={styles.cardBrand}>Mastercard</span>
                            <span className={styles.cardBrand}>Amex</span>
                        </div>
                    </div>
                </button>

                {/* Wompi */}
                <button
                    className={`${styles.methodCard} ${selectedMethod === 'wompi' ? styles.selected : ''}`}
                    onClick={() => onMethodChange('wompi')}
                >
                    <Smartphone size={32} className={styles.icon} />
                    <div className={styles.methodInfo}>
                        <h3 className={styles.methodName}>PSE / Nequi / Bancolombia</h3>
                        <p className={styles.methodDescription}>Procesado por Wompi</p>
                    </div>
                </button>
            </div>

            <div className={styles.security}>
                <div className={styles.securityItem}>
                    <Lock size={16} />
                    <span>Pago 100% seguro</span>
                </div>
                <p className={styles.securityNote}>Tus datos jamás serán compartidos</p>
            </div>
        </div>
    );
}
