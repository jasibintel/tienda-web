'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '@/styles/components/FAQAccordion.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.accordion}>
            {items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <button
                        className={styles.question}
                        onClick={() => toggleItem(index)}
                        aria-expanded={openIndex === index}
                    >
                        <span>{item.question}</span>
                        <ChevronDown
                            size={20}
                            className={`${styles.icon} ${openIndex === index ? styles.iconOpen : ''}`}
                        />
                    </button>
                    {openIndex === index && (
                        <div className={styles.answer}>
                            <p>{item.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
