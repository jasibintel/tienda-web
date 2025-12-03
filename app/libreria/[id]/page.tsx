'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/components/book-detail/Breadcrumbs';
import ProductHero from '@/components/book-detail/ProductHero';
import BookDescription from '@/components/book-detail/BookDescription';
import LearningPoints from '@/components/book-detail/LearningPoints';
import TechnicalDetails from '@/components/book-detail/TechnicalDetails';
import TargetAudience from '@/components/book-detail/TargetAudience';
import RelatedBooks from '@/components/book-detail/RelatedBooks';
import { getBookById, getRelatedBooks } from '@/lib/bookHelpers';

export default function BookDetailPage() {
    const params = useParams();
    const bookId = params.id as string;

    // Get book data
    const book = getBookById(bookId);

    // Handle book not found
    if (!book) {
        return (
            <div style={{ padding: '48px', textAlign: 'center' }}>
                <h1>Libro no encontrado</h1>
                <p>El libro que buscas no existe o ha sido eliminado.</p>
                <a href="/libreria" style={{ color: 'var(--color-primary-500)' }}>
                    Volver al catálogo
                </a>
            </div>
        );
    }

    // Get related books
    const relatedBooks = getRelatedBooks(book.id, book.category, 8);

    // Handlers
    const handlePurchase = () => {
        console.log('Purchase book:', book.id);
        // TODO: Implement purchase flow
        alert('Funcionalidad de compra próximamente');
    };

    const handleDownload = () => {
        console.log('Download book:', book.id);
        // TODO: Implement download flow
        alert('Funcionalidad de descarga próximamente');
    };

    return (
        <>
            <Breadcrumbs category={book.category} bookTitle={book.title} />

            <ProductHero
                title={book.title}
                subtitle={book.subtitle}
                author={book.author}
                coverUrl={book.coverUrl}
                description={book.description}
                price={book.price}
                isFree={book.isFree}
                formats={book.formats}
                onPurchase={handlePurchase}
                onDownload={handleDownload}
            />

            {book.descriptionLong && (
                <BookDescription descriptionLong={book.descriptionLong} />
            )}

            {book.learningPoints && book.learningPoints.length > 0 && (
                <LearningPoints points={book.learningPoints} />
            )}

            <TechnicalDetails
                pages={book.pages}
                formats={book.formats}
                fileSize={book.fileSize}
                language={book.language}
                publishedDate={book.publishedDate}
                isbn={book.isbn}
                publisher={book.publisher}
                category={book.category}
                audience={book.audience}
            />

            {book.targetAudience && book.targetAudience.length > 0 && (
                <TargetAudience audiences={book.targetAudience} />
            )}

            {relatedBooks.length > 0 && (
                <RelatedBooks books={relatedBooks} />
            )}
        </>
    );
}
