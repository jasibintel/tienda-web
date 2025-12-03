'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Book,
    FolderTree,
    MessageSquare,
    ShoppingBag,
    Users,
    Menu,
    X
} from 'lucide-react';
import styles from '@/styles/components/admin/Sidebar.module.css';

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/libros', label: 'Libros', icon: Book },
    { href: '/admin/categorias', label: 'Categorías', icon: FolderTree },
    { href: '/admin/testimonios', label: 'Testimonios', icon: MessageSquare },
    { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag },
    { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className={styles.mobileMenuButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                {/* Logo */}
                <div className={styles.logo}>
                    <h1>De Gloria en Gloria</h1>
                    <p className={styles.adminLabel}>Panel Admin</p>
                </div>

                {/* Navigation */}
                <nav className={styles.nav}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname?.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
