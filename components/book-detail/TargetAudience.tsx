import React from 'react';
import { User, Users, BookOpen, Home } from 'lucide-react';
import styles from '@/styles/components/TargetAudience.module.css';

interface TargetAudienceItem {
    icon: string;
    title: string;
    description: string;
}

interface TargetAudienceProps {
    audiences: TargetAudienceItem[];
}

export default function TargetAudience({ audiences }: TargetAudienceProps) {
    const getIcon = (iconName: string) => {
        const iconProps = { size: 48, className: styles.icon };

        switch (iconName) {
            case 'person':
                return <User {...iconProps} />;
            case 'users':
                return <Users {...iconProps} />;
            case 'book':
                return <BookOpen {...iconProps} />;
            case 'home':
                return <Home {...iconProps} />;
            default:
                return <User {...iconProps} />;
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>¿Para Quién es Este Libro?</h2>
                <p className={styles.subtitle}>
                    Este recurso ha sido diseñado especialmente para:
                </p>
                <div className={styles.grid}>
                    {audiences.map((audience, index) => (
                        <div key={index} className={styles.card}>
                            {getIcon(audience.icon)}
                            <h3 className={styles.cardTitle}>{audience.title}</h3>
                            <p className={styles.cardDescription}>{audience.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
