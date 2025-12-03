import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '@/lib/types';
import Button from '../shared/Button';
import { ArrowRight, Book } from 'lucide-react';
import styles from '@/styles/components/CollectionCard.module.css';

interface CollectionCardProps {
    collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
    const bookCount = collection.books.length;

    return (
        <Link href={`/colecciones/${collection.slug}`} className={styles.card}>
            {/* Banner Image */}
            <div className={styles.bannerWrapper}>
                <Image
                    src={collection.bannerUrl}
                    alt={collection.name}
                    width={600}
                    height={338}
                    className={styles.banner}
                />
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h3 className={styles.name}>{collection.name}</h3>
                <p className={styles.description}>{collection.descriptionShort}</p>

                <div className={styles.meta}>
                    <span className={styles.bookCount}>
                        <Book size={16} />
                        Incluye {bookCount} {bookCount === 1 ? 'libro' : 'libros'}
                    </span>
                </div>

                <Button variant="secondary" className={styles.button}>
                    Explorar colección
                    <ArrowRight size={16} />
                </Button>
            </div>
        </Link>
    );
}
