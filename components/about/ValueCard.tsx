'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from '@/styles/components/ValueCard.module.css';

interface ValueCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
    return (
        <div className={styles.card}>
            <Icon size={48} className={styles.icon} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
}
