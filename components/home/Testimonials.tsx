'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/lib/mockData';
import styles from '@/styles/components/Testimonials.module.css';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Lo que dicen nuestros lectores</h2>
                    <p className={styles.subtitle}>
                        Testimonios de vidas transformadas por la Palabra
                    </p>
                </div>

                <div className={styles.carouselContainer}>
                    <button
                        className={`${styles.navButton} ${styles.navButtonLeft}`}
                        onClick={prevTestimonial}
                        aria-label="Testimonio anterior"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className={styles.testimonialCard}>
                        <div className={styles.quoteIcon}>
                            <Quote size={48} />
                        </div>
                        <blockquote className={styles.quote}>
                            {testimonials[currentIndex].quote}
                        </blockquote>
                        <div className={styles.author}>
                            <div className={styles.authorAvatar}>
                                {testimonials[currentIndex].authorName.charAt(0)}
                            </div>
                            <div className={styles.authorInfo}>
                                <p className={styles.authorName}>
                                    {testimonials[currentIndex].authorName}
                                </p>
                                <p className={styles.authorLocation}>
                                    {testimonials[currentIndex].authorLocation}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`${styles.navButton} ${styles.navButtonRight}`}
                        onClick={nextTestimonial}
                        aria-label="Siguiente testimonio"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                            onClick={() => goToTestimonial(index)}
                            aria-label={`Ir al testimonio ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
