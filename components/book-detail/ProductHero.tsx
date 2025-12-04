'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../shared/Button';
import { FileText, Download } from 'lucide-react';
import styles from '@/styles/components/ProductHero.module.css';

interface ProductHeroProps {
    title: string;
    subtitle?: string;
    author: string;
    coverUrl: string;
    description?: string;
    price?: number;
    isFree: boolean;
    formats: string[];
    onPurchase?: () => void;
    onDownload?: () => void;
    onAddToCart?: () => void;
}

export default function ProductHero({
    title,
    subtitle,
    author,
    coverUrl,
    description,
    price,
    isFree,
    formats,
    onPurchase,
    onDownload,
    onAddToCart
}: ProductHeroProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                {/* Left Column - Cover */}
                <div className={styles.coverColumn}>
                    <div className={styles.coverWrapper}>
                        <Image
                            src={coverUrl}
                            alt={`${title} - Portada`}
                            width={400}
                            height={600}
                            className={styles.cover}
                        />
                    </div>
                </div>

                {/* Right Column - Info */}
                <div className={styles.infoColumn}>
                    <h1 className={styles.title}>{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

                    <div className={styles.authorSection}>
                        <span className={styles.authorLabel}>Por:</span>
                        <span className={styles.authorName}>{author}</span>
                    </div>

                    {description && (
                        <p className={styles.description}>{description}</p>
                    )}

                    <div className={styles.separator} />

                    {/* CTA Block */}
                    <div className={isFree ? styles.ctaBlockFree : styles.ctaBlockPaid}>
                        {isFree ? (
                            <>
                                <div className={styles.freeBadge}>
                                    <Download size={20} />
                                    <span>GRATIS</span>
                                </div>
                            </>
                        ) : (
                            <div className={styles.price}>
                                ${price?.toLocaleString('es-CO')} COP
                            </div>
                        )}

                        <div className={styles.formats}>
                            <FileText size={16} />
                            <span>Disponible en: {formats.join(', ')}</span>
                        </div>

                        <Button
                            variant={isFree ? 'free' : 'primary'}
                            onClick={isFree ? onDownload : onPurchase}
                            className={styles.mainButton}
                        >
                            {isFree ? 'Descargar gratis' : 'Comprar ahora'}
                        </Button>

                        {!isFree && onAddToCart && (
                            <Button
                                variant="secondary"
                                onClick={onAddToCart}
                                className={styles.secondaryButton}
                            >
                                Añadir al carrito
                            </Button>
                        )}

                        <p className={styles.deliveryMessage}>
                            {isFree
                                ? 'Este recurso es completamente gratuito. Solo necesitas tu correo para recibirlo al instante.'
                                : 'Después de completar tu compra, recibirás este libro en tu correo y quedará disponible en tu biblioteca de DeGloriaLibros.com'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
