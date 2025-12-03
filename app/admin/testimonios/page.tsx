'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import EmptyState from '@/components/admin/EmptyState';
import Button from '@/components/shared/Button';
import { mockAdminTestimonials } from '@/lib/mockAdminData';
import { MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';
import styles from '@/styles/pages/admin/TestimonialsList.module.css';

export default function TestimonialsListPage() {
    const router = useRouter();
    const [testimonials] = useState(mockAdminTestimonials);

    const handleDelete = (id: string) => {
        if (confirm('¿Eliminar este testimonio?\n\nEsta acción no se puede deshacer.')) {
            alert('Testimonio eliminado (mock)');
        }
    };

    return (
        <AdminLayout title="Testimonios">
            <div className={styles.container}>
                <div className={styles.header}>
                    <Button
                        variant="primary"
                        onClick={() => router.push('/admin/testimonios/crear')}
                    >
                        <Plus size={20} />
                        Agregar testimonio
                    </Button>
                </div>

                {testimonials.length === 0 ? (
                    <EmptyState
                        icon={MessageSquare}
                        title="No hay testimonios"
                        description="Aún no has creado ningún testimonio"
                        actionLabel="Crear primer testimonio"
                        onAction={() => router.push('/admin/testimonios/crear')}
                    />
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Cita</th>
                                    <th>Autor</th>
                                    <th>Ubicación</th>
                                    <th>Orden</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map(testimonial => (
                                    <tr key={testimonial.id}>
                                        <td className={styles.quoteCell}>
                                            "{testimonial.quote.substring(0, 60)}..."
                                        </td>
                                        <td>{testimonial.authorName}</td>
                                        <td>{testimonial.authorLocation}</td>
                                        <td>
                                            <span className={styles.orderBadge}>{testimonial.order}</span>
                                        </td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${testimonial.isActive ? styles.active : styles.inactive}`}>
                                                {testimonial.isActive ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => router.push(`/admin/testimonios/editar/${testimonial.id}`)}
                                                    title="Editar"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.danger}`}
                                                    onClick={() => handleDelete(testimonial.id)}
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
