'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import EmptyState from '@/components/admin/EmptyState';
import { getAllOrders, markOrderAsPaid } from '@/lib/firebase/orders';
import { grantBooksToUser } from '@/lib/firebase/library';
import { Order } from '@/lib/types';
import { ShoppingBag, Eye, CheckCircle } from 'lucide-react';
import styles from '@/styles/pages/admin/OrdersList.module.css';

type FilterType = 'all' | 'paid' | 'pending' | 'cancelled';

export default function OrdersListPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);

    // Load orders from Firestore
    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const allOrders = await getAllOrders();
                setOrders(allOrders);
            } catch (err: any) {
                console.error('Error loading orders:', err);
                setError(err.message || 'Error al cargar los pedidos');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        switch (activeFilter) {
            case 'paid':
                return order.status === 'paid';
            case 'pending':
                return order.status === 'pending';
            case 'cancelled':
                return order.status === 'cancelled';
            default:
                return true;
        }
    });

    const handleMarkAsPaid = async (order: Order) => {
        if (!confirm(`¿Confirmar que el pedido ${order.id} ha sido pagado?`)) {
            return;
        }

        setProcessingOrderId(order.id);

        try {
            // Marcar orden como pagada
            await markOrderAsPaid(order.id);

            // Obtener bookIds de los items
            const bookIds = order.items.map(item => item.bookId);

            // Otorgar libros al comprador
            await grantBooksToUser(order.buyerId, bookIds, order.id);

            // Refrescar lista
            const allOrders = await getAllOrders();
            setOrders(allOrders);

            alert('Libros activados en la biblioteca del usuario.');
        } catch (err: any) {
            console.error('Error marking order as paid:', err);
            alert(err.message || 'Error al marcar el pedido como pagado');
        } finally {
            setProcessingOrderId(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { label: string; className: string }> = {
            paid: { label: 'Pagado', className: styles.paid },
            pending: { label: 'Pendiente', className: styles.pending },
            cancelled: { label: 'Cancelado', className: styles.cancelled }
        };
        return statusMap[status] || { label: status, className: '' };
    };

    if (loading) {
        return (
            <AdminLayout title="Pedidos">
                <div className={styles.container}>
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <p>Cargando pedidos...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout title="Pedidos">
                <div className={styles.container}>
                    <div style={{ padding: '48px', textAlign: 'center' }}>
                        <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
                            Error al cargar pedidos
                        </p>
                        <p style={{ color: '#666', marginTop: '16px' }}>{error}</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Pedidos">
            <div className={styles.container}>
                {/* Filters */}
                <div className={styles.filters}>
                    {(['all', 'paid', 'pending', 'cancelled'] as FilterType[]).map(filter => (
                        <button
                            key={filter}
                            className={`${styles.filterChip} ${activeFilter === filter ? styles.active : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter === 'all' && 'Todos'}
                            {filter === 'paid' && 'Pagados'}
                            {filter === 'pending' && 'Pendientes'}
                            {filter === 'cancelled' && 'Cancelados'}
                        </button>
                    ))}
                </div>

                {filteredOrders.length === 0 ? (
                    <EmptyState
                        icon={ShoppingBag}
                        title="No hay pedidos"
                        description="Aún no se han realizado pedidos"
                    />
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Comprador</th>
                                    <th>Método de pago</th>
                                    <th>Libros</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => {
                                    const statusInfo = getStatusBadge(order.status);
                                    const canMarkAsPaid = order.paymentMethod === 'manual' && order.status === 'pending';
                                    return (
                                        <tr key={order.id}>
                                            <td className={styles.orderId}>#{order.id.substring(0, 8).toUpperCase()}</td>
                                            <td>{order.buyerId.substring(0, 20)}...</td>
                                            <td>
                                                {order.paymentMethod === 'online-simulated' && 'Simulado'}
                                                {order.paymentMethod === 'manual' && 'Manual'}
                                                {order.paymentMethod === 'stripe' && 'Stripe'}
                                                {order.paymentMethod === 'wompi' && 'Wompi'}
                                                {!order.paymentMethod && 'N/A'}
                                            </td>
                                            <td>{order.items.length} libro{order.items.length > 1 ? 's' : ''}</td>
                                            <td className={styles.total}>${order.total.toLocaleString('es-CO')} COP</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${statusInfo.className}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td>{new Date(order.createdAt).toLocaleDateString('es-CO')}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button
                                                        className={styles.actionButton}
                                                        onClick={() => router.push(`/admin/pedidos/${order.id}`)}
                                                        title="Ver detalle"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    {canMarkAsPaid && (
                                                        <button
                                                            className={styles.actionButton}
                                                            onClick={() => handleMarkAsPaid(order)}
                                                            disabled={processingOrderId === order.id}
                                                            title="Marcar como pagado"
                                                            style={{ 
                                                                backgroundColor: '#10b981', 
                                                                color: 'white',
                                                                opacity: processingOrderId === order.id ? 0.6 : 1
                                                            }}
                                                        >
                                                            {processingOrderId === order.id ? (
                                                                <span style={{ fontSize: '12px' }}>...</span>
                                                            ) : (
                                                                <CheckCircle size={16} />
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
