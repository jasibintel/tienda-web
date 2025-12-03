'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/Button.module.css';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'free';
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    type?: 'button' | 'submit';
    className?: string;
    disabled?: boolean;
}

export default function Button({
    variant = 'primary',
    children,
    onClick,
    href,
    type = 'button',
    className = '',
    disabled = false
}: ButtonProps) {
    const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={buttonClass}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={buttonClass} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
