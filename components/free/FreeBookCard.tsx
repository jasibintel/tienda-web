'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/types';
import Button from '../shared/Button';
import { Download, Eye } from 'lucide-react';
import styles from '@/styles/components/FreeBookCard.module.css';

interface FreeBookCardProps {
    book: Book;
}

export default function FreeBookCard({ book }: FreeBookCardProps) {
    const handleDownload = () => {
        // TODO: Implement actual download logic
        // For now, just show alert
        alert(`Descargando: ${book.title}`);
    };

    return (
        <div className={styles.card}>
            {/* Cover Image */}
            <div className={styles.coverWrapper}>
                <Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={200}
                    height={300}
                    className={styles.cover}
                />
                {/* GRATIS Badge */}
                <div className={styles.freeBadge}>GRATIS</div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h3 className={styles.title}>{book.title}</h3>
                <p className={styles.author}>Autor: {book.author}</p>

                {/* Download Button */}
                <Button
                    variant="primary"
                    className={styles.downloadButton}
                    onClick={handleDownload}
                >
                    <Download size={16} />
                    Descargar gratis
                </Button>

                {/* Details Button */}
                <Button
                    variant="secondary"
                    href={`/libreria/${book.id}`}
                    className={styles.detailsButton}
                >
                    <Eye size={16} />
                    Ver detalles
                </Button>
            </div>
        </div>
    );
}
