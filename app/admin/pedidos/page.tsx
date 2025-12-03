'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import EmptyState from '@/components/admin/EmptyState';
import { mockOrders } from '@/lib/mockOrders';
import { ShoppingBag, Eye } from 'lucide-react';
import styles from '@/styles/pages/admin/OrdersList.module.css';

type FilterType = 'all' | 'paid' | 'pending' | 'failed';

export default function OrdersListPage() {
    const router = useRouter();
    const [orders] = useState(mockOrders);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const filteredOrders = orders.filter(order => {
        switch (activeFilter) {
            case 'paid':
                return order.status === 'paid';
            case 'pending':
                return order.status === 'pending';
            case 'failed':
                return order.status === 'failed';
            default:
                return true;
        }
    });

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { label: string; className: string }> = {
            paid: { label: 'Pagado', className: styles.paid },
            pending: { label: 'Pendiente', className: styles.pending },
            failed: { label: 'Fallido', className: styles.failed },
            cancelled: { label: 'Cancelado', className: styles.cancelled }
        };
        return statusMap[status] || { label: status, className: '' };
    };

    return (
        <AdminLayout title="Pedidos">
            <div className={styles.container}>
                {/* Filters */}
                <div className={styles.filters}>
                    {(['all', 'paid', 'pending', 'failed'] as FilterType[]).map(filter => (
                        <button
                            key={filter}
                            className={`${styles.filterChip} ${activeFilter === filter ? styles.active : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter === 'all' && 'Todos'}
                            {filter === 'paid' && 'Pagados'}
                            {filter === 'pending' && 'Pendientes'}
                            {filter === 'failed' && 'Fallidos'}
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
                                    <th>Usuario</th>
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
                                    return (
                                        <tr key={order.id}>
                                            <td className={styles.orderId}>#{order.id.toUpperCase()}</td>
                                            <td>{order.userId}</td>
                                            <td>{order.items.length} libro{order.items.length > 1 ? 's' : ''}</td>
                                            <td className={styles.total}>${order.total.toLocaleString('es-CO')} COP</td>
                                            <td>
                                                <span className={`${styles.statusBadge} ${statusInfo.className}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td>{new Date(order.createdAt).toLocaleDateString('es-CO')}</td>
                                            <td>
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => router.push(`/admin/pedidos/${order.id}`)}
                                                    title="Ver detalle"
                                                >
                                                    <Eye size={16} />
                                                </button>
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
