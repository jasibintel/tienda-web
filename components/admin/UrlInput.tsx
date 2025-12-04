'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { validateUrl } from '@/lib/utils/url';
import styles from '@/styles/components/admin/UrlInput.module.css';

interface UrlInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    helpText?: string;
    required?: boolean;
    className?: string;
}

export default function UrlInput({
    value,
    onChange,
    placeholder = 'https://ejemplo.com/archivo.pdf',
    label,
    helpText,
    required = false,
    className = ''
}: UrlInputProps) {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [hasBlurred, setHasBlurred] = useState(false);

    useEffect(() => {
        if (value.trim() === '') {
            setIsValid(null);
        } else {
            setIsValid(validateUrl(value));
        }
    }, [value]);

    const handleBlur = () => {
        setHasBlurred(true);
    };

    const showError = hasBlurred && value.trim() !== '' && isValid === false;

    return (
        <div className={`${styles.container} ${className}`}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <div className={styles.inputWrapper}>
                <input
                    type="url"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className={`${styles.input} ${showError ? styles.error : ''} ${isValid === true ? styles.valid : ''}`}
                    required={required}
                />
                {value.trim() !== '' && (
                    <div className={styles.icon}>
                        {isValid === true ? (
                            <CheckCircle size={18} className={styles.validIcon} />
                        ) : isValid === false ? (
                            <XCircle size={18} className={styles.errorIcon} />
                        ) : null}
                    </div>
                )}
            </div>
            {showError && (
                <div className={styles.errorMessage}>
                    <AlertCircle size={14} />
                    <span>Por favor ingresa una URL válida (debe empezar con http:// o https://)</span>
                </div>
            )}
            {helpText && !showError && (
                <div className={styles.helpText}>{helpText}</div>
            )}
        </div>
    );
}

