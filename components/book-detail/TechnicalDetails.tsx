import React from 'react';
import { Book } from '@/lib/types';
import styles from '@/styles/components/TechnicalDetails.module.css';

interface TechnicalDetailsProps {
    pages?: number;
    formats: string[];
    fileSize?: {
        pdf?: string;
        epub?: string;
    };
    language?: string;
    publishedDate?: string;
    isbn?: string;
    publisher?: string;
    category: string;
    audience: string;
}

export default function TechnicalDetails({
    pages,
    formats,
    fileSize,
    language,
    publishedDate,
    isbn,
    publisher,
    category,
    audience
}: TechnicalDetailsProps) {
    const categoryLabels: Record<string, string> = {
        maestros: 'Para Maestros',
        devocionales: 'Devocionales',
        predicaciones: 'Predicaciones',
        familias: 'Familias',
        ninos: 'Niños',
        jovenes: 'Jóvenes'
    };

    const audienceLabels: Record<string, string> = {
        adultos: 'Adultos',
        jovenes: 'Jóvenes',
        ninos: 'Niños',
        familias: 'Familias',
        todos: 'Todo público'
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Detalles del Libro</h2>
                <table className={styles.table}>
                    <tbody>
                        {pages && (
                            <tr className={styles.row}>
                                <td className={styles.label}>Páginas</td>
                                <td className={styles.value}>{pages} páginas</td>
                            </tr>
                        )}
                        <tr className={styles.row}>
                            <td className={styles.label}>Formatos</td>
                            <td className={styles.value}>{formats.join(', ')}</td>
                        </tr>
                        {fileSize && (
                            <tr className={styles.row}>
                                <td className={styles.label}>Tamaño del archivo</td>
                                <td className={styles.value}>
                                    {fileSize.pdf && `PDF: ${fileSize.pdf}`}
                                    {fileSize.pdf && fileSize.epub && ', '}
                                    {fileSize.epub && `EPUB: ${fileSize.epub}`}
                                </td>
                            </tr>
                        )}
                        {language && (
                            <tr className={styles.row}>
                                <td className={styles.label}>Idioma</td>
                                <td className={styles.value}>{language}</td>
                            </tr>
                        )}
                        {publishedDate && (
                            <tr className={styles.row}>
                                <td className={styles.label}>Publicación</td>
                                <td className={styles.value}>{publishedDate}</td>
                            </tr>
                        )}
                        {isbn && (
                            <tr className={styles.row}>
                                <td className={styles.label}>ISBN</td>
                                <td className={styles.value}>{isbn}</td>
                            </tr>
                        )}
                        {publisher && (
                            <tr className={styles.row}>
                                <td className={styles.label}>Editorial</td>
                                <td className={styles.value}>{publisher}</td>
                            </tr>
                        )}
                        <tr className={styles.row}>
                            <td className={styles.label}>Categoría</td>
                            <td className={styles.value}>{categoryLabels[category] || category}</td>
                        </tr>
                        <tr className={styles.row}>
                            <td className={styles.label}>Público</td>
                            <td className={styles.value}>{audienceLabels[audience] || audience}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
