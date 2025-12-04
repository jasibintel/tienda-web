'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import styles from '@/styles/components/admin/MultiSelect.module.css';

export interface MultiSelectOption {
    id: string;
    label: string;
}

interface MultiSelectProps {
    options: MultiSelectOption[];
    selectedIds: string[];
    onChange: (selectedIds: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
}

export default function MultiSelect({
    options,
    selectedIds,
    onChange,
    placeholder = 'Selecciona opciones',
    searchPlaceholder = 'Buscar...',
    className = ''
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Cerrar al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedOptions = options.filter(option => selectedIds.includes(option.id));

    const toggleOption = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    const removeOption = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(selectedIds.filter(selectedId => selectedId !== id));
    };

    return (
        <div ref={containerRef} className={`${styles.container} ${className}`}>
            <div
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.selectedContainer}>
                    {selectedOptions.length === 0 ? (
                        <span className={styles.placeholder}>{placeholder}</span>
                    ) : (
                        <div className={styles.selectedTags}>
                            {selectedOptions.slice(0, 3).map(option => (
                                <span key={option.id} className={styles.selectedTag}>
                                    {option.label}
                                    <button
                                        type="button"
                                        onClick={(e) => removeOption(option.id, e)}
                                        className={styles.removeButton}
                                        aria-label={`Eliminar ${option.label}`}
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                            {selectedOptions.length > 3 && (
                                <span className={styles.moreCount}>
                                    +{selectedOptions.length - 3} más
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
                />
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.searchContainer}>
                        <Search size={16} className={styles.searchIcon} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={searchPlaceholder}
                            className={styles.searchInput}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className={styles.optionsList}>
                        {filteredOptions.length === 0 ? (
                            <div className={styles.noResults}>No se encontraron opciones</div>
                        ) : (
                            filteredOptions.map(option => (
                                <label
                                    key={option.id}
                                    className={styles.option}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(option.id)}
                                        onChange={() => toggleOption(option.id)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

