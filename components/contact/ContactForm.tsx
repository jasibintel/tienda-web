'use client';

import React, { useState } from 'react';
import Button from '../shared/Button';
import { Send, CheckCircle } from 'lucide-react';
import styles from '@/styles/components/ContactForm.module.css';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        subscribe: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Por favor, escribe tu nombre.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Introduce un correo válido.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Introduce un correo válido.';
        }

        if (!formData.subject) {
            newErrors.subject = 'Selecciona un asunto.';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Escribe tu mensaje antes de enviarlo.';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                subscribe: false
            });
        }, 2000);

        // TODO: Implement actual API call
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
    };

    if (isSuccess) {
        return (
            <div className={styles.successMessage}>
                <CheckCircle size={48} className={styles.successIcon} />
                <h3 className={styles.successTitle}>Mensaje Enviado</h3>
                <p className={styles.successText}>
                    Gracias por escribirnos. Tu mensaje ha sido recibido y nos pondremos en contacto contigo lo antes posible.
                </p>
                <Button variant="primary" href="/">
                    Volver al inicio
                </Button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* Name */}
            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                    Nombre completo <span className={styles.required}>*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                    Correo electrónico <span className={styles.required}>*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {/* Subject */}
            <div className={styles.field}>
                <label htmlFor="subject" className={styles.label}>
                    Asunto <span className={styles.required}>*</span>
                </label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${styles.select} ${errors.subject ? styles.inputError : ''}`}
                >
                    <option value="">Selecciona un asunto...</option>
                    <option value="purchase">Problema con mi compra</option>
                    <option value="download">No recibí el libro</option>
                    <option value="question">Pregunta sobre un libro</option>
                    <option value="ministry">Consulta ministerial</option>
                    <option value="suggestion">Sugerencia o comentario</option>
                    <option value="other">Otro</option>
                </select>
                {errors.subject && <p className={styles.error}>{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                    Mensaje <span className={styles.required}>*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={6}
                    maxLength={1000}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                />
                {errors.message && <p className={styles.error}>{errors.message}</p>}
            </div>

            {/* Subscribe */}
            <div className={styles.checkboxField}>
                <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleChange}
                    className={styles.checkbox}
                />
                <label htmlFor="subscribe" className={styles.checkboxLabel}>
                    Deseo recibir actualizaciones sobre nuevos recursos y libros
                </label>
            </div>

            {/* Submit */}
            <Button
                type="submit"
                variant="primary"
                className={styles.submitButton}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>Enviando...</>
                ) : (
                    <>
                        <Send size={16} />
                        Enviar mensaje
                    </>
                )}
            </Button>
        </form>
    );
}
