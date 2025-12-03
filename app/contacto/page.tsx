'use client';

import React from 'react';
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import ContactForm from '@/components/contact/ContactForm';
import FAQAccordion from '@/components/contact/FAQAccordion';
import Button from '@/components/shared/Button';
import { Mail, MessageCircle, Clock, Share2, Gift, ArrowRight } from 'lucide-react';
import styles from '@/styles/pages/Contact.module.css';

export default function ContactPage() {
    const faqItems = [
        {
            question: '¿Cómo recibo el libro después de comprarlo?',
            answer: 'Una vez completada la compra, recibirás un email con el enlace de descarga inmediata. Podrás descargar el libro en formato PDF y/o EPUB. También quedará disponible en tu sección "Mi Biblioteca" para futuras descargas.'
        },
        {
            question: 'No me llegó el correo con el libro, ¿qué hago?',
            answer: 'Primero, revisa tu carpeta de spam o correo no deseado. Si no lo encuentras, puedes iniciar sesión en tu cuenta y acceder a "Mi Biblioteca" donde estarán todos tus libros. Si el problema persiste, contáctanos con tu número de orden y te ayudaremos de inmediato.'
        },
        {
            question: '¿Puedo volver a descargar un libro que ya compré?',
            answer: 'Sí, absolutamente. Todos los libros que compres quedan guardados en tu cuenta de forma permanente. Puedes acceder a "Mi Biblioteca" en cualquier momento y descargarlos nuevamente sin costo adicional.'
        },
        {
            question: '¿Puedo usar estos materiales en mi congregación o grupo de estudio?',
            answer: 'Sí, los libros pueden ser utilizados para enseñanza en iglesias, grupos pequeños y estudios bíblicos. Sin embargo, no está permitida la reproducción o distribución masiva de los archivos digitales. Si deseas compartir el material con tu congregación, te invitamos a que cada persona adquiera su propia copia o contacta con nosotros para opciones de licencias grupales.'
        },
        {
            question: '¿Tienen libros impresos o solo digitales?',
            answer: 'Actualmente, todos nuestros recursos están disponibles únicamente en formato digital (PDF y EPUB). Esto nos permite ofrecer precios más accesibles y entrega inmediata. Si estás interesado en versiones impresas, contáctanos y evaluaremos la posibilidad de impresión bajo demanda.'
        }
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <section className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Contacto y Soporte</h1>
                    <p className={styles.subtitle}>
                        Si tienes preguntas sobre tus libros, tus compras o nuestros recursos, estamos aquí para ayudarte.
                    </p>
                </div>
            </section>

            {/* Contact Info */}
            <section className={styles.contactInfo}>
                <h2 className={styles.sectionTitle}>Canales de Contacto Directo</h2>
                <div className={styles.infoGrid}>
                    <ContactInfoCard
                        icon={Mail}
                        title="Correo Electrónico"
                        info="soporte@deglorialibros.com"
                        note="Respuesta en 24-48 horas"
                        link="mailto:soporte@deglorialibros.com"
                    />
                    <ContactInfoCard
                        icon={MessageCircle}
                        title="WhatsApp"
                        info="+57 300 123 4567"
                        note="Lunes a viernes, 9am - 5pm (GMT-5)"
                        link="https://wa.me/573001234567"
                    />
                    <ContactInfoCard
                        icon={Share2}
                        title="Redes Sociales"
                        info="Síguenos en YouTube y Facebook"
                        note="Contenido y actualizaciones"
                    />
                    <ContactInfoCard
                        icon={Clock}
                        title="Horario de Atención"
                        info="Lunes a viernes: 9:00 AM - 5:00 PM"
                        note="Sábados: 9:00 AM - 1:00 PM"
                    />
                </div>
            </section>

            {/* Contact Form */}
            <section className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Envíanos un Mensaje</h2>
                <p className={styles.formDescription}>
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
                <div className={styles.formWrapper}>
                    <ContactForm />
                </div>
            </section>

            {/* FAQ */}
            <section className={styles.faqSection}>
                <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
                <div className={styles.faqWrapper}>
                    <FAQAccordion items={faqItems} />
                </div>
            </section>

            {/* Spiritual Message */}
            <section className={styles.spiritualSection}>
                <div className={styles.spiritualContent}>
                    <h2 className={styles.spiritualTitle}>Más que una Tienda, un Ministerio</h2>
                    <p className={styles.spiritualMessage}>
                        Más allá de una tienda, somos un ministerio que desea servirte. Si necesitas oración, un consejo puntual relacionado con el material, o simplemente quieres compartir cómo Dios está usando estos recursos en tu vida, no dudes en escribirnos. Estamos aquí para edificar, servir y caminar contigo en tu crecimiento espiritual.
                    </p>
                    <blockquote className={styles.verse}>
                        "Servíos por amor los unos a los otros." — Gálatas 5:13
                    </blockquote>
                    <div className={styles.spiritualButtons}>
                        <Button variant="secondary" href="/gratis">
                            <Gift size={16} />
                            Ver recursos gratuitos
                        </Button>
                        <Button variant="secondary" href="/catalogo">
                            <ArrowRight size={16} />
                            Explorar librería
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
