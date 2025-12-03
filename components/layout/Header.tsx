'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import styles from '@/styles/components/Header.module.css';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { getItemCount } = useCart();
    const { user, logout, loading: authLoading } = useAuth();
    const itemCount = getItemCount();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const navLinks = [
        { href: '/libreria', label: 'Librería' },
        { href: '/colecciones', label: 'Colecciones' },
        { href: '/gratis', label: 'Recursos' },
        { href: '/sobre-nosotros', label: 'Sobre Nosotros' }
    ];

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
            setUserMenuOpen(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo - Left */}
                <Link href="/" className={styles.logo}>
                    De Gloria en Gloria
                </Link>

                {/* Desktop Navigation - Center */}
                <nav className={styles.nav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions - Right */}
                <div className={styles.actions}>
                    {/* Search Icon */}
                    <button className={styles.iconButton} aria-label="Buscar">
                        <Search size={20} />
                    </button>

                    {/* Cart Icon */}
                    <Link href="/carrito" className={styles.iconButton} aria-label="Carrito">
                        <ShoppingBag size={20} />
                        {/* Badge for cart items */}
                        {itemCount > 0 && (
                            <span className={styles.cartBadge}>{itemCount}</span>
                        )}
                    </Link>

                    {/* User Menu / Login Button */}
                    {!authLoading && (
                        user ? (
                            <div className={styles.userMenu}>
                                <button
                                    className={styles.userButton}
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    aria-label="Menú de usuario"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'Usuario'}
                                            className={styles.userAvatar}
                                        />
                                    ) : (
                                        <div className={styles.userAvatarPlaceholder}>
                                            <User size={18} />
                                        </div>
                                    )}
                                    <span className={styles.userName}>
                                        {user.displayName || user.email?.split('@')[0] || 'Usuario'}
                                    </span>
                                </button>
                                {userMenuOpen && (
                                    <div className={styles.userDropdown}>
                                        <Link
                                            href="/mi-biblioteca"
                                            className={styles.userDropdownItem}
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <User size={18} />
                                            Mi Biblioteca
                                        </Link>
                                        <button
                                            className={styles.userDropdownItem}
                                            onClick={handleLogout}
                                        >
                                            <LogOut size={18} />
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth/login" className={styles.loginButton}>
                                <User size={18} />
                                <span>Iniciar sesión</span>
                            </Link>
                        )
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuButton}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <nav className={styles.mobileNav}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileNavLinkActive : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className={styles.mobileActions}>
                        <button className={styles.mobileIconButton}>
                            <Search size={20} />
                            <span>Buscar</span>
                        </button>
                        <Link href="/carrito" className={styles.mobileIconButton}>
                            <ShoppingBag size={20} />
                            <span>Carrito {itemCount > 0 ? `(${itemCount})` : ''}</span>
                        </Link>
                        {!authLoading && (
                            user ? (
                                <>
                                    <Link href="/mi-biblioteca" className={styles.loginButtonMobile}>
                                        <User size={18} />
                                        <span>Mi Biblioteca</span>
                                    </Link>
                                    <button
                                        className={styles.loginButtonMobile}
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={18} />
                                        <span>Cerrar sesión</span>
                                    </button>
                                </>
                            ) : (
                                <Link href="/auth/login" className={styles.loginButtonMobile}>
                                    <User size={18} />
                                    <span>Iniciar sesión</span>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
