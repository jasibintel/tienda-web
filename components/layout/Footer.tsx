'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Youtube, Instagram, Mail, Send } from 'lucide-react';
import styles from '@/styles/components/Footer.module.css';

export default function Footer() {
    const [email, setEmail] = useState('');
    const currentYear = new Date().getFullYear();

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <footer className={styles.footer}>
            {/* Newsletter Section */}
            <div className={styles.newsletterSection}>
                <div className={styles.container}>
                    <div className={styles.newsletterContent}>
                        <div className={styles.newsletterText}>
                            <h3 className={styles.newsletterTitle}>
                                Únete a nuestra comunidad de lectores
                            </h3>
                            <p className={styles.newsletterSubtitle}>
                                Recibe 1 devocional gratis al mes y recursos exclusivos directamente en tu correo
                            </p>
                        </div>
                        <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className={styles.newsletterInput}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className={styles.newsletterButton}>
                                <span>Suscribirme</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className={styles.mainFooter}>
                <div className={styles.container}>
                    <div className={styles.columns}>
                        {/* Column 1: Brand */}
                        <div className={styles.column}>
                            <h2 className={styles.brandLogo}>De Gloria en Gloria</h2>
                            <p className={styles.brandDescription}>
                                Recursos que edifican tu fe.
                            </p>
                        </div>

                        {/* Column 2: Explore */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Explora</h4>
                            <nav className={styles.linkList}>
                                <Link href="/libreria" className={styles.link}>Librería</Link>
                                <Link href="/colecciones" className={styles.link}>Devocionales</Link>
                                <Link href="/gratis" className={styles.link}>Recursos Gratuitos</Link>
                                <Link href="/colecciones" className={styles.link}>Colecciones</Link>
                            </nav>
                        </div>

                        {/* Column 3: Support */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Soporte</h4>
                            <nav className={styles.linkList}>
                                <Link href="/preguntas-frecuentes" className={styles.link}>
                                    Preguntas Frecuentes
                                </Link>
                                <Link href="/politica-reembolso" className={styles.link}>
                                    Política de Reembolso
                                </Link>
                                <Link href="/contacto" className={styles.link}>Contacto</Link>
                                <Link href="/sobre-nosotros" className={styles.link}>
                                    Sobre Nosotros
                                </Link>
                            </nav>
                        </div>

                        {/* Column 4: Contact */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Contacto</h4>
                            <div className={styles.contactInfo}>
                                <a href="mailto:soporte@deglorialibros.com" className={styles.emailLink}>
                                    <Mail size={18} />
                                    <span>soporte@deglorialibros.com</span>
                                </a>
                            </div>
                            <div className={styles.socialSection}>
                                <p className={styles.socialLabel}>Síguenos</p>
                                <div className={styles.socialLinks}>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="Instagram"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="Facebook"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                    <a
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label="YouTube"
                                    >
                                        <Youtube size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Copyright & Payment Methods */}
            <div className={styles.bottomBar}>
                <div className={styles.container}>
                    <div className={styles.bottomContent}>
                        <p className={styles.copyright}>
                            © {currentYear} De Gloria en Gloria. Todos los derechos reservados.
                        </p>
                        <div className={styles.paymentMethods}>
                            <span className={styles.paymentLabel}>Métodos de pago:</span>
                            <div className={styles.paymentIcons}>
                                <div className={styles.paymentIcon}>VISA</div>
                                <div className={styles.paymentIcon}>Mastercard</div>
                                <div className={styles.paymentIcon}>PSE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
