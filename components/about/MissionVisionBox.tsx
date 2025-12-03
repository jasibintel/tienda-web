import React from 'react';
import styles from '@/styles/components/MissionVisionBox.module.css';

interface MissionVisionBoxProps {
    title: string;
    content: string;
    objectives?: string[];
}

export default function MissionVisionBox({ title, content, objectives }: MissionVisionBoxProps) {
    return (
        <section className={styles.box}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
            {objectives && objectives.length > 0 && (
                <ul className={styles.objectives}>
                    {objectives.map((objective, index) => (
                        <li key={index} className={styles.objective}>
                            <span className={styles.check}>✓</span>
                            {objective}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
