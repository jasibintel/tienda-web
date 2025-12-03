'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Book } from '@/lib/types';

export interface CartItem {
    book: Book;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (book: Book, quantity?: number) => void;
    removeFromCart: (bookId: string) => void;
    updateQuantity: (bookId: string, quantity: number) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getSubtotal: () => number;
    getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isClient, setIsClient] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        setIsClient(true);
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
    }, [items, isClient]);

    const addToCart = useCallback((book: Book, quantity: number = 1) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.book.id === book.id);

            if (existingItem) {
                // Update quantity if item already exists
                return prevItems.map((item) =>
                    item.book.id === book.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item
                return [...prevItems, { book, quantity }];
            }
        });
    }, []);

    const removeFromCart = useCallback((bookId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.book.id !== bookId));
    }, []);

    const updateQuantity = useCallback((bookId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(bookId);
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.book.id === bookId ? { ...item, quantity } : item
            )
        );
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const getItemCount = useCallback(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    const getSubtotal = useCallback(() => {
        return items.reduce((total, item) => {
            const price = item.book.price || 0;
            return total + price * item.quantity;
        }, 0);
    }, [items]);

    const getTotal = useCallback(() => {
        // For now, total = subtotal (can add taxes, shipping later)
        return getSubtotal();
    }, [getSubtotal]);

    const value = useMemo(
        () => ({
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getItemCount,
            getSubtotal,
            getTotal,
        }),
        [items, addToCart, removeFromCart, updateQuantity, clearCart, getItemCount, getSubtotal, getTotal]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
