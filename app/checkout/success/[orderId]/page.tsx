'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Button from '@/components/shared/Button';
import { getOrderById } from '@/lib/firebase/orders';
import { Order } from '@/lib/types';
import styles from '@/styles/pages/CheckoutResult.module.css';

export default function CheckoutSuccessPage() {
    const params = useParams();
    const orderId = params.orderId as string;
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const foundOrder = await getOrderById(orderId);
                if (!foundOrder) {
                    setError('Orden no encontrada');
                } else {
                    setOrder(foundOrder);
                }
            } catch (err: any) {
                console.error('Error loading order:', err);
                setError(err.message || 'Error al cargar la orden');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            loadOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <p>Cargando información de la orden...</p>
                </div>
            </main>
        );
    }

    if (error || !order) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <AlertCircle size={64} style={{ color: '#c33', marginBottom: '24px' }} />
                    <h1 className={styles.title}>Error</h1>
                    <p className={styles.message}>{error || 'No se pudo cargar la orden'}</p>
                    <div className={styles.actions}>
                        <Button variant="secondary" href="/libreria">
                            Volver al catálogo
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    const isPaid = order.status === 'paid' && order.paymentMethod === 'online-simulated';
    const isManualPending = order.paymentMethod === 'manual' && order.status === 'pending';

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    {isPaid ? (
                        <CheckCircle size={64} className={styles.successIcon} />
                    ) : (
                        <Clock size={64} style={{ color: '#f2b544' }} />
                    )}
                </div>

                <h1 className={styles.title}>
                    {isPaid ? '¡Pago completado!' : 'Pedido creado'}
                </h1>

                <p className={styles.message}>
                    {isPaid
                        ? 'Tu compra fue exitosa. Los libros ya están disponibles en tu biblioteca.'
                        : 'Tu pedido ha sido creado. Falta que confirmemos tu pago manual.'}
                </p>

                {isManualPending && (
                    <p className={styles.message} style={{ marginTop: '12px' }}>
                        Cuando se confirme, verás los libros en tu biblioteca.
                    </p>
                )}

                <div className={styles.orderInfo}>
                    <p className={styles.orderLabel}>Número de orden:</p>
                    <p className={styles.orderId}>{orderId}</p>
                </div>

                {isManualPending && (
                    <div style={{
                        marginTop: '24px',
                        padding: '20px',
                        backgroundColor: '#fff8e6',
                        borderRadius: '8px',
                        border: '1px solid #f2b544',
                        textAlign: 'left'
                    }}>
                        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
                            Instrucciones de pago
                        </h3>
                        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                            <p><strong>1. Realiza tu transferencia a:</strong></p>
                            <p>Banco: [Nombre del Banco]</p>
                            <p>Cuenta: [Número de cuenta]</p>
                            <p>Tipo: Ahorros / Corriente</p>
                            <p>Titular: De Gloria en Gloria</p>
                            
                            <p style={{ marginTop: '12px' }}><strong>2. Envía el comprobante a:</strong></p>
                            <p>soporte@deglorialibros.com</p>
                            
                            <p style={{ marginTop: '12px' }}><strong>3. Usa este número de pedido como referencia:</strong></p>
                            <p style={{ 
                                fontFamily: 'monospace', 
                                fontSize: '16px', 
                                fontWeight: '600',
                                color: '#333',
                                backgroundColor: '#fff',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                display: 'inline-block'
                            }}>{orderId}</p>
                        </div>
                    </div>
                )}

                {isPaid && (
                    <p className={styles.instructions}>
                        Revisa tu correo electrónico para acceder a tus libros. También los encontrarás en tu biblioteca personal.
                    </p>
                )}

                <div className={styles.actions}>
                    {isPaid && (
                        <Button variant="primary" href="/mi-biblioteca">
                            Ir a Mi Biblioteca
                        </Button>
                    )}
                    <Button variant="secondary" href="/libreria">
                        {isPaid ? 'Seguir comprando' : 'Volver al catálogo'}
                    </Button>
                </div>
            </div>
        </main>
    );
}
