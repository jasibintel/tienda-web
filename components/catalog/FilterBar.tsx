'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { categoryOptions, audienceOptions } from '@/lib/filterUtils';
import styles from '@/styles/components/FilterBar.module.css';

interface FilterBarProps {
    searchQuery: string;
    category: string;
    audience: string;
    type: 'all' | 'free' | 'paid';
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onAudienceChange: (value: string) => void;
    onTypeChange: (value: 'all' | 'free' | 'paid') => void;
    onApplyFilters: () => void;
    onClearFilters: () => void;
    resultCount: number;
    totalCount: number;
}

export default function FilterBar({
    searchQuery,
    category,
    audience,
    type,
    onSearchChange,
    onCategoryChange,
    onAudienceChange,
    onTypeChange,
    onClearFilters,
    resultCount,
    totalCount
}: FilterBarProps) {
    return (
        <div className={styles.filterBarWrapper}>
            <div className={styles.filterBar}>
                <div className={styles.container}>
                    {/* Unified Row - Tabs + Search + Filters */}
                    <div className={styles.filtersRow}>
                        {/* Compact Tabs - Left Aligned */}
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${type === 'all' ? styles.tabActive : ''}`}
                                onClick={() => onTypeChange('all')}
                            >
                                Todos
                            </button>
                            <button
                                className={`${styles.tab} ${type === 'paid' ? styles.tabActive : ''}`}
                                onClick={() => onTypeChange('paid')}
                            >
                                Librería
                            </button>
                            <button
                                className={`${styles.tab} ${type === 'free' ? styles.tabActive : ''}`}
                                onClick={() => onTypeChange('free')}
                            >
                                Recursos Gratuitos
                            </button>
                        </div>

                        {/* Divider */}
                        <div className={styles.divider}></div>

                        {/* Prominent Search Bar */}
                        <div className={styles.searchContainer}>
                            <Search className={styles.searchIcon} size={18} />
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Buscar libros, autores..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>

                        {/* Category Dropdown */}
                        <select
                            className={styles.dropdown}
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value)}
                        >
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Audience Dropdown */}
                        <select
                            className={styles.dropdown}
                            value={audience}
                            onChange={(e) => onAudienceChange(e.target.value)}
                        >
                            {audienceOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Clear Button */}
                        <button className={styles.clearButton} onClick={onClearFilters}>
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>

            {/* Result Counter */}
            <div className={styles.resultCounter}>
                <span className={styles.resultText}>
                    Mostrando <strong>{resultCount}</strong> de <strong>{totalCount}</strong> resultados
                </span>
            </div>
        </div>
    );
}
