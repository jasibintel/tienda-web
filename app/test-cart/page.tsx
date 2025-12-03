'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { useRouter } from 'next/navigation';
import { featuredBooks } from '@/lib/mockData';

export default function TestCartPage() {
    const { addToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        // Add some test items to cart
        if (featuredBooks.length > 0) {
            addToCart(featuredBooks[0], 1);
            if (featuredBooks.length > 1) {
                addToCart(featuredBooks[1], 2);
            }
            if (featuredBooks.length > 2) {
                addToCart(featuredBooks[2], 1);
            }
        }

        // Redirect to cart page
        setTimeout(() => {
            router.push('/carrito');
        }, 500);
    }, [addToCart, router]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Agregando productos de prueba al carrito...</h1>
            <p>Serás redirigido automáticamente.</p>
        </div>
    );
}
