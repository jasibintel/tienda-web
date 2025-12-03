import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from '@/styles/components/ContactInfoCard.module.css';

interface ContactInfoCardProps {
    icon: LucideIcon;
    title: string;
    info: string;
    note?: string;
    link?: string;
}

export default function ContactInfoCard({ icon: Icon, title, info, note, link }: ContactInfoCardProps) {
    const content = (
        <>
            <Icon size={40} className={styles.icon} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.info}>{info}</p>
            {note && <p className={styles.note}>{note}</p>}
        </>
    );

    if (link) {
        return (
            <a href={link} className={styles.card} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return <div className={styles.card}>{content}</div>;
}
