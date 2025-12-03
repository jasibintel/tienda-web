'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/shared/Button';
import { createBook } from '@/lib/firebase/books';
import { useAuth } from '@/lib/context/AuthContext';
import { Save, X } from 'lucide-react';
import styles from '@/styles/pages/admin/BookForm.module.css';

export default function CreateBookPage() {
    const router = useRouter();
    const { user, isAdmin, loading: authLoading } = useAuth();
    
    // Verificar permisos de admin
    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                console.log('❌ Admin: Usuario no autenticado, redirigiendo a login');
                router.push('/auth/login');
                return;
            }
            
            if (!isAdmin) {
                console.log('❌ Admin: Usuario no es admin', {
                    uid: user.uid,
                    email: user.email,
                    isAdmin: isAdmin
                });
                console.log('💡 Si acabas de establecer el custom claim, cierra sesión y vuelve a iniciar sesión');
                alert('No tienes permisos de administrador. Si acabas de configurar el admin, cierra sesión y vuelve a iniciar sesión.');
                router.push('/');
                return;
            }
            
            console.log('✅ Admin: Usuario autenticado y es admin');
        }
    }, [user, isAdmin, authLoading, router]);
    
    if (authLoading) {
        return (
            <AdminLayout title="Crear Libro">
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p>Cargando...</p>
                </div>
            </AdminLayout>
        );
    }
    
    if (!user) {
        return (
            <AdminLayout title="Crear Libro">
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p>Redirigiendo a login...</p>
                </div>
            </AdminLayout>
        );
    }
    
    if (!isAdmin) {
        return (
            <AdminLayout title="Crear Libro">
                <div style={{ padding: '48px', textAlign: 'center' }}>
                    <p style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>
                        No tienes permisos de administrador
                    </p>
                    <p style={{ marginTop: '16px' }}>
                        Si acabas de configurar el admin, cierra sesión y vuelve a iniciar sesión.
                    </p>
                    <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
                        Abre la consola del navegador (F12) para ver más detalles.
                    </p>
                    <div style={{ marginTop: '24px' }}>
                        <Button
                            onClick={() => router.push('/')}
                        >
                            Volver al inicio
                        </Button>
                    </div>
                </div>
            </AdminLayout>
        );
    }
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        author: '',
        price: '',
        isFree: false,
        featured: false,
        description: '',
        descriptionLong: '',
        learningPoints: [''],
        category: 'devocionales',
        audience: 'adultos',
        pages: '',
        language: 'Español',
        publishedDate: '',
        isbn: '',
        publisher: '',
        isActive: true
    });

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title || !formData.author || !formData.description) {
            alert('Por favor completa los campos requeridos');
            return;
        }

        if (!formData.isFree && !formData.price) {
            alert('Por favor ingresa un precio o marca el libro como gratuito');
            return;
        }

        setSubmitting(true);
        
        try {
            // Create book in Firestore
            const newBook = await createBook({
                title: formData.title,
                subtitle: formData.subtitle || undefined,
                author: formData.author,
                price: formData.isFree ? undefined : Number(formData.price),
                isFree: formData.isFree,
                featured: formData.featured,
                description: formData.description,
                descriptionLong: formData.descriptionLong || formData.description,
                learningPoints: formData.learningPoints.filter(p => p.trim() !== ''),
                category: formData.category,
                audience: formData.audience,
                pages: formData.pages ? Number(formData.pages) : undefined,
                language: formData.language,
                publishedDate: formData.publishedDate || undefined,
                isbn: formData.isbn || undefined,
                publisher: formData.publisher || undefined,
                isActive: formData.isActive,
                formats: ['PDF', 'EPUB'],
                coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80&fm=jpg', // Placeholder
                createdBy: user.uid
            });

            alert(`Libro "${newBook.title}" creado exitosamente`);
            router.push('/admin/libros');
        } catch (error: any) {
            console.error('Error al crear libro:', error);
            alert(`Error al crear libro: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    const addLearningPoint = () => {
        setFormData({
            ...formData,
            learningPoints: [...formData.learningPoints, '']
        });
    };

    const removeLearningPoint = (index: number) => {
        setFormData({
            ...formData,
            learningPoints: formData.learningPoints.filter((_, i) => i !== index)
        });
    };

    const updateLearningPoint = (index: number, value: string) => {
        const newPoints = [...formData.learningPoints];
        newPoints[index] = value;
        setFormData({ ...formData, learningPoints: newPoints });
    };

    return (
        <AdminLayout title="Crear Libro">
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        {/* Section 1: Información Básica */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Información Básica</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Título <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ej: El Poder de la Oración Transformadora"
                                    className={styles.input}
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Subtítulo</label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    placeholder="Ej: Descubre cómo la oración profunda puede..."
                                    className={styles.input}
                                    maxLength={150}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Autor <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="Ej: Dr. Samuel Martínez"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Precio (COP)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="35000"
                                        className={styles.input}
                                        disabled={formData.isFree}
                                    />
                                </div>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isFree}
                                        onChange={(e) => setFormData({ ...formData, isFree: e.target.checked, price: '' })}
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
                                    <span>Libro destacado (aparecerá en la Home)</span>
                                </label>
                            </div>
                        </div>

                        {/* Section 2: Descripción */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Descripción</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Descripción corta <span className={styles.required}>*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Descripción breve que aparecerá en la card del libro"
                                    className={styles.textarea}
                                    rows={3}
                                    maxLength={200}
                                    required
                                />
                                <span className={styles.charCount}>{formData.description.length}/200</span>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Descripción larga <span className={styles.required}>*</span>
                                </label>
                                <textarea
                                    value={formData.descriptionLong}
                                    onChange={(e) => setFormData({ ...formData, descriptionLong: e.target.value })}
                                    placeholder="Descripción completa que aparecerá en la página de detalle"
                                    className={styles.textarea}
                                    rows={6}
                                    required
                                />
                            </div>
                        </div>

                        {/* Section 3: Contenido del Libro */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Contenido del Libro</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Puntos de aprendizaje</label>
                                {formData.learningPoints.map((point, index) => (
                                    <div key={index} className={styles.listItem}>
                                        <input
                                            type="text"
                                            value={point}
                                            onChange={(e) => updateLearningPoint(index, e.target.value)}
                                            placeholder={`Punto ${index + 1}`}
                                            className={styles.input}
                                        />
                                        {formData.learningPoints.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeLearningPoint(index)}
                                                className={styles.removeButton}
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {formData.learningPoints.length < 10 && (
                                    <Button type="button" variant="secondary" onClick={addLearningPoint}>
                                        + Agregar punto
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Section 4: Detalles Técnicos */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Detalles Técnicos</h2>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Páginas</label>
                                    <input
                                        type="number"
                                        value={formData.pages}
                                        onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                                        placeholder="248"
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Idioma</label>
                                    <select
                                        value={formData.language}
                                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                        className={styles.select}
                                    >
                                        <option value="Español">Español</option>
                                        <option value="Inglés">Inglés</option>
                                        <option value="Portugués">Portugués</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Fecha de publicación</label>
                                    <input
                                        type="date"
                                        value={formData.publishedDate}
                                        onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>ISBN</label>
                                    <input
                                        type="text"
                                        value={formData.isbn}
                                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                                        placeholder="978-3-16-148410-0"
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Editorial</label>
                                <input
                                    type="text"
                                    value={formData.publisher}
                                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                                    placeholder="Editorial De Gloria en Gloria"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        {/* Section 5: Categorización */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Categorización</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Categoría <span className={styles.required}>*</span>
                                </label>
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
                                <label className={styles.label}>
                                    Público objetivo <span className={styles.required}>*</span>
                                </label>
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

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        {/* Section 6: Archivos */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Archivos</h2>

                            <div className={styles.uploadNote}>
                                <p>📝 <strong>Nota:</strong> La subida de archivos (portada, PDF, EPUB) se implementará con la integración de Nextcloud.</p>
                                <p>Por ahora, los libros usarán imágenes placeholder.</p>
                            </div>
                        </div>

                        {/* Section 7: Estado */}
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

                {/* Form Actions */}
                <div className={styles.formActions}>
                    <Button type="button" variant="secondary" onClick={() => router.push('/admin/libros')}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting}>
                        <Save size={20} />
                        {submitting ? 'Guardando...' : 'Guardar libro'}
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
