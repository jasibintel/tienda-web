import React from 'react';
import { Check } from 'lucide-react';
import styles from '@/styles/components/LearningPoints.module.css';

interface LearningPointsProps {
    points: string[];
}

export default function LearningPoints({ points }: LearningPointsProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Lo que Aprenderás</h2>
                <p className={styles.subtitle}>
                    Este libro te equipará con herramientas prácticas y fundamentos bíblicos para:
                </p>
                <div className={styles.grid}>
                    {points.map((point, index) => (
                        <div key={index} className={styles.point}>
                            <Check className={styles.icon} size={20} />
                            <span className={styles.text}>{point}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
