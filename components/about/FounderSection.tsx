import React from 'react';
import Image from 'next/image';
import styles from '@/styles/components/FounderSection.module.css';

interface FounderSectionProps {
    name: string;
    role: string;
    bio: string[];
    quote?: string;
    imageUrl?: string;
}

export default function FounderSection({
    name,
    role,
    bio,
    quote,
    imageUrl = '/images/founder-placeholder.jpg'
}: FounderSectionProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={300}
                        height={300}
                        className={styles.image}
                    />
                </div>
                <div className={styles.content}>
                    <h2 className={styles.name}>{name}</h2>
                    <p className={styles.role}>{role}</p>
                    {bio.map((paragraph, index) => (
                        <p key={index} className={styles.bio}>{paragraph}</p>
                    ))}
                    {quote && (
                        <blockquote className={styles.quote}>
                            {quote}
                        </blockquote>
                    )}
                </div>
            </div>
        </section>
    );
}
