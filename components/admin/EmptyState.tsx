import React from 'react';
import { LucideIcon } from 'lucide-react';
import Button from '../shared/Button';
import styles from '@/styles/components/admin/EmptyState.module.css';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction
}: EmptyStateProps) {
    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <Icon size={64} strokeWidth={1} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            {actionLabel && onAction && (
                <Button variant="primary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
