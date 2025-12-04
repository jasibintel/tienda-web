'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import styles from '@/styles/components/admin/TagInput.module.css';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    maxTags?: number;
    maxTagLength?: number;
    placeholder?: string;
    className?: string;
}

export default function TagInput({
    tags,
    onChange,
    maxTags = 10,
    maxTagLength = 30,
    placeholder = 'Escribe y presiona Enter para agregar',
    className = ''
}: TagInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            addTag(inputValue.trim());
        } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
            // Eliminar último tag si el input está vacío
            removeTag(tags.length - 1);
        }
    };

    const addTag = (tag: string) => {
        // Validar longitud
        if (tag.length > maxTagLength) {
            alert(`El tag no puede tener más de ${maxTagLength} caracteres`);
            return;
        }

        // Validar duplicados
        if (tags.includes(tag)) {
            alert('Este tag ya existe');
            return;
        }

        // Validar máximo de tags
        if (tags.length >= maxTags) {
            alert(`No puedes agregar más de ${maxTags} tags`);
            return;
        }

        onChange([...tags, tag]);
        setInputValue('');
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        onChange(newTags);
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.tagsContainer}>
                {tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className={styles.removeButton}
                            aria-label={`Eliminar tag ${tag}`}
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
                {tags.length < maxTags && (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className={styles.input}
                        maxLength={maxTagLength}
                    />
                )}
            </div>
            <div className={styles.helpText}>
                {tags.length}/{maxTags} tags • Máximo {maxTagLength} caracteres por tag
            </div>
        </div>
    );
}

