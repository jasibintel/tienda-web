'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Star, Gift, Heart, ShieldCheck, Users, ArrowRight, Download } from 'lucide-react';
import styles from '@/styles/pages/AboutUs.module.css';

export default function AboutUsPage() {
    const values = [
        {
            icon: BookOpen,
            title: 'Fidelidad',
            description: 'Creemos que la Biblia es nuestra única regla de fe y práctica.'
        },
        {
            icon: Star,
            title: 'Excelencia',
            description: 'Recursos de la más alta calidad editorial y teológica.'
        },
        {
            icon: Gift,
            title: 'Generosidad',
            description: 'Damos libremente porque hemos recibido libremente.'
        },
        {
            icon: Users,
            title: 'Servicio',
            description: 'Existimos para servir a la iglesia de Cristo.'
        },
        {
            icon: ShieldCheck,
            title: 'Integridad',
            description: 'Transparencia y coherencia en todo lo que hacemos.'
        },
        {
            icon: Heart,
            title: 'Amor',
            description: 'Cada recurso está motivado por el amor a las almas.'
        }
    ];

    return (
        <div className={styles.page}>
            {/* Hero Section - Inspiracional */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <h1 className={styles.heroTitle}>Sobre Nosotros</h1>
                    <p className={styles.heroSubtitle}>
                        Conoce la visión que impulsa cada recurso.
                    </p>
                </div>
            </section>

            {/* Nuestra Historia - Split 50/50 */}
            <section className={styles.historySection}>
                <div className={styles.container}>
                    <div className={styles.historySplit}>
                        {/* Left - Image */}
                        <div className={styles.historyImage}>
                            <div className={styles.imagePlaceholder}>
                                <BookOpen size={80} className={styles.placeholderIcon} />
                                <p className={styles.placeholderText}>Imagen inspiradora</p>
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div className={styles.historyContent}>
                            <h2 className={styles.sectionTitle}>Nuestra Historia</h2>
                            <div className={styles.historyText}>
                                <p>
                                    De Gloria en Gloria nació de una convicción profunda: la iglesia necesita recursos doctrinales sólidos, accesibles y de calidad.
                                </p>
                                <p>
                                    Durante años, como pastor y maestro, observé la dificultad que muchos creyentes enfrentaban para encontrar material bíblico confiable que fortaleciera su fe.
                                </p>
                                <p>
                                    En 2023, con oración y visión clara, decidimos crear una plataforma donde cada libro fuera cuidadosamente seleccionado para edificar vidas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nuestros Valores - Grid 3x2 */}
            <section className={styles.valuesSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div key={index} className={styles.valueCard}>
                                    <div className={styles.valueIcon}>
                                        <Icon size={32} strokeWidth={2} />
                                    </div>
                                    <h3 className={styles.valueTitle}>{value.title}</h3>
                                    <p className={styles.valueDescription}>{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Conoce al Fundador - Estilo Carta */}
            <section className={styles.founderSection}>
                <div className={styles.container}>
                    <div className={styles.founderCard}>
                        {/* Left - Profile Image */}
                        <div className={styles.founderImageContainer}>
                            <div className={styles.founderImage}>
                                <div className={styles.profilePlaceholder}>JS</div>
                            </div>
                        </div>

                        {/* Right - Bio */}
                        <div className={styles.founderContent}>
                            <h2 className={styles.founderName}>Jairo Sierra</h2>
                            <p className={styles.founderRole}>Fundador y Director</p>

                            <div className={styles.founderBio}>
                                <p>
                                    Soy pastor, maestro y apasionado por la enseñanza de la Palabra. Durante más de 15 años he servido en el ministerio, y he visto de primera mano cómo los recursos adecuados pueden transformar vidas.
                                </p>
                                <p>
                                    De Gloria en Gloria nació de un sueño: que cada creyente pueda acceder a enseñanza bíblica sólida que edifique su fe y lo equipe para servir.
                                </p>
                                <div className={styles.founderQuote}>
                                    <p>Mi oración es que este ministerio sea de bendición para ti, tu familia y tu iglesia.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action - Centrado */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Únete a Esta Visión</h2>
                        <p className={styles.ctaDescription}>
                            Te invitamos a ser parte de este ministerio. Explora nuestra librería o descarga recursos gratuitos.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/libreria" className={styles.ctaButtonPrimary}>
                                <ArrowRight size={20} />
                                <span>Explorar Librería</span>
                            </Link>
                            <Link href="/gratis" className={styles.ctaButtonSecondary}>
                                <Download size={20} />
                                <span>Recursos Gratuitos</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
