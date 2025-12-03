'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import Button from '../shared/Button';
import styles from '@/styles/components/admin/AdminHeader.module.css';

interface AdminHeaderProps {
    title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
    const handleLogout = () => {
        // Mock logout
        alert('Cerrando sesión...');
        // In real app: signOut() and redirect
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.userSection}>
                <div className={styles.avatar}>
                    <span>JD</span>
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.userName}>Jairo Sierra</p>
                    <p className={styles.userRole}>Administrador</p>
                </div>
                <Button
                    variant="secondary"
                    onClick={handleLogout}
                    className={styles.logoutButton}
                >
                    <LogOut size={16} />
                    Cerrar sesión
                </Button>
            </div>
        </header>
    );
}
