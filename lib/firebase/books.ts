// Funciones para interactuar con la colección de libros en Firestore

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    QueryDocumentSnapshot,
    DocumentData,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './config';
import { Book } from '@/lib/types';

const BOOKS_COLLECTION = 'books';

// Convertir documento de Firestore a Book
function docToBook(docSnap: QueryDocumentSnapshot<DocumentData>): Book {
    const data = docSnap.data();
    return {
        id: docSnap.id,
        ...data,
        // Asegurar que los campos opcionales estén presentes
        price: data.price || undefined,
        isFree: data.isFree || false,
        featured: data.featured || false,
        formats: data.formats || ['PDF'],
        isActive: data.isActive !== undefined ? data.isActive : true,
        // Nuevos campos
        tags: data.tags || undefined,
        slug: data.slug || undefined,
        metaDescription: data.metaDescription || undefined,
        downloadUrls: data.downloadUrls || undefined,
        previewUrl: data.previewUrl || undefined,
        collectionIds: data.collectionIds || undefined,
        readingOrder: data.readingOrder || undefined,
        hasResources: data.hasResources || false
    } as Book;
}

// Obtener todos los libros
export async function getAllBooks(): Promise<Book[]> {
    try {
        // Verificar que db esté inicializado
        if (!db) {
            const errorMsg = 'Firestore no está inicializado. Verifica las variables de entorno de Firebase.';
            console.error('Error en getAllBooks:', {
                message: errorMsg,
                error: new Error(errorMsg),
                variables: {
                    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅' : '❌',
                    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅' : '❌',
                    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅' : '❌',
                }
            });
            throw new Error(errorMsg);
        }

        console.log('🔄 getAllBooks: Iniciando query...');
        const hostname = typeof window !== 'undefined' ? window.location.hostname : 'server';
        const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
        const isVercel = hostname.includes('vercel.app');
        
        const diagnosticInfo = {
            dbInitialized: !!db,
            collectionName: BOOKS_COLLECTION,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            hostname: hostname,
            environment: isLocal ? 'local' : isVercel ? 'vercel' : 'production',
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Configurado' : '❌ Faltante',
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            timestamp: new Date().toISOString()
        };
        
        console.log('🔍 getAllBooks: Información de diagnóstico:', diagnosticInfo);
        
        // Verificar que db esté realmente inicializado
        if (!db) {
            throw new Error('Firestore (db) no está inicializado. Verifica las variables de entorno.');
        }
        
        // Intentar obtener todos los libros sin filtro
        console.log('🔄 getAllBooks: Obteniendo todos los libros (sin filtro isActive)...');
        console.log('🔄 getAllBooks: Creando query...');
        
        const allBooksQuery = query(collection(db, BOOKS_COLLECTION));
        console.log('✅ getAllBooks: Query creada, ejecutando getDocs...');
        console.log('⏳ getAllBooks: Esperando respuesta de Firestore (esto puede tardar si el dominio no está autorizado)...');
        
        // Timeout más largo en producción (puede tardar más si el dominio se está autorizando)
        const timeoutSeconds = isLocal ? 10 : 30;
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                console.error(`⏰ getAllBooks: Timeout después de ${timeoutSeconds} segundos`);
                reject(new Error(`Timeout: La query tardó más de ${timeoutSeconds} segundos. Si acabas de agregar el dominio en Firebase, puede tardar unos minutos en autorizarse.`));
            }, timeoutSeconds * 1000);
        });
        
        let allBooksSnapshot;
        try {
            // Agregar log cada 5 segundos para saber que sigue intentando
            const progressInterval = setInterval(() => {
                console.log('⏳ getAllBooks: Todavía esperando respuesta de Firestore...');
            }, 5000);
            
            allBooksSnapshot = await Promise.race([
                getDocs(allBooksQuery).then(result => {
                    clearInterval(progressInterval);
                    return result;
                }),
                timeoutPromise.then(() => {
                    clearInterval(progressInterval);
                    throw new Error('Timeout');
                })
            ]) as any;
            
            console.log('✅ getAllBooks: getDocs completado exitosamente!');
        } catch (timeoutError: any) {
            console.error('❌ getAllBooks: Timeout o error en getDocs:', timeoutError);
            console.error('❌ getAllBooks: Error completo:', {
                name: timeoutError?.name,
                message: timeoutError?.message,
                code: timeoutError?.code,
                stack: timeoutError?.stack
            });
            console.error('❌ getAllBooks: Posibles causas:');
            console.error('   1. El dominio de Vercel no está autorizado en Firebase (puede tardar unos minutos)');
            console.error('   2. Problema de permisos en Firestore');
            console.error('   3. Las reglas de Firestore están bloqueando la lectura');
            console.error('   4. Problema de conectividad con Firestore');
            console.error('💡 Solución:');
            console.error('   - Verifica que *.vercel.app esté en "Authorized domains" en Firebase Console');
            console.error('   - Espera 2-5 minutos después de agregar el dominio');
            console.error('   - Verifica las reglas de Firestore: https://console.firebase.google.com/project/tufecrecelibros/firestore/rules');
            console.error('   - Verifica que el projectId sea correcto:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
            throw timeoutError;
        }
        
        console.log(`📊 getAllBooks: Total de documentos en colección: ${allBooksSnapshot.docs.length}`);
        
        if (allBooksSnapshot.docs.length === 0) {
            console.warn('⚠️ getAllBooks: La colección está vacía o no se pueden leer documentos');
            console.warn('⚠️ getAllBooks: Verifica:');
            console.warn('   1. Que los libros existan en Firestore Console');
            console.warn('   2. Que las reglas de Firestore permitan lectura pública');
            console.warn('   3. Que el proyecto de Firebase sea el correcto');
        }
        
        if (allBooksSnapshot.docs.length > 0) {
            // Mostrar información del primer documento para diagnóstico
            const firstDoc = allBooksSnapshot.docs[0];
            const firstDocData = firstDoc.data();
            console.log('📋 getAllBooks: Ejemplo de documento:', {
                id: firstDoc.id,
                title: firstDocData.title,
                isActive: firstDocData.isActive,
                hasIsActive: 'isActive' in firstDocData,
                allFields: Object.keys(firstDocData)
            });
        }
        
        // Filtrar libros activos en el cliente (más flexible que el filtro de Firestore)
        const books = allBooksSnapshot.docs
            .map((doc: QueryDocumentSnapshot<DocumentData>) => {
                const data = doc.data();
                // Si no tiene isActive o es true, incluirlo
                if (data.isActive === undefined || data.isActive === true || data.isActive !== false) {
                    return docToBook(doc);
                }
                return null;
            })
            .filter((book: Book | null): book is Book => book !== null);
        
        console.log(`✅ getAllBooks: ${books.length} libros encontrados y convertidos (después de filtrar)`);
        
        // Ordenar por createdAt en el cliente (más confiable que depender de índices)
        const sortedBooks = books.sort((a: Book, b: Book) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        });
        
        console.log(`✅ getAllBooks: ${sortedBooks.length} libros ordenados y listos para retornar`);
        return sortedBooks;
    } catch (error: any) {
        // Capturar y mostrar el error completo sin ocultarlo
        console.error('Error en getAllBooks:', error);
        console.error('Error details:', {
            name: error?.name,
            message: error?.message,
            code: error?.code,
            stack: error?.stack,
            cause: error?.cause,
            fullError: error
        });
        throw error;
    }
}

