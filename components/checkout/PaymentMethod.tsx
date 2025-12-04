'use client';

import React from 'react';
import { CreditCard, Smartphone, Lock, Banknote, CheckCircle } from 'lucide-react';
import styles from '@/styles/components/checkout/PaymentMethod.module.css';

interface PaymentMethodProps {
    selectedMethod: 'online-simulated' | 'manual' | 'stripe' | 'wompi' | null;
    onMethodChange: (method: 'online-simulated' | 'manual' | 'stripe' | 'wompi') => void;
    orderId?: string;
}

export default function PaymentMethod({ selectedMethod, onMethodChange, orderId }: PaymentMethodProps) {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Método de pago</h2>

            <div className={styles.methods}>
                {/* Pago simulado en línea */}
                <button
                    className={`${styles.methodCard} ${selectedMethod === 'online-simulated' ? styles.selected : ''}`}
                    onClick={() => onMethodChange('online-simulated')}
                >
                    <CheckCircle size={32} className={styles.icon} />
                    <div className={styles.methodInfo}>
                        <h3 className={styles.methodName}>Pago simulado en línea</h3>
                        <p className={styles.methodDescription}>Para pruebas - Se procesa inmediatamente</p>
                    </div>
                </button>

                {/* Pago manual / transferencia */}
                <button
                    className={`${styles.methodCard} ${selectedMethod === 'manual' ? styles.selected : ''}`}
                    onClick={() => onMethodChange('manual')}
                >
                    <Banknote size={32} className={styles.icon} />
                    <div className={styles.methodInfo}>
                        <h3 className={styles.methodName}>Pago manual / Transferencia</h3>
                        <p className={styles.methodDescription}>Transferencia bancaria o pago en efectivo</p>
                    </div>
                </button>

                {/* Stripe (mantener para futuro) */}
                <button
                    className={`${styles.methodCard} ${selectedMethod === 'stripe' ? styles.selected : ''}`}
                    onClick={() => onMethodChange('stripe')}
                    disabled
                    style={{ opacity: 0.5 }}
                >
                    <CreditCard size={32} className={styles.icon} />
                    <div className={styles.methodInfo}>
                        <h3 className={styles.methodName}>Tarjeta de crédito/débito</h3>
                        <p className={styles.methodDescription}>Procesado por Stripe (Próximamente)</p>
                    </div>
                </button>

                {/* Wompi (mantener para futuro) */}
                <button
                    className={`${styles.methodCard} ${selectedMethod === 'wompi' ? styles.selected : ''}`}
                    onClick={() => onMethodChange('wompi')}
                    disabled
                    style={{ opacity: 0.5 }}
                >
                    <Smartphone size={32} className={styles.icon} />
                    <div className={styles.methodInfo}>
                        <h3 className={styles.methodName}>PSE / Nequi / Bancolombia</h3>
                        <p className={styles.methodDescription}>Procesado por Wompi (Próximamente)</p>
                    </div>
                </button>
            </div>

            {/* Instrucciones de pago manual */}
            {selectedMethod === 'manual' && (
                <div className={styles.manualInstructions}>
                    <h3 className={styles.instructionsTitle}>Instrucciones de pago</h3>
                    <div className={styles.instructionsContent}>
                        <p><strong>1. Realiza tu transferencia a:</strong></p>
                        <p>Banco: [Nombre del Banco]</p>
                        <p>Cuenta: [Número de cuenta]</p>
                        <p>Tipo: Ahorros / Corriente</p>
                        <p>Titular: De Gloria en Gloria</p>
                        
                        <p style={{ marginTop: '16px' }}><strong>2. Envía el comprobante a:</strong></p>
                        <p>soporte@deglorialibros.com</p>
                        
                        <p style={{ marginTop: '16px' }}><strong>3. Usa este número de pedido como referencia:</strong></p>
                        <p className={styles.orderIdRef}>{orderId || 'N/A'}</p>
                        
                        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
                            Una vez confirmemos tu pago, activaremos los libros en tu biblioteca.
                        </p>
                    </div>
                </div>
            )}

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
