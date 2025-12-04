'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import Button from '@/components/shared/Button';
import TagInput from '@/components/admin/TagInput';
import MultiSelect, { MultiSelectOption } from '@/components/admin/MultiSelect';
import UrlInput from '@/components/admin/UrlInput';
import { createBook } from '@/lib/firebase/books';
import { getAllCategories } from '@/lib/firebase/categories';
import { getActiveCollections } from '@/lib/firebase/collections';
import { useAuth } from '@/lib/context/AuthContext';
import { generateSlug } from '@/lib/utils/slug';
import { validateUrl } from '@/lib/utils/url';
import { Save, X, Link as LinkIcon, Video } from 'lucide-react';
import Link from 'next/link';
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
        slug: '',
        price: '',
        isFree: false,
        featured: false,
        description: '',
        descriptionLong: '',
        metaDescription: '',
        learningPoints: [''],
        category: '',
        audience: 'adultos',
        tags: [] as string[],
        pages: '',
        language: 'Español',
        publishedDate: '',
        isbn: '',
        publisher: '',
        formats: ['PDF'] as string[],
        pdfUrl: '',
        epubUrl: '',
        previewUrl: '',
        coverUrl: '',
        collectionIds: [] as string[],
        readingOrder: '',
        hasResources: false,
        isActive: true
    });

    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
    const [collections, setCollections] = useState<MultiSelectOption[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Cargar categorías y colecciones
    useEffect(() => {
        const loadData = async () => {
            try {
                const [cats, cols] = await Promise.all([
                    getAllCategories(),
                    getActiveCollections()
                ]);
                
                setCategories(cats.map(cat => ({ id: cat.id, name: cat.name })));
                setCollections(cols.map(col => ({ id: col.id, label: col.name })));
                
                // Establecer categoría por defecto si hay categorías
                if (cats.length > 0 && !formData.category) {
                    setFormData(prev => ({ ...prev, category: cats[0].id }));
                }
            } catch (error) {
                console.error('Error loading categories/collections:', error);
            } finally {
                setLoadingData(false);
            }
        };
        
        if (user && isAdmin) {
            loadData();
        }
    }, [user, isAdmin]);

    // Auto-generar slug desde título
    useEffect(() => {
        if (formData.title && !formData.slug) {
            const generatedSlug = generateSlug(formData.title);
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.title]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones
        if (!formData.title || !formData.author || !formData.description || !formData.descriptionLong) {
            alert('Por favor completa los campos requeridos (Título, Autor, Descripción corta y larga)');
            return;
        }

        if (!formData.category) {
            alert('Por favor selecciona una categoría');
            return;
        }

        if (!formData.audience) {
            alert('Por favor selecciona un público objetivo');
            return;
        }

        if (!formData.isFree && !formData.price) {
            alert('Por favor ingresa un precio o marca el libro como gratuito');
            return;
        }

        // Validar URLs si se proporcionan
        if (formData.pdfUrl && !validateUrl(formData.pdfUrl)) {
            alert('La URL del PDF no es válida');
            return;
        }

        if (formData.epubUrl && !validateUrl(formData.epubUrl)) {
            alert('La URL del EPUB no es válida');
            return;
        }

        if (formData.previewUrl && !validateUrl(formData.previewUrl)) {
            alert('La URL de vista previa no es válida');
            return;
        }

        if (formData.coverUrl && !validateUrl(formData.coverUrl)) {
            alert('La URL de la portada no es válida');
            return;
        }

        // Validar meta descripción
        if (formData.metaDescription && formData.metaDescription.length > 160) {
            alert('La meta descripción no puede tener más de 160 caracteres');
            return;
        }

        setSubmitting(true);
        
        try {
            // Generar slug si no se proporcionó
            const finalSlug = formData.slug.trim() || generateSlug(formData.title);
            
            // Preparar URLs de descarga
            const downloadUrls: { pdf?: string; epub?: string } = {};
            if (formData.pdfUrl) downloadUrls.pdf = formData.pdfUrl;
            if (formData.epubUrl) downloadUrls.epub = formData.epubUrl;

            // Create book in Firestore
            const newBook = await createBook({
                title: formData.title,
                subtitle: formData.subtitle || undefined,
                author: formData.author,
                slug: finalSlug || undefined,
                price: formData.isFree ? undefined : Number(formData.price),
                isFree: formData.isFree,
                featured: formData.featured,
                description: formData.description,
                descriptionLong: formData.descriptionLong,
                metaDescription: formData.metaDescription || undefined,
                learningPoints: formData.learningPoints.filter(p => p.trim() !== ''),
                category: formData.category,
                audience: formData.audience,
                tags: formData.tags.length > 0 ? formData.tags : undefined,
                pages: formData.pages ? Number(formData.pages) : undefined,
                language: formData.language,
                publishedDate: formData.publishedDate || undefined,
                isbn: formData.isbn || undefined,
                publisher: formData.publisher || undefined,
                formats: formData.formats,
                downloadUrls: Object.keys(downloadUrls).length > 0 ? downloadUrls : undefined,
                previewUrl: formData.previewUrl || undefined,
                coverUrl: formData.coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&q=80&fm=jpg',
                collectionIds: formData.collectionIds.length > 0 ? formData.collectionIds : undefined,
                readingOrder: formData.readingOrder ? Number(formData.readingOrder) : undefined,
                hasResources: formData.hasResources,
                isActive: formData.isActive,
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

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Slug (URL personalizada)</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="Se generará automáticamente desde el título"
                                    className={styles.input}
                                />
                                <p className={styles.helpText}>
                                    Si está vacío, se generará automáticamente desde el título
                                </p>
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
                                        required={!formData.isFree}
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

                        {/* Section: SEO */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>SEO</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Meta descripción</label>
                                <textarea
                                    value={formData.metaDescription}
                                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                    placeholder="Descripción para motores de búsqueda y redes sociales (máx 160 caracteres)"
                                    className={styles.textarea}
                                    rows={2}
                                    maxLength={160}
                                />
                                <div className={styles.charCount}>
                                    {formData.metaDescription.length}/160 caracteres
                                </div>
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
                                {loadingData ? (
                                    <p className={styles.helpText}>Cargando categorías...</p>
                                ) : (
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className={styles.select}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                )}
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
                                    <option value="maestros">Maestros / Líderes</option>
                                    <option value="todos">Todos</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Etiquetas / Palabras clave</label>
                                <TagInput
                                    tags={formData.tags}
                                    onChange={(tags) => setFormData({ ...formData, tags })}
                                    placeholder="Escribe y presiona Enter para agregar"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        {/* Section 6: Archivos del Libro */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Archivos del Libro</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Formatos disponibles</label>
                                <div className={styles.checkboxGroup}>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={formData.formats.includes('PDF')}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFormData({ ...formData, formats: [...formData.formats, 'PDF'] });
                                                } else {
                                                    setFormData({ ...formData, formats: formData.formats.filter(f => f !== 'PDF') });
                                                }
                                            }}
                                        />
                                        <span>PDF</span>
                                    </label>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={formData.formats.includes('EPUB')}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFormData({ ...formData, formats: [...formData.formats, 'EPUB'] });
                                                } else {
                                                    setFormData({ ...formData, formats: formData.formats.filter(f => f !== 'EPUB') });
                                                }
                                            }}
                                        />
                                        <span>EPUB</span>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <UrlInput
                                    label="URL de descarga PDF"
                                    value={formData.pdfUrl}
                                    onChange={(value) => setFormData({ ...formData, pdfUrl: value })}
                                    placeholder="https://ejemplo.com/libro.pdf"
                                    helpText="URL externa (Nextcloud, Firebase Storage, servidor propio)"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <UrlInput
                                    label="URL de descarga EPUB"
                                    value={formData.epubUrl}
                                    onChange={(value) => setFormData({ ...formData, epubUrl: value })}
                                    placeholder="https://ejemplo.com/libro.epub"
                                    helpText="URL externa (opcional)"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <UrlInput
                                    label="URL de vista previa"
                                    value={formData.previewUrl}
                                    onChange={(value) => setFormData({ ...formData, previewUrl: value })}
                                    placeholder="https://ejemplo.com/preview.pdf"
                                    helpText="PDF con primeras páginas (opcional)"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <UrlInput
                                    label="URL de portada"
                                    value={formData.coverUrl}
                                    onChange={(value) => setFormData({ ...formData, coverUrl: value })}
                                    placeholder="https://ejemplo.com/portada.jpg"
                                    helpText="Si está vacío, se usará una imagen placeholder"
                                />
                            </div>
                        </div>

                        {/* Section 7: Colecciones y Orden */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Colecciones y Orden</h2>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Colecciones</label>
                                {loadingData ? (
                                    <p className={styles.helpText}>Cargando colecciones...</p>
                                ) : (
                                    <MultiSelect
                                        options={collections}
                                        selectedIds={formData.collectionIds}
                                        onChange={(ids) => setFormData({ ...formData, collectionIds: ids })}
                                        placeholder="Selecciona colecciones"
                                        searchPlaceholder="Buscar colecciones..."
                                    />
                                )}
                                <p className={styles.helpText}>
                                    Selecciona las colecciones a las que pertenece este libro
                                </p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Orden de lectura</label>
                                <input
                                    type="number"
                                    value={formData.readingOrder}
                                    onChange={(e) => setFormData({ ...formData, readingOrder: e.target.value })}
                                    placeholder="1"
                                    className={styles.input}
                                    min="1"
                                />
                                <p className={styles.helpText}>
                                    Orden dentro de la colección (opcional)
                                </p>
                            </div>
                        </div>

                        {/* Section 8: Centro de Recursos */}
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Centro de Recursos</h2>

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={formData.hasResources}
                                        onChange={(e) => setFormData({ ...formData, hasResources: e.target.checked })}
                                    />
                                    <span>Este libro tiene contenido extra (Centro de Recursos)</span>
                                </label>
                                <p className={styles.helpText}>
                                    Si está marcado, los usuarios que tengan este libro podrán acceder a videos y materiales adicionales
                                </p>
                            </div>

                            {formData.hasResources && (
                                <div className={styles.helpText} style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Video size={16} />
                                    <span>
                                        Después de crear el libro, podrás{' '}
                                        <Link href="#" className={styles.link} onClick={(e) => {
                                            e.preventDefault();
                                            alert('Esta funcionalidad estará disponible después de crear el libro');
                                        }}>
                                            administrar los recursos
                                        </Link>
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Section 9: Estado */}
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
