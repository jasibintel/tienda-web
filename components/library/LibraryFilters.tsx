'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '@/styles/components/library/LibraryFilters.module.css';

interface LibraryFiltersProps {
    activeFilter: 'all' | 'paid' | 'free';
    onFilterChange: (filter: 'all' | 'paid' | 'free') => void;
    sortBy: 'recent' | 'title-asc' | 'title-desc' | 'author';
    onSortChange: (sort: 'recent' | 'title-asc' | 'title-desc' | 'author') => void;
    count: number;
}

export default function LibraryFilters({
    activeFilter,
    onFilterChange,
    sortBy,
    onSortChange,
    count
}: LibraryFiltersProps) {
    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    Todos
                </button>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'paid' ? styles.active : ''}`}
                    onClick={() => onFilterChange('paid')}
                >
                    Comprados
                </button>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'free' ? styles.active : ''}`}
                    onClick={() => onFilterChange('free')}
                >
                    Gratuitos
                </button>
            </div>

            <div className={styles.controls}>
                <span className={styles.count}>
                    Mostrando {count} {count === 1 ? 'libro' : 'libros'}
                </span>

                <div className={styles.sortWrapper}>
                    <select
                        className={styles.sortSelect}
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value as any)}
                    >
                        <option value="recent">Más recientes</option>
                        <option value="title-asc">A-Z (Título)</option>
                        <option value="title-desc">Z-A (Título)</option>
                        <option value="author">Autor</option>
                    </select>
                    <ChevronDown size={16} className={styles.sortIcon} />
                </div>
            </div>
        </div>
    );
}
