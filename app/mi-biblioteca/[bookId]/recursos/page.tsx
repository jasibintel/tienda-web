'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { getBookById } from '@/lib/firebase/books';
import { getBookResources, checkUserHasBook } from '@/lib/firebase/bookResources';
import { Book, BookResources } from '@/lib/types';
import ResourceHeader from '@/components/resources/ResourceHeader';
import ResourceIntro from '@/components/resources/ResourceIntro';
import ResourceSection from '@/components/resources/ResourceSection';
import AccessDenied from '@/components/resources/AccessDenied';
import styles from '@/styles/pages/BookResources.module.css';

export default function BookResourcesPage() {
    const params = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const bookId = params.bookId as string;

    const [book, setBook] = useState<Book | null>(null);
    const [resources, setResources] = useState<BookResources | null>(null);
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!bookId) {
                setError('ID de libro no válido');
                setLoading(false);
                return;
            }

            if (authLoading) {
                return; // Esperar a que termine la carga de autenticación
            }

            if (!user) {
                setHasAccess(false);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Cargar libro y recursos en paralelo
                const [bookData, resourcesData] = await Promise.all([
                    getBookById(bookId),
                    getBookResources(bookId)
                ]);

                if (!bookData) {
                    setError('Libro no encontrado');
                    setLoading(false);
                    return;
                }

                setBook(bookData);

                if (!resourcesData) {
                    setError('Este libro no tiene contenido extra disponible');
                    setLoading(false);
                    return;
                }

                setResources(resourcesData);

                // Verificar acceso
                const userHasBook = await checkUserHasBook(user.uid, bookId);
                setHasAccess(userHasBook);

            } catch (err: any) {
                console.error('Error loading book resources:', err);
                setError(err.message || 'Error al cargar los recursos del libro');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [bookId, user, authLoading]);

    // Loading state
    if (loading || authLoading) {
        return (
            <main className={styles.main}>
                <div className={styles.loading}>
                    <p>Cargando recursos del libro...</p>
                </div>
            </main>
        );
    }

    // Error state
    if (error || !book) {
        return (
            <main className={styles.main}>
                <div className={styles.error}>
                    <h2>Error</h2>
                    <p>{error || 'No se pudo cargar la información del libro'}</p>
                </div>
            </main>
        );
    }

    // No autenticado
    if (!user) {
        return (
            <main className={styles.main}>
                <ResourceHeader book={book} />
                <div className={styles.content}>
                    <AccessDenied bookTitle={book.title} />
                </div>
            </main>
        );
    }

    // Sin acceso (no tiene el libro)
    if (hasAccess === false) {
        return (
            <main className={styles.main}>
                <ResourceHeader book={book} />
                <div className={styles.content}>
                    <AccessDenied bookTitle={book.title} />
                </div>
            </main>
        );
    }

    // Sin recursos
    if (!resources) {
        return (
            <main className={styles.main}>
                <ResourceHeader book={book} />
                <div className={styles.error}>
                    <h2>Sin contenido extra</h2>
                    <p>Este libro no tiene contenido adicional disponible en este momento.</p>
                </div>
            </main>
        );
    }

    // Ordenar secciones por order
    const sortedSections = [...resources.sections].sort((a, b) => a.order - b.order);

    // Contenido completo
    return (
        <main className={styles.main}>
            <ResourceHeader book={book} />
            
            <div className={styles.content}>
                <ResourceIntro title={resources.introTitle} text={resources.introText} />

                {sortedSections.length > 0 ? (
                    sortedSections.map((section) => (
                        <ResourceSection key={section.id} section={section} />
                    ))
                ) : (
                    <div className={styles.error}>
                        <p>No hay secciones disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

