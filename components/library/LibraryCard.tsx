'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserLibraryItem } from '@/lib/types';
import Button from '../shared/Button';
import { Download, ArrowRight } from 'lucide-react';
import styles from '@/styles/components/library/LibraryCard.module.css';

interface LibraryCardProps {
    item: UserLibraryItem;
    onDownload: (item: UserLibraryItem, format: 'pdf' | 'epub') => void;
}

export default function LibraryCard({ item, onDownload }: LibraryCardProps) {
    // Format date
    const acquiredDate = new Date(item.acquiredAt).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={styles.card}>
            {/* Cover */}
            <div className={styles.coverWrapper}>
                <Image
                    src={item.coverUrl}
                    alt={item.title}
                    width={150}
                    height={225}
                    className={styles.cover}
                />
            </div>

            {/* Info */}
            <div className={styles.info}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.author}>{item.author}</p>
                    {item.isFree && <span className={styles.badge}>GRATIS</span>}
                </div>

                <div className={styles.actions}>
                    {item.downloadUrls.pdf && (
                        <Button
                            variant="primary"
                            onClick={() => onDownload(item, 'pdf')}
                            className={styles.downloadButton}
                        >
                            <Download size={16} />
                            Descargar PDF
                        </Button>
                    )}

                    {item.downloadUrls.epub && (
                        <Button
                            variant="secondary"
                            onClick={() => onDownload(item, 'epub')}
                            className={styles.downloadButton}
                        >
                            <Download size={16} />
                            Descargar EPUB
                        </Button>
                    )}

                    <Link href={`/libreria/${item.bookId}`} className={styles.detailsLink}>
                        Ver detalles <ArrowRight size={16} />
                    </Link>
                </div>

                <p className={styles.date}>Adquirido el {acquiredDate}</p>
            </div>
        </div>
    );
}
