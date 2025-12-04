'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { createOrder } from '@/lib/firebase/orders';
import { OrderItem } from '@/lib/types';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import styles from '@/styles/pages/Cart.module.css';

export default function CartPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { items, updateQuantity, removeFromCart, getItemCount, getSubtotal, getTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        // Verificar autenticación
        if (!user) {
            router.push('/auth/login?redirect=/carrito');
            return;
        }

        if (items.length === 0) {
            setError('Tu carrito está vacío');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Convertir items del carrito a OrderItem[]
            const orderItems: OrderItem[] = items.map(item => ({
                bookId: item.book.id,
                title: item.book.title,
                author: item.book.author,
                coverUrl: item.book.coverUrl,
                price: item.book.price || 0,
                isFree: item.book.isFree,
                formats: item.book.formats || [],
                quantity: item.quantity
            }));

            // Crear orden en Firestore
            const orderId = await createOrder({
                buyerId: user.uid,
                items: orderItems
            });

            // Limpiar carrito
            clearCart();

            // Redirigir a checkout
            router.push(`/checkout/${orderId}`);
        } catch (err: any) {
            console.error('Error creating order:', err);
            setError(err.message || 'Error al crear la orden. Por favor intenta de nuevo.');
            setLoading(false);
        }
    };

    // Show empty state if no items
    if (items.length === 0) {
        return (
            <div className={styles.page}>
                <EmptyCart />
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>Carrito de Compras</h1>
                    <p className={styles.subtitle}>
                        {getItemCount()} {getItemCount() === 1 ? 'libro' : 'libros'} en tu carrito
                    </p>
                </div>

                {/* Main Content */}
                <div className={styles.content}>
                    {/* Cart Items */}
                    <div className={styles.itemsSection}>
                        <div className={styles.itemsList}>
                            {items.map((item) => (
                                <CartItem
                                    key={item.book.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className={styles.summarySection}>
                        {error && (
                            <div style={{ 
                                padding: '12px', 
                                backgroundColor: '#fee', 
                                color: '#c33', 
                                borderRadius: '8px', 
                                marginBottom: '16px' 
                            }}>
                                {error}
                            </div>
                        )}
                        <CartSummary
                            subtotal={getSubtotal()}
                            total={getTotal()}
                            itemCount={getItemCount()}
                            onCheckout={handleCheckout}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
