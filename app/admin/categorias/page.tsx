'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import EmptyState from '@/components/admin/EmptyState';
import Button from '@/components/shared/Button';
import { mockAdminCategories } from '@/lib/mockAdminData';
import { FolderTree, Plus, Edit, Trash2 } from 'lucide-react';
import styles from '@/styles/pages/admin/CategoriesList.module.css';

export default function CategoriesListPage() {
    const router = useRouter();
    const [categories] = useState(mockAdminCategories);

    const handleDelete = (id: string, name: string) => {
        if (confirm(`¿Eliminar categoría "${name}"?\n\nEsta acción no se puede deshacer.`)) {
            alert('Categoría eliminada (mock)');
        }
    };

    return (
        <AdminLayout title="Categorías">
            <div className={styles.container}>
                <div className={styles.header}>
                    <Button
                        variant="primary"
                        onClick={() => router.push('/admin/categorias/crear')}
                    >
                        <Plus size={20} />
                        Agregar categoría
                    </Button>
                </div>

                {categories.length === 0 ? (
                    <EmptyState
                        icon={FolderTree}
                        title="No hay categorías"
                        description="Aún no has creado ninguna categoría"
                        actionLabel="Crear primera categoría"
                        onAction={() => router.push('/admin/categorias/crear')}
                    />
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Icono</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Libros</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => (
                                    <tr key={category.id}>
                                        <td>
                                            <div className={styles.iconCell}>
                                                <span className={styles.icon}>📚</span>
                                            </div>
                                        </td>
                                        <td className={styles.nameCell}>
                                            <span className={styles.name}>{category.name}</span>
                                            <span className={styles.slug}>{category.slug}</span>
                                        </td>
                                        <td className={styles.description}>
                                            {category.description || '-'}
                                        </td>
                                        <td>
                                            <span className={styles.bookCount}>{category.bookCount} libros</span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => router.push(`/admin/categorias/editar/${category.id}`)}
                                                    title="Editar"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.danger}`}
                                                    onClick={() => handleDelete(category.id, category.name)}
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
