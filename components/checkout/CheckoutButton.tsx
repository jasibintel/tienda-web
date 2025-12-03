'use client';

import React from 'react';
import Button from '../shared/Button';
import { Lock } from 'lucide-react';
import styles from '@/styles/components/checkout/CheckoutButton.module.css';

interface CheckoutButtonProps {
    onCheckout: () => void;
    loading: boolean;
    disabled: boolean;
}

export default function CheckoutButton({ onCheckout, loading, disabled }: CheckoutButtonProps) {
    return (
        <div className={styles.container}>
            <Button
                variant="primary"
                onClick={onCheckout}
                className={styles.button}
                disabled={disabled || loading}
            >
                {loading ? (
                    'Procesando...'
                ) : (
                    <>
                        <Lock size={16} />
                        Proceder al pago seguro
                    </>
                )}
            </Button>

            <div className={styles.legal}>
                <p className={styles.legalText}>
                    Al continuar aceptas la{' '}
                    <a href="/politica-privacidad" target="_blank" className={styles.link}>
                        Política de Privacidad
                    </a>
                    {' '}y los{' '}
                    <a href="/terminos" target="_blank" className={styles.link}>
                        Términos de Uso
                    </a>.
                </p>
                <p className={styles.blessing}>
                    Gracias por bendecir tu vida con recursos que edifican.
                </p>
            </div>
        </div>
    );
}
