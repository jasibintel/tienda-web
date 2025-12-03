import React from 'react';
import styles from '@/styles/components/SocialProof.module.css';

export default function SocialProof() {
    return (
        <section className={styles.socialProof}>
            <div className={styles.container}>
                {/* Stats Bar */}
                <div className={styles.statsBar}>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>50+</div>
                        <div className={styles.statLabel}>Libros Digitales</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>10K+</div>
                        <div className={styles.statLabel}>Lectores Activos</div>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div className={styles.stat}>
                        <div className={styles.statNumber}>100%</div>
                        <div className={styles.statLabel}>Contenido Bíblico</div>
                    </div>
                </div>

                {/* Testimonial and Partners */}
                <div className={styles.content}>
                    <div className={styles.quote}>
                        <span className={styles.quoteIcon}>"</span>
                        <p className={styles.quoteText}>
                            Estos recursos han transformado mi ministerio y profundizado mi relación con Dios de maneras que nunca imaginé posibles.
                        </p>
                        <div className={styles.author}>
                            <span className={styles.authorName}>Pastor Carlos Méndez</span>
                            <span className={styles.authorTitle}>Iglesia Vida Nueva</span>
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.partners}>
                        <span className={styles.partnersLabel}>Confían en nosotros:</span>
                        <div className={styles.partnerLogos}>
                            <div className={styles.partnerLogo}>Iglesia Central</div>
                            <div className={styles.partnerLogo}>Ministerio Palabra Viva</div>
                            <div className={styles.partnerLogo}>Red de Pastores</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
