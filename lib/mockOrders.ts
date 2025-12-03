// ============================================
// Mock Orders Data - De Gloria en Gloria
// ============================================

import { Order, OrderItem } from './types';

// Helper function to calculate totals
export function calculateOrderTotals(items: OrderItem[]): {
    subtotal: number;
    tax: number;
    total: number;
} {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.19); // 19% IVA Colombia
    const total = subtotal + tax;

    return { subtotal, tax, total };
}

// Mock orders
export const mockOrders: Order[] = [
    {
        id: 'order-001',
        userId: 'mock-user-1',
        items: [
            {
                bookId: '1',
                title: 'El Poder de la Oración Transformadora',
                author: 'Dr. Samuel Martínez',
                coverUrl: '/images/book-placeholder.svg',
                price: 35000,
                isFree: false,
                formats: ['PDF', 'EPUB'],
                quantity: 1
            },
            {
                bookId: '2',
                title: 'Liderazgo con Propósito',
                author: 'Pastor Carlos Gómez',
                coverUrl: '/images/book-placeholder.svg',
                price: 42000,
                isFree: false,
                formats: ['PDF', 'EPUB'],
                quantity: 1
            }
        ],
        subtotal: 77000,
        tax: 14630,
        total: 91630,
        status: 'pending',
        createdAt: '2024-12-02T20:00:00Z',
        updatedAt: '2024-12-02T20:00:00Z'
    },
    {
        id: 'order-002',
        userId: 'mock-user-1',
        items: [
            {
                bookId: '3',
                title: 'La Familia según el Corazón de Dios',
                author: 'Dra. María Rodríguez',
                coverUrl: '/images/book-placeholder.svg',
                price: 38000,
                isFree: false,
                formats: ['PDF', 'EPUB'],
                quantity: 1
            }
        ],
        subtotal: 38000,
        tax: 7220,
        total: 45220,
        status: 'pending',
        createdAt: '2024-12-02T19:30:00Z',
        updatedAt: '2024-12-02T19:30:00Z'
    },
    {
        id: 'order-003',
        userId: 'mock-user-1',
        items: [
            {
                bookId: '4',
                title: 'Predicando con Poder',
                author: 'Rev. Juan Pérez',
                coverUrl: '/images/book-placeholder.svg',
                price: 45000,
                isFree: false,
                formats: ['PDF'],
                quantity: 1
            }
        ],
        subtotal: 45000,
        tax: 8550,
        total: 53550,
        status: 'paid',
        paymentMethod: 'stripe',
        paymentIntentId: 'pi_mock_123',
        createdAt: '2024-12-01T15:00:00Z',
        updatedAt: '2024-12-01T15:05:00Z',
        paidAt: '2024-12-01T15:05:00Z'
    }
];

// Helper functions
export function getOrderById(orderId: string): Order | null {
    return mockOrders.find(order => order.id === orderId) || null;
}

export function getUserOrders(userId: string): Order[] {
    return mockOrders.filter(order => order.userId === userId);
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
