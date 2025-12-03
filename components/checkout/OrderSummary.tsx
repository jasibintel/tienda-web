import React from 'react';
import { OrderItem as OrderItemType } from '@/lib/types';
import OrderItem from './OrderItem';
import styles from '@/styles/components/checkout/OrderSummary.module.css';

interface OrderSummaryProps {
    items: OrderItemType[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Tu pedido</h2>
            <div className={styles.list}>
                {items.map((item, index) => (
                    <OrderItem key={`${item.bookId}-${index}`} item={item} />
                ))}
            </div>
        </div>
    );
}
