'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../shared/Button';
import { ArrowLeft, Book } from 'lucide-react';
import { Book as BookType } from '@/lib/types';
import styles from '@/styles/components/resources/ResourceHeader.module.css';

interface ResourceHeaderProps {
    book: BookType;
}

export default function ResourceHeader({ book }: ResourceHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Back Button */}
                <div className={styles.backButton}>
                    <Button variant="secondary" href="/mi-biblioteca" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        Volver a Mi Biblioteca
                    </Button>
                </div>

                {/* Book Info */}
                <div className={styles.bookInfo}>
                    <div className={styles.coverWrapper}>
                        <Image
                            src={book.coverUrl}
                            alt={book.title}
                            width={200}
                            height={300}
                            className={styles.cover}
                        />
                    </div>

                    <div className={styles.details}>
                        <h1 className={styles.title}>{book.title}</h1>
                        {book.subtitle && (
                            <p className={styles.subtitle}>{book.subtitle}</p>
                        )}
                        <p className={styles.author}>Por: {book.author}</p>
                        
                        <div className={styles.badge}>
                            <Book size={16} />
                            <span>Centro de Recursos</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

