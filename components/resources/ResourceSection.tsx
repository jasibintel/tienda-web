'use client';

import React from 'react';
import { ResourceSection as ResourceSectionType } from '@/lib/types';
import VideoCard from './VideoCard';
import styles from '@/styles/components/resources/ResourceSection.module.css';

interface ResourceSectionProps {
    section: ResourceSectionType;
}

export default function ResourceSection({ section }: ResourceSectionProps) {
    // Ordenar videos por order
    const sortedVideos = [...section.videos].sort((a, b) => a.order - b.order);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{section.title}</h2>
                    {section.description && (
                        <p className={styles.description}>{section.description}</p>
                    )}
                </div>

                {sortedVideos.length > 0 ? (
                    <div className={styles.videosGrid}>
                        {sortedVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.emptyMessage}>No hay videos en esta sección.</p>
                )}
            </div>
        </section>
    );
}

