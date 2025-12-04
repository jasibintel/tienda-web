// Funciones para interactuar con pedidos en Firestore

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    addDoc,
    updateDoc,
    serverTimestamp,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { Order, OrderItem } from '@/lib/types';

const ORDERS_COLLECTION = 'orders';

// Convertir documento a Order
function docToOrder(docSnap: QueryDocumentSnapshot<DocumentData>): Order {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        buyerId: data.buyerId || data.userId || '', // Support both buyerId and userId for backward compatibility
        items: data.items || [],
        subtotal: data.subtotal || 0,
        tax: data.tax || 0,
        total: data.total || 0,
        status: data.status || 'pending',
        paymentMethod: data.paymentMethod,
        paymentIntentId: data.paymentIntentId,
        isGift: data.isGift || false,
        recipientEmail: data.recipientEmail || null,
        createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.().toISOString() || data.updatedAt || new Date().toISOString(),
        paidAt: data.paidAt?.toDate?.().toISOString() || data.paidAt
    } as Order;
}

// Crear pedido
export async function createOrder(params: {
    buyerId: string;
    items: OrderItem[];
    paymentMethod?: 'online-simulated' | 'manual' | 'stripe' | 'wompi';
    isGift?: boolean;
    recipientEmail?: string | null;
    paymentIntentId?: string;
}): Promise<string> {
    try {
        const { buyerId, items, paymentMethod, isGift = false, recipientEmail = null, paymentIntentId } = params;
        
        // Calcular totales
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.19; // IVA 19% (Colombia)
        const total = subtotal + tax;
        
        const orderData = {
            buyerId,
            items,
            subtotal,
            tax,
            total,
            status: 'pending' as const,
            paymentMethod: paymentMethod || null,
            paymentIntentId: paymentIntentId || null,
            isGift,
            recipientEmail,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
        return docRef.id; // Return orderId as string
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

// Obtener pedido por ID
export async function getOrderById(orderId: string): Promise<Order | null> {
    try {
        const orderRef = doc(db, ORDERS_COLLECTION, orderId);
        const orderDoc = await getDoc(orderRef);
        
        if (!orderDoc.exists()) {
            return null;
        }
        
        return docToOrder(orderDoc as QueryDocumentSnapshot<DocumentData>);
    } catch (error) {
        console.error('Error getting order:', error);
        throw error;
    }
}

// Obtener pedidos de un usuario
export async function getUserOrders(buyerId: string): Promise<Order[]> {
    try {
        const q = query(
            collection(db, ORDERS_COLLECTION),
            where('buyerId', '==', buyerId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToOrder);
    } catch (error) {
        console.error('Error getting user orders:', error);
        throw error;
    }
}

// Actualizar estado del pedido
export async function updateOrderStatus(
    orderId: string,
    status: Order['status'],
    paidAt?: string
): Promise<void> {
    try {
        const orderRef = doc(db, ORDERS_COLLECTION, orderId);
        const updateData: any = {
            status,
            updatedAt: serverTimestamp()
        };
        
        if (paidAt && status === 'paid') {
            updateData.paidAt = paidAt;
        }
        
        await updateDoc(orderRef, updateData);
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}

// Marcar orden como pagada
export async function markOrderAsPaid(orderId: string): Promise<void> {
    try {
        const orderRef = doc(db, ORDERS_COLLECTION, orderId);
        await updateDoc(orderRef, {
            status: 'paid' as const,
            paidAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error marking order as paid:', error);
        throw error;
    }
}

// Actualizar orden (para paymentMethod, isGift, recipientEmail)
export async function updateOrder(
    orderId: string,
    updates: {
        paymentMethod?: 'online-simulated' | 'manual' | 'stripe' | 'wompi';
        isGift?: boolean;
        recipientEmail?: string | null;
    }
): Promise<void> {
    try {
        const orderRef = doc(db, ORDERS_COLLECTION, orderId);
        await updateDoc(orderRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
}

// Obtener todos los pedidos (solo admin)
export async function getAllOrders(): Promise<Order[]> {
    try {
        const q = query(
            collection(db, ORDERS_COLLECTION),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToOrder);
    } catch (error) {
        console.error('Error getting all orders:', error);
        throw error;
    }
}

// Calcular totales del pedido
export function calculateOrderTotals(items: OrderItem[]): {
    subtotal: number;
    tax: number;
    total: number;
} {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.19; // IVA 19%
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
}

