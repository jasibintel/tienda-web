'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import EmptyState from '@/components/admin/EmptyState';
import Button from '@/components/shared/Button';
import { useBooks } from '@/lib/hooks/useBooks';
import { deleteBook, updateBook } from '@/lib/firebase/books';
import { useAuth } from '@/lib/context/AuthContext';
import { Book as BookIcon, Plus, Search, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import styles from '@/styles/pages/admin/BooksList.module.css';

type FilterType = 'all' | 'free' | 'paid' | 'featured' | 'active' | 'inactive';

export default function BooksListPage() {
    const router = useRouter();
    const { user, isAdmin, loading: authLoading } = useAuth();
    const { books: allBooks, loading: booksLoading, refetch } = useBooks();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    
    // Verificar permisos de admin
    useEffect(() => {
        if (!authLoading && (!user || !isAdmin)) {
            router.push('/');
        }
    }, [user, isAdmin, authLoading, router]);
    
    if (authLoading || booksLoading) {
        return (
            <AdminLayout title="Libros">
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p>Cargando...</p>
                </div>
            </AdminLayout>
        );
    }
    
    if (!user || !isAdmin) {
        return null; // Redirigirá en el useEffect
    }

    // Filter books
    const filteredBooks = allBooks.filter(book => {
        // Search filter
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Type filter
        switch (activeFilter) {
            case 'free':
                return book.isFree;
            case 'paid':
                return !book.isFree;
            case 'featured':
                return book.featured;
            case 'active':
                return book.isActive !== false;
            case 'inactive':
                return book.isActive === false;
            default:
                return true;
        }
    });

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`¿Eliminar "${title}"?\n\nEsta acción no se puede deshacer.`)) {
            return;
        }
        
        try {
            await deleteBook(id);
            alert(`Libro "${title}" eliminado exitosamente`);
            refetch(); // Recargar la lista
        } catch (error: any) {
            console.error('Error al eliminar libro:', error);
            alert(`Error al eliminar libro: ${error.message}`);
        }
    };

    const handleToggleActive = async (id: string, currentActive: boolean) => {
        try {
            await updateBook(id, { isActive: !currentActive });
            refetch(); // Recargar la lista
        } catch (error: any) {
            console.error('Error al cambiar estado del libro:', error);
            alert(`Error al actualizar libro: ${error.message}`);
        }
    };

    return (
        <AdminLayout title="Libros">
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.searchWrapper}>
                        <Search size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar por título o autor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => router.push('/admin/libros/crear')}
                    >
                        <Plus size={20} />
                        Crear nuevo libro
                    </Button>
                </div>

                {/* Filters */}
                <div className={styles.filters}>
                    {(['all', 'free', 'paid', 'featured', 'active', 'inactive'] as FilterType[]).map(filter => (
                        <button
                            key={filter}
                            className={`${styles.filterChip} ${activeFilter === filter ? styles.active : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter === 'all' && 'Todos'}
                            {filter === 'free' && 'Gratuitos'}
                            {filter === 'paid' && 'De pago'}
                            {filter === 'featured' && 'Destacados'}
                            {filter === 'active' && 'Activos'}
                            {filter === 'inactive' && 'Inactivos'}
                        </button>
                    ))}
                </div>

                {/* Table or Empty State */}
                {filteredBooks.length === 0 ? (
                    <EmptyState
                        icon={BookIcon}
                        title="No hay libros"
                        description={searchQuery ? 'No se encontraron libros con ese criterio' : 'Aún no has creado ningún libro'}
                        actionLabel={!searchQuery ? 'Crear primer libro' : undefined}
                        onAction={!searchQuery ? () => router.push('/admin/libros/crear') : undefined}
                    />
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Portada</th>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Precio</th>
                                    <th>Categoría</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map(book => (
                                    <tr key={book.id}>
                                        <td>
                                            <Image
                                                src={book.coverUrl}
                                                alt={book.title}
                                                width={60}
                                                height={90}
                                                className={styles.cover}
                                            />
                                        </td>
                                        <td className={styles.titleCell}>
                                            <span className={styles.title}>{book.title}</span>
                                            {book.featured && <span className={styles.featuredBadge}>Destacado</span>}
                                        </td>
                                        <td>{book.author}</td>
                                        <td>
                                            {book.isFree ? (
                                                <span className={styles.freeBadge}>GRATIS</span>
                                            ) : (
                                                `$${book.price?.toLocaleString('es-CO')}`
                                            )}
                                        </td>
                                        <td>
                                            <span className={styles.categoryBadge}>{book.category}</span>
                                        </td>
                                        <td>
                                            <label className={styles.toggle}>
                                                <input
                                                    type="checkbox"
                                                    checked={book.isActive !== false}
                                                    onChange={() => handleToggleActive(book.id, book.isActive !== false)}
                                                />
                                                <span className={styles.toggleSlider}></span>
                                            </label>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button
                                                    className={styles.actionButton}
                                                    onClick={() => router.push(`/admin/libros/editar/${book.id}`)}
                                                    title="Editar"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className={`${styles.actionButton} ${styles.danger}`}
                                                    onClick={() => handleDelete(book.id, book.title)}
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
