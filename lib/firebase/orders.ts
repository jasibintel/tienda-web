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
        userId: data.userId,
        items: data.items || [],
        subtotal: data.subtotal || 0,
        tax: data.tax || 0,
        total: data.total || 0,
        status: data.status || 'pending',
        paymentMethod: data.paymentMethod,
        paymentIntentId: data.paymentIntentId,
        createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.().toISOString() || data.updatedAt || new Date().toISOString(),
        paidAt: data.paidAt?.toDate?.().toISOString() || data.paidAt
    } as Order;
}

// Crear pedido
export async function createOrder(
    userId: string,
    items: OrderItem[],
    paymentMethod?: 'stripe' | 'wompi',
    paymentIntentId?: string
): Promise<Order> {
    try {
        // Calcular totales
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.19; // IVA 19% (Colombia)
        const total = subtotal + tax;
        
        const orderData = {
            userId,
            items,
            subtotal,
            tax,
            total,
            status: 'pending' as const,
            paymentMethod,
            paymentIntentId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
        const newOrder = await getDoc(docRef);
        
        if (!newOrder.exists()) {
            throw new Error('Error al crear el pedido');
        }
        
        return docToOrder(newOrder as QueryDocumentSnapshot<DocumentData>);
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
export async function getUserOrders(userId: string): Promise<Order[]> {
    try {
        const q = query(
            collection(db, ORDERS_COLLECTION),
            where('userId', '==', userId),
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

