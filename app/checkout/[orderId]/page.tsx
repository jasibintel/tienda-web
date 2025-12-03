'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import OrderSummary from '@/components/checkout/OrderSummary';
import TotalSection from '@/components/checkout/TotalSection';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import CheckoutButton from '@/components/checkout/CheckoutButton';
import { getOrderById } from '@/lib/mockOrders';
import { Order } from '@/lib/types';
import styles from '@/styles/pages/Checkout.module.css';

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.orderId as string;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'stripe' | 'wompi' | null>(null);
    const [processing, setProcessing] = useState(false);

    // Load order
    useEffect(() => {
        const loadOrder = () => {
            const foundOrder = getOrderById(orderId);

            if (!foundOrder) {
                setError('Orden no encontrada');
                setLoading(false);
                return;
            }

            // Validate order status
            if (foundOrder.status !== 'pending') {
                setError('Esta orden ya fue procesada');
                setLoading(false);
                return;
            }

            setOrder(foundOrder);
            setLoading(false);
        };

        loadOrder();
    }, [orderId]);

    // Handle checkout
    const handleCheckout = async () => {
        if (!selectedPaymentMethod) {
            alert('Debes seleccionar un método de pago');
            return;
        }

        if (!order) return;

        setProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setProcessing(false);
            // Redirect to success page
            router.push(`/checkout/success/${orderId}`);
        }, 2000);
    };

    // Loading state
    if (loading) {
        return (
            <main className={styles.main}>
                <CheckoutHeader />
                <div className={styles.loading}>
                    <p>Cargando tu pedido...</p>
                </div>
            </main>
        );
    }

    // Error state
    if (error || !order) {
        return (
            <main className={styles.main}>
                <CheckoutHeader />
                <div className={styles.error}>
                    <h2>Hubo un problema</h2>
                    <p>{error || 'No se pudo cargar la orden'}</p>
                    <button onClick={() => router.push('/libreria')} className={styles.errorButton}>
                        Volver al catálogo
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <CheckoutHeader />

            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <OrderSummary items={order.items} />
                    <TotalSection
                        subtotal={order.subtotal}
                        tax={order.tax}
                        total={order.total}
                    />
                </div>

                <div className={styles.rightColumn}>
                    <PaymentMethod
                        selectedMethod={selectedPaymentMethod}
                        onMethodChange={setSelectedPaymentMethod}
                    />

                    <CheckoutButton
                        onCheckout={handleCheckout}
                        loading={processing}
                        disabled={!selectedPaymentMethod}
                    />
                </div>
            </div>
        </main>
    );
}
