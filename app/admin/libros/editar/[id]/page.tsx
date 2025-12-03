'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/shared/Button';
import { mockAdminBooks, updateBook } from '@/lib/mockAdminData';
import { Save } from 'lucide-react';
import styles from '@/styles/pages/admin/BookForm.module.css';

export default function EditBookPage() {
    const router = useRouter();
    const params = useParams();
    const bookId = params.id as string;

    const [book, setBook] = useState(mockAdminBooks.find(b => b.id === bookId));
    const [formData, setFormData] = useState({
        title: book?.title || '',
        subtitle: book?.subtitle || '',
        author: book?.author || '',
        price: book?.price?.toString() || '',
        isFree: book?.isFree || false,
        featured: book?.featured || false,
        description: book?.description || '',
        descriptionLong: book?.descriptionLong || '',
        category: book?.category || 'devocionales',
        audience: book?.audience || 'adultos',
        isActive: book?.isActive !== undefined ? book.isActive : true
    });

    if (!book) {
        return (
            <AdminLayout title="Editar Libro">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <p>Libro no encontrado</p>
                    <Button onClick={() => router.push('/admin/libros')}>
                        Volver a libros
                    </Button>
                </div>
            </AdminLayout>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedBook = updateBook(bookId, {
            title: formData.title,
            subtitle: formData.subtitle || undefined,
            author: formData.author,
            price: formData.isFree ? undefined : Number(formData.price),
            isFree: formData.isFree,
            featured: formData.featured,
            description: formData.description,
            descriptionLong: formData.descriptionLong || formData.description,
            category: formData.category,
            audience: formData.audience,
            isActive: formData.isActive
        });

        if (updatedBook) {
            alert(`Libro "${updatedBook.title}" actualizado exitosamente`);
            router.push('/admin/libros');
        }
    };

    return (
        <AdminLayout title={`Editar: ${book.title}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    <div className={styles.leftColumn}>
                        {/* Información Básica */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Información Básica</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Título *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Subtítulo</label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Autor *</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Precio (COP)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className={styles.input}
                                    disabled={formData.isFree}
                                />
                            </div>

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isFree}
                                        onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                                    />
                                    <span>Este libro es gratuito</span>
                                </label>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    />
                                    <span>Libro destacado</span>
                                </label>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Descripción</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Descripción corta *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className={styles.textarea}
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Descripción larga</label>
                                <textarea
                                    value={formData.descriptionLong}
                                    onChange={(e) => setFormData({ ...formData, descriptionLong: e.target.value })}
                                    className={styles.textarea}
                                    rows={6}
                                />
                            </div>
                        </div>

                        {/* Categorización */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Categorización</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Categoría *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className={styles.select}
                                    required
                                >
                                    <option value="devocionales">Devocionales</option>
                                    <option value="maestros">Para Maestros</option>
                                    <option value="familias">Para Familias</option>
                                    <option value="jovenes">Para Jóvenes</option>
                                    <option value="ninos">Para Niños</option>
                                    <option value="liderazgo">Liderazgo</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Público objetivo *</label>
                                <select
                                    value={formData.audience}
                                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                    className={styles.select}
                                    required
                                >
                                    <option value="adultos">Adultos</option>
                                    <option value="jovenes">Jóvenes</option>
                                    <option value="ninos">Niños</option>
                                    <option value="familias">Familias</option>
                                    <option value="todos">Todos</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        {/* Estado */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Estado del Libro</h2>

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    />
                                    <span>Libro activo</span>
                                </label>
                                <p className={styles.helpText}>
                                    Los libros inactivos no aparecen en la tienda
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.formActions}>
                    <Button type="button" variant="secondary" onClick={() => router.push('/admin/libros')}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        <Save size={20} />
                        Guardar cambios
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