// Obtener libro por ID
export async function getBookById(id: string): Promise<Book | null> {
    try {
        const docRef = doc(db, BOOKS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            return null;
        }
        
        return docToBook(docSnap as QueryDocumentSnapshot<DocumentData>);
    } catch (error) {
        console.error('Error getting book:', error);
        throw error;
    }
}

// Obtener libros destacados
export async function getFeaturedBooks(limitCount: number = 6): Promise<Book[]> {
    try {
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('featured', '==', true)
        );
        
        try {
            q = query(q, orderBy('createdAt', 'desc'), limit(limitCount));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(docToBook);
        } catch (orderByError: any) {
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy en featured books, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                const books = querySnapshot.docs.map(docToBook);
                const sorted = books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
                return sorted.slice(0, limitCount);
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error getting featured books:', error);
        // Fallback: obtener todos y filtrar en el cliente
        try {
            const q = query(collection(db, BOOKS_COLLECTION));
            const querySnapshot = await getDocs(q);
            const allBooks = querySnapshot.docs.map(docToBook);
            return allBooks
                .filter(book => book.isActive !== false && book.featured === true)
                .sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                })
                .slice(0, limitCount);
        } catch (fallbackError) {
            throw error;
        }
    }
}

// Obtener libros gratuitos
export async function getFreeBooks(): Promise<Book[]> {
    try {
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('isFree', '==', true)
        );
        
        try {
            q = query(q, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(docToBook);
        } catch (orderByError: any) {
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy en free books, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                const books = querySnapshot.docs.map(docToBook);
                return books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error getting free books:', error);
        // Fallback: obtener todos y filtrar en el cliente
        try {
            const q = query(collection(db, BOOKS_COLLECTION));
            const querySnapshot = await getDocs(q);
            const allBooks = querySnapshot.docs.map(docToBook);
            return allBooks
                .filter(book => book.isActive !== false && book.isFree === true)
                .sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
        } catch (fallbackError) {
            throw error;
        }
    }
}

// Buscar libros por categoría
export async function getBooksByCategory(category: string): Promise<Book[]> {
    try {
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('category', '==', category)
        );
        
        try {
            q = query(q, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(docToBook);
        } catch (orderByError: any) {
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy en category books, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                const books = querySnapshot.docs.map(docToBook);
                return books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error getting books by category:', error);
        throw error;
    }
}

// Buscar libros por público objetivo
export async function getBooksByAudience(audience: string): Promise<Book[]> {
    try {
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true),
            where('audience', '==', audience),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(docToBook);
    } catch (error) {
        console.error('Error getting books by audience:', error);
        throw error;
    }
}

// Buscar libros (por título o autor)
export async function searchBooks(searchTerm: string): Promise<Book[]> {
    try {
        // Firestore no soporta búsqueda full-text nativa
        // Obtener todos los libros activos y filtrar en el cliente
        const q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true)
        );
        const querySnapshot = await getDocs(q);
        const allBooks = querySnapshot.docs.map(docToBook);
        
        const term = searchTerm.toLowerCase();
        return allBooks.filter(book => 
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term) ||
            book.subtitle?.toLowerCase().includes(term)
        );
    } catch (error) {
        console.error('Error searching books:', error);
        throw error;
    }
}

