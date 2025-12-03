import React from 'react';
import Image from 'next/image';
import styles from '@/styles/components/HeroAbout.module.css';

interface HeroAboutProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
}

export default function HeroAbout({ title, subtitle, backgroundImage = '/images/hero-about.jpg' }: HeroAboutProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.imageWrapper}>
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className={styles.image}
                    priority
                />
                <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </section>
    );
}
