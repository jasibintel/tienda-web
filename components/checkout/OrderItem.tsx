import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { OrderItem as OrderItemType } from '@/lib/types';
import { formatCurrency } from '@/lib/mockOrders';
import { ExternalLink } from 'lucide-react';
import styles from '@/styles/components/checkout/OrderItem.module.css';

interface OrderItemProps {
    item: OrderItemType;
}

export default function OrderItem({ item }: OrderItemProps) {
    return (
        <div className={styles.card}>
            {/* Cover */}
            <div className={styles.coverWrapper}>
                <Image
                    src={item.coverUrl}
                    alt={item.title}
                    width={80}
                    height={120}
                    className={styles.cover}
                />
            </div>

            {/* Info */}
            <div className={styles.info}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.author}>{item.author}</p>

                <div className={styles.details}>
                    <p className={styles.price}>
                        {item.isFree ? 'GRATIS' : formatCurrency(item.price)}
                    </p>
                    <p className={styles.formats}>{item.formats.join(' + ')}</p>
                    <p className={styles.quantity}>Cantidad: {item.quantity}</p>
                </div>

                <Link
                    href={`/libreria/${item.bookId}`}
                    target="_blank"
                    className={styles.detailsLink}
                >
                    Ver detalles <ExternalLink size={14} />
                </Link>
            </div>
        </div>
    );
}
