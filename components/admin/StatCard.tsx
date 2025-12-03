import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from '@/styles/components/admin/StatCard.module.css';

interface StatCardProps {
    icon: LucideIcon;
    value: string | number;
    label: string;
    sublabel?: string;
    color?: 'primary' | 'secondary' | 'success';
}

export default function StatCard({
    icon: Icon,
    value,
    label,
    sublabel,
    color = 'primary'
}: StatCardProps) {
    return (
        <div className={styles.card}>
            <div className={`${styles.iconWrapper} ${styles[color]}`}>
                <Icon size={24} />
            </div>
            <div className={styles.content}>
                <p className={styles.value}>{value}</p>
                <p className={styles.label}>{label}</p>
                {sublabel && <p className={styles.sublabel}>{sublabel}</p>}
            </div>
        </div>
    );
}
