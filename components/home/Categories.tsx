'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Heart, Mic, Users, Star, TrendingUp } from 'lucide-react';
import styles from '@/styles/components/Categories.module.css';

const categories = [
    {
        id: '1',
        name: 'Para Maestros',
        icon: BookOpen,
        slug: 'maestros',
        bookCount: 24
    },
    {
        id: '2',
        name: 'Devocionales',
        icon: Heart,
        slug: 'devocionales',
        bookCount: 18
    },
    {
        id: '3',
        name: 'Predicaciones',
        icon: Mic,
        slug: 'predicaciones',
        bookCount: 15
    },
    {
        id: '4',
        name: 'Familias',
        icon: Users,
        slug: 'familias',
        bookCount: 12
    },
    {
        id: '5',
        name: 'Niños',
        icon: Star,
        slug: 'ninos',
        bookCount: 10
    },
    {
        id: '6',
        name: 'Jóvenes',
        icon: TrendingUp,
        slug: 'jovenes',
        bookCount: 14
    }
];

export default function Categories() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Explora por Categorías</h2>
                    <p className={styles.subtitle}>
                        Encuentra exactamente lo que necesitas para tu crecimiento espiritual
                    </p>
                </div>

                <div className={styles.grid}>
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <Link
                                key={category.id}
                                href={`/libreria/categorias/${category.slug}`}
                                className={styles.card}
                            >
                                <div className={styles.iconContainer}>
                                    <IconComponent size={64} strokeWidth={2} />
                                </div>
                                <h3 className={styles.categoryName}>{category.name}</h3>
                                {category.bookCount && (
                                    <p className={styles.bookCount}>
                                        {category.bookCount} libros
                                    </p>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
