'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import OrderSummary from '@/components/checkout/OrderSummary';
import TotalSection from '@/components/checkout/TotalSection';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import CheckoutButton from '@/components/checkout/CheckoutButton';
import { getOrderById, markOrderAsPaid, updateOrder } from '@/lib/firebase/orders';
import { grantBooksToUser } from '@/lib/firebase/library';
import { useAuth } from '@/lib/context/AuthContext';
import { Order } from '@/lib/types';
import styles from '@/styles/pages/Checkout.module.css';

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const orderId = params.orderId as string;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'online-simulated' | 'manual' | null>(null);
    const [isGift, setIsGift] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [processing, setProcessing] = useState(false);

    // Load order from Firestore
    useEffect(() => {
        const loadOrder = async () => {
            try {
                setLoading(true);
                const foundOrder = await getOrderById(orderId);

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

                // Validate buyer
                if (user && foundOrder.buyerId !== user.uid) {
                    setError('No tienes permiso para ver esta orden');
                    setLoading(false);
                    return;
                }

                setOrder(foundOrder);
                // Set initial values from order if they exist
                if (foundOrder.paymentMethod) {
                    setSelectedPaymentMethod(foundOrder.paymentMethod as 'online-simulated' | 'manual');
                }
                if (foundOrder.isGift) {
                    setIsGift(true);
                }
                if (foundOrder.recipientEmail) {
                    setRecipientEmail(foundOrder.recipientEmail);
                }
                setLoading(false);
            } catch (err: any) {
                console.error('Error loading order:', err);
                setError(err.message || 'Error al cargar la orden');
                setLoading(false);
            }
        };

        if (orderId) {
            loadOrder();
        }
    }, [orderId, user]);

    // Handle checkout
    const handleCheckout = async () => {
        if (!selectedPaymentMethod) {
            alert('Debes seleccionar un método de pago');
            return;
        }

        if (!order || !user) return;

        // Validate gift email if isGift is true
        if (isGift && !recipientEmail) {
            alert('Debes ingresar el correo del destinatario si es un regalo');
            return;
        }

        setProcessing(true);

        try {
            // Update order with payment method, isGift, and recipientEmail
            await updateOrder(orderId, {
                paymentMethod: selectedPaymentMethod,
                isGift,
                recipientEmail: isGift ? recipientEmail : null
            });

            if (selectedPaymentMethod === 'online-simulated') {
                // Pago simulado: marcar como pagado y otorgar libros
                await markOrderAsPaid(orderId);
                
                // Obtener bookIds de los items
                const bookIds = order.items.map(item => item.bookId);
                
                // Otorgar libros al comprador (por ahora, incluso si es regalo)
                await grantBooksToUser(order.buyerId, bookIds, orderId);
                
                // Redirigir a success
                router.push(`/checkout/success/${orderId}`);
            } else if (selectedPaymentMethod === 'manual') {
                // Pago manual: solo actualizar la orden, mantener status = "pending"
                // Mostrar mensaje informativo
                alert('Tu pedido ha sido creado. Cuando confirmemos tu pago, activaremos los libros en tu biblioteca.');
                
                // Redirigir a success
                router.push(`/checkout/success/${orderId}`);
            }
        } catch (err: any) {
            console.error('Error processing checkout:', err);
            alert(err.message || 'Error al procesar el pago. Por favor intenta de nuevo.');
            setProcessing(false);
        }
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
                    {/* Buyer Info */}
                    {user && (
                        <div style={{ 
                            padding: '20px', 
                            backgroundColor: '#f8f9fa', 
                            borderRadius: '8px', 
                            marginBottom: '24px' 
                        }}>
                            <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>
                                Datos del comprador
                            </h3>
                            <p style={{ margin: '4px 0' }}><strong>Email:</strong> {user.email}</p>
                            {user.displayName && (
                                <p style={{ margin: '4px 0' }}><strong>Nombre:</strong> {user.displayName}</p>
                            )}
                        </div>
                    )}

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
                        orderId={orderId}
                    />

                    {/* Gift Section */}
                    <div style={{ 
                        marginTop: '24px', 
                        padding: '20px', 
                        backgroundColor: '#fff', 
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={isGift}
                                onChange={(e) => setIsGift(e.target.checked)}
                                style={{ marginRight: '8px', width: '18px', height: '18px' }}
                            />
                            <span style={{ fontSize: '16px', fontWeight: '500' }}>¿Es un regalo?</span>
                        </label>

                        {isGift && (
                            <div style={{ marginTop: '12px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Correo del destinatario *
                                </label>
                                <input
                                    type="email"
                                    value={recipientEmail}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                />
                                <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                                    El libro será entregado a esta dirección de correo.
                                </p>
                            </div>
                        )}
                    </div>

                    <CheckoutButton
                        onCheckout={handleCheckout}
                        loading={processing}
                        disabled={!selectedPaymentMethod || (isGift && !recipientEmail)}
                    />
                </div>
            </div>
        </main>
    );
}
