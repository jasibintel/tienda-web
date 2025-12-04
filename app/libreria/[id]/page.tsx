'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/book-detail/Breadcrumbs';
import ProductHero from '@/components/book-detail/ProductHero';
import BookDescription from '@/components/book-detail/BookDescription';
import LearningPoints from '@/components/book-detail/LearningPoints';
import TechnicalDetails from '@/components/book-detail/TechnicalDetails';
import TargetAudience from '@/components/book-detail/TargetAudience';
import RelatedBooks from '@/components/book-detail/RelatedBooks';
import { useBook, useBooks } from '@/lib/hooks/useBooks';
import { useCart } from '@/lib/context/CartContext';

export default function BookDetailPage() {
    const params = useParams();
    const router = useRouter();
    const bookId = params.id as string;

    // Get book data from Firestore
    const { book, loading, error } = useBook(bookId);
    const { books: allBooks } = useBooks();
    const { addToCart, clearCart } = useCart();

    // Get related books (mismo autor o misma categoría)
    const relatedBooks = React.useMemo(() => {
        if (!book || !allBooks) return [];
        return allBooks
            .filter(b => b.id !== book.id && (b.category === book.category || b.author === book.author))
            .slice(0, 8);
    }, [book, allBooks]);

    // Loading state
    if (loading) {
        return (
            <div style={{ padding: '48px', textAlign: 'center' }}>
                <p>Cargando libro...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div style={{ padding: '48px', textAlign: 'center' }}>
                <h1>Error al cargar el libro</h1>
                <p>{error}</p>
                <a href="/libreria" style={{ color: 'var(--color-primary-500)' }}>
                    Volver al catálogo
                </a>
            </div>
        );
    }

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

    // Handlers
    const handleAddToCart = () => {
        if (!book) return;
        addToCart(book);
        alert('Libro añadido al carrito');
    };

    const handlePurchase = () => {
        if (!book) return;
        // Limpiar carrito y agregar solo este libro
        clearCart();
        addToCart(book);
        // Redirigir al carrito
        router.push('/carrito');
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
                onAddToCart={handleAddToCart}
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