// Filtrar libros (múltiples criterios)
export interface BookFilters {
    category?: string;
    audience?: string;
    isFree?: boolean;
    featured?: boolean;
    searchQuery?: string;
}

export async function filterBooks(filters: BookFilters): Promise<Book[]> {
    try {
        let q = query(
            collection(db, BOOKS_COLLECTION),
            where('isActive', '==', true)
        );

        // Aplicar filtros
        if (filters.category && filters.category !== 'all') {
            q = query(q, where('category', '==', filters.category));
        }
        if (filters.audience && filters.audience !== 'all') {
            q = query(q, where('audience', '==', filters.audience));
        }
        if (filters.isFree !== undefined) {
            q = query(q, where('isFree', '==', filters.isFree));
        }
        if (filters.featured !== undefined) {
            q = query(q, where('featured', '==', filters.featured));
        }

        // Intentar agregar orderBy, si falla ordenar en el cliente
        try {
            q = query(q, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            let books = querySnapshot.docs.map(docToBook);

            // Filtrar por búsqueda de texto si existe
            if (filters.searchQuery) {
                const term = filters.searchQuery.toLowerCase();
                books = books.filter(book => 
                    book.title.toLowerCase().includes(term) ||
                    book.author.toLowerCase().includes(term) ||
                    book.subtitle?.toLowerCase().includes(term)
                );
            }

            return books;
        } catch (orderByError: any) {
            if (orderByError.code === 'failed-precondition') {
                console.warn('Índice faltante para orderBy en filterBooks, ordenando en el cliente');
                const querySnapshot = await getDocs(q);
                let books = querySnapshot.docs.map(docToBook);
                
                // Ordenar en el cliente
                books = books.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });

                // Filtrar por búsqueda de texto si existe
                if (filters.searchQuery) {
                    const term = filters.searchQuery.toLowerCase();
                    books = books.filter(book => 
                        book.title.toLowerCase().includes(term) ||
                        book.author.toLowerCase().includes(term) ||
                        book.subtitle?.toLowerCase().includes(term)
                    );
                }

                return books;
            }
            throw orderByError;
        }
    } catch (error: any) {
        console.error('Error filtering books:', error);
        // Fallback: obtener todos y filtrar en el cliente
        try {
            const q = query(collection(db, BOOKS_COLLECTION));
            const querySnapshot = await getDocs(q);
            let books = querySnapshot.docs
                .map(docToBook)
                .filter(book => book.isActive !== false);

            // Aplicar filtros en el cliente
            if (filters.category && filters.category !== 'all') {
                books = books.filter(book => book.category === filters.category);
            }
            if (filters.audience && filters.audience !== 'all') {
                books = books.filter(book => book.audience === filters.audience);
            }
            if (filters.isFree !== undefined) {
                books = books.filter(book => book.isFree === filters.isFree);
            }
            if (filters.featured !== undefined) {
                books = books.filter(book => book.featured === filters.featured);
            }
            if (filters.searchQuery) {
                const term = filters.searchQuery.toLowerCase();
                books = books.filter(book => 
                    book.title.toLowerCase().includes(term) ||
                    book.author.toLowerCase().includes(term) ||
                    book.subtitle?.toLowerCase().includes(term)
                );
            }

            // Ordenar por fecha
            books = books.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });

            return books;
        } catch (fallbackError) {
            throw error;
        }
    }
}

