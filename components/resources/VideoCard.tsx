'use client';

import React, { useState } from 'react';
import { Play, ExternalLink, Clock } from 'lucide-react';
import { ResourceVideo } from '@/lib/types';
import styles from '@/styles/components/resources/VideoCard.module.css';

interface VideoCardProps {
    video: ResourceVideo;
}

// Función para detectar el tipo de video y generar embed URL
function getVideoEmbedUrl(url: string): string | null {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/)(?:.*\/)?(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return null;
}

export default function VideoCard({ video }: VideoCardProps) {
    const [showEmbed, setShowEmbed] = useState(false);
    const embedUrl = getVideoEmbedUrl(video.url);
    const isEmbeddable = embedUrl !== null;

    const handleVideoClick = () => {
        if (isEmbeddable) {
            setShowEmbed(true);
        } else {
            window.open(video.url, '_blank');
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>{video.title}</h3>
                    {video.duration && (
                        <span className={styles.duration}>
                            <Clock size={14} />
                            {video.duration}
                        </span>
                    )}
                </div>
            </div>

            {video.description && (
                <p className={styles.description}>{video.description}</p>
            )}

            <div className={styles.videoContainer}>
                {showEmbed && embedUrl ? (
                    <div className={styles.embedWrapper}>
                        <iframe
                            src={embedUrl}
                            className={styles.embed}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                        />
                    </div>
                ) : (
                    <div className={styles.placeholder} onClick={handleVideoClick}>
                        <div className={styles.playButton}>
                            <Play size={48} fill="white" />
                        </div>
                        <p className={styles.playText}>
                            {isEmbeddable ? 'Reproducir video' : 'Abrir en nueva pestaña'}
                        </p>
                        {!isEmbeddable && (
                            <ExternalLink size={20} className={styles.externalIcon} />
                        )}
                    </div>
                )}
            </div>

            {!isEmbeddable && (
                <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                >
                    <ExternalLink size={16} />
                    Abrir video
                </a>
            )}
        </div>
    );
}

