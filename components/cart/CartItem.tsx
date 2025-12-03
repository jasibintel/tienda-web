'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/context/CartContext';
import styles from '@/styles/components/CartItem.module.css';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (bookId: string, quantity: number) => void;
    onRemove: (bookId: string) => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const { book, quantity } = item;
    const subtotal = (book.price || 0) * quantity;

    const handleDecrease = () => {
        if (quantity > 1) {
            onUpdateQuantity(book.id, quantity - 1);
        }
    };

    const handleIncrease = () => {
        onUpdateQuantity(book.id, quantity + 1);
    };

    return (
        <div className={styles.cartItem}>
            {/* Book Cover */}
            <div className={styles.coverContainer}>
                <Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={80}
                    height={120}
                    className={styles.cover}
                    loading="lazy"
                />
            </div>

            {/* Book Info */}
            <div className={styles.info}>
                <h3 className={styles.title}>{book.title}</h3>
                {book.author && (
                    <p className={styles.author}>{book.author}</p>
                )}
                <p className={styles.price}>
                    ${book.price?.toLocaleString('es-CO')} COP
                </p>
            </div>

            {/* Quantity Controls */}
            <div className={styles.quantitySection}>
                <div className={styles.quantityControls}>
                    <button
                        className={styles.quantityButton}
                        onClick={handleDecrease}
                        aria-label="Disminuir cantidad"
                    >
                        <Minus size={16} />
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button
                        className={styles.quantityButton}
                        onClick={handleIncrease}
                        aria-label="Aumentar cantidad"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Subtotal */}
            <div className={styles.subtotalSection}>
                <p className={styles.subtotal}>
                    ${subtotal.toLocaleString('es-CO')} COP
                </p>
            </div>

            {/* Remove Button */}
            <button
                className={styles.removeButton}
                onClick={() => onRemove(book.id)}
                aria-label="Eliminar del carrito"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}

export default memo(CartItem);
