'use client';

import React from 'react';
import Link from 'next/link';
import { Download, FileText, BookOpen, ArrowRight } from 'lucide-react';
import styles from '@/styles/components/FreeBooks.module.css';

export default function FreeBooks() {
    const resources = [
        {
            id: 1,
            title: '30 Días de Devocionales',
            description: 'Un mes completo de reflexiones diarias para profundizar tu relación con Dios.',
            icon: BookOpen,
            downloads: '2.5K'
        },
        {
            id: 2,
            title: 'Guía de Estudio Bíblico',
            description: 'Herramientas prácticas para estudiar la Palabra con profundidad y claridad.',
            icon: FileText,
            downloads: '1.8K'
        },
        {
            id: 3,
            title: 'Plan de Lectura Anual',
            description: 'Lee la Biblia completa en un año con nuestro plan estructurado y accesible.',
            icon: Download,
            downloads: '3.2K'
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Header */}
                    <div className={styles.header}>
                        <span className={styles.badge}>100% Gratuito</span>
                        <h2 className={styles.title}>Recursos Premium Sin Costo</h2>
                        <p className={styles.description}>
                            Accede a contenido exclusivo diseñado para fortalecer tu fe y equiparte
                            para el ministerio. Sin tarjetas de crédito, sin compromisos.
                        </p>
                    </div>

                    {/* Resources Grid */}
                    <div className={styles.grid}>
                        {resources.map((resource) => {
                            const Icon = resource.icon;
                            return (
                                <div key={resource.id} className={styles.card}>
                                    <div className={styles.cardIcon}>
                                        <Icon size={32} />
                                    </div>
                                    <h3 className={styles.cardTitle}>{resource.title}</h3>
                                    <p className={styles.cardDescription}>{resource.description}</p>
                                    <div className={styles.cardFooter}>
                                        <span className={styles.downloads}>{resource.downloads} descargas</span>
                                        <Link href="/gratis" className={styles.downloadButton}>
                                            <Download size={16} />
                                            <span>Descargar</span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className={styles.cta}>
                        <Link href="/gratis" className={styles.ctaButton}>
                            <span>Ver todos los recursos gratuitos</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
