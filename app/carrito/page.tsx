'use client';

import React from 'react';
import { useCart } from '@/lib/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import styles from '@/styles/pages/Cart.module.css';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, getItemCount, getSubtotal, getTotal } = useCart();

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
                        <CartSummary
                            subtotal={getSubtotal()}
                            total={getTotal()}
                            itemCount={getItemCount()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
