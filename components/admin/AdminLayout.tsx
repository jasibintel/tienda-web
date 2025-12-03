import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import styles from '@/styles/components/admin/AdminLayout.module.css';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    return (
        <div className={styles.container}>
            <Sidebar />

            <div className={styles.main}>
                <AdminHeader title={title} />

                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}