// Crear libro (solo admin)
export async function createBook(bookData: Omit<Book, 'id'>): Promise<Book> {
    try {
        // Importar generateSlug para generar slug si no se proporciona
        const { generateSlug } = await import('@/lib/utils/slug');
        
        // Generar slug si no se proporciona
        const slug = bookData.slug?.trim() || generateSlug(bookData.title);
        
        // Preparar datos para Firestore
        const firestoreData: any = {
            ...bookData,
            slug: slug || undefined,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        
        // Limpiar campos undefined para no guardarlos en Firestore
        Object.keys(firestoreData).forEach(key => {
            if (firestoreData[key] === undefined) {
                delete firestoreData[key];
            }
        });
        
        const docRef = await addDoc(collection(db, BOOKS_COLLECTION), firestoreData);
        
        const newBook = await getBookById(docRef.id);
        if (!newBook) {
            throw new Error('Error al crear el libro');
        }
        return newBook;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
}

// Actualizar libro (solo admin)
export async function updateBook(id: string, updates: Partial<Book>): Promise<Book> {
    try {
        const { generateSlug } = await import('@/lib/utils/slug');
        
        // Si se actualiza el título y no hay slug, generar uno
        const firestoreUpdates: any = { ...updates };
        
        if (updates.title && !updates.slug) {
            // Si no hay slug en los updates, mantener el existente o generar uno nuevo
            const currentBook = await getBookById(id);
            if (!currentBook?.slug) {
                firestoreUpdates.slug = generateSlug(updates.title);
            }
        } else if (updates.slug) {
            // Si se proporciona un slug, usarlo (puede estar vacío para regenerar)
            firestoreUpdates.slug = updates.slug.trim() || generateSlug(updates.title || '');
        }
        
        firestoreUpdates.updatedAt = serverTimestamp();
        
        // Limpiar campos undefined
        Object.keys(firestoreUpdates).forEach(key => {
            if (firestoreUpdates[key] === undefined) {
                delete firestoreUpdates[key];
            }
        });
        
        const bookRef = doc(db, BOOKS_COLLECTION, id);
        await updateDoc(bookRef, firestoreUpdates);
        
        const updatedBook = await getBookById(id);
        if (!updatedBook) {
            throw new Error('Error al actualizar el libro');
        }
        return updatedBook;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
}

// Eliminar libro (solo admin) - Soft delete marcando isActive como false
export async function deleteBook(id: string): Promise<void> {
    try {
        const bookRef = doc(db, BOOKS_COLLECTION, id);
        await updateDoc(bookRef, {
            isActive: false,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

