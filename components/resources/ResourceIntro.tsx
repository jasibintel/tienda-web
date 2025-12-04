'use client';

import React from 'react';
import styles from '@/styles/components/resources/ResourceIntro.module.css';

interface ResourceIntroProps {
    title: string;
    text: string;
}

export default function ResourceIntro({ title, text }: ResourceIntroProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} />
            </div>
        </section>
    );
}

