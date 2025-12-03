import React from 'react';
import styles from '@/styles/components/IntroSection.module.css';

interface IntroSectionProps {
    message: string;
}

export default function IntroSection({ message }: IntroSectionProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <p className={styles.message}>{message}</p>
            </div>
        </section>
    );
}
