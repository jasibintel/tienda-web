import React from 'react';
import styles from '@/styles/components/BookDescription.module.css';

interface BookDescriptionProps {
    descriptionLong: string;
}

export default function BookDescription({ descriptionLong }: BookDescriptionProps) {
    // Split by \n\n to create paragraphs
    const paragraphs = descriptionLong.split('\n\n');

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Acerca de Este Libro</h2>
                <div className={styles.content}>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className={styles.paragraph}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
