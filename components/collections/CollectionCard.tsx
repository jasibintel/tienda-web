'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Collection } from '@/lib/types';
import { ArrowRight, Book } from 'lucide-react';
import styles from '@/styles/components/CollectionCard.module.css';

interface CollectionCardProps {
    collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
    const router = useRouter();
    const bookCount = collection.books?.length || 0;

    const handleClick = () => {
        if (collection.slug) {
            router.push(`/colecciones/${collection.slug}`);
        }
    };

    return (
        <div className={styles.card} onClick={handleClick} style={{ cursor: 'pointer' }}>
            {/* Banner Image */}
            <div className={styles.bannerWrapper}>
                {collection.bannerUrl ? (
                    <Image
                        src={collection.bannerUrl}
                        alt={collection.name}
                        width={600}
                        height={338}
                        className={styles.banner}
                    />
                ) : (
                    <div className={styles.bannerPlaceholder}>
                        <Book size={48} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h3 className={styles.name}>{collection.name}</h3>
                <p className={styles.description}>{collection.descriptionShort || collection.descriptionLong || ''}</p>

                <div className={styles.meta}>
                    <span className={styles.bookCount}>
                        <Book size={16} />
                        Incluye {bookCount} {bookCount === 1 ? 'libro' : 'libros'}
                    </span>
                </div>

                <div className={styles.button}>
                    Explorar colección
                    <ArrowRight size={16} />
                </div>
            </div>
        </div>
    );
}
