'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from '@/styles/components/SearchInput.module.css';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = 'Buscar por título, autor o tema...'
}: SearchInputProps) {
    const [localValue, setLocalValue] = useState(value);

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(localValue);
        }, 500);

        return () => clearTimeout(timer);
    }, [localValue, onChange]);

    return (
        <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
            />
        </div>
    );
}
