'use client';

import React, { useState, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Book } from '@/lib/types';
import { useCart } from '@/lib/context/CartContext';
import styles from '@/styles/components/BookCard.module.css';

interface BookCardProps {
    book: Book;
    onButtonClick?: () => void;
}

function BookCard({ book, onButtonClick }: BookCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (book.isFree) {
            // For free books, navigate to detail page for download
            return;
        }

        setIsAdding(true);
        addToCart(book, 1);

        // Reset button state after animation
        setTimeout(() => {
            setIsAdding(false);
        }, 1500);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (onButtonClick) {
            e.preventDefault();
            onButtonClick();
        }
    };

    return (
        <div className={styles.cardWrapper}>
            <Link href={`/libreria/${book.id}`} className={styles.card} onClick={handleClick}>
                {/* Cover with Badges */}
                <div className={styles.coverContainer}>
                    <Image
                        src={book.coverUrl || '/images/book-placeholder.svg'}
                        alt={book.title}
                        width={300}
                        height={450}
                        className={styles.cover}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        unoptimized
                        onError={(e) => {
                            // Si la imagen falla, usar placeholder
                            e.currentTarget.src = '/images/book-placeholder.svg';
                        }}
                    />
                    <div className={styles.badges}>
                        {book.isFree && (
                            <span className={styles.freeBadge}>GRATIS</span>
                        )}
                        {book.featured && (
                            <span className={styles.featuredBadge}>DESTACADO</span>
                        )}
                        <span className={styles.digitalBadge}>Digital</span>
                    </div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <h3 className={styles.title}>{book.title}</h3>

                    {book.author && (
                        <p className={styles.author}>{book.author}</p>
                    )}

                    {/* Price */}
                    <div className={styles.priceRow}>
                        {book.isFree ? (
                            <span className={styles.freeText}>Descarga gratuita</span>
                        ) : (
                            <span className={styles.price}>
                                ${book.price?.toLocaleString('es-CO')} COP
                            </span>
                        )}
                    </div>

                    {/* Action Button */}
                    <div className={styles.actionButton}>
                        {book.isFree ? 'Descargar' : 'Ver detalles'}
                    </div>
                </div>
            </Link>

            {/* Add to Cart Button - Only for paid books */}
            {!book.isFree && (
                <button
                    className={`${styles.addToCartButton} ${isAdding ? styles.adding : ''}`}
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding ? (
                        <>
                            <ShoppingCart size={18} />
                            <span>¡Agregado!</span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={18} />
                            <span>Añadir al Carrito</span>
                        </>
                    )}
                </button>
            )}
        </div>
    );
}

export default memo(BookCard);
