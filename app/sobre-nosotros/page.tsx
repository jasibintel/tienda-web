'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Star, Gift, Heart, ShieldCheck, Users, ArrowRight, Download, Target } from 'lucide-react';
import styles from '@/styles/pages/AboutUs.module.css';

export default function AboutUsPage() {
    const values = [
        {
            icon: BookOpen,
            title: 'Fidelidad',
            description: 'Creemos que la Palabra de Dios es nuestra guía absoluta. Todo lo que hacemos nace de un compromiso inquebrantable con la verdad bíblica.'
        },
        {
            icon: Star,
            title: 'Excelencia',
            description: 'Recursos de la más alta calidad editorial y teológica, cuidadosamente seleccionados para edificar vidas y fortalecer ministerios.'
        },
        {
            icon: Gift,
            title: 'Generosidad',
            description: 'Damos libremente porque hemos recibido libremente. Creemos en bendecir sin esperar nada a cambio.'
        },
        {
            icon: Users,
            title: 'Servicio',
            description: 'Existimos para servir a la iglesia de Cristo, equipando a creyentes, familias y líderes con herramientas que transforman vidas.'
        },
        {
            icon: ShieldCheck,
            title: 'Integridad',
            description: 'Transparencia y coherencia en todo lo que hacemos. Cada recurso refleja nuestro compromiso con la verdad y la honestidad.'
        },
        {
            icon: Heart,
            title: 'Amor',
            description: 'Cada recurso está motivado por el amor a las almas y el deseo genuino de ver vidas transformadas por el poder de la Palabra.'
        }
    ];

    const purposes = [
        'Equipar a creyentes con recursos bíblicos sólidos',
        'Fortalecer familias, ministerios y líderes cristianos',
        'Llevar enseñanza clara y profunda a cada hogar',
        'Bendecir a quienes no pueden adquirir material espiritual',
        'Levantar una generación apasionada por la presencia de Dios'
    ];

    return (
        <div className={styles.page}>
            {/* Hero Section - Inspiracional */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <h1 className={styles.heroTitle}>Sobre Nosotros</h1>
                    <p className={styles.heroSubtitle}>
                        Conoce el corazón y la visión que impulsa cada recurso de este ministerio.
                    </p>
                </div>
            </section>

            {/* Nuestra Historia - Narrativa Espiritual */}
            <section className={styles.historySection}>
                <div className={styles.container}>
                    <div className={styles.historyContent}>
                        <h2 className={styles.sectionTitle}>Nuestra Historia</h2>
                        <div className={styles.historyText}>
                            <p className={styles.historyParagraph}>
                                De Gloria en Gloria no nació como un proyecto digital, sino como una inquietud espiritual que durante años no supe comprender. Muchas veces le dije a mi esposa:
                            </p>
                            <p className={styles.historyQuote}>
                                "Sé que Dios quiere que haga algo… pero no sé qué es."
                            </p>
                            <p className={styles.historyParagraph}>
                                Ese sentir me acompañó por meses, incluso años.
                            </p>
                            <p className={styles.historyParagraph}>
                                No fue hasta que inicié los devocionales en vivo que el propósito comenzó a revelarse. Un día, mientras enseñaba la Palabra, Dios me hizo entender:
                            </p>
                            <p className={styles.historyQuote}>
                                "Esto era lo que te estaba llamando a hacer."
                            </p>
                            <p className={styles.historyParagraph}>
                                Desde entonces, el Señor ha confirmado Su obra una y otra vez.
                            </p>
                            <p className={styles.historyParagraph}>
                                En varios devocionales, más de 80.000 personas han sido alcanzadas en un solo día; hemos recibido testimonios de:
                            </p>
                            <ul className={styles.testimonialsList}>
                                <li>Personas entregando su vida a Cristo</li>
                                <li>Hogares restaurados</li>
                                <li>Creyentes sanados durante la transmisión</li>
                                <li>Jóvenes regresando a los caminos del Señor</li>
                            </ul>
                            <p className={styles.historyParagraph}>
                                De Gloria en Gloria nació como respuesta a ese llamado, con el deseo de ofrecer recursos bíblicos profundos, accesibles y de calidad, para edificar vidas y fortalecer la fe de todo aquel que busca a Dios de corazón.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nuestros Valores - Grid 3x2 Mejorado */}
            <section className={styles.valuesSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
                        <p className={styles.sectionSubtitle}>
                            Los principios que guían cada decisión y cada recurso que creamos.
                        </p>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div key={index} className={styles.valueCard}>
                                    <div className={styles.valueIcon}>
                                        <Icon size={36} strokeWidth={1.5} />
                                    </div>
                                    <h3 className={styles.valueTitle}>{value.title}</h3>
                                    <p className={styles.valueDescription}>{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Nuestro Propósito - Nueva Sección */}
            <section className={styles.purposeSection}>
                <div className={styles.container}>
                    <div className={styles.purposeContent}>
                        <div className={styles.purposeIcon}>
                            <Target size={48} strokeWidth={1.5} />
                        </div>
                        <h2 className={styles.sectionTitle}>Nuestro Propósito</h2>
                        <p className={styles.purposeIntro}>
                            Existimos para:
                        </p>
                        <ul className={styles.purposeList}>
                            {purposes.map((purpose, index) => (
                                <li key={index} className={styles.purposeItem}>
                                    {purpose}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Conoce al Fundador - Estilo Carta Mejorado */}
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
                                    Soy pastor, maestro y apasionado por enseñar la Palabra de Dios. Nací el 6 de febrero de 1980 en Ibagué, Colombia, y durante más de 15 años he servido en el ministerio, acompañando a familias, jóvenes y creyentes en su crecimiento espiritual.
                                </p>
                                <p>
                                    Antes de comenzar los devocionales, por mucho tiempo sentí que Dios me llamaba a algo que no podía entender. No sabía qué era, pero sabía que debía prepararme.
                                </p>
                                <p>
                                    Hoy reconozco que ese llamado era este ministerio: <strong>edificar vidas a través de la enseñanza bíblica.</strong>
                                </p>
                                <p>
                                    Mi oración es que cada libro, cada devocional y cada recurso de esta plataforma sea una herramienta que Dios use para bendecir tu vida, tu hogar y tu relación con Él.
                                </p>
                                <div className={styles.founderQuote}>
                                    <p className={styles.quoteText}>
                                        "Mi mayor deseo es que Cristo sea conocido, amado y obedecido en cada corazón."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action - Renovado */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Únete a esta Visión</h2>
                        <p className={styles.ctaDescription}>
                            Este ministerio no se trata solo de libros, sino de vidas.
                        </p>
                        <p className={styles.ctaSubDescription}>
                            Te invitamos a ser parte de lo que Dios está haciendo a través de estos recursos.
                        </p>
                        <p className={styles.ctaSubDescription}>
                            Explora la librería o descarga materiales gratuitos y comienza a crecer en la Palabra.
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
